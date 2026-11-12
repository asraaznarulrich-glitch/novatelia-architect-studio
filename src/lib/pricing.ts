export type Plan = {
  name: string;
  price: number; // euros, 0 = gratuit
  period: string;
  pitch: string;
  benefits: string[];
  why: string;
  limits: string[];
};

export const entreprisePlans: Plan[] = [
  { name: "Esquisse", price: 10, period: "/ mois", pitch: "Une présence nette, en attendant mieux.",
    benefits: ["Page cabinet sur un template studio", "Nom de domaine connecté", "Jusqu'à 6 projets publiés"],
    why: "Pour un cabinet qui doit exister en ligne cette semaine, sans mobiliser l'équipe.",
    limits: ["Aucune personnalisation d'identité", "1 utilisateur", "Support par e-mail sous 72 h"] },
  { name: "Avant-projet", price: 290, period: "/ mois", pitch: "Le site du cabinet, piloté par l'équipe.",
    benefits: ["Templates studio complets", "Portfolio illimité, filtres par typologie", "5 collaborateurs", "Accès API (après 30 jours d'essai)"],
    why: "Pour une agence de 3 à 15 personnes qui publie régulièrement ses concours et livraisons.",
    limits: ["Identité visuelle existante uniquement", "Pas d'accompagnement éditorial"] },
  { name: "Identité", price: 3900, period: "forfait", pitch: "Une identité dessinée pour le cabinet.",
    benefits: ["Logotype, typographie, palette et charte", "Papeterie et gabarits de planches", "Déclinaison sur le site", "2 cycles de révisions"],
    why: "Pour un cabinet qui se fonde, se renomme ou change d'échelle.",
    limits: ["Site sur template, pas sur mesure", "Délai de 6 à 8 semaines"] },
  { name: "Sur mesure", price: 10000, period: "à partir de", pitch: "Identité et site conçus de zéro par le studio.",
    benefits: ["Direction artistique dédiée", "Site entièrement sur mesure", "Photographie et rédaction coordonnées", "Accompagnement 12 mois"],
    why: "Pour un cabinet établi dont l'image doit porter des concours internationaux.",
    limits: ["Sur sélection, 6 projets par an", "Délai de 3 à 5 mois", "Acompte de 40 %"] },
];

export const particulierPlans: Plan[] = [
  { name: "Atelier", price: 0, period: "à vie", pitch: "Gratuit, sans limite de durée.",
    benefits: ["1 template portfolio", "Jusqu'à 8 projets", "Sous-domaine novatelia.site"],
    why: "Pour un étudiant ou un jeune diplômé qui construit son premier portfolio.",
    limits: ["Mention NOVATELIA en pied de page", "Pas de domaine personnalisé", "Pas d'accès API"] },
  { name: "Carnet", price: 2, period: "/ mois", pitch: "Votre nom, votre domaine.",
    benefits: ["Domaine personnalisé", "Projets illimités", "Sans mention NOVATELIA"],
    why: "Pour l'architecte indépendant qui envoie son portfolio à des clients.",
    limits: ["Templates de base uniquement", "Statistiques simplifiées"] },
  { name: "Pratique", price: 24, period: "/ mois", pitch: "L'ensemble des templates spécialisés.",
    benefits: ["Tous les templates", "Formulaire de contact et prise de rendez-vous", "Export PDF de book", "Accès API (30 jours d'essai)"],
    why: "Pour un praticien qui démarche activement et répond à des appels d'offres.",
    limits: ["1 seul site", "Support sous 48 h"] },
  { name: "Signature", price: 5000, period: "forfait", pitch: "Identité personnelle conçue par le studio.",
    benefits: ["Monogramme et charte personnelle", "Site adapté à votre identité", "Séance de cadrage avec un directeur artistique"],
    why: "Pour l'indépendant qui fonde sa propre agence et veut une image définitive.",
    limits: ["Délai de 4 à 6 semaines", "2 cycles de révisions"] },
];

export const apiPlans = [
  { name: "Essai", price: "0 €", detail: "30 jours, 5 000 requêtes, 1 site intégré" },
  { name: "Intégration", price: "19 € / mois", detail: "50 000 requêtes, 5 sites, webhooks" },
  { name: "Plateforme", price: "149 € / mois", detail: "1 M de requêtes, sites illimités, SLA 99,9 %" },
  { name: "Volume", price: "sur devis", detail: "Marque blanche, quota dédié, support nominatif" },
];

export function formatPrice(p: number) {
  return p === 0 ? "Gratuit" : `${p.toLocaleString("fr-FR")} €`;
}
