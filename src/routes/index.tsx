import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVATELIA — Identité et sites pour cabinets d'architecture" },
      { name: "description", content: "Studio qui conçoit l'identité et les sites des cabinets d'architecture, et outil de templates pour architectes indépendants." },
      { property: "og:title", content: "NOVATELIA — Identité et sites pour l'architecture" },
      { property: "og:description", content: "Un studio sur mesure pour les cabinets, un atelier en libre-service pour les indépendants." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <section className="blueprint border-b">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-8">
            <p className="eyebrow">Studio d'identité — Plateforme de sites</p>
            <h1 className="mt-6 text-6xl leading-[0.95] md:text-8xl">
              L'architecture mérite<br /><em className="text-accent">sa propre ligne.</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">
              NOVATELIA dessine l'identité et les sites des cabinets d'architecture, et met à disposition des indépendants
              des templates pensés pour présenter plans, coupes et chantiers.
            </p>
          </div>
          <div className="self-end border-l pl-6 font-mono text-xs leading-6 text-muted-foreground md:col-span-4">
            <p>N 48°51′ — E 2°21′</p>
            <p>Échelle 1:1</p>
            <p>Planche 01 / 04</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl md:grid-cols-2">
        <Path n="01" eyebrow="Compte entreprise" title="Le studio, pour les cabinets"
          text="Identité visuelle, charte, site sur mesure ou sur template studio, gestion d'équipe. De 10 € à 10 000 €."
          to="/inscription/entreprise" cta="Ouvrir un compte cabinet" />
        <Path n="02" eyebrow="Compte particulier" title="L'atelier, pour les indépendants"
          text="Composez votre site à partir de templates spécialisés et gérez vos portfolios. Gratuit à vie, ou de 2 € à 5 000 €."
          to="/inscription/particulier" cta="Commencer gratuitement" accent />
      </section>

      <section className="mx-auto max-w-7xl border-t px-6 py-24">
        <p className="eyebrow">Méthode</p>
        <div className="mt-10 grid gap-10 md:grid-cols-4">
          {[
            ["Relevé", "Lecture du cabinet, de ses références, de son public."],
            ["Esquisse", "Pistes typographiques et principes de mise en page."],
            ["Projet", "Charte, gabarits et site construits ensemble."],
            ["Livraison", "Mise en ligne, formation, suivi éditorial."],
          ].map(([t, d], i) => (
            <div key={t} className="border-t border-foreground pt-4">
              <p className="font-mono text-xs text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-2 text-3xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function Path(p: { n: string; eyebrow: string; title: string; text: string; to: "/inscription/entreprise" | "/inscription/particulier"; cta: string; accent?: boolean }) {
  return (
    <div className={`border-b px-6 py-16 md:border-r md:px-12 ${p.accent ? "bg-card" : ""}`}>
      <p className="font-mono text-xs text-muted-foreground">{p.n}</p>
      <p className="eyebrow mt-8">{p.eyebrow}</p>
      <h2 className="mt-3 text-4xl md:text-5xl">{p.title}</h2>
      <p className="mt-4 max-w-md text-muted-foreground">{p.text}</p>
      <Link to={p.to} className={`mt-8 inline-block px-5 py-3 text-sm ${p.accent ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"} hover:opacity-90`}>
        {p.cta} →
      </Link>
    </div>
  );
}
