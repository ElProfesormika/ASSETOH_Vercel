// Configuration EmailJS
const EMAILJS_CONFIG = {
    publicKey: 'P7BXkQJgBk2lqXboL',
    serviceId: 'service_s0vk6ro',
    templates: {
        adhesion: 'template_1o9hunc',
        contact: 'template_0g7zrn2'
    }
};

// Configuration Admin
const ADMIN_CONFIG = {
    email: 'franceassetoh228@gmail.com',
    password: 'assetoh2025@', // Mot de passe simple pour l'admin
    isAdmin: false
};

// Vérifier et réinitialiser le statut admin au chargement
function resetAdminStatus() {
    // Forcer la déconnexion au chargement de la page
    ADMIN_CONFIG.isAdmin = false;
    localStorage.removeItem('assetoh-admin');
    hideAdminInterface();
    console.log('Statut admin réinitialisé - déconnexion forcée');
}

// Fonction pour afficher les notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Fonction pour vérifier si l'utilisateur est admin
function checkAdminStatus() {
    // Par défaut, l'admin est toujours déconnecté
    ADMIN_CONFIG.isAdmin = false;
    hideAdminInterface();
    console.log('Statut admin vérifié - mode visiteur par défaut');
}

// Fonction pour afficher l'interface admin
function showAdminInterface() {
    document.body.classList.add('admin-mode');
    showNotification('Mode administrateur activé', 'success');
}

// Fonction pour masquer l'interface admin
function hideAdminInterface() {
    document.body.classList.remove('admin-mode');
}

// Fonction pour basculer le mode admin
function toggleAdminMode() {
    if (ADMIN_CONFIG.isAdmin) {
        logoutAdmin();
    } else {
        openAdminModal();
    }
}

// Fonction pour ouvrir le modal d'administration
function openAdminModal() {
    const modal = document.getElementById('adminModal');
    if (!modal) {
        console.error('Modal admin non trouvé');
        return;
    }
    modal.style.display = 'block';
    
    // Focus sur le champ email
    const emailInput = document.getElementById('adminEmail');
    if (emailInput) {
        emailInput.focus();
    }
    console.log('Modal admin ouvert');
}

// Fonction pour fermer le modal d'administration
function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (!modal) {
        console.error('Modal admin non trouvé pour fermeture');
        return;
    }
    modal.style.display = 'none';
    
    // Vider les champs
    const emailInput = document.getElementById('adminEmail');
    const passwordInput = document.getElementById('adminPassword');
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';
    
    console.log('Modal admin fermé');
}

// Fonction pour se connecter en tant qu'admin
function loginAdmin() {
    const emailInput = document.getElementById('adminEmail');
    const passwordInput = document.getElementById('adminPassword');
    
    if (!emailInput || !passwordInput) {
        console.error('Champs email ou mot de passe non trouvés');
        showNotification('Erreur: champs manquants', 'error');
        return;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    console.log('Tentative de connexion avec email:', email);
    
    // Vérifier email et mot de passe
    if (email === ADMIN_CONFIG.email && password === ADMIN_CONFIG.password) {
        ADMIN_CONFIG.isAdmin = true;
        showAdminInterface();
        closeAdminModal();
        showNotification('Connexion réussie ! Mode administrateur activé', 'success');
        console.log('Connexion admin réussie');
    } else {
        showNotification('Email ou mot de passe incorrect', 'error');
        emailInput.value = '';
        passwordInput.value = '';
        console.log('Identifiants incorrects');
    }
}

// Fonction pour se déconnecter
function logoutAdmin() {
    ADMIN_CONFIG.isAdmin = false;
    hideAdminInterface();
    closeAdminModal();
    showNotification('Déconnexion réussie - Mode visiteur activé', 'info');
    console.log('Déconnexion admin effectuée');
}

// Fonction pour ouvrir le formulaire d'adhésion
function openAdhesionForm() {
    const modal = document.getElementById('adhesionModal');
    modal.style.display = 'block';
    document.getElementById('adhesionName').focus();
}

// Fonction pour fermer le formulaire d'adhésion
function closeAdhesionForm() {
    const modal = document.getElementById('adhesionModal');
    modal.style.display = 'none';
    document.getElementById('adhesionForm').reset();
}

// Fonction pour ouvrir le formulaire de contact
function openContactForm() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
    document.getElementById('contactName').focus();
}

// Fonction pour fermer le formulaire de contact
function closeContactForm() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.getElementById('contactForm').reset();
}

// Fonction pour soumettre le formulaire d'adhésion
function submitAdhesionForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('adhesionName').value,
        email: document.getElementById('adhesionEmail').value,
        phone: document.getElementById('adhesionPhone').value,
        nationality: document.getElementById('adhesionNationality').value,
        studies: document.getElementById('adhesionStudies').value,
        motivation: document.getElementById('adhesionMotivation').value,
        date: new Date().toLocaleDateString('fr-FR')
    };
    
    // Stocker la demande d'adhésion
    let adhesionRequests = JSON.parse(localStorage.getItem('assetoh-adhesion-requests')) || [];
    adhesionRequests.push(formData);
    localStorage.setItem('assetoh-adhesion-requests', JSON.stringify(adhesionRequests));
    
    // Envoyer l'email directement
    sendEmail('adhesion', formData);
    
    closeAdhesionForm();
    showNotification('Demande d\'adhésion envoyée avec succès !', 'success');
}

// Fonction pour soumettre le formulaire de contact
function submitContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value,
        date: new Date().toLocaleDateString('fr-FR')
    };
    
    // Stocker le message de contact
    let contactMessages = JSON.parse(localStorage.getItem('assetoh-contact-messages')) || [];
    contactMessages.push(formData);
    localStorage.setItem('assetoh-contact-messages', JSON.stringify(contactMessages));
    
    // Envoyer l'email directement
    sendEmail('contact', formData);
    
    closeContactForm();
    showNotification('Message envoyé avec succès !', 'success');
}

// Fonction pour ouvrir le formulaire de contenu culturel
function openCultureForm() {
    const modal = document.getElementById('cultureModal');
    modal.style.display = 'block';
}

// Fonction pour fermer le formulaire de contenu culturel
function closeCultureForm() {
    const modal = document.getElementById('cultureModal');
    modal.style.display = 'none';
    document.getElementById('cultureForm').reset();
}

// Gestion des membres
let members = {
    'bureau-executif': [],
    'conseillers': []
};

// Fonction pour charger les données depuis le serveur
async function loadDataFromServer() {
    try {
        const response = await fetch('/api/data');
        if (response.ok) {
            const data = await response.json();
            members = data.members || { 'bureau-executif': [], 'conseillers': [] };
            events = data.events || [];
            cultureContent = data.cultureContent || [];
            contactInfo = data.contactInfo || {
                address: 'Le Havre, France',
                email: 'franceassetoh228@gmail.com',
                phone: '+33 1 23 45 67 89',
                facebook: 'https://facebook.com/assetoh',
                instagram: 'https://instagram.com/assetoh'
            };
            socialLinks = data.socialLinks || {
                facebook: 'https://facebook.com/assetoh',
                instagram: 'https://instagram.com/assetoh',
                linkedin: 'https://linkedin.com/company/assetoh',
                youtube: 'https://youtube.com/@assetoh'
            };
            
            // Afficher les données
            displayMembers();
            displayEvents();
            displayCultureContent();
            updateContactDisplay();
            updateSocialLinksDisplay();
            updateStatistics();
            
            console.log('✅ Données chargées depuis le serveur');
        } else {
            console.error('❌ Erreur lors du chargement des données');
            showNotification('Erreur lors du chargement des données', 'error');
        }
    } catch (error) {
        console.error('❌ Erreur réseau:', error);
        showNotification('Erreur de connexion au serveur', 'error');
    }
}

// Fonction pour sauvegarder les membres sur le serveur
async function saveMembersToServer() {
    try {
        const response = await fetch('/api/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(members)
        });
        
        if (response.ok) {
            console.log('✅ Membres sauvegardés sur le serveur');
            return true;
        } else {
            console.error('❌ Erreur lors de la sauvegarde des membres');
            return false;
        }
    } catch (error) {
        console.error('❌ Erreur réseau lors de la sauvegarde:', error);
        return false;
    }
}

// Fonction pour ouvrir le formulaire d'ajout de membre
function openMemberForm(type) {
    const modal = document.getElementById('memberModal');
    modal.style.display = 'block';
    modal.setAttribute('data-member-type', type);
    document.getElementById('memberName').focus();
}

// Fonction pour fermer le formulaire d'ajout de membre
function closeMemberForm() {
    const modal = document.getElementById('memberModal');
    modal.style.display = 'none';
    document.getElementById('memberForm').reset();
}

// Fonction pour ajouter un membre
async function addMember(event) {
    event.preventDefault();
    
    const modal = document.getElementById('memberModal');
    const type = modal.getAttribute('data-member-type');
    
    const photoFile = document.getElementById('memberPhoto').files[0];
    let photoData = null;
    
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoData = e.target.result;
            saveMember(type, photoData);
        };
        reader.readAsDataURL(photoFile);
    } else {
        saveMember(type, null);
    }
}

// Fonction pour sauvegarder un membre
async function saveMember(type, photoData) {
    const formData = {
        id: Date.now(),
        name: document.getElementById('memberName').value,
        post: document.getElementById('memberPost').value,
        photo: photoData,
        description: document.getElementById('memberDescription').value
    };
    
    members[type].push(formData);
    
    // Sauvegarder sur le serveur
    const saved = await saveMembersToServer();
    if (saved) {
        closeMemberForm();
        displayMembers();
        recalculateStatistics(); // Mettre à jour les statistiques
        showNotification('Membre ajouté avec succès !', 'success');
    } else {
        showNotification('Erreur lors de la sauvegarde', 'error');
    }
}

// Fonction pour afficher les membres
function displayMembers() {
    // Afficher le bureau exécutif
    const bureauContainer = document.getElementById('bureau-executif');
    if (bureauContainer) {
        let html = '';
        members['bureau-executif'].forEach(member => {
            html += `
                <div class="membre-card" data-id="${member.id}" data-type="bureau-executif">
                    ${member.photo ? `<img src="${member.photo}" alt="${member.name}" class="membre-photo">` : '<div class="membre-photo-placeholder"><i class="fas fa-user"></i></div>'}
                    <div class="membre-info">
                        <h4>${member.name}</h4>
                        <p class="membre-poste">${member.post}</p>
                        ${member.description ? `<p class="membre-description">${member.description}</p>` : ''}
                    </div>
                    <button class="delete-btn admin-only" onclick="deleteMember('bureau-executif', ${member.id})" title="Supprimer ce membre">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="edit-btn admin-only" onclick="editMember('bureau-executif', ${member.id})" title="Modifier ce membre">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            `;
        });
        bureauContainer.innerHTML = html;
    }
    
    // Afficher les conseillers
    const conseillersContainer = document.getElementById('conseillers');
    if (conseillersContainer) {
        let html = '';
        members['conseillers'].forEach(member => {
            html += `
                <div class="membre-card" data-id="${member.id}" data-type="conseillers">
                    ${member.photo ? `<img src="${member.photo}" alt="${member.name}" class="membre-photo">` : '<div class="membre-photo-placeholder"><i class="fas fa-user"></i></div>'}
                    <div class="membre-info">
                        <h4>${member.name}</h4>
                        <p class="membre-poste">${member.post}</p>
                        ${member.description ? `<p class="membre-description">${member.description}</p>` : ''}
                    </div>
                    <button class="delete-btn admin-only" onclick="deleteMember('conseillers', ${member.id})" title="Supprimer ce membre">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="edit-btn admin-only" onclick="editMember('conseillers', ${member.id})" title="Modifier ce membre">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            `;
        });
        conseillersContainer.innerHTML = html;
    }
}

// Fonction pour supprimer un membre
async function deleteMember(type, id) {
    const memberName = members[type].find(member => member.id === id)?.name || 'ce membre';
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${memberName} ?\n\nCette action est irréversible.`)) {
        // Animation de suppression
        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) {
            card.style.transform = 'scale(0.8)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.3s ease';
            
            setTimeout(async () => {
                members[type] = members[type].filter(member => member.id !== id);
                const saved = await saveMembersToServer();
                if (saved) {
                    displayMembers();
                    recalculateStatistics(); // Mettre à jour les statistiques
                    showNotification(`${memberName} a été supprimé avec succès !`, 'success');
                } else {
                    showNotification('Erreur lors de la sauvegarde', 'error');
                }
            }, 300);
        } else {
            members[type] = members[type].filter(member => member.id !== id);
            const saved = await saveMembersToServer();
            if (saved) {
                displayMembers();
                showNotification(`${memberName} a été supprimé avec succès !`, 'success');
            } else {
                showNotification('Erreur lors de la sauvegarde', 'error');
            }
        }
    }
}

// Gestion des événements
let events = [];

// Fonction pour sauvegarder les événements sur le serveur
async function saveEventsToServer() {
    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(events)
        });
        
        if (response.ok) {
            console.log('✅ Événements sauvegardés sur le serveur');
            return true;
        } else {
            console.error('❌ Erreur lors de la sauvegarde des événements');
            return false;
        }
    } catch (error) {
        console.error('❌ Erreur réseau lors de la sauvegarde:', error);
        return false;
    }
}

// Fonction pour ouvrir le formulaire d'ajout d'événement
function openEventForm() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'block';
    document.getElementById('eventTitle').focus();
}

// Fonction pour fermer le formulaire d'ajout d'événement
function closeEventForm() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'none';
    document.getElementById('eventForm').reset();
}

// Fonction pour ajouter un événement
async function addEvent(event) {
    event.preventDefault();
    
    const formData = {
        id: Date.now(),
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        location: document.getElementById('eventLocation').value,
        description: document.getElementById('eventDescription').value
    };
    
    events.push(formData);
    
    // Sauvegarder sur le serveur
    const saved = await saveEventsToServer();
    if (saved) {
        closeEventForm();
        displayEvents();
        recalculateStatistics(); // Mettre à jour les statistiques
        showNotification('Événement ajouté avec succès !', 'success');
    } else {
        showNotification('Erreur lors de la sauvegarde', 'error');
    }
}

// Fonction pour afficher les événements
function displayEvents() {
    const eventsContainer = document.getElementById('evenements-container');
    if (!eventsContainer) return;
    
    if (events.length === 0) {
        eventsContainer.innerHTML = '<p class="no-events">Aucun événement programmé pour le moment.</p>';
        return;
    }
    
    let html = '';
    events.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        html += `
            <div class="event-card" data-id="${event.id}">
                <div class="event-date">
                    <span class="event-day">${eventDate.getDate()}</span>
                    <span class="event-month">${eventDate.toLocaleDateString('fr-FR', { month: 'short' })}</span>
                </div>
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <p class="event-details">
                        <i class="fas fa-calendar"></i> ${formattedDate}
                        ${event.time ? `<br><i class="fas fa-clock"></i> ${event.time}` : ''}
                        ${event.location ? `<br><i class="fas fa-map-marker-alt"></i> ${event.location}` : ''}
                    </p>
                    <p class="event-description">${event.description}</p>
                </div>
                <button class="delete-btn admin-only" onclick="deleteEvent(${event.id})" title="Supprimer cet événement">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="edit-btn admin-only" onclick="editEvent(${event.id})" title="Modifier cet événement">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        `;
    });
    
    eventsContainer.innerHTML = html;
}

// Fonction pour supprimer un événement
async function deleteEvent(id) {
    const eventTitle = events.find(event => event.id === id)?.title || 'cet événement';
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${eventTitle}" ?\n\nCette action est irréversible.`)) {
        // Animation de suppression
        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) {
            card.style.transform = 'scale(0.8)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.3s ease';
            
            setTimeout(async () => {
                events = events.filter(event => event.id !== id);
                const saved = await saveEventsToServer();
                if (saved) {
                    displayEvents();
                    recalculateStatistics(); // Mettre à jour les statistiques
                    showNotification(`"${eventTitle}" a été supprimé avec succès !`, 'success');
                } else {
                    showNotification('Erreur lors de la sauvegarde', 'error');
                }
            }, 300);
        } else {
            events = events.filter(event => event.id !== id);
            const saved = await saveEventsToServer();
            if (saved) {
                displayEvents();
                showNotification(`"${eventTitle}" a été supprimé avec succès !`, 'success');
            } else {
                showNotification('Erreur lors de la sauvegarde', 'error');
            }
        }
    }
}

// Gestion du contenu culturel
let cultureContent = [];

// Fonction pour sauvegarder le contenu culturel sur le serveur
async function saveCultureToServer() {
    try {
        const response = await fetch('/api/culture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cultureContent)
        });
        
        if (response.ok) {
            console.log('✅ Contenu culturel sauvegardé sur le serveur');
            return true;
        } else {
            console.error('❌ Erreur lors de la sauvegarde du contenu culturel');
            return false;
        }
    } catch (error) {
        console.error('❌ Erreur réseau lors de la sauvegarde:', error);
        return false;
    }
}

// Fonction pour ajouter du contenu culturel
async function addCultureContent(event) {
    event.preventDefault();
    
    const imageFile = document.getElementById('cultureImage').files[0];
    let imageData = null;
    
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageData = e.target.result;
            saveCultureContent(imageData);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveCultureContent(null);
    }
}

// Fonction pour sauvegarder le contenu culturel
async function saveCultureContent(imageData) {
    const formData = {
        id: Date.now(),
        title: document.getElementById('cultureTitle').value,
        category: document.getElementById('cultureCategory').value,
        image: imageData,
        description: document.getElementById('cultureDescription').value,
        content: document.getElementById('cultureContent').value,
        date: new Date().toLocaleDateString('fr-FR')
    };
    
    cultureContent.push(formData);
    
    // Sauvegarder sur le serveur
    const saved = await saveCultureToServer();
    if (saved) {
        closeCultureForm();
        displayCultureContent();
        showNotification('Contenu culturel ajouté avec succès !', 'success');
    } else {
        showNotification('Erreur lors de la sauvegarde', 'error');
    }
}

// Fonction pour afficher le contenu culturel
function displayCultureContent() {
    const cultureSection = document.querySelector('.culture-placeholder');
    
    if (cultureContent.length === 0) {
        cultureSection.innerHTML = `
            <div class="placeholder-content">
                <i class="fas fa-image"></i>
                <h3>Contenu en cours de préparation</h3>
                <p>Cette section sera bientôt enrichie avec des photos et des informations sur la culture togolaise.</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="culture-grid">';
    cultureContent.forEach(item => {
        html += `
            <div class="culture-card" data-id="${item.id}">
                ${item.image ? `<img src="${item.image}" alt="${item.title}" class="culture-image">` : ''}
                <div class="culture-card-content">
                    <h3>${item.title}</h3>
                    <span class="culture-category">${item.category}</span>
                    <p>${item.description}</p>
                    ${item.content ? `<div class="culture-full-content">${item.content}</div>` : ''}
                    <small>Ajouté le ${item.date}</small>
                </div>
                <button class="delete-btn admin-only" onclick="deleteCultureContent(${item.id})" title="Supprimer ce contenu">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="edit-btn admin-only" onclick="editCultureContent(${item.id})" title="Modifier ce contenu">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        `;
    });
    html += '</div>';
    
    cultureSection.innerHTML = html;
}

// Fonction pour supprimer du contenu culturel
async function deleteCultureContent(id) {
    const cultureTitle = cultureContent.find(item => item.id === id)?.title || 'ce contenu culturel';
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${cultureTitle}" ?\n\nCette action est irréversible.`)) {
        // Animation de suppression
        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) {
            card.style.transform = 'scale(0.8)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.3s ease';
            
            setTimeout(async () => {
                cultureContent = cultureContent.filter(item => item.id !== id);
                const saved = await saveCultureToServer();
                if (saved) {
                    displayCultureContent();
                    showNotification(`"${cultureTitle}" a été supprimé avec succès !`, 'success');
                } else {
                    showNotification('Erreur lors de la sauvegarde', 'error');
                }
            }, 300);
        } else {
            cultureContent = cultureContent.filter(item => item.id !== id);
            const saved = await saveCultureToServer();
            if (saved) {
                displayCultureContent();
                showNotification(`"${cultureTitle}" a été supprimé avec succès !`, 'success');
            } else {
                showNotification('Erreur lors de la sauvegarde', 'error');
            }
        }
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Page chargée, initialisation...');
    console.log('Version du script: 1.1');
    
    // Vérifier que les éléments sont présents
    const hamburgerCheck = document.querySelector('.hamburger');
    const navMenuCheck = document.querySelector('.nav-menu');
    console.log('Éléments trouvés:', { hamburger: !!hamburgerCheck, navMenu: !!navMenuCheck });
    
    // Réinitialiser le statut admin (toujours déconnecté par défaut)
    resetAdminStatus();
    
    // Vérifier le statut admin
    checkAdminStatus();
    
    // Charger les données depuis le serveur
    await loadDataFromServer();
    
    // Event listeners pour les formulaires
    const cultureForm = document.getElementById('cultureForm');
    const memberForm = document.getElementById('memberForm');
    const eventForm = document.getElementById('eventForm');
    const adhesionForm = document.getElementById('adhesionForm');
    const contactForm = document.getElementById('contactForm');
    
    if (cultureForm) {
        cultureForm.addEventListener('submit', addCultureContent);
        console.log('Event listener culture form ajouté');
    }
    
    if (memberForm) {
        memberForm.addEventListener('submit', addMember);
        console.log('Event listener member form ajouté');
    }
    
    if (eventForm) {
        eventForm.addEventListener('submit', addEvent);
        console.log('Event listener event form ajouté');
    }
    
    if (adhesionForm) {
        adhesionForm.addEventListener('submit', submitAdhesionForm);
        console.log('Event listener adhesion form ajouté');
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
        console.log('Event listener contact form ajouté');
    }
    
    // Event listener pour le formulaire d'édition des informations de contact
    const editContactForm = document.getElementById('editContactForm');
    if (editContactForm) {
        editContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveContactInfo();
        });
        console.log('Event listener edit contact form ajouté');
    }
    
    // Event listener pour le formulaire d'édition de membre
    const editMemberForm = document.getElementById('editMemberForm');
    if (editMemberForm) {
        editMemberForm.addEventListener('submit', saveMemberEdit);
        console.log('Event listener edit member form ajouté');
    }
    
    // Event listener pour le formulaire d'édition d'événement
    const editEventForm = document.getElementById('editEventForm');
    if (editEventForm) {
        editEventForm.addEventListener('submit', saveEventEdit);
        console.log('Event listener edit event form ajouté');
    }
    
    // Event listener pour le formulaire d'édition de contenu culturel
    const editCultureForm = document.getElementById('editCultureForm');
    if (editCultureForm) {
        editCultureForm.addEventListener('submit', saveCultureEdit);
        console.log('Event listener edit culture form ajouté');
    }
    
    // Event listener pour le formulaire d'édition des liens sociaux
    const editSocialForm = document.getElementById('editSocialForm');
    if (editSocialForm) {
        editSocialForm.addEventListener('submit', saveSocialLinks);
        console.log('Event listener edit social form ajouté');
    }
    
    // Event listener pour le menu hamburger mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        console.log('✅ Éléments hamburger trouvés, ajout des event listeners');
        
        // Event listener pour le clic
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('🍔 Menu hamburger cliqué - active:', navMenu.classList.contains('active'));
        });
        
        // Event listener pour le touch (mobile)
        hamburger.addEventListener('touchstart', function(e) {
            e.preventDefault();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('📱 Menu hamburger touché - active:', navMenu.classList.contains('active'));
        });
        
        // Event listener pour mousedown (pour plus de réactivité)
        hamburger.addEventListener('mousedown', function(e) {
            e.preventDefault();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('🖱️ Menu hamburger mousedown - active:', navMenu.classList.contains('active'));
        });
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                console.log('🔗 Menu fermé par clic sur lien');
            });
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                console.log('🚪 Menu fermé par clic extérieur');
            }
        });
        
        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                console.log('⌨️ Menu fermé par touche Escape');
            }
        });
        
        console.log('✅ Event listeners menu hamburger ajoutés avec succès');
    } else {
        console.error('❌ Éléments hamburger ou nav-menu non trouvés:', { 
            hamburger: !!hamburger, 
            navMenu: !!navMenu,
            hamburgerElement: hamburger,
            navMenuElement: navMenu
        });
    }
    
    // Event listeners pour la touche Entrée dans le modal admin
    const adminEmail = document.getElementById('adminEmail');
    const adminPassword = document.getElementById('adminPassword');
    
    if (adminEmail) {
        adminEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginAdmin();
            }
        });
        console.log('Event listener admin email ajouté');
    }
    
    if (adminPassword) {
        adminPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginAdmin();
            }
        });
        console.log('Event listener admin password ajouté');
    } else {
        console.error('Champ admin password non trouvé');
    }
    
    // Fermer les modals en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        const adminModal = document.getElementById('adminModal');
        const cultureModal = document.getElementById('cultureModal');
        const memberModal = document.getElementById('memberModal');
        const eventModal = document.getElementById('eventModal');
        const adhesionModal = document.getElementById('adhesionModal');
        const contactModal = document.getElementById('contactModal');
        const editContactModal = document.getElementById('editContactModal');
        const editMemberModal = document.getElementById('editMemberModal');
        const editEventModal = document.getElementById('editEventModal');
        const editCultureModal = document.getElementById('editCultureModal');
        const editSocialModal = document.getElementById('editSocialModal');
        
        if (e.target === adminModal) {
            closeAdminModal();
        }
        if (e.target === cultureModal) {
            closeCultureForm();
        }
        if (e.target === memberModal) {
            closeMemberForm();
        }
        if (e.target === eventModal) {
            closeEventForm();
        }
        if (e.target === adhesionModal) {
            closeAdhesionForm();
        }
        if (e.target === contactModal) {
            closeContactForm();
        }
        if (e.target === editContactModal) {
            closeEditContactModal();
        }
        if (e.target === editMemberModal) {
            closeEditMemberModal();
        }
        if (e.target === editEventModal) {
            closeEditEventModal();
        }
        if (e.target === editCultureModal) {
            closeEditCultureModal();
        }
        if (e.target === editSocialModal) {
            closeEditSocialModal();
        }
    });
    
    // Vérifier le chargement des images
    const footerLogo = document.querySelector('.footer-logo-image');
    if (footerLogo) {
        footerLogo.addEventListener('load', function() {
            console.log('Logo footer chargé avec succès');
        });
        
        footerLogo.addEventListener('error', function() {
            console.log('Erreur de chargement du logo footer');
            this.style.display = 'none';
            // Créer un fallback
            const fallback = document.createElement('div');
            fallback.className = 'footer-logo-fallback';
            fallback.innerHTML = '<span>A</span>';
            fallback.style.cssText = `
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: var(--gradient-togo);
                background-size: 200% 200%;
                animation: rainbow 4s ease-in-out infinite;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 1.5rem;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                border: 2px solid rgba(255, 255, 255, 0.5);
            `;
            this.parentNode.insertBefore(fallback, this);
        });
    }
    
    console.log('Initialisation terminée - Mode visiteur par défaut');
    
    // Test de la fonction toggleAdminMode
    console.log('Fonction toggleAdminMode disponible:', typeof toggleAdminMode);
});

// Fonction pour mettre à jour les statistiques
function updateStatistics() {
    // Calculer le nombre total de membres
    const totalMembers = (members['bureau-executif']?.length || 0) + (members['conseillers']?.length || 0);
    
    // Calculer le nombre d'événements
    const totalEvents = events.length;
    
    // Calculer le nombre d'années d'expérience (depuis 2020 par exemple)
    const currentYear = new Date().getFullYear();
    const startYear = 2020; // Année de création de l'association
    const yearsExperience = currentYear - startYear;
    
    // Mettre à jour les statistiques dans le DOM
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        // Membres actifs
        const oldMembers = parseInt(statNumbers[0].textContent.replace('+', '')) || 0;
        statNumbers[0].textContent = totalMembers + '+';
        if (totalMembers !== oldMembers) {
            statNumbers[0].style.animation = 'numberChange 0.5s ease-in-out';
            setTimeout(() => statNumbers[0].style.animation = '', 500);
        }
        
        // Événements annuels
        const oldEvents = parseInt(statNumbers[1].textContent.replace('+', '')) || 0;
        statNumbers[1].textContent = totalEvents + '+';
        if (totalEvents !== oldEvents) {
            statNumbers[1].style.animation = 'numberChange 0.5s ease-in-out';
            setTimeout(() => statNumbers[1].style.animation = '', 500);
        }
        
        // Années d'expérience
        statNumbers[2].textContent = yearsExperience + '+';
    }
    
    console.log(`📊 Statistiques mises à jour: ${totalMembers} membres, ${totalEvents} événements, ${yearsExperience} années`);
}

// Fonction pour recalculer les statistiques après ajout/suppression
function recalculateStatistics() {
    updateStatistics();
}

// Fonction pour calculer des statistiques avancées
function calculateAdvancedStatistics() {
    const stats = {
        totalMembers: (members['bureau-executif']?.length || 0) + (members['conseillers']?.length || 0),
        bureauExecutif: members['bureau-executif']?.length || 0,
        conseillers: members['conseillers']?.length || 0,
        totalEvents: events.length,
        eventsThisYear: events.filter(event => {
            const eventYear = new Date(event.date).getFullYear();
            return eventYear === new Date().getFullYear();
        }).length,
        cultureContent: cultureContent.length,
        adhesionRequests: JSON.parse(localStorage.getItem('assetoh-adhesion-requests'))?.length || 0,
        contactMessages: JSON.parse(localStorage.getItem('assetoh-contact-messages'))?.length || 0
    };
    
    console.log('Statistiques avancées:', stats);
    return stats;
}

// Variables pour les informations de contact
let contactInfo = {
    address: 'Le Havre, France',
    email: 'assetoh228@gmail.com',
    phone: '+33 XX XX XX XX XX',
    facebook: 'ASSETOH Le Havre',
    instagram: '@assetoh'
};

// Variables pour les liens sociaux
let socialLinks = {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: ''
};

// Fonction pour sauvegarder les informations de contact sur le serveur
async function saveContactToServer() {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactInfo)
        });
        
        if (response.ok) {
            console.log('✅ Informations de contact sauvegardées sur le serveur');
            return true;
        } else {
            console.error('❌ Erreur lors de la sauvegarde des informations de contact');
            return false;
        }
    } catch (error) {
        console.error('❌ Erreur réseau lors de la sauvegarde:', error);
        return false;
    }
}

// Fonction pour sauvegarder les liens sociaux sur le serveur
async function saveSocialToServer() {
    try {
        const response = await fetch('/api/social', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(socialLinks)
        });
        
        if (response.ok) {
            console.log('✅ Liens sociaux sauvegardés sur le serveur');
            return true;
        } else {
            console.error('❌ Erreur lors de la sauvegarde des liens sociaux');
            return false;
        }
    } catch (error) {
        console.error('❌ Erreur réseau lors de la sauvegarde:', error);
        return false;
    }
}

// Fonction pour charger les informations de contact depuis localStorage
function loadContactInfo() {
    const savedContactInfo = localStorage.getItem('assetoh-contact-info');
    if (savedContactInfo) {
        contactInfo = JSON.parse(savedContactInfo);
    }
    updateContactDisplay();
}

// Fonction pour charger les liens sociaux depuis localStorage
function loadSocialLinks() {
    const savedSocialLinks = localStorage.getItem('assetoh-social-links');
    if (savedSocialLinks) {
        socialLinks = JSON.parse(savedSocialLinks);
    }
    updateSocialLinksDisplay();
}

// Fonction pour mettre à jour l'affichage des informations de contact
function updateContactDisplay() {
    document.getElementById('contact-address-text').textContent = contactInfo.address;
    document.getElementById('contact-email-text').textContent = contactInfo.email;
    document.getElementById('contact-phone-text').textContent = contactInfo.phone;
    document.getElementById('contact-facebook-text').textContent = contactInfo.facebook;
    document.getElementById('contact-instagram-text').textContent = contactInfo.instagram;
}

// Fonction pour mettre à jour l'affichage des liens sociaux
function updateSocialLinksDisplay() {
    const facebookLink = document.getElementById('social-facebook');
    const instagramLink = document.getElementById('social-instagram');
    const linkedinLink = document.getElementById('social-linkedin');
    const youtubeLink = document.getElementById('social-youtube');
    
    // Mettre à jour les liens et leur visibilité
    if (socialLinks.facebook) {
        facebookLink.href = socialLinks.facebook;
        facebookLink.style.display = 'flex';
    } else {
        facebookLink.style.display = 'none';
    }
    
    if (socialLinks.instagram) {
        instagramLink.href = socialLinks.instagram;
        instagramLink.style.display = 'flex';
    } else {
        instagramLink.style.display = 'none';
    }
    
    if (socialLinks.linkedin) {
        linkedinLink.href = socialLinks.linkedin;
        linkedinLink.style.display = 'flex';
    } else {
        linkedinLink.style.display = 'none';
    }
    
    if (socialLinks.youtube) {
        youtubeLink.href = socialLinks.youtube;
        youtubeLink.style.display = 'flex';
    } else {
        youtubeLink.style.display = 'none';
    }
}

// Fonction pour ouvrir le modal d'édition des informations de contact
function editContactInfo(type) {
    const typeLabels = {
        'address': 'Adresse',
        'email': 'Email',
        'phone': 'Téléphone',
        'facebook': 'Facebook',
        'instagram': 'Instagram'
    };
    
    document.getElementById('editContactType').value = typeLabels[type];
    document.getElementById('editContactValue').value = contactInfo[type];
    document.getElementById('editContactValue').dataset.type = type;
    
    document.getElementById('editContactModal').style.display = 'block';
}

// Fonction pour fermer le modal d'édition des informations de contact
function closeEditContactModal() {
    document.getElementById('editContactModal').style.display = 'none';
    document.getElementById('editContactForm').reset();
}

// Fonction pour sauvegarder les modifications des informations de contact
async function saveContactInfo() {
    const type = document.getElementById('editContactValue').dataset.type;
    const newValue = document.getElementById('editContactValue').value.trim();
    
    if (newValue) {
        contactInfo[type] = newValue;
        const saved = await saveContactToServer();
        if (saved) {
            updateContactDisplay();
            closeEditContactModal();
            showNotification('Information de contact mise à jour avec succès !', 'success');
        } else {
            showNotification('Erreur lors de la sauvegarde', 'error');
        }
    } else {
        showNotification('Veuillez saisir une valeur valide.', 'error');
    }
}

// Fonction pour ouvrir le modal d'édition des liens sociaux
function editSocialLinks() {
    document.getElementById('editSocialFacebook').value = socialLinks.facebook;
    document.getElementById('editSocialInstagram').value = socialLinks.instagram;
    document.getElementById('editSocialLinkedin').value = socialLinks.linkedin;
    document.getElementById('editSocialYoutube').value = socialLinks.youtube;
    
    document.getElementById('editSocialModal').style.display = 'block';
}

// Fonction pour fermer le modal d'édition des liens sociaux
function closeEditSocialModal() {
    document.getElementById('editSocialModal').style.display = 'none';
    document.getElementById('editSocialForm').reset();
}

// Fonction pour sauvegarder les modifications des liens sociaux
async function saveSocialLinks(event) {
    event.preventDefault();
    
    socialLinks.facebook = document.getElementById('editSocialFacebook').value.trim();
    socialLinks.instagram = document.getElementById('editSocialInstagram').value.trim();
    socialLinks.linkedin = document.getElementById('editSocialLinkedin').value.trim();
    socialLinks.youtube = document.getElementById('editSocialYoutube').value.trim();
    
    const saved = await saveSocialToServer();
    if (saved) {
        updateSocialLinksDisplay();
        closeEditSocialModal();
        showNotification('Liens sociaux mis à jour avec succès !', 'success');
    } else {
        showNotification('Erreur lors de la sauvegarde', 'error');
    }
}

// Variables pour l'édition
let editingMemberId = null;
let editingEventId = null;
let editingCultureId = null;

// Fonction pour éditer un membre
function editMember(type, id) {
    const member = members[type].find(m => m.id === id);
    if (!member) return;
    
    editingMemberId = { type, id };
    
    document.getElementById('editMemberName').value = member.name;
    document.getElementById('editMemberPoste').value = member.post;
    document.getElementById('editMemberSection').value = type;
    document.getElementById('editMemberDescription').value = member.description || '';
    
    document.getElementById('editMemberModal').style.display = 'block';
}

// Fonction pour fermer le modal d'édition de membre
function closeEditMemberModal() {
    document.getElementById('editMemberModal').style.display = 'none';
    document.getElementById('editMemberForm').reset();
    editingMemberId = null;
}

// Fonction pour sauvegarder les modifications d'un membre
async function saveMemberEdit(event) {
    event.preventDefault();
    
    if (!editingMemberId) return;
    
    const { type, id } = editingMemberId;
    const memberIndex = members[type].findIndex(m => m.id === id);
    
    if (memberIndex === -1) return;
    
    const member = members[type][memberIndex];
    const newType = document.getElementById('editMemberSection').value;
    
    // Récupérer la nouvelle photo si fournie
    const photoFile = document.getElementById('editMemberPhoto').files[0];
    let newPhoto = member.photo;
    
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newPhoto = e.target.result;
            updateMemberData(member, newType, newPhoto);
        };
        reader.readAsDataURL(photoFile);
    } else {
        updateMemberData(member, newType, newPhoto);
    }
}

// Fonction pour mettre à jour les données du membre
function updateMemberData(member, newType, newPhoto) {
    const updatedMember = {
        ...member,
        name: document.getElementById('editMemberName').value,
        post: document.getElementById('editMemberPoste').value,
        description: document.getElementById('editMemberDescription').value,
        photo: newPhoto
    };
    
    // Supprimer l'ancien membre
    const { type, id } = editingMemberId;
    members[type] = members[type].filter(m => m.id !== id);
    
    // Ajouter le membre mis à jour dans la nouvelle section si nécessaire
    if (newType !== type) {
        if (!members[newType]) members[newType] = [];
        members[newType].push(updatedMember);
    } else {
        members[type].push(updatedMember);
    }
    
    // Sauvegarder sur le serveur
    const saved = await saveMembersToServer();
    if (saved) {
        displayMembers();
        recalculateStatistics();
        closeEditMemberModal();
        showNotification('Membre modifié avec succès !', 'success');
    } else {
        showNotification('Erreur lors de la sauvegarde', 'error');
    }
}

// Fonction pour éditer un événement
function editEvent(id) {
    const event = events.find(e => e.id === id);
    if (!event) return;
    
    editingEventId = id;
    
    document.getElementById('editEventTitle').value = event.title;
    document.getElementById('editEventDate').value = event.date;
    document.getElementById('editEventTime').value = event.time || '';
    document.getElementById('editEventLocation').value = event.location || '';
    document.getElementById('editEventDescription').value = event.description;
    
    document.getElementById('editEventModal').style.display = 'block';
}

// Fonction pour fermer le modal d'édition d'événement
function closeEditEventModal() {
    document.getElementById('editEventModal').style.display = 'none';
    document.getElementById('editEventForm').reset();
    editingEventId = null;
}

// Fonction pour sauvegarder les modifications d'un événement
async function saveEventEdit(event) {
    event.preventDefault();
    
    if (!editingEventId) return;
    
    const eventIndex = events.findIndex(e => e.id === editingEventId);
    if (eventIndex === -1) return;
    
    events[eventIndex] = {
        ...events[eventIndex],
        title: document.getElementById('editEventTitle').value,
        date: document.getElementById('editEventDate').value,
        time: document.getElementById('editEventTime').value,
        location: document.getElementById('editEventLocation').value,
        description: document.getElementById('editEventDescription').value
    };
    
    const saved = await saveEventsToServer();
    if (saved) {
        displayEvents();
        recalculateStatistics();
        closeEditEventModal();
        showNotification('Événement modifié avec succès !', 'success');
    } else {
        showNotification('Erreur lors de la sauvegarde', 'error');
    }
}

// Fonction pour éditer un contenu culturel
function editCultureContent(id) {
    const item = cultureContent.find(c => c.id === id);
    if (!item) return;
    
    editingCultureId = id;
    
    document.getElementById('editCultureTitle').value = item.title;
    document.getElementById('editCultureCategory').value = item.category;
    document.getElementById('editCultureDescription').value = item.description;
    document.getElementById('editCultureContent').value = item.content || '';
    
    document.getElementById('editCultureModal').style.display = 'block';
}

// Fonction pour fermer le modal d'édition de contenu culturel
function closeEditCultureModal() {
    document.getElementById('editCultureModal').style.display = 'none';
    document.getElementById('editCultureForm').reset();
    editingCultureId = null;
}

// Fonction pour sauvegarder les modifications d'un contenu culturel
async function saveCultureEdit(event) {
    event.preventDefault();
    
    if (!editingCultureId) return;
    
    const itemIndex = cultureContent.findIndex(c => c.id === editingCultureId);
    if (itemIndex === -1) return;
    
    // Récupérer la nouvelle image si fournie
    const imageFile = document.getElementById('editCultureImage').files[0];
    let newImage = cultureContent[itemIndex].image;
    
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newImage = e.target.result;
            updateCultureData(itemIndex, newImage);
        };
        reader.readAsDataURL(imageFile);
    } else {
        updateCultureData(itemIndex, newImage);
    }
}

// Fonction pour envoyer des emails directement
function sendEmail(formType, formData) {
    // Configuration EmailJS
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
    
    const config = emailConfig[formType];
    if (!config) return;
    
    // Préparer les données pour EmailJS
    const templateParams = {
        to_email: config.toEmail,
        subject: config.subject,
        ...formData
    };
    
    // Envoyer l'email via EmailJS
    emailjs.send('service_s0vk6ro', config.templateId, templateParams)
        .then(function(response) {
            console.log('Email envoyé avec succès:', response);
            showNotification('Email envoyé avec succès !', 'success');
        }, function(error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            showNotification('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.', 'error');
        });
}



// Fonction pour mettre à jour les données du contenu culturel
async function updateCultureData(itemIndex, newImage) {
    cultureContent[itemIndex] = {
        ...cultureContent[itemIndex],
        title: document.getElementById('editCultureTitle').value,
        category: document.getElementById('editCultureCategory').value,
        description: document.getElementById('editCultureDescription').value,
        content: document.getElementById('editCultureContent').value,
        image: newImage
    };
    
    const saved = await saveCultureToServer();
    if (saved) {
        displayCultureContent();
        closeEditCultureModal();
        showNotification('Contenu culturel modifié avec succès !', 'success');
    } else {
        showNotification('Erreur lors de la sauvegarde', 'error');
    }
}
