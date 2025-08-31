const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/assetoh';
let db = null;

// Connexion à MongoDB
async function connectToMongoDB() {
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db();
        console.log('✅ Connecté à MongoDB Atlas');
        return client;
    } catch (error) {
        console.error('❌ Erreur de connexion MongoDB:', error);
        // Fallback vers le système de fichiers local
        return null;
    }
}

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

// Données par défaut
const DEFAULT_DATA = {
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

// Fonction pour lire les données depuis MongoDB
async function readData() {
    try {
        if (db) {
            const collection = db.collection('website_data');
            const data = await collection.findOne({ _id: 'main' });
            return data || DEFAULT_DATA;
        }
    } catch (error) {
        console.error('❌ Erreur lecture données MongoDB:', error);
    }
    return DEFAULT_DATA;
}

// Fonction pour sauvegarder les données dans MongoDB
async function saveData(data) {
    try {
        if (db) {
            const collection = db.collection('website_data');
            await collection.updateOne(
                { _id: 'main' },
                { $set: { ...data, updatedAt: new Date() } },
                { upsert: true }
            );
            console.log('✅ Données sauvegardées dans MongoDB');
            return true;
        }
    } catch (error) {
        console.error('❌ Erreur sauvegarde données MongoDB:', error);
    }
    return false;
}

// Routes API pour les données

// GET - Récupérer toutes les données
app.get('/api/data', async (req, res) => {
    try {
        const data = await readData();
        res.json(data);
    } catch (error) {
        console.error('❌ Erreur API /api/data:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST - Sauvegarder les membres
app.post('/api/members', async (req, res) => {
    try {
        const data = await readData();
        data.members = req.body;
        const saved = await saveData(data);
        if (saved) {
            res.json({ success: true, message: 'Membres sauvegardés avec succès' });
        } else {
            res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
        }
    } catch (error) {
        console.error('❌ Erreur API /api/members:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// POST - Sauvegarder les événements
app.post('/api/events', async (req, res) => {
    try {
        const data = await readData();
        data.events = req.body;
        const saved = await saveData(data);
        if (saved) {
            res.json({ success: true, message: 'Événements sauvegardés avec succès' });
        } else {
            res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
        }
    } catch (error) {
        console.error('❌ Erreur API /api/events:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// POST - Sauvegarder le contenu culturel
app.post('/api/culture', async (req, res) => {
    try {
        const data = await readData();
        data.cultureContent = req.body;
        const saved = await saveData(data);
        if (saved) {
            res.json({ success: true, message: 'Contenu culturel sauvegardé avec succès' });
        } else {
            res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
        }
    } catch (error) {
        console.error('❌ Erreur API /api/culture:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// POST - Sauvegarder les informations de contact
app.post('/api/contact', async (req, res) => {
    try {
        const data = await readData();
        data.contactInfo = req.body;
        const saved = await saveData(data);
        if (saved) {
            res.json({ success: true, message: 'Informations de contact sauvegardées avec succès' });
        } else {
            res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
        }
    } catch (error) {
        console.error('❌ Erreur API /api/contact:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// POST - Sauvegarder les liens sociaux
app.post('/api/social', async (req, res) => {
    try {
        const data = await readData();
        data.socialLinks = req.body;
        const saved = await saveData(data);
        if (saved) {
            res.json({ success: true, message: 'Liens sociaux sauvegardés avec succès' });
        } else {
            res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
        }
    } catch (error) {
        console.error('❌ Erreur API /api/social:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
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
async function startServer() {
    try {
        // Connexion à MongoDB
        await connectToMongoDB();
        
        // Démarrer le serveur
        app.listen(PORT, () => {
            console.log(`🚀 Serveur ASSETOH démarré sur le port ${PORT}`);
            console.log(`📱 URL: http://localhost:${PORT}`);
            console.log(`🌐 Prêt pour le déploiement Vercel !`);
            console.log(`📊 API disponible sur /api/data`);
            console.log(`🗄️ Base de données: ${db ? 'MongoDB Atlas' : 'Fichier local'}`);
        });
    } catch (error) {
        console.error('❌ Erreur démarrage serveur:', error);
        process.exit(1);
    }
}

// Démarrer le serveur
startServer();
