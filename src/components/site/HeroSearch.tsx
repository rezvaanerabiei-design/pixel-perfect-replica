import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CATEGORIES } from "@/lib/books";
import { Button } from "@/components/ui/button";

export function HeroSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/books", search: { q: q.trim() || undefined, cat: cat || undefined } });
  };

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className="glass grid w-full gap-2 rounded-[1.75rem] p-2 shadow-float md:grid-cols-[1.6fr_1fr_auto] md:rounded-full"
    >
      <label className="flex items-center gap-3 rounded-full px-5 py-3 transition-colors focus-within:bg-snow/70 md:py-2">
        <Search className="size-5 shrink-0 text-sage" aria-hidden />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[0.7rem] text-muted-foreground">جست‌وجو</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="نام کتاب یا نویسنده…"
            className="w-full bg-transparent text-base text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
        </span>
      </label>
      <label className="relative flex items-center gap-3 rounded-full px-5 py-3 transition-colors focus-within:bg-snow/70 md:border-s md:border-foreground/10 md:py-2">
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[0.7rem] text-muted-foreground">دسته‌بندی</span>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full cursor-pointer appearance-none bg-transparent text-base text-foreground focus:outline-none"
          >
            <option value="">همه‌ی کتاب‌ها</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </span>
        <ChevronDown className="size-4 text-muted-foreground" aria-hidden />
      </label>
      <Button type="submit" variant="hero" size="xl" className="h-14 md:h-auto md:min-h-14">
        پیدا کن
      </Button>
    </form>
  );
}
