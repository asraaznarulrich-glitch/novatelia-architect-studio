import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Kind = "entreprise" | "particulier";

const base = {
  full_name: z.string().trim().min(2, "Nom requis").max(120),
  email: z.string().trim().email("E-mail invalide").max(255),
  password: z.string().min(8, "8 caractères minimum").max(72),
};
const schemas = {
  entreprise: z.object({ ...base, company_name: z.string().trim().min(2, "Nom du cabinet requis").max(160), siret: z.string().trim().max(20).optional(), team_size: z.string().min(1, "Taille requise") }),
  particulier: z.object({ ...base, specialty: z.string().trim().max(120).optional(), city: z.string().trim().max(120).optional() }),
};

export function SignupForm({ kind }: { kind: Kind }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schemas[kind].safeParse(raw);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setLoading(true);
    const { email, password, ...meta } = parsed.data;
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/espace`, data: { ...meta, account_type: kind } },
    });
    setLoading(false);
    if (error) return setErrors({ form: error.message });
    setSentTo(email);
  }

  if (sentTo) {
    return (
      <div className="border bg-card p-8">
        <p className="eyebrow">Étape 2 / 2</p>
        <h2 className="mt-3 text-3xl">Vérifiez votre boîte mail</h2>
        <p className="mt-3 text-muted-foreground">Un lien de confirmation a été envoyé à <strong>{sentTo}</strong>. Il ouvrira votre espace {kind === "entreprise" ? "cabinet" : "atelier"}.</p>
      </div>
    );
  }

  const F = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...props} />
      {errors[name] && <p className="text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {kind === "entreprise" ? (
        <>
          {F("company_name", "Nom du cabinet")}
          <div className="grid gap-5 sm:grid-cols-2">
            {F("siret", "SIRET (facultatif)")}
            <div className="space-y-1.5">
              <Label htmlFor="team_size">Taille de l'équipe</Label>
              <select id="team_size" name="team_size" defaultValue="" className="h-9 w-full border bg-transparent px-3 text-sm">
                <option value="" disabled>Choisir</option>
                <option>1–3</option><option>4–15</option><option>16–50</option><option>50+</option>
              </select>
              {errors["team_size"] && <p className="text-xs text-destructive">{errors["team_size"]}</p>}
            </div>
          </div>
          {F("full_name", "Votre nom (référent du compte)")}
        </>
      ) : (
        <>
          {F("full_name", "Nom et prénom")}
          <div className="grid gap-5 sm:grid-cols-2">
            {F("specialty", "Spécialité (facultatif)", { placeholder: "Logement, patrimoine…" })}
            {F("city", "Ville (facultatif)")}
          </div>
        </>
      )}
      {F("email", "E-mail", { type: "email", autoComplete: "email" })}
      {F("password", "Mot de passe", { type: "password", autoComplete: "new-password" })}
      {errors["form"] && <p className="text-sm text-destructive">{errors["form"]}</p>}
      <button disabled={loading} className="w-full bg-primary py-3 text-sm text-primary-foreground hover:bg-accent disabled:opacity-50">
        {loading ? "Création…" : kind === "entreprise" ? "Créer le compte cabinet" : "Créer mon atelier gratuit"}
      </button>
      <p className="text-xs text-muted-foreground">En continuant, vous acceptez les <Link to="/documentation" className="underline">conditions d'utilisation</Link>. Déjà inscrit ? <Link to="/connexion" className="underline">Connexion</Link></p>
    </form>
  );
}

export function SignupLayout({ kind }: { kind: Kind }) {
  const isE = kind === "entreprise";
  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2">
      <div>
        <p className="eyebrow">{isE ? "Compte entreprise" : "Compte particulier / indépendant"}</p>
        <h1 className="mt-4 text-5xl">{isE ? "Ouvrir l'espace de votre cabinet" : "Ouvrir votre atelier"}</h1>
        <ul className="mt-8 space-y-3 border-t pt-6 text-sm text-muted-foreground">
          {(isE
            ? ["Accès au studio : identité, charte, site sur mesure", "Gestion des collaborateurs et des droits", "Facturation au nom du cabinet", "Formules de 10 € à 10 000 €"]
            : ["Templates spécialisés pour architectes", "Gestion de vos portfolios et projets", "Formule gratuite à vie", "Évolution possible de 2 € à 5 000 €"]
          ).map((x) => <li key={x} className="flex gap-3"><span className="text-accent">—</span>{x}</li>)}
        </ul>
        <Link to={isE ? "/inscription/particulier" : "/inscription/entreprise"} className="mt-8 inline-block text-sm underline">
          {isE ? "Vous êtes indépendant ? Compte particulier" : "Vous représentez un cabinet ? Compte entreprise"}
        </Link>
      </div>
      <SignupForm kind={kind} />
    </div>
  );
}
