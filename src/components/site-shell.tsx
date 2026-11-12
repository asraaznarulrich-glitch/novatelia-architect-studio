import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/tarifs", label: "Tarifs" },
  { to: "/documentation", label: "Documentation" },
  { to: "/partenaires", label: "Partenaires" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
        <rect width="64" height="64" className="fill-ink" />
        <path d="M16 48V16l32 32V16" fill="none" className="stroke-paper" strokeWidth="4" />
        <rect x="44" y="44" width="8" height="8" className="fill-terracotta" />
      </svg>
      <span className="font-mono text-sm tracking-[0.3em]">NOVATELIA</span>
    </Link>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/connexion" className="text-muted-foreground hover:text-foreground">Connexion</Link>
            <Link to="/inscription" className="bg-primary px-4 py-2 text-primary-foreground hover:bg-accent">Créer un compte</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 text-sm md:grid-cols-4">
          <div><Logo /><p className="mt-4 text-muted-foreground">Identité et sites pour l'architecture.</p></div>
          <div className="space-y-2"><p className="eyebrow">Studio</p><Link to="/" className="block">Agence</Link><Link to="/tarifs" className="block">Tarifs</Link></div>
          <div className="space-y-2"><p className="eyebrow">Ressources</p><Link to="/documentation" className="block">Documentation</Link><Link to="/partenaires" className="block">Programme partenaire</Link></div>
          <div className="space-y-2"><p className="eyebrow">Compte</p><Link to="/inscription/entreprise" className="block">Cabinet</Link><Link to="/inscription/particulier" className="block">Indépendant</Link></div>
        </div>
        <p className="mx-auto max-w-7xl px-6 pb-8 font-mono text-xs text-muted-foreground">© 2026 NOVATELIA</p>
      </footer>
    </div>
  );
}
