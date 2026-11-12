import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="آسمان کتاب — خانه">
      <svg viewBox="0 0 32 32" className="size-8 transition-transform duration-700 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" fill="none" aria-hidden>
        <path d="M4 17 L28 5 L20 27 L15 19 Z" fill="currentColor" opacity="0.9" />
        <path d="M15 19 L28 5" stroke="var(--color-paper)" strokeWidth="1" opacity="0.6" />
      </svg>
      <span className="font-display text-2xl font-bold leading-none">آسمان کتاب</span>
    </Link>
  );
}
