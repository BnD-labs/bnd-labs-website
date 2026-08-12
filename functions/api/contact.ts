// Cloudflare Pages Function serving POST /api/contact for the static export.
// Cloudflare deploys the functions/ directory automatically when this repo is
// connected to a Pages project; set RESEND_API_KEY (and optionally
// RESEND_FROM_EMAIL / NOTIFY_EMAIL) in the project's environment variables.
// Note: this endpoint does not run under `next dev` — use `wrangler pages dev`
// to exercise it locally.
import { z } from "zod";
import {
  contactSchema,
  discoveryCallSchema,
  newsletterSchema,
} from "../../lib/schemas";
import { sendNotificationEmail, type EmailEnv } from "../../lib/email";

const payloadSchema = z.discriminatedUnion("formType", [
  contactSchema.extend({ formType: z.literal("contact") }),
  discoveryCallSchema.extend({ formType: z.literal("discovery-call") }),
  newsletterSchema.extend({ formType: z.literal("newsletter") }),
]);

interface RequestContext {
  request: Request;
  env: EmailEnv;
}

export async function onRequestPost({
  request,
  env,
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

  await sendNotificationEmail(parsed.data, env);
  return json({ ok: true }, 200);
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
