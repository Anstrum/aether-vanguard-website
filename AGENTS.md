# AGENTS.md — Directives & Documentation du Projet "Aether Vanguard"

> [!IMPORTANT]
> ### 🛑 DIRECTIVE OBLIGATOIRE POUR TOUT NOUVEL AGENT (DÈS LA PREMIÈRE RÉPONSE)
> Lors de sa toute première intervention ou au démarrage d'une session, **chaque agent DOIT OBLIGATOIREMENT consulter et lire le contenu du site de brainstorming (`/brainstorm`)**, en particulier la grande page Manifeste de Conception (`brainstorm/index.html` ou `brainstorm/manifesto.html`) ainsi que la base de données de référence (`brainstorm/data.json`).
> Cette lecture est indispensable pour saisir immédiatement le contexte complet, la vision créative, le scope rigoureux du jeu (12 mercenaires, Gambits continus, Éther commun, donjons 100% survie, etc.) et ne jamais dériver du cap fixé.

---

## 1. Vue d'Ensemble du Projet
* **Titre :** Aether Vanguard
* **Genre :** RPG tactique sombre de gestion de mercenaires en vue top-down dézoomée avec rendu voxel stylisé.
* **Ambiance :** Dark Medieval Fantasy & géométrie voxel technique (dalles de pierre, fer forgé, acier froid, enluminures et lueurs arcaniques).
* **Piliers Fondamentaux de Gameplay :**
  - **Gestion de Troupes de 12 Mercenaires :** Organisation en compagnies, création de plusieurs troupes autonomes pour raider plusieurs donjons en simultané (temps réel avec possibilité de switcher de caméra à volonté) et raids coopératifs multi-troupes.
  - **Grille de Formation Tactique 3x4 (12 slots) :** 3 rangées de 4 cases (Frontline / Midline / Backline). Placement stratégique préparatoire des unités avant l'engagement.
  - **Combats Automatisés Programmables (Gambits) :** Les mercenaires exécutent des cycles de décision en boucle continue et sans délai. Chaque règle est évaluée en cascade selon la priorité définie par le joueur (*« Si [Condition] alors [Action] »*), chaque action ayant son temps d'incantation et d'animation propre.
  - **Réserve d'Éther Commune & Affinité :** Le réservoir maximal d'Éther de la troupe est la somme des statistiques d'*Affinité d'Éther* des 12 mercenaires. L'Éther démarre au maximum au début du combat, se recharge passivement à 1% par seconde et via des compétences actives de canalisation (rôle clé d'unités génératrices).

---

## 2. Système de Progression, Économie & Donjons

### Structure de Progression & Graphe de Prérequis Croisés (36 Classes)
* **Classes de Départ (4 Bases — Niveau 1) :**
  - **Guerrier** (Frontline / Provocation)
  - **Archer** (Balistique / Tir à distance)
  - **Rogue** (Furtivité / Dagues & DoT)
  - **Acolyte** (Ordre Sacré / Soins d'urgence)
* **Spécialisations Directes (8 Classes — 1 Prérequis de Classe, Niveau 25 requis) :**
  - Évolutions canoniques : Sentinelle, Gardien, Arbalétrier, Chasseur, Assassin, Duelliste, Mage Élémentaire, Prêtre.
* **Classes Avancées à Prérequis Croisés (24 Classes — 2 Prérequis Conjoints, Niveau 30 à 50) :**
  - **Paladin** (*Guerrier 35 + Prêtre 35*), **Nécromancien** (*Mage Noir 45 + Invocateur 45*), **Chevalier Noir** (*Guerrier 35 + Sorcier Maudit 35*), **Archimage** (*Thaumaturge 45 + Mage Temporel 45*), **Bretteur** (*Rogue 30 + Duelliste 30*), **Rôdeur** (*Archer 30 + Druide 30*), **Danseur de Guerre** (*Barde 30 + Duelliste 30*), **Invocateur** (*Mage Élémentaire 35 + Druide 35*), **Mage de Guerre** (*Sentinelle 35 + Thaumaturge 35*), **Sanguinaire** (*Assassin 35 + Chevalier Noir 35*), **Champion Suprême** (*Paladin 45 + Sentinelle 45*), etc.
  - *Note conceptuelle :* Ces classes (dont le Paladin ou le Nécromancien) sont des classes complètes à part entière, avec leurs 5 sorts et leur rôle dédié, et non une hybridation.

### Système Fondamental des Mercenaires, Armes & Gambits
* **Recrutement & Niveaux :** Achat de mercenaires Niv. 1 sur les 4 classes de base. Plafond au **Niveau 100** par classe avec conservation permanente de toutes les statistiques et sorts débloqués.
* **Déblocage de Classes :** Le premier déblocage d'une nouvelle classe coûte de l'or (dès que ses prérequis croisés sont satisfaits). Une fois débloquée, la bascule de classe pour le mercenaire est **totalement gratuite et libre au QG**.
* **Condition Matérielle d'Exécution :** Un mercenaire ne peut exécuter un sort dans ses Gambits **qu'à la condition stricte d'équiper l'arme requise par ce sort** (ex: pavois pour un bash, dagues pour une lacération, sceptre/bâton pour une prière).
* **RÈGLE MAJEURE D'HYBRIDATION TOTALE (JALON 36/36) :**
  - **L'Hybridation libre est strictement verrouillée tant que l'ensemble des 36 classes du jeu n'a pas été débloqué.**
  - Tant que la 36ème classe n'est pas acquise, les sorts restent soumis à la compatibilité de classe et d'arme requise.
  - **Dès que les 36 classes sont débloquées**, la barrière tombe définitivement : le mercenaire accède à l'**Hybridation Totale** (il peut équiper n'importe quelle arme de son choix et lui associer tous les sorts correspondant à ses armes équipées sans restriction de classe).
* **Slots de Gambits (3 ➔ 10) :** Un mercenaire commence avec **3 slots de règles conditionnelles**. Il peut débloquer jusqu'à 10 slots via des sessions d'entraînement payantes au QG.
* **Catalogue de 42 Conditions de Gambits :** Déclencheurs classés en 6 familles (`Alliés`, `Ennemis`, `Éther`, `Spatial`, `Cooldowns`, `Matériel`) pour programmer finement l'IA autonome de l'escouade.
* **Sorts Générateurs d'Éther :** Chaque spécialisation dispose de moyens ou de sorts dédiés pour canaliser ou restaurer l'Éther de la réserve commune (ex: *Canalisation Éthérée*, *Convergence*, *Offrande Sanglante*, *Hymne d'Éther*, *Totem de Restitution*).
* **Règles Figées en Raid :** Les Gambits ne peuvent pas être modifiés pendant un donjon. La stratégie se prépare en amont au quartier général.

---

### Palier 1 : Classes de Base

#### 1. Guerrier
* **Rôle :** Combattant de première ligne axé sur le contrôle de foule, la charge et la provocation.
* **Sorts canoniques :**
  - **Attaque de base :** Frappe physique en mêlée standard sans coût de ressource.
  - **Taunt :** Force les ennemis ciblés ou proches à attaquer le Guerrier pendant une durée définie.
  - **Cri de guerre :** Augmente l'attaque et le moral des alliés adjacents tout en déstabilisant brièvement les ennemis.
  - **Charge :** Ruée en ligne droite vers une cible, comblant la distance avec étourdissement léger à l'impact.
  - **Frappe lourde :** Attaque puissante à préparation lente, brisant une partie de l'armure ennemie.

#### 2. Archer
* **Rôle :** Spécialiste du tir à distance, mobilité vive, tirs précis et volées de projectiles.
* **Sorts canoniques :**
  - **Attaque de base :** Tir d'une flèche standard à moyenne portée.
  - **Tir ciblé :** Visée minutieuse à longue portée offrant dégâts accrus et chances de coup critique au détriment de la mobilité.
  - **Volée de flèches :** Pluie de projectiles ciblant une zone circulaire au sol infligeant des dégâts physiques.
  - **Dash arrière :** Saut de repli rapide pour se dégager du corps-à-corps et regagner une distance de sécurité.
  - **Tir de suppression :** Flèche lourde qui ralentit la cadence et les déplacements adverses.

#### 3. Rogue
* **Rôle :** Discrétion, frappes sournoises, étourdissements et lacérations hémorragiques.
* **Sorts canoniques :**
  - **Attaque de base :** Coup rapide de dague au corps-à-corps.
  - **Furtivité :** Rentre dans l'ombre, devenant indétectable jusqu'à la prochaine action offensive.
  - **Backstab :** Attaque dévastatrice portée dans le dos, aux dégâts critiques massifs (optimale en sortie de furtivité).
  - **Stun :** Frappe neutralisante sur un point vital, immobilisant totalement la cible brièvement.
  - **Lacération :** Entaille vicieuse appliquant un saignement continu sur plusieurs tours.

#### 4. Acolyte
* **Rôle :** Soutien divin, soins d'urgence au contact et à distance, purification des altérations.
* **Sorts canoniques :**
  - **Attaque de base :** Décharge magique légère à courte portée sans coût d'éther.
  - **Toucher guérisseur (soin corps-à-corps) :** Soin direct d'urgence appliqué sur un allié adjacent au contact.
  - **Prière curative (soin à distance) :** Soin projeté ciblant un allié éloigné pour stabiliser ses points de vie.
  - **Purification :** Dissipe un malus ou une altération d'état sur l'allié ciblé.

---

### Palier 2 : Spécialisations Avancées

#### 5. Sentinelle *(Évolution du Guerrier)*
* **Rôle :** Spécialiste défensif au pavois, absorption partielle de dégâts, renforcement d'armure, déséquilibre au bouclier.
* **Sorts canoniques :**
  - **Attaque de base :** Coup d'estoc ou de masse défensif derrière le bouclier tout en maintenant la garde.
  - **Blocage partiel :** Posture active réduisant considérablement les dégâts frontaux contre de l'endurance.
  - **Buff de défense :** Renforce l'armure physique et la résistance magique du groupe proche pendant plusieurs tours.
  - **Bash au bouclier :** Choc lourd avec le pavois, repoussant la cible et provoquant un déséquilibre.

#### 6. Arbalétrier *(Évolution de l'Archer)*
* **Rôle :** Balistique lourde, tirs préparés via recharges tactiques (transperçants, explosifs, neutralisants).
* **Sorts canoniques :**
  - **Attaque de base :** Tir tendu d'un carreau d'arbalète infligeant de bons dégâts physiques à moyenne portée.
  - **Recharge tactique :** Mécanique de réarmement préparant un type de carreau spécifique.
  - **Carreau transperçant :** Projectile perforant alignant plusieurs ennemis sur une ligne droite avec dégâts réduits à chaque cible.
  - **Carreau explosif :** Carreau piégé causant de lourds dégâts de souffle et de feu en zone d'impact.
  - **Carreau neutralisant :** Tir visant les membres pour clouer et immobiliser la cible au sol.

#### 7. Assassin *(Évolution du Rogue)*
* **Rôle :** Empoisonnements violents, foulées d'ombre, lacération et réduction drastique des résistances ennemies.
* **Sorts canoniques :**
  - **Attaque de base :** Double entaille chirurgicale ultra-rapide au corps-à-corps.
  - **Lame empoisonnée :** Applique un venin létal infligeant des dégâts sur la durée et réduisant la régénération adverse.
  - **Dash de l’ombre :** Téléportation instantanée dans le dos d'une cible à travers les lignes adverses, ignorant les obstacles.
  - **Frappe exposante :** Attaque perforante laissant une vulnérabilité critique majeure qui augmente tous les dégâts subis.

#### 8. Magicien *(Évolution de l'Acolyte)*
* **Rôle :** Manipulateur arcanique des éléments destructeurs (feu résiduel, givre perforant, foudre en chaîne).
* **Sorts canoniques :**
  - **Attaque de base :** Trait arcanique focalisé à longue portée sans consommation de ressource.
  - **Trait de feu :** Sort offensif brûlant la cible avec dégâts résiduels intenses de brûlure.
  - **Trait de glace :** Lance de givre perforante infligeant des dégâts élémentaires et un gel/ralentissement.
  - **Zap en chaîne :** Décharge d'éclair rebondissant d'une cible à l'autre sur les groupes rapprochés.

---

## 3. Direction Artistique & Système de Design (DA UI)

### Palette Chromatique :
* **Arrière-plans profonds :** 
  * Noir d'ardoise : `#0d0e11`
  * Fer forgé : `#14161b`
* **Conteneurs & Panneaux :** 
  * Pierre de taille sombre : `#1c1f26`
  * Cartes et dalles biseautées : `#242833`
* **Liserés & Séparateurs :**
  * Acier froid brossé : `#384050`
  * Bronze / Laiton oxydé : `#8a7350`
* **Accents Lumineux Fonctionnels (Glows ciblés) :**
  * Or vieilli / Ambre (Sélection, prestige, focus) : `#d4af37` / `#f0c443`
  * Bleu Éthéré (Magie, mana/éther) : `#38bdf8` / `#0284c7`
  * Vert Venin (Rogue, poisons, altérations) : `#22c55e` / `#10b981`
  * Rouge Sang & Cendre (Guerrier, dégâts physiques, lacérations) : `#ef4444` / `#b91c1c`

### Typographie :
* **Titres & En-têtes :** `Cinzel`, `Cinzel Decorative` (Google Fonts) — gravure médiévale noble et géométrique.
* **Données, Statistiques & Code :** `JetBrains Mono` / `Inter` — lisibilité optimale des chiffres et effets.

### Identité Géométrique & Voxel :
* Composants biseautés aux angles tranchants (bords coupés à 45° via `clip-path` ou bordures contrastées).
* Trame de fond orthogonale subtile évoquant la grille tactique voxel.
* Lignes de connexion et séparateurs rigides à 90°.

---

## 4. Architecture de la One-Page
1. **En-tête & Barre de Navigation :**
   * Logo & blason Aether Vanguard, navigation fluide (`#intro`, `#class-tree`, `#class-details`, `#lore`), tiroir devlog latéral, statut de déploiement.
2. **Section 1 : Hero & Brief Projet :**
   * Titre immersif, phrase d'accroche, présentation du lore et du gameplay tactique.
   * Rendu visuel d'arène voxel top-down (asset d'arène de combat).
   * Bouton CTA d'ancrage avec défilement fluide vers l'arbre de classes.
3. **Section 2 : Arbre des Classes (Cadre Interactif avec Scroll & Grab) :**
   * Conteneur interactif avec navigation par glisser-déplacer (*grab-to-pan*), défilement horizontal et vertical.
   * Indicateurs sticky animés sur les bords (*edge overflows*) indiquant la présence de contenu supplémentaire au-delà du viewport.
   * HUD de contrôle (zoom, recentrage, repères de navigation).
   * Nœuds et cartes unités préparés pour accueillir les fiches en survol / sélection.
4. **Section 3 : Panneau de Détail & Grimoire :**
   * Fiche détaillée de la classe active (identité, rôle, statistiques de base, arme signature, prérequis).
   * Grimoire des compétences avec jauges d'éther, types de recharge et badges d'altérations (Poison, Saignement, Déséquilibre, Vulnérabilité).
5. **Pied de Page :**
   * Lore additionnel, crédits et liens vers la communauté.

---

## 5. Stack & Règles de Développement
* **Technologies :** HTML5 sémantique, CSS moderne vanilla (variables CSS, transitions GPU, flexbox/grid), JavaScript Vanilla ES6+ modulaire.
* **Performance :** Zéro dépendance superflue, animations fluides à 60 FPS (transforms & opacités).
* **Responsive :** Adaptabilité mobile avec gestion du glissement tactile (touch events) et affichage optimal sur écran large.

---

## 6. Répartition des Sites & Outils du Projet

Le projet sépare strictement l'expérience publique et l'espace de conception game design en deux sites autonomes :

### 1. Site Vitrine Showcase One-Page (`/website`)
* **Chemin :** [website/index.html](file:///d:/Projects/mof-like/website/index.html)
* **Objectif :** Immersion des joueurs, présentation de la direction artistique voxel, arbre interactif en *grab-to-pan* avec bords sticky et grimoire interactif.

### 2. Studio de Brainstorming & Codex (`/brainstorm`)
* **Chemin :** [brainstorm/index.html](file:///d:/Projects/mof-like/brainstorm/index.html)
* **Base de données :** [brainstorm/data.json](file:///d:/Projects/mof-like/brainstorm/data.json)
* **Affichage :** Format plein écran 16:9 fluide optimisé pour les résolutions 1080p et 1440p.
* **Objectif :** Outil de travail game design et d'équilibrage :
  - **Pôles Tactiques (10 familles) & Matrice des 28 Classes :** Frontline, Hast & Allonge, Balistique, Furtivité, Ordre Sacré, Arcanes & Éléments, Magie Sombre, Invocations, Acoustique, Hybrides.
  - **Moyens d'obtention & Économie Mercenaire :** Achat de mercenaires Niv. 1, coût au premier déblocage de classe puis bascule gratuite, conservation des statistiques et sorts jusqu'au Niv. 100 dans chaque classe.
  - **Système de Comportement Programmable (Gambits) :** Règles conditionnelles basées sur le mana commun d'escouade et la disponibilité des sorts.
  - **Catalogue des Sorts Multi-Modes :** Vue Tableau Dense (audit rapide), Vue Fiches et Vue Groupée par Classe avec filtres par type (Offensif, Soin, Défense, Contrôle, Altérations/DoT, Mobilité) et statut de développement.
  - **Matrice des Redondances & Arbitrages :** Analyse comparative des classes à risque (Gardien vs Sentinelle, Clerc vs Prêtre vs Mage Blanc, Lancier vs Hallebardier, Barde vs Vocaliste, Démolisseur vs Fracasseur).
  - **Bac à sable & Exportation JSON :** Création dynamique et visualiseur JSON contenu avec bouton de repliage/dépliage et téléchargement.

---

## 7. Gestion du Dépôt Git & Règles de Déploiement

* **Dépôt distant :** `https://github.com/Anstrum/aether-vanguard-website.git`
* **Architecture des Branches :**
  - `master` : Branche publique de production avec déploiement GitHub Pages.
  - `dev` : Branche d'intégration et de tests avant merge vers `master`.
  - `feature-*` (ex: `feature-feat1`) : Branches de développement pour implémenter les nouvelles fonctionnalités et itérations.
* **RÈGLE STRICTE ABSOLUE — PUSH SUR MASTER :**
  - **AUCUN push sur la branche `master` ne sera JAMAIS effectué sans l'accord explicite et préalable de l'utilisateur.**
  - Tout développement s'effectue systématiquement sur les branches de feature dédiées.
  - La bascule et le push sur `master` (pour publication publique) requièrent systématiquement une instruction ou validation explicite formulée par l'utilisateur.

