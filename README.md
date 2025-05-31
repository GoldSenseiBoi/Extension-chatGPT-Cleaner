# CleanerChatGPT

CleanerChatGPT est une extension Chrome qui vous permet de sélectionner et de supprimer en masse vos conversations ChatGPT directement depuis l'interface. Elle utilise la méthode de simulation d'actions DOM pour interagir avec la page et supprimer les conversations de manière fluide et efficace.

---

## 🗂️ Structure du projet

```
CleanerChatGPT/
│
├── background.js          # Capture le token d'authentification et le stocke localement
├── popup.html             # Interface utilisateur de la popup
├── popup.js               # Logique de la popup (chargement des conversations, sélection, suppression)
├── help.html              # Page d'aide intégrée
├── style.css              # Styles CSS pour la popup
│
├── scripts/
│   └── api.js             # Fonctions pour interagir avec l'API (getConversations, deleteConversation)
│
├── icons/
│   ├── icon128.png        # Icône principale
│   └── icon128 - Copie.png# (copie de secours ou alternative)
│
└── manifest.json          # Configuration de l'extension (permissions, background, popup)
```

---

## 🚀 Fonctionnalités principales

✅ Capture automatique du token Bearer via les requêtes HTTP (grâce à `background.js`).
✅ Interface conviviale pour lister toutes les conversations (via `popup.js`).
✅ Sélection en masse et suppression des conversations sélectionnées.
✅ Sauvegarde et suppression manuelles du token pour plus de contrôle.
✅ Dark mode simple grâce au CSS (fond noir, texte blanc).
✅ Utilisation exclusive du DOM et de la méthode `PATCH` pour masquer les conversations côté backend.

---

## ⚙️ Installation

1. Clonez ou téléchargez ce projet.
2. Décompressez-le dans un dossier local.
3. Ouvrez Chrome et accédez à **Extensions** (`chrome://extensions`).
4. Activez le **Mode développeur**.
5. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier **CleanerChatGPT**.

---

## 🛠️ Utilisation

* Cliquez sur l’icône de l’extension.
* Si nécessaire, ajoutez votre token manuellement via le champ prévu.
* Cliquez sur **Sélectionner tout** ou cochez les conversations à supprimer.
* Cliquez sur **Supprimer les conversations** et confirmez.
* Profitez d’un ChatGPT plus propre ! 😎

---

## 📝 Détails techniques

### background.js

* Intercepte les requêtes HTTP à `chatgpt.com/backend-api/*`.
* Récupère le token Bearer et le sauvegarde dans `chrome.storage.local`.

### popup.js

* Récupère les conversations via `api.js` et les affiche sous forme de liste avec des cases à cocher.
* Permet de sauvegarder/effacer le token manuellement.
* Implémente la logique de suppression en masse.

### api.js

* Fournit `getConversations()` pour lister les conversations.
* Fournit `deleteConversation()` pour masquer les conversations via un appel PATCH à l’API officielle.

### manifest.json

* Utilise `manifest_version: 3`.
* Définit les permissions nécessaires (`webRequest`, `storage`, etc.).
* Configure le script d’arrière-plan (`background.js`).

---

## 💡 Améliorations possibles

* Ajouter un mode clair/sombre dynamique.
* Intégrer une option pour filtrer les conversations par titre ou date.
* Supporter la pagination côté API (déjà partiellement pris en charge avec `offset`).

---

## 🤝 Contribuer

* Forkez le projet.
* Créez une nouvelle branche : `git checkout -b feature/ma-nouvelle-fonctionnalité`.
* Commitez vos changements : `git commit -m 'Ajoute ma fonctionnalité'`.
* Poussez vos modifications : `git push origin feature/ma-nouvelle-fonctionnalité`.
* Ouvrez une Pull Request.

---

## 📄 Licence

Ce projet est publié sous licence MIT. Voir [LICENSE](LICENSE) pour plus d’informations.
