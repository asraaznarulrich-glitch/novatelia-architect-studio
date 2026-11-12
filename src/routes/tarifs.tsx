import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { entreprisePlans, particulierPlans, formatPrice } from "@/lib/pricing";

export const Route = createFileRoute("/tarifs")({
  head: () => ({ meta: [
    { title: "Tarifs — NOVATELIA" },
    { name: "description", content: "Tarifs entreprise de 10 € à 10 000 €, tarifs particulier gratuits à vie ou de 2 € à 5 000 €. Avantages et limites de chaque formule." },
    { property: "og:title", content: "Tarifs NOVATELIA" }, { property: "og:description", content: "Cabinets et indépendants : formules détaillées, avantages et limites." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Tarifs,
});

function Tarifs() {
  const [kind, setKind] = useState<"entreprise" | "particulier">("entreprise");
  const plans = kind === "entreprise" ? entreprisePlans : particulierPlans;
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="eyebrow">Tarifs</p>
        <h1 className="mt-4 text-6xl">Une formule par échelle de pratique.</h1>
        <div role="tablist" className="mt-10 inline-flex border">
          {(["entreprise", "particulier"] as const).map((k) => (
            <button key={k} role="tab" aria-selected={kind === k} onClick={() => setKind(k)}
              className={`px-6 py-3 text-sm ${kind === k ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
              {k === "entreprise" ? "Compte entreprise" : "Compte particulier"}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-px border bg-border lg:grid-cols-4">
          {plans.map((p) => (
            <article key={p.name} className="flex flex-col bg-background p-8">
              <p className="eyebrow">{p.name}</p>
              <p className="mt-6 font-display text-5xl">{formatPrice(p.price)}</p>
              <p className="font-mono text-xs text-muted-foreground">{p.period}</p>
              <p className="mt-4 text-sm">{p.pitch}</p>
              <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Avantages</h3>
              <ul className="mt-2 space-y-1.5 text-sm">{p.benefits.map((b) => <li key={b}>+ {b}</li>)}</ul>
              <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Pourquoi choisir</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.why}</p>
              <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Limites</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">{p.limits.map((b) => <li key={b}>— {b}</li>)}</ul>
              <Link to={kind === "entreprise" ? "/inscription/entreprise" : "/inscription/particulier"} className="mt-auto pt-8 text-sm underline hover:text-accent">Choisir {p.name} →</Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Prix HT. L'accès API est facturé séparément après 30 jours d'essai — voir la <Link to="/documentation" className="underline">documentation</Link>.</p>
      </div>
    </SiteShell>
  );
}
