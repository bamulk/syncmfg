import { NextResponse } from "next/server";

/**
 * RFQ / contact submissions.
 *
 * Delivery is via Resend's REST API when RESEND_API_KEY is set (no SDK needed).
 * Without it — local dev, or before the account exists — submissions are logged
 * to the server console and the form still reports success, so the UI can be
 * exercised end to end.
 *
 * Two emails go out per submission:
 *   1. the RFQ itself, to CONTACT_TO, with reply-to set to the customer;
 *   2. a short confirmation to the customer, with reply-to set to CONTACT_TO.
 *      The form tells customers to reply to it with their drawings attached,
 *      so it has to exist. It carries fixed text only (nothing the sender
 *      typed), so the form cannot be used to relay a message to a third party.
 *
 * Settings (hosting environment):
 *   RESEND_API_KEY       set by the Resend integration on Vercel
 *   RESEND_EMAIL_DOMAIN  set by the integration: the verified sending domain
 *   CONTACT_TO           where RFQs land; comma-separated for several inboxes
 *   CONTACT_FROM         optional sender override. Defaults to
 *                        "SYNC Manufacturing <rfq@RESEND_EMAIL_DOMAIN>"
 */

const CONFIRMATION_SUBJECT = "We received your request | SYNC Manufacturing";

const CONFIRMATION_HTML = `<div style="font-family:Arial,sans-serif;color:#01234c;font-size:15px;line-height:1.6;max-width:560px">
<p>Thank you for contacting SYNC Manufacturing. We have received your request and our team typically responds to RFQs within two business days.</p>
<p><strong>Have drawings or specifications?</strong> Reply to this email with your files attached and they will be added to your request.</p>
<p style="color:#5a6b80;font-size:13px">If your documents are export-controlled (ITAR/EAR), please do not email them. Reply to let us know and we will arrange a controlled transfer.</p>
<p>SYNC Manufacturing<br><a href="https://syncmfg.com" style="color:#0070d6">syncmfg.com</a></p>
</div>`;

const CONFIRMATION_TEXT = `Thank you for contacting SYNC Manufacturing. We have received your request and our team typically responds to RFQs within two business days.

Have drawings or specifications? Reply to this email with your files attached and they will be added to your request.

If your documents are export-controlled (ITAR/EAR), please do not email them. Reply to let us know and we will arrange a controlled transfer.

SYNC Manufacturing
https://syncmfg.com`;

async function sendEmail(apiKey: string, message: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  return { ok: res.ok, detail: res.ok ? "" : await res.text() };
}

const FIELDS = [
  "name",
  "company",
  "email",
  "phone",
  "market",
  "process",
  "quantity",
  "location",
  "message",
] as const;

const LABELS: Record<(typeof FIELDS)[number], string> = {
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  market: "Market",
  process: "Process of interest",
  quantity: "Annual quantity",
  location: "Preferred plant",
  message: "Part details",
};

function clean(value: unknown, max = 5000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Report success and drop it.
  if (clean(payload.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const data = Object.fromEntries(
    FIELDS.map((f) => [f, clean(payload[f])]),
  ) as Record<(typeof FIELDS)[number], string>;

  if (!data.name || !data.company || !data.email || !data.message) {
    return NextResponse.json(
      { error: "Please complete the required fields." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const rows = FIELDS.filter((f) => data[f]).map(
    (f) =>
      `<tr><td style="padding:6px 16px 6px 0;vertical-align:top;color:#5a6b80;font-size:13px;white-space:nowrap">${LABELS[f]}</td><td style="padding:6px 0;color:#01234c;font-size:14px">${escapeHtml(data[f]).replace(/\n/g, "<br>")}</td></tr>`,
  );

  const html = `<div style="font-family:Arial,sans-serif"><h2 style="color:#01234c;margin:0 0 16px">New RFQ from syncmfg.com</h2><table style="border-collapse:collapse">${rows.join("")}</table></div>`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  const from =
    process.env.CONTACT_FROM ??
    (domain ? `SYNC Manufacturing <rfq@${domain}>` : undefined);

  if (!apiKey || !to || !from) {
    console.info("[contact] RFQ received (email not configured):", data);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const recipients = to.split(",").map((t) => t.trim());

  try {
    const sent = await sendEmail(apiKey, {
      from,
      to: recipients,
      reply_to: data.email,
      subject: `RFQ — ${data.company}${data.market ? ` (${data.market})` : ""}`,
      html,
    });

    if (!sent.ok) {
      console.error("[contact] Resend rejected the send:", sent.detail);
      return NextResponse.json(
        { error: "We could not send your message. Please email us directly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Send failed:", err);
    return NextResponse.json(
      { error: "We could not send your message. Please email us directly." },
      { status: 502 },
    );
  }

  // The RFQ is delivered at this point; a failed confirmation must not turn
  // the submission into an error for the customer.
  try {
    const confirmed = await sendEmail(apiKey, {
      from,
      to: [data.email],
      reply_to: recipients,
      subject: CONFIRMATION_SUBJECT,
      html: CONFIRMATION_HTML,
      text: CONFIRMATION_TEXT,
    });
    if (!confirmed.ok) {
      console.error("[contact] Confirmation not sent:", confirmed.detail);
    }
  } catch (err) {
    console.error("[contact] Confirmation failed:", err);
  }

  return NextResponse.json({ ok: true, delivered: true });
}
