import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DemoBadge } from "@/components/DemoBadge";
import { DEMO_REPORTS, MEDIA, PHARMA_CATEGORIES, CONCERN_TYPES, STATUS_STYLES, countBy } from "@/lib/demoData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "EcoPV Intelligence Dashboard — EcoPV-India (Prototype)" },
      { name: "description", content: "Filter simulated environmental pharmacovigilance reports by medium, concern and pharmaceutical category. Simulated demo data only." },
      { property: "og:title", content: "EcoPV Intelligence Dashboard — EcoPV-India (Prototype)" },
      { property: "og:description", content: "Simulated dashboard for pharmaceutical-related environmental reports. Student prototype." },
    ],
  }),
  component: DashboardPage,
});

const sel = "rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function BarList({ title, data, total }: { title: string; data: { label: string; count: number }[]; total: number }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="font-display text-base font-semibold text-foreground">{title}</h2>
      {data.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No records match the filters.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {data.map((d) => (
            <div key={d.label}>
              <div className="flex justify-between gap-2 text-sm">
                <span className="truncate font-medium text-foreground">{d.label}</span>
                <span className="shrink-0 text-muted-foreground">{d.count} · {Math.round((d.count / total) * 100)}%</span>
              </div>
              <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gradient-to-r from-teal to-leaf" style={{ width: `${(d.count / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DashboardPage() {
  const [medium, setMedium] = useState("All");
  const [pharma, setPharma] = useState("All");
  const [concern, setConcern] = useState("All");

  const rows = useMemo(
    () => DEMO_REPORTS.filter((r) => (medium === "All" || r.medium === medium) && (pharma === "All" || r.pharmaCategory === pharma) && (concern === "All" || r.concern === concern)),
    [medium, pharma, concern],
  );
  const total = Math.max(1, rows.length);
  const filtered = medium !== "All" || pharma !== "All" || concern !== "All";

  return (
    <div>
      <section className="bg-navy px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">EcoPV Intelligence Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              An overview of {DEMO_REPORTS.length} simulated environmental concern reports by medium,
              concern type and pharmaceutical category.
            </p>
          </div>
          <DemoBadge className="border-white/30 bg-white/10 text-white" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        {/* Filters */}
        <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          {[
            ["Environmental medium", medium, setMedium, MEDIA],
            ["Pharmaceutical category", pharma, setPharma, PHARMA_CATEGORIES],
            ["Concern type", concern, setConcern, CONCERN_TYPES],
          ].map(([l, v, fn, opts]) => (
            <label key={l as string} className="flex min-w-[180px] flex-1 flex-col gap-1 text-xs font-semibold text-muted-foreground">
              {l as string}
              <select className={sel} value={v as string} onChange={(e) => (fn as (s: string) => void)(e.target.value)}>
                <option>All</option>
                {(opts as readonly string[]).map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
          ))}
          <button
            onClick={() => { setMedium("All"); setPharma("All"); setConcern("All"); }}
            disabled={!filtered}
            className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary disabled:opacity-40"
          >
            Reset
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            ["Total simulated reports", rows.length, filtered ? `of ${DEMO_REPORTS.length} (filtered)` : "All demo records"],
            ["Media affected", new Set(rows.map((r) => r.medium)).size, "Distinct environmental media"],
            ["Locations", new Set(rows.map((r) => r.location)).size, "Distinct demo locations"],
            ["Flagged for review", rows.filter((r) => r.status === "Flagged for Expert Review").length, "Need expert verification"],
          ].map(([l, v, s]) => (
            <div key={l as string} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{l}</p>
              <p className="mt-3 font-display text-3xl font-bold text-foreground">{v}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <BarList title="Environmental medium" data={countBy(rows, "medium")} total={total} />
          <BarList title="Concern categories" data={countBy(rows, "concern")} total={total} />
          <BarList title="Pharmaceutical categories" data={countBy(rows, "pharmaCategory")} total={total} />
        </div>

        {/* Recent reports */}
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
            <h2 className="font-display text-lg font-semibold text-foreground">Recent demo reports</h2>
            <DemoBadge />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  {["Reference", "Date", "Pharmaceutical", "Medium", "Concern", "Location", "Status"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-border align-top">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-primary">{r.id}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{r.date}</td>
                    <td className="px-4 py-3 text-foreground">{r.pharmaCategory}</td>
                    <td className="px-4 py-3 text-foreground">{r.medium}</td>
                    <td className="px-4 py-3 text-foreground">{r.concern}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.location}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[r.status]}`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No simulated reports match these filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="border-t border-border p-4 text-xs text-muted-foreground">
            SIMULATED DEMO DATA — fictional records for demonstration. No real patient or reporter data.
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <Link to="/report" className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">Report a concern</Link>
          <Link to="/signals" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Go to Signal Detection →</Link>
        </div>
      </div>
    </div>
  );
}
