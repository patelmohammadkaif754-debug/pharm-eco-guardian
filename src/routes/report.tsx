import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DemoBadge } from "@/components/DemoBadge";
import { CONCERN_TYPES, DEMO_REPORTS, MEDIA, PHARMA_CATEGORIES, REPORTER_TYPES, SOURCES } from "@/lib/demoData";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report Environmental Concern — EcoPV-India (Prototype)" },
      { name: "description", content: "Submit a simulated report about a suspected pharmaceutical-related environmental concern. Student prototype with simulated demo data." },
      { property: "og:title", content: "Report Environmental Concern — EcoPV-India (Prototype)" },
      { property: "og:description", content: "Simulated reporting workflow for environmental pharmacovigilance. Not an official IPC/Government programme." },
    ],
  }),
  component: ReportPage,
});

const input =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-teal";
const label = "mb-1.5 block text-sm font-semibold text-foreground";

const EMPTY = {
  reporterType: "",
  pharmaCategory: "",
  medium: "",
  source: "",
  location: "",
  date: "",
  concern: "",
  observation: "",
};

let counter = DEMO_REPORTS.length;

function Select({ id, value, onChange, options, text }: { id: string; value: string; onChange: (v: string) => void; options: readonly string[]; text: string }) {
  return (
    <div>
      <label htmlFor={id} className={label}>{text} *</label>
      <select id={id} required className={input} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ReportPage() {
  const [form, setForm] = useState(EMPTY);
  const [files, setFiles] = useState<string[]>([]);
  const [refId, setRefId] = useState<string | null>(null);
  const set = (k: keyof typeof EMPTY) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    counter += 1;
    setRefId(`ECO-2026-${String(counter).padStart(4, "0")}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setForm(EMPTY);
    setFiles([]);
    setRefId(null);
  }

  if (refId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-leaf/40 bg-card p-8 text-center shadow-sm">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-leaf-soft">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-leaf" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-foreground">Report Recorded Successfully</h1>
          <p className="mt-4 text-sm text-muted-foreground">Simulated reference ID</p>
          <p className="mt-1 font-display text-3xl font-bold tracking-wide text-primary">{refId}</p>
          <p className="mt-4 inline-flex rounded-full bg-teal-soft px-3 py-1 text-sm font-semibold text-accent-foreground">
            Received for prototype screening
          </p>
          <dl className="mt-6 grid gap-2 rounded-xl bg-secondary/60 p-4 text-left text-sm sm:grid-cols-2">
            {[
              ["Pharmaceutical", form.pharmaCategory],
              ["Medium", form.medium],
              ["Concern", form.concern],
              ["Location", form.location],
            ].map(([k, v]) => (
              <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-medium text-foreground">{v}</dd></div>
            ))}
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Prototype simulation only — this report was not transmitted or stored, and it is not
            reviewed by any official authority.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={reset} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Submit another report</button>
            <Link to="/dashboard" className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">View Dashboard</Link>
            <Link to="/signals" className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">Signal Detection</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-navy px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Report Environmental Concern</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              Describe what you observed. Reports are screened for patterns only — a report does not
              confirm contamination, toxicity or any cause.
            </p>
          </div>
          <DemoBadge className="border-white/30 bg-white/10 text-white" label="Prototype form" />
        </div>
      </section>

      <form onSubmit={submit} className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        <fieldset className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <legend className="px-2 font-display text-lg font-semibold text-foreground">1. Reporter & product</legend>
          <div className="mt-2 grid gap-5 sm:grid-cols-2">
            <Select id="reporterType" text="Reporter type" value={form.reporterType} onChange={set("reporterType")} options={REPORTER_TYPES} />
            <Select id="pharmaCategory" text="Pharmaceutical / category" value={form.pharmaCategory} onChange={set("pharmaCategory")} options={PHARMA_CATEGORIES} />
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <legend className="px-2 font-display text-lg font-semibold text-foreground">2. Environment & place</legend>
          <div className="mt-2 grid gap-5 sm:grid-cols-2">
            <Select id="medium" text="Environmental medium" value={form.medium} onChange={set("medium")} options={MEDIA} />
            <Select id="source" text="Suspected source" value={form.source} onChange={set("source")} options={SOURCES} />
            <div>
              <label htmlFor="location" className={label}>Location (city, state) *</label>
              <input id="location" required className={input} value={form.location} onChange={(e) => set("location")(e.target.value)} placeholder="e.g. Pune, Maharashtra" />
            </div>
            <div>
              <label htmlFor="date" className={label}>Date of observation *</label>
              <input id="date" type="date" required className={input} value={form.date} onChange={(e) => set("date")(e.target.value)} />
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <legend className="px-2 font-display text-lg font-semibold text-foreground">3. Observation</legend>
          <div className="mt-2 grid gap-5">
            <Select id="concern" text="Type of concern" value={form.concern} onChange={set("concern")} options={CONCERN_TYPES} />
            <div>
              <label htmlFor="observation" className={label}>Observation *</label>
              <textarea id="observation" required minLength={10} rows={5} className={input} value={form.observation} onChange={(e) => set("observation")(e.target.value)} placeholder="What did you see, smell or notice? Avoid personal or patient information." />
            </div>
            <div>
              <span className={label}>Evidence / photo (optional)</span>
              <label htmlFor="evidence" className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-input bg-secondary/40 px-4 py-8 text-center hover:border-teal">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-teal" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                <span className="text-sm font-semibold text-foreground">Click to attach photos</span>
                <span className="text-xs text-muted-foreground">Files stay on your device in this prototype — nothing is uploaded.</span>
              </label>
              <input id="evidence" type="file" accept="image/*" multiple className="sr-only" onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))} />
              {files.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {files.map((f) => <li key={f} className="rounded-full bg-teal-soft px-3 py-1 text-xs font-medium text-accent-foreground">{f}</li>)}
                </ul>
              )}
            </div>
          </div>
        </fieldset>

        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">Simulated submission — no data is transmitted or stored.</p>
          <button type="submit" className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 sm:w-auto">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}
