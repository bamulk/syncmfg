import { NextResponse } from "next/server";

/**
 * RFQ / contact submissions.
 *
 * Delivery is via Resend's REST API when RESEND_API_KEY is set (no SDK needed).
 * Without it — local dev, or before the account exists — submissions are logged
 * to the server console and the form still reports success, so the UI can be
 * exercised end to end.
 *
 * Before launch, set in the hosting environment:
 *   RESEND_API_KEY   Resend API key
 *   CONTACT_TO       where RFQs land, e.g. sales@syncmfg.com
 *   CONTACT_FROM     verified sender, e.g. "SYNC Website <website@syncmfg.com>"
 */

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
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    console.info("[contact] RFQ received (email not configured):", data);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((t) => t.trim()),
        reply_to: data.email,
        subject: `RFQ — ${data.company}${data.market ? ` (${data.market})` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend rejected the send:", await res.text());
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

  return NextResponse.json({ ok: true, delivered: true });
}
