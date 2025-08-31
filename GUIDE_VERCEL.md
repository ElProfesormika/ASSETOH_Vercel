# 🚀 Guide de Déploiement Vercel - ASSETOH

## 📋 Prérequis

### 1. Compte Vercel
- Créer un compte sur [vercel.com](https://vercel.com)
- Connecter votre compte GitHub

### 2. Repository GitHub
- Repository : `https://github.com/ElProfesormika/ASSETOH_Vercel.git`
- Branch : `main`

## 🌐 Déploiement sur Vercel

### Étape 1 : Importer le Projet
1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "New Project"
3. Importer le repository `ASSETOH_Vercel`
4. Vercel détectera automatiquement la configuration

### Étape 2 : Configuration
- **Framework Preset** : Node.js
- **Root Directory** : `./` (par défaut)
- **Build Command** : `npm start`
- **Output Directory** : `./` (par défaut)

### Étape 3 : Déployer
1. Cliquer sur "Deploy"
2. Attendre la fin du déploiement
3. Vérifier que le site fonctionne

## 🗄️ Base de Données JSON Server

### Avantages :
- ✅ **Données persistantes** dans `db.json`
- ✅ **API REST automatique** sur `/api`
- ✅ **Sauvegarde automatique**
- ✅ **Pas de configuration complexe**

### Endpoints API :
- `GET /api/members` - Récupérer les membres
- `PUT /api/members` - Sauvegarder les membres
- `GET /api/events` - Récupérer les événements
- `PUT /api/events` - Sauvegarder les événements
- `GET /api/cultureContent` - Récupérer le contenu culturel
- `PUT /api/cultureContent` - Sauvegarder le contenu culturel
- `GET /api/contactInfo` - Récupérer les infos de contact
- `PUT /api/contactInfo` - Sauvegarder les infos de contact
- `GET /api/socialLinks` - Récupérer les liens sociaux
- `PUT /api/socialLinks` - Sauvegarder les liens sociaux

## 🔍 Vérification Post-Déploiement

### Checklist :
- [ ] Site accessible sur Vercel
- [ ] API JSON Server fonctionne
- [ ] Admin peut se connecter
- [ ] Ajout/modification de contenu fonctionne
- [ ] Données persistent après redémarrage
- [ ] Emails fonctionnent
- [ ] Menu mobile fonctionne
- [ ] Statistiques dynamiques

### URLs :
- **Site principal** : `https://assetoh-vercel.vercel.app`
- **Dashboard Vercel** : `https://vercel.com/dashboard`

## 🎉 Résultat Final

Votre site ASSETOH sera :
- ✅ **Hébergé gratuitement** sur Vercel
- ✅ **Données persistantes** dans JSON Server
- ✅ **Sauvegarde automatique** des données
- ✅ **Performance optimisée**
- ✅ **Déploiement automatique** depuis GitHub

## 🆘 Support

En cas de problème :
1. Vérifier les logs Vercel
2. Tester localement avec `npm start`
3. Vérifier que `db.json` est présent
4. Consulter la documentation Vercel
