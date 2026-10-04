export function DemoBadge({ className = "", label = "Simulated Demo Data" }: { className?: string; label?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-teal/40 bg-teal-soft px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
      {label}
    </span>
  );
}

export function PrototypeDisclaimer() {
  return (
    <div className="border-b border-navy/20 bg-navy-deep px-4 py-2 text-center text-xs font-medium leading-relaxed text-primary-foreground/90 sm:text-[13px]">
      Student-developed proposed prototype • Simulated Demo Data • Not an official IPC/Government programme.
    </div>
  );
}
