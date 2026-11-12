import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { toFa } from "@/lib/books";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "خانه" },
  { to: "/books", label: "کتاب‌ها" },
  { to: "/about", label: "درباره‌ی ما" },
  { to: "/contact", label: "تماس" },
] as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const overMedia = pathname === "/" && !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={cn(
          "container-page flex h-16 items-center justify-between rounded-full transition-all duration-700 md:h-[4.25rem]",
          overMedia ? "text-on-media" : "glass text-foreground shadow-soft",
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-9 md:flex" aria-label="ناوبری اصلی">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="link-underline text-[0.95rem] opacity-85 transition-opacity hover:opacity-100 data-[status=active]:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            to="/books"
            search={{ q: undefined, cat: undefined }}
            aria-label="جست‌وجوی کتاب"
            className="grid size-11 place-items-center rounded-full transition-colors hover:bg-foreground/5"
          >
            <Search className="size-[1.15rem]" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="سبد خرید"
            className="relative grid size-11 place-items-center rounded-full transition-colors hover:bg-foreground/5"
          >
            <ShoppingBag className="size-[1.15rem]" />
            {count > 0 && (
              <span className="absolute top-1.5 end-1.5 grid size-[1.1rem] place-items-center rounded-full bg-accent text-[0.65rem] text-accent-foreground">
                {toFa(count)}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="باز کردن منو"
            className="grid size-11 place-items-center rounded-full transition-colors hover:bg-foreground/5 md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" dir="rtl" className="w-full max-w-none border-0 bg-paper sm:max-w-sm">
          <SheetTitle className="sr-only">منو</SheetTitle>
          <div className="flex h-full flex-col pt-10">
            <nav className="flex flex-col gap-2" aria-label="ناوبری موبایل">
              {NAV.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className="animate-page-in border-b border-border py-5 font-display text-3xl text-foreground data-[status=active]:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="mt-auto pb-4 text-sm text-muted-foreground">اینجا هر کتاب، شروع یک دنیای تازه است.</p>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
