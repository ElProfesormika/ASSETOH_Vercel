const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Données en mémoire avec persistance locale
let websiteData = {
    members: {
        'bureau-executif': [],
        'conseillers': []
    },
    events: [],
    cultureContent: [],
    contactInfo: {
        address: 'Le Havre, France',
        email: 'franceassetoh228@gmail.com',
        phone: '+33 1 23 45 67 89',
        facebook: 'https://facebook.com/assetoh',
        instagram: 'https://instagram.com/assetoh'
    },
    socialLinks: {
        facebook: 'https://facebook.com/assetoh',
        instagram: 'https://instagram.com/assetoh',
        linkedin: 'https://linkedin.com/company/assetoh',
        youtube: 'https://youtube.com/@assetoh'
    }
};

// Fonction pour récupérer les données
async function getData() {
    return websiteData;
}

// Fonction pour sauvegarder les données
async function saveData(data) {
    try {
        websiteData = data;
        console.log('✅ Données sauvegardées en mémoire');
        return true;
    } catch (error) {
        console.error('❌ Erreur sauvegarde:', error);
        return false;
    }
}

// Routes API

// GET - Récupérer toutes les données
app.get('/api/data', async (req, res) => {
    try {
        const data = await getData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET - Récupérer les membres
app.get('/api/members', async (req, res) => {
    try {
        const data = await getData();
        res.json(data.members);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT - Sauvegarder les membres
app.put('/api/members', async (req, res) => {
    try {
        const data = await getData();
        data.members = req.body;
        const success = await saveData(data);
        if (success) {
            res.json({ success: true, message: 'Membres sauvegardés' });
        } else {
            res.status(500).json({ error: 'Erreur de sauvegarde' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET - Récupérer les événements
app.get('/api/events', async (req, res) => {
    try {
        const data = await getData();
        res.json(data.events);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT - Sauvegarder les événements
app.put('/api/events', async (req, res) => {
    try {
        const data = await getData();
        data.events = req.body;
        const success = await saveData(data);
        if (success) {
            res.json({ success: true, message: 'Événements sauvegardés' });
        } else {
            res.status(500).json({ error: 'Erreur de sauvegarde' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET - Récupérer le contenu culturel
app.get('/api/cultureContent', async (req, res) => {
    try {
        const data = await getData();
        res.json(data.cultureContent);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT - Sauvegarder le contenu culturel
app.put('/api/cultureContent', async (req, res) => {
    try {
        const data = await getData();
        data.cultureContent = req.body;
        const success = await saveData(data);
        if (success) {
            res.json({ success: true, message: 'Contenu culturel sauvegardé' });
        } else {
            res.status(500).json({ error: 'Erreur de sauvegarde' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET - Récupérer les infos de contact
app.get('/api/contactInfo', async (req, res) => {
    try {
        const data = await getData();
        res.json(data.contactInfo);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT - Sauvegarder les infos de contact
app.put('/api/contactInfo', async (req, res) => {
    try {
        const data = await getData();
        data.contactInfo = req.body;
        const success = await saveData(data);
        if (success) {
            res.json({ success: true, message: 'Infos de contact sauvegardées' });
        } else {
            res.status(500).json({ error: 'Erreur de sauvegarde' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET - Récupérer les liens sociaux
app.get('/api/socialLinks', async (req, res) => {
    try {
        const data = await getData();
        res.json(data.socialLinks);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT - Sauvegarder les liens sociaux
app.put('/api/socialLinks', async (req, res) => {
    try {
        const data = await getData();
        data.socialLinks = req.body;
        const success = await saveData(data);
        if (success) {
            res.json({ success: true, message: 'Liens sociaux sauvegardés' });
        } else {
            res.status(500).json({ error: 'Erreur de sauvegarde' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Servir les fichiers statiques depuis public
app.use(express.static('public'));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur ASSETOH démarré sur le port ${PORT}`);
    console.log(`📱 URL: http://localhost:${PORT}`);
    console.log(`🌐 Prêt pour le déploiement !`);
    console.log(`📊 API disponible sur /api`);
    console.log(`🗄️ Base de données: db.json`);
});
