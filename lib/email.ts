import { Resend } from "resend";

// Config can come from an injected env (Cloudflare Workers/Pages Functions,
// where process.env is unavailable) or fall back to process.env (Node).
export interface EmailEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  NOTIFY_EMAIL?: string;
}

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

export async function sendNotificationEmail(data: FormPayload, env?: EmailEnv) {
  const key = envVar(env, "RESEND_API_KEY");
  if (!key) {
    console.log("[email] RESEND_API_KEY not set — skipping email send");
    return;
  }
  const resend = new Resend(key);
  const FROM_EMAIL = envVar(env, "RESEND_FROM_EMAIL") ?? "onboarding@resend.dev";
  const NOTIFY_EMAIL = envVar(env, "NOTIFY_EMAIL") ?? "info@bnd-lab-agency.com";

  try {
    if (data.formType === "newsletter") {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `New newsletter subscriber: ${data.email}`,
        text: `New subscriber: ${data.email}\n\nTimestamp: ${new Date().toISOString()}`,
      });
      return;
    }

    const isDiscovery = data.formType === "discovery-call";
    const subject = isDiscovery
      ? `Discovery Call Request: ${data.name} (${data.company})`
      : `New Contact: ${data.name} (${data.company})`;

    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company}`,
      data.phone ? `Phone: ${data.phone}` : null,
    ];

    if (isDiscovery) {
      const d = data as DiscoveryCallPayload;
      if (d.tier) lines.push(`Interested in: ${d.tier}`);
      lines.push(`Industry: ${d.industry}`);
      lines.push(`Budget: ${d.budget}`);
      lines.push(`Timeline: ${d.timeline}`);
    }

    if (data.message) {
      lines.push("", `Message:`, data.message);
    }

    if (!isDiscovery && (data as ContactPayload).source) {
      lines.push("", `Source: ${(data as ContactPayload).source}`);
    }

    lines.push("", `Timestamp: ${new Date().toISOString()}`);

    // Send notification to team
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject,
      text: lines.filter(Boolean).join("\n"),
    });

    // Send confirmation to the submitter
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: isDiscovery
        ? "We received your discovery call request — BND Labs"
        : "We received your message — BND Labs",
      text: [
        `Hi ${data.name},`,
        "",
        isDiscovery
          ? "Thanks for requesting a discovery call! We'll review your details and send you a calendar link within 24 hours."
          : "Thanks for reaching out! We've received your message and will get back to you within 24 hours.",
        "",
        "In the meantime, check out our latest insights on building growth systems:",
        "https://bnd-lab-agency.com/blog",
        "",
        "Best,",
        "The BND Labs Team",
        "https://bnd-lab-agency.com",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[email] Failed to send:", error);
    // Don't throw — email failure shouldn't break form submission
  }
}
