import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { BookCover } from "./BookCover";
import { discountPercent, formatToman, toFa, type Book } from "@/lib/books";
import { useCart } from "@/lib/cart";

export function BookCard({ book }: { book: Book }) {
  const { add } = useCart();
  const off = discountPercent(book);

  return (
    <article className="group relative">
      <Link
        to="/books/$slug"
        params={{ slug: book.slug }}
        className="relative block rounded-2xl bg-beige/70 px-[14%] pt-[12%] pb-[10%] transition-colors duration-700 group-hover:bg-beige"
      >
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:-rotate-1">
          <BookCover book={book} />
        </div>
        {book.badge && (
          <span
            className={
              book.oldPrice
                ? "absolute top-4 end-4 rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground"
                : "absolute top-4 end-4 rounded-full bg-paper/90 px-3 py-1 text-xs text-forest"
            }
          >
            {off ? `${toFa(off)}٪ تخفیف` : book.badge}
          </span>
        )}
      </Link>
      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-semibold text-foreground">
            <Link to="/books/$slug" params={{ slug: book.slug }}>
              {book.title}
            </Link>
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{book.author}</p>
          <p className="mt-2 text-sm font-medium text-foreground">
            {formatToman(book.price)}
            {book.oldPrice && <span className="ms-2 text-xs text-muted-foreground line-through">{toFa(book.oldPrice)}</span>}
          </p>
        </div>
        <button
          type="button"
          onClick={() => add(book.slug)}
          aria-label={`افزودن ${book.title} به سبد خرید`}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-foreground/15 text-foreground transition-all duration-500 hover:rotate-90 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </article>
  );
}
