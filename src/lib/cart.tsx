import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { BOOKS, type Book } from "./books";

type CartLine = { slug: string; qty: number };

type CartContextValue = {
  lines: (CartLine & { book: Book })[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aseman-ketab-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setRaw(JSON.parse(saved));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
  }, [raw, hydrated]);

  const add = useCallback((slug: string) => {
    setRaw((prev) => {
      const found = prev.find((l) => l.slug === slug);
      if (found) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { slug, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string) => setRaw((prev) => prev.filter((l) => l.slug !== slug)), []);

  const setQty = useCallback(
    (slug: string, qty: number) =>
      setRaw((prev) => (qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)))),
    [],
  );

  const value = useMemo(() => {
    const lines = raw
      .map((l) => ({ ...l, book: BOOKS.find((b) => b.slug === l.slug) }))
      .filter((l): l is CartLine & { book: Book } => Boolean(l.book));
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.book.price, 0),
      open,
      setOpen,
      add,
      remove,
      setQty,
    };
  }, [raw, open, add, remove, setQty]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
