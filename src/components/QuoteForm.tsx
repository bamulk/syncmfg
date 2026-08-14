"use client";

import { useState } from "react";
import { markets } from "@/lib/markets";
import { solutions } from "@/lib/solutions";
import { locations } from "@/lib/site";
import { ArrowIcon, CheckIcon } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-md border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-gray-metal focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20";

const labelClass = "block text-sm font-semibold text-navy";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "We could not send your message. Please email us directly.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-blue/30 bg-blue/[0.04] p-10 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-2xl font-bold text-navy">
          Thanks — we have your request.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
          An engineer will review it and respond within two business days. If
          your timeline is shorter than that, call the plant directly and say
          you have already submitted an RFQ.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-blue">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company <span className="text-blue">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-blue">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`mt-2 ${inputClass}`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="market" className={labelClass}>
            Market
          </label>
          <select
            id="market"
            name="market"
            defaultValue=""
            className={`mt-2 ${inputClass}`}
          >
            <option value="">Select a market</option>
            {markets.map((m) => (
              <option key={m.slug} value={m.name}>
                {m.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="process" className={labelClass}>
            Process of interest
          </label>
          <select
            id="process"
            name="process"
            defaultValue=""
            className={`mt-2 ${inputClass}`}
          >
            <option value="">Not sure — recommend one</option>
            {solutions.map((s) => (
              <optgroup key={s.slug} label={s.name}>
                {s.capabilities.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className={labelClass}>
            Annual quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            placeholder="e.g. 5,000 pcs/yr"
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            Preferred plant
          </label>
          <select
            id="location"
            name="location"
            defaultValue=""
            className={`mt-2 ${inputClass}`}
          >
            <option value="">No preference</option>
            {locations.map((l) => (
              <option key={l.slug} value={l.name}>
                {l.name} — {l.city}, {l.state}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us about the part <span className="text-blue">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Material, dimensions, tolerances, service conditions, target timeline — and anything that has gone wrong with the part before."
          className={`mt-2 ${inputClass} resize-y`}
        />
        <p className="mt-2 text-sm text-muted">
          Have drawings? Submit this form first and reply to our confirmation
          email with your files attached — that keeps prints out of a public
          upload.
        </p>
      </div>

      {/* Honeypot — hidden from users, catches naive bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-md bg-blue px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0060bb] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit RFQ"}
          {status !== "sending" && <ArrowIcon />}
        </button>
        <p className="text-sm text-muted">
          We respond to every RFQ within two business days.
        </p>
      </div>
    </form>
  );
}
