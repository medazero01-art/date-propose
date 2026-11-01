# 💖 Site d'Invitation en Date Romantique ("Dis Oui !")

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-musique%20g%C3%A9n%C3%A9r%C3%A9e-FF4F8B)

Un site web interactif, poétique et romantique conçu pour faire une demande de date irrésistible.

**Démo en ligne :** [date-propose.vercel.app](https://date-propose.vercel.app)

![Page d'invitation](docs/screenshots/accueil.jpg)

## ✨ Fonctionnalités

- **Palette Féérique Rose & Rose Pâle** : Tons rose poudré, dégradés pastel, reflets lumineux et effets de verre dépoli (*glassmorphism*).
- **Bouton "Non" Fuyant & Intelligent** : Dès que la souris s'approche ou que l'on clique dessus, le bouton s'échappe avec des animations fluides et des messages taquins.
- **Bouton "Oui" Magnétique** : Grossit et brille de plus en plus à chaque tentative sur le bouton "Non".
- **Célébration Magique** : Pluie de confettis et cœurs, billet de rendez-vous officiel VIP, checklist de promesses et lien WhatsApp pré-rempli pour confirmer le date.
- **Ambiance Musique Douce** : Synthétiseur de mélodie romantique lofi relaxante intégré (Web Audio API).
- **Particules de Cœurs Flottantes** : Cœurs animés générés en temps réel sur canvas.

## 🛠️ Technique

Aucune dépendance : HTML, CSS et JavaScript sans framework.

- Cœurs flottants dessinés en temps réel sur un `<canvas>`
- Mélodie synthétisée avec la Web Audio API, sans fichier audio
- Bouton « Non » qui calcule une nouvelle position à l'approche du curseur, en restant dans l'écran

## 🚀 Comment l'ouvrir

Il suffit de double-cliquer sur le fichier `index.html` ou de l'ouvrir dans n'importe quel navigateur web (Chrome, Safari, Firefox, Edge, smartphone ou ordinateur).

## 💌 Personnalisation facile

Dans `index.html` :
- **Son prénom / surnom** : Vous pouvez modifier le titre `<h1>` pour ajouter son prénom (ex: *« Léa, veux-tu être mon Date ? »*).
- **Le programme du Date** : Modifiez les éléments de la liste dans le `ticket-details` ou la `date-checklist`.
- **Le message WhatsApp** : Modifiez la variable `loveMessage` dans `script.js` pour personnaliser le message automatique envoyé.

## 👤 Auteur

**Ayoub Touat** · [@medazero01-art](https://github.com/medazero01-art)
