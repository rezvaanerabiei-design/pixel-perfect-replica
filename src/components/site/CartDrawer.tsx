import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BookCover } from "./BookCover";
import { useCart } from "@/lib/cart";
import { formatToman, toFa } from "@/lib/books";

export function CartDrawer() {
  const { open, setOpen, lines, total, setQty, remove } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" dir="rtl" className="flex w-full flex-col border-0 bg-paper p-0 sm:max-w-md">
        <div className="border-b border-border px-6 py-6">
          <SheetTitle className="font-display text-2xl font-semibold text-foreground">سبد خرید</SheetTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {lines.length ? `${toFa(lines.reduce((s, l) => s + l.qty, 0))} جلد کتاب` : "هنوز کتابی انتخاب نکرده‌اید"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-xl text-foreground">قفسه‌ی شما خالی است</p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">سفر بعدی‌تان را میان کتاب‌های برگزیده پیدا کنید.</p>
              <Button asChild variant="hero" size="pill" className="mt-6" onClick={() => setOpen(false)}>
                <Link to="/books" search={{ q: undefined, cat: undefined }}>
                  دیدن کتاب‌ها
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {lines.map((l) => (
                <li key={l.slug} className="flex gap-4 py-5">
                  <div className="w-16 shrink-0">
                    <BookCover book={l.book} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-display text-base font-semibold text-foreground">{l.book.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{l.book.author}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(l.slug)}
                        aria-label="حذف از سبد"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1">
                        <button type="button" aria-label="افزایش" onClick={() => setQty(l.slug, l.qty + 1)} className="p-1 text-foreground">
                          <Plus className="size-3.5" />
                        </button>
                        <span className="min-w-4 text-center text-sm">{toFa(l.qty)}</span>
                        <button type="button" aria-label="کاهش" onClick={() => setQty(l.slug, l.qty - 1)} className="p-1 text-foreground">
                          <Minus className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-foreground">{formatToman(l.book.price * l.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border bg-beige/50 px-6 py-6">
            <div className="flex items-center justify-between text-foreground">
              <span className="text-sm text-muted-foreground">جمع کل</span>
              <span className="font-display text-xl font-semibold">{formatToman(total)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">ارسال برای سفارش‌های بالای ۵۰۰ هزار تومان رایگان است.</p>
            <Button variant="hero" size="xl" className="mt-5 w-full">
              ادامه‌ی خرید و پرداخت
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
