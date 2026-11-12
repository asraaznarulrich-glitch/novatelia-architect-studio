import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SignupLayout } from "@/components/signup-form";

export const Route = createFileRoute("/inscription/particulier")({
  head: () => ({ meta: [
    { title: "Compte particulier — NOVATELIA" }, { name: "description", content: "Inscription gratuite des architectes indépendants à l'atelier NOVATELIA." },
    { property: "og:title", content: "Compte particulier — NOVATELIA" }, { property: "og:description", content: "Inscription gratuite des architectes indépendants à l'atelier NOVATELIA." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <SiteShell><SignupLayout kind="particulier" /></SiteShell>,
});
