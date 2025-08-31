# 🛡️ Guide d'Administration - Site ASSETOH

## 📋 Vue d'ensemble

Le site ASSETOH dispose d'un système d'administration simple permettant aux administrateurs de :
- **Ajouter des membres** au Bureau Exécutif et aux Conseillers
- **Ajouter des événements** 
- **Gérer le contenu culturel** (images + textes)
- **Accéder aux formulaires** d'adhésion et de contact

## 🔐 Accès à l'Administration

### **Informations de Connexion**
- **Email admin** : `franceassetoh228@gmail.com`
- **Mot de passe** : `assetoh2024`

### **Comment se connecter**
1. Cliquez sur l'icône ⚙️ (engrenage) dans la navigation
2. Entrez l'email : `franceassetoh228@gmail.com`
3. Entrez le mot de passe : `assetoh2024`
4. Cliquez sur "Se connecter"

### **Indicateurs visuels**
- L'icône ⚙️ devient jaune quand vous êtes connecté
- Les boutons d'administration apparaissent automatiquement
- Une notification confirme la connexion

## 👥 Gestion des Membres

### **Ajouter un membre du Bureau Exécutif**
1. Connectez-vous en tant qu'admin
2. Allez à la section "Conseil d'Administration"
3. Cliquez sur "Ajouter un Membre" dans "Le Bureau Exécutif"
4. Remplissez le formulaire :
   - **Nom et Prénom** (obligatoire)
   - **Poste** (obligatoire)
   - **Photo** (URL de l'image)
   - **Description** (optionnel)
5. Cliquez sur "Ajouter"

### **Ajouter un Conseiller**
1. Connectez-vous en tant qu'admin
2. Allez à la section "Conseil d'Administration"
3. Cliquez sur "Ajouter un Membre" dans "Les Conseillers"
4. Remplissez le même formulaire
5. Cliquez sur "Ajouter"

### **Supprimer un membre**
1. Connectez-vous en tant qu'admin
2. Allez à la section "Conseil d'Administration"
3. Survolez le membre à supprimer
4. Cliquez sur l'icône 🗑️ (poubelle) qui apparaît en haut à droite
5. Confirmez la suppression dans la boîte de dialogue
6. Le membre sera supprimé avec une animation fluide

### **Gestion des photos**
- **Déposez directement vos images** : Cliquez sur "Choisir un fichier"
- **Formats acceptés** : JPG, PNG, GIF
- **Taille maximale** : 5MB par image
- **Taille recommandée** : 300x300 pixels minimum
- **Stockage local** : Les images sont stockées dans le navigateur

### **Suppression Individuelle**
- **Boutons de suppression** : Apparaissent au survol de chaque carte
- **Confirmation requise** : Boîte de dialogue avec le nom de l'élément
- **Animation fluide** : L'élément disparaît avec une animation élégante
- **Action irréversible** : La suppression ne peut pas être annulée
- **Pas de limite** : Vous pouvez ajouter et supprimer autant d'éléments que vous voulez

## 📅 Gestion des Événements

### **Ajouter un événement**
1. Connectez-vous en tant qu'admin
2. Allez à la section "Événements"
3. Cliquez sur "Ajouter un Événement"
4. Remplissez le formulaire :
   - **Titre** (obligatoire)
   - **Date** (obligatoire)
   - **Heure** (optionnel)
   - **Lieu** (optionnel)
   - **Description** (obligatoire)
5. Cliquez sur "Ajouter l'Événement"

### **Supprimer un événement**
1. Connectez-vous en tant qu'admin
2. Allez à la section "Événements"
3. Survolez l'événement à supprimer
4. Cliquez sur l'icône 🗑️ (poubelle) qui apparaît en haut à droite
5. Confirmez la suppression dans la boîte de dialogue
6. L'événement sera supprimé avec une animation fluide

## 🎭 Gestion du Contenu Culturel

### **Ajouter du contenu culturel**
1. Connectez-vous en tant qu'admin
2. Allez à la section "Culture du Togo"
3. Cliquez sur "Ajouter du Contenu Culturel"
4. Remplissez le formulaire :
   - **Titre** (obligatoire)
   - **Catégorie** (obligatoire) :
     - Histoire
     - Traditions
     - Cuisine
     - Art et Culture
     - Géographie
     - Langues
   - **Image** (optionnel) : Déposez directement votre image
   - **Description** (obligatoire)
   - **Contenu Détaillé** (optionnel)
5. Cliquez sur "Ajouter le Contenu"

### **Supprimer du contenu culturel**
1. Connectez-vous en tant qu'admin
2. Allez à la section "Culture du Togo"
3. Survolez le contenu à supprimer
4. Cliquez sur l'icône 🗑️ (poubelle) qui apparaît en haut à droite
5. Confirmez la suppression dans la boîte de dialogue
6. Le contenu sera supprimé avec une animation fluide

### **Types de contenu recommandés**
- **Histoire** : Récits historiques, personnages importants
- **Traditions** : Cérémonies, coutumes, fêtes
- **Cuisine** : Recettes, plats traditionnels
- **Art et Culture** : Musique, danse, artisanat
- **Géographie** : Régions, paysages, villes
- **Langues** : Dialectes, expressions

## 📧 Formulaires Intégrés

### **Formulaire d'Adhésion**
- **Formulaire intégré** : S'ouvre directement sur le site
- **Stockage local** : Les demandes sont sauvegardées dans le navigateur
- **Option Google Forms** : Possibilité d'envoyer aussi via Google Forms pour sauvegarde
- **Notifications** : Message de confirmation immédiat

### **Formulaire de Contact**
- **Formulaire intégré** : S'ouvre directement sur le site
- **Stockage local** : Les messages sont sauvegardés dans le navigateur
- **Option Google Forms** : Possibilité d'envoyer aussi via Google Forms pour sauvegarde
- **Notifications** : Message de confirmation immédiat

### **Accès aux Données**
- **LocalStorage** : Toutes les demandes et messages sont stockés localement
- **Sauvegarde** : Les utilisateurs peuvent aussi envoyer via Google Forms
- **Gestion** : Les admins peuvent voir les données stockées localement

## 🔒 Sécurité

### **Sécurité**
- **Mode visiteur par défaut** : Le site démarre toujours en mode visiteur
- **Connexion requise** : Email ET mot de passe nécessaires pour l'administration
- **Pas de persistance** : La session admin ne persiste pas entre les rechargements
- **Déconnexion automatique** : Le mode admin se désactive à chaque rechargement de page

### **Déconnexion**
1. Cliquez sur l'icône ⚙️ (jaune)
2. Cliquez sur "Se déconnecter" dans le modal
3. Ou rechargez la page (déconnexion automatique)

## 💾 Stockage des Données

### **LocalStorage**
- Les données sont stockées dans le navigateur
- Pas de base de données externe
- Les données persistent entre les sessions
- **Note** : Le statut admin ne persiste PAS (sécurité renforcée)

### **Données stockées**
- Membres du conseil d'administration
- Événements
- Contenu culturel
- Statut d'administration

## 🛠️ Dépannage

### **Problème de connexion**
- Vérifiez que l'email est correct : `franceassetoh228@gmail.com`
- Vérifiez que le mot de passe est correct : `assetoh2025@`
- Essayez de rafraîchir la page
- Vérifiez que JavaScript est activé

### **Boutons d'administration invisibles**
- Assurez-vous d'être connecté en tant qu'admin
- Vérifiez que l'icône ⚙️ est jaune
- Rafraîchissez la page si nécessaire

### **Données perdues**
- Les données sont stockées localement
- Si vous changez de navigateur, les données ne suivent pas
- Faites des sauvegardes régulières

## 📱 Responsive Design

Le système d'administration fonctionne sur :
- **Ordinateurs** : Interface complète
- **Tablettes** : Interface adaptée
- **Mobiles** : Interface simplifiée

## 🔄 Mise à jour du Contenu

### **Fréquence recommandée**
- **Membres** : À chaque changement de bureau
- **Événements** : Au fur et à mesure de leur planification
- **Contenu culturel** : Régulièrement pour enrichir la section

### **Sauvegarde**
- Exportez régulièrement les données importantes
- Gardez des copies des images utilisées
- Documentez les ajouts de contenu

## 📞 Support

Pour toute question ou problème :
- **Email** : franceassetoh228@gmail.com
- **Développeur** : Contactez le créateur du site

---

**Note** : Ce système d'administration est conçu pour être simple et efficace. Il ne nécessite aucune connaissance technique particulière.
