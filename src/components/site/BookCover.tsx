import { cva } from "class-variance-authority";
import type { Book, CoverMotif } from "@/lib/books";
import { cn } from "@/lib/utils";

const coverVariants = cva(
  "relative isolate flex aspect-[2/3] w-full flex-col overflow-hidden rounded-e-md rounded-s-[3px] shadow-book",
  {
    variants: {
      tone: {
        forest: "bg-forest text-paper",
        sage: "bg-sage text-paper",
        terracotta: "bg-terracotta text-paper",
        ink: "bg-ink text-beige",
        beige: "bg-beige text-forest",
        sky: "bg-sky text-ink",
      },
    },
  },
);

function Motif({ motif }: { motif: CoverMotif }) {
  const common = "absolute inset-x-0 mx-auto opacity-80";
  switch (motif) {
    case "plane":
      return (
        <svg
          viewBox="0 0 120 60"
          className={cn(common, "top-[38%] w-2/3")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M8 44 C 40 40, 70 26, 104 12" strokeDasharray="2 4" />
          <path d="M104 12 L 86 30 L 84 20 L 74 18 Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "sun":
      return (
        <svg
          viewBox="0 0 100 100"
          className={cn(common, "top-[30%] w-1/2")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="50" cy="50" r="20" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            return (
              <line
                key={i}
                x1={50 + Math.cos(a) * 28}
                y1={50 + Math.sin(a) * 28}
                x2={50 + Math.cos(a) * 40}
                y2={50 + Math.sin(a) * 40}
              />
            );
          })}
        </svg>
      );
    case "arch":
      return (
        <svg
          viewBox="0 0 100 120"
          className={cn(common, "top-[26%] w-[42%]")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M10 118 V 50 A 40 40 0 0 1 90 50 V 118" />
          <path d="M22 118 V 54 A 28 28 0 0 1 78 54 V 118" />
          <circle cx="50" cy="52" r="5" />
        </svg>
      );
    case "lines":
      return (
        <svg
          viewBox="0 0 100 60"
          className={cn(common, "top-[38%] w-2/3")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={i} d={`M0 ${8 + i * 7} Q 50 ${i * 7 - 2}, 100 ${8 + i * 7}`} />
          ))}
        </svg>
      );
    case "moon":
      return (
        <svg
          viewBox="0 0 100 100"
          className={cn(common, "top-[30%] w-[45%]")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M62 20 A 32 32 0 1 0 80 70 A 26 26 0 1 1 62 20 Z" />
          <circle cx="24" cy="24" r="1.5" fill="currentColor" />
          <circle cx="82" cy="30" r="1" fill="currentColor" />
          <circle cx="16" cy="70" r="1" fill="currentColor" />
        </svg>
      );
    case "leaf":
      return (
        <svg
          viewBox="0 0 100 120"
          className={cn(common, "top-[28%] w-[38%]")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M50 116 V 30" />
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i}>
              <path d={`M50 ${40 + i * 13} q -22 -6 -30 -22 q 20 2 30 18`} />
              <path d={`M50 ${46 + i * 13} q 22 -6 30 -22 q -20 2 -30 18`} />
            </g>
          ))}
        </svg>
      );
  }
}

export function BookCover({
  book,
  className,
  size = "md",
}: {
  book: Book;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className={cn(coverVariants({ tone: book.tone }), className)}>
      {/* spine sits on the right for right-to-left books */}
      <span aria-hidden className="absolute inset-y-0 start-0 w-[7%] bg-ink/15" />
      <span aria-hidden className="absolute inset-y-0 start-[7%] w-px bg-snow/20" />
      <span
        aria-hidden
        className="absolute inset-[7%] start-[13%] rounded-[2px] border border-current opacity-25"
      />
      {size !== "sm" && <Motif motif={book.motif} />}
      {size === "sm" ? null : (
        <>
          <div
            className={cn(
              "relative mt-[16%] px-[16%] text-center",
              size === "lg" ? "space-y-3" : "space-y-1.5",
            )}
          >
            <p
              className={cn(
                "font-display font-semibold leading-snug",
                size === "lg" ? "text-4xl" : "text-[clamp(1rem,1.6vw,1.35rem)]",
              )}
            >
              {book.title}
            </p>
          </div>
          <p
            className={cn(
              "relative mt-auto mb-[14%] px-[16%] text-center opacity-80",
              size === "lg" ? "text-base" : "text-[0.7rem]",
            )}
          >
            {book.author}
          </p>
        </>
      )}
    </div>
  );
}
