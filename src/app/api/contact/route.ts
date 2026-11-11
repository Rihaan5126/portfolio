import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/lib/data";
import { type ContactResponse, validateContact } from "@/lib/contact";

const MAX_BODY_BYTES = 16 * 1024;

function respond(body: ContactResponse, status = 200) {
  return NextResponse.json(body, { status });
}

/**
 * Sends the contact form as an email through Resend.
 *
 * Required environment variables:
 *   RESEND_API_KEY      API key from resend.com
 * Optional:
 *   CONTACT_TO_EMAIL    where messages go (defaults to the address in the content data)
 *   CONTACT_FROM_EMAIL  sender on a domain verified in Resend, e.g.
 *                       "Portfolio <contact@yourdomain.com>". Without it the
 *                       shared Resend testing sender is used, which only
 *                       delivers to the email the Resend account was created with.
 *
 * Success is only reported after Resend has accepted the message. If the key is
 * missing the route returns 503 so the form can show an honest error and the
 * mailto fallback, rather than pretending to send.
 *
 * There is deliberately no in-memory rate limiter: on serverless each instance
 * has its own memory, so it would not be a real limit. Add a rate-limit rule
 * for POST /api/contact in the Vercel Firewall (or a shared store such as Redis)
 * if abuse becomes a problem. A hidden honeypot field already filters simple bots.
 */
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return respond({ error: "Unsupported request type.", code: "bad_request" }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return respond({ error: "That message is too large.", code: "too_large" }, 413);
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return respond({ error: "Could not read the request.", code: "bad_request" }, 400);
  }
  if (raw.length > MAX_BODY_BYTES) {
    return respond({ error: "That message is too large.", code: "too_large" }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return respond({ error: "Invalid request body.", code: "bad_request" }, 400);
  }
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return respond({ error: "Invalid request body.", code: "bad_request" }, 400);
  }
  const body = payload as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field. Bots get a quiet 200
  // so they have nothing to learn from, and nothing is sent.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return respond({ ok: true });
  }

  const fieldErrors = validateContact(body);
  if (Object.keys(fieldErrors).length > 0) {
    return respond(
      { error: "Please check the highlighted fields.", code: "invalid", fieldErrors },
      400,
    );
  }

  const name = String(body.name).trim();
  const email = String(body.email).trim();
  const message = String(body.message).trim();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured, message was not sent");
    return respond(
      {
        error: "The contact form isn't set up right now.",
        code: "not_configured",
      },
      503,
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from =
    process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const safeName = name.replace(/[\r\n\t]+/g, " ").slice(0, 80);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio message from ${safeName}`,
      text: `From: ${safeName} <${email}>\n\n${message}`,
    });

    if (error) {
      // Log the failure category only. Never the visitor's name, email or message.
      console.error("[contact] Resend rejected the message", {
        type: error.name,
        status: "statusCode" in error ? error.statusCode : undefined,
      });
      return respond(
        { error: "The message couldn't be delivered.", code: "delivery_failed" },
        502,
      );
    }
  } catch {
    console.error("[contact] Could not reach Resend");
    return respond(
      { error: "The message couldn't be delivered.", code: "delivery_failed" },
      502,
    );
  }

  return respond({ ok: true });
}
