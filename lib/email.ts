import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "hello@bndlabs.co.zm";

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
  industry: string;
  budget: string;
  timeline: string;
  message?: string;
}

interface NewsletterPayload {
  formType: "newsletter";
  email: string;
}

type FormPayload = ContactPayload | DiscoveryCallPayload | NewsletterPayload;

export async function sendNotificationEmail(data: FormPayload) {
  const resend = getResend();
  if (!resend) {
    console.log("[email] RESEND_API_KEY not set — skipping email send");
    return;
  }

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
        "https://bndlabs.co.zm/blog",
        "",
        "Best,",
        "The BND Labs Team",
        "https://bndlabs.co.zm",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[email] Failed to send:", error);
    // Don't throw — email failure shouldn't break form submission
  }
}
