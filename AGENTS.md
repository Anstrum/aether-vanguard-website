# AGENTS.md — Directives & Documentation du Projet "Aether Vanguard"

## 1. Vue d'Ensemble du Projet
* **Titre :** Aether Vanguard (Anciennement nommé sous code "Antigravity")
* **Genre :** RPG tactique sombre de gestion de mercenaires en vue top-down dézoomée avec rendu voxel stylisé.
* **Ambiance :** Dark Medieval Fantasy & géométrie voxel technique (dalles de pierre, fer forgé, acier froid, enluminures et lueurs arcaniques).
* **Piliers Fondamentaux de Gameplay :**
  - **Gestion de Troupes de 12 Mercenaires :** Organisation en compagnies, création de plusieurs troupes autonomes pour raider plusieurs donjons en simultané (temps réel avec possibilité de switcher de caméra à volonté) et raids coopératifs multi-troupes.
  - **Grille de Formation Tactique 3x4 (12 slots) :** 3 rangées de 4 cases (Frontline / Midline / Backline). Placement stratégique préparatoire des unités avant l'engagement.
  - **Combats Automatisés Programmables (Gambits) :** Les mercenaires exécutent des cycles de décision en boucle continue et sans délai. Chaque règle est évaluée en cascade selon la priorité définie par le joueur (*« Si [Condition] alors [Action] »*), chaque action ayant son temps d'incantation et d'animation propre.
  - **Réserve d'Éther Commune & Affinité :** Le réservoir maximal d'Éther de la troupe est la somme des statistiques d'*Affinité d'Éther* des 12 mercenaires. L'Éther démarre au maximum au début du combat, se recharge passivement à 1% par seconde et via des compétences actives de canalisation (rôle clé d'unités génératrices).

---

## 2. Système de Progression, Économie & Donjons

### Structure de Progression & Branches Canoniques
* **Branche Martiale :** Guerrier (Base) ➔ Sentinelle (Spécialisation)
* **Branche Tir :** Archer (Base) ➔ Arbalétrier (Spécialisation)
* **Branche Furtivité :** Rogue (Base) ➔ Assassin (Spécialisation)
* **Branche Magique :** Acolyte (Base) ➔ Magicien (Spécialisation)

### Système Fondamental des Mercenaires & Gambits
* **Recrutement & Niveaux :** Achat de mercenaires Niv. 1 sur les classes de base. Plafond au Niveau 100 par classe avec conservation permanente de toutes les statistiques et sorts débloqués.
* **Déblocage de Classes :** Le premier déblocage vers une nouvelle classe coûte de l'argent. Les bascules ultérieures entre classes déjà débloquées sont gratuites.
* **Condition Matérielle d'Exécution :** Un mercenaire peut intégrer à ses Gambits n'importe quel sort acquis dans son historique de classes, **à condition stricte d'équiper l'arme requise par ce sort**.
* **Slots de Gambits (3 ➔ 10) :** Un mercenaire commence avec **3 slots de conditions**. Il peut débloquer jusqu'à 10 slots via des sessions d'entraînement au QG (formation payante demandant du temps et de l'or, accessible organiquement en cours de progression).
* **Règles Figées en Raid :** Les Gambits ne peuvent pas être modifiés pendant un donjon. La stratégie se prépare en amont au quartier général.

### Donjons, Salles & Conditions de Réussite
* **Structure Linéaire Procédurale :** Donjons en couloirs avec progression par **« Salles »** (points d'arrêt de la troupe provoqués par la présence d'un pack d'ennemis). Les donjons comptent de 5 salles (début) jusqu'à 20+ salles (haut niveau).
* **Condition de Réussite Absolue :** Un donjon n'est considéré comme réussi **que si 100% de la troupe survit**. Un mort (même ressuscité par sort au cours du combat) invalide la réussite parfaite du donjon.
* **Distribution de l'XP :** L'expérience est octroyée à chaque fin de combat/salle aux mercenaires survivants. Un mercenaire mort ne reçoit aucune XP pour le combat où il a chuté.

### Mort, Repli & Modes de Jeu (Normal vs Hardcore)
* **Mode Normal :**
  - **Retraite Tactique :** Le joueur peut ordonner le repli en direct. Le combat en cours se termine normalement puis la troupe évacue sans poursuivre le donjon.
  - **Préservation du Butin :** En cas de repli ou de wipe total, l'argent et les objets récoltés sont conservés (téléportation d'urgence arcanique).
  - **Coût de Réanimation & Game Over :** Les mercenaires K.O. sont ramenés à la base et leur réanimation coûte de l'argent. Si le trésor est vide et qu'aucun mercenaire ne peut être réanimé, c'est un Game Over économique.
  - **Résurrection en Combat :** Possible via des sorts de haut niveau très coûteux en Éther avant la fin de l'affrontement (mais invalide le bonus 100% sans mort).
* **Mode Hardcore :**
  - **Permadeath :** Toute mort est irréversible (mercenaire perdu définitivement).
  - **Perte de Butin :** Chaque mort entraîne la perte d'une part des items et de l'or portés.
  - **Zéro Retraite :** Le bouton de repli est désactivé. L'escouade combat jusqu'à la victoire ou l'anéantissement.
* **Backlog Évolutif (Phases Ultérieures) :** Hybridation double-mains libre, mentorat en salle d'étude (professeur/élèves), parchemins d'XP et système de loot approfondi.

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
   * Logo & blason Antigravity, navigation fluide (`#intro`, `#class-tree`, `#class-details`, `#lore`), statut de déploiement.
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
