import { describe, expect, it } from "vitest";
import { BOOKS, discountPercent, filterBooks, getBook } from "@/lib/books";

describe("book catalog", () => {
  it("filters by category", () => {
    const flight = filterBooks(BOOKS, { cat: "سفر و پرواز" });
    expect(flight.map((b) => b.slug).sort()).toEqual(["parvaz-shabaneh", "shazde-koochoolo", "zamin-ensanha"]);
  });

  it("searches by author name", () => {
    expect(filterBooks(BOOKS, { q: "هدایت" }).map((b) => b.slug)).toEqual(["boof-e-koor"]);
  });

  it("computes discount percent from the old price", () => {
    expect(discountPercent(getBook("zamin-ensanha")!)).toBe(17);
  });
});
