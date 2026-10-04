import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { DemoBadge } from "@/components/DemoBadge";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report Environmental Concern — EcoPV-India (Prototype)" },
      { name: "description", content: "Submit a simulated report about a suspected pharmaceutical-related environmental concern. Student prototype with demo data only." },
      { property: "og:title", content: "Report Environmental Concern — EcoPV-India (Prototype)" },
      { property: "og:description", content: "Simulated reporting workflow for environmental pharmacovigilance. Not an official government or IPC programme." },
    ],
  }),
  component: ReportPage,
});

const CATEGORIES = [
  "Water Contamination",
  "Improper Disposal",
  "Manufacturing Effluent",
  "Wildlife Impact",
  "Agricultural Run-off",
  "Other",
];

const REPORTER_TYPES = ["Student", "Healthcare Professional", "Pharmacist", "Farmer", "General Public", "Researcher"];

function inputClass() {
  return "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-teal";
}

function labelClass() {
  return "mb-1.5 block text-sm font-semibold text-foreground";
}

function ReportPage() {
  const [submitted, setSubmitted] = useState<{ refId: string } | null>(null);
  const [form, setForm] = useState({
    reporterType: "General Public",
    medicine: "",
    category: CATEGORIES[0],
    location: "",
    date: "",
    severity: "Moderate",
    description: "",
    contact: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const refId = `ECO-DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
    // Simulated only — nothing is transmitted or stored anywhere.
    setSubmitted({ refId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setSubmitted(null);
    setForm({
      reporterType: "General Public",
      medicine: "",
      category: CATEGORIES[0],
      location: "",
      date: "",
      severity: "Moderate",
      description: "",
      contact: "",
    });
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-leaf/40 bg-card p-8 text-center shadow-sm">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-leaf-soft">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-leaf" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-foreground">Report recorded (simulation)</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Your demo report has been assigned reference ID{" "}
            <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-sm font-semibold text-foreground">
              {submitted.refId}
            </span>
            . In a real system it would now enter the review workflow shown on the
            EcoPV Dashboard.
          </p>
          <div className="mt-6 rounded-xl border border-teal/40 bg-teal-soft/70 p-4 text-left text-sm leading-relaxed text-accent-foreground">
            <strong>Reminder:</strong> this is a student-developed prototype. No data
            was sent to any authority, server or database — nothing here is an
            official government or IPC programme.
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button onClick={reset} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-navy-deep">
              Submit another demo report
            </button>
            <Link to="/dashboard" className="rounded-xl border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">
              View EcoPV Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-navy px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Report Environmental Concern</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              Describe a suspected pharmaceutical-related environmental issue —
              contaminated water, improper medicine disposal, effects on wildlife,
              or manufacturing pollution.
            </p>
          </div>
          <DemoBadge className="border-white/30 bg-white/10 text-white" />
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8 rounded-xl border border-teal/40 bg-teal-soft/70 p-4 text-sm leading-relaxed text-accent-foreground">
          <strong>Demo workflow:</strong> submissions are simulated locally and are
          never transmitted, stored, or reviewed by any real authority. Do not
          enter personal or sensitive information.
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass()} htmlFor="reporterType">I am a…</label>
              <select id="reporterType" value={form.reporterType} onChange={set("reporterType")} className={inputClass()}>
                {REPORTER_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass()} htmlFor="date">Date observed</label>
              <input id="date" type="date" required value={form.date} onChange={set("date")} className={inputClass()} />
            </div>
            <div>
              <label className={labelClass()} htmlFor="medicine">Medicine / drug involved (if known)</label>
              <input id="medicine" type="text" placeholder="e.g. Diclofenac, unspecified antibiotics" value={form.medicine} onChange={set("medicine")} className={inputClass()} />
            </div>
            <div>
              <label className={labelClass()} htmlFor="category">Type of concern</label>
              <select id="category" value={form.category} onChange={set("category")} className={inputClass()}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass()} htmlFor="location">Location (city / district, state)</label>
              <input id="location" type="text" required placeholder="e.g. Patna, Bihar" value={form.location} onChange={set("location")} className={inputClass()} />
            </div>
            <div>
              <label className={labelClass()} htmlFor="severity">Perceived severity</label>
              <select id="severity" value={form.severity} onChange={set("severity")} className={inputClass()}>
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass()} htmlFor="description">Describe what you observed</label>
              <textarea id="description" required rows={5} placeholder="What did you see, where, and why do you think a medicine may be involved?" value={form.description} onChange={set("description")} className={inputClass()} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass()} htmlFor="contact">Contact e-mail (optional, demo only)</label>
              <input id="contact" type="email" placeholder="you@example.com" value={form.contact} onChange={set("contact")} className={inputClass()} />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-muted-foreground">
              By submitting you confirm this is a simulated demo submission for a
              student prototype.
            </p>
            <button type="submit" className="shrink-0 rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal/25 transition-transform hover:-translate-y-0.5">
              Submit Demo Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
