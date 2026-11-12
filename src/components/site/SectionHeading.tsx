import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  children,
  action,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <Reveal className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-4xl font-semibold text-foreground md:text-5xl">{title}</h2>
        {children && <p className="mt-4 text-lg leading-8 text-muted-foreground">{children}</p>}
      </Reveal>
      {action && <Reveal delay={150}>{action}</Reveal>}
    </div>
  );
}
