import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { DemoBadge } from "@/components/DemoBadge";
import { DEMO_SIGNALS, CATEGORY_COUNTS } from "@/lib/demoData";
import { TeamSection, TeamIdentityBlock } from "@/components/TeamSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoPV-India — From Medicine Safety to Environmental Safety" },
      { name: "description", content: "A student-developed proposed environmental pharmacovigilance prototype for reporting and detecting pharmaceutical-related environmental concerns in India. Demo data only." },
      { property: "og:title", content: "EcoPV-India — From Medicine Safety to Environmental Safety" },
      { property: "og:description", content: "A student-developed proposed prototype for environmental pharmacovigilance in India. Not an official government or IPC programme." },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    title: "Report",
    text: "Anyone can describe a suspected pharmaceutical-related environmental concern — contaminated water, improper disposal, wildlife effects.",
  },
  {
    title: "Analyse",
    text: "Reports are tagged by medicine, category, location and severity, then reviewed in the EcoPV Dashboard workflow.",
  },
  {
    title: "Detect",
    text: "Clustering similar reports surfaces statistical signals that may warrant scientific follow-up and literature review.",
  },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
      <p className="font-display text-2xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-primary-foreground/70">{label}</p>
    </div>
  );
}

function Index() {
  const strongSignals = DEMO_SIGNALS.filter((s) => s.strength === "Strong").length;

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
              Proposed Prototype
            </span>
            <span className="inline-flex items-center rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
              Student Project
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            From Medicine Safety to{" "}
            <span className="bg-gradient-to-r from-teal to-leaf bg-clip-text text-transparent">
              Environmental Safety
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            Medicines protect people — but their residues can travel into rivers,
            soil, and wildlife. EcoPV-India is a <strong className="text-white">proposed digital
            environmental pharmacovigilance platform</strong> that would let citizens,
            pharmacists, and health workers report environmental concerns
            potentially related to pharmaceutical products.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/report"
              className="inline-flex items-center rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal/25 transition-transform hover:-translate-y-0.5"
            >
              Report an Environmental Concern
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View the Dashboard
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value="1,248" label="Demo reports received" />
            <Stat value="6" label="Active demo signals" />
            <Stat value={String(strongSignals)} label="Strong signals" />
            <Stat value="28" label="States represented" />
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs text-primary-foreground/70">
            <DemoBadge className="border-white/30 bg-white/10 text-white" />
            All figures on this page are simulated for demonstration only.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          How the proposed platform would work
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A three-step workflow borrowed from drug pharmacovigilance, extended to
          the environment.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-leaf-soft font-display text-sm font-bold text-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Where concerns come from + explore cards */}
      <section className="section-rule bg-secondary/50 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Where do pharmaceutical residues come from?
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                ["Manufacturing effluent", "Wastewater discharged near bulk-drug and formulation units."],
                ["Improper disposal", "Expired or unused medicines thrown in household waste or drains."],
                ["Human & veterinary use", "Excreted residues passing through sewage and farm runoff."],
                ["Agricultural run-off", "Veterinary medicines in soil, fodder and water bodies."],
              ].map(([title, text]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" aria-hidden />
                  <p className="text-sm leading-relaxed">
                    <strong className="text-foreground">{title}.</strong>{" "}
                    <span className="text-muted-foreground">{text}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Demo reports by category
            </h2>
            <div className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
              {CATEGORY_COUNTS.map((c) => (
                <div key={c.category}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{c.category}</span>
                    <span className="text-muted-foreground">{c.count}</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal to-leaf"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="pt-1 text-xs text-muted-foreground">Simulated distribution of 1,248 demo reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Explore the prototype
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/report"
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-soft text-teal">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Report Environmental Concern</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Submit a structured, simulated report about a suspected
              pharmaceutical-related environmental issue.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-teal group-hover:underline">Open form →</span>
          </Link>
          <Link
            to="/dashboard"
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-leaf-soft text-leaf">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg>
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">EcoPV Dashboard</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Review the simulated case queue, KPIs and category trends that
              reviewers would monitor.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-teal group-hover:underline">Open dashboard →</span>
          </Link>
          <Link
            to="/signals"
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Signal Detection</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              See how clustered reports become ranked signals with recommended
              scientific follow-up actions.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-teal group-hover:underline">View signals →</span>
          </Link>
        </div>
      </section>

      {/* Project team */}
      <TeamSection />

      {/* Scope note */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="rounded-2xl border border-leaf/30 bg-leaf-soft/60 p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-foreground">
            About this prototype
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            EcoPV-India is a <strong className="text-foreground">student-developed proposed prototype</strong> created
            to explore the concept of environmental pharmacovigilance in India. It is{" "}
            <strong className="text-foreground">not an official government or Indian Pharmacopoeia
            Commission (IPC) programme</strong>, and it does not collect or transmit any real
            reports. Every dataset, KPI, map value and signal shown across this site is
            clearly labelled simulated demo data for educational purposes.
          </p>
        </div>
      </section>

      <TeamIdentityBlock />
    </div>
  );
}
