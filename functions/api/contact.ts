// Cloudflare Pages Function serving POST /api/contact for the static export.
// Cloudflare deploys the functions/ directory automatically when this repo is
// connected to a Pages project; set RESEND_API_KEY (and optionally
// RESEND_FROM_EMAIL / NOTIFY_EMAIL) in the project's environment variables.
// CRM forwarding is off until HUBSPOT_TOKEN is set — see lib/lead-forward.ts.
// Note: this endpoint does not run under `next dev` — use `wrangler pages dev`
// to exercise it locally.
import { z } from "zod";
import {
  contactSchema,
  discoveryCallSchema,
  newsletterSchema,
} from "../../lib/schemas";
import { sendNotificationEmail, type EmailEnv } from "../../lib/email";
import { forwardLead, type LeadEnv } from "../../lib/lead-forward";

const payloadSchema = z.discriminatedUnion("formType", [
  contactSchema.extend({ formType: z.literal("contact") }),
  discoveryCallSchema.extend({ formType: z.literal("discovery-call") }),
  newsletterSchema.extend({ formType: z.literal("newsletter") }),
]);

interface RequestContext {
  request: Request;
  env: EmailEnv & LeadEnv;
  /** Pages Functions gives us this; keeps slow work off the response path. */
  waitUntil?: (promise: Promise<unknown>) => void;
}

export async function onRequestPost({
  request,
  env,
  waitUntil,
}: RequestContext): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ message: "Invalid JSON body" }, 400);
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return json({ message: "Please check the form fields and try again." }, 400);
  }

  // Both side-effects are fire-and-forget. Neither reports anything back to
  // the visitor — sendNotificationEmail swallows its own errors — so awaiting
  // them only added two sequential Resend round-trips to the visitor's wait.
  // Running them together keeps the response at validation speed.
  const sideEffects = Promise.all([
    sendNotificationEmail(parsed.data, env),
    forwardLead(parsed.data, env),
  ]).catch((error) => {
    console.error("[contact] background work failed:", error);
  });

  if (waitUntil) {
    waitUntil(sideEffects);
  } else {
    await sideEffects;
  }

  return json({ ok: true }, 200);
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
