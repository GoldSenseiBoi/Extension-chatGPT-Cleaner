# CleanerChatGPT

CleanerChatGPT est une extension Chrome qui améliore l'expérience utilisateur sur ChatGPT en masquant les éléments visuels superflus et en rendant l'interface plus épurée et agréable.

## 💤 Fonctionnalités

* Supprime ou masque les éléments inutiles de l'interface ChatGPT.
* Améliore la lisibilité avec une feuille de style personnalisée.
* Interface popup simple pour activer/désactiver l'extension.
* Icônes intégrées pour une meilleure présentation dans le navigateur.

## 📁 Structure du projet

CleanerChatGPT/
├── scripts/
│   ├── api.js               ← 📡 fonctions pour interagir avec l’API OpenAI
│   └── background.js        ← ⚙️ (optionnel) gestion des requêtes en arrière-plan
├── popup/
│   ├── popup.html           ← 💬 interface utilisateur
│   └── popup.js             ← 🧠 logique de la popup, utilise `api.js`
├── styles/
│   └── style.css            ← 🎨 style global
├── icons/
│   └── icon128.png          ← 🖼️ icône propre
├── manifest.json            ← 📜 manifeste mis à jour


## ⚙️ Installation manuelle

1. Télécharger le dépôt ou le fichier `.zip`, puis l'extraire.
2. Ouvrir Chrome et aller dans `chrome://extensions/`.
3. Activer le **Mode développeur** en haut à droite.
4. Cliquer sur **"Charger l'extension non empaquetée"**.
5. Sélectionner le dossier `CleanerChatGPT`.

## 📌 Permissions utilisées

* `activeTab` : pour interagir avec la page active.
* `scripting` : pour injecter les scripts de nettoyage.
* `storage` : pour sauvegarder les préférences de l'utilisateur.

## 📄 Manifest V3

Ce projet utilise le format [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/) pour une meilleure sécurité et performance.

## 🛠️ Personnalisation

Tu peux modifier :

* `style.css` pour adapter le design.
* `content.js` pour ajouter/supprimer des éléments de la page.
* `popup.html` pour enrichir l'interface utilisateur.

## 📬 Contribuer

Les contributions sont les bienvenues ! N'hésite pas à forker le projet, créer des issues ou proposer des pull requests.

---

**Auteur** : \[GoldSenseiBoi]
**Licence** : MIT
