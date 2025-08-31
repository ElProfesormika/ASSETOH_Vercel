# 🗄️ Guide Configuration MongoDB Atlas

## 📋 Étapes de Configuration

### **1. 🆕 Créer un Compte MongoDB Atlas**

1. **Aller sur** : https://www.mongodb.com/atlas
2. **Cliquer** sur "Try Free"
3. **Créer un compte** ou se connecter
4. **Choisir** le plan "Free" (M0)

### **2. 🏗️ Créer un Cluster**

1. **Cliquer** sur "Build a Database"
2. **Choisir** "FREE" (M0)
3. **Sélectionner** un provider (AWS, Google Cloud, ou Azure)
4. **Choisir** une région (Europe de l'Ouest recommandée)
5. **Cliquer** sur "Create"

### **3. 🔐 Configurer la Sécurité**

#### **A. Créer un Utilisateur Database :**
1. **Aller** dans "Database Access"
2. **Cliquer** sur "Add New Database User"
3. **Username** : `assetoh_admin`
4. **Password** : Créer un mot de passe fort
5. **Role** : "Read and write to any database"
6. **Cliquer** sur "Add User"

#### **B. Configurer l'Accès Réseau :**
1. **Aller** dans "Network Access"
2. **Cliquer** sur "Add IP Address"
3. **Cliquer** sur "Allow Access from Anywhere" (0.0.0.0/0)
4. **Cliquer** sur "Confirm"

### **4. 🔗 Obtenir l'URI de Connexion**

1. **Aller** dans "Database"
2. **Cliquer** sur "Connect"
3. **Choisir** "Connect your application"
4. **Copier** l'URI de connexion

### **5. ⚙️ Configurer Vercel**

#### **A. Variables d'Environnement Vercel :**
1. **Aller** sur https://vercel.com
2. **Sélectionner** votre projet ASSETOH
3. **Aller** dans "Settings" > "Environment Variables"
4. **Ajouter** :
   - **Name** : `MONGODB_URI`
   - **Value** : L'URI copiée de MongoDB Atlas
   - **Environments** : Production, Preview, Development
5. **Cliquer** sur "Save"

#### **B. Remplacer dans l'URI :**
- `<username>` → `assetoh_admin`
- `<password>` → Votre mot de passe
- `<dbname>` → `assetoh_db`

### **6. 🧪 Tester la Configuration**

1. **Redéployer** le projet sur Vercel
2. **Vérifier** les logs de déploiement
3. **Tester** l'ajout de contenu via l'admin
4. **Vérifier** que les données persistent

## 🔧 Configuration Locale

### **Fichier .env (local uniquement) :**
```env
MONGODB_URI=mongodb+srv://assetoh_admin:votre_mot_de_passe@cluster0.mongodb.net/assetoh_db?retryWrites=true&w=majority
```

## 📊 Structure des Données

La base de données contiendra une collection `website_data` avec :
- **members** : Bureau exécutif et conseillers
- **events** : Événements de l'association
- **cultureContent** : Contenu culturel du Togo
- **contactInfo** : Informations de contact
- **socialLinks** : Liens vers les réseaux sociaux

## 🚨 Sécurité

- ✅ **Mot de passe fort** pour l'utilisateur database
- ✅ **Accès réseau** configuré
- ✅ **Variables d'environnement** sécurisées
- ✅ **Pas de credentials** dans le code

## 📞 Support

En cas de problème :
1. **Vérifier** les logs Vercel
2. **Tester** la connexion MongoDB
3. **Vérifier** les variables d'environnement
