const express = require('express');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
require('dotenv').config();

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

// Configuration MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/assetoh_db';
const DB_NAME = 'assetoh_db';
const COLLECTION_NAME = 'website_data';

let client;
let db;

// Données par défaut
const defaultData = {
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

// Connexion MongoDB
async function connectToMongoDB() {
    try {
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db(DB_NAME);
        console.log('✅ Connecté à MongoDB Atlas');
        
        // Initialiser les données si la collection est vide
        const collection = db.collection(COLLECTION_NAME);
        const count = await collection.countDocuments();
        if (count === 0) {
            await collection.insertOne({ _id: 'website_data', ...defaultData });
            console.log('📝 Données initiales créées');
        }
    } catch (error) {
        console.error('❌ Erreur MongoDB:', error);
        // Fallback vers les données par défaut
    }
}

// Fonction pour récupérer les données
async function getData() {
    try {
        if (!db) return defaultData;
        const collection = db.collection(COLLECTION_NAME);
        const data = await collection.findOne({ _id: 'website_data' });
        return data || defaultData;
    } catch (error) {
        console.error('❌ Erreur récupération données:', error);
        return defaultData;
    }
}

// Fonction pour sauvegarder les données
async function saveData(data) {
    try {
        if (!db) return false;
        const collection = db.collection(COLLECTION_NAME);
        await collection.updateOne(
            { _id: 'website_data' },
            { $set: data },
            { upsert: true }
        );
        return true;
    } catch (error) {
        console.error('❌ Erreur sauvegarde données:', error);
        return false;
    }
}

// Connexion au démarrage
connectToMongoDB();

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

// Export pour Vercel
module.exports = app;
