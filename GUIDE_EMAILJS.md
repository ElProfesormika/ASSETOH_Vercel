# Guide de Configuration EmailJS pour ASSETOH

## 📧 Configuration EmailJS pour Envoi Direct d'Emails

### 🎯 Objectif
Ce guide vous explique comment configurer EmailJS pour recevoir directement les soumissions de formulaires dans votre boîte mail sans passer par Google Forms.

### 📝 Étapes de Configuration

#### 1. **Créer un Compte EmailJS**

1. **Allez sur** : https://www.emailjs.com/
2. **Cliquez sur "Sign Up"** et créez un compte gratuit
3. **Vérifiez votre email**

#### 2. **Configurer un Service Email**

1. **Dans votre dashboard EmailJS**, cliquez sur "Email Services"
2. **Cliquez sur "Add New Service"**
3. **Choisissez votre fournisseur email** :
   - **Gmail** (recommandé)
   - **Outlook**
   - **Yahoo**
   - **Autre**
4. **Connectez votre compte email** : `franceassetoh228@gmail.com`
5. **Notez le Service ID** généré

#### 3. **Créer des Templates d'Email**

##### **Template pour Adhésion :**

1. **Cliquez sur "Email Templates"**
2. **Cliquez sur "Create New Template"**
3. **Nommez-le** : "ASSETOH - Demande d'Adhésion"
4. **Utilisez ce template** :

```html
<h2>Nouvelle Demande d'Adhésion ASSETOH</h2>

<p><strong>Nom et Prénom :</strong> {{name}}</p>
<p><strong>Email :</strong> {{email}}</p>
<p><strong>Téléphone :</strong> {{phone}}</p>
<p><strong>Nationalité :</strong> {{nationality}}</p>
<p><strong>Études actuelles :</strong> {{studies}}</p>
<p><strong>Motivation :</strong> {{motivation}}</p>
<p><strong>Date de soumission :</strong> {{date}}</p>

<hr>
<p><em>Ce message a été envoyé depuis le site web ASSETOH</em></p>
```

5. **Notez le Template ID** généré

##### **Template pour Contact :**

1. **Créez un nouveau template**
2. **Nommez-le** : "ASSETOH - Message de Contact"
3. **Utilisez ce template** :

```html
<h2>Nouveau Message de Contact ASSETOH</h2>

<p><strong>Nom :</strong> {{name}}</p>
<p><strong>Email :</strong> {{email}}</p>
<p><strong>Sujet :</strong> {{subject}}</p>
<p><strong>Message :</strong></p>
<p>{{message}}</p>
<p><strong>Date de soumission :</strong> {{date}}</p>

<hr>
<p><em>Ce message a été envoyé depuis le site web ASSETOH</em></p>
```

4. **Notez le Template ID** généré

#### 4. **Obtenir votre Clé Publique**

1. **Dans votre dashboard**, cliquez sur "Account" → "API Keys"
2. **Copiez votre "Public Key"**

#### 5. **Mettre à Jour le Code**

✅ **CONFIGURATION TERMINÉE !**

Les valeurs ont été configurées dans le code :

**Dans `index.html` :**
```html
<script type="text/javascript">
    (function() {
        emailjs.init("P7BXkQJgBk2lqXboL");
    })();
</script>
```

**Dans `script.js` :**
```javascript
const emailConfig = {
    adhesion: {
        templateId: 'template_1o9hunc',
        subject: 'Nouvelle demande d\'adhésion ASSETOH',
        toEmail: 'franceassetoh228@gmail.com'
    },
    contact: {
        templateId: 'template_0g7zrn2',
        subject: 'Nouveau message de contact ASSETOH',
        toEmail: 'franceassetoh228@gmail.com'
    }
};

// Service ID configuré :
emailjs.send('service_s0vk6ro', config.templateId, templateParams)
```

### 🔧 Configuration Alternative : Formspree

Si EmailJS semble trop complexe, voici une alternative plus simple :

#### **Formspree (PLUS SIMPLE)**

1. **Allez sur** : https://formspree.io/
2. **Créez un compte gratuit**
3. **Créez un nouveau formulaire**
4. **Notez l'endpoint** généré (ex: `https://formspree.io/f/xayzabcd`)
5. **Remplacez la fonction sendEmail** par :

```javascript
function sendEmail(formType, formData) {
    const formspreeEndpoint = 'https://formspree.io/f/VOTRE_ENDPOINT';
    
    fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formType === 'adhesion' ? 'Demande d\'adhésion ASSETOH' : 'Message de contact ASSETOH',
            message: formType === 'adhesion' 
                ? `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nNationalité: ${formData.nationality}\nÉtudes: ${formData.studies}\nMotivation: ${formData.motivation}`
                : formData.message
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Email envoyé avec succès:', data);
        showNotification('Email envoyé avec succès !', 'success');
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        showNotification('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.', 'error');
    });
}
```

### 🧪 Test de la Configuration

#### **Pour Tester :**
1. **Remplissez un formulaire** sur le site ASSETOH
2. **Cliquez sur "Envoyer"**
3. **Vérifiez votre email** : `franceassetoh228@gmail.com`
4. **Vérifiez la console** du navigateur pour les logs

### ⚠️ Points Importants

#### **Limitations Gratuites :**
- **EmailJS** : 200 emails/mois gratuits
- **Formspree** : 50 soumissions/mois gratuites

#### **Sécurité :**
- Les clés publiques sont visibles dans le code
- Utilisez des validations côté client
- Considérez un backend pour plus de sécurité

#### **Recommandations :**
- Testez d'abord avec des données de test
- Surveillez votre quota d'emails
- Configurez des notifications de quota

### 🔄 Mise à Jour du Code

Une fois configuré, testez immédiatement avec un formulaire de test.

### 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les clés et IDs
2. Consultez la console du navigateur
3. Vérifiez votre quota d'emails
4. Testez avec des données simples

---

**Email de contact :** franceassetoh228@gmail.com
**Date de création :** 2025
