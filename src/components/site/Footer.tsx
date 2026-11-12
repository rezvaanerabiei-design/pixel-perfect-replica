import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-forest text-paper">
      <div className="container-page grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="text-paper" />
          <p className="mt-6 max-w-sm font-display text-2xl leading-relaxed text-paper/90">
            این فقط یک کتاب‌فروشی نیست؛ اینجا شروع ماجراجویی‌های تازه است.
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-paper/60">کتاب‌فروشی</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/books" search={{ q: undefined, cat: undefined }} className="link-underline">همه‌ی کتاب‌ها</Link></li>
            <li><Link to="/books" search={{ q: undefined, cat: "شعر کلاسیک" }} className="link-underline">شعر کلاسیک</Link></li>
            <li><Link to="/books" search={{ q: undefined, cat: "سفر و پرواز" }} className="link-underline">سفر و پرواز</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-paper/60">آسمان کتاب</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/about" className="link-underline">داستان ما</Link></li>
            <li><Link to="/contact" className="link-underline">تماس با ما</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm text-paper/60">نشانی</p>
          <p className="mt-4 text-sm leading-7 text-paper/85">
            تهران، خیابان ولیعصر، کوچه‌ی آسمان، پلاک ۱۲
            <br />
            هر روز از ۱۰ صبح تا ۹ شب
          </p>
        </div>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-paper/15 py-6 text-xs text-paper/60 md:flex-row md:justify-between">
        <p>© ۱۴۰۵ آسمان کتاب. همه‌ی حقوق محفوظ است.</p>
        <p>ساخته‌شده با عشق به کاغذ و آسمان</p>
      </div>
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[18vw] leading-none text-paper/[0.05]"
      >
        آسمان کتاب
      </p>
    </footer>
  );
}
