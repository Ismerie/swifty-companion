# 42_swifty-conpanion
42_swifty-companion est un projet post tronc-commun de la branche mobile de l'école 42. Ce projet consiste à créer une application mobile qui permet de rechercher un étudiant 42 et d'afficher son profil grâce à l'api 42.

## 📋 Fonctionnalités
L'application doit :
* avoir au moins **2vues**
* afficher **les informations** des étudiants
* afficher **les projets** réussis et ratés
* afficher **les compétences** et leur pourcentages

### ✨ Bonus
* le **token doit être recrée à son expiration**

### ⌨️ Les Technos

* Language mobile : **React-Native**

## 📷 Aperçus

### Welcome
![alt-text](https://github.com/Ismerie/swifty-companion/blob/main/preview/welcome.jpg)
![alt-text](https://github.com/Ismerie/swifty-companion/blob/main/preview/listSearch.jpg)
### Projets
![alt-text](https://github.com/Ismerie/swifty-companion/blob/main/preview/projects.jpg)
![alt-text](https://github.com/Ismerie/swifty-companion/blob/main/preview/projects2.jpg)
### Skills
![alt-text](https://github.com/Ismerie/swifty-companion/blob/main/preview/skills.jpg)
![alt-text](https://github.com/Ismerie/swifty-companion/blob/main/preview/skills2.jpg)
### Gestion d'erreur
![alt-text](https://github.com/Ismerie/swifty-companion/blob/main/preview/errorAPI.jpg)
![alt-text](https://github.com/Ismerie/swifty-companion/blob/main/preview/notFound.jpg)
![alt-text](https://github.com/Ismerie/swifty-companion/blob/main/preview/emptyProfile.jpg)

## 🛠️ Usage
Pour exécuter Swifty Companion sur un émulateur Android, il est nécessaire de disposer de certaines configurations sur ton environnement local. Voici les outils requis :

* ```Android Studio``` : Téléchargez et installez Android Studio, qui inclut l'émulateur Android et les outils nécessaires pour le développement mobile.

OU

* ```SDK Android``` : Si vous préfèrez ne pas utiliser Android Studio, vous pouvez installer le SDK Android séparément [SDK Android Set Up](https://developer.android.com/studio?hl=fr). Cela vous permettra de configurer un émulateur Android à l'aide de la commande ```sdkmanager``` ou d'utiliser votre téléphone android connecté en filaire comme émulateur.

Pour avoir accès à l'API 42, vous devez une créer une **application sur l'intra 42** qui fournira l'ID et le Secret qui permettre d'obtenir le token pour les requêtes.
Ensuite crée un fichier **.env** à la racine du projet avec l'ID et le Secret, configuré comme ceci :
```
CLIENT_ID=
CLIENT_SECRET=
```
Une fois votre émulateur prêt et le .env crée vous pouvez lancer le projet

Utilisez la commande ```npm i``` pour installer les dépendances
```
npm i
```
Ensuite utilisez la commande suivant pour choisir votre émulateur et build le projet
```
npx expo run:android --device
```
