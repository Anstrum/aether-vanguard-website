/**
 * ANTIGRAVITY — RPG TACTIQUE VOXEL
 * Client Application Logic: Grab-to-Pan Tree Viewport, Sticky Edge Overflow Animations,
 * Interactive Grimoire & Class Sheet Updates, Web Audio Micro-Interactions.
 */

// =============================================================================
// 1. DATA CODEX : LES 7 CLASSES DE BASE & AVANCÉES
// =============================================================================
const CLASSES_DATA = {
  guerrier: {
    name: "Guerrier",
    category: "Classe de Base",
    tier: "Pallier I (Niv. 1)",
    role: "Combattant de Première Ligne • Contrôle & Provocation",
    avatar: "⚔️",
    lore: "Piliers de l'escouade formés au corps-à-corps, les Guerriers mènent la charge, absorbent les chocs initiaux et verrouillent l'attention ennemie pour protéger leurs alliés en retrait.",
    weapon: "Épée Bâtarde & Bouclier Rond",
    resource: "Rage & Éther Corporel",
    prereq: "Classe de Départ (Niveau 1)",
    gauges: { def: 80, atk: 75, mob: 55 },
    skills: [
      {
        name: "Attaque de Base",
        type: "Attaque Normale",
        typeTag: "tag-atk",
        ether: "0 Éther",
        cooldown: "Instantané",
        desc: "Coup d'arme en mêlée infligeant des dégâts physiques standards sans aucun coût de ressource.",
        chips: [
          { text: "⚔️ Dégâts Physiques", class: "chip-amber" },
          { text: "⚪ Sans Coût", class: "chip-blue" }
        ]
      },
      {
        name: "Taunt",
        type: "Provocation & Contrôle",
        typeTag: "tag-def",
        ether: "15 Éther",
        cooldown: "12s Recharge",
        desc: "Force les ennemis ciblés ou à portée courte à focaliser toutes leurs attaques sur le Guerrier pendant une durée définie.",
        chips: [
          { text: "⛓️ Taunt Forcé", class: "chip-red" },
          { text: "🛡️ Menace Maximale", class: "chip-amber" }
        ]
      },
      {
        name: "Cri de Guerre",
        type: "Soutien & Démoralisation",
        typeTag: "tag-buff",
        ether: "20 Éther",
        cooldown: "16s Recharge",
        desc: "Émet une onde sonore puissante qui confère un bonus de dégâts et de moral aux alliés proches tout en déstabilisant brièvement les ennemis.",
        chips: [
          { text: "✨ Bonus Dégâts & Moral", class: "chip-amber" },
          { text: "💫 Déstabilisation Ennemie", class: "chip-blue" }
        ]
      },
      {
        name: "Charge",
        type: "Engagement Rectiligne",
        typeTag: "tag-atk",
        ether: "15 Éther",
        cooldown: "8s Recharge",
        desc: "Ruée rectiligne vers un ennemi éloigné, comblant la distance instantanément et infligeant un léger étourdissement à l'impact.",
        chips: [
          { text: "⚡ Rapprochement Immédiat", class: "chip-blue" },
          { text: "💥 Léger Étourdissement", class: "chip-amber" }
        ]
      },
      {
        name: "Frappe Lourde",
        type: "Fracas d'Armure",
        typeTag: "tag-atk",
        ether: "25 Éther",
        cooldown: "10s Recharge",
        desc: "Attaque puissante avec un temps de préparation plus long, infligeant de lourds dégâts physiques et brisant une partie de l'armure de la cible.",
        chips: [
          { text: "🔨 Dégâts Lourds", class: "chip-red" },
          { text: "🛡️ Brise-Armure", class: "chip-amber" }
        ]
      }
    ]
  },

  sentinelle: {
    name: "Sentinelle",
    category: "Spécialisation Avancée",
    tier: "Pallier II (Niv. 20)",
    role: "Forteresse Vivante • Contrôle & Absorption",
    avatar: "🛡️",
    lore: "Évolution directe du Guerrier, la Sentinelle sacrifie une part de sa vélocité offensive au profit d'un pavois massif capable d'absorber les coups les plus violents et d'infliger un déséquilibre mortel aux assaillants.",
    weapon: "Pavois d'Acier & Masse de Brèche",
    resource: "Stabilité & Éther Martiale",
    prereq: "Guerrier Niveau 20",
    gauges: { def: 95, atk: 65, mob: 40 },
    skills: [
      {
        name: "Attaque de Base",
        type: "Attaque Gardée",
        typeTag: "tag-atk",
        ether: "0 Éther",
        cooldown: "Instantané",
        desc: "Frappe défensive à l'arme à une main tout en maintenant la garde levée pour minimiser l'exposition.",
        chips: [
          { text: "⚔️ Frappe Contrôlée", class: "chip-amber" },
          { text: "🛡️ Garde Maintenue", class: "chip-blue" }
        ]
      },
      {
        name: "Blocage Partiel",
        type: "Posture Défensive Active",
        typeTag: "tag-def",
        ether: "15 Éther",
        cooldown: "6s Recharge",
        desc: "Posture active réduisant considérablement un pourcentage des dégâts subis de face contre une perte d'endurance/stamina.",
        chips: [
          { text: "🛡️ Réduction Frontale Massive", class: "chip-amber" },
          { text: "⚡ Consommation Stamina", class: "chip-blue" }
        ]
      },
      {
        name: "Buff de Défense",
        type: "Aura de Renfort",
        typeTag: "tag-buff",
        ether: "25 Éther",
        cooldown: "18s Recharge",
        desc: "Renforce l'armure et les résistances magiques de la Sentinelle et des alliés adjacents pendant plusieurs tours.",
        chips: [
          { text: "✨ Armure & Résistances Magiques", class: "chip-blue" },
          { text: "👥 Synergie d'Escouade", class: "chip-amber" }
        ]
      },
      {
        name: "Bash au Bouclier",
        type: "Impact & Répulsion",
        typeTag: "tag-atk",
        ether: "20 Éther",
        cooldown: "8s Recharge",
        desc: "Coup violent asséné avec le pavois, repoussant la cible de quelques cases et lui infligeant l'état Déséquilibre.",
        chips: [
          { text: "💥 Déséquilibre Majeur", class: "chip-red" },
          { text: "⚓ Répulsion Voxel", class: "chip-blue" }
        ]
      }
    ]
  },

  archer: {
    name: "Archer",
    category: "Classe de Base",
    tier: "Pallier I (Niv. 1)",
    role: "Tir de Précision • Mobilité & Volée",
    avatar: "🏹",
    lore: "Tireurs d'élite véloces maîtrisant les angles morts du champ de bataille. Ils harcèlent à moyenne et longue distance, entravent les avancées et préparent les brèches pour leurs compagnons.",
    weapon: "Grand Arc en If Ciselé",
    resource: "Concentration & Éther d'Acrobate",
    prereq: "Classe de Départ (Niveau 1)",
    gauges: { def: 40, atk: 85, mob: 85 },
    skills: [
      {
        name: "Attaque de Base",
        type: "Tir Standard",
        typeTag: "tag-atk",
        ether: "0 Éther",
        cooldown: "Instantané",
        desc: "Tir d'une flèche standard à moyenne portée sans coût de ressource.",
        chips: [
          { text: "🏹 Tir Moyen Portée", class: "chip-amber" },
          { text: "⚪ Sans Coût", class: "chip-blue" }
        ]
      },
      {
        name: "Tir Ciblé",
        type: "Visée Minutieuse",
        typeTag: "tag-atk",
        ether: "20 Éther",
        cooldown: "6s Recharge",
        desc: "Visée minutieuse augmentant considérablement la portée, les dégâts et les chances de coup critique au détriment de la mobilité.",
        chips: [
          { text: "🎯 Portée & Dégâts Maximisés", class: "chip-red" },
          { text: "💥 Critique Élevé", class: "chip-amber" },
          { text: "⏳ Mobilité Réduite", class: "chip-blue" }
        ]
      },
      {
        name: "Volée de Flèches",
        type: "Pluie de Projectiles",
        typeTag: "tag-atk",
        ether: "30 Éther",
        cooldown: "12s Recharge",
        desc: "Fait pleuvoir un groupe de projectiles sur une zone ciblée au sol, infligeant des dégâts physiques à toutes les cibles touchées.",
        chips: [
          { text: "🌧️ Dégâts de Zone", class: "chip-red" },
          { text: "👥 Cibles Multiples", class: "chip-amber" }
        ]
      },
      {
        name: "Dash Arrière",
        type: "Manœuvre Évasive",
        typeTag: "tag-buff",
        ether: "15 Éther",
        cooldown: "8s Recharge",
        desc: "Propulsion rapide en arrière pour rompre le contact avec la mêlée et regagner une distance de sécurité tactique.",
        chips: [
          { text: "💨 Dégagement Rapide", class: "chip-blue" },
          { text: "🛡️ Rupture de Contact", class: "chip-green" }
        ]
      },
      {
        name: "Tir de Suppression",
        type: "Tir d'Entrave",
        typeTag: "tag-atk",
        ether: "20 Éther",
        cooldown: "10s Recharge",
        desc: "Tire une flèche lourde qui ralentit fortement la vitesse de déplacement et réduit la vitesse d'attaque de l'adversaire.",
        chips: [
          { text: "❄️ Ralentissement Majeur", class: "chip-blue" },
          { text: "⏱️ Réduction Vitesse d'Attaque", class: "chip-amber" }
        ]
      }
    ]
  },

  arbaletrier: {
    name: "Arbalétrier",
    category: "Spécialisation Avancée",
    tier: "Pallier II (Niv. 20)",
    role: "Balistique Lourde • Recharges Tactiques Préparées",
    avatar: "⚙️",
    lore: "Évolution tactique de l'Archer armé d'une arbalète de siège à manivelle. L'Arbalétrier charge délibérément des munitions spécialisées pour répondre aux vulnérabilités précises de l'ennemi.",
    weapon: "Arbalète de Siège & Trépied Métallique",
    resource: "Munitions Préparées & Éther",
    prereq: "Archer Niveau 20",
    gauges: { def: 55, atk: 92, mob: 50 },
    skills: [
      {
        name: "Attaque de Base",
        type: "Tir Tendu",
        typeTag: "tag-atk",
        ether: "0 Éther",
        cooldown: "Instantané",
        desc: "Tir d'un carreau tendu standard infligeant de bons dégâts physiques à moyenne portée.",
        chips: [
          { text: "⚙️ Carreau Tendu", class: "chip-amber" },
          { text: "🎯 Dégâts Réguliers", class: "chip-blue" }
        ]
      },
      {
        name: "Recharge de Base",
        type: "Mécanisme Tactique",
        typeTag: "tag-buff",
        ether: "5 Éther",
        cooldown: "2s Recharge",
        desc: "Réarmement mécanique rapide de l'arbalète à manivelle pour préparer le tir standard suivant.",
        chips: [
          { text: "🔄 Réarmement Mécanique", class: "chip-blue" },
          { text: "⚡ Préparation Rapide", class: "chip-amber" }
        ]
      },
      {
        name: "Carreau Transperçant",
        type: "Perforation Linéaire",
        typeTag: "tag-atk",
        ether: "20 Éther",
        cooldown: "7s Recharge",
        desc: "Tire un projectile lourd qui traverse les ennemis en ligne droite, infligeant des dégâts réduits à chaque cible traversée.",
        chips: [
          { text: "🏹 Perforation Linéaire", class: "chip-red" },
          { text: "🛡️ Traversée de Blindage", class: "chip-amber" }
        ]
      },
      {
        name: "Carreau Explosif",
        type: "Munition Incendiaire",
        typeTag: "tag-atk",
        ether: "25 Éther",
        cooldown: "10s Recharge",
        desc: "Décoche un carreau piégé qui détone à l'impact ou à l'arrivée au sol, provoquant des dégâts de zone de feu et de souffle.",
        chips: [
          { text: "💥 Explosion de Zone", class: "chip-red" },
          { text: "🔥 Souffle & Dégâts de Feu", class: "chip-amber" }
        ]
      },
      {
        name: "Carreau Neutralisant",
        type: "Immobilisation Ciblée",
        typeTag: "tag-atk",
        ether: "20 Éther",
        cooldown: "12s Recharge",
        desc: "Tir percutant visant les membres pour immobiliser ou clouer la cible sur place pendant une courte période.",
        chips: [
          { text: "⛓️ Immobilisation Nette", class: "chip-green" },
          { text: "⚓ Ancrage au Sol", class: "chip-blue" }
        ]
      }
    ]
  },

  rogue: {
    name: "Rogue",
    category: "Classe de Base",
    tier: "Pallier I (Niv. 1)",
    role: "Infiltration • Frappe Sournoise & Étourdissements",
    avatar: "🗡️",
    lore: "Artisans du meurtre discret et des dérobades rapides. Le Rogue exploite le positionnement dos-à-dos pour porter des frappes critiques fatales et déstabiliser les pivots ennemis.",
    weapon: "Dagues Jumelles d'Acier Sombre",
    resource: "Points de Combo & Énergie Voxel",
    prereq: "Classe de Départ (Niveau 1)",
    gauges: { def: 45, atk: 88, mob: 90 },
    skills: [
      {
        name: "Attaque de Base",
        type: "Frappe Rapide",
        typeTag: "tag-atk",
        ether: "0 Éther",
        cooldown: "Instantané",
        desc: "Coup rapide de dague en mêlée infligeant des dégâts physiques légers.",
        chips: [
          { text: "🗡️ Célérité en Mêlée", class: "chip-amber" },
          { text: "⚪ Sans Coût", class: "chip-blue" }
        ]
      },
      {
        name: "Furtivité",
        type: "Invisibilité Tactique",
        typeTag: "tag-buff",
        ether: "20 Éther",
        cooldown: "15s Recharge",
        desc: "Rend le personnage invisible aux yeux des ennemis jusqu'à sa prochaine attaque ou action agressive.",
        chips: [
          { text: "🌫️ Invisibilité Totale", class: "chip-green" },
          { text: "⚡ Positionnement Idéal", class: "chip-blue" }
        ]
      },
      {
        name: "Backstab",
        type: "Frappe Mortelle de Dos",
        typeTag: "tag-atk",
        ether: "20 Éther",
        cooldown: "5s Recharge",
        desc: "Attaque dévastatrice portée dans le dos de l'adversaire, garantissant un bonus massif de dégâts critiques (optimale en sortie de furtivité).",
        chips: [
          { text: "🗡️ Dégâts Critiques Massifs", class: "chip-red" },
          { text: "✨ Synergie Furtivité", class: "chip-amber" }
        ]
      },
      {
        name: "Stun",
        type: "Neutralisation Vitale",
        typeTag: "tag-atk",
        ether: "15 Éther",
        cooldown: "10s Recharge",
        desc: "Frappe précise visant un point vital pour étourdir complètement la cible pendant quelques secondes.",
        chips: [
          { text: "⛓️ Étourdissement Total", class: "chip-amber" },
          { text: "🛑 Interruption", class: "chip-blue" }
        ]
      },
      {
        name: "Lacération",
        type: "Entaille Hémorragique",
        typeTag: "tag-atk",
        ether: "15 Éther",
        cooldown: "6s Recharge",
        desc: "Entaille vicieuse appliquant un saignement continu infligeant des dégâts physiques sur la durée.",
        chips: [
          { text: "🩸 Saignement Continu (DoT)", class: "chip-red" },
          { text: "⏳ Dégâts Répétés", class: "chip-amber" }
        ]
      }
    ]
  },

  assassin: {
    name: "Assassin",
    category: "Spécialisation Avancée",
    tier: "Pallier II (Niv. 20)",
    role: "Exécution Venimeuse • Foulée d'Ombre & Rupture Défensive",
    avatar: "☠️",
    lore: "Évolution impitoyable du Rogue. L'Assassin maîtrise les poisons synthétiques de haute létalité et glisse d'une ombre à l'autre pour anéantir les cibles prioritaires avant toute riposte.",
    weapon: "Stilettos Enduits de Belladone",
    resource: "Neurotoxines & Éther Obscur",
    prereq: "Rogue Niveau 20",
    gauges: { def: 40, atk: 96, mob: 95 },
    skills: [
      {
        name: "Attaque de Base",
        type: "Entailles Chirurgicales",
        typeTag: "tag-atk",
        ether: "0 Éther",
        cooldown: "Instantané",
        desc: "Série d'entailles chirurgicales rapides au corps-à-corps affaiblissant les défenses.",
        chips: [
          { text: "🗡️ Coups Rapides Multiples", class: "chip-amber" },
          { text: "⚪ Sans Coût", class: "chip-blue" }
        ]
      },
      {
        name: "Lame Empoisonnée",
        type: "Toxine & Érosion",
        typeTag: "tag-buff",
        ether: "20 Éther",
        cooldown: "12s Recharge",
        desc: "Enduit les armes d'un venin puissant ; les attaques suivantes infligent des dégâts continus de poison qui réduisent également la régénération adverse.",
        chips: [
          { text: "☠️ Poison Continu", class: "chip-green" },
          { text: "💔 Réduction Régénération", class: "chip-red" }
        ]
      },
      {
        name: "Dash de l'Ombre",
        type: "Téléportation Spectrale",
        typeTag: "tag-atk",
        ether: "20 Éther",
        cooldown: "8s Recharge",
        desc: "Téléportation ou glissade instantanée à travers les ombres vers le dos d'une cible désignée, ignorant les obstacles intermédiaires.",
        chips: [
          { text: "🌌 Téléportation Dos Immédiate", class: "chip-blue" },
          { text: "🚫 Ignore Obstacles", class: "chip-green" }
        ]
      },
      {
        name: "Frappe Exposante",
        type: "Rupture de Garde",
        typeTag: "tag-atk",
        ether: "25 Éther",
        cooldown: "10s Recharge",
        desc: "Attaque pénétrante appliquant une vulnérabilité critique qui augmente tous les dégâts subis par la cible pendant un temps donné.",
        chips: [
          { text: "⚡ Vulnérabilité Critique", class: "chip-red" },
          { text: "🛡️ Hausse de Tous les Dégâts", class: "chip-blue" }
        ]
      }
    ]
  },

  acolyte: {
    name: "Acolyte",
    category: "Classe de Base",
    tier: "Palier I (Niv. 1)",
    role: "Soutien Sacré • Guérison & Bénédiction",
    avatar: "✨",
    lore: "Initié aux arts du toucher guérisseur et des prières curatives. L'Acolyte maintient l'intégrité de l'escouade et purifie les afflictions les plus insidieuses.",
    weapon: "Masse de Foi & Livre Sacré",
    resource: "Foi & Éther Pur",
    prereq: "Classe de Départ (Niveau 1)",
    gauges: { def: 55, atk: 45, mob: 60 },
    skills: [
      {
        name: "Attaque de Base",
        type: "Décharge Magique",
        typeTag: "tag-atk",
        ether: "0 Éther",
        cooldown: "Instantané",
        desc: "Décharge magique légère à courte portée sans consommation d'éther.",
        chips: [
          { text: "✨ Décharge Sacrée", class: "chip-blue" },
          { text: "⚪ Sans Coût", class: "chip-amber" }
        ]
      },
      {
        name: "Toucher Guérisseur",
        type: "Soin Mêlée d'Urgence",
        typeTag: "tag-buff",
        ether: "20 Éther",
        cooldown: "4s Recharge",
        desc: "Soin direct d'urgence appliqué sur un allié adjacent au contact.",
        chips: [
          { text: "💚 Soin Rapide Contact", class: "chip-green" },
          { text: "🛡️ Stabilisation", class: "chip-blue" }
        ]
      },
      {
        name: "Prière Curative",
        type: "Soin à Distance",
        typeTag: "tag-buff",
        ether: "30 Éther",
        cooldown: "7s Recharge",
        desc: "Soin projeté ciblant un allié éloigné pour stabiliser ses points de vie.",
        chips: [
          { text: "🕊️ Soin Projeté Longue Portée", class: "chip-green" },
          { text: "✨ Radiance", class: "chip-amber" }
        ]
      },
      {
        name: "Purification",
        type: "Dissipation d'Altération",
        typeTag: "tag-def",
        ether: "15 Éther",
        cooldown: "10s Recharge",
        desc: "Dissipe un malus ou une altération d'état (poison, saignement, vulnérabilité) sur l'allié ciblé.",
        chips: [
          { text: "🌿 Dissipation de Malus", class: "chip-blue" },
          { text: "🛡️ Rétablissement", class: "chip-green" }
        ]
      }
    ]
  },

  magicien: {
    name: "Magicien",
    category: "Spécialisation Avancée",
    tier: "Palier II (Niv. 20)",
    role: "Destruction Élémentaire • Manipulation de l'Éther",
    avatar: "🔮",
    lore: "Évolution offensive de l'Acolyte. Renonçant au pur soutien pour embrasser les énergies pyrotechniques et cryomantiques, le Magicien déchaîne les éléments sur le champ de bataille.",
    weapon: "Bâton Runique d'Éther & Catalyseur de Lapis",
    resource: "Éther Arcanique Pur",
    prereq: "Acolyte Niveau 20",
    gauges: { def: 35, atk: 92, mob: 60 },
    skills: [
      {
        name: "Attaque de Base",
        type: "Trait Arcanique",
        typeTag: "tag-atk",
        ether: "0 Éther",
        cooldown: "Instantané",
        desc: "Trait arcanique focalisé à longue portée sans consommation de ressource.",
        chips: [
          { text: "🔮 Trait Arcanique à Distance", class: "chip-blue" },
          { text: "⚪ Sans Coût", class: "chip-amber" }
        ]
      },
      {
        name: "Trait de Feu",
        type: "Magie Incendiaire",
        typeTag: "tag-atk",
        ether: "20 Éther",
        cooldown: "4s Recharge",
        desc: "Sort offensif brûlant la cible avec dégâts résiduels intenses.",
        chips: [
          { text: "🔥 Brûlure Résiduelle (DoT)", class: "chip-red" },
          { text: "💥 Dégâts Élémentaires de Feu", class: "chip-amber" }
        ]
      },
      {
        name: "Trait de Glace",
        type: "Cryomancie Perforante",
        typeTag: "tag-atk",
        ether: "25 Éther",
        cooldown: "6s Recharge",
        desc: "Lance de givre perforante infligeant des dégâts élémentaires et un gel/ralentissement.",
        chips: [
          { text: "❄️ Ralentissement Vitesse", class: "chip-blue" },
          { text: "🧊 Épieu Transperçant", class: "chip-green" }
        ]
      },
      {
        name: "Zap en Chaîne",
        type: "Électrostatique Réactif",
        typeTag: "tag-atk",
        ether: "35 Éther",
        cooldown: "8s Recharge",
        desc: "Décharge d'éclair rebondissant d'une cible à l'autre sur les groupes rapprochés.",
        chips: [
          { text: "⚡ Éclairs en Rebond", class: "chip-blue" },
          { text: "👥 Cibles Multiples", class: "chip-amber" }
        ]
      }
    ]
  },

  paladin: {
    name: "Paladin",
    category: "Spécialisation Hybride (Croisée)",
    tier: "Palier II / III (Croisement)",
    role: "Chevalier Sacré • Rempart Divin & Jugement",
    avatar: "⚔️✨",
    lore: "Symbiose parfaite entre la voie martiale du Guerrier et les miracles de l'Acolyte. Le Paladin châtie les infidèles tout en enveloppant ses compagnons d'une aura de protection céleste.",
    weapon: "Lame Bénie & Écu Gravé d'Enluminures",
    resource: "Foi Martiale & Éther Pur",
    prereq: "Guerrier Niv. 20 + Acolyte Niv. 20 (Voie Croisée)",
    gauges: { def: 92, atk: 82, mob: 50 },
    skills: [
      {
        name: "Attaque de Base",
        type: "Frappe Consacrée",
        typeTag: "tag-atk",
        ether: "0 Éther",
        cooldown: "Instantané",
        desc: "Frappe lourde d'épée bénie générant de l'énergie de ferveur à chaque impact.",
        chips: [
          { text: "⚔️ Impact Sacré", class: "chip-amber" },
          { text: "✨ Génération de Foi", class: "chip-blue" }
        ]
      },
      {
        name: "Frappe du Jugement",
        type: "Châtiment Divin",
        typeTag: "tag-atk",
        ether: "25 Éther",
        cooldown: "6s Recharge",
        desc: "Abat une lame de lumière céleste sur la cible, infligeant de lourds dégâts physiques et sacrés combinés.",
        chips: [
          { text: "⚡ Dégâts Sacrés Purs", class: "chip-red" },
          { text: "🛡️ Fracas d'Armure", class: "chip-amber" }
        ]
      },
      {
        name: "Bouclier de Lumière",
        type: "Protection Céleste",
        typeTag: "tag-def",
        ether: "30 Éther",
        cooldown: "14s Recharge",
        desc: "Crée une bulle de radiance divine autour d'un allié ou de soi-même, absorbant les dégâts et libérant une onde de soin à l'expiration.",
        chips: [
          { text: "🛡️ Bouclier d'Absorption", class: "chip-amber" },
          { text: "💚 Soin d'Éclatement", class: "chip-green" }
        ]
      },
      {
        name: "Aura de Rédemption",
        type: "Posture Hybride Passive",
        typeTag: "tag-buff",
        ether: "0 Éther",
        cooldown: "Passif",
        desc: "Tous les alliés dans un rayon de 2 cases bénéficient d'une régénération continue de points de vie et d'un bonus de résistance aux altérations.",
        chips: [
          { text: "✨ Aura Permanente", class: "chip-blue" },
          { text: "🌿 Régénération Continue", class: "chip-green" }
        ]
      }
    ]
  }
};

// =============================================================================
// 2. WEB AUDIO MICRO-INTERACTIONS (Stone & Metallic Clicks)
// =============================================================================
class TactileSoundEngine {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playStoneClick() {
    try {
      this.init();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.09);
    } catch {
      // Audio autoplay gracefully suppressed
    }
  }

  playArcaneSelect() {
    try {
      this.init();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, this.audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.13);
    } catch {
      // Audio autoplay gracefully suppressed
    }
  }
}

const soundEngine = new TactileSoundEngine();

// =============================================================================
// 3. TREE VIEWPORT CONTROLLER : GRAB-TO-PAN & STICKY OVERFLOW ANIMATIONS
// =============================================================================
class TreeViewportManager {
  constructor() {
    this.container = document.getElementById('tree-viewport-container');
    this.canvas = document.getElementById('tree-canvas');
    this.matrix = document.getElementById('tree-matrix');

    // Sticky Edge Elements
    this.edgeTop = document.getElementById('edge-top');
    this.edgeBottom = document.getElementById('edge-bottom');
    this.edgeLeft = document.getElementById('edge-left');
    this.edgeRight = document.getElementById('edge-right');

    // HUD controls
    this.zoomLevelLabel = document.getElementById('hud-zoom-level');
    this.btnZoomIn = document.getElementById('hud-zoom-in');
    this.btnZoomOut = document.getElementById('hud-zoom-out');
    this.btnReset = document.getElementById('hud-reset');

    // State
    this.isMouseDown = false;
    this.startX = 0;
    this.startY = 0;
    this.scrollLeftStart = 0;
    this.scrollTopStart = 0;
    this.zoomScale = 1.0;

    this.init();
  }

  init() {
    if (!this.canvas) return;

    // Grab-to-pan Events (Mouse)
    this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', () => this.onMouseUp());

    // Grab-to-pan Events (Touch)
    this.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
    this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: true });
    this.canvas.addEventListener('touchend', () => this.onTouchEnd());

    // Scroll listener for sticky edge overflow animations
    this.canvas.addEventListener('scroll', () => this.updateStickyEdgeOverflows());
    window.addEventListener('resize', () => this.updateStickyEdgeOverflows());

    // HUD Zoom & Reset Controls
    if (this.btnZoomIn) {
      this.btnZoomIn.addEventListener('click', () => this.adjustZoom(0.1));
    }
    if (this.btnZoomOut) {
      this.btnZoomOut.addEventListener('click', () => this.adjustZoom(-0.1));
    }
    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => this.resetView());
    }

    // Initial check
    setTimeout(() => {
      this.centerViewport();
      this.updateStickyEdgeOverflows();
    }, 100);
  }

  onMouseDown(e) {
    // Only drag with left click and if not clicking a button
    if (e.button !== 0) return;
    this.isMouseDown = true;
    this.canvas.classList.add('is-grabbing');
    this.startX = e.pageX - this.canvas.offsetLeft;
    this.startY = e.pageY - this.canvas.offsetTop;
    this.scrollLeftStart = this.canvas.scrollLeft;
    this.scrollTopStart = this.canvas.scrollTop;
  }

  onMouseMove(e) {
    if (!this.isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    const walkX = (x - this.startX) * 1.2;
    const walkY = (y - this.startY) * 1.2;
    this.canvas.scrollLeft = this.scrollLeftStart - walkX;
    this.canvas.scrollTop = this.scrollTopStart - walkY;
    this.updateStickyEdgeOverflows();
  }

  onMouseUp() {
    this.isMouseDown = false;
    if (this.canvas) {
      this.canvas.classList.remove('is-grabbing');
    }
  }

  onTouchStart(e) {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    this.isMouseDown = true;
    this.startX = touch.pageX - this.canvas.offsetLeft;
    this.startY = touch.pageY - this.canvas.offsetTop;
    this.scrollLeftStart = this.canvas.scrollLeft;
    this.scrollTopStart = this.canvas.scrollTop;
  }

  onTouchMove(e) {
    if (!this.isMouseDown || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const x = touch.pageX - this.canvas.offsetLeft;
    const y = touch.pageY - this.canvas.offsetTop;
    const walkX = (x - this.startX) * 1.2;
    const walkY = (y - this.startY) * 1.2;
    this.canvas.scrollLeft = this.scrollLeftStart - walkX;
    this.canvas.scrollTop = this.scrollTopStart - walkY;
    this.updateStickyEdgeOverflows();
  }

  onTouchEnd() {
    this.isMouseDown = false;
  }

  /**
   * Updates the sticky animated indicators on container edges.
   * Highlights borders where content extends beyond the visible viewport.
   */
  updateStickyEdgeOverflows() {
    if (!this.canvas) return;

    const sLeft = this.canvas.scrollLeft;
    const sTop = this.canvas.scrollTop;
    const maxScrollLeft = this.canvas.scrollWidth - this.canvas.clientWidth;
    const maxScrollTop = this.canvas.scrollHeight - this.canvas.clientHeight;

    const tolerance = 10;

    // Top overflow
    if (sTop > tolerance) {
      this.edgeTop.classList.add('is-overflowing');
    } else {
      this.edgeTop.classList.remove('is-overflowing');
    }

    // Bottom overflow
    if (sTop < maxScrollTop - tolerance) {
      this.edgeBottom.classList.add('is-overflowing');
    } else {
      this.edgeBottom.classList.remove('is-overflowing');
    }

    // Left overflow
    if (sLeft > tolerance) {
      this.edgeLeft.classList.add('is-overflowing');
    } else {
      this.edgeLeft.classList.remove('is-overflowing');
    }

    // Right overflow
    if (sLeft < maxScrollLeft - tolerance) {
      this.edgeRight.classList.add('is-overflowing');
    } else {
      this.edgeRight.classList.remove('is-overflowing');
    }
  }

  adjustZoom(delta) {
    soundEngine.playStoneClick();
    this.zoomScale = Math.min(Math.max(0.7, this.zoomScale + delta), 1.3);
    this.matrix.style.transform = `scale(${this.zoomScale})`;
    if (this.zoomLevelLabel) {
      this.zoomLevelLabel.textContent = `${Math.round(this.zoomScale * 100)}%`;
    }
    this.updateStickyEdgeOverflows();
  }

  resetView() {
    soundEngine.playStoneClick();
    this.zoomScale = 1.0;
    this.matrix.style.transform = `scale(1)`;
    if (this.zoomLevelLabel) {
      this.zoomLevelLabel.textContent = `100%`;
    }
    this.centerViewport();
  }

  centerViewport() {
    if (!this.canvas) return;
    this.canvas.scrollTo({
      left: 40,
      top: 20,
      behavior: 'smooth'
    });
    setTimeout(() => this.updateStickyEdgeOverflows(), 350);
  }
}

// =============================================================================
// 4. CLASS DETAILS & GRIMOIRE SHEET CONTROLLER
// =============================================================================
class ClassDetailsManager {
  constructor() {
    this.tabs = document.querySelectorAll('.tab-btn');
    this.unitSlots = document.querySelectorAll('.unit-card-slot[data-class]');

    // Sheet Elements
    this.categoryBadge = document.getElementById('detail-category');
    this.tierBadge = document.getElementById('detail-tier');
    this.avatarElem = document.getElementById('detail-avatar');
    this.nameElem = document.getElementById('detail-name');
    this.roleElem = document.getElementById('detail-role');
    this.loreElem = document.getElementById('detail-lore');
    this.weaponElem = document.getElementById('detail-weapon');
    this.resourceElem = document.getElementById('detail-resource');
    this.prereqElem = document.getElementById('detail-prereq');

    // Gauges
    this.defVal = document.getElementById('gauge-def-val');
    this.defBar = document.getElementById('gauge-def-bar');
    this.atkVal = document.getElementById('gauge-atk-val');
    this.atkBar = document.getElementById('gauge-atk-bar');
    this.mobVal = document.getElementById('gauge-mob-val');
    this.mobBar = document.getElementById('gauge-mob-bar');

    // Skills
    this.skillsList = document.getElementById('skills-list');
    this.skillsCount = document.getElementById('skills-count');

    this.activeClassKey = 'sentinelle';
    this.init();
  }

  init() {
    // Tabs click
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const classKey = tab.dataset.class;
        if (classKey) {
          soundEngine.playStoneClick();
          this.displayClass(classKey);
        }
      });
    });

    // Unit cards in tree click
    this.unitSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        const classKey = slot.dataset.class;
        if (classKey) {
          soundEngine.playArcaneSelect();
          this.displayClass(classKey);

          // Smooth scroll towards the details section
          const detailsSec = document.getElementById('class-details');
          if (detailsSec) {
            detailsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Initial render
    this.displayClass(this.activeClassKey);
  }

  displayClass(key) {
    const data = CLASSES_DATA[key];
    if (!data) return;

    this.activeClassKey = key;

    // Update Tab states
    this.tabs.forEach(t => {
      if (t.dataset.class === key) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // Update Unit Card highlights in Tree
    this.unitSlots.forEach(slot => {
      const tile = slot.querySelector('.unit-tile');
      if (tile) {
        if (slot.dataset.class === key) {
          tile.classList.add('active-highlight');
        } else {
          tile.classList.remove('active-highlight');
        }
      }
    });

    // Populate Sheet Header & Lore
    if (this.categoryBadge) this.categoryBadge.textContent = data.category;
    if (this.tierBadge) this.tierBadge.textContent = data.tier;
    if (this.avatarElem) this.avatarElem.textContent = data.avatar;
    if (this.nameElem) this.nameElem.textContent = data.name;
    if (this.roleElem) this.roleElem.textContent = data.role;
    if (this.loreElem) this.loreElem.textContent = data.lore;
    if (this.weaponElem) this.weaponElem.textContent = data.weapon;
    if (this.resourceElem) this.resourceElem.textContent = data.resource;
    if (this.prereqElem) this.prereqElem.textContent = data.prereq;

    // Populate Gauges with smooth fill transition
    if (this.defVal && this.defBar) {
      this.defVal.textContent = `${data.gauges.def}%`;
      this.defBar.style.width = `${data.gauges.def}%`;
    }
    if (this.atkVal && this.atkBar) {
      this.atkVal.textContent = `${data.gauges.atk}%`;
      this.atkBar.style.width = `${data.gauges.atk}%`;
    }
    if (this.mobVal && this.mobBar) {
      this.mobVal.textContent = `${data.gauges.mob}%`;
      this.mobBar.style.width = `${data.gauges.mob}%`;
    }

    // Populate Grimoire Skills List
    if (this.skillsList && data.skills) {
      if (this.skillsCount) {
        this.skillsCount.textContent = `${data.skills.length} Capacités Révélées`;
      }

      this.skillsList.innerHTML = '';
      data.skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card voxel-bevel';

        const chipsHtml = skill.chips.map(chip => 
          `<span class="effect-chip ${chip.class}">${chip.text}</span>`
        ).join('');

        card.innerHTML = `
          <div class="skill-top">
            <div class="skill-name-wrap">
              <span class="skill-type-tag ${skill.typeTag}">${skill.type}</span>
              <h5 class="skill-name">${skill.name}</h5>
            </div>
            <div class="skill-costs">
              <span class="cost-item ether-cost">${skill.ether}</span>
              <span class="cost-item cd-cost">${skill.cooldown}</span>
            </div>
          </div>
          <p class="skill-desc">${skill.desc}</p>
          <div class="skill-footer">
            ${chipsHtml}
          </div>
        `;
        this.skillsList.appendChild(card);
      });
    }
  }
}

// =============================================================================
// 5. LIGHTBOX MANAGER (HERO CONCEPT ARTWORK)
// =============================================================================
class LightboxManager {
  constructor() {
    this.trigger = document.getElementById('hero-img-trigger');
    this.modal = document.getElementById('hero-lightbox');
    this.backdrop = document.getElementById('lightbox-backdrop');
    this.closeBtn = document.getElementById('lightbox-close');

    this.init();
  }

  init() {
    if (!this.trigger || !this.modal) return;

    this.trigger.addEventListener('click', () => this.open());
    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.open();
      }
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('is-open')) {
        this.close();
      }
    });
  }

  open() {
    soundEngine.playArcaneSelect();
    this.modal.classList.add('is-open');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  close() {
    soundEngine.playStoneClick();
    this.modal.classList.remove('is-open');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// =============================================================================
// 6. APPLICATION BOOTSTRAP
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Viewport, Class Sheet & Lightbox
  const viewportMgr = new TreeViewportManager();
  const detailsMgr = new ClassDetailsManager();
  const lightboxMgr = new LightboxManager();

  // Active Navbar links tracking on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // Mobile Navigation Toggle
  const mobileNavBtn = document.getElementById('btn-mobile-nav');
  const navMenu = document.getElementById('nav-menu');
  if (mobileNavBtn && navMenu) {
    mobileNavBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('mobile-open');
      mobileNavBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNavBtn.classList.toggle('is-active', isOpen);
      soundEngine.playStoneClick();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('mobile-open')) {
          navMenu.classList.remove('mobile-open');
          mobileNavBtn.setAttribute('aria-expanded', 'false');
          mobileNavBtn.classList.remove('is-active');
        }
      });
    });
  }
});
