export type CoverTone = "forest" | "sage" | "terracotta" | "ink" | "beige" | "sky";
export type CoverMotif = "plane" | "sun" | "arch" | "lines" | "moon" | "leaf";

export type Category = "رمان ایرانی" | "ادبیات جهان" | "شعر کلاسیک" | "فلسفه و اندیشه" | "سفر و پرواز";

export const CATEGORIES: Category[] = [
  "رمان ایرانی",
  "ادبیات جهان",
  "شعر کلاسیک",
  "فلسفه و اندیشه",
  "سفر و پرواز",
];

export type Book = {
  slug: string;
  title: string;
  author: string;
  category: Category;
  price: number;
  oldPrice?: number;
  tone: CoverTone;
  motif: CoverMotif;
  pages: number;
  badge?: "پرفروش" | "تازه" | "نسخه نفیس" | "پیشنهاد ویژه";
  description: string;
};

export const BOOKS: Book[] = [
  {
    slug: "shazde-koochoolo",
    title: "شازده کوچولو",
    author: "آنتوان دو سنت‌اگزوپری",
    category: "سفر و پرواز",
    price: 185000,
    tone: "sky",
    motif: "plane",
    pages: 112,
    badge: "پرفروش",
    description:
      "داستان خلبانی که در دل صحرا با شاهزاده‌ای کوچک از سیاره‌ای دور آشنا می‌شود؛ قصه‌ای ساده و عمیق درباره‌ی دوستی، عشق و دیدن با چشم دل.",
  },
  {
    slug: "zamin-ensanha",
    title: "زمین انسان‌ها",
    author: "آنتوان دو سنت‌اگزوپری",
    category: "سفر و پرواز",
    price: 240000,
    oldPrice: 290000,
    tone: "sage",
    motif: "sun",
    pages: 224,
    badge: "پیشنهاد ویژه",
    description:
      "روایت‌های شاعرانه‌ی یک خلبان از پرواز بر فراز کوه‌ها و صحراها؛ ستایشی از شجاعت، همبستگی و معنای زندگی.",
  },
  {
    slug: "parvaz-shabaneh",
    title: "پرواز شبانه",
    author: "آنتوان دو سنت‌اگزوپری",
    category: "سفر و پرواز",
    price: 160000,
    tone: "ink",
    motif: "moon",
    pages: 136,
    description: "شبی طوفانی، خلبانی تنها در آسمان و مردی که بر زمین منتظر است؛ رمانی کوتاه درباره‌ی وظیفه و تنهایی.",
  },
  {
    slug: "boof-e-koor",
    title: "بوف کور",
    author: "صادق هدایت",
    category: "رمان ایرانی",
    price: 145000,
    tone: "ink",
    motif: "lines",
    pages: 128,
    description: "مهم‌ترین رمان مدرن فارسی؛ روایتی کابوس‌گون و شاعرانه از تنهایی، مرگ و ذهن آشفته‌ی یک نقاش قلمدان.",
  },
  {
    slug: "savushun",
    title: "سووشون",
    author: "سیمین دانشور",
    category: "رمان ایرانی",
    price: 320000,
    tone: "terracotta",
    motif: "leaf",
    pages: 312,
    badge: "پرفروش",
    description: "زندگی زری و یوسف در شیراز سال‌های جنگ؛ رمانی ماندگار درباره‌ی شجاعت، مقاومت و عشق در دل تاریخ.",
  },
  {
    slug: "jaye-khali-soluch",
    title: "جای خالی سلوچ",
    author: "محمود دولت‌آبادی",
    category: "رمان ایرانی",
    price: 380000,
    tone: "beige",
    motif: "sun",
    pages: 420,
    description: "مرگان و فرزندانش پس از رفتن بی‌خبر سلوچ؛ تصویری تکان‌دهنده و انسانی از روستا، فقر و ایستادگی.",
  },
  {
    slug: "symphony-mordegan",
    title: "سمفونی مردگان",
    author: "عباس معروفی",
    category: "رمان ایرانی",
    price: 295000,
    tone: "forest",
    motif: "arch",
    pages: 344,
    badge: "تازه",
    description: "حکایت خانواده‌ای در اردبیل و دو برادری که سرنوشتشان در هم می‌پیچد؛ رمانی با ساختاری موسیقایی.",
  },
  {
    slug: "divan-hafez",
    title: "دیوان حافظ",
    author: "حافظ شیرازی",
    category: "شعر کلاسیک",
    price: 650000,
    tone: "forest",
    motif: "arch",
    pages: 560,
    badge: "نسخه نفیس",
    description: "غزلیات لسان‌الغیب در چاپی نفیس با جلد پارچه‌ای، کاغذ مرغوب و صفحه‌آرایی چشم‌نواز.",
  },
  {
    slug: "masnavi",
    title: "مثنوی معنوی",
    author: "مولانا جلال‌الدین بلخی",
    category: "شعر کلاسیک",
    price: 890000,
    tone: "terracotta",
    motif: "sun",
    pages: 1120,
    description: "شش دفتر مثنوی؛ دریایی از حکایت و حکمت که هشت قرن است دل خوانندگانش را روشن می‌کند.",
  },
  {
    slug: "golestan",
    title: "گلستان",
    author: "سعدی شیرازی",
    category: "شعر کلاسیک",
    price: 275000,
    tone: "beige",
    motif: "leaf",
    pages: 288,
    description: "شاهکار نثر فارسی؛ حکایت‌هایی کوتاه و پندآموز که آمیزه‌ای از شعر، طنز و خرد زندگی‌اند.",
  },
  {
    slug: "shahnameh",
    title: "شاهنامه",
    author: "حکیم ابوالقاسم فردوسی",
    category: "شعر کلاسیک",
    price: 1450000,
    oldPrice: 1690000,
    tone: "ink",
    motif: "arch",
    pages: 1480,
    badge: "پیشنهاد ویژه",
    description: "حماسه‌ی ملی ایران در دوره‌ای نفیس؛ از کیومرث تا یزدگرد، با قصه‌های رستم، سیاوش و سهراب.",
  },
  {
    slug: "sad-sal-tanhayi",
    title: "صد سال تنهایی",
    author: "گابریل گارسیا مارکز",
    category: "ادبیات جهان",
    price: 420000,
    tone: "sage",
    motif: "leaf",
    pages: 456,
    badge: "پرفروش",
    description: "هفت نسل از خاندان بوئندیا در دهکده‌ی ماکوندو؛ شاهکار رئالیسم جادویی و یکی از محبوب‌ترین رمان‌های قرن.",
  },
  {
    slug: "bar-hasti",
    title: "بار هستی",
    author: "میلان کوندرا",
    category: "ادبیات جهان",
    price: 310000,
    tone: "sky",
    motif: "lines",
    pages: 368,
    description: "عشق، آزادی و سبکی تحمل‌ناپذیر زندگی در پراگ دهه‌ی شصت؛ رمانی فلسفی و عاشقانه.",
  },
  {
    slug: "kimiagar",
    title: "کیمیاگر",
    author: "پائولو کوئیلو",
    category: "ادبیات جهان",
    price: 195000,
    tone: "terracotta",
    motif: "sun",
    pages: 192,
    description: "سفر سانتیاگوی چوپان از اندلس تا اهرام مصر در جست‌وجوی گنجی که در رؤیا دیده است.",
  },
  {
    slug: "chenin-goft-zartosht",
    title: "چنین گفت زرتشت",
    author: "فریدریش نیچه",
    category: "فلسفه و اندیشه",
    price: 360000,
    tone: "ink",
    motif: "sun",
    pages: 400,
    description: "کتابی برای همه کس و هیچ کس؛ مهم‌ترین اثر نیچه با زبانی شاعرانه درباره‌ی انسان و ارزش‌ها.",
  },
  {
    slug: "donyaye-sofi",
    title: "دنیای سوفی",
    author: "یوستین گردر",
    category: "فلسفه و اندیشه",
    price: 450000,
    tone: "sage",
    motif: "moon",
    pages: 576,
    badge: "تازه",
    description: "داستانی درباره‌ی تاریخ فلسفه؛ دختری نوجوان نامه‌هایی مرموز دریافت می‌کند که او را به سفری فکری می‌برند.",
  },
];

export function getBook(slug: string) {
  return BOOKS.find((b) => b.slug === slug);
}

const faDigits = new Intl.NumberFormat("fa-IR");

export function toFa(n: number) {
  return faDigits.format(n);
}

export function formatToman(n: number) {
  return `${faDigits.format(n)} تومان`;
}

export function discountPercent(book: Book) {
  if (!book.oldPrice) return 0;
  return Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100);
}

export function filterBooks(books: Book[], opts: { q?: string; cat?: string }) {
  const q = opts.q?.trim();
  return books.filter((b) => {
    if (opts.cat && b.category !== opts.cat) return false;
    if (q && !b.title.includes(q) && !b.author.includes(q)) return false;
    return true;
  });
}
