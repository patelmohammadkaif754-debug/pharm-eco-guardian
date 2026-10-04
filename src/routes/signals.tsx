import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoBadge } from "@/components/DemoBadge";
import { DEMO_SIGNALS, PRIORITY_STYLES } from "@/lib/demoData";

export const Route = createFileRoute("/signals")({
  head: () => ({
    meta: [
      { title: "Signal Detection — EcoPV-India (Prototype)" },
      { name: "description", content: "Rule-based screening of simulated reports into potential environmental safety patterns that require expert verification." },
      { property: "og:title", content: "Signal Detection — EcoPV-India (Prototype)" },
      { property: "og:description", content: "Transparent screening heuristic on simulated demo data. Not an official IPC/Government programme." },
    ],
  }),
  component: SignalsPage,
});

const RULES = [
  ["Group", "Reports sharing the same pharmaceutical category and environmental medium (or disposal setting) are grouped."],
  ["Count", "≥5 similar reports → High · 3–4 → Medium · fewer than 3 → Low."],
  ["Repeat location", "If 3 or more reports come from one location, priority rises one level (max High)."],
];

function SignalsPage() {
  return (
    <div>
      <section className="bg-navy px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Signal Detection</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              Potential environmental safety patterns found by a simple, transparent screening rule.
              These are prompts for expert review — not findings.
            </p>
          </div>
          <DemoBadge className="border-white/30 bg-white/10 text-white" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-foreground">Screening heuristic</h2>
          <ol className="mt-4 grid gap-4 md:grid-cols-3">
            {RULES.map(([t, d], i) => (
              <li key={t} className="rounded-xl bg-secondary/60 p-4">
                <span className="font-display text-sm font-bold text-teal">Step {i + 1} · {t}</span>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {DEMO_SIGNALS.map((s) => (
            <article key={s.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-muted-foreground">{s.id}</span>
                <span className={`rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${PRIORITY_STYLES[s.priority]}`}>
                  {s.priority} priority
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-primary">{s.matches.length}</span>
                <span className="text-sm text-muted-foreground">similar simulated reports</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Locations: {s.locations.join(", ")}</p>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reason for priority</p>
                <ul className="mt-2 space-y-1.5">
                  {s.reasons.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />{r}
                    </li>
                  ))}
                </ul>
              </div>

              <details className="mt-4 text-sm">
                <summary className="cursor-pointer font-semibold text-teal">Matched reports</summary>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {s.matches.map((m) => <li key={m.id}><span className="font-mono text-primary">{m.id}</span> · {m.location}</li>)}
                </ul>
              </details>

              <p className="mt-auto pt-5">
                <span className="block rounded-xl border border-leaf/40 bg-leaf-soft px-3 py-2 text-center text-xs font-semibold text-foreground">
                  Requires expert/environmental verification
                </span>
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-secondary/50 p-5 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Important:</strong> These patterns are generated from simulated demo data.
          They do not indicate toxicity, contamination, causality or any regulatory confirmation. Any real-world
          pattern would require scientific sampling and expert environmental verification.
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <Link to="/dashboard" className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">← Back to Dashboard</Link>
          <Link to="/report" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Report a concern</Link>
        </div>
      </div>
    </div>
  );
}
