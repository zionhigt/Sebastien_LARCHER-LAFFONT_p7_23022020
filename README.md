# Groupomania work chat

## Introduction

Voici le réseau social de l'entreprise Groupomania !
La partie front end est réalisée avec React/Redux pour la gestion du DOM et avec la bibliothèque Materialize coté css.
Pour le server Web l'application et développée avec Express et Express-session, le magasin de session et géré aves express-mysql-session. Les données hébergé sur un serveur MariaDB pour la phase de développement et est compatible avec le langage SQL. 

## Code Samples

>"dependencies": {
>	"bcrypt": "^5.0.0",
>	"body-parser": "^1.19.0",
>	"env-cmd": "^10.1.0",
>	"express": "^4.17.1",
>	"express-mysql-session": "^2.1.5",
>	"express-session": "^1.17.1",
>	"multer": "^1.4.2",
>	"mysql": "^2.18.1",
>	"nodemon": "^2.0.7"
> }

## Installation

** Installation rapide ** 

Installer le fichier mysql/createTables.sql pour un base de données vierge, generateData.sql pour obtenir un bourage de données.
Créez un fichier backend/env/.env_dev. Déposez y vos identifiants de base de données suivant backend/env/.env_template.

Dans le dossier backend exécutez:
>npm run server:dev

Dans le dossier frontend exécutez:
>npm run start