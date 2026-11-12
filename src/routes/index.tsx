import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Gift, Sparkles, Truck } from "lucide-react";
import heroVideo from "@/assets/hero-cabin-reading.mp4.asset.json";
import heroPoster from "@/assets/hero-book-window.jpg";
import paperPlane from "@/assets/books-paper-plane.jpg";
import aboveClouds from "@/assets/reading-above-clouds.jpg";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/site/BookCard";
import { BookCover } from "@/components/site/BookCover";
import { Clouds } from "@/components/site/Clouds";
import { HeroSearch } from "@/components/site/HeroSearch";
import { Reveal, useParallax } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BOOKS, CATEGORIES, getBook, toFa } from "@/lib/books";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "آسمان کتاب — اینجا هر کتاب، شروع یک دنیای تازه است" },
      {
        name: "description",
        content: "کتاب‌فروشی آسمان کتاب؛ گزیده‌ای از ادبیات فارسی و جهان، شعر کلاسیک و فلسفه با ارسال به سراسر ایران.",
      },
      { property: "og:title", content: "آسمان کتاب — اینجا هر کتاب، شروع یک دنیای تازه است" },
      {
        property: "og:description",
        content: "این فقط یک کتاب‌فروشی نیست؛ اینجا شروع ماجراجویی‌های تازه است.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const NEW_ARRIVALS = ["symphony-mordegan", "donyaye-sofi", "sad-sal-tanhayi", "savushun"].map((s) => getBook(s)!);
const BESTSELLERS = ["shazde-koochoolo", "divan-hafez", "boof-e-koor", "shahnameh", "bar-hasti", "kimiagar", "golestan", "zamin-ensanha"].map(
  (s) => getBook(s)!,
);
const FLIGHT = BOOKS.filter((b) => b.category === "سفر و پرواز");

function Home() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <NewArrivals />
      <FlightCollection />
      <Quote />
      <Bestsellers />
      <Journey />
      <Newsletter />
    </>
  );
}

function Hero() {
  const lines = ["اینجا هر کتاب،", "شروع یک دنیای تازه است."];
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      <video
        className="absolute inset-0 size-full object-cover"
        src={heroVideo.url}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="media-veil absolute inset-0" />
      <Clouds />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pt-32 pb-10 text-on-media">
        <p className="hero-line eyebrow text-on-media/85" style={{ ["--d" as string]: "100ms" }}>
          کتاب‌فروشی آسمان کتاب · از ۱۳۹۸
        </p>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,6.25rem)] font-semibold leading-[1.25]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-2">
              <span className="hero-line" style={{ ["--d" as string]: `${250 + i * 180}ms` }}>
                {l}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-line mt-6 max-w-xl text-lg leading-8 text-on-media/85 md:text-xl" style={{ ["--d" as string]: "750ms" }}>
          این فقط یک کتاب‌فروشی نیست؛ اینجا شروع ماجراجویی‌های تازه است.
        </p>
        <div className="hero-line mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "900ms" }}>
          <Button asChild variant="hero" size="xl">
            <Link to="/books" search={{ q: undefined, cat: undefined }}>
              کشف کتاب‌ها
              <ArrowLeft />
            </Link>
          </Button>
          <Button asChild variant="glass-media" size="xl">
            <Link to="/about">داستان ما</Link>
          </Button>
        </div>
      </div>

      <div className="container-page relative z-10 pb-8 md:pb-12">
        <div className="hero-line max-w-4xl" style={{ ["--d" as string]: "1100ms" }}>
          <HeroSearch />
        </div>
        <div className="mt-8 hidden items-center gap-3 text-xs text-on-media/70 md:flex">
          <span className="relative h-10 w-px overflow-hidden bg-on-media/25">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-on-media animate-scroll-cue" />
          </span>
          برای سفر، پایین بروید
        </div>
      </div>
    </section>
  );
}

function CategoryStrip() {
  return (
    <section className="container-page pt-24 md:pt-32">
      <Reveal>
        <p className="eyebrow">قفسه‌ها</p>
      </Reveal>
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {CATEGORIES.map((c, i) => {
          const count = BOOKS.filter((b) => b.category === c).length;
          return (
            <Reveal as="li" key={c} delay={i * 70}>
              <Link
                to="/books"
                search={{ q: undefined, cat: c }}
                className="group flex items-center justify-between gap-6 py-6 md:py-8"
              >
                <span className="flex items-baseline gap-5">
                  <span className="text-sm text-muted-foreground">{toFa(i + 1).padStart(2, "۰")}</span>
                  <span className="font-display text-3xl text-foreground transition-all duration-700 group-hover:-translate-x-3 group-hover:text-primary md:text-5xl">
                    {c}
                  </span>
                </span>
                <span className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="hidden md:inline">{toFa(count)} عنوان</span>
                  <span className="grid size-11 place-items-center rounded-full border border-border transition-all duration-700 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowLeft className="size-4" />
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

function NewArrivals() {
  return (
    <section className="container-page pt-28 md:pt-40">
      <SectionHeading
        eyebrow="تازه‌های قفسه"
        title="تازه رسیده‌اند"
        action={
          <Button asChild variant="ink" size="pill">
            <Link to="/books" search={{ q: undefined, cat: undefined }}>
              همه‌ی کتاب‌ها <ArrowLeft />
            </Link>
          </Button>
        }
      >
        گزیده‌ای از چاپ‌های تازه که این هفته به قفسه‌های ما رسیده‌اند.
      </SectionHeading>
      <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-8 lg:grid-cols-4">
        {NEW_ARRIVALS.map((b, i) => (
          <Reveal key={b.slug} delay={i * 90}>
            <BookCard book={b} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FlightCollection() {
  const parallax = useParallax<HTMLDivElement>(0.08);
  return (
    <section className="pt-28 md:pt-40">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal variant="image" className="relative aspect-[4/5] rounded-[2rem]">
            <div ref={parallax} className="absolute -inset-y-10 inset-x-0">
              <img src={paperPlane} alt="کتاب‌های قدیمی با یک هواپیمای کاغذی" width={1200} height={1504} loading="lazy" className="size-full object-cover" />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow">مجموعه‌ی ویژه</p>
            <h2 className="mt-3 text-4xl font-semibold leading-[1.4] text-foreground md:text-6xl">کتاب‌هایی برای پرواز</h2>
            <p className="mt-6 text-lg leading-9 text-muted-foreground">
              سنت‌اگزوپری پیش از نویسنده بودن، خلبان بود. سه کتاب او را کنار هم گذاشته‌ایم؛ برای کسانی که دلشان می‌خواهد
              از بالا به زندگی نگاه کنند.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {FLIGHT.map((b, i) => (
              <Reveal key={b.slug} delay={i * 120}>
                <Link to="/books/$slug" params={{ slug: b.slug }} className="block animate-float" style={{ animationDelay: `${i * -2}s` }}>
                  <BookCover book={b} className="transition-transform duration-700 hover:-translate-y-2" />
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <Button asChild variant="hero" size="xl" className="mt-10">
              <Link to="/books" search={{ q: undefined, cat: "سفر و پرواز" }}>
                دیدن مجموعه <ArrowLeft />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="container-page pt-28 md:pt-44">
      <Reveal className="mx-auto max-w-4xl text-center">
        <span aria-hidden className="font-display text-7xl leading-none text-terracotta">«</span>
        <blockquote className="mt-2 font-display text-3xl leading-[1.7] text-foreground md:text-5xl md:leading-[1.6]">
          فقط با چشم دل می‌شود خوب دید؛ آنچه اصل است، از چشم پنهان است.
        </blockquote>
        <p className="mt-8 text-sm text-muted-foreground">— شازده کوچولو</p>
      </Reveal>
    </section>
  );
}

function Bestsellers() {
  return (
    <section className="container-page pt-28 md:pt-44">
      <SectionHeading eyebrow="محبوب خوانندگان" title="پرفروش‌های این فصل">
        کتاب‌هایی که این روزها بیشتر از همه، همسفر خوانندگان ما بوده‌اند.
      </SectionHeading>
      <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
        {BESTSELLERS.map((b, i) => (
          <Reveal key={b.slug} delay={(i % 4) * 90}>
            <BookCard book={b} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  const parallax = useParallax<HTMLDivElement>(0.1);
  const services = [
    { icon: Truck, title: "ارسال به سراسر ایران", text: "بسته‌بندی با دقت و ارسال سریع؛ رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان." },
    { icon: Gift, title: "بسته‌بندی هدیه", text: "کتاب را با کاغذ کرافت، روبان و یادداشتی دست‌نویس برای عزیزانتان بفرستید." },
    { icon: Sparkles, title: "مشاوره‌ی کتاب", text: "کتاب‌دارهای ما کمک می‌کنند کتاب بعدی‌تان را درست انتخاب کنید." },
  ];
  return (
    <section className="pt-28 md:pt-44">
      <div className="relative mx-3 overflow-hidden rounded-[2rem] md:mx-5 md:rounded-[2.5rem]">
        <div ref={parallax} className="absolute -inset-y-24 inset-x-0">
          <img src={aboveClouds} alt="خواندن کتاب بر فراز ابرها" width={1600} height={1104} loading="lazy" className="size-full object-cover" />
        </div>
        <div className="media-veil absolute inset-0" />
        <Clouds />
        <div className="container-page relative flex min-h-[44rem] flex-col justify-between py-16 text-on-media md:py-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-on-media/80">سفری بی‌مرز</p>
            <h2 className="mt-3 text-4xl font-semibold leading-[1.4] md:text-6xl">خواندن، بلندترین پرواز ذهن است.</h2>
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="glass-dark rounded-3xl p-7">
                <s.icon className="size-6" aria-hidden />
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-on-media/80">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="container-page pt-28 md:pt-40">
      <Reveal className="paper-grain overflow-hidden rounded-[2rem] bg-beige px-6 py-16 text-center md:px-16 md:py-24">
        <p className="eyebrow">نامه‌ی ماهانه</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold leading-[1.5] text-foreground md:text-5xl">
          هر ماه، چند کتاب خوب در صندوق نامه‌تان
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">پیشنهادهای کتاب‌دارها، تازه‌ها و تخفیف‌های ویژه؛ بدون شلوغی.</p>
        <form
          className="relative mx-auto mt-10 flex max-w-md flex-col gap-2 rounded-[1.75rem] bg-paper p-2 shadow-soft sm:flex-row sm:rounded-full"
          onSubmit={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLFormElement).reset();
            toast.success("خوش آمدید! اولین نامه به‌زودی می‌رسد.");
          }}
        >
          <input
            type="email"
            required
            dir="ltr"
            placeholder="ایمیل شما"
            aria-label="ایمیل"
            className="h-12 flex-1 rounded-full bg-transparent px-5 text-end text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Button type="submit" variant="hero" size="pill" className="h-12">
            عضویت
          </Button>
        </form>
      </Reveal>
    </section>
  );
}
