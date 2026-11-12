import { cn } from "@/lib/utils";

/** Soft, slow-drifting cloud wisps layered over media. */
export function Clouds({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <span className="absolute top-[18%] h-24 w-[38rem] rounded-full bg-snow/25 blur-3xl animate-drift-slow" />
      <span className="absolute top-[52%] h-16 w-[28rem] rounded-full bg-snow/20 blur-3xl animate-drift [animation-delay:-25s]" />
      <span className="absolute top-[70%] h-28 w-[44rem] rounded-full bg-snow/15 blur-3xl animate-drift-slow [animation-delay:-60s]" />
    </div>
  );
}
