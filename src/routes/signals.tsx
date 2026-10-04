import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { DemoBadge } from "@/components/DemoBadge";
import { DEMO_SIGNALS } from "@/lib/demoData";

export const Route = createFileRoute("/signals")({
  head: () => ({
    meta: [
      { title: "Signal Detection — EcoPV-India (Prototype)" },
      { name: "description", content: "How clustered environmental reports become ranked pharmacovigilance-style signals. Simulated demo data in a student prototype." },
      { property: "og:title", content: "Signal Detection — EcoPV-India (Prototype)" },
      { property: "og:description", content: "Ranked simulated signals linking medicines to environmental effects. Student prototype, not an official IPC programme." },
    ],
  }),
  component: SignalsPage,
});

const STRENGTH_STYLES: Record<string, string> = {
  Strong: "bg-destructive/10 text-destructive",
  Moderate: "bg-teal-soft text-accent-foreground",
  Developing: "bg-secondary text-secondary-foreground",
};

const STRENGTH_BAR: Record<string, string> = {
  Strong: "bg-destructive",
  Moderate: "bg-teal",
  Developing: "bg-muted-foreground/50",
};

function SignalsPage() {
  return (
    <div>
      <section className="bg-navy px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Signal Detection</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              In pharmacovigilance, a <strong className="text-white">signal</strong> is new evidence
              of a possible causal relationship. Here, clusters of environmental
              reports would be ranked to suggest where scientific follow-up is
              most warranted.
            </p>
          </div>
          <DemoBadge className="border-white/30 bg-white/10 text-white" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Method strip */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Cluster", "Reports sharing the same medicine class and environmental endpoint are grouped."],
            ["Score", "Report volume, severity and geographic spread produce a confidence score."],
            ["Recommend", "Strong signals get a proposed follow-up: literature review, sampling, field study."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-teal">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        {/* Signal list */}
        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-foreground">Active demo signals</h2>
            <DemoBadge />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {DEMO_SIGNALS.map((s) => (
              <article key={s.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs font-semibold text-muted-foreground">{s.id}</p>
                    <h3 className="mt-1 font-display text-lg font-bold leading-snug text-foreground">{s.drugClass}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.endpoint}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STRENGTH_STYLES[s.strength]}`}>
                    {s.strength}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Signal confidence</span>
                    <span className="font-semibold text-foreground">{s.confidence}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className={`h-full rounded-full ${STRENGTH_BAR[s.strength]}`} style={{ width: `${s.confidence}%` }} />
                  </div>
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-secondary/60 px-3 py-2">
                    <dt className="text-xs text-muted-foreground">Supporting reports</dt>
                    <dd className="font-semibold text-foreground">{s.reports}</dd>
                  </div>
                  <div className="rounded-lg bg-secondary/60 px-3 py-2">
                    <dt className="text-xs text-muted-foreground">Regions</dt>
                    <dd className="font-semibold text-foreground">{s.regions}</dd>
                  </div>
                </dl>

                <div className="mt-4 border-l-4 border-teal bg-teal-soft/50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/70">Recommended action</p>
                  <p className="mt-1 text-sm text-accent-foreground">{s.recommendedAction}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Methodology note */}
        <section className="mt-10 rounded-2xl border border-leaf/30 bg-leaf-soft/60 p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-foreground">A note on methodology</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Real pharmacovigilance signal detection uses established statistical
            methods (disproportionality analysis, Bayesian clustering) on large,
            verified datasets. This prototype uses a simplified simulated score to
            demonstrate the <em>concept</em> only. EcoPV-India is a student-developed
            proposed prototype — not an official government or IPC programme — and no
            signal here reflects a confirmed real-world finding.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/dashboard" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-navy-deep">
              See the source demo reports
            </Link>
            <Link to="/report" className="rounded-xl border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">
              Add a demo report
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
