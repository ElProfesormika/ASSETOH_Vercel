# 🚂 Guide de Déploiement Railway pour ASSETOH

## 📋 Prérequis

- Compte GitHub avec le dépôt ASSETOH
- Compte Railway (gratuit)
- Carte bancaire pour vérification (Railway l'exige)

## 🚀 Étapes de Déploiement

### 1. **Créer un Compte Railway**

1. **Allez sur** : https://railway.app/
2. **Cliquez sur "Start a New Project"**
3. **Connectez-vous avec GitHub**
4. **Autorisez Railway** à accéder à vos dépôts

### 2. **Connecter le Dépôt GitHub**

1. **Dans Railway**, cliquez sur "Deploy from GitHub repo"
2. **Sélectionnez le dépôt** : `ElProfesormika/ASSETOH`
3. **Cliquez sur "Deploy Now"**

### 3. **Configuration Automatique**

Railway va automatiquement :
- ✅ Détecter le `package.json`
- ✅ Installer les dépendances
- ✅ Démarrer le serveur HTTP
- ✅ Générer une URL de déploiement

### 4. **Variables d'Environnement (Optionnel)**

Si nécessaire, ajoutez dans Railway :
```
NODE_ENV=production
PORT=3000
```

### 5. **Domaine Personnalisé (Optionnel)**

1. **Dans votre projet Railway**, allez dans "Settings"
2. **Cliquez sur "Domains"**
3. **Ajoutez votre domaine** (ex: `assetoh.fr`)

## 🔧 Configuration Technique

### **Fichiers de Configuration Créés :**

#### **`package.json`**
```json
{
  "name": "assetoh-website",
  "scripts": {
    "start": "npx http-server -p $PORT -o"
  },
  "dependencies": {
    "http-server": "^14.1.1"
  }
}
```

#### **`railway.json`**
```json
{
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/"
  }
}
```

#### **`Procfile`**
```
web: npm start
```

## 🌐 URLs de Déploiement

### **URL Railway Générée :**
- Format : `https://assetoh-production-xxxx.up.railway.app`
- **Cette URL sera fournie par Railway après le déploiement**

### **URL Personnalisée (Optionnelle) :**
- Format : `https://votre-domaine.com`

## 📊 Monitoring et Logs

### **Dans Railway Dashboard :**
- **Logs en temps réel** : Voir les logs du serveur
- **Métriques** : CPU, mémoire, requêtes
- **Déploiements** : Historique des déploiements
- **Variables d'environnement** : Configuration

## 🔄 Déploiement Automatique

### **Configuration :**
- ✅ **Déploiement automatique** activé par défaut
- ✅ **Nouveau commit** = nouveau déploiement
- ✅ **Rollback** possible en cas de problème

### **Workflow :**
1. **Modifiez le code** localement
2. **Commitez et poussez** sur GitHub
3. **Railway déploie automatiquement**
4. **Site mis à jour** en quelques minutes

## 💰 Coûts et Limites

### **Plan Gratuit :**
- **500 heures/mois** de runtime
- **1 projet** actif
- **512 MB RAM** par service
- **1 GB** de stockage

### **Plan Payant :**
- **$5/mois** pour plus de ressources
- **Domaine personnalisé** inclus
- **Support prioritaire**

## 🧪 Test du Déploiement

### **Après Déploiement :**
1. **Vérifiez l'URL** fournie par Railway
2. **Testez toutes les fonctionnalités** :
   - Navigation
   - Formulaires d'adhésion
   - Formulaire de contact
   - Mode admin
   - Upload d'images
3. **Vérifiez les emails** EmailJS
4. **Testez sur mobile** et desktop

## 🔧 Dépannage

### **Problèmes Courants :**

#### **Erreur de Port :**
- Vérifiez que `$PORT` est utilisé dans `package.json`
- Railway assigne automatiquement le port

#### **Erreur de Build :**
- Vérifiez les logs dans Railway
- Assurez-vous que Node.js >= 16

#### **Erreur EmailJS :**
- Vérifiez la configuration EmailJS
- Testez en local d'abord

### **Logs Railway :**
```bash
# Dans Railway Dashboard
# Allez dans "Deployments" → "View Logs"
```

## 📱 Optimisations

### **Performance :**
- **Compression gzip** automatique
- **Cache statique** pour les assets
- **CDN global** de Railway

### **Sécurité :**
- **HTTPS** automatique
- **Headers de sécurité** configurés
- **Protection DDoS** incluse

## 🔗 Liens Utiles

- **Railway Dashboard** : https://railway.app/dashboard
- **Documentation Railway** : https://docs.railway.app/
- **GitHub Repository** : https://github.com/ElProfesormika/ASSETOH
- **Email Support** : franceassetoh228@gmail.com

## ✅ Checklist de Déploiement

- [ ] Compte Railway créé
- [ ] Dépôt GitHub connecté
- [ ] Déploiement initial réussi
- [ ] URL de déploiement notée
- [ ] Fonctionnalités testées
- [ ] Emails EmailJS testés
- [ ] Responsive design vérifié
- [ ] Mode admin testé
- [ ] Upload d'images testé

---

**🎉 Félicitations ! Votre site ASSETOH est maintenant déployé sur Railway !**

**URL de votre site :** `https://assetoh-production-xxxx.up.railway.app`

**Date de déploiement :** 2025

