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

Le MVP ne connecte pas encore d'API de reconnaissance, de catalogue de cartes, de prix de marché ou d'expertise anti-contrefaçon. Une photo réelle qui ne peut pas être identifiée est maintenant affichée comme « carte non reconnue » : l'application ne retombe plus silencieusement sur Pikachu et n'invente plus d'année. Les cartes de démonstration et la sélection manuelle sont explicitement présentées comme telles. Le proxy Cloudflare Worker (`worker/carddex-api.js`) est préparé pour envoyer les photos au scanner sans exposer la clé API dans la PWA ; il ne conserve pas les images. Il faut encore renseigner le secret `PTCG_API_KEY` dans le Worker pour activer les vrais scans.

## Vérification

Le site est statique, sans dépendance de build. Vérifier localement avec `python3 -m http.server` puis tester : ajout démo, recherche, tri, bascule invité, absence de persistance invité, et installation depuis Safari iPhone.

## Activation de la reconnaissance réelle

Le Worker attend un secret Cloudflare nommé `PTCG_API_KEY`. Après création et validation d'une clé gratuite sur pokemontcgapi.com, l'ajouter au Worker ; la PWA appellera alors `/api/identify`. Les images sont transmises pour l'analyse puis ne sont pas stockées par le proxy.
