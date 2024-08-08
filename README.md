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