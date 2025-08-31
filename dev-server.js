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

// Configuration GitHub pour développement local
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = 'ElProfesormika/ASSETOH_Vercel';
const GITHUB_BRANCH = 'main';
const DATA_FILE_PATH = 'data.json';

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

// Fonction pour récupérer les données depuis GitHub
async function getData() {
    try {
        if (!GITHUB_TOKEN) {
            console.log('⚠️ Pas de token GitHub, utilisation des données par défaut');
            return defaultData;
        }

        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}?ref=${GITHUB_BRANCH}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (response.ok) {
            const fileData = await response.json();
            const content = Buffer.from(fileData.content, 'base64').toString('utf8');
            const data = JSON.parse(content);
            console.log('✅ Données récupérées depuis GitHub');
            return data;
        } else {
            console.log('⚠️ Fichier non trouvé, utilisation des données par défaut');
            return defaultData;
        }
    } catch (error) {
        console.error('❌ Erreur récupération GitHub:', error);
        return defaultData;
    }
}

// Fonction pour sauvegarder les données sur GitHub
async function saveData(data) {
    try {
        if (!GITHUB_TOKEN) {
            console.log('⚠️ Pas de token GitHub, sauvegarde en mémoire uniquement');
            return true;
        }

        // Récupérer le SHA du fichier actuel
        const getResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}?ref=${GITHUB_BRANCH}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        let sha = null;
        if (getResponse.ok) {
            const fileData = await getResponse.json();
            sha = fileData.sha;
        }

        // Mettre à jour le fichier
        const content = JSON.stringify(data, null, 2);
        const encodedContent = Buffer.from(content).toString('base64');

        const updateResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Mise à jour des données du site - ${new Date().toISOString()}`,
                content: encodedContent,
                branch: GITHUB_BRANCH,
                sha: sha
            })
        });

        if (updateResponse.ok) {
            console.log('✅ Données sauvegardées sur GitHub');
            return true;
        } else {
            console.error('❌ Erreur sauvegarde GitHub:', await updateResponse.text());
            return false;
        }
    } catch (error) {
        console.error('❌ Erreur sauvegarde GitHub:', error);
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
