import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { BookCard } from "@/components/site/BookCard";
import { Reveal } from "@/components/site/Reveal";
import { BOOKS, CATEGORIES, filterBooks, toFa } from "@/lib/books";
import { cn } from "@/lib/utils";

type BooksSearch = { q?: string | undefined; cat?: string | undefined };

export const Route = createFileRoute("/books/")({
  validateSearch: (search: Record<string, unknown>): BooksSearch => {
    const q = search["q"];
    const cat = search["cat"];
    return {
      q: typeof q === "string" && q ? q : undefined,
      cat: typeof cat === "string" && cat ? cat : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "کتاب‌ها — آسمان کتاب" },
      { name: "description", content: "فهرست کامل کتاب‌های آسمان کتاب؛ رمان ایرانی، ادبیات جهان، شعر کلاسیک، فلسفه و کتاب‌های سفر." },
      { property: "og:title", content: "کتاب‌ها — آسمان کتاب" },
      { property: "og:description", content: "قفسه‌های آسمان کتاب را مرور کنید و کتاب بعدی‌تان را پیدا کنید." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  const { q, cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/books/" });
  const [draft, setDraft] = useState(q ?? "");

  useEffect(() => setDraft(q ?? ""), [q]);

  useEffect(() => {
    const t = setTimeout(() => {
      const next = draft.trim() || undefined;
      if (next !== q) navigate({ search: (prev) => ({ ...prev, q: next }), replace: true });
    }, 300);
    return () => clearTimeout(t);
  }, [draft, q, navigate]);

  const results = filterBooks(BOOKS, { q, cat });

  return (
    <div className="bg-sky-fade">
      <section className="container-page pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow">قفسه‌های آسمان کتاب</p>
          <h1 className="mt-3 text-5xl font-semibold text-foreground md:text-7xl">{cat ?? "همه‌ی کتاب‌ها"}</h1>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={!cat} to={undefined} q={q}>همه</FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip key={c} active={cat === c} to={c} q={q}>
                {c}
              </FilterChip>
            ))}
          </div>
          <label className="glass flex h-12 w-full items-center gap-3 rounded-full px-5 lg:w-80">
            <Search className="size-4 text-sage" aria-hidden />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="جست‌وجوی نام یا نویسنده"
              aria-label="جست‌وجو"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {draft && (
              <button type="button" onClick={() => setDraft("")} aria-label="پاک کردن" className="text-muted-foreground">
                <X className="size-4" />
              </button>
            )}
          </label>
        </Reveal>
      </section>

      <section className="container-page pt-14">
        <p className="text-sm text-muted-foreground">{toFa(results.length)} عنوان</p>
        {results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-foreground">کتابی با این مشخصات پیدا نشد</p>
            <p className="mt-3 text-muted-foreground">عبارت دیگری را امتحان کنید یا همه‌ی قفسه‌ها را ببینید.</p>
            <Link
              to="/books"
              search={{ q: undefined, cat: undefined }}
              className="mt-6 inline-block text-primary underline underline-offset-8"
            >
              نمایش همه‌ی کتاب‌ها
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
            {results.map((b, i) => (
              <Reveal key={b.slug} delay={(i % 4) * 80}>
                <BookCard book={b} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterChip({ active, to, q, children }: { active: boolean; to: string | undefined; q: string | undefined; children: ReactNode }) {
  return (
    <Link
      to="/books"
      search={{ q, cat: to }}
      className={cn(
        "rounded-full px-5 py-2.5 text-sm transition-all duration-500",
        active ? "bg-primary text-primary-foreground shadow-soft" : "bg-paper/70 text-foreground hover:bg-beige",
      )}
    >
      {children}
    </Link>
  );
}
