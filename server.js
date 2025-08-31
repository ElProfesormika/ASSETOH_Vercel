const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware pour les headers de cache
app.use((req, res, next) => {
    // Headers pour éviter le cache
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Headers de sécurité
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Headers CORS pour permettre les requêtes API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    next();
});

// Fichier de données
const DATA_FILE = path.join(__dirname, 'data.json');

// Fonction pour lire les données
function readData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Erreur lecture données:', error);
    }
    return {
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
}

// Fonction pour sauvegarder les données
function saveData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Erreur sauvegarde données:', error);
        return false;
    }
}

// Routes API pour les données

// GET - Récupérer toutes les données
app.get('/api/data', (req, res) => {
    const data = readData();
    res.json(data);
});

// POST - Sauvegarder les membres
app.post('/api/members', (req, res) => {
    const data = readData();
    data.members = req.body;
    if (saveData(data)) {
        res.json({ success: true, message: 'Membres sauvegardés avec succès' });
    } else {
        res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
    }
});

// POST - Sauvegarder les événements
app.post('/api/events', (req, res) => {
    const data = readData();
    data.events = req.body;
    if (saveData(data)) {
        res.json({ success: true, message: 'Événements sauvegardés avec succès' });
    } else {
        res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
    }
});

// POST - Sauvegarder le contenu culturel
app.post('/api/culture', (req, res) => {
    const data = readData();
    data.cultureContent = req.body;
    if (saveData(data)) {
        res.json({ success: true, message: 'Contenu culturel sauvegardé avec succès' });
    } else {
        res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
    }
});

// POST - Sauvegarder les informations de contact
app.post('/api/contact', (req, res) => {
    const data = readData();
    data.contactInfo = req.body;
    if (saveData(data)) {
        res.json({ success: true, message: 'Informations de contact sauvegardées avec succès' });
    } else {
        res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
    }
});

// POST - Sauvegarder les liens sociaux
app.post('/api/social', (req, res) => {
    const data = readData();
    data.socialLinks = req.body;
    if (saveData(data)) {
        res.json({ success: true, message: 'Liens sociaux sauvegardés avec succès' });
    } else {
        res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
    }
});

// Servir les fichiers statiques
app.use(express.static(__dirname, {
    etag: false,
    lastModified: false,
    setHeaders: (res, path) => {
        if (path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
    }
}));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur ASSETOH démarré sur le port ${PORT}`);
    console.log(`📱 URL: http://localhost:${PORT}`);
    console.log(`🌐 Prêt pour le déploiement Railway !`);
    console.log(`📊 API disponible sur /api/data`);
});
