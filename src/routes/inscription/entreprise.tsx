import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SignupLayout } from "@/components/signup-form";

export const Route = createFileRoute("/inscription/entreprise")({
  head: () => ({ meta: [
    { title: "Compte entreprise — NOVATELIA" }, { name: "description", content: "Inscription des cabinets d'architecture à NOVATELIA." },
    { property: "og:title", content: "Compte entreprise — NOVATELIA" }, { property: "og:description", content: "Inscription des cabinets d'architecture à NOVATELIA." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <SiteShell><SignupLayout kind="entreprise" /></SiteShell>,
});
