import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { apiPlans } from "@/lib/pricing";

export const Route = createFileRoute("/documentation")({
  head: () => ({ meta: [
    { title: "Documentation — NOVATELIA" },
    { name: "description", content: "Règles d'utilisation, conditions générales, documentation de l'API NOVATELIA et du programme partenaire." },
    { property: "og:title", content: "Documentation NOVATELIA" }, { property: "og:description", content: "Conditions, API et programme partenaire." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Docs,
});

const toc = [["regles", "Règles d'utilisation"], ["conditions", "Termes et conditions"], ["avantages", "Avantages et limites"], ["api", "API — intégration"], ["api-tarifs", "API — tarifs"], ["partenaires", "Programme partenaire"]];

function Code({ children }: { children: string }) {
  return <pre className="mt-4 overflow-x-auto bg-primary p-5 font-mono text-xs leading-6 text-primary-foreground">{children}</pre>;
}

function Docs() {
  return (
    <SiteShell>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-8 md:self-start">
          <p className="eyebrow">Sommaire</p>
          <ul className="mt-4 space-y-2 text-sm">{toc.map(([id, l]) => <li key={id}><a href={`#${id}`} className="text-muted-foreground hover:text-foreground">{l}</a></li>)}</ul>
        </aside>
        <article className="max-w-3xl space-y-16 text-[15px] leading-7">
          <header><p className="eyebrow">Documentation</p><h1 className="mt-4 text-6xl">Mode d'emploi de la plateforme</h1></header>

          <section id="regles"><h2 className="text-4xl">Règles d'utilisation</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
              <li>Vous ne publiez que des projets dont vous êtes auteur, co-auteur, ou pour lesquels vous disposez d'une autorisation écrite.</li>
              <li>Les crédits (maîtrise d'ouvrage, photographes, BET, co-traitants) doivent être mentionnés sur chaque projet.</li>
              <li>Un compte particulier est nominatif ; un compte entreprise représente une structure juridique identifiable.</li>
              <li>Le partage d'identifiants entre structures distinctes est interdit.</li>
              <li>Tout contenu trompeur (faux concours, faux prix, rendus présentés comme réalisés) entraîne la suspension du site.</li>
            </ol></section>

          <section id="conditions"><h2 className="text-4xl">Termes et conditions</h2>
            <div className="mt-4 space-y-3 text-muted-foreground">
              <p><strong className="text-foreground">Propriété.</strong> Vous restez propriétaire de vos contenus. NOVATELIA conserve la propriété des templates ; une identité réalisée par le studio est cédée au client à réception du solde.</p>
              <p><strong className="text-foreground">Abonnements.</strong> Mensuels, sans engagement, résiliables à tout moment ; le mois entamé reste dû. Les forfaits studio sont payables 40 % à la commande, 60 % à la livraison.</p>
              <p><strong className="text-foreground">Formule gratuite.</strong> Sans limite de durée tant que le compte est actif. Un compte inactif depuis 24 mois est archivé après deux avertissements.</p>
              <p><strong className="text-foreground">Données.</strong> Hébergement dans l'Union européenne, export complet de vos projets à tout moment, suppression sous 30 jours après clôture.</p>
              <p><strong className="text-foreground">Responsabilité.</strong> Disponibilité visée de 99,5 % (99,9 % pour l'API Plateforme). NOVATELIA n'est pas responsable des contenus publiés par les utilisateurs.</p>
            </div></section>

          <section id="avantages"><h2 className="text-4xl">Avantages et limites</h2>
            <div className="mt-4 grid gap-px border bg-border sm:grid-cols-2">
              <div className="bg-background p-6"><p className="eyebrow">Avantages</p><ul className="mt-3 space-y-1.5 text-sm"><li>+ Templates conçus pour plans, coupes et séries photo</li><li>+ Portfolios multiples par compte</li><li>+ Images optimisées automatiquement</li><li>+ Sites intégrables par API</li></ul></div>
              <div className="bg-background p-6"><p className="eyebrow">Limites</p><ul className="mt-3 space-y-1.5 text-sm text-muted-foreground"><li>— Stockage : 2 Go (gratuit) à 500 Go (entreprise)</li><li>— Fichiers acceptés : JPG, PNG, WebP, PDF, jusqu'à 40 Mo</li><li>— Pas d'hébergement de maquettes BIM ou fichiers DWG</li><li>— Pas de boutique en ligne</li></ul></div>
            </div></section>

          <section id="api"><h2 className="text-4xl">API — intégrer templates et sites</h2>
            <p className="mt-4 text-muted-foreground">L'API REST permet d'afficher un site ou un portfolio NOVATELIA dans une plateforme tierce (intranet, site de concours, CMS existant). Chaque clé est rattachée à un compte et bénéficie de <strong className="text-foreground">30 jours d'essai gratuit</strong> à sa création.</p>
            <h3 className="mt-8 text-2xl">Authentification</h3>
            <Code>{`curl https://api.novatelia.com/v1/sites \\
  -H "Authorization: Bearer nva_live_xxxxxxxxxxxx"`}</Code>
            <h3 className="mt-8 text-2xl">Points d'accès</h3>
            <table className="mt-4 w-full text-left font-mono text-xs">
              <tbody className="divide-y">
                {[["GET", "/v1/templates", "Liste des templates disponibles"], ["GET", "/v1/sites", "Sites du compte"], ["GET", "/v1/sites/{id}/projects", "Projets d'un site"], ["GET", "/v1/projects/{id}", "Détail, images et crédits"], ["POST", "/v1/embeds", "Créer un jeton d'intégration"], ["POST", "/v1/webhooks", "Notification de publication"]].map(([m, p, d]) => (
                  <tr key={p}><td className="py-2 pr-4 text-accent">{m}</td><td className="py-2 pr-4">{p}</td><td className="py-2 font-sans text-muted-foreground">{d}</td></tr>))}
              </tbody>
            </table>
            <h3 className="mt-8 text-2xl">Intégration dans une page</h3>
            <Code>{`<div data-novatelia-embed="emb_7Hk2..."></div>
<script src="https://cdn.novatelia.com/embed.js" async></script>`}</Code>
            <p className="mt-4 text-sm text-muted-foreground">Limites : 10 requêtes/seconde par clé, réponses JSON paginées par 50, images servies en WebP via CDN.</p></section>

          <section id="api-tarifs"><h2 className="text-4xl">API — grille tarifaire</h2>
            <p className="mt-4 text-muted-foreground">À la fin des 30 jours, la clé passe en lecture seule jusqu'au choix d'une formule.</p>
            <div className="mt-6 grid gap-px border bg-border sm:grid-cols-4">
              {apiPlans.map((p) => <div key={p.name} className="bg-background p-5"><p className="eyebrow">{p.name}</p><p className="mt-3 font-display text-3xl">{p.price}</p><p className="mt-2 text-xs text-muted-foreground">{p.detail}</p></div>)}
            </div></section>

          <section id="partenaires"><h2 className="text-4xl">Programme partenaire</h2>
            <div className="mt-4 space-y-3 text-muted-foreground">
              <p>Trois statuts : <strong className="text-foreground">Prescripteur</strong> (écoles, ordres, réseaux), <strong className="text-foreground">Intégrateur</strong> (agences web, éditeurs de logiciels) et <strong className="text-foreground">Studio associé</strong> (graphistes et photographes d'architecture).</p>
              <p>Commission de 20 % la première année sur les abonnements apportés, 10 % ensuite. Les intégrateurs disposent d'une clé API Plateforme offerte pendant 6 mois.</p>
              <p>Les candidatures sont examinées sous 10 jours ouvrés. Le partenariat peut être résilié par chaque partie avec un préavis d'un mois.</p>
            </div>
            <Link to="/partenaires" className="mt-6 inline-block bg-primary px-5 py-3 text-sm text-primary-foreground hover:bg-accent">Candidater →</Link></section>
        </article>
      </div>
    </SiteShell>
  );
}
