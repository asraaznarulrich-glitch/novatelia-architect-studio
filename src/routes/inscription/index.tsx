import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/inscription/")({
  head: () => ({ meta: [
    { title: "Créer un compte — NOVATELIA" },
    { name: "description", content: "Choisissez votre parcours : compte entreprise pour les cabinets, compte particulier pour les indépendants." },
    { property: "og:title", content: "Créer un compte NOVATELIA" },
    { property: "og:description", content: "Cabinet ou indépendant : deux parcours distincts." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="eyebrow">Étape 1 / 2</p>
        <h1 className="mt-4 text-5xl">Quel est votre profil ?</h1>
        <div className="mt-12 grid gap-px border bg-border md:grid-cols-2">
          <Link to="/inscription/entreprise" className="group bg-background p-10 hover:bg-card">
            <p className="font-mono text-xs text-muted-foreground">A</p>
            <h2 className="mt-6 text-4xl">Cabinet d'architecture</h2>
            <p className="mt-3 text-muted-foreground">Compte entreprise, plusieurs collaborateurs, accès au studio.</p>
            <span className="mt-8 inline-block text-sm group-hover:text-accent">Continuer →</span>
          </Link>
          <Link to="/inscription/particulier" className="group bg-background p-10 hover:bg-card">
            <p className="font-mono text-xs text-muted-foreground">B</p>
            <h2 className="mt-6 text-4xl">Architecte indépendant</h2>
            <p className="mt-3 text-muted-foreground">Compte particulier, templates en libre-service, gratuit à vie.</p>
            <span className="mt-8 inline-block text-sm group-hover:text-accent">Continuer →</span>
          </Link>
        </div>
      </div>
    </SiteShell>
  ),
});
