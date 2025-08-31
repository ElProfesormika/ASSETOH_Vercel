# 🚀 Guide de Migration vers Vercel + MongoDB Atlas

## 📋 Prérequis

### 1. Compte Vercel
- Créer un compte sur [vercel.com](https://vercel.com)
- Connecter votre compte GitHub

### 2. Base de Données MongoDB Atlas (Gratuit)
- Créer un compte sur [mongodb.com/atlas](https://mongodb.com/atlas)
- Créer un cluster gratuit
- Obtenir l'URI de connexion

## 🔧 Configuration MongoDB Atlas

### Étape 1 : Créer un Cluster
1. Aller sur [mongodb.com/atlas](https://mongodb.com/atlas)
2. Cliquer sur "Try Free"
3. Créer un compte ou se connecter
4. Choisir "Shared" (gratuit)
5. Sélectionner un provider (AWS, Google Cloud, Azure)
6. Choisir une région (Europe de l'Ouest recommandé)
7. Cliquer sur "Create"

### Étape 2 : Configurer la Base de Données
1. Dans le cluster, cliquer sur "Connect"
2. Choisir "Connect your application"
3. Copier l'URI de connexion
4. Remplacer `<password>` par votre mot de passe

### Étape 3 : Créer un Utilisateur
1. Dans "Database Access", cliquer sur "Add New Database User"
2. Créer un utilisateur avec mot de passe
3. Donner les permissions "Read and write to any database"

## 🌐 Déploiement sur Vercel

### Étape 1 : Préparer le Repository
1. S'assurer que tous les fichiers sont commités sur GitHub
2. Vérifier que `vercel.json` est présent
3. Vérifier que `package.json` contient les bonnes dépendances

### Étape 2 : Déployer sur Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "New Project"
3. Importer le repository GitHub `ElProfesormika/ASSETOH`
4. Vercel détectera automatiquement la configuration

### Étape 3 : Configurer les Variables d'Environnement
Dans Vercel, aller dans Settings > Environment Variables et ajouter :

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/assetoh?retryWrites=true&w=majority
EMAILJS_PUBLIC_KEY=P7BXkQJgBk2lqXboL
EMAILJS_SERVICE_ID=service_s0vk6ro
EMAILJS_TEMPLATE_ADHESION=template_1o9hunc
EMAILJS_TEMPLATE_CONTACT=template_0g7zrn2
ADMIN_EMAIL=franceassetoh228@gmail.com
ADMIN_PASSWORD=assetoh2025@
```

### Étape 4 : Déployer
1. Cliquer sur "Deploy"
2. Attendre la fin du déploiement
3. Vérifier que le site fonctionne

## 🔄 Migration des Données

### Depuis Railway (Ancien)
1. Exporter les données actuelles depuis Railway
2. Les importer dans MongoDB Atlas
3. Vérifier que tout fonctionne

### Test de la Migration
1. Vérifier que le site se charge
2. Tester la connexion admin
3. Ajouter/modifier du contenu
4. Vérifier que les données persistent

## 🛠️ Avantages de Vercel + MongoDB Atlas

### Vercel
- ✅ **Gratuit** pour usage personnel
- ✅ **Déploiement automatique** depuis GitHub
- ✅ **Performance** optimisée
- ✅ **CDN global** pour vitesse
- ✅ **SSL automatique**

### MongoDB Atlas
- ✅ **Gratuit** (512MB de stockage)
- ✅ **Sauvegarde automatique**
- ✅ **Haute disponibilité**
- ✅ **Données persistantes**
- ✅ **Pas de perte lors des maintenances**

## 🔍 Vérification Post-Migration

### Checklist
- [ ] Site accessible sur Vercel
- [ ] Base de données connectée
- [ ] Admin peut se connecter
- [ ] Ajout/modification de contenu fonctionne
- [ ] Données persistent après redémarrage
- [ ] Emails fonctionnent
- [ ] Menu mobile fonctionne
- [ ] Statistiques dynamiques

### URLs
- **Site principal** : `https://assetoh-website.vercel.app`
- **Dashboard Vercel** : `https://vercel.com/dashboard`
- **MongoDB Atlas** : `https://cloud.mongodb.com`

## 🆘 Support

En cas de problème :
1. Vérifier les logs Vercel
2. Vérifier la connexion MongoDB
3. Tester localement avec `npm start`
4. Consulter la documentation Vercel/MongoDB

## 🎉 Résultat Final

Votre site ASSETOH sera :
- ✅ **Hébergé gratuitement** sur Vercel
- ✅ **Données persistantes** dans MongoDB Atlas
- ✅ **Sauvegarde automatique** des données
- ✅ **Performance optimisée**
- ✅ **Maintenance simplifiée**
