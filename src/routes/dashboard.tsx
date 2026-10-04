import { createFileRoute } from "@tanstack/react-router";
import { DemoBadge } from "@/components/DemoBadge";
import { DEMO_REPORTS, CATEGORY_COUNTS, STATUS_STYLES } from "@/lib/demoData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "EcoPV Dashboard — EcoPV-India (Prototype)" },
      { name: "description", content: "Simulated review dashboard for environmental pharmacovigilance reports: KPIs, case queue and category trends. Demo data only." },
      { property: "og:title", content: "EcoPV Dashboard — EcoPV-India (Prototype)" },
      { property: "og:description", content: "Simulated review workflow for pharmaceutical-related environmental reports. Student prototype, demo data." },
    ],
  }),
  component: DashboardPage,
});

const SEVERITY_STYLES: Record<string, string> = {
  Low: "bg-secondary text-secondary-foreground",
  Moderate: "bg-teal-soft text-accent-foreground",
  High: "bg-destructive/10 text-destructive",
};

function KpiCard({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <span className={`h-2.5 w-2.5 rounded-full ${tone}`} aria-hidden />
      </div>
      <p className="mt-3 font-display text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function DashboardPage() {
  return (
    <div>
      <section className="bg-navy px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">EcoPV Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              The reviewer view of the proposed platform: incoming environmental
              concern reports, their review status, and emerging category trends.
            </p>
          </div>
          <DemoBadge className="border-white/30 bg-white/10 text-white" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard label="Demo reports" value="1,248" sub="All-time, simulated" tone="bg-teal" />
          <KpiCard label="Awaiting review" value="86" sub="New + under review" tone="bg-chart-4" />
          <KpiCard label="Verified concerns" value="412" sub="33% of demo total" tone="bg-leaf" />
          <KpiCard label="Active signals" value="6" sub="See Signal Detection" tone="bg-destructive" />
        </div>

        {/* Category trend */}
        <section className="mt-8 grid gap-5 lg:grid-cols-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-3">
            <h2 className="font-display text-lg font-semibold text-foreground">Demo reports by category</h2>
            <p className="mt-1 text-xs text-muted-foreground">Simulated distribution across the five concern categories.</p>
            <div className="mt-6 flex h-48 items-end gap-3 sm:gap-6">
              {CATEGORY_COUNTS.map((c, i) => (
                <div key={c.category} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">{c.count}</span>
                  <div
                    className={`w-full rounded-t-lg ${i === 0 ? "bg-gradient-to-t from-teal to-leaf" : "bg-teal/60"}`}
                    style={{ height: `${Math.max(8, c.pct * 1.8)}%` }}
                  />
                  <span className="line-clamp-2 h-8 text-center text-[10px] leading-tight text-muted-foreground sm:text-[11px]">
                    {c.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <h2 className="font-display text-lg font-semibold text-foreground">Review workflow</h2>
            <ol className="mt-5 space-y-4">
              {[
                ["New", "Report triaged; location and medicine fields validated."],
                ["Under Review", "Reviewer assesses plausibility and completeness."],
                ["Verified", "Concern confirmed as structured case data."],
                ["Escalated", "High-severity cases flagged for signal analysis."],
              ].map(([step, text], i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-xs font-bold text-foreground">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed">
                    <strong className="text-foreground">{step}.</strong>{" "}
                    <span className="text-muted-foreground">{text}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Case queue table */}
        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-foreground">Demo case queue</h2>
            <DemoBadge />
          </div>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Ref ID</th>
                  <th className="px-4 py-3 font-semibold">Medicine</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Severity</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_REPORTS.map((r) => (
                  <tr key={r.id} className="border-b border-border/70 transition-colors last:border-0 hover:bg-secondary/40">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-foreground">{r.id}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-foreground">{r.medicine}</span>
                      <span className="mt-0.5 block max-w-xs truncate text-xs text-muted-foreground">{r.summary}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{r.category}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{r.location}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{r.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${SEVERITY_STYLES[r.severity]}`}>
                        {r.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Showing 8 of 1,248 simulated reports. This dashboard is part of a
            student-developed prototype — not an official government or IPC programme.
          </p>
        </section>
      </div>
    </div>
  );
}
