# NOVATELIA Architect Studio

Créer la plateforme NOVATELIA pour l'identité et les sites d'architectes.

Commencer par les parcours d’inscription distincts et la structure de la base de données.

La plateforme comporte deux parties :
1. Une vitrine studio d'agence qui conçoit l'identité et les sites sur mesure pour cabinets d'architecture (compte entreprise).
2. Un outil en libre-service basé sur des templates spécialisés pour architectes où ils peuvent composer leur propre site et gérer leurs portfolios (compte particulier / indépendant).

Fonctionnalités et sections :
- Base de données pour gérer les comptes utilisateurs (entreprise vs particulier), les projets, les templates, les clés API et les candidatures partenaires.
- Parcours d'inscription distincts pour Entreprise et Particulier.
- Section Tarifs avec bascule selon le profil :
  * Compte Entreprise : tarifs de 10 € à 10 000 €, avec pour chaque formule les avantages, pourquoi choisir ce tarif, et ses limites.
  * Compte Particulier : option gratuite à vie ou de 2 € à 5 000 €, avec explications détaillées des avantages et limites.
- Section Documentation complète :
  * Règles d'utilisation, termes et conditions, avantages et limites d'utilisation de la plateforme.
  * Documentation technique des API : intégration des templates et sites créés via API dans des plateformes tierces, avec 30 jours d'essai gratuit puis grille tarifaire d'accès API.
  * Volet documentation dédié au programme partenaire.
- Section Partenaires : page et espace pour devenir partenaire de NOVATELIA, critères, avantages et formulaire de candidature.
- Direction artistique : identité NOVATELIA réaliste et soignée, non générique, avec favicon dédié et esthétique architecturale minimale et élégante.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1f29559a-ebe7-481d-8170-4df0d4637eba).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
