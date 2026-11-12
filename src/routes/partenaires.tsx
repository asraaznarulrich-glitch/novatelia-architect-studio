import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SiteShell } from "@/components/site-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/partenaires")({
  head: () => ({ meta: [
    { title: "Devenir partenaire — NOVATELIA" },
    { name: "description", content: "Rejoignez le programme partenaire NOVATELIA : critères, avantages et candidature." },
    { property: "og:title", content: "Programme partenaire NOVATELIA" }, { property: "og:description", content: "Prescripteurs, intégrateurs et studios associés." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Partners,
});

const schema = z.object({
  contact_name: z.string().trim().min(2, "Nom requis").max(120),
  email: z.string().trim().email("E-mail invalide").max(255),
  organization: z.string().trim().min(2, "Structure requise").max(160),
  partner_type: z.enum(["prescripteur", "integrateur", "studio"]),
  website: z.string().trim().max(255).optional(),
  message: z.string().trim().max(3000).optional(),
});

function Partners() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) return setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
    setErrors({}); setLoading(true);
    const { data: u } = await supabase.auth.getUser();
    const { error } = await supabase.from("partner_applications").insert({ ...parsed.data, website: parsed.data.website ?? null, message: parsed.data.message ?? null, user_id: u.user?.id ?? null });
    setLoading(false);
    if (error) return setErrors({ form: "Envoi impossible, réessayez." });
    setDone(true);
  }
  const err = (k: string) => errors[k] && <p className="text-xs text-destructive">{errors[k]}</p>;
  return (
    <SiteShell>
      <section className="blueprint border-b"><div className="mx-auto max-w-7xl px-6 py-24">
        <p className="eyebrow">Programme partenaire</p>
        <h1 className="mt-4 max-w-3xl text-6xl">Construire avec NOVATELIA.</h1>
      </div></section>
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-2">
        <div className="space-y-12">
          <div><h2 className="text-3xl">Critères</h2><ul className="mt-4 space-y-2 text-muted-foreground">
            <li>— Activité liée à l'architecture, au paysage ou à l'urbanisme</li><li>— Structure immatriculée depuis au moins 12 mois</li>
            <li>— Références vérifiables (3 minimum)</li><li>— Adhésion aux règles d'utilisation de la plateforme</li></ul></div>
          <div><h2 className="text-3xl">Avantages</h2><ul className="mt-4 space-y-2 text-muted-foreground">
            <li>+ 20 % de commission la 1ʳᵉ année, 10 % ensuite</li><li>+ Clé API Plateforme offerte 6 mois (intégrateurs)</li>
            <li>+ Référencement dans l'annuaire partenaires</li><li>+ Accès anticipé aux nouveaux templates</li></ul></div>
        </div>
        {done ? (
          <div className="border bg-card p-8"><h2 className="text-3xl">Candidature reçue</h2><p className="mt-3 text-muted-foreground">Réponse sous 10 jours ouvrés.</p></div>
        ) : (
          <form onSubmit={submit} className="space-y-5 border bg-card p-8" noValidate>
            <h2 className="text-3xl">Candidature</h2>
            <div className="space-y-1.5"><Label htmlFor="contact_name">Nom</Label><Input id="contact_name" name="contact_name" />{err("contact_name")}</div>
            <div className="space-y-1.5"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" />{err("email")}</div>
            <div className="space-y-1.5"><Label htmlFor="organization">Structure</Label><Input id="organization" name="organization" />{err("organization")}</div>
            <div className="space-y-1.5"><Label htmlFor="partner_type">Statut souhaité</Label>
              <select id="partner_type" name="partner_type" className="h-9 w-full border bg-transparent px-3 text-sm">
                <option value="prescripteur">Prescripteur</option><option value="integrateur">Intégrateur</option><option value="studio">Studio associé</option>
              </select></div>
            <div className="space-y-1.5"><Label htmlFor="website">Site web</Label><Input id="website" name="website" /></div>
            <div className="space-y-1.5"><Label htmlFor="message">Présentation</Label><Textarea id="message" name="message" rows={5} />{err("message")}</div>
            {err("form")}
            <button disabled={loading} className="w-full bg-primary py-3 text-sm text-primary-foreground hover:bg-accent">{loading ? "Envoi…" : "Envoyer la candidature"}</button>
          </form>
        )}
      </div>
    </SiteShell>
  );
}
