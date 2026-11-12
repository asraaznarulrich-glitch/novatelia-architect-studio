import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/_authenticated/espace")({
  head: () => ({ meta: [{ title: "Mon espace — NOVATELIA" }, { name: "robots", content: "noindex" }] }),
  component: Espace,
});

function Espace() {
  const nav = useNavigate();
  const { data } = useQuery({
    queryKey: ["espace"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const [p, pr, t] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", u.user!.id).maybeSingle(),
        supabase.from("projects").select("id,name,status").order("created_at", { ascending: false }),
        supabase.from("templates").select("slug,name,description,tier"),
      ]);
      return { profile: p.data, projects: pr.data ?? [], templates: t.data ?? [] };
    },
  });
  const isE = data?.profile?.account_type === "entreprise";
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between border-b pb-6">
          <div>
            <p className="eyebrow">{isE ? "Espace cabinet" : "Atelier indépendant"}</p>
            <h1 className="mt-3 text-5xl">{isE ? data?.profile?.company_name : data?.profile?.full_name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">Formule : {data?.profile?.plan}</p>
          </div>
          <button onClick={async () => { await supabase.auth.signOut(); nav({ to: "/" }); }} className="text-sm underline">Déconnexion</button>
        </div>
        <h2 className="mt-12 text-3xl">Projets</h2>
        <p className="mt-2 text-sm text-muted-foreground">{data?.projects.length ? `${data.projects.length} projet(s)` : "Aucun projet pour l'instant — l'éditeur arrive à l'étape suivante."}</p>
        <h2 className="mt-12 text-3xl">Templates disponibles</h2>
        <div className="mt-6 grid gap-px border bg-border md:grid-cols-4">
          {data?.templates.map((t) => (
            <div key={t.slug} className="bg-background p-6">
              <p className="eyebrow">{t.tier}</p><h3 className="mt-2 text-2xl">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
