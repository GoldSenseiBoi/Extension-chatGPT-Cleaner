# CleanerChatGPT

CleanerChatGPT est une extension Chrome qui améliore l'expérience utilisateur sur ChatGPT en masquant les éléments visuels superflus et en rendant l'interface plus épurée et agréable.

## 💤 Fonctionnalités

* Supprime ou masque les éléments inutiles de l'interface ChatGPT.
* Améliore la lisibilité avec une feuille de style personnalisée.
* Interface popup simple pour activer/désactiver l'extension.
* Icônes intégrées pour une meilleure présentation dans le navigateur.

## 📁 Structure du projet

```
CleanerChatGPT/
├── content.js             # Script injecté dans les pages ChatGPT
├── popup.html             # Interface utilisateur de l'extension
├── popup.js               # Logique JS de la popup
├── style.css              # Styles appliqués à l'interface
├── manifest.json          # Fichier de configuration de l'extension Chrome
└── icons/
    └── icon128.png        # Icône principale
```

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
