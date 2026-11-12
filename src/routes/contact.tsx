import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تماس با ما — آسمان کتاب" },
      { name: "description", content: "با آسمان کتاب در تماس باشید؛ نشانی کتاب‌فروشی، ساعات کاری و فرم ارسال پیام." },
      { property: "og:title", content: "تماس با ما — آسمان کتاب" },
      { property: "og:description", content: "نشانی، ساعات کاری و راه‌های ارتباط با آسمان کتاب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const INFO = [
  { icon: MapPin, label: "نشانی", value: "تهران، خیابان ولیعصر، کوچه‌ی آسمان، پلاک ۱۲" },
  { icon: Clock, label: "ساعات کاری", value: "هر روز، ۱۰ صبح تا ۹ شب" },
  { icon: Phone, label: "تلفن", value: "۰۲۱-۱۲۳۴۵۶۷۸" },
  { icon: Mail, label: "ایمیل", value: "hello@asemanketab.ir" },
];

const fieldClass =
  "w-full rounded-2xl border border-border bg-paper px-5 py-4 text-foreground placeholder:text-muted-foreground transition-colors focus:border-sage focus:outline-none";

function ContactPage() {
  return (
    <section className="bg-sky-fade">
      <div className="container-page grid gap-16 pt-36 md:pt-48 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">در تماس باشیم</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.35] text-foreground md:text-6xl">
            دنبال کتاب خاصی هستید؟
          </h1>
          <p className="mt-6 text-lg leading-9 text-muted-foreground">
            برایمان بنویسید؛ کتاب‌دارهای ما معمولاً در کمتر از یک روز پاسخ می‌دهند.
          </p>
          <ul className="mt-12 space-y-7">
            {INFO.map((i) => (
              <li key={i.label} className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-beige text-forest">
                  <i.icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{i.label}</p>
                  <p className="mt-1 text-foreground">{i.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
          <form
            className="glass space-y-4 rounded-[2rem] p-6 shadow-float md:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
              toast.success("پیام شما رسید. به‌زودی پاسخ می‌دهیم.");
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input required name="name" placeholder="نام شما" aria-label="نام" className={fieldClass} />
              <input required name="email" type="email" placeholder="ایمیل" aria-label="ایمیل" className={fieldClass} />
            </div>
            <input name="subject" placeholder="موضوع" aria-label="موضوع" className={fieldClass} />
            <textarea required name="message" rows={6} placeholder="پیام شما…" aria-label="پیام" className={fieldClass} />
            <Button type="submit" variant="hero" size="xl" className="w-full">
              ارسال پیام
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
