const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

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

// Données en mémoire (pour Vercel)
let inMemoryData = {
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

// Fonction pour charger les données
function loadData() {
    try {
        const dbPath = path.join(__dirname, '..', 'db.json');
        if (fs.existsSync(dbPath)) {
            const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            inMemoryData = { ...inMemoryData, ...data };
        }
    } catch (error) {
        console.log('Utilisation des données par défaut');
    }
}

// Fonction pour sauvegarder les données
function saveData() {
    try {
        const dbPath = path.join(__dirname, '..', 'db.json');
        fs.writeFileSync(dbPath, JSON.stringify(inMemoryData, null, 2));
        return true;
    } catch (error) {
        console.log('Sauvegarde en mémoire uniquement (Vercel)');
        return false;
    }
}

// Charger les données au démarrage
loadData();

// Routes API

// GET - Récupérer toutes les données
app.get('/api/data', (req, res) => {
    res.json(inMemoryData);
});

// GET - Récupérer les membres
app.get('/api/members', (req, res) => {
    res.json(inMemoryData.members);
});

// PUT - Sauvegarder les membres
app.put('/api/members', (req, res) => {
    inMemoryData.members = req.body;
    saveData();
    res.json({ success: true, message: 'Membres sauvegardés' });
});

// GET - Récupérer les événements
app.get('/api/events', (req, res) => {
    res.json(inMemoryData.events);
});

// PUT - Sauvegarder les événements
app.put('/api/events', (req, res) => {
    inMemoryData.events = req.body;
    saveData();
    res.json({ success: true, message: 'Événements sauvegardés' });
});

// GET - Récupérer le contenu culturel
app.get('/api/cultureContent', (req, res) => {
    res.json(inMemoryData.cultureContent);
});

// PUT - Sauvegarder le contenu culturel
app.put('/api/cultureContent', (req, res) => {
    inMemoryData.cultureContent = req.body;
    saveData();
    res.json({ success: true, message: 'Contenu culturel sauvegardé' });
});

// GET - Récupérer les infos de contact
app.get('/api/contactInfo', (req, res) => {
    res.json(inMemoryData.contactInfo);
});

// PUT - Sauvegarder les infos de contact
app.put('/api/contactInfo', (req, res) => {
    inMemoryData.contactInfo = req.body;
    saveData();
    res.json({ success: true, message: 'Infos de contact sauvegardées' });
});

// GET - Récupérer les liens sociaux
app.get('/api/socialLinks', (req, res) => {
    res.json(inMemoryData.socialLinks);
});

// PUT - Sauvegarder les liens sociaux
app.put('/api/socialLinks', (req, res) => {
    inMemoryData.socialLinks = req.body;
    saveData();
    res.json({ success: true, message: 'Liens sociaux sauvegardés' });
});

// Servir les fichiers statiques depuis public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Route principale et toutes les autres routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Export pour Vercel
module.exports = app;
