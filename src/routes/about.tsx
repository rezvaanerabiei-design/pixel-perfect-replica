import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import interior from "@/assets/bookstore-interior.jpg";
import { Button } from "@/components/ui/button";
import { Reveal, useParallax } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "درباره‌ی ما — آسمان کتاب" },
      { name: "description", content: "داستان آسمان کتاب؛ کتاب‌فروشی‌ای که باور دارد هر کتاب، آغاز یک سفر تازه است." },
      { property: "og:title", content: "درباره‌ی ما — آسمان کتاب" },
      { property: "og:description", content: "کتاب‌فروشی‌ای که باور دارد هر کتاب، آغاز یک سفر تازه است." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { n: "۰۱", title: "گزینش با دقت", text: "هر کتابی که روی قفسه‌ی ما می‌نشیند، پیش‌تر خوانده و دوست داشته شده است." },
  { n: "۰۲", title: "احترام به کاغذ", text: "چاپ‌های خوب، جلدهای ماندگار و بسته‌بندی‌ای که شایسته‌ی یک کتاب است." },
  { n: "۰۳", title: "همراهی با خواننده", text: "کتاب‌دارهای ما با حوصله گوش می‌دهند و کتاب بعدی را با شما انتخاب می‌کنند." },
];

function AboutPage() {
  const parallax = useParallax<HTMLDivElement>(0.08);
  return (
    <>
      <section className="container-page pt-36 md:pt-48">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">داستان ما</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.35] text-foreground md:text-7xl">
            جایی میان قفسه‌های چوبی و آسمانی باز
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-muted-foreground">
            آسمان کتاب از یک قفسه‌ی کوچک در خانه شروع شد؛ با این باور ساده که خواندن، آزادترین شکل پرواز است. امروز
            کتاب‌فروشی‌ای هستیم برای کسانی که هنوز بوی کاغذ تازه را دوست دارند.
          </p>
        </Reveal>
      </section>

      <section className="pt-20 md:pt-28">
        <Reveal variant="image" className="relative mx-3 aspect-[16/10] rounded-[2rem] md:mx-5 md:aspect-[21/9]">
          <div ref={parallax} className="absolute -inset-y-16 inset-x-0">
            <img src={interior} alt="فضای داخلی کتاب‌فروشی آسمان کتاب" width={1600} height={1200} loading="lazy" className="size-full object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="container-page grid gap-12 pt-28 md:grid-cols-12 md:pt-40">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">آنچه به آن باور داریم</p>
          <h2 className="mt-3 text-4xl font-semibold text-foreground md:text-5xl">سه اصل ساده</h2>
        </Reveal>
        <div className="divide-y divide-border border-y border-border md:col-span-7 md:col-start-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} delay={i * 100} className="flex gap-8 py-10">
              <span className="text-sm text-terracotta">{v.n}</span>
              <div>
                <h3 className="text-2xl font-semibold text-foreground md:text-3xl">{v.title}</h3>
                <p className="mt-3 text-lg leading-8 text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pt-28 md:pt-40">
        <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-forest p-10 text-paper md:flex-row md:items-center md:p-16">
          <h2 className="max-w-xl text-3xl font-semibold leading-[1.5] md:text-4xl">سفر بعدی‌تان، روی قفسه منتظر است.</h2>
          <Button asChild variant="glass-media" size="xl">
            <Link to="/books" search={{ q: undefined, cat: undefined }}>
              دیدن کتاب‌ها <ArrowLeft />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
