const TEAM = {
  name: "RISING PHARMAVISION",
  tagline: "Innovate • Protect • Sustain",
  competition: "VBYLD 2027 – Hack for Social Cause",
  lead: {
    name: "Mohammad Kaif Patel",
    role: "Team Lead | EcoPV & Pharmacovigilance",
  },
  members: [
    { name: "Insha Patel", role: "Environmental Research & Analysis" },
    { name: "Fatima Shaikh", role: "UI/UX & Project Documentation" },
  ],
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function MemberAvatar({ name, tone = "teal" }: { name: string; tone?: "teal" | "leaf" }) {
  const bg = tone === "leaf" ? "bg-leaf-soft text-leaf" : "bg-teal-soft text-accent-foreground";
  return (
    <span
      aria-hidden
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ring-2 ring-white ${bg}`}
    >
      {initials(name)}
    </span>
  );
}

function CompetitionChip({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border border-teal/40 bg-teal-soft px-4 py-1.5 text-xs font-semibold text-accent-foreground ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
        <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
      </svg>
      {TEAM.competition}
    </span>
  );
}

export function TeamSection() {
  return (
    <section className="section-rule bg-secondary/50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Project Team
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-[0.06em] text-foreground sm:text-3xl">
              {TEAM.name}
            </h2>
            <p className="mt-2 text-sm font-medium tracking-wide text-muted-foreground">
              {TEAM.tagline}
            </p>
          </div>
          <CompetitionChip />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {/* Team lead — highlighted */}
          <div className="hero-gradient rounded-2xl p-6 shadow-lg sm:p-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
              Team Lead
            </span>

            <div className="mt-5 flex items-center gap-4">
              <span
                aria-hidden
                className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 font-display text-lg font-bold text-white ring-2 ring-white/30"
              >
                {initials(TEAM.lead.name)}
              </span>
              <div className="min-w-0">
                <p className="font-display text-xl font-bold text-white">{TEAM.lead.name}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-teal-soft">
                  {TEAM.lead.role}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/15 pt-4">
              <p className="text-xs leading-relaxed text-primary-foreground/75">
                {TEAM.name} · {TEAM.competition}
              </p>
            </div>
          </div>

          {/* Team members */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {TEAM.members.map((member, i) => (
              <div
                key={member.name}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <MemberAvatar name={member.name} tone={i === 0 ? "teal" : "leaf"} />
                <p className="mt-4 font-display text-lg font-semibold text-foreground">
                  {member.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{member.role}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-dashed border-teal/40 bg-teal-soft/50 p-6 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                Project
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">EcoPV-India</strong> — a student-developed
                proposed environmental pharmacovigilance prototype, prepared for{" "}
                <strong className="text-foreground">{TEAM.competition}</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TeamIdentityBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
      <div className="hero-gradient rounded-2xl px-6 py-7 shadow-lg sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/12 font-display text-sm font-extrabold tracking-wider text-white ring-1 ring-white/25"
            >
              RP
            </span>
            <div>
              <p className="font-display text-base font-extrabold uppercase tracking-[0.14em] text-white sm:text-lg">
                {TEAM.name}
              </p>
              <p className="mt-1 text-xs font-medium tracking-wide text-primary-foreground/80">
                {TEAM.tagline}
              </p>
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/85">
            <li>
              <strong className="font-semibold text-white">{TEAM.lead.name}</strong>
              <span className="text-primary-foreground/60"> · Team Lead</span>
            </li>
            {TEAM.members.map((member) => (
              <li key={member.name}>
                <strong className="font-semibold text-white">{member.name}</strong>
                <span className="text-primary-foreground/60"> · {member.role}</span>
              </li>
            ))}
          </ul>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
            {TEAM.competition}
          </span>
        </div>
      </div>
    </section>
  );
}
