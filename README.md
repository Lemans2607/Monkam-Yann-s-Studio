Voici un modèle de fichier `README.md` complet pour l'application **Yann's NOTE**, basé sur les spécifications techniques et fonctionnelles contenues dans les sources.

***

# 🦁 Yann's NOTE - Hub de Clarté IA

**Yann's NOTE** est une plateforme **SaaS** (Software as a Service) conçue spécifiquement pour le marché camerounais. Sa mission est de « transformer le chaos informationnel en clarté absolue » grâce à l'intelligence artificielle, en offrant des outils d'analyse et de synthèse performants pour les leaders de demain.

## 🎯 Vue d'ensemble

L'application s'adresse principalement aux étudiants et aux entrepreneurs (PME) en proposant des services optimisés pour les contraintes locales, notamment la consommation de données mobiles (concept **"Zéro Data"**).

## ✨ Fonctionnalités Clés

### 📚 Espace Étudiants
*   **Podcast Express :** Transformation de documents en audio MP3 de 10 minutes (format ultra-léger).
*   **Assistant Mémoire :** Génération automatique de fiches de révision intelligentes et de flashcards.
*   **Résumé YouTube Zéro Data :** Extraction de l'essentiel des vidéos sans consommer de data internet.

### 💼 Espace PME & Leaders
*   **Décodeur DAO :** Analyse stratégique des dossiers d'appel d'offres avec citations des sources (code OHADA, etc.).
*   **Pitch Deck 24h :** Création de présentations professionnelles percutantes en un jour.
*   **Audit de Marque :** Analyse de visibilité et recommandations de positionnement par IA.

### 🧠 Cerveau Numérique IA
*   Interface de chat interactive alimentée par **Google Gemini Pro**.
*   Intègre le **grounding** (recherche Google en temps réel) pour des réponses contextuelles et vérifiables avec citations.

### 👨‍💼 Dashboard Admin
*   Gestion complète du contenu (CRUD : Ajout, modification, suppression).
*   Suivi des statistiques d'activité en temps réel.

## 🎓 Technologies Utilisées

*   **Backend :** Python 3.14 avec le framework Flask 3.0+.
*   **Base de données :** SQLite avec Flask-SQLAlchemy pour la persistance des données.
*   **IA :** API Google Gemini Pro.
*   **Frontend :** Templates Jinja2, CSS personnalisé (style **Glassmorphism**) et JavaScript Vanilla.
*   **Déploiement :** Microsoft Azure App Service (PaaS).

## 🚀 Installation et Lancement

### 📋 Prérequis
*   Python 3.8+ et pip.
*   Une connexion internet pour l'installation des dépendances.

### 🔧 Configuration
1.  **Clé API Gemini :** Obtenez une clé gratuite sur [Google AI Studio](https://makersuite.google.com/app/apikey).
2.  **Fichier .env :** Créez un fichier `.env` à la racine et ajoutez votre clé :
    ```env
    GEMINI_API_KEY=votre_cle_ici
    SECRET_KEY=votre_cle_secrete_aleatoire
    ```
3.  **Dépendances :**
    ```bash
    pip install -r requirements.txt
    ```

### 🎮 Démarrage
Lancez l'application avec la commande :
```bash
python app.py
```
L'interface sera accessible sur `http://localhost:5000`.

## 📁 Structure du Projet
```text
yanns-note/
├── app.py              # Application principale Flask
├── .env                # Configuration des secrets
├── requirements.txt    # Liste des dépendances
├── yanns_note.db       # Base de données SQLite (auto-générée)
├── templates/          # Pages HTML (Jinja2)
└── static/             # Assets (CSS Glassmorphism, JS)
```

## 🌐 Déploiement Cloud (PaaS)
L'application est configurée pour un déploiement continu via **GitHub Actions** sur **Microsoft Azure**.
*   **Région :** Canada Central.
*   **Plan :** Basic B1 (Linux).
*   **URL Azure :** `https://yann-flask-azure-haheeeg4gnehbsdt.canadacentral-01.azurewebsites.net/`.

## 🎨 Palette de Couleurs (Le Lion de la Tech)
*   **Yann Blue :** `#001F3F` (Bleu marine).
*   **Yann Gold :** `#D4AF37` (Or/Doré).
*   **Yann Steel :** `#71797E` (Gris acier).

***
**Fait avec ❤️ au Cameroun par Yann Monkam**
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1E-dmAfciXjgzhs9wFNEzwbfoBqU7pcLo

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
