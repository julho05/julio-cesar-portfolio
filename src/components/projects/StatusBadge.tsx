import type { ProjectStatus } from "@/types/content";
import { cn } from "@/lib/cn";

const dot: Record<ProjectStatus, string> = {
  demo: "bg-emerald-400",
  completed: "bg-blue-400",
  evolving: "bg-amber-400",
};

export function StatusBadge({ status, label, className }: { status: ProjectStatus; label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0b0f19]/80 px-2.5 py-1 text-[11px] font-medium text-slate-100 backdrop-blur-md",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dot[status])} />
      {label}
    </span>
  );
}
