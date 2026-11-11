# Pokémon de Léon

PWA iPad-first de collection de cartes Pokémon, gratuite et local-first.

## Fonctionnalités livrées

- Scanner depuis la caméra arrière iPad ou la photothèque, avec plusieurs fichiers dans une session.
- OCR local Tesseract.js, puis recherche multilingue dans le catalogue public TCGdex (français, anglais, espagnol, allemand, italien, portugais et japonais quand les données existent).
- Résultat à confirmer avec illustration TCGdex, nom, type, PV, attaques/dégâts, rareté, édition, numéro et année de sortie du set.
- Prix Cardmarket en euros uniquement quand TCGdex fournit une valeur réelle, avec source et date ; aucune valeur inventée.
- IndexedDB pour le Pokédex, migration de l’ancien localStorage, doublons avec quantité, recherche, tri, filtres, suppression et valeur totale des prix connus.
- Mode invité clairement séparé : aucune carte invitée n’est ajoutée au Pokédex.
- Export/restauration JSON du Pokédex pour limiter le risque d’effacement des données Safari.
- PWA installable sur iPad/iPhone, interface ludique responsive portrait/paysage.

## Choix de coût et limites honnêtes

Le fournisseur de reconnaissance distant qui renvoyait `PLAN_REQUIRED` n’est plus appelé par la PWA. Le Worker Cloudflare est conservé comme point de statut, mais la reconnaissance distante et les appels IA facturables sont désactivés (`billableCalls: 0`). TCGdex est une API publique sans clé ; Tesseract.js est chargé seulement au moment d’un vrai scan.

Une photo peut rester non identifiée si le texte est flou, retourné, caché par un reflet ou si l’édition est ambiguë. Dans ce cas, l’application demande une correction manuelle ou laisse le résultat en attente. La détection automatique de plusieurs cartes dans une seule photo n’est pas garantie : pour un résultat fiable, importer une photo par carte ; plusieurs fichiers sont analysés individuellement. L’état et l’authenticité ne sont jamais certifiés par une photographie.

## Tests réalisés

- `node --check` sur l’application et le Worker.
- `git diff --check`.
- Requête réelle TCGdex en français : Dracaufeu, illustration, PV, attaque, rareté, édition et prix Cardmarket daté récupérés.
- Parcours navigateur local iPad simulé : accueil, scanner, sélection de test, affichage d’une carte TCGdex et ajout avec prix en euros.
- Vérification visuelle de la nouvelle interface, des filtres et du panneau export/restauration.

À vérifier sur l’iPad réel : permission caméra Safari, installation depuis « Ajouter à l’écran d’accueil », performance du premier téléchargement Tesseract.js et conservation IndexedDB selon les réglages de stockage Safari.
