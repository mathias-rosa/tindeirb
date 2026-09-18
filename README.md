# Tindeirb

Application PocketBase - Vite + Vue pour shotgun son fillot a la rentrée.

## Fonctionnalités

- Mise a jour en temps réel sans raffraichissemnt
- Se connecter avec le CAS et avoir ses bons roles, fillières etc
- Voir les réponses des 1A de sa fillière
- Voir les réponses de tous les 1A (crtl click sur all) : esater egg sur demande d'aboin 😁
- Possibilité de shotgun un fillot
- Plusieurs vagues possibles
- Privilèges de certains utilisateurs
 

## Technologies

- Framework: Vue
- Database: [PocketBase](https://pocketbase.io/)

On a choisi pocketbase car c'est une base de donnée et un backend opensource et surtout self hostable qui fonctionne en temps réel un peu comme firebase mais complétement gratuite. Pour un usage Enseirb ça marche bien, pas de soucis de performances alors que quasi tous les 2A étaient dessus en même temps.

Puisque PocketBase est un backend la majorité se fait sur l'interface graphique mais pour implementer des logiques plus poussées (aka connexion par cas), on peut écrire un script en js ou en go. On a choisi JS, le fichier est `pb_hooks/main.pb.js`

> A noter, PocketBase tient en un exécutable qu'il faut telecharger depuis le site https://pocketbase.io/docs/ (différent selon l'os)

> On a developpé sous linux, ça devrait marcher sous d'autres os mais on ne garantit pas. On a aussi constaté des lenteurs de pocketbase avec wsl et un décallage temporel bizare.

> Il peut être utile de resynchroniser son horloge avec un serveur temporel pour ne pas avoir de bugs bizarre avec les dates des shotguns 

## Architecture de la base de données

La base de données repose sur 3 collections créées via l'interface d'administration de PocketBase :

```
       ┌────────────────────────┐
       │         users          │  (Comptes des Parrains 2A/3A)
       ├────────────────────────┤
       │ id (uuid)              │
       │ username (cas)         │
       │ email                  │
       │ firstName              │
       │ lastName               │
       │ diploma                │  (ex: "IIEIN4")
       │ shotgunDate            │  (date débloquée selon statut)
       │ favorites (relation)   │───┐ (liste d'IDs de Fillots)
       └────────────────────────┘   │
                                    │
                                    ▼
       ┌────────────────────────┐
       │        Fillots         │  (Profils des 1A importés de Google Forms)
       ├────────────────────────┤
       │ id (uuid)              │
       │ cas                    │  (identifiant CAS du 1A)
       │ nom                    │
       │ prenom                 │
       │ filiere                │  (ex: "IIEIN", "IIETE", "IIEMM"...)
       │ infos (json)           │  (les 34 réponses brutes du questionnaire)
       │ parrain (relation/text)│───► Pointe vers l'id du parrain qui l'a adopté
       └────────────────────────┘

       ┌────────────────────────┐
       │         config         │  (Paramètres globaux)
       ├────────────────────────┤
       │ key (ex: "MAX_FILLOTS")│
       │ value (ex: "2")        │
       └────────────────────────┘
```

### Collections :
- **`users`** : Comptes des parrains créés automatiquement lors de la connexion CAS avec leurs informations d'étape, date de vague shotgun (`shotgunDate`) et tableau de favoris.
- **`Fillots`** : Réponses des étudiants de 1A importées depuis le Google Sheet source. Le champ `parrain` est mis à jour lors de l'adoption.
- **`config`** : Clés de configuration globales, notamment `MAX_FILLOTS` pour borner le nombre d'adoptions par parrain.

### Confidentialité et anonymat du parrainage
Quand un parrain charge la liste (`pb.collection("Fillots").getFullList()`), les fillots adoptés contiennent uniquement l'identifiant technique opaque du parrain dans le champ `parrain` (ex: `"j78q29z83kx110a"`).
- **Impossible de démasquer l'identité :** La collection `users` applique les règles d'accès natives de PocketBase (`viewRule: id = @request.auth.id`). Un utilisateur connecté ne peut voir que son propre profil. Tenter d'interroger `pb.collection("users").getOne("...")` avec l'ID d'un autre parrain renvoie une erreur `403 / 404`.
- **Ce que l'application sait :** L'UI peut uniquement savoir si un fillot est libre (`parrain === ""`), s'il a été adopté par l'utilisateur courant (`parrain === user.id`) ou par un autre parrain anonyme (`parrain !== ""`).

### Logique d'adoption (`pb_hooks/main.pb.js`)
L'intégrité du shotgun est assurée côté serveur par le hook `onRecordBeforeUpdateRequest` sur `Fillots` :
- Vérifie que le fillot n'est pas déjà pris (`fillot.parrain === ""`).
- Vérifie que l'heure réelle du serveur dépasse la date autorisée (`Date.now() >= shotgunDate`).
- Vérifie que le parrain n'a pas déjà atteint son quota de fillots (`< MAX_FILLOTS`).
- Vérifie que le parrain et le fillot sont dans la même filière.
- Bloque immédiatement l'écriture avec `e.cancel()` si une condition n'est pas remplie.

Commandes d'administration en CLI :
- `./pocketbase_bin populate` : télécharge et normalise les données du Google Sheet.
- `./pocketbase_bin clean` : vide la collection des fillots.

## Developpement

### Installation des dépendances

```bash
npm i
```

### Démarrer le serveur de développement


```bash
npm run dev
```

> Lance le front et le back
Pour lancer uniquement le front / back : `npm run front` / `npm run back`

### Build le front

```bash
npm run build
```

### Deploiement

#### Back
https://pocketbase.io/docs/going-to-production/#minimal-setup