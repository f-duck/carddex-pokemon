# CardDex Pokémon

PWA iPhone de gestion de cartes Pokémon, avec bibliothèque locale et mode invité sans persistance.

## MVP livré

- Interface responsive inspirée de l'univers Pokémon, icône originale et installation PWA.
- Photo depuis la caméra ou la photothèque, aperçu local et détection de démonstration.
- Résultats vérifiables avant ajout : nom, type/énergie, PV, attaque/dégâts, rareté, édition/numéro/année.
- Bibliothèque locale classable et recherchable, avec données stockées uniquement dans le navigateur du propriétaire.
- Mode invité entièrement séparé : aucune carte, image ou résultat n'est enregistré.
- Prix, estimation d'état et authenticité explicitement marqués comme non disponibles dans ce MVP.

## Limites connues

Le MVP ne connecte pas encore d'API de reconnaissance, de catalogue de cartes, de prix de marché ou d'expertise anti-contrefaçon. Le bouton d'analyse fournit une fiche locale de démonstration (ou une suggestion basée sur le nom de fichier) pour permettre de tester le parcours sans promettre une reconnaissance réelle. Une prochaine version pourra brancher un service validé et documenter ses sources, sa date de collecte et ses coûts.

## Vérification

Le site est statique, sans dépendance de build. Vérifier localement avec `python3 -m http.server` puis tester : ajout démo, recherche, tri, bascule invité, absence de persistance invité, et installation depuis Safari iPhone.
