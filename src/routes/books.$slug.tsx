import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Gift, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/site/BookCard";
import { BookCover } from "@/components/site/BookCover";
import { Reveal } from "@/components/site/Reveal";
import { BOOKS, discountPercent, formatToman, getBook, toFa } from "@/lib/books";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/books/$slug")({
  loader: ({ params }) => {
    const book = getBook(params.slug);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "کتاب پیدا نشد — آسمان کتاب" }, { name: "robots", content: "noindex" }] };
    const { book } = loaderData;
    const title = `${book.title} — ${book.author} | آسمان کتاب`;
    return {
      meta: [
        { title },
        { name: "description", content: book.description },
        { property: "og:title", content: title },
        { property: "og:description", content: book.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-48 text-center">
      <h1 className="text-4xl text-foreground">این کتاب در قفسه‌های ما نیست</h1>
      <Link to="/books" search={{ q: undefined, cat: undefined }} className="mt-6 inline-block text-primary underline underline-offset-8">
        بازگشت به کتاب‌ها
      </Link>
    </div>
  ),
  component: BookPage,
});

function BookPage() {
  const { book } = Route.useLoaderData();
  const { add } = useCart();
  const off = discountPercent(book);
  const related = BOOKS.filter((b) => b.category === book.category && b.slug !== book.slug).slice(0, 4);

  return (
    <>
      <section className="bg-sky-fade">
        <div className="container-page grid items-center gap-14 pt-36 pb-20 md:pt-44 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div className="rounded-[2.5rem] bg-beige px-[16%] py-[14%]">
              <div className="animate-float">
                <BookCover book={book} size="lg" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <Link
              to="/books"
              search={{ q: undefined, cat: book.category }}
              className="eyebrow link-underline"
            >
              {book.category}
            </Link>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.35] text-foreground md:text-7xl">{book.title}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{book.author}</p>
            <p className="mt-8 max-w-xl text-lg leading-9 text-foreground/80">{book.description}</p>

            <div className="mt-10 flex flex-wrap items-end gap-4">
              <p className="font-display text-4xl font-semibold text-foreground">{formatToman(book.price)}</p>
              {book.oldPrice && (
                <>
                  <p className="pb-1 text-muted-foreground line-through">{toFa(book.oldPrice)}</p>
                  <span className="mb-1 rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{toFa(off)}٪ تخفیف</span>
                </>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="xl" onClick={() => add(book.slug)}>
                افزودن به سبد خرید
              </Button>
              <Button asChild variant="ink" size="xl">
                <Link to="/books" search={{ q: undefined, cat: undefined }}>
                  ادامه‌ی گشت‌وگذار <ArrowLeft />
                </Link>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-8 text-sm">
              <div>
                <dt className="flex items-center gap-2 text-muted-foreground"><BookOpen className="size-4" /> صفحات</dt>
                <dd className="mt-1 text-foreground">{toFa(book.pages)} صفحه</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-muted-foreground"><Truck className="size-4" /> ارسال</dt>
                <dd className="mt-1 text-foreground">۱ تا ۳ روز کاری</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-muted-foreground"><Gift className="size-4" /> هدیه</dt>
                <dd className="mt-1 text-foreground">بسته‌بندی رایگان</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-page pt-20">
          <Reveal>
            <p className="eyebrow">از همین قفسه</p>
            <h2 className="mt-3 text-4xl font-semibold text-foreground">شاید این‌ها را هم دوست داشته باشید</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-8 lg:grid-cols-4">
            {related.map((b, i) => (
              <Reveal key={b.slug} delay={i * 90}>
                <BookCard book={b} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
