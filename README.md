# RCyber Freelancer — Portfolio

Portfolio professionnel de **Maminirina Rolland Andrianavalona** : développement logiciel (Python, Django, Flutter), BIM / CAO et gestion de patrimoine immobilier, basé à Antananarivo, Madagascar.

Site statique, multipage et bilingue (français / anglais), hébergé avec GitHub Pages.

**Site en ligne :** <https://rollandmami.github.io/>

## Pages

| Page | Contenu |
|---|---|
| `index.html` | Accueil et présentation |
| `services.html` | Services proposés |
| `projects.html` | Projets avec captures d'écran agrandissables : R-CYBER Patrimoine, Tsitsi Store, RCyber IFC Viewer, Épicerie Tsiory, Push_swap, FLY-ING, modélisation 3D Blender et plans 2D |
| `experience.html` | Parcours professionnel et profil |
| `skills.html` | Formation (École 42, IST-Tana) et compétences classées par thématique, avec barres de progression animées |
| `contact.html` | Formulaire de contact |

## Fonctionnalités

- Bilingue FR / EN, avec bascule instantanée et mémorisation du choix.
- Design responsive avec menu mobile.
- Navigation de page en page au défilement, à la molette, au tactile et au clavier.
- Galerie de captures avec visionneuse plein écran (lightbox) et légendes bilingues.
- Compétences regroupées par thématique (développement, BTP & BIM, outils) avec barres de progression animées.
- Formulaire de contact via [Web3Forms](https://web3forms.com/), sans serveur dédié.
- Métadonnées SEO et Open Graph sur chaque page.
- Aucune dépendance de build : HTML, CSS et JavaScript natifs.

## Structure du dépôt

```
.
├── index.html
├── services.html
├── projects.html
├── experience.html
├── skills.html
├── contact.html
├── styles.css        # identité visuelle et responsive
├── script.js         # menu, langue, navigation entre pages, lightbox, formulaire
└── assets/
    ├── logo_rolland.ico
    ├── photo-profil.png
    ├── logo-ist.png, logo-gpt.png, logo-perplexity.png
    └── projects/     # captures, rendus 3D et dossier de plans PDF
```

## Technologies

- HTML5, CSS3 (variables, grid, flexbox) et JavaScript (ES5, sans framework)
- Polices : DM Sans et Space Grotesk (Google Fonts)
- Icônes : SVG intégrés et [Font Awesome](https://fontawesome.com/) 6 (page Parcours)

## Exécuter en local

Aucune installation n'est nécessaire. Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur local :

```bash
python3 -m http.server 8000
```

Le site est alors accessible sur <http://localhost:8000>.

## Publication GitHub Pages

1. Envoyer les fichiers à la racine du dépôt `RollandMami.github.io`, sur la branche `main`.
2. Dans GitHub : **Settings → Pages**.
3. Sous **Build and deployment**, choisir **Deploy from a branch**.
4. Sélectionner `main` et `/ (root)`, puis enregistrer.
5. Le site est publié sur `https://rollandmami.github.io/` après quelques minutes.

## Contact

- E-mail : andrianavalonarolland@gmail.com
- GitHub : [github.com/RollandMami](https://github.com/RollandMami)
