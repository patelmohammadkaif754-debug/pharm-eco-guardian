export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-teal/40 bg-teal-soft px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
      Demo Data
    </span>
  );
}

export function PrototypeDisclaimer() {
  return (
    <div className="border-b border-navy/20 bg-navy-deep px-4 py-2 text-center text-xs leading-relaxed text-primary-foreground/90 sm:text-[13px]">
      <span className="font-semibold text-white">Student-developed proposed prototype.</span>{" "}
      This is <strong>not</strong> an official government or Indian Pharmacopoeia
      Commission (IPC) programme. All data shown is simulated demo data.
    </div>
  );
}
