# 📁 Guide Configuration GitHub comme Base de Données

## 🎯 Principe
Utiliser GitHub comme base de données pour stocker les modifications de l'admin de manière persistante et visible par tous les utilisateurs.

## 📋 Étapes de Configuration

### **1. 🔐 Créer un Token GitHub**

1. **Aller sur** : https://github.com/settings/tokens
2. **Cliquer** sur "Generate new token (classic)"
3. **Donner un nom** : `ASSETOH_Website_DB`
4. **Sélectionner les permissions** :
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. **Cliquer** sur "Generate token"
6. **Copier** le token (il ne sera plus visible après)

### **2. ⚙️ Configurer Vercel**

1. **Aller sur** : https://vercel.com
2. **Sélectionner** votre projet ASSETOH
3. **Aller** dans "Settings" > "Environment Variables"
4. **Ajouter** :
   - **Name** : `GITHUB_TOKEN`
   - **Value** : Le token GitHub copié
   - **Environments** : Production, Preview, Development
5. **Cliquer** sur "Save"

### **3. 🧪 Tester la Configuration**

1. **Redéployer** le projet sur Vercel
2. **Vérifier** les logs de déploiement
3. **Tester** l'ajout de contenu via l'admin
4. **Vérifier** que les données persistent

## 🔧 Configuration Locale

### **Fichier .env (local uniquement) :**
```env
GITHUB_TOKEN=ghp_votre_token_ici
```

## 📊 Fonctionnement

### **🔄 Cycle de Données :**
1. **Admin modifie** → API sauvegarde sur GitHub
2. **GitHub** → Met à jour le fichier `data.json`
3. **Site web** → Lit les données depuis GitHub
4. **Tous les utilisateurs** → Voient les modifications

### **📁 Structure des Données :**
Le fichier `data.json` contient :
- **members** : Bureau exécutif et conseillers
- **events** : Événements de l'association
- **cultureContent** : Contenu culturel du Togo
- **contactInfo** : Informations de contact
- **socialLinks** : Liens vers les réseaux sociaux

## 🚨 Sécurité

- ✅ **Token GitHub** sécurisé
- ✅ **Variables d'environnement** protégées
- ✅ **Pas de credentials** dans le code
- ✅ **Permissions minimales** nécessaires

## 📈 Avantages

- ✅ **Gratuit** (GitHub)
- ✅ **Versioning automatique** (historique complet)
- ✅ **Persistance réelle** (visible par tous)
- ✅ **Pas de base de données** complexe
- ✅ **Backup automatique** (GitHub)

## 🔍 Vérification

### **Vérifier que ça fonctionne :**
1. **Ajouter** un membre via l'admin
2. **Vérifier** que le fichier `data.json` est mis à jour sur GitHub
3. **Recharger** le site → Les données doivent être visibles
4. **Tester** depuis un autre navigateur/ordinateur

## 📞 Support

En cas de problème :
1. **Vérifier** les logs Vercel
2. **Tester** la connexion GitHub API
3. **Vérifier** les variables d'environnement
4. **Contrôler** les permissions du token

## 🎯 Résultat Final

- ✅ **Modifications admin** visibles par tous
- ✅ **Données persistantes** sur GitHub
- ✅ **Historique complet** des changements
- ✅ **Configuration simple** et gratuite
