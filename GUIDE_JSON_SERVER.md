# 🚀 Guide JSON Server - Solution Simple pour ASSETOH

## 🎯 **Pourquoi JSON Server ?**

**Avantages :**
- ✅ **Extrêmement simple** à configurer
- ✅ **Base de données JSON** automatique
- ✅ **API REST** automatique
- ✅ **Pas de configuration complexe**
- ✅ **Gratuit et léger**
- ✅ **Sauvegarde automatique** dans `db.json`

## 📁 **Structure des Fichiers**

### **🗄️ Base de Données :**
- **`db.json`** : Fichier JSON contenant toutes les données
- **Sauvegarde automatique** : Chaque modification est sauvegardée

### **🛠️ Serveur :**
- **`server.js`** : Serveur Express + JSON Server
- **API automatique** : `/api/members`, `/api/events`, etc.

## 🔧 **Comment ça Fonctionne**

### **1. Base de Données JSON :**
```json
{
  "members": {
    "bureau-executif": [],
    "conseillers": []
  },
  "events": [],
  "cultureContent": [],
  "contactInfo": {...},
  "socialLinks": {...}
}
```

### **2. API Automatique :**
- **GET** `/api/members` : Récupérer les membres
- **PUT** `/api/members` : Sauvegarder les membres
- **GET** `/api/events` : Récupérer les événements
- **PUT** `/api/events` : Sauvegarder les événements
- **Etc...**

### **3. Sauvegarde Automatique :**
- Chaque modification est **automatiquement sauvegardée** dans `db.json`
- **Pas de perte de données**
- **Persistance complète**

## 🚀 **Déploiement**

### **1. Local :**
```bash
npm start
```
- Serveur sur `http://localhost:3000`
- API sur `http://localhost:3000/api`

### **2. Production :**
- **Vercel** : Déploiement automatique
- **Railway** : Déploiement automatique
- **Heroku** : Déploiement automatique

## 🎯 **Avantages vs MongoDB**

| **JSON Server** | **MongoDB** |
|----------------|-------------|
| ✅ **5 minutes** de config | ❌ **30 minutes** de config |
| ✅ **Aucune base externe** | ❌ **MongoDB Atlas requis** |
| ✅ **Fichier JSON simple** | ❌ **Base de données complexe** |
| ✅ **API automatique** | ❌ **Routes manuelles** |
| ✅ **Sauvegarde automatique** | ❌ **Configuration sauvegarde** |
| ✅ **Gratuit** | ❌ **Limites gratuites** |

## 🔍 **Test de l'API**

### **1. Voir les données :**
```bash
curl http://localhost:3000/api/members
curl http://localhost:3000/api/events
```

### **2. Modifier les données :**
```bash
curl -X PUT http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
  -d '{"bureau-executif": [], "conseillers": []}'
```

## 🎉 **Résultat**

**Votre site ASSETOH avec :**
- ✅ **Base de données persistante** (fichier JSON)
- ✅ **API REST complète** (automatique)
- ✅ **Sauvegarde automatique** (pas de perte)
- ✅ **Configuration simple** (5 minutes)
- ✅ **Déploiement facile** (Vercel/Railway)

**Plus besoin de MongoDB complexe !** 🚀
