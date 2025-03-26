# 42_swifty-companion
42_swifty-companion est un projet post tronc-commun de la branche mobile de l'école 42. Ce projet consiste à créer une application mobile qui permet de rechercher un étudiant 42 et d'afficher son profil grâce à l'api 42.

## 📋 Fonctionnalités
L'application doit :
* avoir au moins **2 vues**
* afficher **les informations** des étudiants
* afficher **les projets** réussis et ratés
* afficher **les compétences** et leur pourcentage
* utilisation du **protocole Oauth2** pour obtenir le token

### ✨ Bonus
* le **token doit être refresh à son expiration**

## ⌨️ Les Technos

* Language mobile : **React-Native**

## 📷 Aperçus

### Welcome
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://github.com/Ismerie/swifty-companion/blob/main/preview/singin.jpg" alt="Preview acceuil" width="300"/>
  <img src="https://github.com/Ismerie/swifty-companion/blob/main/preview/welcome.jpg" alt="Preview acceuil" width="300"/>
  <img src="https://github.com/Ismerie/swifty-companion/blob/main/preview/listSearch.jpg" alt="Preview recherche" width="300"/>
</div>  

### Projets
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://github.com/Ismerie/swifty-companion/blob/main/preview/projects.jpg" alt="Preview projets" width="300"/>
  <img src="https://github.com/Ismerie/swifty-companion/blob/main/preview/projects2.jpg" alt="Preview projets" width="300"/>
</div> 

### Skills
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://github.com/Ismerie/swifty-companion/blob/main/preview/skills.jpg" alt="Preview compétences" width="300"/>
  <img src="https://github.com/Ismerie/swifty-companion/blob/main/preview/skills2.jpg" alt="Preview compétences" width="300"/>
</div> 

### Gestion d'erreur
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://github.com/Ismerie/swifty-companion/blob/main/preview/errorAPI.jpg" alt="Preview erreur API" width="300"/>
  <img src="https://github.com/Ismerie/swifty-companion/blob/main/preview/notFound.jpg" alt="Preview erreur pas d´étudiants trouvés" width="300"/>
  <img src="https://github.com/Ismerie/swifty-companion/blob/main/preview/emptyProfile.jpg" alt="Preview profil vide" width="300"/>
</div> 

## 🛠️ Usage
Pour exécuter Swifty Companion sur un émulateur Android, il est nécessaire de disposer de certaines configurations sur votre environnement local. Voici les outils requis :

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
