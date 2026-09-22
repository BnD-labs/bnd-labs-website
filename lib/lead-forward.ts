import type { FormPayload } from "./email";

// Forwards every validated form submission into HubSpot as a Contact.
// Config can come from an injected env (Cloudflare Workers/Pages Functions,
// where process.env is unavailable) or fall back to process.env (Node).
//
// Until HUBSPOT_TOKEN is set in the Cloudflare Pages project this is inert:
// it logs and returns. Setting that one variable turns lead capture on with
// no redeploy.
//
// WHY CONTACTS ONLY, NO COMPANIES
// The business name goes in the contact's native `company` field rather than
// creating a Company record. Companies are created when a lead is promoted at
// Warm or above — the same threshold that creates a deal. One company per
// enquiry would bury the real client list in tyre-kickers.
//
// WHY LOOK UP BEFORE WRITING
// A repeat enquirer must never overwrite work a human has done on their
// record. Scoring is entered by hand, so a blind upsert would wipe a score
// Brandon had already set the moment that person submitted a second form.
// New contacts are created in full; existing ones get only their phone
// backfilled and the new enquiry appended beneath the old one.
export interface LeadEnv {
  HUBSPOT_TOKEN?: string;
}

const HUBSPOT_API = "https://api.hubapi.com";

/** Keeps an appended message history from growing without bound. */
const MAX_MESSAGE_CHARS = 8000;

function envVar(env: LeadEnv | undefined, name: keyof LeadEnv): string | undefined {
  return (
    env?.[name] ?? (typeof process !== "undefined" ? process.env[name] : undefined)
  );
}

/**
 * Normalise Zambian numbers to E.164 so the CRM record and WhatsApp agree.
 * 0977123456 → +260977123456 · 260977… → +260977… · already-+ left alone.
 */
function toE164(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const s = raw.replace(/[\s()\-.]/g, "");
  if (!s) return undefined;
  if (s.startsWith("+")) return s;
  if (s.startsWith("00")) return `+${s.slice(2)}`;
  if (s.startsWith("0")) return `+260${s.slice(1)}`;
  if (s.startsWith("260")) return `+${s}`;
  return s;
}

/** HubSpot wants first and last name separately; the form asks for one name. */
function splitName(full: string): { firstname: string; lastname?: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0] };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

const CHANNEL_BY_FORM = {
  contact: "web_contact",
  "discovery-call": "web_discovery",
  newsletter: "web_newsletter",
} as const;

/**
 * The enquiry in the lead's own words, with anything they picked from a
 * dropdown appended below a rule. It all goes in one field because `message`
 * is free text, while HubSpot's own `industry` property is a fixed
 * enumeration that will not accept the form's wording.
 */
function buildMessage(data: FormPayload): string | undefined {
  if (data.formType === "newsletter") return undefined;

  const parts: string[] = [];
  if (data.message?.trim()) parts.push(data.message.trim());

  const picked: string[] = [];
  if (data.formType === "discovery-call") {
    if (data.tier) picked.push(`Interested in: ${data.tier}`);
    picked.push(`Role: ${data.role}`);
    picked.push(`Industry: ${data.industry}`);
    picked.push(`Budget: ${data.budget}`);
    picked.push(`Timeline: ${data.timeline}`);
  } else if (data.source?.trim()) {
    picked.push(`Heard about us: ${data.source.trim()}`);
  }

  if (picked.length) {
    parts.push(parts.length ? `---\n${picked.join("\n")}` : picked.join("\n"));
  }
  return parts.length ? parts.join("\n\n") : undefined;
}

type HubSpotProperties = Record<string, string>;

/** Full property set for a contact we have never seen before. */
function buildNewContactProperties(data: FormPayload): HubSpotProperties {
  const channel = CHANNEL_BY_FORM[data.formType];

  if (data.formType === "newsletter") {
    return {
      email: data.email,
      lifecyclestage: "subscriber",
      bnd_scoring_detail: `v1 | UNSCORED | ${channel}`,
    };
  }

  const { firstname, lastname } = splitName(data.name);
  const props: HubSpotProperties = {
    email: data.email,
    firstname,
    company: data.company,
    lifecyclestage: "lead",
    hs_lead_status: "NEW",
    // Prefilled so the weekly review sees the rubric version and the channel
    // before anyone has scored it. Brandon replaces this whole string when he
    // scores the lead by hand — and nothing automated ever writes it again.
    bnd_scoring_detail: `v1 | UNSCORED | ${channel}`,
  };

  if (lastname) props.lastname = lastname;

  const phone = toE164(data.phone);
  if (phone) props.phone = phone;

  const message = buildMessage(data);
  if (message) props.message = message;

  return props;
}

interface ExistingContact {
  id: string;
  properties: Record<string, string | null>;
}

/** Returns null when the contact does not exist yet. Throws on real errors. */
async function findContact(
  email: string,
  token: string,
): Promise<ExistingContact | null> {
  const url =
    `${HUBSPOT_API}/crm/v3/objects/contacts/${encodeURIComponent(email)}` +
    `?idProperty=email&properties=message,phone`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`lookup ${res.status}: ${await res.text().catch(() => "")}`);
  }
  return (await res.json()) as ExistingContact;
}

/**
 * Only the fields it is safe to change on someone who already has a record:
 * a phone number we did not have, and the new enquiry appended below the old.
 * Scoring fields, lifecycle stage and lead status are deliberately absent —
 * those belong to whoever has been working the lead.
 */
function buildUpdateProperties(
  data: FormPayload,
  existing: ExistingContact,
): HubSpotProperties {
  const props: HubSpotProperties = {};

  // The newsletter form collects an email and nothing else.
  const phone =
    data.formType === "newsletter" ? undefined : toE164(data.phone);
  if (phone && !existing.properties.phone) props.phone = phone;

  const incoming = buildMessage(data);
  if (incoming) {
    const previous = existing.properties.message ?? "";
    const stamp = new Date().toISOString().slice(0, 10);
    const header = `--- New enquiry ${stamp} (${CHANNEL_BY_FORM[data.formType]}) ---`;
    const merged = previous
      ? `${previous}\n\n${header}\n${incoming}`
      : incoming;
    props.message =
      merged.length > MAX_MESSAGE_CHARS
        ? merged.slice(merged.length - MAX_MESSAGE_CHARS)
        : merged;
  }

  return props;
}

async function createContact(
  properties: HubSpotProperties,
  token: string,
): Promise<void> {
  const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ properties }),
  });
  if (!res.ok) {
    throw new Error(`create ${res.status}: ${await res.text().catch(() => "")}`);
  }
}

async function updateContact(
  id: string,
  properties: HubSpotProperties,
  token: string,
): Promise<void> {
  const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ properties }),
  });
  if (!res.ok) {
    throw new Error(`update ${res.status}: ${await res.text().catch(() => "")}`);
  }
}

/**
 * Never throws. A CRM outage must not break form submission or the
 * notification email — the email path is what currently works, and this is
 * additive to it.
 */
export async function forwardLead(data: FormPayload, env?: LeadEnv): Promise<void> {
  const token = envVar(env, "HUBSPOT_TOKEN");
  if (!token) {
    console.log("[lead] HUBSPOT_TOKEN not set — skipping CRM write");
    return;
  }

  const channel = CHANNEL_BY_FORM[data.formType];

  try {
    const existing = await findContact(data.email, token);

    if (!existing) {
      await createContact(buildNewContactProperties(data), token);
      console.log(`[lead] Created contact ${data.email} from ${channel}`);
      return;
    }

    const updates = buildUpdateProperties(data, existing);
    if (Object.keys(updates).length === 0) {
      console.log(`[lead] Contact ${data.email} exists, nothing new to write`);
      return;
    }
    await updateContact(existing.id, updates, token);
    console.log(`[lead] Updated contact ${data.email} from ${channel}`);
  } catch (error) {
    // The error text carries HubSpot's own message, which names the rejected
    // property — the difference between a five-minute fix and an afternoon.
    console.error("[lead] HubSpot write failed:", error);
    // Deliberately swallowed. See the doc comment above.
  }
}
