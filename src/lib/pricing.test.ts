import { describe, it, expect } from "vitest";
import { entreprisePlans, particulierPlans } from "./pricing";

describe("grilles tarifaires", () => {
  it("entreprise va de 10 € à 10 000 €", () => {
    const p = entreprisePlans.map((x) => x.price);
    expect(Math.min(...p)).toBe(10);
    expect(Math.max(...p)).toBe(10000);
  });
  it("particulier: gratuit à vie puis de 2 € à 5 000 €", () => {
    const p = particulierPlans.map((x) => x.price);
    expect(p).toContain(0);
    const paid = p.filter((x) => x > 0);
    expect(Math.min(...paid)).toBe(2);
    expect(Math.max(...paid)).toBe(5000);
  });
});
