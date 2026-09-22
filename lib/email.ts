import { Resend } from "resend";

// Config can come from an injected env (Cloudflare Workers/Pages Functions,
// where process.env is unavailable) or fall back to process.env (Node).
export interface EmailEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  NOTIFY_EMAIL?: string;
  /** Optional. E.164, e.g. +260977123456. The WhatsApp line is omitted if unset. */
  WHATSAPP_NUMBER?: string;
}

/** Not a secret — it is in every HubSpot URL. Used to link the team straight to the CRM. */
const HUBSPOT_PORTAL_ID = "149352677";
const CONTACTS_URL = `https://app-eu1.hubspot.com/contacts/${HUBSPOT_PORTAL_ID}/objects/0-1/views/all/list`;
const SITE = "https://bnd-lab-agency.com";

function envVar(env: EmailEnv | undefined, name: keyof EmailEnv): string | undefined {
  return (
    env?.[name] ?? (typeof process !== "undefined" ? process.env[name] : undefined)
  );
}

interface ContactPayload {
  formType: "contact";
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
  source?: string;
}

interface DiscoveryCallPayload {
  formType: "discovery-call";
  name: string;
  email: string;
  company: string;
  phone?: string;
  /** Tier the visitor arrived from via /contact?tier=<slug>, if any. */
  tier?: string;
  /** Authority axis of the lead score — whether this person can say yes. */
  role: string;
  industry: string;
  budget: string;
  timeline: string;
  message?: string;
}

interface NewsletterPayload {
  formType: "newsletter";
  email: string;
}

export type FormPayload = ContactPayload | DiscoveryCallPayload | NewsletterPayload;

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] ?? full;
}

function lusakaTime(): string {
  return new Date().toLocaleString("en-GB", {
    timeZone: "Africa/Lusaka",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/**
 * The lead-facing acknowledgement.
 *
 * DELIBERATELY MAKES NO TIME PROMISE. This used to say "within 24 hours",
 * which both undersold the intent and was a commitment nobody was measuring.
 * It says what happens next instead, and offers WhatsApp as the fast lane for
 * anyone who actually is in a hurry. Never quote a price or promise a date
 * here — this email is sent by a machine and cannot know either.
 */
function buildConfirmation(
  data: Exclude<FormPayload, NewsletterPayload>,
  whatsapp: string | undefined,
): { subject: string; text: string } {
  const hi = firstName(data.name);
  const fastLane = whatsapp
    ? `\nIf it's time-sensitive, WhatsApp reaches us quickest: ${whatsapp}.\n`
    : "";

  if (data.formType === "discovery-call") {
    const picked = [
      `  Role:       ${data.role}`,
      `  Industry:   ${data.industry}`,
      `  Budget:     ${data.budget}`,
      `  Timeline:   ${data.timeline}`,
    ];
    if (data.tier) picked.push(`  Looking at: ${data.tier}`);

    return {
      subject: "Got your discovery call request — BND Labs",
      text: [
        `Hi ${hi},`,
        "",
        `Thanks — your discovery call request for ${data.company} is with us.`,
        "",
        "Here's what you told us:",
        ...picked,
        "",
        "If any of that's wrong, just reply to this email and correct it.",
        "",
        "Brandon will come back to you personally to set a time.",
        fastLane,
        "— BND Labs",
        SITE,
      ].join("\n"),
    };
  }

  return {
    subject: "Got your message — BND Labs",
    text: [
      `Hi ${hi},`,
      "",
      `Thanks for getting in touch about ${data.company}. Your message is with us.`,
      "",
      "Brandon reads every enquiry himself and will come back to you personally.",
      fastLane,
      "— BND Labs",
      SITE,
    ].join("\n"),
  };
}

/**
 * The internal alert.
 *
 * With no automation engine yet, this email IS the workflow: it is how a lead
 * gets noticed and how it gets scored. So it carries the rubric and a
 * ready-to-paste scoring string rather than just dumping the form fields.
 */
function buildNotification(
  data: Exclude<FormPayload, NewsletterPayload>,
): { subject: string; text: string } {
  const kind = data.formType === "discovery-call" ? "Discovery" : "Contact";

  const lines = [
    `${data.name} · ${data.company}`,
    data.email,
    data.phone ? data.phone : "(no phone given)",
    "",
  ];

  if (data.formType === "discovery-call") {
    if (data.tier) lines.push(`Looking at: ${data.tier}`);
    lines.push(`Role:       ${data.role}`);
    lines.push(`Industry:   ${data.industry}`);
    lines.push(`Budget:     ${data.budget}`);
    lines.push(`Timeline:   ${data.timeline}`);
    lines.push("");
  } else if (data.source?.trim()) {
    lines.push(`Heard about us: ${data.source.trim()}`, "");
  }

  lines.push("--- Their message ---");
  lines.push(data.message?.trim() || "(none)");
  lines.push("");
  lines.push("--- Score it ---");
  lines.push("Rubric v1 — Fit / Pain / Urgency / Authority, 0-5 each.");
  lines.push("Channel: referral +2 · walk-in +1 · cold agency DM -3.");
  lines.push("Hot 16-20 · Warm 10-15 · Cool 5-9 · Reject 0-4.");
  lines.push("");
  lines.push('Paste into "Scoring detail" on the contact, filling the blanks:');
  lines.push(`  v1 | F_ P_ U_ A_ | +0 |`);
  lines.push("");
  lines.push(`Contact record: ${CONTACTS_URL}`);
  lines.push("");
  lines.push(`Received ${lusakaTime()} (Lusaka)`);

  return {
    subject: `[${kind}] ${data.name} — ${data.company}`,
    text: lines.join("\n"),
  };
}

export async function sendNotificationEmail(data: FormPayload, env?: EmailEnv) {
  const key = envVar(env, "RESEND_API_KEY");
  if (!key) {
    console.log("[email] RESEND_API_KEY not set — skipping email send");
    return;
  }
  const resend = new Resend(key);
  const FROM_EMAIL = envVar(env, "RESEND_FROM_EMAIL") ?? "onboarding@resend.dev";
  const NOTIFY_EMAIL = envVar(env, "NOTIFY_EMAIL") ?? "info@bnd-lab-agency.com";
  const whatsapp = envVar(env, "WHATSAPP_NUMBER");

  try {
    if (data.formType === "newsletter") {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `New newsletter subscriber: ${data.email}`,
        text: `${data.email}\n\nReceived ${lusakaTime()} (Lusaka)`,
      });
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: "You're on the list — BND Labs",
        text: [
          "Thanks for subscribing.",
          "",
          "We write about building growth systems for Zambian businesses —",
          "practical, not theoretical. You'll hear from us when we have",
          "something worth your time, and not otherwise.",
          "",
          "— BND Labs",
          SITE,
        ].join("\n"),
      });
      return;
    }

    const notification = buildNotification(data);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: notification.subject,
      text: notification.text,
    });

    const confirmation = buildConfirmation(data, whatsapp);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: confirmation.subject,
      text: confirmation.text,
    });
  } catch (error) {
    console.error("[email] Failed to send:", error);
    // Don't throw — email failure shouldn't break form submission
  }
}
