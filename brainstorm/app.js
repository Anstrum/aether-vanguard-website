/**
 * AETHER VANGUARD — CODEX & BRAINSTORMING STUDIO (v1.3.0)
 * 16:9 Widescreen Game Design Studio:
 * - Macro Poles Bar & 28 Brainstormed Classes
 * - Redundancy Risk Arbitrations & Weapon Signatures
 * - Multi-Mode Unified Spells Catalog (Table Macro, Cards, Grouped by Class)
 * - Dynamic Creator & Contained JSON Exporter
 */

// Global State
let codexData = null;
let currentPoleFilter = 'all';
let currentRiskFilter = 'all';
let currentClassReqFilter = 'all'; // 'all' | 'base' | 'single' | 'crossed'
let selectedNetworkClassId = 'guerrier';
let classesViewMode = 'cards'; // 'cards' | 'network' | 'matrix'

let currentSpellStatusFilter = 'all';
let currentSpellTypeFilter = 'all';
let spellsViewMode = 'table'; // 'table' | 'cards' | 'grouped'

let currentConditionCatFilter = 'all';
let currentConditionTargetFilter = 'all';
let conditionsViewMode = 'cards'; // 'cards' | 'table'

let currentBacklogCatFilter = 'all';
let currentBrainstormSection = 'arbitrages'; // 'arbitrages' | 'backlog'

// Autonomous Fallback Data in case local file:// CORS blocks fetch('data.json')
const FALLBACK_DATA = {
  "project": {
    "title": "Aether Vanguard — Codex & Studio de Brainstorming",
    "version": "1.3.0",
    "description": "Base de données modulaire des classes, des moyens d'obtention et du catalogue indépendant des sorts pour le game design et l'équilibrage.",
    "lastUpdated": "2026-10-22",
    "widescreenOptimized": true
  },
  "poles": [
    { "id": "all", "name": "Tous les Pôles", "icon": "🌐", "count": 28 },
    { "id": "frontline", "name": "Frontline & Remparts", "icon": "🛡️", "color": "#ef4444" },
    { "id": "hast", "name": "Hast & Allonge", "icon": "📏", "color": "#f97316" },
    { "id": "balistique", "name": "Balistique & Tir", "icon": "🏹", "color": "#eab308" },
    { "id": "furtivite", "name": "Ombre & Furtivité", "icon": "🗡️", "color": "#10b981" },
    { "id": "divin", "name": "Ordre Sacré & Foi", "icon": "✨", "color": "#06b6d4" },
    { "id": "arcanique", "name": "Arcanes & Éléments", "icon": "🔮", "color": "#3b82f6" },
    { "id": "occulte", "name": "Magie Sombre & Mort", "icon": "💀", "color": "#8b5cf6" },
    { "id": "invocation", "name": "Invocations & Totems", "icon": "🌀", "color": "#ec4899" },
    { "id": "acoustique", "name": "Acoustique & Rythme", "icon": "🎵", "color": "#14b8a6" },
    { "id": "hybride", "name": "Voies Croisées Hybrides", "icon": "❖", "color": "#d4af37" }
  ],
  "classes": [
    {
      "id": "guerrier",
      "name": "Guerrier",
      "pole": "frontline",
      "branch": "martiale",
      "tier": 1,
      "category": "Classe de Base",
      "avatar": "⚔️",
      "role": "Combattant de Première Ligne • Contrôle & Provocation",
      "summary": "Encaisse les premiers chocs, contrôle le flux des ennemis et génère de la menace avec charge et frappe lourde.",
      "signatureWeapon": "Épée Bâtarde & Bouclier Rond",
      "resource": "Rage & Éther Corporel",
      "obtainment": {
        "method": "Classe de Départ Mercenaire",
        "requirements": "Sélectionnable dès l'embauche (Niveau 1)",
        "prereqClasses": [],
        "unlockCost": "Gratuit",
        "difficulty": "Accessible"
      },
      "status": "Validé",
      "designEvaluation": {
        "utility": "Indispensable (Pilier Frontline)",
        "redundancyRisk": "Faible",
        "arbitrage": "Conserver comme base martiale universelle. Facile à prendre en main avec une mobilité solide (Charge).",
        "notes": "Classe fondamentale de tanking physique."
      },
      "skillIds": ["guerrier_base", "guerrier_taunt", "guerrier_war_cry", "guerrier_charge", "guerrier_heavy_strike"]
    },
    {
      "id": "sentinelle",
      "name": "Sentinelle",
      "pole": "frontline",
      "branch": "martiale",
      "tier": 2,
      "category": "Spécialisation",
      "avatar": "🛡️",
      "role": "Forteresse Vivante • Défense & Déséquilibre",
      "summary": "Évolution ultra-défensive axée sur le pavois, l'absorption de dégâts et le déséquilibre de foule au bouclier.",
      "signatureWeapon": "Pavois d'Acier (1 Main) & Masse de Brèche",
      "resource": "Stabilité & Éther Martiale",
      "obtainment": {
        "method": "Évolution de Classe Martiale",
        "requirements": "Guerrier Niv. 20 + Maîtrise du Bouclier Lourde",
        "prereqClasses": ["guerrier"],
        "unlockCost": "1000 Pièces (Premier changement de classe)",
        "difficulty": "Modérée"
      },
      "status": "Validé",
      "designEvaluation": {
        "utility": "Très Élevée (Spécialiste Absorption)",
        "redundancyRisk": "Moyen (Chevauchement potentiel avec le Gardien)",
        "arbitrage": "Sentinelle = Défense active + contre-attaque (pavois 1M + masse). À bien différencier du Gardien.",
        "notes": "Parfait pour contrer les boss physiques à fort impact."
      },
      "skillIds": ["sentinelle_base", "sentinelle_block", "sentinelle_defense_buff", "sentinelle_shield_bash"]
    },
    {
      "id": "gardien",
      "name": "Gardien",
      "pole": "frontline",
      "branch": "martiale",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🧱",
      "role": "Rempart Absolu • Mur Mobile & Provocation Pure",
      "summary": "Équipé d'un immense Pavois lourd à deux mains sans arme offensive. Mur infranchissable bloquant projectiles et lignes de vue ennemies.",
      "signatureWeapon": "Pavois Géant à Deux Mains (0 Arme Offensive)",
      "resource": "Inébranlabilité & Éther Minéral",
      "obtainment": {
        "method": "Déblocage de Rôle Tactique",
        "requirements": "Guerrier Niv. 25 + Quête du Mur de Fer",
        "prereqClasses": ["guerrier"],
        "unlockCost": "1500 Pièces",
        "difficulty": "Avancée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Haute (Tactique spécifique d'escorte & protection de zone)",
        "redundancyRisk": "Élevé (Conflit direct avec la Sentinelle)",
        "arbitrage": "ARBITRAGE : Si le Gardien n'a aucune arme, son gameplay peut être trop passif. Alternative : en faire une posture/stance de la Sentinelle OU lui donner des chocs de pavois renversants.",
        "notes": "Concept très stylé visuellement en voxel (mur dalles mobiles)."
      },
      "skillIds": ["gardien_phalanx", "gardien_bodyguard", "gardien_ground_slam", "gardien_unshakable"]
    },
    {
      "id": "demolisseur",
      "name": "Démolisseur",
      "pole": "frontline",
      "branch": "martiale",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🔨",
      "role": "Briseur de Garde • Destruction de Terrain & Ondes Voxel",
      "summary": "Combattant colossal brandissant une grande masse étoile à deux mains. Brise l'armure et fracasse le sol de combat.",
      "signatureWeapon": "Grande Masse Étoile à Deux Mains",
      "resource": "Inertie & Dévastation",
      "obtainment": {
        "method": "Déblocage de Force Martiale",
        "requirements": "Guerrier Niv. 20 + Force Brute 40",
        "prereqClasses": ["guerrier"],
        "unlockCost": "1200 Pièces",
        "difficulty": "Modérée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Très Élevée (Anti-tanks, anti-boucliers et contrôle de zone)",
        "redundancyRisk": "Moyen (À distinguer du Fracasseur)",
        "arbitrage": "Démolisseur = Arme 2 mains ultra-lente, brise les pavois ennemis et modifie les dalles voxel de l'arène.",
        "notes": "Excellent sentiment d'impact physique."
      },
      "skillIds": ["demolisseur_earth_shatter", "demolisseur_armor_crush", "demolisseur_meteor_swing"]
    },
    {
      "id": "fracasseur",
      "name": "Fracasseur (Massier)",
      "pole": "frontline",
      "branch": "martiale",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "⛓️",
      "role": "Commotion Rapide • Chocs Répétés & Rupture",
      "summary": "Combattant de choc armé d'une masse d'arme à une main et targe. Vise les articulations pour appliquer étourdissements et désorientations rapides.",
      "signatureWeapon": "Masse d'Arme 1M & Targe d'Acier",
      "resource": "Élan & Éther",
      "obtainment": {
        "method": "Spécialisation d'Impact",
        "requirements": "Guerrier Niv. 15 ou Mercenaire Brutal",
        "prereqClasses": ["guerrier"],
        "unlockCost": "1000 Pièces",
        "difficulty": "Accessible"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Moyenne (Stunner physique rapide)",
        "redundancyRisk": "Élevé (Risque fort de doublon avec Guerrier ou Démolisseur)",
        "arbitrage": "ARBITRAGE : Soit fusionner dans Guerrier (options d'armes : épée ou masse), soit garder Démolisseur pour l'identité masse et abandonner Fracasseur.",
        "notes": "À arbitrer en priorité pour éviter la redondance d'armes contondantes."
      },
      "skillIds": ["fracasseur_skull_bash", "fracasseur_concussion", "fracasseur_shatter_guard"]
    },
    {
      "id": "berserker",
      "name": "Berserker",
      "pole": "frontline",
      "branch": "martiale",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🪓",
      "role": "Fureur Sanguinaire • Sacrifice de PV & Dégâts Massifs",
      "summary": "Combattant sauvage à deux haches. Plus ses points de vie diminuent, plus sa cadence d'attaque et ses coups critiques explosent.",
      "signatureWeapon": "Haches Jumelles Barbelées",
      "resource": "Frénésie Sanguine",
      "obtainment": {
        "method": "Rite de la Rage",
        "requirements": "Guerrier Niv. 20 + Survivre à moins de 10% PV en combat",
        "prereqClasses": ["guerrier"],
        "unlockCost": "1200 Pièces",
        "difficulty": "Modérée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Élevée (DPS corps-à-corps à haut risque/haute récompense)",
        "redundancyRisk": "Faible (Gameplay berserk distinct du tanking)",
        "arbitrage": "Validable : apporte une dynamique agressive inexistante chez le Guerrier et la Sentinelle.",
        "notes": "Synergie phénoménale avec les soigneurs."
      },
      "skillIds": ["berserker_blood_rage", "berserker_reckless_cleave", "berserker_undying_will"]
    },
    {
      "id": "lancier",
      "name": "Lancier",
      "pole": "hast",
      "branch": "martiale",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🔱",
      "role": "Perforation en Ligne • Allonge 2 Cases & Anti-Charge",
      "summary": "Maître de la pique et de la lance. Attaque à 2 cases de distance en ligne droite sans risquer la riposte de mêlée, empale les cibles qui chargent.",
      "signatureWeapon": "Pique d'Assaut & Pointe d'Acier Trempé",
      "resource": "Précision Martiale",
      "obtainment": {
        "method": "Entraînement de Phalange",
        "requirements": "Guerrier Niv. 15 ou Archer Niv. 15",
        "prereqClasses": ["guerrier"],
        "unlockCost": "1000 Pièces",
        "difficulty": "Modérée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Très Élevée (Contrôle spatial et portée 2 cases unique)",
        "redundancyRisk": "Élevé (Conflit avec le Hallebardier)",
        "arbitrage": "ARBITRAGE : Lancier = ligne droite rectiligne (2 cases) + anti-charge ; Hallebardier = fauchage horizontal en arc (3 cases). Si les deux coexistent, marquer cette distinction géométrique.",
        "notes": "Idéal sur une grille tactique voxel."
      },
      "skillIds": ["lancier_pierce_line", "lancier_brace_anti_charge", "lancier_vault_kick"]
    },
    {
      "id": "hallebardier",
      "name": "Hallebardier",
      "pole": "hast",
      "branch": "martiale",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🚩",
      "role": "Balayage d'Arc • Fauchage 3 Cases & Brise-Rang",
      "summary": "Expert des grands fauchages horizontaux. Couvre 3 dalles adjacentes d'un seul coup, fauchant les unités regroupées.",
      "signatureWeapon": "Grande Hallebarde de Guerre",
      "resource": "Inertie de Lame",
      "obtainment": {
        "method": "Maîtrise d'Hast de Régiment",
        "requirements": "Guerrier Niv. 20",
        "prereqClasses": ["guerrier"],
        "unlockCost": "1200 Pièces",
        "difficulty": "Modérée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Élevée (Nettoyage de lignes denses)",
        "redundancyRisk": "Élevé (Conflit avec Lancier)",
        "arbitrage": "Si redondant : fusionner en classe 'Maître d'Hast' avec choix de postures (Pique en ligne VS Hallebarde en arc).",
        "notes": "Animation d'arc de cercle très spectaculaire."
      },
      "skillIds": ["hallebardier_sweeping_cleave", "hallebardier_hook_trip", "hallebardier_whirlwind"]
    },
    {
      "id": "archer",
      "name": "Archer",
      "pole": "balistique",
      "branch": "tir",
      "tier": 1,
      "category": "Classe de Base",
      "avatar": "🏹",
      "role": "Tir de Précision • Mobilité & Volée",
      "summary": "Spécialiste de la distance, cadence de tir vive et harcèlement constant avec repli acrobatique.",
      "signatureWeapon": "Grand Arc en If Ciselé",
      "resource": "Concentration & Éther d'Acrobate",
      "obtainment": {
        "method": "Classe de Départ Mercenaire",
        "requirements": "Sélectionnable dès l'embauche (Niveau 1)",
        "prereqClasses": [],
        "unlockCost": "Gratuit",
        "difficulty": "Accessible"
      },
      "status": "Validé",
      "designEvaluation": {
        "utility": "Indispensable (Dégâts Distants & Zonage)",
        "redundancyRisk": "Faible",
        "arbitrage": "Pilier du tir à cadence rapide et grande liberté de déplacement.",
        "notes": "Excellente mobilité grâce au dash arrière."
      },
      "skillIds": ["archer_base", "archer_aimed_shot", "archer_arrow_volley", "archer_back_dash", "archer_suppression_shot"]
    },
    {
      "id": "arbaletrier",
      "name": "Arbalétrier",
      "pole": "balistique",
      "branch": "tir",
      "tier": 2,
      "category": "Spécialisation",
      "avatar": "⚙️",
      "role": "Balistique Lourde • Recharges Tactiques Préparées",
      "summary": "Projectiles lourds transperçants ou explosifs préparés via manivelle mécanique et carreaux spéciaux.",
      "signatureWeapon": "Arbalète de Siège à Manivelle & Trépied",
      "resource": "Munitions Tactiques & Éther",
      "obtainment": {
        "method": "Évolution de Classe Balistique",
        "requirements": "Archer Niv. 20 + Schéma d'Arbalète de Siège",
        "prereqClasses": ["archer"],
        "unlockCost": "1000 Pièces",
        "difficulty": "Modérée"
      },
      "status": "Validé",
      "designEvaluation": {
        "utility": "Très Élevée (Polyvalence & Dégâts de Brèche)",
        "redundancyRisk": "Faible (Bien différencié de l'Archer)",
        "arbitrage": "L'Arbalétrier sacrifie sa mobilité pour des tirs préparés dévastateurs.",
        "notes": "Profondeur tactique grâce aux types de munitions."
      },
      "skillIds": ["arbaletrier_base", "arbaletrier_tactical_reload", "arbaletrier_piercing_bolt", "arbaletrier_explosive_bolt", "arbaletrier_neutralizing_bolt"]
    },
    {
      "id": "rogue",
      "name": "Rogue",
      "pole": "furtivite",
      "branch": "furtivite",
      "tier": 1,
      "category": "Classe de Base",
      "avatar": "🗡️",
      "role": "Infiltration • Frappe Sournoise & Étourdissements",
      "summary": "Positionnement critique dans le dos, invisibilité temporaire et saignements hémorragiques.",
      "signatureWeapon": "Dagues Jumelles d'Acier Sombre",
      "resource": "Points de Combo & Énergie Voxel",
      "obtainment": {
        "method": "Classe de Départ Mercenaire",
        "requirements": "Sélectionnable dès l'embauche (Niveau 1)",
        "prereqClasses": [],
        "unlockCost": "Gratuit",
        "difficulty": "Moyenne"
      },
      "status": "Validé",
      "designEvaluation": {
        "utility": "Élevée (Élimination chirurgicale de cibles isolées)",
        "redundancyRisk": "Faible",
        "arbitrage": "Pilier de la furtivité de mêlée.",
        "notes": "Dépend beaucoup du positionnement d'angle dans le dos."
      },
      "skillIds": ["rogue_base", "rogue_stealth", "rogue_backstab", "rogue_stun", "rogue_laceration"]
    },
    {
      "id": "assassin",
      "name": "Assassin",
      "pole": "furtivite",
      "branch": "furtivite",
      "tier": 2,
      "category": "Spécialisation",
      "avatar": "☠️",
      "role": "Exécution Venimeuse • Foulée d'Ombre & Rupture",
      "summary": "Poisons virulents, téléportation instantanée à travers les lignes adverses et suppression de résistances.",
      "signatureWeapon": "Stilettos Enduits de Belladone",
      "resource": "Neurotoxines & Éther Obscur",
      "obtainment": {
        "method": "Évolution de Classe d'Ombre",
        "requirements": "Rogue Niv. 20 + Contrat de la Guilde Sombre",
        "prereqClasses": ["rogue"],
        "unlockCost": "1000 Pièces",
        "difficulty": "Avancée"
      },
      "status": "Validé",
      "designEvaluation": {
        "utility": "Très Élevée (Anti-soins & Tueurs de Cibles Magiques)",
        "redundancyRisk": "Faible",
        "arbitrage": "Téléportation dans le dos ignorant les obstacles.",
        "notes": "Parfait contre les mages et soigneurs en retrait."
      },
      "skillIds": ["assassin_base", "assassin_poison_blade", "assassin_shadow_dash", "assassin_exposing_strike"]
    },
    {
      "id": "shinobi",
      "name": "Shinobi",
      "pole": "furtivite",
      "branch": "furtivite",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🥷",
      "role": "Évasion Voxel • Fumigènes, Clones & Shurikens",
      "summary": "Guerrier de l'ombre polyvalent mêlant mêlée et mi-distance. Pose des écrans de fumigène aveuglant et utilise la substitution de bûche voxel.",
      "signatureWeapon": "Ninjatō Court & Étoiles de Jet (Shurikens)",
      "resource": "Ninpo & Ki",
      "obtainment": {
        "method": "Dojo Secret de la Brume",
        "requirements": "Rogue Niv. 20 + Archer Niv. 15",
        "prereqClasses": ["rogue", "archer"],
        "unlockCost": "1500 Pièces",
        "difficulty": "Avancée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Élevée (Contrôle du champ de vision et mobilité hybride)",
        "redundancyRisk": "Moyen (Conflit avec l'Assassin)",
        "arbitrage": "L'Assassin tue en un coup avec du poison ; le Shinobi joue sur la diversion (fumigène, clone leurre, désengagement).",
        "notes": "Les dalles de fumigène bloquant la ligne de vue sont très fortes tactiquement."
      },
      "skillIds": ["shinobi_smoke_screen", "shinobi_shuriken_barrage", "shinobi_substitution_log"]
    },
    {
      "id": "acolyte",
      "name": "Acolyte",
      "pole": "divin",
      "branch": "magique",
      "tier": 1,
      "category": "Classe de Base",
      "avatar": "✨",
      "role": "Soutien Sacré • Guérison d'Urgence & Purification",
      "summary": "Maintient les alliés en vie, soigne au contact et à distance, dissipe les poisons et altérations d'état.",
      "signatureWeapon": "Masse de Foi & Livre de Prières",
      "resource": "Foi & Éther Pur",
      "obtainment": {
        "method": "Classe de Départ Mercenaire",
        "requirements": "Sélectionnable dès l'embauche (Niveau 1)",
        "prereqClasses": [],
        "unlockCost": "Gratuit",
        "difficulty": "Accessible"
      },
      "status": "Validé",
      "designEvaluation": {
        "utility": "Indispensable (Seul vrai soigneur de départ)",
        "redundancyRisk": "Faible",
        "arbitrage": "Pilier du soin d'urgence.",
        "notes": "Essentiel pour contrer les DoT de poison et de saignement."
      },
      "skillIds": ["acolyte_base", "acolyte_toucher_guerisseur", "acolyte_priere_curative", "acolyte_purification"]
    },
    {
      "id": "clerc",
      "name": "Clerc",
      "pole": "divin",
      "branch": "magique",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "⛪",
      "role": "Combattant Sacré • Armure de Plaques & Chocs Divins",
      "summary": "Prêtre en armure lourde de combat. Se bat au corps-à-corps avec sa masse bénie tout en déclenchant des auras de soin à l'impact.",
      "signatureWeapon": "Marteau de Guerre Sanctifié & Écu d'Église",
      "resource": "Zèle Sacré",
      "obtainment": {
        "method": "Ordre Monastique Militant",
        "requirements": "Acolyte Niv. 20 + Guerrier Niv. 15",
        "prereqClasses": ["acolyte", "guerrier"],
        "unlockCost": "1200 Pièces",
        "difficulty": "Modérée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Très Élevée (Healer de première ligne)",
        "redundancyRisk": "Élevé (Grand risque de conflit avec le Paladin et le Prêtre)",
        "arbitrage": "ARBITRAGE MAJEUR : Quelle différence entre Clerc et Paladin ? Recommandation : Paladin = Tank protecteur ; Clerc = Off-tank axé sur les buffs de groupe et la réanimation.",
        "notes": "Point d'équilibrage sensible du jeu."
      },
      "skillIds": ["clerc_smite_heal", "clerc_holy_armor", "clerc_divine_resurrection"]
    },
    {
      "id": "pretre",
      "name": "Prêtre",
      "pole": "divin",
      "branch": "magique",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🕊️",
      "role": "Haut Guérisseur • Cercles de Soins de Zone & Dispels Massifs",
      "summary": "Érudit sacré en soutane. Déploie d'immenses auras curatives au sol soignant plusieurs alliés simultanément à longue distance.",
      "signatureWeapon": "Bâton d'Argent Céleste & Encensoir",
      "resource": "Grâce Divine & Éther Supérieur",
      "obtainment": {
        "method": "Élévation au Sacerdoce",
        "requirements": "Acolyte Niv. 20 + Quête de Pureté",
        "prereqClasses": ["acolyte"],
        "unlockCost": "1000 Pièces",
        "difficulty": "Modérée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Indispensable (Soigneur de zone longue portée)",
        "redundancyRisk": "Moyen (Différencié du Clerc car 100% distance et fragile)",
        "arbitrage": "Le Prêtre est le pur soigneur distant en robe, incapable de tanker au contact.",
        "notes": "Parfait en synergie avec les tanks."
      },
      "skillIds": ["pretre_healing_circle", "pretre_mass_dispel", "pretre_sanctuary"]
    },
    {
      "id": "mage_blanc",
      "name": "Mage Blanc",
      "pole": "divin",
      "branch": "magique",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🤍",
      "role": "Prévention & Barrières • Boucliers d'Éther & Régénération",
      "summary": "Spécialiste de la prévention plutôt que du soin réactif. Place des bulles d'absorption et accorde des régénérations sur la durée.",
      "signatureWeapon": "Prisme de Lumière & Robe Astrale",
      "resource": "Éther de Vie",
      "obtainment": {
        "method": "Académie de la Lumière",
        "requirements": "Acolyte Niv. 20 + Magicien Niv. 10",
        "prereqClasses": ["acolyte"],
        "unlockCost": "1200 Pièces",
        "difficulty": "Modérée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Élevée (Absorption anticipée des one-shots)",
        "redundancyRisk": "Élevé (Conflit possible avec Prêtre et Acolyte)",
        "arbitrage": "ARBITRAGE : Si 3 soigneurs purs (Acolyte, Prêtre, Mage Blanc), risque de saturation. Le Mage Blanc doit être 100% axé sur les shields (aucun soin direct).",
        "notes": "Très efficace contre les boss avec attaques télégraphiées."
      },
      "skillIds": ["mage_blanc_barrier", "mage_blanc_life_bloom", "mage_blanc_aegis"]
    },
    {
      "id": "magicien",
      "name": "Magicien",
      "pole": "arcanique",
      "branch": "magique",
      "tier": 2,
      "category": "Spécialisation",
      "avatar": "🔮",
      "role": "Destruction Élémentaire • Feu, Glace & Foudre",
      "summary": "Bascule offensive magique. Exploite la brûlure résiduelle, le gel perforant et les arcs de foudre rebondissant.",
      "signatureWeapon": "Bâton Runique d'Éther & Catalyseur de Lapis",
      "resource": "Éther Arcanique Pur",
      "obtainment": {
        "method": "Évolution Magique Offensive",
        "requirements": "Acolyte Niv. 20 + Éveil des Éléments",
        "prereqClasses": ["acolyte"],
        "unlockCost": "1000 Pièces",
        "difficulty": "Modérée"
      },
      "status": "Validé",
      "designEvaluation": {
        "utility": "Très Élevée (Dégâts Élémentaires & Contrôle de zone)",
        "redundancyRisk": "Faible",
        "arbitrage": "Pilier du blaster magique universel.",
        "notes": "Les 3 éléments couvrent faiblesses et altérations."
      },
      "skillIds": ["magicien_base", "magicien_fire_bolt", "magicien_ice_bolt", "magicien_chain_zap"]
    },
    {
      "id": "elementaliste",
      "name": "Élémentaliste",
      "pole": "arcanique",
      "branch": "magique",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🌪️",
      "role": "Réactions en Chaîne • Combos Élémentaires & Terrains Voxel",
      "summary": "Manipule les interactions entre éléments : combine l'eau et la foudre pour électrocuter les dalles, ou l'huile et le feu pour créer un mur de flammes.",
      "signatureWeapon": "Orbes Tri-Élémentaires Pivotants",
      "resource": "Harmonie Élémentaire",
      "obtainment": {
        "method": "Sanctuaire des Tempêtes",
        "requirements": "Magicien Niv. 25 + Quête des 4 Esprits",
        "prereqClasses": ["magicien"],
        "unlockCost": "1500 Pièces",
        "difficulty": "Avancée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Très Élevée (Gameplay émergent sur le sol voxel)",
        "redundancyRisk": "Moyen (Conflit avec Magicien)",
        "arbitrage": "Magicien = sorts directs ciblés ; Élémentaliste = modifie les surfaces au sol et crée des combos environnementaux.",
        "notes": "Système de combos à la Divinity: Original Sin adapté au voxel."
      },
      "skillIds": ["elementaliste_flame_ground", "elementaliste_water_puddle", "elementaliste_storm_surge"]
    },
    {
      "id": "archimage",
      "name": "Archimage",
      "pole": "arcanique",
      "branch": "magique",
      "tier": 3,
      "category": "Concept / Parangon",
      "avatar": "🪐",
      "role": "Arcanes Cosmiques • Chronomancie & Déchirure Stellaire",
      "summary": "Sommet de la maîtrise arcanique. Manipule le temps (réinitialise les temps de recharge alliés, fige des cibles) et ouvre des vortex dimensionnels.",
      "signatureWeapon": "Grimoire Stellaire Flottant & Bâton d'Astrolabe",
      "resource": "Éther Astral Cosmique",
      "obtainment": {
        "method": "Ascension de Parangon Magique",
        "requirements": "Magicien Niv. 50 + Épreuve de la Faille",
        "prereqClasses": ["magicien"],
        "unlockCost": "3000 Pièces + Essence d'Étoile",
        "difficulty": "Épique (Palier 3)"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Exceptionnelle (Support de fin de jeu et burst cosmique)",
        "redundancyRisk": "Faible (Positionné en Palier 3 Parangon)",
        "arbitrage": "Classe de prestige d'end-game, ne cannibalise pas le Magicien de palier 2.",
        "notes": "Mécanique de reset de cooldowns très puissante pour les synergies d'équipe."
      },
      "skillIds": ["archimage_time_stop", "archimage_cooldown_warp", "archimage_cosmic_singularity"]
    },
    {
      "id": "mage_noir",
      "name": "Mage Noir",
      "pole": "occulte",
      "branch": "magique",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🖤",
      "role": "Malédictions & Entropie • Siphon de Vie & Débuffs Lourds",
      "summary": "Adepte des magies prohibées. Draine les points de vie adverses pour soigner ses alliés ou alimenter son mana, corrompt les résistances ennemies.",
      "signatureWeapon": "Foyer d'Obsidienne & Crâne de Cristal Noir",
      "resource": "Entropie & Sang d'Ombre",
      "obtainment": {
        "method": "Pacte de la Crypte Prohibée",
        "requirements": "Magicien Niv. 20 ou Acolyte Niv. 20 (Corruption)",
        "prereqClasses": ["magicien", "acolyte"],
        "unlockCost": "1500 Pièces",
        "difficulty": "Avancée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Élevée (Debuffer de boss majeur & sustain par drain)",
        "redundancyRisk": "Moyen (À distinguer de l'Occultiste et du Nécromancien)",
        "arbitrage": "Mage Noir = Dégâts directs d'ombre + drain de vie ; Nécromancien = sbires & cadavres ; Occultiste = sceaux & contrôle d'afflictions.",
        "notes": "Excellente alternative sombre au mage élémentaire."
      },
      "skillIds": ["mage_noir_life_drain", "mage_noir_corrosive_curse", "mage_noir_dark_star"]
    },
    {
      "id": "occultiste",
      "name": "Occultiste",
      "pole": "occulte",
      "branch": "magique",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🧿",
      "role": "Manipulation d'Afflictions • Sceaux au Sol & Transfert de Malus",
      "summary": "Maître des sceaux et des liens psychiques. Transfère les poisons et saignements d'un allié vers un ennemi, ou propage les malus entre monstres liés.",
      "signatureWeapon": "Dague Cérémonielle & Poupée de Paille Runique",
      "resource": "Angoisse & Éther Ancien",
      "obtainment": {
        "method": "Étude des Textes Interdits",
        "requirements": "Rogue Niv. 20 + Acolyte Niv. 15",
        "prereqClasses": ["rogue", "acolyte"],
        "unlockCost": "1500 Pièces",
        "difficulty": "Avancée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Très Élevée (Mécaniques uniques de redistribution de débuffs)",
        "redundancyRisk": "Moyen (Conflit avec Mage Noir)",
        "arbitrage": "Gameplay indirect très cérébral : fait ricochet les afflictions posées par l'Assassin et le Guerrier.",
        "notes": "Parfait pour créer des synergies programmables dans l'IA mercenaire."
      },
      "skillIds": ["occultiste_curse_transfer", "occultiste_soul_link", "occultiste_dread_seal"]
    },
    {
      "id": "necromancien",
      "name": "Nécromancien",
      "pole": "occulte",
      "branch": "magique",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "💀",
      "role": "Seigneur des Tombes • Exploitation de Cadavres & Squelettes Voxel",
      "summary": "Interagit avec les cadavres laissés sur les dalles de combat pour relever des sbires squelettes voxel temporaires ou faire exploser les restes.",
      "signatureWeapon": "Faux d'Os Ciselée & Reliquaire Funéraire",
      "resource": "Âmes Moissonnées & Éther Obscur",
      "obtainment": {
        "method": "Grimoire de Nécromancie",
        "requirements": "Acolyte Niv. 20 (Renégat) ou Magicien Niv. 20",
        "prereqClasses": ["acolyte", "magicien"],
        "unlockCost": "1800 Pièces + Essence Spectrale",
        "difficulty": "Avancée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Très Élevée (Swarm de sbires absorbant les coups et pression constante)",
        "redundancyRisk": "Faible (Mécanique de cadavres totalement unique)",
        "arbitrage": "Validable sans hésitation : apporte une utilisation novatrice du champ de bataille après les morts.",
        "notes": "Les squelettes voxel s'émiettent en cubes à leur mort."
      },
      "skillIds": ["necromancien_raise_skeleton", "necromancien_corpse_explosion", "necromancien_soul_harvest"]
    },
    {
      "id": "invocateur",
      "name": "Invocateur",
      "pole": "invocation",
      "branch": "magique",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🌀",
      "role": "Maître des Esprits • Totems Voxel Statiques & Familiers Autonomes",
      "summary": "Plante des totems magiques sur les dalles voxel projetant des tirs ou des soins continus, et invoque des bêtes d'éther.",
      "signatureWeapon": "Sceptre d'Invocation & Cloches d'Esprit",
      "resource": "Concentration d'Invocation",
      "obtainment": {
        "method": "Communion avec les Esprits",
        "requirements": "Acolyte Niv. 15 + Archer Niv. 15",
        "prereqClasses": ["acolyte", "archer"],
        "unlockCost": "1400 Pièces",
        "difficulty": "Modérée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Élevée (Contrôle territorial passif)",
        "redundancyRisk": "Faible (Différencié du Nécromancien car n'a pas besoin de cadavres)",
        "arbitrage": "Totems = balises tactiques fixes sur la grille créant des zones sûres pour les alliés.",
        "notes": "Les totems peuvent être ciblés et détruits par les ennemis."
      },
      "skillIds": ["invocateur_totem_turret", "invocateur_totem_ward", "invocateur_spirit_beast"]
    },
    {
      "id": "barde",
      "name": "Barde",
      "pole": "acoustique",
      "branch": "tir",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🪕",
      "role": "Rythme & Harmonie • Auras de Hâte, Dégâts & Régénération de Mana",
      "summary": "Soutien mobile par la musique. Joue des chansons qui boostent la vitesse de déplacement, la cadence d'attaque et rechargent l'éther commun des mercenaires.",
      "signatureWeapon": "Luth Renforcé & Harpe de Poche",
      "resource": "Tempo & Harmonie",
      "obtainment": {
        "method": "Collège des Troubadours",
        "requirements": "Rogue Niv. 15 ou Archer Niv. 15",
        "prereqClasses": ["rogue", "archer"],
        "unlockCost": "1200 Pièces",
        "difficulty": "Modérée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Exceptionnelle (Booster d'escouade et sustain d'éther commun)",
        "redundancyRisk": "Élevé (Conflit direct avec le Vocaliste)",
        "arbitrage": "ARBITRAGE : Barde = buffs continus pour les alliés (chansons d'inspiration, tempo, mana) ; Vocaliste = attaques soniques offensives et déstabilisations ennemies.",
        "notes": "Son boost de recharge du mana commun est crucial pour les builds programmés."
      },
      "skillIds": ["barde_hymn_of_haste", "barde_mana_anthem", "barde_discord_note"]
    },
    {
      "id": "vocaliste",
      "name": "Vocaliste",
      "pole": "acoustique",
      "branch": "martiale",
      "tier": 2,
      "category": "Concept / Spécialisation",
      "avatar": "🗣️",
      "role": "Ondes Soniques • Cris de Rupture & Désorientation de Foule",
      "summary": "Utilise la puissance de sa voix et des fréquences résonnantes. Projette des cônes acoustiques qui étourdissent, repoussent et interrompent les incantations adverses.",
      "signatureWeapon": "Diapason Géant en Acier & Cor de Guerre",
      "resource": "Pression Vocale & Souffle",
      "obtainment": {
        "method": "Épreuve de l'Écho de Pierre",
        "requirements": "Guerrier Niv. 15 + Cri de guerre maîtrisé",
        "prereqClasses": ["guerrier"],
        "unlockCost": "1200 Pièces",
        "difficulty": "Modérée"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Élevée (Interruption de mages à distance et contrôle de masse)",
        "redundancyRisk": "Élevé (Conflit avec Barde)",
        "arbitrage": "Si redondant avec le Barde, fusionner les deux sous un seul archétype acoustique. Sinon, garder Vocaliste comme guerrier sonique offensif.",
        "notes": "Effets d'ondes de choc circulaires sur la grille voxel."
      },
      "skillIds": ["vocaliste_sonic_shriek", "vocaliste_silence_wave", "vocaliste_resonant_blast"]
    },
    {
      "id": "paladin",
      "name": "Paladin",
      "pole": "hybride",
      "branch": "hybride",
      "tier": 2,
      "category": "Spécialisation Hybride",
      "avatar": "⚔️✨",
      "role": "Chevalier Sacré • Rempart Divin & Jugement",
      "summary": "Voie croisée combinant la ténacité martiale du Guerrier et les miracles de soin de l'Acolyte. Protège et châtie avec radiance.",
      "signatureWeapon": "Lame Bénie & Écu Gravé d'Enluminures",
      "resource": "Foi Martiale & Éther Pur",
      "obtainment": {
        "method": "Croisement Multi-Branches (Voie Hybride)",
        "requirements": "Guerrier Niv. 20 + Acolyte Niv. 20 (Serment Conjoint)",
        "prereqClasses": ["guerrier", "acolyte"],
        "unlockCost": "2000 Pièces (Déblocage Voie Croisée)",
        "difficulty": "Complexe (Double Entraînement)"
      },
      "status": "En Réflexion / Prototype",
      "designEvaluation": {
        "utility": "Exceptionnelle (Tank hybride soigneur)",
        "redundancyRisk": "Moyen (Attention à ne pas éclipser la Sentinelle ou le Clerc)",
        "arbitrage": "Réduire son contrôle direct par rapport au Guerrier et limiter ses soins à une aura passive et un bouclier à long cooldown pour préserver la valeur de l'Acolyte/Prêtre.",
        "notes": "Parangon de la mécanique de double classe."
      },
      "skillIds": ["paladin_base", "paladin_judgment", "paladin_light_shield", "paladin_redemption_aura"]
    },
    {
      "id": "paladin_noir",
      "name": "Paladin Noir (Chevalier Déchu)",
      "pole": "hybride",
      "branch": "hybride",
      "tier": 2,
      "category": "Concept / Spécialisation Hybride",
      "avatar": "⚔️💀",
      "role": "Chevalier Impie • Siphon Sanguin & Armure de Rancœur",
      "summary": "Croisement sinistre entre le Guerrier et le Mage Noir. Convertit les dégâts subis en puissance de frappe et draine l'énergie des ennemis proches.",
      "signatureWeapon": "Espadon Maudit d'Acier Noirci & Plastron Runique",
      "resource": "Rancœur & Sang Corrompu",
      "obtainment": {
        "method": "Pacte de Rupture Sacrilège",
        "requirements": "Guerrier Niv. 20 + Mage Noir Niv. 20",
        "prereqClasses": ["guerrier", "mage_noir"],
        "unlockCost": "2000 Pièces",
        "difficulty": "Complexe (Double Entraînement)"
      },
      "status": "En Réflexion / Concept",
      "designEvaluation": {
        "utility": "Très Élevée (Tank vampirique autonome)",
        "redundancyRisk": "Faible (Thématique et gameplay anti-paladin distincts)",
        "arbitrage": "Validable : offre un tank offensif auto-suffisant qui libère le soigneur pour d'autres alliés.",
        "notes": "Visuel d'aura noire et rouge très percutant."
      },
      "skillIds": ["paladin_noir_death_strike", "paladin_noir_blood_armor", "paladin_noir_vampiric_aura"]
    }
  ],
  "spells": [
    {
      "id": "guerrier_base",
      "name": "Attaque de base",
      "classId": "guerrier",
      "className": "Guerrier",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Offensif Physique",
      "cost": "0 Éther",
      "cooldown": "Instantané",
      "range": "Mêlée (1 case)",
      "desc": "Frappe physique en mêlée standard sans coût de ressource.",
      "tags": ["Dégâts Physiques", "Sans Coût", "Mêlée"],
      "status": "Fait"
    },
    {
      "id": "guerrier_taunt",
      "name": "Taunt",
      "classId": "guerrier",
      "className": "Guerrier",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Contrôle de Foule",
      "cost": "15 Éther",
      "cooldown": "12s",
      "range": "Proche (3 cases)",
      "desc": "Force les ennemis ciblés ou proches à attaquer le Guerrier pendant une durée définie.",
      "tags": ["Provocation", "Menace", "Contrôle"],
      "status": "Fait"
    },
    {
      "id": "guerrier_war_cry",
      "name": "Cri de guerre",
      "classId": "guerrier",
      "className": "Guerrier",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Buff & Déstabilisation",
      "cost": "20 Éther",
      "cooldown": "16s",
      "range": "Zone (2 cases)",
      "desc": "Augmente l'attaque et le moral des alliés adjacents tout en déstabilisant brièvement les ennemis.",
      "tags": ["Buff Groupe", "Attaque +", "Moral +", "Déstabilisation"],
      "status": "Fait"
    },
    {
      "id": "guerrier_charge",
      "name": "Charge",
      "classId": "guerrier",
      "className": "Guerrier",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Mobilité & Engagement",
      "cost": "15 Éther",
      "cooldown": "8s",
      "range": "Ligne droite (4 cases)",
      "desc": "Ruée en ligne droite vers une cible, comblant la distance avec étourdissement léger à l'impact.",
      "tags": ["Rapprochement", "Étourdissement 1s", "Engagement"],
      "status": "Fait"
    },
    {
      "id": "guerrier_heavy_strike",
      "name": "Frappe lourde",
      "classId": "guerrier",
      "className": "Guerrier",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Offensif Lourd",
      "cost": "25 Éther",
      "cooldown": "10s",
      "range": "Mêlée (1 case)",
      "desc": "Attaque puissante à préparation lente, brisant une partie de l'armure ennemie.",
      "tags": ["Dégâts Lourds", "Brise-Armure", "Temps de Préparation"],
      "status": "Fait"
    },
    {
      "id": "sentinelle_base",
      "name": "Coup d'estoc défensif",
      "classId": "sentinelle",
      "className": "Sentinelle",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Défensif & Contre",
      "cost": "0 Éther",
      "cooldown": "Instantané",
      "range": "Mêlée (1 case)",
      "desc": "Coup défensif porté derrière le pavois tout en maintenant la garde haute.",
      "tags": ["Attaque de Base", "Garde Maintenue", "Mêlée"],
      "status": "Fait"
    },
    {
      "id": "sentinelle_block",
      "name": "Blocage partiel",
      "classId": "sentinelle",
      "className": "Sentinelle",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Posture Défensive",
      "cost": "10 Éther",
      "cooldown": "6s",
      "range": "Personnel",
      "desc": "Posture active réduisant considérablement les dégâts frontaux contre de l'endurance.",
      "tags": ["Absorption Dégâts", "Frontal", "Endurance"],
      "status": "Fait"
    },
    {
      "id": "sentinelle_defense_buff",
      "name": "Buff de défense",
      "classId": "sentinelle",
      "className": "Sentinelle",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Buff d'Escouade",
      "cost": "25 Éther",
      "cooldown": "18s",
      "range": "Zone (2 cases)",
      "desc": "Renforce l'armure physique et la résistance magique du groupe proche pendant plusieurs tours.",
      "tags": ["Armure +", "Résistance Magique +", "Buff Groupe"],
      "status": "Fait"
    },
    {
      "id": "sentinelle_shield_bash",
      "name": "Bash au bouclier",
      "classId": "sentinelle",
      "className": "Sentinelle",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Contrôle & Rupture",
      "cost": "20 Éther",
      "cooldown": "9s",
      "range": "Mêlée (1 case)",
      "desc": "Choc lourd avec le pavois, repoussant la cible et provoquant un déséquilibre.",
      "tags": ["Repoussement", "Déséquilibre", "Interruption"],
      "status": "Fait"
    },
    {
      "id": "gardien_phalanx",
      "name": "Mur de Dalles Mobile",
      "classId": "gardien",
      "className": "Gardien",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Couverture Totale",
      "cost": "20 Éther",
      "cooldown": "10s",
      "range": "Personnel / 3 cases frontales",
      "desc": "Plante le pavois à 2 mains dans les dalles voxel. Bloque 100% des tirs traversants et protège les alliés situés directement derrière.",
      "tags": ["Couverture Totale", "Anti-Projectiles", "Ligne de Vue"],
      "status": "À Concevoir"
    },
    {
      "id": "demolisseur_earth_shatter",
      "name": "Choc Tellurique Voxel",
      "classId": "demolisseur",
      "className": "Démolisseur",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Offensif & Altération Sol",
      "cost": "30 Éther",
      "cooldown": "14s",
      "range": "Cône (2 cases)",
      "desc": "Abat la masse étoile avec fracas. Fissure les dalles voxel de la zone, inflige de lourds dégâts et ralentit le déplacement adverse.",
      "tags": ["Bris de Dalles", "Ralentissement", "Dégâts Lourds"],
      "status": "À Concevoir"
    },
    {
      "id": "demolisseur_armor_crush",
      "name": "Écrasement de Pavois",
      "classId": "demolisseur",
      "className": "Démolisseur",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Anti-Garde",
      "cost": "25 Éther",
      "cooldown": "8s",
      "range": "Mêlée (1 case)",
      "desc": "Frappe verticale qui détruit immédiatement la posture de garde ou de bouclier de la cible et applique Brise-Armure.",
      "tags": ["Brise-Garde", "Brise-Armure", "Anti-Bouclier"],
      "status": "À Concevoir"
    },
    {
      "id": "berserker_blood_rage",
      "name": "Frénésie Sanguinaire",
      "classId": "berserker",
      "className": "Berserker",
      "branch": "martiale",
      "pole": "frontline",
      "type": "Buff Sacrificiel",
      "cost": "10% PV Actuels",
      "cooldown": "12s",
      "range": "Personnel",
      "desc": "Sacrifie des points de vie pour gagner +40% de vitesse d'attaque et +25% de chances de critique pendant 6s.",
      "tags": ["Coût en PV", "Vitesse d'Attaque +", "Critique +"],
      "status": "À Concevoir"
    },
    {
      "id": "lancier_pierce_line",
      "name": "Estoc d'Allonge Rectiligne",
      "classId": "lancier",
      "className": "Lancier",
      "branch": "martiale",
      "pole": "hast",
      "type": "Offensif Ligne Droite",
      "cost": "15 Éther",
      "cooldown": "4s",
      "range": "Ligne 2 cases",
      "desc": "Coup de pique perforant atteignant un ennemi situé à 2 cases en ligne droite sans risquer de contre-attaque.",
      "tags": ["Portée 2 cases", "Ligne Droite", "Sécurité"],
      "status": "À Concevoir"
    },
    {
      "id": "lancier_brace_anti_charge",
      "name": "Pique d'Arrêt (Anti-Charge)",
      "classId": "lancier",
      "className": "Lancier",
      "branch": "martiale",
      "pole": "hast",
      "type": "Réaction & Interception",
      "cost": "20 Éther",
      "cooldown": "15s",
      "range": "Ligne frontale (2 cases)",
      "desc": "Met la pique en arrêt. Si un ennemi tente de charger ou de traverser la case, il est stoppé net et subit un étourdissement critique.",
      "tags": ["Contre-Charge", "Étourdissement", "Interception"],
      "status": "À Concevoir"
    },
    {
      "id": "hallebardier_sweeping_cleave",
      "name": "Fauchage en Arc",
      "classId": "hallebardier",
      "className": "Hallebardier",
      "branch": "martiale",
      "pole": "hast",
      "type": "Offensif Zone Horizontale",
      "cost": "25 Éther",
      "cooldown": "6s",
      "range": "Arc 3 cases frontales",
      "desc": "Balayage horizontal fauchant jusqu'à 3 cibles alignées devant le hallebardier.",
      "tags": ["Fauchage 3 cases", "Multi-cibles", "Dégâts Tranchants"],
      "status": "À Concevoir"
    },
    {
      "id": "archer_base",
      "name": "Attaque de base (Tir)",
      "classId": "archer",
      "className": "Archer",
      "branch": "tir",
      "pole": "balistique",
      "type": "Tir Distant",
      "cost": "0 Éther",
      "cooldown": "Instantané",
      "range": "Distance (4 cases)",
      "desc": "Tir d'une flèche standard à moyenne portée sans coût de ressource.",
      "tags": ["Tir Standard", "Sans Coût", "Distance"],
      "status": "Fait"
    },
    {
      "id": "archer_aimed_shot",
      "name": "Tir ciblé",
      "classId": "archer",
      "className": "Archer",
      "branch": "tir",
      "pole": "balistique",
      "type": "Tir Critique Lourd",
      "cost": "20 Éther",
      "cooldown": "7s",
      "range": "Longue portée (6 cases)",
      "desc": "Visée minutieuse à longue portée offrant dégâts accrus et chances de coup critique au détriment de la mobilité.",
      "tags": ["Critique Élevé", "Longue Portée", "Précision"],
      "status": "Fait"
    },
    {
      "id": "archer_arrow_volley",
      "name": "Volée de flèches",
      "classId": "archer",
      "className": "Archer",
      "branch": "tir",
      "pole": "balistique",
      "type": "Dégâts de Zone",
      "cost": "30 Éther",
      "cooldown": "12s",
      "range": "Zone circulaire (3x3 cases)",
      "desc": "Pluie de projectiles ciblant une zone circulaire au sol infligeant des dégâts physiques répétés.",
      "tags": ["Zone 3x3", "Pluie de Flèches", "Dégâts Physiques"],
      "status": "Fait"
    },
    {
      "id": "archer_back_dash",
      "name": "Dash arrière",
      "classId": "archer",
      "className": "Archer",
      "branch": "tir",
      "pole": "balistique",
      "type": "Mobilité & Dégagement",
      "cost": "15 Éther",
      "cooldown": "9s",
      "range": "Saut arrière (2 cases)",
      "desc": "Saut de repli rapide pour se dégager du corps-à-corps et regagner une distance de sécurité.",
      "tags": ["Esquive", "Repli", "Dégagement"],
      "status": "Fait"
    },
    {
      "id": "archer_suppression_shot",
      "name": "Tir de suppression",
      "classId": "archer",
      "className": "Archer",
      "branch": "tir",
      "pole": "balistique",
      "type": "Ralentissement",
      "cost": "15 Éther",
      "cooldown": "8s",
      "range": "Distance (4 cases)",
      "desc": "Flèche lourde qui ralentit la cadence et les déplacements adverses.",
      "tags": ["Ralentissement", "Contrôle à Distance"],
      "status": "Fait"
    },
    {
      "id": "arbaletrier_base",
      "name": "Tir tendu d'arbalète",
      "classId": "arbaletrier",
      "className": "Arbalétrier",
      "branch": "tir",
      "pole": "balistique",
      "type": "Tir Tendu Lourd",
      "cost": "0 Éther",
      "cooldown": "Instantané",
      "range": "Distance (4 cases)",
      "desc": "Tir tendu d'un carreau d'arbalète infligeant de bons dégâts physiques à moyenne portée.",
      "tags": ["Carreau Lourd", "Tir Tendu", "Sans Coût"],
      "status": "Fait"
    },
    {
      "id": "arbaletrier_tactical_reload",
      "name": "Recharge tactique",
      "classId": "arbaletrier",
      "className": "Arbalétrier",
      "branch": "tir",
      "pole": "balistique",
      "type": "Mécanique de Préparation",
      "cost": "10 Éther",
      "cooldown": "4s",
      "range": "Personnel",
      "desc": "Mécanique de réarmement préparant un type de carreau spécifique pour la prochaine frappe.",
      "tags": ["Préparation", "Choix Munitions", "Armement"],
      "status": "Fait"
    },
    {
      "id": "arbaletrier_piercing_bolt",
      "name": "Carreau transperçant",
      "classId": "arbaletrier",
      "className": "Arbalétrier",
      "branch": "tir",
      "pole": "balistique",
      "type": "Perforation en Ligne",
      "cost": "25 Éther",
      "cooldown": "8s",
      "range": "Ligne droite (5 cases)",
      "desc": "Projectile perforant alignant plusieurs ennemis sur une ligne droite avec dégâts réduits à chaque cible.",
      "tags": ["Perforation", "Ligne Droite", "Multi-cibles"],
      "status": "Fait"
    },
    {
      "id": "arbaletrier_explosive_bolt",
      "name": "Carreau explosif",
      "classId": "arbaletrier",
      "className": "Arbalétrier",
      "branch": "tir",
      "pole": "balistique",
      "type": "Zone & Souffle",
      "cost": "30 Éther",
      "cooldown": "11s",
      "range": "Zone (2 cases)",
      "desc": "Carreau piégé causant de lourds dégâts de souffle et de feu en zone d'impact.",
      "tags": ["Explosion", "Souffle", "Feu", "Dégâts Lourds"],
      "status": "Fait"
    },
    {
      "id": "arbaletrier_neutralizing_bolt",
      "name": "Carreau neutralisant",
      "classId": "arbaletrier",
      "className": "Arbalétrier",
      "branch": "tir",
      "pole": "balistique",
      "type": "Entrave & Clouage",
      "cost": "20 Éther",
      "cooldown": "10s",
      "range": "Distance (4 cases)",
      "desc": "Tir visant les membres pour clouer et immobiliser la cible au sol.",
      "tags": ["Immobilisation", "Clouage", "Entrave"],
      "status": "Fait"
    },
    {
      "id": "rogue_base",
      "name": "Attaque de base (Dague)",
      "classId": "rogue",
      "className": "Rogue",
      "branch": "furtivite",
      "pole": "furtivite",
      "type": "Frappe Rapide",
      "cost": "0 Éther",
      "cooldown": "Instantané",
      "range": "Mêlée (1 case)",
      "desc": "Coup rapide de dague au corps-à-corps.",
      "tags": ["Mêlée", "Sans Coût", "Frappe Rapide"],
      "status": "Fait"
    },
    {
      "id": "rogue_stealth",
      "name": "Furtivité",
      "classId": "rogue",
      "className": "Rogue",
      "branch": "furtivite",
      "pole": "furtivite",
      "type": "Invisibilité & Positionnement",
      "cost": "20 Éther",
      "cooldown": "16s",
      "range": "Personnel",
      "desc": "Rentre dans l'ombre, devenant indétectable jusqu'à la prochaine action offensive.",
      "tags": ["Invisibilité", "Positionnement", "Sortie Furtive"],
      "status": "Fait"
    },
    {
      "id": "rogue_backstab",
      "name": "Backstab (Frappe sournoise)",
      "classId": "rogue",
      "className": "Rogue",
      "branch": "furtivite",
      "pole": "furtivite",
      "type": "Exécution Critique",
      "cost": "25 Éther",
      "cooldown": "6s",
      "range": "Mêlée (Dos)",
      "desc": "Attaque dévastatrice portée dans le dos, aux dégâts critiques massifs (optimale en sortie de furtivité).",
      "tags": ["Angle Dos", "Critique Massif", "Synergie Furtivité"],
      "status": "Fait"
    },
    {
      "id": "rogue_stun",
      "name": "Stun (Coup neutralisant)",
      "classId": "rogue",
      "className": "Rogue",
      "branch": "furtivite",
      "pole": "furtivite",
      "type": "Contrôle Dur",
      "cost": "20 Éther",
      "cooldown": "14s",
      "range": "Mêlée (1 case)",
      "desc": "Frappe neutralisante sur un point vital, immobilisant totalement la cible brièvement.",
      "tags": ["Étourdissement 2s", "Interruption", "Contrôle"],
      "status": "Fait"
    },
    {
      "id": "rogue_laceration",
      "name": "Lacération",
      "classId": "rogue",
      "className": "Rogue",
      "branch": "furtivite",
      "pole": "furtivite",
      "type": "Saignement Hémorragique",
      "cost": "15 Éther",
      "cooldown": "8s",
      "range": "Mêlée (1 case)",
      "desc": "Entaille vicieuse appliquant un saignement continu sur plusieurs tours.",
      "tags": ["Saignement DoT", "Hémorragie", "Dégâts sur la Durée"],
      "status": "Fait"
    },
    {
      "id": "assassin_base",
      "name": "Double entaille chirurgicale",
      "classId": "assassin",
      "className": "Assassin",
      "branch": "furtivite",
      "pole": "furtivite",
      "type": "Double Frappe",
      "cost": "0 Éther",
      "cooldown": "Instantané",
      "range": "Mêlée (1 case)",
      "desc": "Double entaille chirurgicale ultra-rapide au corps-à-corps.",
      "tags": ["Double Frappe", "Rapide", "Mêlée"],
      "status": "Fait"
    },
    {
      "id": "assassin_poison_blade",
      "name": "Lame empoisonnée",
      "classId": "assassin",
      "className": "Assassin",
      "branch": "furtivite",
      "pole": "furtivite",
      "type": "Poison & Anti-Soin",
      "cost": "20 Éther",
      "cooldown": "10s",
      "range": "Mêlée (1 case)",
      "desc": "Applique un venin létal infligeant des dégâts sur la durée et réduisant la régénération adverse.",
      "tags": ["Poison DoT", "Réduction Soins -50%", "Affliction"],
      "status": "Fait"
    },
    {
      "id": "assassin_shadow_dash",
      "name": "Dash de l’ombre",
      "classId": "assassin",
      "className": "Assassin",
      "branch": "furtivite",
      "pole": "furtivite",
      "type": "Téléportation",
      "cost": "25 Éther",
      "cooldown": "12s",
      "range": "Portée (4 cases, dos ennemi)",
      "desc": "Téléportation instantanée dans le dos d'une cible à travers les lignes adverses, ignorant les obstacles.",
      "tags": ["Téléportation", "Ignore Obstacles", "Position Dos"],
      "status": "Fait"
    },
    {
      "id": "assassin_exposing_strike",
      "name": "Frappe exposante",
      "classId": "assassin",
      "className": "Assassin",
      "branch": "furtivite",
      "pole": "furtivite",
      "type": "Vulnérabilité Critique",
      "cost": "20 Éther",
      "cooldown": "9s",
      "range": "Mêlée (1 case)",
      "desc": "Attaque perforante laissant une vulnérabilité critique majeure qui augmente tous les dégâts subis.",
      "tags": ["Vulnérabilité +30%", "Debuff Résistances", "Anti-Tank"],
      "status": "Fait"
    },
    {
      "id": "shinobi_smoke_screen",
      "name": "Fumigène Voxel Aveuglant",
      "classId": "shinobi",
      "className": "Shinobi",
      "branch": "furtivite",
      "pole": "furtivite",
      "type": "Altération Terrain & Vue",
      "cost": "25 Éther",
      "cooldown": "15s",
      "range": "Zone 3x3 cases",
      "desc": "Jette une grenade de fumigène. Crée un nuage opaque sur 3x3 cases bloquant les lignes de vue ennemies et accordant furtivité aux alliés à l'intérieur.",
      "tags": ["Écran Opaque", "Ligne de Vue Coupée", "Furtivité Zone"],
      "status": "À Concevoir"
    },
    {
      "id": "acolyte_base",
      "name": "Décharge magique légère",
      "classId": "acolyte",
      "className": "Acolyte",
      "branch": "magique",
      "pole": "divin",
      "type": "Magique Direct",
      "cost": "0 Éther",
      "cooldown": "Instantané",
      "range": "Courte portée (2 cases)",
      "desc": "Décharge magique légère à courte portée sans coût d'éther.",
      "tags": ["Dégâts Magiques", "Sans Coût", "Courte Portée"],
      "status": "Fait"
    },
    {
      "id": "acolyte_toucher_guerisseur",
      "name": "Toucher guérisseur",
      "classId": "acolyte",
      "className": "Acolyte",
      "branch": "magique",
      "pole": "divin",
      "type": "Soin Direct Contact",
      "cost": "15 Éther",
      "cooldown": "4s",
      "range": "Contact (1 case)",
      "desc": "Soin direct d'urgence appliqué sur un allié adjacent au contact.",
      "tags": ["Soin Majeur", "Contact", "Faible Cooldown"],
      "status": "Fait"
    },
    {
      "id": "acolyte_priere_curative",
      "name": "Prière curative",
      "classId": "acolyte",
      "className": "Acolyte",
      "branch": "magique",
      "pole": "divin",
      "type": "Soin Distant",
      "cost": "25 Éther",
      "cooldown": "7s",
      "range": "Distance (4 cases)",
      "desc": "Soin projeté ciblant un allié éloigné pour stabiliser ses points de vie.",
      "tags": ["Soin à Distance", "Stabilisation", "Ciblé"],
      "status": "Fait"
    },
    {
      "id": "acolyte_purification",
      "name": "Purification",
      "classId": "acolyte",
      "className": "Acolyte",
      "branch": "magique",
      "pole": "divin",
      "type": "Dissipation d'Altérations",
      "cost": "15 Éther",
      "cooldown": "6s",
      "range": "Proche (3 cases)",
      "desc": "Dissipe un malus ou une altération d'état (poison, saignement, brûlure) sur l'allié ciblé.",
      "tags": ["Dispel", "Anti-Poison", "Anti-Saignement"],
      "status": "Fait"
    },
    {
      "id": "pretre_healing_circle",
      "name": "Cercle de Sanctuaire Divin",
      "classId": "pretre",
      "className": "Prêtre",
      "branch": "magique",
      "pole": "divin",
      "type": "Soin de Zone Continu",
      "cost": "35 Éther",
      "cooldown": "16s",
      "range": "Zone 3x3 cases (portée 5)",
      "desc": "Projette un halo sacré au sol. Tous les alliés présents sur les 9 dalles reçoivent des soins répétés pendant 3 tours.",
      "tags": ["Soin de Zone 3x3", "Régénération", "Support Distant"],
      "status": "À Concevoir"
    },
    {
      "id": "mage_blanc_barrier",
      "name": "Barrière Cristalline d'Absorption",
      "classId": "mage_blanc",
      "className": "Mage Blanc",
      "branch": "magique",
      "pole": "divin",
      "type": "Bouclier Préventif",
      "cost": "30 Éther",
      "cooldown": "12s",
      "range": "Portée (4 cases)",
      "desc": "Enveloppe un allié d'une coque de lumière absorbant les prochains 250 dégâts. Les dégâts absorbés ne peuvent pas interrompre d'incantation.",
      "tags": ["Absorption 250", "Anti-Interruption", "Shield Préventif"],
      "status": "À Concevoir"
    },
    {
      "id": "magicien_base",
      "name": "Trait arcanique focalisé",
      "classId": "magicien",
      "className": "Magicien",
      "branch": "magique",
      "pole": "arcanique",
      "type": "Attaque Magique Distante",
      "cost": "0 Éther",
      "cooldown": "Instantané",
      "range": "Longue portée (5 cases)",
      "desc": "Trait arcanique focalisé à longue portée sans consommation de ressource.",
      "tags": ["Dégâts Magiques", "Sans Coût", "Longue Portée"],
      "status": "Fait"
    },
    {
      "id": "magicien_fire_bolt",
      "name": "Trait de feu",
      "classId": "magicien",
      "className": "Magicien",
      "branch": "magique",
      "pole": "arcanique",
      "type": "Offensif Élémentaire & DoT",
      "cost": "20 Éther",
      "cooldown": "5s",
      "range": "Distance (4 cases)",
      "desc": "Sort offensif brûlant la cible avec dégâts résiduels intenses de brûlure.",
      "tags": ["Feu", "Brûlure DoT", "Dégâts Élevés"],
      "status": "Fait"
    },
    {
      "id": "magicien_ice_bolt",
      "name": "Trait de glace",
      "classId": "magicien",
      "className": "Magicien",
      "branch": "magique",
      "pole": "arcanique",
      "type": "Dégâts & Ralentissement",
      "cost": "20 Éther",
      "cooldown": "6s",
      "range": "Distance (4 cases)",
      "desc": "Lance de givre perforante infligeant des dégâts élémentaires et un gel/ralentissement.",
      "tags": ["Givre", "Gel / Ralentissement", "Perforation"],
      "status": "Fait"
    },
    {
      "id": "magicien_chain_zap",
      "name": "Zap en chaîne",
      "classId": "magicien",
      "className": "Magicien",
      "branch": "magique",
      "pole": "arcanique",
      "type": "Dégâts de Rebond",
      "cost": "30 Éther",
      "cooldown": "9s",
      "range": "Distance (Rebond sur 3 cibles)",
      "desc": "Décharge d'éclair rebondissant d'une cible à l'autre sur les groupes rapprochés.",
      "tags": ["Foudre", "Rebond 3 cibles", "Multi-cibles"],
      "status": "Fait"
    },
    {
      "id": "archimage_cooldown_warp",
      "name": "Distorsion Temporelle",
      "classId": "archimage",
      "className": "Archimage",
      "branch": "magique",
      "pole": "arcanique",
      "type": "Support Chronomancie",
      "cost": "50 Éther",
      "cooldown": "30s",
      "range": "Zone (3 cases)",
      "desc": "Accélère le flux temporel des alliés : réduit instantanément tous leurs temps de recharge actifs de 6 secondes.",
      "tags": ["Reset Cooldown -6s", "Chronomancie", "Buff Équipe Majeur"],
      "status": "À Concevoir"
    },
    {
      "id": "mage_noir_life_drain",
      "name": "Siphon d'Âme Obscur",
      "classId": "mage_noir",
      "className": "Mage Noir",
      "branch": "magique",
      "pole": "occulte",
      "type": "Drain Vampirique Distant",
      "cost": "20 Éther",
      "cooldown": "7s",
      "range": "Distance (4 cases)",
      "desc": "Draine la vitalité d'un ennemi. Inflige des dégâts d'ombre et convertit 70% des dégâts infligés en points de vie pour le mage.",
      "tags": ["Siphon PV 70%", "Ombre", "Sustain"],
      "status": "À Concevoir"
    },
    {
      "id": "necromancien_raise_skeleton",
      "name": "Éveil de Squelette Voxel",
      "classId": "necromancien",
      "className": "Nécromancien",
      "branch": "magique",
      "pole": "occulte",
      "type": "Invocation sur Cadavre",
      "cost": "25 Éther + 1 Cadavre",
      "cooldown": "8s",
      "range": "Cadavre à portée (4 cases)",
      "desc": "Cible un cadavre de monstre sur le sol de combat. Les os voxel se réassemblent pour former un guerrier squelette attaquant les ennemis pendant 15s.",
      "tags": ["Consomme Cadavre", "Sbire Temporaire", "Détournement Menace"],
      "status": "À Concevoir"
    },
    {
      "id": "invocateur_totem_turret",
      "name": "Totem Éthéré Mitrailleur",
      "classId": "invocateur",
      "className": "Invocateur",
      "branch": "magique",
      "pole": "invocation",
      "type": "Structure Voxel Fixe",
      "cost": "30 Éther",
      "cooldown": "14s",
      "range": "Dalle adjacente (1 case)",
      "desc": "Plante un totem en blocs de pierre mystique. Le totem tire automatiquement un trait magique chaque tour sur l'ennemi le plus proche.",
      "tags": ["Structure Fixe", "Tir Automatique", "Zone Territoriale"],
      "status": "À Concevoir"
    },
    {
      "id": "barde_mana_anthem",
      "name": "Hymne de l'Éther Commun",
      "classId": "barde",
      "className": "Barde",
      "branch": "tir",
      "pole": "acoustique",
      "type": "Régénération Ressource Groupe",
      "cost": "15 Éther",
      "cooldown": "18s",
      "range": "Escouade entière",
      "desc": "Joue un accord cristallin qui accélère la régénération de la réserve de mana commune de tous les mercenaires de +10 Éther par seconde pendant 5s.",
      "tags": ["Mana Commun +", "Buff Escouade", "Synergie Programmation"],
      "status": "À Concevoir"
    },
    {
      "id": "vocaliste_sonic_shriek",
      "name": "Cri de Résonance Sonique",
      "classId": "vocaliste",
      "className": "Vocaliste",
      "branch": "martiale",
      "pole": "acoustique",
      "type": "Interruption & Repoussement",
      "cost": "25 Éther",
      "cooldown": "10s",
      "range": "Cône (3 cases)",
      "desc": "Émet un rugissement sonore dévastateur en cône. Interrompt les incantations, repousse les ennemis d'une case et leur inflige Désorientation.",
      "tags": ["Interruption", "Repoussement", "Désorientation", "Cône 3 cases"],
      "status": "À Concevoir"
    },
    {
      "id": "paladin_base",
      "name": "Attaque sanctifiée",
      "classId": "paladin",
      "className": "Paladin",
      "branch": "hybride",
      "pole": "hybride",
      "type": "Offensif Physique / Sacré",
      "cost": "0 Éther",
      "cooldown": "Instantané",
      "range": "Mêlée (1 case)",
      "desc": "Coup d'épée bénie imprégné d'une faible radiance sacrée.",
      "tags": ["Hybride", "Mêlée", "Sans Coût"],
      "status": "À Équilibrer"
    },
    {
      "id": "paladin_judgment",
      "name": "Frappe du jugement",
      "classId": "paladin",
      "className": "Paladin",
      "branch": "hybride",
      "pole": "hybride",
      "type": "Châtiment Céleste",
      "cost": "25 Éther",
      "cooldown": "6s",
      "range": "Mêlée (1 case)",
      "desc": "Abat une lame de lumière céleste sur la cible, infligeant de lourds dégâts physiques et sacrés combinés.",
      "tags": ["Dégâts Sacrés", "Brise-Armure", "Châtiment"],
      "status": "À Équilibrer"
    },
    {
      "id": "paladin_light_shield",
      "name": "Bouclier de lumière",
      "classId": "paladin",
      "className": "Paladin",
      "branch": "hybride",
      "pole": "hybride",
      "type": "Protection & Soin Détonant",
      "cost": "30 Éther",
      "cooldown": "14s",
      "range": "Proche (3 cases)",
      "desc": "Crée une bulle de radiance divine autour d'un allié ou de soi-même, absorbant les dégâts et libérant une onde de soin à l'expiration.",
      "tags": ["Absorption", "Soin Détonant", "Protection Ciblée"],
      "status": "À Équilibrer"
    },
    {
      "id": "paladin_redemption_aura",
      "name": "Aura de rédemption",
      "classId": "paladin",
      "className": "Paladin",
      "branch": "hybride",
      "pole": "hybride",
      "type": "Aura Passive de Régénération",
      "cost": "0 Éther",
      "cooldown": "Passif",
      "range": "Zone (2 cases)",
      "desc": "Tous les alliés dans un rayon de 2 cases bénéficient d'une régénération continue de points de vie et d'un bonus de résistance aux altérations.",
      "tags": ["Régénération Passive", "Aura Permanente", "Résistances +"],
      "status": "À Équilibrer"
    },
    {
      "id": "paladin_noir_blood_armor",
      "name": "Armure de Rancœur Maudite",
      "classId": "paladin_noir",
      "className": "Paladin Noir (Chevalier Déchu)",
      "branch": "hybride",
      "pole": "hybride",
      "type": "Riposte Impie",
      "cost": "25 Éther",
      "cooldown": "15s",
      "range": "Personnel",
      "desc": "Enduit l'armure d'une brume de sang noir. 30% des dégâts subis sont renvoyés à l'assaillant sous forme de dégâts d'ombre purs.",
      "tags": ["Renvoi Dégâts 30%", "Dégâts d'Ombre", "Posture Tanking"],
      "status": "À Concevoir"
    }
  ],
  "brainstormBacklog": [
    {
      "id": "arb_gardien_sentinelle",
      "title": "⚖️ Arbitrage 1 : Gardien vs Sentinelle",
      "type": "Redondance Critique (Frontline)",
      "description": "Les deux classes utilisent un pavois d'acier. Le Gardien est à deux mains (0 arme offensive, pur mur mobile) alors que la Sentinelle garde une masse à une main (défense active et déséquilibre au bouclier).",
      "suggestedSkills": ["Mur de Dalles Mobile", "Blocage Partiel", "Bash au bouclier"],
      "verdict": "Différenciation validable SI le Gardien a un vrai gameplay actif d'escorte et de protection des dalles (bloquer les lignes de vue). Sinon, à transformer en stance de la Sentinelle.",
      "status": "À Arbitrer"
    },
    {
      "id": "arb_clerc_pretre_mageblanc",
      "title": "⚖️ Arbitrage 2 : Clerc vs Prêtre vs Mage Blanc",
      "type": "Redondance Critique (Magie Sacrée)",
      "description": "Risque majeur de triplon soigneur. Chacun doit avoir une niche mécanique hermétique.",
      "suggestedSkills": ["Clerc : Marteau & Plaques (Mêlée)", "Prêtre : Soins de Zone Distants (Robe)", "Mage Blanc : Boucliers Préventifs (0 soin direct)"],
      "verdict": "Ne pas faire 3 soigneurs directs ! Règle adoptée : Clerc = Combattant au contact avec auras ; Prêtre = Pur soigneur de zone réactif ; Mage Blanc = Shields préventifs d'absorption.",
      "status": "À Arbitrer"
    },
    {
      "id": "arb_lancier_hallebardier",
      "title": "⚖️ Arbitrage 3 : Lancier vs Hallebardier",
      "type": "Redondance Géométrique (Armes d'Hast)",
      "description": "Différenciation géométrique sur la grille voxel : Lancier attaque en ligne droite sur 2 cases (perforation) et punit les charges adverses ; Hallebardier fauche en arc de cercle sur 3 cases horizontales.",
      "suggestedSkills": ["Estoc d'Allonge Rectiligne", "Fauchage en Arc", "Pique d'Arrêt Anti-Charge"],
      "verdict": "Excellente différentiation spatiale sur grille tactique. À conserver tous les deux.",
      "status": "Validé"
    },
    {
      "id": "arb_barde_vocaliste",
      "title": "⚖️ Arbitrage 4 : Barde vs Vocaliste",
      "type": "Redondance Thématique (Acoustique)",
      "description": "Le Barde joue des instruments pour buff l'équipe (hâte, vitesse, régénération du mana commun de groupe) ; le Vocaliste utilise sa voix pour des attaques soniques, repoussements et interruptions de sorts ennemis.",
      "suggestedSkills": ["Hymne de l'Éther Commun", "Cri de Résonance Sonique", "Silence Acoustique"],
      "verdict": "Le Barde est orienté Support/Macro-management, le Vocaliste est orienté Contrôle de foule offensif en mêlée/mi-distance.",
      "status": "À Arbitrer"
    },
    {
      "id": "arb_demolisseur_massier",
      "title": "⚖️ Arbitrage 5 : Démolisseur vs Fracasseur (Massier)",
      "type": "Redondance d'Armes Contondantes",
      "description": "Démolisseur avec grande masse étoile à deux mains brisant le sol voxel vs Fracasseur avec masse 1M rapide.",
      "suggestedSkills": ["Choc Tellurique Voxel", "Commotion Rapide", "Écrasement de Pavois"],
      "verdict": "Privilégier le Démolisseur (2 mains) pour son identité visuelle voxel unique de destruction de décor. Le Fracasseur 1M peut être absorbé comme arme alternative du Guerrier.",
      "status": "À Arbitrer"
    }
  ],
  "featureBacklog": [
    {
      "id": "feat_hybridization_dual_wield",
      "title": "⚔️ Hybridation Double-Mains Libre (Niveau 100)",
      "category": "Combat & Équipement",
      "priority": "Phase 2 (Haute)",
      "status": "Spécifié & Validé",
      "description": "Permet aux mercenaires ayant atteint le Niveau 100 dans au moins 2 classes d'équiper une arme dans chaque main issue de ces classes (ex: Arbalète 1M + Bâton d'éther, Épée + Pavois).",
      "rule": "Règle d'exécution matérielle : le mercenaire peut lancer n'importe quel sort débloqué, à condition d'avoir l'arme requise en main.",
      "tags": ["Dual-Wield", "Theorycrafting", "End-Game", "Spécifié"]
    },
    {
      "id": "feat_study_room_mentorship",
      "title": "🏛️ Salle d'Étude & Mentorat (Professeur / Élèves)",
      "category": "Gestion du Bastion",
      "priority": "Phase 2 (Moyenne)",
      "status": "Spécifié & Validé",
      "description": "Un mercenaire Niveau 100 laissé au camp peut être assigné comme Professeur dans la salle d'entraînement pour donner des cours à des recrues et faire monter leur XP passivement au fil du temps.",
      "rule": "Permet de monter les recrues sans les exposer aux combats de haut niveau.",
      "tags": ["Bastion", "Mentorat", "XP Passive", "Académie"]
    },
    {
      "id": "feat_class_xp_scrolls",
      "title": "📜 Rédaction de Parchemins d'XP de Classe",
      "category": "Progression & XP",
      "priority": "Phase 2 (Moyenne)",
      "status": "Spécifié & Validé",
      "description": "En fin de mission, un mercenaire combattant dans une classe déjà maxée au Niveau 100 génère des parchemins de savoir (1, 5, 10, 50 XP) stockables et utilisables sur n'importe quel autre allié.",
      "rule": "Évite le gaspillage d'expérience pour les personnages déjà maxés.",
      "tags": ["Consommables", "Partage d'XP", "Récompense Mission"]
    },
    {
      "id": "feat_gambit_visual_editor",
      "title": "⚙️ Éditeur Visuel de Gambits (IA de Combat Temps Réel)",
      "category": "Combat & Gambits",
      "priority": "Phase 2 (Haute)",
      "status": "En Conception",
      "description": "Interface graphique de programmation des priorités d'action pour les mercenaires : glisser-déposer de conditions ('Si PV allié < 30%', 'Si ennemi en train de charger', 'Si Mana commun > 40') associées à des sorts.",
      "rule": "Exécution automatique en temps réel avec consommation sur la jauge de mana commune d'escouade.",
      "tags": ["IA Programmable", "Automatisation", "Conditions & Actions"]
    },
    {
      "id": "feat_loot_and_rune_affinities",
      "title": "💎 Système de Rareté d'Équipement & Affinités Runiques",
      "category": "Loot & Objets",
      "priority": "Phase 3 (Basse)",
      "status": "Idée / Backlog",
      "description": "Butin de fin de donjon avec affixes voxel (Qualité Commune, Acier Trempé, Runique, Astrale), altérant les portées, réduisant les coûts d'éther ou appliquant des effets élémentaires passifs.",
      "rule": "Les armes runiques débloquent des synergies de dégâts supplémentaires.",
      "tags": ["Loot", "Affixes", "Runes", "Armement"]
    },
    {
      "id": "feat_tier3_paragons",
      "title": "👑 Classes d'Ascension Palier 3 (Parangons)",
      "category": "Contenu End-Game",
      "priority": "Phase 3 (Moyenne)",
      "status": "Idée / Backlog",
      "description": "Élévation ultime des classes de palier 2 au niveau 100 : Archimage (chronomancie), Paladin Noir (siphon vampirique d'ombre), Shinobi (illusions de fumée), etc.",
      "rule": "Nécessite des quêtes de parangon d'arène à haute difficulté.",
      "tags": ["Palier 3", "Parangons", "Épique"]
    }
  ]
};

// =============================================================================
// INITIALIZATION & DATA LOADING
// =============================================================================
async function initCodexStudio() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('CORS or file protocol restriction');
    codexData = await response.json();
  } catch (err) {
    console.warn('Utilisation du dataset autonome sécurisé pour Aether Vanguard Codex :', err);
    codexData = FALLBACK_DATA;
  }

  // Populate UI
  populateMetrics();
  renderPolesBar();
  renderClassesView();
  renderSpellsView();
  renderConditionsView();
  renderBrainstormView();
  renderEditorFormClasses();
  updateJsonPreview();

  // Attach Event Handlers
  setupTabs();
  setupClassControls();
  setupSpellControls();
  setupConditionsControls();
  setupBrainstormControls();
  setupEditor();
}

// =============================================================================
// METRICS BAR
// =============================================================================
function populateMetrics() {
  const totalClasses = codexData.classes ? codexData.classes.length : 0;
  const totalSpells = codexData.spells ? codexData.spells.length : 0;
  const totalConditions = codexData.gambitConditions ? codexData.gambitConditions.length : 0;

  const doneSpells = codexData.spells ? codexData.spells.filter(s => s.status === 'Fait').length : 0;
  const completionRate = totalSpells > 0 ? Math.round((doneSpells / totalSpells) * 100) : 0;

  const highRiskClasses = codexData.classes ? codexData.classes.filter(c => 
    c.designEvaluation && c.designEvaluation.redundancyRisk && c.designEvaluation.redundancyRisk.toLowerCase().includes('élevé')
  ).length : 0;

  const elClasses = document.getElementById('metric-total-classes');
  if (elClasses) elClasses.textContent = totalClasses;

  const elSpells = document.getElementById('metric-total-spells');
  if (elSpells) elSpells.textContent = totalSpells;

  const elConditions = document.getElementById('metric-total-conditions');
  if (elConditions) elConditions.textContent = totalConditions;

  const elRedundancy = document.getElementById('metric-redundancy-count');
  if (elRedundancy) elRedundancy.textContent = highRiskClasses;

  const elCompletion = document.getElementById('metric-completion');
  if (elCompletion) elCompletion.textContent = `${completionRate}%`;

  const badgeSpells = document.getElementById('tab-badge-spells-count');
  if (badgeSpells) badgeSpells.textContent = totalSpells;

  const badgeClasses = document.getElementById('tab-badge-classes-count');
  if (badgeClasses) badgeClasses.textContent = totalClasses;

  const badgeConditions = document.getElementById('tab-badge-conditions-count');
  if (badgeConditions) badgeConditions.textContent = totalConditions;

  const badgeBacklog = document.getElementById('tab-badge-backlog-count');
  if (badgeBacklog && codexData.featureBacklog) badgeBacklog.textContent = codexData.featureBacklog.length;

  // Breakdown in Spells View
  const statDone = document.getElementById('stat-done-count');
  const statBalance = document.getElementById('stat-balance-count');
  const statTodo = document.getElementById('stat-todo-count');

  if (statDone) statDone.textContent = doneSpells;
  if (statBalance) statBalance.textContent = codexData.spells ? codexData.spells.filter(s => s.status === 'À Équilibrer').length : 0;
  if (statTodo) statTodo.textContent = codexData.spells ? codexData.spells.filter(s => s.status === 'À Concevoir').length : 0;
}

// =============================================================================
// PÔLES TACTIQUES MACRO BAR (VIEW 1)
// =============================================================================
function renderPolesBar() {
  const container = document.getElementById('poles-container');
  if (!container || !codexData.poles) return;

  container.innerHTML = codexData.poles.map(p => {
    // Count classes in this pole
    let count = 0;
    if (p.id === 'all') {
      count = codexData.classes ? codexData.classes.length : 0;
    } else {
      count = codexData.classes ? codexData.classes.filter(c => c.pole === p.id).length : 0;
    }

    const isActive = currentPoleFilter === p.id ? 'active' : '';

    return `
      <button type="button" class="pole-pill-btn ${isActive}" data-pole="${p.id}">
        <span>${p.icon}</span>
        <span>${p.name}</span>
        <span class="pole-count-tag">${count}</span>
      </button>
    `;
  }).join('');

  // Attach click events
  container.querySelectorAll('.pole-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.pole-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPoleFilter = btn.dataset.pole;
      renderClassesView();
    });
  });
}

// =============================================================================
// VIEW 1 : CLASSES & MOYENS D'OBTENTION (CARDS, NETWORK & 16:9 MATRIX)
// =============================================================================
// =============================================================================
// VIEW 1 : CLASSES & MOYENS D'OBTENTION (CARDS, INTERACTIVE NETWORK & MATRIX)
// =============================================================================
function renderClassesView() {
  const cardsContainer = document.getElementById('classes-cards-container');
  const networkContainer = document.getElementById('classes-network-container');
  const matrixTbody = document.getElementById('classes-matrix-tbody');
  const countLabel = document.getElementById('classes-results-count');
  if (!cardsContainer || !matrixTbody) return;

  const searchInput = document.getElementById('class-search-input');
  const query = (searchInput && searchInput.value ? searchInput.value : '').toLowerCase().trim();

  const filtered = (codexData.classes || []).filter(cls => {
    const matchPole = currentPoleFilter === 'all' || cls.pole === currentPoleFilter;
    
    // Requirement type filter
    const prereqCount = (cls.obtainment && cls.obtainment.prereqClasses) ? cls.obtainment.prereqClasses.length : 0;
    let matchReq = true;
    if (currentClassReqFilter === 'base') matchReq = prereqCount === 0;
    if (currentClassReqFilter === 'single') matchReq = prereqCount === 1;
    if (currentClassReqFilter === 'crossed') matchReq = prereqCount >= 2;

    // Risk Filter
    let matchRisk = true;
    if (currentRiskFilter !== 'all') {
      const riskText = (cls.designEvaluation && cls.designEvaluation.redundancyRisk || '').toLowerCase();
      if (currentRiskFilter === 'high') matchRisk = riskText.includes('élevé');
      if (currentRiskFilter === 'medium') matchRisk = riskText.includes('moyen');
      if (currentRiskFilter === 'low') matchRisk = riskText.includes('faible') || riskText.includes('nul');
    }

    const matchQuery = !query ||
      cls.name.toLowerCase().includes(query) ||
      (cls.role && cls.role.toLowerCase().includes(query)) ||
      (cls.signatureWeapon && cls.signatureWeapon.toLowerCase().includes(query)) ||
      (cls.summary && cls.summary.toLowerCase().includes(query)) ||
      (cls.obtainment && cls.obtainment.requirements.toLowerCase().includes(query)) ||
      (cls.designEvaluation && cls.designEvaluation.arbitrage && cls.designEvaluation.arbitrage.toLowerCase().includes(query));

    return matchPole && matchReq && matchRisk && matchQuery;
  });

  if (countLabel) {
    countLabel.textContent = `Affichage de ${filtered.length} classe(s) sur ${codexData.classes.length} répertoriée(s) au Codex`;
  }

  // Helper for risk badge
  function getRiskBadgeHtml(riskText) {
    const text = (riskText || 'Faible').toLowerCase();
    if (text.includes('élevé')) {
      return `<span class="risk-badge risk-high">⚠️ Risque Élevé</span>`;
    } else if (text.includes('moyen')) {
      return `<span class="risk-badge risk-medium">⚡ Risque Moyen</span>`;
    }
    return `<span class="risk-badge risk-low">✅ Validé / Faible</span>`;
  }

  // Helper for status badge
  function getStatusBadgeHtml(statusText) {
    let statusClass = 'badge-validated';
    if (statusText.includes('Équilibrer')) statusClass = 'badge-balance';
    if (statusText.includes('Réflexion') || statusText.includes('Concept') || statusText.includes('Prototype')) {
      statusClass = 'badge-prototype';
    }
    return `<span class="status-badge ${statusClass}">${statusText}</span>`;
  }

  // --- Render Mode 1 : Cards Grid ---
  if (filtered.length === 0) {
    cardsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-dim);">
        Aucune classe ne correspond à vos filtres.
      </div>
    `;
  } else {
    cardsContainer.innerHTML = filtered.map(cls => {
      const spells = (codexData.spells || []).filter(s => s.classId === cls.id);
      const spellsChipsHtml = spells.map(s => 
        `<span class="spell-chip-item" title="${s.type} • ${s.cost}">${s.name}</span>`
      ).join('');

      const poleObj = codexData.poles.find(p => p.id === cls.pole);
      const poleName = poleObj ? `${poleObj.icon} ${poleObj.name}` : cls.pole;

      // Crossed Prerequisites Badges
      const prereqs = cls.obtainment && cls.obtainment.prereqClasses ? cls.obtainment.prereqClasses : [];
      const prereqsHtml = prereqs.length > 0
        ? prereqs.map(p => {
            const parent = (codexData.classes || []).find(c => c.id === p.classId);
            const pName = parent ? parent.name : p.classId;
            return `<span class="prereq-link-badge" data-class-id="${p.classId}" title="Cliquez pour filtrer sur ${pName}">🔗 ${pName} (Niv. ${p.level})</span>`;
          }).join(' <span style="color:var(--text-dim);">&bull;</span> ')
        : '<span style="color:#22c55e; font-size:11px;">🌱 Classe de Départ Mercenaire (Niveau 1)</span>';

      // Unlocked Children Classes
      const unlocked = (codexData.classes || []).filter(c => 
        c.obtainment && c.obtainment.prereqClasses && c.obtainment.prereqClasses.some(p => p.classId === cls.id)
      );
      const unlockedHtml = unlocked.length > 0
        ? unlocked.map(u => `<span class="unlocks-link-badge" data-class-id="${u.id}" title="Permet de débloquer ${u.name}">${u.avatar} ${u.name}</span>`).join(' ')
        : '<span style="color:var(--text-dim); font-size:11px;">Spécialisation Finale</span>';

      return `
        <div class="class-analytic-card voxel-bevel" data-pole="${cls.pole}">
          <div class="card-top-row">
            <div class="class-identity-block">
              <div class="class-avatar-badge">${cls.avatar}</div>
              <div class="class-title-text">
                <h3>${cls.name}</h3>
                <span class="class-pole-tag">${poleName} &bull; ${cls.category}</span>
              </div>
            </div>
            ${getStatusBadgeHtml(cls.status)}
          </div>

          <!-- Weapon Box -->
          <div class="class-weapon-box">
            <span class="weapon-icon">⚔️</span>
            <div>
              <span style="color:var(--text-dim); font-size:10px; display:block;">Arme Requise / Signature :</span>
              <strong class="weapon-name">${cls.signatureWeapon || 'Non spécifiée'}</strong>
            </div>
          </div>

          <p class="class-summary-desc">${cls.summary}</p>

          <!-- Crossed Obtainment Box -->
          <div class="obtainment-box">
            <div class="obtainment-title">🗝️ Déblocage &bull; ${cls.obtainment.method}</div>
            <div class="obtainment-text" style="margin-bottom:8px;"><strong>Prérequis Croisés :</strong><br>${prereqsHtml}</div>
            <div class="obtainment-text" style="margin-bottom:6px;"><strong>Permet de Débloquer Ensuite :</strong><br>${unlockedHtml}</div>
            <div class="obtainment-cost">Coût au 1er déblocage : ${cls.obtainment.unlockCost} (Bascule gratuite au QG)</div>
          </div>

          <!-- Redundancy & Arbitrage Box -->
          <div class="arbitrage-box">
            <div class="risk-header-row">
              <span class="risk-lbl">Rôle &amp; Spécificité :</span>
              ${getRiskBadgeHtml(cls.designEvaluation.redundancyRisk)}
            </div>
            <p class="arbitrage-text">
              <strong>Arbitrage :</strong> ${cls.designEvaluation.arbitrage || cls.designEvaluation.notes || 'Analyse en cours.'}
            </p>
          </div>

          <!-- Attached Spells -->
          <div class="class-spells-preview">
            <div class="spells-preview-title">Sorts Rattachés (5) :</div>
            <div class="spells-chips-wrap">
              ${spellsChipsHtml || '<span style="color:var(--text-dim); font-size:11px;">Aucun sort pour le moment</span>'}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Render Mode 2 : Interactive Crossed Network View ---
  if (networkContainer) {
    const focusClass = (codexData.classes || []).find(c => c.id === selectedNetworkClassId) || (codexData.classes || [])[0];

    let focusPanelHtml = '';
    if (focusClass) {
      const poleObj = codexData.poles.find(p => p.id === focusClass.pole);
      const poleName = poleObj ? `${poleObj.icon} ${poleObj.name}` : focusClass.pole;

      // Parents (Prérequis requis)
      const prereqs = focusClass.obtainment && focusClass.obtainment.prereqClasses ? focusClass.obtainment.prereqClasses : [];
      let parentsHtml = '';
      if (prereqs.length === 0) {
        parentsHtml = `<span style="color:#4ade80; font-family:var(--font-mono); font-size:12px;">🌱 Classe de Départ Mercenaire (Niveau 1, disponible d'office)</span>`;
      } else {
        parentsHtml = prereqs.map(p => {
          const parent = (codexData.classes || []).find(c => c.id === p.classId);
          const pName = parent ? parent.name : p.classId;
          const pAvatar = parent ? parent.avatar : '❖';
          return `
            <button type="button" class="network-conn-pill parent-pill" data-network-focus="${p.classId}" title="Focaliser sur ${pName}">
              <span>${pAvatar}</span>
              <strong>${pName}</strong>
              <span style="color:#fff; opacity:0.8;">(Niv. ${p.level})</span>
            </button>
          `;
        }).join('');
      }

      // Children (Classes débloquées par focusClass)
      const children = (codexData.classes || []).filter(c => 
        c.obtainment && c.obtainment.prereqClasses && c.obtainment.prereqClasses.some(p => p.classId === focusClass.id)
      );
      let childrenHtml = '';
      if (children.length === 0) {
        childrenHtml = `<span style="color:var(--text-dim); font-family:var(--font-mono); font-size:12px;">Spécialisation terminale (ne débloque pas d'autre classe)</span>`;
      } else {
        childrenHtml = children.map(c => {
          const reqInfo = c.obtainment.prereqClasses.find(p => p.classId === focusClass.id);
          const reqLvl = reqInfo ? reqInfo.level : '';
          return `
            <button type="button" class="network-conn-pill child-pill" data-network-focus="${c.id}" title="Focaliser sur ${c.name}">
              <span>${c.avatar}</span>
              <strong>${c.name}</strong>
              <span style="color:#fff; opacity:0.8;">(Requis Niv. ${reqLvl})</span>
            </button>
          `;
        }).join('');
      }

      // Spells for focus class
      const spells = (codexData.spells || []).filter(s => s.classId === focusClass.id);
      const spellsHtml = spells.map(s => `
        <span class="spell-chip-item" title="${s.type} • ${s.cost}">
          <strong>${s.name}</strong> &bull; <em style="color:#93c5fd;">${s.type}</em> (${s.cost})
        </span>
      `).join(' ');

      focusPanelHtml = `
        <div class="network-focus-panel voxel-bevel">
          <div class="network-focus-header">
            <div class="network-focus-identity">
              <div class="network-focus-avatar">${focusClass.avatar}</div>
              <div>
                <h3 class="network-focus-title">${focusClass.name}</h3>
                <span style="font-family:var(--font-mono); font-size:12px; color:var(--accent-gold-light);">
                  ${poleName} &bull; ${focusClass.category}
                </span>
              </div>
            </div>
            <div style="text-align:right;">
              <span style="font-size:11px; color:var(--text-dim); display:block; font-family:var(--font-mono);">Arme Requise :</span>
              <strong style="color:#fff; font-size:13px; font-family:var(--font-mono);">${focusClass.signatureWeapon}</strong>
            </div>
          </div>

          <p style="color:var(--text-muted); font-size:13px; line-height:1.5; margin-bottom:18px;">
            ${focusClass.summary}
          </p>

          <div class="network-focus-columns">
            <!-- Left: Prerequisites to Unlock This Class -->
            <div class="network-conn-box">
              <span class="network-conn-title parents">⬅️ PRÉREQUIS POUR DÉBLOQUER (${prereqs.length}) :</span>
              <div class="network-conn-list">
                ${parentsHtml}
              </div>
            </div>

            <!-- Right: Classes Unlocked by This Class -->
            <div class="network-conn-box">
              <span class="network-conn-title children">➔ DÉBLOQUE ENSUITE DANS L'ARBRE (${children.length}) :</span>
              <div class="network-conn-list">
                ${childrenHtml}
              </div>
            </div>
          </div>

          <div style="margin-top:16px; padding-top:14px; border-top:1px solid #252a36;">
            <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-dim); margin-bottom:8px;">
              SORTS ATTACHÉS À LA CLASSE (${spells.length}) :
            </div>
            <div class="spells-chips-wrap">
              ${spellsHtml}
            </div>
          </div>
        </div>
      `;
    }

    // Categorized groups of classes
    const groups = [
      {
        id: "base",
        title: "🌱 Classes Fondamentales de Départ (Niveau 1)",
        desc: "Accessibles dès le recrutement au QG sans aucun prérequis de classe.",
        filterFn: c => !c.obtainment || !c.obtainment.prereqClasses || c.obtainment.prereqClasses.length === 0
      },
      {
        id: "single",
        title: "⚡ Spécialisations Directes (1 Prérequis de Classe)",
        desc: "Évolutions nécessitant d'avoir atteint un niveau seuil sur une classe de base (Niv. 25).",
        filterFn: c => c.obtainment && c.obtainment.prereqClasses && c.obtainment.prereqClasses.length === 1
      },
      {
        id: "crossed",
        title: "❖ Classes à Prérequis Croisés (2 Classes Conjointes)",
        desc: "Combinaisons tactiques profondes (ex: Paladin = Guerrier 35 + Prêtre 35, Nécromancien = Mage Noir 45 + Invocateur 45).",
        filterFn: c => c.obtainment && c.obtainment.prereqClasses && c.obtainment.prereqClasses.length >= 2
      }
    ];

    const currentFocusId = focusClass ? focusClass.id : '';
    const focusParents = (focusClass && focusClass.obtainment && focusClass.obtainment.prereqClasses)
      ? focusClass.obtainment.prereqClasses.map(p => p.classId)
      : [];
    const focusChildren = (codexData.classes || [])
      .filter(c => c.obtainment && c.obtainment.prereqClasses && c.obtainment.prereqClasses.some(p => p.classId === currentFocusId))
      .map(c => c.id);

    const treeGroupsHtml = groups.map(grp => {
      const groupClasses = filtered.filter(grp.filterFn);
      if (groupClasses.length === 0) return '';

      const cardsHtml = groupClasses.map(cls => {
        const isCurrent = cls.id === currentFocusId;
        const isParent = focusParents.includes(cls.id);
        const isChild = focusChildren.includes(cls.id);

        let highlightClass = '';
        let badgeHighlight = '';
        if (isCurrent) {
          highlightClass = 'is-active-focus';
          badgeHighlight = '<span style="color:#d4af37; font-size:10px; font-family:var(--font-mono); font-weight:700;">❖ FOCUS ACTIF</span>';
        } else if (isParent) {
          highlightClass = 'is-parent-focus';
          badgeHighlight = '<span style="color:#38bdf8; font-size:10px; font-family:var(--font-mono); font-weight:700;">⬅ PRÉREQUIS REQUIS</span>';
        } else if (isChild) {
          highlightClass = 'is-child-focus';
          badgeHighlight = '<span style="color:#fef08a; font-size:10px; font-family:var(--font-mono); font-weight:700;">➔ DÉBLOQUÉE PAR FOCUS</span>';
        }

        const prereqs = cls.obtainment && cls.obtainment.prereqClasses ? cls.obtainment.prereqClasses : [];
        const prereqsText = prereqs.length > 0
          ? prereqs.map(p => {
              const pCls = (codexData.classes || []).find(c => c.id === p.classId);
              return `${pCls ? pCls.name : p.classId} (${p.level})`;
            }).join(' + ')
          : '🌱 Départ Libre';

        return `
          <div class="network-node-card voxel-bevel ${highlightClass}" data-network-focus="${cls.id}">
            <div class="network-node-top">
              <span class="network-node-name">${cls.avatar} ${cls.name}</span>
              ${badgeHighlight || `<span style="font-family:var(--font-mono); font-size:10px; color:var(--text-dim);">${cls.pole}</span>`}
            </div>
            <div style="font-size:11px; color:#cbd5e1; line-height:1.4;">${cls.role}</div>
            <div style="font-size:10px; font-family:var(--font-mono); color:#93c5fd; margin-top:4px;">
              <strong>Exige :</strong> ${prereqsText}
            </div>
            <div style="font-size:10px; color:var(--text-dim); margin-top:2px;">
              Arme : <span style="color:#e2e8f0;">${cls.signatureWeapon}</span>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="network-category-block">
          <div class="network-category-header">
            <div class="network-category-title">
              <span>${grp.title}</span>
              <span class="network-category-count">${groupClasses.length} Classes</span>
            </div>
            <span style="font-size:12px; color:var(--text-dim);">${grp.desc}</span>
          </div>
          <div class="network-classes-grid">
            ${cardsHtml}
          </div>
        </div>
      `;
    }).join('');

    const treeBodyHtml = filtered.length === 0
      ? `<div style="padding: 40px; text-align: center; color: var(--text-dim); background: var(--bg-iron); border: 1px dashed var(--border-steel); border-radius: 4px; margin-bottom: 24px;">Aucune classe ne correspond à vos filtres actuels dans le Réseau Croisé.</div>`
      : treeGroupsHtml;

    networkContainer.innerHTML = `
      ${focusPanelHtml}
      ${treeBodyHtml}
      <div style="background: linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(18,20,26,0.95) 100%); border: 2px solid var(--accent-gold); padding: 24px; border-radius: 4px; text-align: center; margin-top: 28px;">
        <div style="font-family:var(--font-serif); font-size:18px; font-weight:700; color:#fff; margin-bottom:8px;">
          👑 JALON SUPRÊME : DÉBLOCAGE DE L'HYBRIDATION TOTALE (36 / 36 CLASSES)
        </div>
        <p style="color:#e2e8f0; font-size:13px; max-width:820px; margin:0 auto; line-height:1.6;">
          Tant que la troupe n'a pas débloqué la totalité des 36 classes, chaque mercenaire est soumis à la condition matérielle stricte (porter l'arme requise par le sort de sa classe). Dès que la 36ème classe est débloquée, la barrière tombe définitivement : vos mercenaires accèdent à l'<strong>Hybridation Libre</strong> (équiper n'importe quelle arme et lancer n'importe quel sort correspondant sans restriction de classe).
        </p>
      </div>
    `;

    // Attach click events on network cards and pills
    networkContainer.querySelectorAll('[data-network-focus]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = btn.dataset.networkFocus;
        if (targetId && targetId !== selectedNetworkClassId) {
          selectedNetworkClassId = targetId;
          renderClassesView();
          // Smooth scroll to focus panel
          networkContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- Render Mode 3 : Compact Matrix Table (16:9) ---
  if (filtered.length === 0) {
    matrixTbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 30px; color: var(--text-dim);">
          Aucune classe trouvée.
        </td>
      </tr>
    `;
  } else {
    matrixTbody.innerHTML = filtered.map(cls => {
      const spells = (codexData.spells || []).filter(s => s.classId === cls.id);
      const poleObj = codexData.poles.find(p => p.id === cls.pole);
      const poleName = poleObj ? `${poleObj.icon} ${poleObj.name}` : cls.pole;

      return `
        <tr>
          <td>
            <div class="col-class-name">
              <span>${cls.avatar}</span>
              <span>${cls.name}</span>
            </div>
          </td>
          <td>
            <span style="color:var(--accent-gold-light); font-family:var(--font-mono); font-size:11px;">${poleName}</span>
            <div style="font-size:10px; color:var(--text-dim);">${cls.category}</div>
          </td>
          <td style="font-family:var(--font-mono); color:#fff; font-size:11px;">
            ${cls.signatureWeapon || 'N/A'}
          </td>
          <td style="color:var(--text-muted); max-width:240px; line-height:1.4;">
            ${cls.role}
          </td>
          <td>
            <div style="font-size:11px; color:#cbd5e1;">${cls.obtainment.method}</div>
            <div style="font-size:10px; color:var(--text-dim);">${cls.obtainment.requirements}</div>
          </td>
          <td>
            ${getRiskBadgeHtml(cls.designEvaluation.redundancyRisk)}
          </td>
          <td style="color:var(--accent-gold-light); font-size:11px; max-width:260px; line-height:1.4;">
            ${cls.designEvaluation.arbitrage || cls.designEvaluation.notes}
          </td>
          <td>
            <span class="tab-badge">${spells.length} sorts</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Attach click events on prereq and unlock badges to quick-search
  document.querySelectorAll('[data-class-id]').forEach(badge => {
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = badge.dataset.classId;
      const targetCls = (codexData.classes || []).find(c => c.id === targetId);
      if (targetCls && searchInput) {
        searchInput.value = targetCls.name;
        renderClassesView();
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    });
  });
}

// =============================================================================
// VIEW 2 : UNIFIED SPELLS CATALOG (AUDIT & LISTING MODES)
// =============================================================================
function renderSpellsView() {
  const tbody = document.getElementById('spells-tbody');
  const cardsContainer = document.getElementById('spells-cards-container');
  const groupedContainer = document.getElementById('spells-grouped-container');
  const countLabel = document.getElementById('spells-results-count');
  if (!tbody && !cardsContainer && !groupedContainer) return;

  const searchInput = document.getElementById('spell-search-input');
  const query = (searchInput && searchInput.value ? searchInput.value : '').toLowerCase().trim();

  const filtered = (codexData.spells || []).filter(spell => {
    // Status Filter
    const matchStatus = currentSpellStatusFilter === 'all' || spell.status === currentSpellStatusFilter;

    // Type Filter
    let matchType = true;
    if (currentSpellTypeFilter !== 'all') {
      const typeStr = (spell.type + ' ' + (spell.tags || []).join(' ')).toLowerCase();
      if (currentSpellTypeFilter === 'offensif') matchType = typeStr.includes('offensif') || typeStr.includes('dégât') || typeStr.includes('frappe') || typeStr.includes('tir');
      if (currentSpellTypeFilter === 'soin') matchType = typeStr.includes('soin') || typeStr.includes('curati') || typeStr.includes('bouclier') || typeStr.includes('régénération');
      if (currentSpellTypeFilter === 'defense' || currentSpellTypeFilter === 'defensif') matchType = typeStr.includes('défens') || typeStr.includes('blocage') || typeStr.includes('garde') || typeStr.includes('mur') || typeStr.includes('armure');
      if (currentSpellTypeFilter === 'controle') matchType = typeStr.includes('taunt') || typeStr.includes('stun') || typeStr.includes('étourdissement') || typeStr.includes('provocation') || typeStr.includes('repoussement') || typeStr.includes('interruption') || typeStr.includes('ralentissement') || typeStr.includes('gel');
      if (currentSpellTypeFilter === 'alteration' || currentSpellTypeFilter === 'dot') matchType = typeStr.includes('poison') || typeStr.includes('saignement') || typeStr.includes('brûlure') || typeStr.includes('malédiction') || typeStr.includes('dot') || typeStr.includes('altération') || typeStr.includes('vulnérabilité');
      if (currentSpellTypeFilter === 'mobilite') matchType = typeStr.includes('dash') || typeStr.includes('charge') || typeStr.includes('téléportation') || typeStr.includes('repli');
    }

    // Text Query
    const matchQuery = !query ||
      spell.name.toLowerCase().includes(query) ||
      spell.className.toLowerCase().includes(query) ||
      spell.type.toLowerCase().includes(query) ||
      spell.desc.toLowerCase().includes(query) ||
      (spell.tags && spell.tags.some(t => t.toLowerCase().includes(query)));

    return matchStatus && matchType && matchQuery;
  });

  if (countLabel) {
    countLabel.textContent = `Affichage de ${filtered.length} sort(s) sur ${codexData.spells.length} au catalogue`;
  }

  // Status Badge Helper
  function getSpellStatusBadge(status) {
    let statusClass = 'badge-validated';
    if (status === 'À Équilibrer') statusClass = 'badge-balance';
    if (status === 'À Concevoir') statusClass = 'badge-prototype';
    return `<span class="status-badge ${statusClass}">${status}</span>`;
  }

  // --- Mode A : Dense Table ---
  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 30px; color: var(--text-dim);">
          Aucun sort ne correspond à ces critères de recherche.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = filtered.map(s => {
      const tagsHtml = (s.tags || []).map(t => `<span class="mini-tag">${t}</span>`).join('');
      const targetClass = codexData.classes.find(c => c.id === s.classId);
      const poleName = s.pole || (targetClass ? targetClass.pole : 'martiale');

      return `
        <tr>
          <td class="spell-name-cell">
            <strong>${s.name}</strong>
            <span class="spell-range-tag">ID : ${s.id}</span>
          </td>
          <td class="spell-class-cell">
            <strong>${s.className}</strong>
            <div style="font-size:10px; color:var(--text-dim); text-transform:capitalize;">Pôle : ${poleName}</div>
          </td>
          <td>${s.type}</td>
          <td>
            <div class="spell-cost-cell">${s.cost}</div>
            <div class="spell-cd-cell">Recharge : ${s.cooldown}</div>
          </td>
          <td style="font-family:var(--font-mono); font-size:11px; color:#cbd5e1;">${s.range || 'Mêlée'}</td>
          <td style="max-width: 320px; color: var(--text-muted); line-height: 1.45;">${s.desc}</td>
          <td>
            <div class="spell-tags-cell">${tagsHtml}</div>
          </td>
          <td>
            ${getSpellStatusBadge(s.status)}
          </td>
        </tr>
      `;
    }).join('');
  }

  // --- Mode B : Cards Grid ---
  cardsContainer.innerHTML = filtered.map(s => {
    const tagsHtml = (s.tags || []).map(t => `<span class="mini-tag">${t}</span>`).join('');
    return `
      <div class="spell-analytic-card voxel-bevel">
        <div class="spell-card-header">
          <h4>${s.name}</h4>
          ${getSpellStatusBadge(s.status)}
        </div>
        <div class="spell-card-meta">
          <span style="color:var(--accent-gold-light);">${s.className}</span>
          <span>${s.type}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-family:var(--font-mono); font-size:11px;">
          <span style="color:var(--accent-blue);">${s.cost}</span>
          <span>CD : ${s.cooldown}</span>
          <span style="color:var(--text-dim);">${s.range}</span>
        </div>
        <p class="spell-card-desc">${s.desc}</p>
        <div class="spell-tags-cell" style="margin-top:auto;">${tagsHtml}</div>
      </div>
    `;
  }).join('');

  // --- Mode C : Grouped by Class ---
  const classesWithSpells = {};
  filtered.forEach(s => {
    if (!classesWithSpells[s.className]) {
      classesWithSpells[s.className] = {
        classId: s.classId,
        className: s.className,
        spells: []
      };
    }
    classesWithSpells[s.className].spells.push(s);
  });

  const groupKeys = Object.keys(classesWithSpells);
  if (groupKeys.length === 0) {
    groupedContainer.innerHTML = `<div style="padding:30px; text-align:center; color:var(--text-dim);">Aucun sort trouvé.</div>`;
  } else {
    groupedContainer.innerHTML = groupKeys.map(key => {
      const group = classesWithSpells[key];
      const clsObj = codexData.classes.find(c => c.id === group.classId);
      const avatar = clsObj ? clsObj.avatar : '⚔️';

      const miniCardsHtml = group.spells.map(s => `
        <div class="spell-mini-card">
          <div class="spell-mini-title">
            <strong>${s.name}</strong>
            ${getSpellStatusBadge(s.status)}
          </div>
          <div class="spell-mini-cost">${s.type} &bull; ${s.cost} (CD: ${s.cooldown})</div>
          <div class="spell-mini-desc">${s.desc}</div>
        </div>
      `).join('');

      return `
        <div class="class-spell-group-block voxel-bevel">
          <div class="class-spell-group-header">
            <div class="class-spell-group-title">
              <span>${avatar}</span>
              <span>${group.className}</span>
              <span class="tab-badge">${group.spells.length} sort(s)</span>
            </div>
          </div>
          <div class="class-spells-inline-grid">
            ${miniCardsHtml}
          </div>
        </div>
      `;
    }).join('');
  }
}

// =============================================================================
// VIEW 3 : ARBITRAGES DE REDONDANCES & BACKLOG ROADMAP
// =============================================================================
function renderBrainstormView() {
  // Render Sub-Section 1: Arbitrages
  const arbContainer = document.getElementById('arbitrages-container');
  if (arbContainer && codexData.brainstormBacklog) {
    arbContainer.innerHTML = codexData.brainstormBacklog.map(item => {
      const skillsHtml = (item.suggestedSkills || []).map(sk => `<span class="spell-chip-item">${sk}</span>`).join('');
      
      let statusClass = 'badge-balance';
      if (item.status === 'Validé') statusClass = 'badge-validated';
      if (item.status === 'À Arbitrer') statusClass = 'badge-prototype';

      return `
        <div class="arbitrage-card voxel-bevel">
          <div class="arbitrage-header">
            <div>
              <h4>${item.title}</h4>
              <span style="font-family:var(--font-mono); font-size:10px; color:var(--text-dim); text-transform:uppercase;">
                ${item.type}
              </span>
            </div>
            <span class="status-badge ${statusClass}">${item.status}</span>
          </div>
          <p class="arbitrage-desc">${item.description}</p>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px;">
            ${skillsHtml}
          </div>
          <div class="arbitrage-verdict">
            <strong>Proposition d'Arbitrage :</strong> ${item.verdict || 'Analyse en cours.'}
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Sub-Section 2: Feature Backlog
  const featContainer = document.getElementById('backlog-features-container');
  if (featContainer && codexData.featureBacklog) {
    const filteredFeatures = codexData.featureBacklog.filter(f => {
      if (currentBacklogCatFilter === 'all') return true;
      return f.category.toLowerCase().includes(currentBacklogCatFilter.toLowerCase());
    });

    if (filteredFeatures.length === 0) {
      featContainer.innerHTML = `<div style="grid-column:1/-1; padding:30px; text-align:center; color:var(--text-dim);">Aucune fonctionnalité pour cette catégorie.</div>`;
    } else {
      featContainer.innerHTML = filteredFeatures.map(f => {
        let statusBadge = `<span class="status-badge badge-prototype">${f.status}</span>`;
        if (f.status.includes('Validé')) statusBadge = `<span class="status-badge badge-validated">${f.status}</span>`;
        if (f.status.includes('Conception')) statusBadge = `<span class="status-badge badge-balance">${f.status}</span>`;

        const tagsHtml = (f.tags || []).map(t => `<span class="mini-tag">${t}</span>`).join('');

        return `
          <div class="feature-card voxel-bevel">
            <div class="feature-header">
              <h4>${f.title}</h4>
              ${statusBadge}
            </div>
            <div class="feature-meta-row">
              <span class="feature-cat-tag">📁 ${f.category}</span>
              <span style="color:var(--accent-amber); font-family:var(--font-mono); font-size:10px;">Priorité : ${f.priority}</span>
            </div>
            <p class="feature-desc">${f.description}</p>
            <div class="feature-rule-box">
              <strong>Règle / Impact Game Design :</strong> ${f.rule}
            </div>
            <div class="spell-tags-cell" style="margin-top:auto;">
              ${tagsHtml}
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

// =============================================================================
// VIEW 4 : EDITOR & JSON EXPORT
// =============================================================================
function renderEditorFormClasses() {
  const select = document.getElementById('new-spell-class');
  if (!select || !codexData.classes) return;

  select.innerHTML = codexData.classes.map(c => 
    `<option value="${c.id}">${c.name} (${c.category})</option>`
  ).join('');
}

function updateJsonPreview() {
  const codeElem = document.getElementById('json-preview-code');
  if (codeElem && codexData) {
    codeElem.textContent = JSON.stringify(codexData, null, 2);
  }
}

function setupEditor() {
  const btnTypeSpell = document.getElementById('form-type-spell');
  const btnTypeClass = document.getElementById('form-type-class');
  const formSpell = document.getElementById('form-new-spell');
  const formClass = document.getElementById('form-new-class');

  if (btnTypeSpell && btnTypeClass) {
    btnTypeSpell.addEventListener('click', () => {
      btnTypeSpell.classList.add('active');
      btnTypeClass.classList.remove('active');
      formSpell.style.display = 'flex';
      formClass.style.display = 'none';
    });

    btnTypeClass.addEventListener('click', () => {
      btnTypeClass.classList.add('active');
      btnTypeSpell.classList.remove('active');
      formClass.style.display = 'flex';
      formSpell.style.display = 'none';
    });
  }

  // Toggle JSON Viewer Collapse
  const btnToggleJson = document.getElementById('btn-toggle-json');
  const jsonBox = document.getElementById('json-viewer-box');
  if (btnToggleJson && jsonBox) {
    let isCollapsed = false;
    btnToggleJson.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      jsonBox.classList.toggle('collapsed', isCollapsed);
      btnToggleJson.textContent = isCollapsed ? 'Afficher' : 'Masquer';
    });
  }

  // Submit Spell
  if (formSpell) {
    formSpell.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-spell-name').value.trim();
      const classId = document.getElementById('new-spell-class').value;
      const type = document.getElementById('new-spell-type').value.trim() || 'Tactique';
      const cost = document.getElementById('new-spell-cost').value.trim() || '0 Éther';
      const cooldown = document.getElementById('new-spell-cooldown').value.trim() || 'Instantané';
      const desc = document.getElementById('new-spell-desc').value.trim() || 'Description en cours de conception.';
      const rawTags = document.getElementById('new-spell-tags').value.trim();
      const status = document.getElementById('new-spell-status').value;

      const targetClass = codexData.classes.find(c => c.id === classId);
      const className = targetClass ? targetClass.name : classId;
      const pole = targetClass ? targetClass.pole : 'martiale';

      const tags = rawTags ? rawTags.split(',').map(t => t.trim()).filter(Boolean) : [type];
      const newId = `${classId}_${Date.now()}`;

      const newSpell = {
        id: newId,
        name,
        classId,
        className,
        pole,
        branch: targetClass ? targetClass.branch : 'martiale',
        type,
        cost,
        cooldown,
        range: 'Variable',
        desc,
        tags,
        status
      };

      codexData.spells.push(newSpell);
      if (targetClass && targetClass.skillIds) {
        targetClass.skillIds.push(newId);
      }

      formSpell.reset();
      populateMetrics();
      renderClassesView();
      renderSpellsView();
      updateJsonPreview();
      alert(`Sort "${name}" ajouté avec succès au catalogue !`);
    });
  }

  // Submit Class
  if (formClass) {
    formClass.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-class-name').value.trim();
      const avatar = document.getElementById('new-class-avatar').value.trim() || '🛡️';
      const pole = document.getElementById('new-class-pole').value;
      const tier = parseInt(document.getElementById('new-class-tier').value, 10);
      const weapon = document.getElementById('new-class-weapon').value.trim() || 'Arme à définir';
      const obtainmentReq = document.getElementById('new-class-obtainment').value.trim() || 'Conditions à définir';
      const summary = document.getElementById('new-class-summary').value.trim() || 'Rôle en cours d\'élaboration.';
      const arbitrage = document.getElementById('new-class-arbitrage').value.trim() || 'Analyse en cours.';

      const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');

      const newClass = {
        id,
        name,
        pole,
        branch: pole === 'hybride' ? 'hybride' : 'martiale',
        tier,
        category: tier === 1 ? 'Classe de Base' : (pole === 'hybride' ? 'Spécialisation Hybride' : 'Concept / Spécialisation'),
        avatar,
        role: summary.slice(0, 50),
        summary,
        signatureWeapon: weapon,
        resource: "Éther",
        obtainment: {
          method: "Déblocage de Classe",
          requirements: obtainmentReq,
          prereqClasses: [],
          unlockCost: "À calibrer",
          difficulty: "Modérée"
        },
        status: "En Réflexion / Concept",
        designEvaluation: {
          utility: "Nouvelle proposition",
          redundancyRisk: "Moyen",
          arbitrage: arbitrage,
          notes: "Soumise depuis le créateur studio."
        },
        skillIds: []
      };

      codexData.classes.push(newClass);
      formClass.reset();
      populateMetrics();
      renderPolesBar();
      renderClassesView();
      renderEditorFormClasses();
      updateJsonPreview();
      alert(`Classe "${name}" créée avec succès dans le Codex !`);
    });
  }

  // Download JSON
  const btnDownload = document.getElementById('btn-download-json');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(codexData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "data.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  // Copy JSON
  const btnCopy = document.getElementById('btn-copy-json');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      if (!codexData) return;
      navigator.clipboard.writeText(JSON.stringify(codexData, null, 2)).then(() => {
        btnCopy.textContent = 'Copié !';
        setTimeout(() => btnCopy.textContent = 'Copier', 2000);
      });
    });
  }
}

// =============================================================================
// NAVIGATION & CONTROLS SETUP
// =============================================================================
function setupTabs() {
  const tabs = document.querySelectorAll('.view-tab-btn');
  const views = document.querySelectorAll('.app-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const viewKey = tab.dataset.view;
      tabs.forEach(t => t.classList.remove('active'));
      views.forEach(v => v.classList.remove('active-view'));

      tab.classList.add('active');
      const targetView = document.getElementById(`view-${viewKey}`);
      if (targetView) targetView.classList.add('active-view');
    });
  });
}

function setupClassControls() {
  const searchInput = document.getElementById('class-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderClassesView());
  }

  // Requirement Filter Pills (Base, Single, Crossed)
  const reqPills = document.querySelectorAll('.filter-pill-req');
  reqPills.forEach(pill => {
    pill.addEventListener('click', () => {
      reqPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentClassReqFilter = pill.dataset.req;
      renderClassesView();
    });
  });

  // Risk Filter Pills
  const riskPills = document.querySelectorAll('.filter-pill-risk');
  riskPills.forEach(pill => {
    pill.addEventListener('click', () => {
      riskPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentRiskFilter = pill.dataset.risk;
      renderClassesView();
    });
  });

  // Mode Toggle (Cards vs Network Tree vs Matrix Table)
  const btnModeCards = document.getElementById('btn-mode-cards');
  const btnModeNetwork = document.getElementById('btn-mode-network');
  const btnModeMatrix = document.getElementById('btn-mode-matrix');
  const cardsContainer = document.getElementById('classes-cards-container');
  const networkContainer = document.getElementById('classes-network-container');
  const matrixTableContainer = document.getElementById('classes-matrix-table-container');

  function setClassViewMode(mode) {
    classesViewMode = mode;
    if (btnModeCards) btnModeCards.classList.toggle('active', mode === 'cards');
    if (btnModeNetwork) btnModeNetwork.classList.toggle('active', mode === 'network');
    if (btnModeMatrix) btnModeMatrix.classList.toggle('active', mode === 'matrix');

    if (cardsContainer) cardsContainer.style.display = mode === 'cards' ? 'grid' : 'none';
    if (networkContainer) networkContainer.style.display = mode === 'network' ? 'block' : 'none';
    if (matrixTableContainer) matrixTableContainer.style.display = mode === 'matrix' ? 'block' : 'none';

    renderClassesView();
  }

  if (btnModeCards) btnModeCards.addEventListener('click', () => setClassViewMode('cards'));
  if (btnModeNetwork) btnModeNetwork.addEventListener('click', () => setClassViewMode('network'));
  if (btnModeMatrix) btnModeMatrix.addEventListener('click', () => setClassViewMode('matrix'));
}

// =============================================================================
// CONDITIONS DE GAMBITS VIEW & CONTROLS
// =============================================================================
function renderConditionsView() {
  const cardsContainer = document.getElementById('conditions-cards-container');
  const tbody = document.getElementById('conditions-tbody');
  const countLabel = document.getElementById('conditions-results-count');
  if (!cardsContainer && !tbody) return;

  const searchInput = document.getElementById('condition-search-input');
  const query = (searchInput && searchInput.value ? searchInput.value : '').toLowerCase().trim();

  const conditions = codexData.gambitConditions || [];
  const filtered = conditions.filter(cond => {
    const matchCat = currentConditionCatFilter === 'all' || cond.category === currentConditionCatFilter;
    const matchTarget = currentConditionTargetFilter === 'all' || cond.target === currentConditionTargetFilter;
    const matchQuery = !query ||
      cond.name.toLowerCase().includes(query) ||
      cond.description.toLowerCase().includes(query) ||
      (cond.example && cond.example.toLowerCase().includes(query)) ||
      (cond.tags && cond.tags.some(t => t.toLowerCase().includes(query)));

    return matchCat && matchTarget && matchQuery;
  });

  if (countLabel) {
    countLabel.textContent = `Affichage de ${filtered.length} condition(s) sur ${conditions.length} déclencheur(s) répertorié(s)`;
  }

  // Render Mode 1 : Cards
  if (cardsContainer) {
    if (filtered.length === 0) {
      cardsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-dim);">
          Aucune condition de Gambit ne correspond à vos critères de recherche.
        </div>
      `;
    } else {
      cardsContainer.innerHTML = filtered.map(cond => {
        const tagsHtml = (cond.tags || []).map(t => `<span class="condition-tag-item">#${t}</span>`).join(' ');

        return `
          <div class="condition-card voxel-bevel" data-cat="${cond.category}">
            <div class="condition-header">
              <div>
                <span class="condition-id-tag">[${cond.id}]</span>
                <h3 class="condition-name">${cond.name}</h3>
              </div>
              <span class="condition-cat-badge cat-${cond.category}">${cond.category}</span>
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <span class="condition-target-badge">🎯 Cible : ${cond.target}</span>
            </div>

            <p class="condition-desc">${cond.description}</p>

            <div class="gambit-syntax-box">
              <div style="color:var(--text-dim); font-size:10px; margin-bottom:3px;">SYNTAXE GAMBIT :</div>
              <div class="gambit-syntax-line">
                <span>SI [${cond.name}]</span>
                <span class="gambit-syntax-arrow">➔</span>
                <span style="color:#93c5fd;">${cond.example}</span>
              </div>
            </div>

            <div class="condition-tags-row">
              ${tagsHtml}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Render Mode 2 : Compact Table
  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 30px; color: var(--text-dim);">
            Aucune condition trouvée.
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = filtered.map(cond => {
        const tagsHtml = (cond.tags || []).map(t => `<span class="condition-tag-item">#${t}</span>`).join(' ');

        return `
          <tr>
            <td>
              <div style="font-family:var(--font-mono); font-size:11px; color:#94a3b8;">${cond.id}</div>
              <span class="condition-cat-badge cat-${cond.category}">${cond.category}</span>
            </td>
            <td>
              <strong style="color:#fff; font-family:var(--font-serif); font-size:13px;">${cond.name}</strong>
            </td>
            <td>
              <span class="condition-target-badge">${cond.target}</span>
            </td>
            <td style="color:var(--text-muted); font-size:12px; line-height:1.4;">
              ${cond.description}
            </td>
            <td style="font-family:var(--font-mono); font-size:11px; color:#38bdf8;">
              ${cond.example}
            </td>
            <td>
              <div style="display:flex; flex-wrap:wrap; gap:4px;">
                ${tagsHtml}
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }
}

function setupConditionsControls() {
  const searchInput = document.getElementById('condition-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderConditionsView());
  }

  // Category Filter Pills
  const catContainer = document.getElementById('conditions-categories-container');
  if (catContainer) {
    const catPills = catContainer.querySelectorAll('.pole-pill-btn');
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentConditionCatFilter = pill.dataset.cat;
        renderConditionsView();
      });
    });
  }

  // Target Filter Pills
  const targetPills = document.querySelectorAll('.toolbar-filters .filter-pill-type');
  targetPills.forEach(pill => {
    if (pill.closest('#view-conditions')) {
      pill.addEventListener('click', () => {
        targetPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentConditionTargetFilter = pill.dataset.target;
        renderConditionsView();
      });
    }
  });

  // View Mode Toggle (Cards vs Table)
  const btnCards = document.getElementById('btn-view-cond-cards');
  const btnTable = document.getElementById('btn-view-cond-table');
  const cardsContainer = document.getElementById('conditions-cards-container');
  const tableContainer = document.getElementById('conditions-table-container');

  if (btnCards && btnTable && cardsContainer && tableContainer) {
    btnCards.addEventListener('click', () => {
      conditionsViewMode = 'cards';
      btnCards.classList.add('active');
      btnTable.classList.remove('active');
      cardsContainer.style.display = 'grid';
      tableContainer.style.display = 'none';
      renderConditionsView();
    });

    btnTable.addEventListener('click', () => {
      conditionsViewMode = 'table';
      btnTable.classList.add('active');
      btnCards.classList.remove('active');
      cardsContainer.style.display = 'none';
      tableContainer.style.display = 'block';
      renderConditionsView();
    });
  }
}

function setupSpellControls() {
  const searchInput = document.getElementById('spell-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderSpellsView());
  }

  // Status Filter Pills
  const statusPills = document.querySelectorAll('.filter-pill-status');
  statusPills.forEach(pill => {
    pill.addEventListener('click', () => {
      statusPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentSpellStatusFilter = pill.dataset.status;
      renderSpellsView();
    });
  });

  // Type Filter Pills
  const typePills = document.querySelectorAll('.filter-pill-type');
  typePills.forEach(pill => {
    pill.addEventListener('click', () => {
      typePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentSpellTypeFilter = pill.dataset.type;
      renderSpellsView();
    });
  });

  // Type Filter Select (if present)
  const typeSelect = document.getElementById('spell-type-filter');
  if (typeSelect) {
    typeSelect.addEventListener('change', () => {
      currentSpellTypeFilter = typeSelect.value;
      renderSpellsView();
    });
  }

  // Spells View Mode (Table vs Cards vs Grouped)
  const btnTable = document.getElementById('btn-spells-table');
  const btnCards = document.getElementById('btn-spells-cards');
  const btnGrouped = document.getElementById('btn-spells-grouped');

  const tableContainer = document.getElementById('spells-table-container');
  const cardsContainer = document.getElementById('spells-cards-container');
  const groupedContainer = document.getElementById('spells-grouped-container');

  function updateSpellViewDisplay(mode) {
    spellsViewMode = mode;
    btnTable.classList.toggle('active', mode === 'table');
    btnCards.classList.toggle('active', mode === 'cards');
    btnGrouped.classList.toggle('active', mode === 'grouped');

    tableContainer.style.display = mode === 'table' ? 'block' : 'none';
    cardsContainer.style.display = mode === 'cards' ? 'grid' : 'none';
    groupedContainer.style.display = mode === 'grouped' ? 'flex' : 'none';

    renderSpellsView();
  }

  if (btnTable && btnCards && btnGrouped) {
    btnTable.addEventListener('click', () => updateSpellViewDisplay('table'));
    btnCards.addEventListener('click', () => updateSpellViewDisplay('cards'));
    btnGrouped.addEventListener('click', () => updateSpellViewDisplay('grouped'));
  }
}

function setupBrainstormControls() {
  const btnArbitrages = document.getElementById('btn-show-arbitrages');
  const btnBacklog = document.getElementById('btn-show-backlog');
  const secArbitrages = document.getElementById('section-arbitrages');
  const secBacklog = document.getElementById('section-backlog');

  if (btnArbitrages && btnBacklog && secArbitrages && secBacklog) {
    btnArbitrages.addEventListener('click', () => {
      currentBrainstormSection = 'arbitrages';
      btnArbitrages.classList.add('active');
      btnBacklog.classList.remove('active');
      secArbitrages.style.display = 'block';
      secBacklog.style.display = 'none';
      renderBrainstormView();
    });

    btnBacklog.addEventListener('click', () => {
      currentBrainstormSection = 'backlog';
      btnBacklog.classList.add('active');
      btnArbitrages.classList.remove('active');
      secArbitrages.style.display = 'none';
      secBacklog.style.display = 'block';
      renderBrainstormView();
    });
  }

  // Category filter pills for Backlog
  const pills = document.querySelectorAll('.filter-pill-backlog');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentBacklogCatFilter = pill.dataset.cat;
      renderBrainstormView();
    });
  });
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  initCodexStudio();
});
