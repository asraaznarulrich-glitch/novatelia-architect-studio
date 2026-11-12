import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteShell } from "@/components/site-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/connexion")({
  head: () => ({ meta: [
    { title: "Connexion — NOVATELIA" }, { name: "description", content: "Accédez à votre espace cabinet ou atelier NOVATELIA." },
    { property: "og:title", content: "Connexion — NOVATELIA" }, { property: "og:description", content: "Accédez à votre espace NOVATELIA." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) });
    setLoading(false);
    if (error) return setErr("E-mail ou mot de passe incorrect.");
    nav({ to: "/espace" });
  }
  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-6 py-24">
        <h1 className="text-5xl">Connexion</h1>
        <form onSubmit={submit} className="mt-10 space-y-5">
          <div className="space-y-1.5"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" required /></div>
          <div className="space-y-1.5"><Label htmlFor="password">Mot de passe</Label><Input id="password" name="password" type="password" required /></div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button disabled={loading} className="w-full bg-primary py-3 text-sm text-primary-foreground hover:bg-accent">{loading ? "…" : "Se connecter"}</button>
        </form>
      </div>
    </SiteShell>
  );
}
