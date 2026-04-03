// ═══════════════════════════════════════════════════════════════════════════════
// POKEMONA - BESTI DI VENETIA
// Sistema Missioni Completo - Come Pokemon
// ═══════════════════════════════════════════════════════════════════════════════

export interface Quest {
  id: string
  name: string
  description: string
  type: 'main' | 'side' | 'character' | 'collection'
  chapter: number
  location: string
  giver: string
  objectives: QuestObjective[]
  rewards: QuestReward[]
  prerequisites: string[]
  repeatable: boolean
  timeOfDay?: 'any' | 'morning' | 'afternoon' | 'evening' | 'night'
}

export interface QuestObjective {
  type: 'talk' | 'defeat' | 'capture' | 'collect' | 'visit' | 'escort' | 'deliver'
  target: string
  description: string
  amount?: number
  location?: string
}

export interface QuestReward {
  type: 'item' | 'money' | 'bestia' | 'badge' | 'tm' | 'keyItem' | 'experience'
  item?: string
  amount?: number
  description: string
}

export interface GameChapter {
  id: number
  name: string
  description: string
  mapId: string
  objectives: string[]
  quests: string[]
  unlockedMaps: string[]
  unlockedGyms: string[]
  storyDialog: StoryLine[]
}

export interface StoryLine {
  speaker: string
  text: string
  emotion?: 'happy' | 'sad' | 'angry' | 'neutral' | 'excited' | 'confused'
  trigger?: 'battle' | 'gym' | 'cutscene' | 'choice'
}

// ═══════════════════════════════════════════════════════════════════════════════
// CAPITOLI DI GIOCO
// ═══════════════════════════════════════════════════════════════════════════════

export const GAME_CHAPTERS: GameChapter[] = [
  {
    id: 0,
    name: "Il Risveglio",
    description: "Ti svegli a Canalborgo e inizia la tua avventura!",
    mapId: "canalborgo",
    objectives: [
      "Esci di casa",
      "Parla con la Mamma",
      "Vai al Laboratorio Barcaro",
      "Scegli il tuo Besti starter",
      "Combatti contro Marco",
      "Esplora Canalborgo",
      "Vinci la tua prima battaglia selvatica"
    ],
    quests: ["first_steps", "meet_rival", "wild_encounter"],
    unlockedMaps: ["casa", "canalborgo", "route1"],
    unlockedGyms: [],
    storyDialog: [
      { speaker: "Mamma", text: "Tesoro! Ti sei svegliato!", emotion: "happy" },
      { speaker: "Mamma", text: "Oggi è il grande giorno!", emotion: "excited" },
      { speaker: "Mamma", text: "Vai dal Professor Barcaro, ti aspetta in laboratorio!", emotion: "happy" },
      { speaker: "Mamma", text: "E non dimenticare: la polenta è sempre la risposta!", emotion: "neutral" },
      { speaker: "", text: "Esci di casa e vai verso il laboratorio", emotion: "neutral" },
    ]
  },
  {
    id: 1,
    name: "La Scelta del Destino",
    description: "Scegli il tuo Besti leggendario e affronta Marco!",
    mapId: "laboratorio",
    objectives: [
      "Entra nel laboratorio",
      "Parla con il Professor Barcaro",
      "Ascolta la storia dei Besti leggendari",
      "Scegli tra i 4 Starter leggendari",
      "Combatti la prima battaglia vs Marco"
    ],
    quests: ["choice_of_destiny", "first_battle"],
    unlockedMaps: ["laboratorio", "arena_principianti"],
    unlockedGyms: [],
    storyDialog: [
      { speaker: "Prof. Barcaro", text: "Ah, sei arrivato! Benvenuto nel mio laboratorio!", emotion: "happy" },
      { speaker: "Prof. Barcaro", text: "Sono il Professor Barcaro, studio i Besti da 40 anni!", emotion: "neutral" },
      { speaker: "Prof. Barcaro", text: "Oggi è il giorno più importante della tua vita!", emotion: "excited" },
      { speaker: "Prof. Barcaro", text: "Ti affiderò uno dei 4 BESTI LEGGENDARI!", emotion: "excited" },
      { speaker: "Marco", text: "EHI! CI SONO ANCHE IO!", emotion: "angry" },
      { speaker: "Marco", text: "Sono Marco, il tuo RIVALE! E prendo il migliore!", emotion: "happy" },
      { speaker: "Prof. Barcaro", text: "Marco! Sei sempre il solito rompiscatole!", emotion: "confused" },
      { speaker: "", text: "Scegli il tuo starter leggendario!", emotion: "neutral", trigger: "choice" },
    ]
  },
  {
    id: 2,
    name: "Il Primo Passo",
    description: "Esplora Canalborgo e preparati per il viaggio",
    mapId: "canalborgo",
    objectives: [
      "Esplora Canalborgo",
      "Parla con gli NPC",
      "Vinci una battaglia selvatica",
      "Vai al Centro Besti",
      "Attraversa Via del Prosecco verso nord"
    ],
    quests: ["explore_canalborgo", "first_wild_battle", "meet_the_locals"],
    unlockedMaps: ["canalborgo", "route1"],
    unlockedGyms: [],
    storyDialog: [
      { speaker: "", text: "Ora sei libero di esplorare Canalborgo!", emotion: "happy" },
      { speaker: "", text: "Parla con la gente, potrebbero darti suggerimenti!", emotion: "neutral" },
      { speaker: "", text: "Attento ai Besti selvatici nell'erba alta!", emotion: "neutral" },
      { speaker: "", text: "Quando sei pronto, vai verso NORD per raggiungere SPRITZIA!", emotion: "neutral" },
    ]
  },
  {
    id: 3,
    name: "Spritzia - La Città dell'Aperitivo",
    description: "Arriva a Spritzia e affronta il primo Gym!",
    mapId: "spritzia",
    objectives: [
      "Arriva a Spritzia",
      "Esplora la città",
      "Trova il Gym Spritzia",
      "Completa le sfide del Gym",
      "Sconfiggi Bepi lo Spritzaro",
      "Ottieni il BADGE APERITIVO"
    ],
    quests: ["welcome_to_spritzia", "gym_spritzia_intro", "defeat_spritzia_gym"],
    unlockedMaps: ["spritzia", "route2"],
    unlockedGyms: ["gym_spritzia"],
    storyDialog: [
      { speaker: "", text: "Benvenuto a SPRITZIA! La città dell'aperitivo!", emotion: "excited" },
      { speaker: "Bepi lo Spritzaro", text: "CHE BEVEMO OGGI?! Sono il leader del Gym!", emotion: "happy" },
      { speaker: "Bepi lo Spritzaro", text: "Se vuoi il mio Badge, devi BATTERMI!", emotion: "angry" },
      { speaker: "Bepi lo Spritzaro", text: "MA PRIMA... un aperitivo!", emotion: "happy" },
    ]
  },
  {
    id: 4,
    name: "La Minaccia della Polenta",
    description: "Scopri il piano della Compagnia della Polenta",
    mapId: "route2",
    objectives: [
      "Attraversa le Colline del Vino",
      "Incontra i Grint della Polenta",
      "Sconfiggi i membri della Compagnia",
      "Proteggi il contadino Bepi",
      "Raggiungi Veronara"
    ],
    quests: ["compagnia_intro", "save_farmer", "route_challenges_2"],
    unlockedMaps: ["route2", "veronara"],
    unlockedGyms: ["gym_veronara"],
    storyDialog: [
      { speaker: "Grint della Polenta", text: "ALTO LÀ! Sei nel territorio della COMPAGNIA DELLA POLENTA!", emotion: "angry" },
      { speaker: "Grint della Polenta", text: "VOGLIAMO la polenta perfetta! E TU ci aiuterai!", emotion: "angry" },
      { speaker: "Contadino Bepi", text: "Aiuto! Questi cattivi mi hanno rubato il radicchio!", emotion: "sad" },
      { speaker: "", text: "Sconfiggi i Grint e recupera il radicchio!", emotion: "neutral" },
    ]
  },
  {
    id: 5,
    name: "Veronara - La Città dell'Amore",
    description: "Affronta il Gym dell'Arena",
    mapId: "veronara",
    objectives: [
      "Arriva a Veronara",
      "Esplora la città (visita l'Arena)",
      "Trova Giuliano Arena",
      "Sconfiggi Giuliano Arena",
      "Ottieni il BADGE ARENA"
    ],
    quests: ["welcome_to_veronara", "giuliano_story", "defeat_veronara_gym"],
    unlockedMaps: ["veronara", "route3"],
    unlockedGyms: ["gym_veronara"],
    storyDialog: [
      { speaker: "", text: "Benvenuto a VERONARA! La città dell'amore!", emotion: "excited" },
      { speaker: "Giuliano Arena", text: "BENVENUTO NELL'ARENA! Sono Giuliano, il leader!", emotion: "happy" },
      { speaker: "Giuliano Arena", text: "Combattiamo con ONORE e CUORE!", emotion: "excited" },
      { speaker: "Giuliano Arena", text: "Se perdi... non hai vissuto l'amore!", emotion: "neutral" },
    ]
  },
  {
    id: 6,
    name: "I Segreti dell'Università",
    description: "A Padoana scopri la verità su Venetia",
    mapId: "padoana",
    objectives: [
      "Arriva a Padoana",
      "Visita l'Università",
      "Parla con il Professor Sansovino",
      "Sconfiggi il Gym Universitario",
      "Ottieni il BADGE STUDIO"
    ],
    quests: ["padoana_university", "sansovino_truth", "defeat_padoana_gym"],
    unlockedMaps: ["padoana", "route4"],
    unlockedGyms: ["gym_padoana"],
    storyDialog: [
      { speaker: "", text: "Benvenuto a PADOANA! La città dell'Università!", emotion: "excited" },
      { speaker: "Prof. Sansovino", text: "Benvenuto, giovane studioso!", emotion: "happy" },
      { speaker: "Prof. Sansovino", text: "Devo raccontarti una STORIA... la storia vera!", emotion: "neutral" },
      { speaker: "Prof. Sansovino", text: "Quella che la Compagnia della Polenta NON vuole che tu sappia...", emotion: "sad" },
    ]
  },
  {
    id: 7,
    name: "Trevisella - Il Cuore Verde",
    description: "A Trevisella scopri il potere del radicchio",
    mapId: "trevisella",
    objectives: [
      "Arriva a Trevisella",
      "Trova il Radicchio Dorato",
      "Parla con Nonno Gino",
      "Sconfiggi il Gym Radicchio",
      "Ottieni il BADGE RADICCIO"
    ],
    quests: ["trevisella_intro", "golden_radish", "defeat_trevisella_gym"],
    unlockedMaps: ["trevisella", "route5"],
    unlockedGyms: ["gym_trevisella"],
    storyDialog: [
      { speaker: "", text: "Benvenuto a TREVISELLA! La città del radicchio!", emotion: "excited" },
      { speaker: "Nonno Gino", text: "Oh, giovane! Il mio radicchio è stato rubato!", emotion: "sad" },
      { speaker: "Nonno Gino", text: "Senza il RADICCIO DORATO, non posso combattere!", emotion: "sad" },
      { speaker: "Nonna Gina", text: "Ma io ho ereditato la sua forza! Combattimi!", emotion: "happy" },
    ]
  },
  {
    id: 8,
    name: "Dolomax - Le Vette Eterne",
    description: "Tra le montagne affronta il freddo",
    mapId: "dolomax",
    objectives: [
      "Arriva a Dolomax",
      "Esplora le grotte di ghiaccio",
      "Trova la Regina dei Ghiacci",
      "Sconfiggi la Regina",
      "Ottieni il BADGE GHIACCIO"
    ],
    quests: ["dolomax_intro", "frozen_cave", "defeat_dolomax_gym"],
    unlockedMaps: ["dolomax", "route6", "cave_dolomitor"],
    unlockedGyms: ["gym_dolomax"],
    storyDialog: [
      { speaker: "", text: "Benvenuto a DOLOMAX! La città delle montagne!", emotion: "excited" },
      { speaker: "Regina Ghiacci", text: "IL FREDDO È MIO ALLEATO!", emotion: "angry" },
      { speaker: "Regina Ghiacci", text: "Solo i più forti possono passare!", emotion: "neutral" },
      { speaker: "Regina Ghiacci", text: "Nella grotta sotto la città... dorme DOLOMITOR!", emotion: "sad" },
    ]
  },
  {
    id: 9,
    name: "Gardalago - La Sfida Finale",
    description: "Affronta la Elite Four e diventa Campione!",
    mapId: "gardalago",
    objectives: [
      "Arriva a Gardalago",
      "Ottieni la Gondola d'Oro",
      "Completa la Elite Four",
      "Sconfiggi Maestro Marco",
      "Diventa CAMPIONE di Venetia!"
    ],
    quests: ["gardalago_intro", "elite_four_challenge", "champion_battle"],
    unlockedMaps: ["gardalago", "league_champion"],
    unlockedGyms: ["gym_gardalago"],
    storyDialog: [
      { speaker: "", text: "Benvenuto a GARDALAGO! L'ultima tappa!", emotion: "excited" },
      { speaker: "Gondoliere", text: "Prendi la GONDOLA D'ORO! Ti porterà ovunque!", emotion: "happy" },
      { speaker: "Maestro Marco", text: "AH! Il giovane che ha sconfitto la Polenta!", emotion: "neutral" },
      { speaker: "Maestro Marco", text: "Per battermi, devi passare la LEGA!", emotion: "angry" },
      { speaker: "Maestro Marco", text: "Preparati... È ora della SFIDA FINALE!", emotion: "excited" },
    ]
  },
  {
    id: 10,
    name: "L'Epilogo",
    description: "Confronta la Compagnia della Polenta una volta per tutte!",
    mapId: "base_polenta",
    objectives: [
      "Entra nella Base della Polenta",
      "Sconfiggi Dux Polenta",
      "Salva Venetia!",
      "Guarda i titoli di coda"
    ],
    quests: ["final_polenta", "boss_dux"],
    unlockedMaps: ["base_polenta"],
    unlockedGyms: [],
    storyDialog: [
      { speaker: "Dux Polenta", text: "BENVENUTO, GIOVANE ALLENATORE...", emotion: "angry" },
      { speaker: "Dux Polenta", text: "Hai fatto molta strada... ma ora è FINITA!", emotion: "angry" },
      { speaker: "Dux Polenta", text: "LA MIA POLENTA SARÀ PERFETTA... E TU SARAI L'INGREDIENTE!", emotion: "angry" },
      { speaker: "", text: "È l'ora della BATTAGLIA FINALE!", emotion: "neutral", trigger: "battle" },
    ]
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// MISSIONI PRINCIPALI
// ═══════════════════════════════════════════════════════════════════════════════

export const MAIN_QUESTS: Quest[] = [
  {
    id: "first_steps",
    name: "Il Primo Passo",
    description: "Esci di casa e inizia la tua avventura!",
    type: "main",
    chapter: 0,
    location: "casa",
    giver: "Mamma",
    objectives: [
      { type: "talk", target: "Mamma", description: "Parla con la mamma" },
      { type: "visit", target: "casa", description: "Esci di casa" }
    ],
    rewards: [
      { type: "keyItem", item: "map_canalborgo", description: "Mappa di Canalborgo" }
    ],
    prerequisites: [],
    repeatable: false,
  },
  {
    id: "meet_rival",
    name: "L'Incontro con Marco",
    description: "Vai al laboratorio e incontra il tuo rivale Marco",
    type: "main",
    chapter: 1,
    location: "laboratorio",
    giver: "Prof. Barcaro",
    objectives: [
      { type: "visit", target: "laboratorio", description: "Vai al laboratorio" },
      { type: "talk", target: "Prof. Barcaro", description: "Parla con Barcaro" },
      { type: "talk", target: "Marco", description: "Incontra Marco" }
    ],
    rewards: [
      { type: "experience", amount: 100, description: "100 EXP" }
    ],
    prerequisites: ["first_steps"],
    repeatable: false,
  },
  {
    id: "choice_of_destiny",
    name: "La Scelta del Destino",
    description: "Scegli il tuo Besti leggendario!",
    type: "main",
    chapter: 1,
    location: "laboratorio",
    giver: "Prof. Barcaro",
    objectives: [
      { type: "talk", target: "Prof. Barcaro", description: "Ascolta la storia dei leggendari" },
      { type: "visit", target: "choice_starter", description: "Scegli il tuo starter" }
    ],
    rewards: [
      { type: "bestia", item: "starter", description: "Un Besti leggendario!" }
    ],
    prerequisites: ["meet_rival"],
    repeatable: false,
  },
  {
    id: "first_battle",
    name: "La Prima Battaglia",
    description: "Combatti contro Marco per dimostrare il tuo valore!",
    type: "main",
    chapter: 1,
    location: "arena_principianti",
    giver: "Prof. Barcaro",
    objectives: [
      { type: "talk", target: "Prof. Barcaro", description: "Vai all'arena" },
      { type: "defeat", target: "Marco", description: "Sconfiggi Marco" }
    ],
    rewards: [
      { type: "money", amount: 500, description: "₿500" },
      { type: "keyItem", item: "pokedex", description: "POKéDEX!" }
    ],
    prerequisites: ["choice_of_destiny"],
    repeatable: false,
  },
  {
    id: "explore_canalborgo",
    name: "Esplora Canalborgo",
    description: "Esplora la città e parla con gli abitanti",
    type: "main",
    chapter: 2,
    location: "canalborgo",
    giver: "Narratore",
    objectives: [
      { type: "visit", target: "piazza_centrale", description: "Visita la piazza centrale" },
      { type: "visit", target: "negozio_canar", description: "Trova il negozio" },
      { type: "visit", target: "centro_besti", description: "Trova il Centro Besti" }
    ],
    rewards: [
      { type: "item", item: "gondolball", amount: 5, description: "5 Gondolball" }
    ],
    prerequisites: ["first_battle"],
    repeatable: false,
  },
  {
    id: "first_wild_battle",
    name: "Prima Battaglia Selvatica",
    description: "Trova e cattura il tuo primo Besti selvatico!",
    type: "main",
    chapter: 2,
    location: "route1",
    giver: "Narratore",
    objectives: [
      { type: "defeat", target: "wild", description: "Trova un Besti selvatico", amount: 1 },
      { type: "capture", target: "wild", description: "Cattura un Besti", amount: 1 }
    ],
    rewards: [
      { type: "experience", amount: 200, description: "200 EXP" }
    ],
    prerequisites: ["explore_canalborgo"],
    repeatable: false,
  },
  {
    id: "welcome_to_spritzia",
    name: "Benvenuto a Spritzia",
    description: "Esplora la città dell'aperitivo",
    type: "main",
    chapter: 3,
    location: "spritzia",
    giver: "Cittadino",
    objectives: [
      { type: "visit", target: "spritzia_piazza", description: "Visita la piazza principale" },
      { type: "visit", target: "spritzia_bar", description: "Trova il Bar Spritz" },
      { type: "talk", target: "Bepi lo Spritzaro", description: "Trova il Gym Leader" }
    ],
    rewards: [
      { type: "item", item: "pozione", amount: 3, description: "3 Pozioni" }
    ],
    prerequisites: ["first_wild_battle"],
    repeatable: false,
  },
  {
    id: "defeat_spritzia_gym",
    name: "Gym Spritzia - Il Re dell'Aperitivo",
    description: "Sconfiggi Bepi lo Spritzaro e ottieni il Badge Aperitivo!",
    type: "main",
    chapter: 3,
    location: "gym_spritzia",
    giver: "Bepi lo Spritzaro",
    objectives: [
      { type: "visit", target: "gym_spritzia", description: "Entra nel Gym" },
      { type: "defeat", target: "Bepi lo Spritzaro", description: "Sconfiggi il Gym Leader" }
    ],
    rewards: [
      { type: "badge", item: "badge_aperitivo", description: "BADGE APERITIVO!" },
      { type: "tm", item: "TM_Spritz_Explosivo", description: "TM Spritz Explosivo" },
      { type: "money", amount: 1000, description: "₿1000" }
    ],
    prerequisites: ["welcome_to_spritzia"],
    repeatable: false,
  },
  {
    id: "compagnia_intro",
    name: "La Compagnia della Polenta",
    description: "Scopri l'esistenza della Compagnia della Polenta",
    type: "main",
    chapter: 4,
    location: "route2",
    giver: "Grint della Polenta",
    objectives: [
      { type: "defeat", target: "Grint della Polenta", description: "Sconfiggi il Grint" },
      { type: "talk", target: "Contadino Bepi", description: "Parla con il contadino" }
    ],
    rewards: [
      { type: "experience", amount: 300, description: "300 EXP" }
    ],
    prerequisites: ["defeat_spritzia_gym"],
    repeatable: false,
  },
  {
    id: "save_farmer",
    name: "Salva il Contadino",
    description: "Aiuta il contadino Bepi a recuperare il suo radicchio!",
    type: "side",
    chapter: 4,
    location: "route2",
    giver: "Contadino Bepi",
    objectives: [
      { type: "defeat", target: "Grint della Polenta", description: "Sconfiggi i Grint", amount: 3 },
      { type: "collect", target: "radicchio_rubato", description: "Recupera il radicchio" }
    ],
    rewards: [
      { type: "item", item: "radicchio_dorato", description: "Radicchio Dorato" },
      { type: "money", amount: 500, description: "₿500" }
    ],
    prerequisites: ["compagnia_intro"],
    repeatable: false,
  },
  {
    id: "welcome_to_veronara",
    name: "Benvenuto a Veronara",
    description: "Esplora la città dell'amore e dell'Arena",
    type: "main",
    chapter: 5,
    location: "veronara",
    giver: "Cittadino",
    objectives: [
      { type: "visit", target: "veronara_arena", description: "Trova l'Arena" },
      { type: "talk", target: "Giuliano Arena", description: "Incontra il Gym Leader" }
    ],
    rewards: [
      { type: "item", item: "pozione", amount: 5, description: "5 Pozioni" }
    ],
    prerequisites: ["compagnia_intro"],
    repeatable: false,
  },
  {
    id: "defeat_veronara_gym",
    name: "Gym Veronara - L'Arena dell'Amore",
    description: "Sconfiggi Giuliano Arena e ottieni il Badge Arena!",
    type: "main",
    chapter: 5,
    location: "gym_veronara",
    giver: "Giuliano Arena",
    objectives: [
      { type: "visit", target: "gym_veronara", description: "Entra nel Gym" },
      { type: "defeat", target: "Giuliano Arena", description: "Sconfiggi il Gym Leader" }
    ],
    rewards: [
      { type: "badge", item: "badge_arena", description: "BADGE ARENA!" },
      { type: "tm", item: "TM_Cuore_Guerriero", description: "TM Cuore Guerriero" },
      { type: "money", amount: 1500, description: "₿1500" }
    ],
    prerequisites: ["welcome_to_veronara"],
    repeatable: false,
  },
  {
    id: "padoana_university",
    name: "L'Università di Padoana",
    description: "Visita l'Università e incontra il Professor Sansovino",
    type: "main",
    chapter: 6,
    location: "padoana",
    giver: "Prof. Sansovino",
    objectives: [
      { type: "visit", target: "padoana_universita", description: "Entra nell'Università" },
      { type: "talk", target: "Prof. Sansovino", description: "Parla con Sansovino" },
      { type: "visit", target: "gym_padoana", description: "Trova il Gym" }
    ],
    rewards: [
      { type: "keyItem", item: "carta_studente", description: "Carta Studente" }
    ],
    prerequisites: ["defeat_veronara_gym"],
    repeatable: false,
  },
  {
    id: "sansovino_truth",
    name: "La Verità su Venetia",
    description: "Scopri la vera storia di Venetia e della tua famiglia",
    type: "main",
    chapter: 6,
    location: "padoana_universita",
    giver: "Prof. Sansovino",
    objectives: [
      { type: "talk", target: "Prof. Sansovino", description: "Ascolta la storia", amount: 5 },
      { type: "visit", target: "biblioteca", description: "Visita la biblioteca" }
    ],
    rewards: [
      { type: "experience", amount: 500, description: "500 EXP" }
    ],
    prerequisites: ["padoana_university"],
    repeatable: false,
  },
  {
    id: "defeat_padoana_gym",
    name: "Gym Padoana - La Saggezza",
    description: "Sconfiggi il Prof. Sansovino e ottieni il Badge Studio!",
    type: "main",
    chapter: 6,
    location: "gym_padoana",
    giver: "Prof. Sansovino",
    objectives: [
      { type: "visit", target: "gym_padoana", description: "Entra nel Gym" },
      { type: "defeat", target: "Prof. Sansovino", description: "Sconfiggi il Gym Leader" }
    ],
    rewards: [
      { type: "badge", item: "badge_studio", description: "BADGE STUDIO!" },
      { type: "tm", item: "TM_Pensiero_Critico", description: "TM Pensiero Critico" },
      { type: "money", amount: 2000, description: "₿2000" }
    ],
    prerequisites: ["sansovino_truth"],
    repeatable: false,
  },
  {
    id: "golden_radish",
    name: "Il Radicchio Dorato",
    description: "Trova e recupera il Radicchio Dorato da Nonno Gino",
    type: "side",
    chapter: 7,
    location: "trevisella",
    giver: "Nonno Gino",
    objectives: [
      { type: "talk", target: "Nonno Gino", description: "Parla con Nonno Gino" },
      { type: "visit", target: "campo_nascosto", description: "Trova il campo nascosto" },
      { type: "collect", target: "radicchio_dorato", description: "Recupera il Radicchio" }
    ],
    rewards: [
      { type: "item", item: "pietra_natura", description: "Pietra Natura" }
    ],
    prerequisites: ["defeat_padoana_gym"],
    repeatable: false,
  },
  {
    id: "defeat_trevisella_gym",
    name: "Gym Trevisella - Il Radicchio",
    description: "Sconfiggi Nonna Gina e ottieni il Badge Radicchio!",
    type: "main",
    chapter: 7,
    location: "gym_trevisella",
    giver: "Nonna Gina",
    objectives: [
      { type: "visit", target: "gym_trevisella", description: "Entra nel Gym" },
      { type: "defeat", target: "Nonna Gina", description: "Sconfiggi il Gym Leader" }
    ],
    rewards: [
      { type: "badge", item: "badge_radicchio", description: "BADGE RADICCIO!" },
      { type: "tm", item: "TM_Cura_Natura", description: "TM Cura Natura" },
      { type: "money", amount: 2500, description: "₿2500" }
    ],
    prerequisites: ["golden_radish"],
    repeatable: false,
  },
  {
    id: "frozen_cave",
    name: "La Caverna di Ghiaccio",
    description: "Esplora la caverna e trova Dolomitor",
    type: "side",
    chapter: 8,
    location: "cave_dolomitor",
    giver: "Regina Ghiacci",
    objectives: [
      { type: "visit", target: "cave_dolomitor", description: "Entra nella caverna" },
      { type: "defeat", target: "nevelet", description: "Sconfiggi i Nevelet", amount: 5 },
      { type: "visit", target: "dolomitor_shrine", description: "Trova Dolomitor" }
    ],
    rewards: [
      { type: "item", item: "pietra_ghiaccio", description: "Pietra Ghiaccio" }
    ],
    prerequisites: ["defeat_trevisella_gym"],
    repeatable: false,
  },
  {
    id: "defeat_dolomax_gym",
    name: "Gym Dolomax - Il Ghiaccio Eterno",
    description: "Sconfiggi la Regina dei Ghiacci e ottieni il Badge Ghiaccio!",
    type: "main",
    chapter: 8,
    location: "gym_dolomax",
    giver: "Regina Ghiacci",
    objectives: [
      { type: "visit", target: "gym_dolomax", description: "Entra nel Gym" },
      { type: "defeat", target: "Regina Ghiacci", description: "Sconfiggi il Gym Leader" }
    ],
    rewards: [
      { type: "badge", item: "badge_ghiaccio", description: "BADGE GHIACCIO!" },
      { type: "tm", item: "TM_Blizzard", description: "TM Blizzard" },
      { type: "money", amount: 3000, description: "₿3000" }
    ],
    prerequisites: ["frozen_cave"],
    repeatable: false,
  },
  {
    id: "elite_four_challenge",
    name: "La Lega dei Campioni",
    description: "Affronta la Elite Four!",
    type: "main",
    chapter: 9,
    location: "league_champion",
    giver: "Gondoliere",
    objectives: [
      { type: "visit", target: "league_champion", description: "Entra nella Lega" },
      { type: "defeat", target: "Elite_1", description: "Sconfiggi Elite 1 - Il Fuocoso" },
      { type: "defeat", target: "Elite_2", description: "Sconfiggi Elite 2 - L'Acquoso" },
      { type: "defeat", target: "Elite_3", description: "Sconfiggi Elite 3 - Il Naturale" },
      { type: "defeat", target: "Elite_4", description: "Sconfiggi Elite 4 - Il Magico" }
    ],
    rewards: [
      { type: "experience", amount: 5000, description: "5000 EXP" }
    ],
    prerequisites: ["defeat_dolomax_gym"],
    repeatable: false,
  },
  {
    id: "champion_battle",
    name: "La Sfida Finale",
    description: "Affronta Maestro Marco e diventa Campione!",
    type: "main",
    chapter: 9,
    location: "league_champion",
    giver: "Maestro Marco",
    objectives: [
      { type: "defeat", target: "Maestro Marco", description: "Sconfiggi Maestro Marco" }
    ],
    rewards: [
      { type: "badge", item: "badge_campione", description: "Titolo di CAMPIONE!" },
      { type: "money", amount: 10000, description: "₿10000" },
      { type: "keyItem", item: "coppa_venetia", description: "Coppa di Venetia" }
    ],
    prerequisites: ["elite_four_challenge"],
    repeatable: false,
  },
  {
    id: "final_polenta",
    name: "La Battaglia Finale",
    description: "Entra nella base della Polenta e sconfiggi Dux Polenta!",
    type: "main",
    chapter: 10,
    location: "base_polenta",
    giver: "Narratore",
    objectives: [
      { type: "visit", target: "base_polenta", description: "Entra nella base" },
      { type: "defeat", target: "Grint_Forte", description: "Sconfiggi i Grint", amount: 5 },
      { type: "defeat", target: "Dux Polenta", description: "Sconfiggi Dux Polenta" }
    ],
    rewards: [
      { type: "experience", amount: 10000, description: "10000 EXP" },
      { type: "keyItem", item: "medaglia_eroe", description: "Medaglia Eroe di Venetia" }
    ],
    prerequisites: ["champion_battle"],
    repeatable: false,
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// MISSIONI SECONDARIE
// ═══════════════════════════════════════════════════════════════════════════════

export const SIDE_QUESTS: Quest[] = [
  {
    id: "meet_the_locals",
    name: "Gente del Posto",
    description: "Parla con tutti gli NPC di Canalborgo",
    type: "character",
    chapter: 2,
    location: "canalborgo",
    giver: "Narratore",
    objectives: [
      { type: "talk", target: "Pescatore Toni", description: "Parla con il Pescatore" },
      { type: "talk", target: "Nonna Teresa", description: "Parla con Nonna Teresa" },
      { type: "talk", target: "Marco Studente", description: "Parla con Marco" }
    ],
    rewards: [
      { type: "item", item: "pozione", amount: 2, description: "2 Pozioni" }
    ],
    prerequisites: ["first_battle"],
    repeatable: false,
  },
  {
    id: "route_challenges_2",
    name: "Sfide di Route 2",
    description: "Sconfiggi tutti i trainer di Route 2",
    type: "side",
    chapter: 4,
    location: "route2",
    giver: "Narratore",
    objectives: [
      { type: "defeat", target: "trainer_1", description: "Sconfiggi il Viticultore", amount: 1 },
      { type: "defeat", target: "trainer_2", description: "Sconfiggi il Bel Mez", amount: 1 },
      { type: "defeat", target: "trainer_3", description: "Sconfiggi la Donna Fighera", amount: 1 }
    ],
    rewards: [
      { type: "money", amount: 800, description: "₿800" }
    ],
    prerequisites: ["defeat_spritzia_gym"],
    repeatable: false,
  },
  {
    id: "spritzia_shopping",
    name: "Shopping a Spritzia",
    description: "Compra almeno 10 oggetti dal negozio",
    type: "character",
    chapter: 3,
    location: "spritzia",
    giver: "Negoziante",
    objectives: [
      { type: "visit", target: "negozio_spritzia", description: "Vai al negozio" },
      { type: "collect", target: "oggetti", description: "Compra 10 oggetti", amount: 10 }
    ],
    rewards: [
      { type: "item", item: "carta_sconto", description: "Carta Sconto -10%" }
    ],
    prerequisites: ["welcome_to_spritzia"],
    repeatable: false,
  },
  {
    id: "giuliano_story",
    name: "La Storia di Giuliano",
    description: "Ascolta la triste storia d'amore di Giuliano",
    type: "character",
    chapter: 5,
    location: "veronara",
    giver: "Giuliano Arena",
    objectives: [
      { type: "talk", target: "Giuliano Arena", description: "Parla con Giuliano", amount: 3 }
    ],
    rewards: [
      { type: "item", item: "pietra_arena", description: "Pietra Arena (rara)" }
    ],
    prerequisites: ["welcome_to_veronara"],
    repeatable: false,
  },
  {
    id: "catch_em_all",
    name: "Catturali Tutti!",
    description: "Cattura almeno 20 Besti diversi",
    type: "collection",
    chapter: 6,
    location: "any",
    giver: "Prof. Barcaro",
    objectives: [
      { type: "capture", target: "any_bestia", description: "Cattura Besti", amount: 20 }
    ],
    rewards: [
      { type: "keyItem", item: "cattura_master", description: "Titolo Cattura Master" }
    ],
    prerequisites: ["defeat_veronara_gym"],
    repeatable: false,
  },
  {
    id: "bestia_dex_complete",
    name: "BestiDex Completo",
    description: "Vedi tutte le voci del BestiDex",
    type: "collection",
    chapter: 10,
    location: "any",
    giver: "Prof. Barcaro",
    objectives: [
      { type: "visit", target: "bestidex", description: "Completa il BestiDex" }
    ],
    rewards: [
      { type: "keyItem", item: "bestidex_nazionale", description: "BestiDex Nazionale" }
    ],
    prerequisites: ["champion_battle"],
    repeatable: false,
  },
  {
    id: "hunt_treasure",
    name: "Caccia al Tesoro",
    description: "Trova tutti i tesori nascosti nella regione",
    type: "collection",
    chapter: 7,
    location: "all",
    giver: "Mappa Tesoro",
    objectives: [
      { type: "collect", target: "tesoro_1", description: "Trova il tesoro nascosto 1" },
      { type: "collect", target: "tesoro_2", description: "Trova il tesoro nascosto 2" },
      { type: "collect", target: "tesoro_3", description: "Trova il tesoro nascosto 3" }
    ],
    rewards: [
      { type: "money", amount: 5000, description: "₿5000" },
      { type: "item", item: "tesoro_leggendario", description: "Tesoro Leggendario" }
    ],
    prerequisites: ["defeat_trevisella_gym"],
    repeatable: false,
  },
  {
    id: "master_trainer",
    name: "Il Maestro Trainer",
    description: "Sconfiggi tutti i trainer avanzati",
    type: "side",
    chapter: 9,
    location: "all",
    giver: "Maestro Marco",
    objectives: [
      { type: "defeat", target: "trainer_avanzato", description: "Sconfiggi trainer avanzati", amount: 20 }
    ],
    rewards: [
      { type: "tm", item: "TM_Maestro", description: "TM Maestro Trainer" }
    ],
    prerequisites: ["champion_battle"],
    repeatable: false,
  },
  {
    id: "explore_villa",
    name: "La Villa Nascosta",
    description: "Esplora la Villa Veneta e scopri i suoi segreti",
    type: "side",
    chapter: 6,
    location: "villa_veneta",
    giver: "Nobildonna",
    objectives: [
      { type: "visit", target: "villa_veneta", description: "Entra nella villa" },
      { type: "visit", target: "villa_veneta_2", description: "Sali al piano 2" },
      { type: "visit", target: "villa_veneta_3", description: "Sali al piano 3" },
      { type: "collect", target: "tesoro_villa", description: "Trova il tesoro nascosto" }
    ],
    rewards: [
      { type: "item", item: "mascheraball", description: "Mascheraball" },
      { type: "money", amount: 2000, description: "₿2000" }
    ],
    prerequisites: ["sansovino_truth"],
    repeatable: false,
  },
  {
    id: "museum_mystery",
    name: "Il Mistero del Museo",
    description: "Indaga sul Museo dei Besti e scopri cosa nasconde",
    type: "side",
    chapter: 6,
    location: "museo_besti",
    giver: "Guida",
    objectives: [
      { type: "visit", target: "museo_besti", description: "Entra nel museo" },
      { type: "collect", target: "fossile_uovo", description: "Trova il fossile" },
      { type: "visit", target: "museo_besti_2", description: "Sali al piano superiore" },
      { type: "defeat", target: "guardiano_museo", description: "Sconfiggi il guardiano" }
    ],
    rewards: [
      { type: "item", item: "diario_doge", description: "Diario del Doge" },
      { type: "experience", amount: 500, description: "500 EXP" }
    ],
    prerequisites: ["padoana_university"],
    repeatable: false,
  },
  {
    id: "cave_explorer",
    name: "L'Esploratore delle Grotte",
    description: "Esplora la Grotta Segreta e raggiungi il tesoro",
    type: "side",
    chapter: 8,
    location: "grotta_segreta",
    giver: "Speleologo",
    objectives: [
      { type: "visit", target: "grotta_segreta", description: "Entra nella grotta" },
      { type: "visit", target: "grotta_segreta_2", description: "Scendi al livello 2" },
      { type: "defeat", target: "speleologo", description: "Sconfiggi lo Speleologo" },
      { type: "visit", target: "grotta_segreta_3", description: "Raggiungi il santuario" },
      { type: "collect", target: "tesoro_finale", description: "Ottieni il tesoro finale" }
    ],
    rewards: [
      { type: "item", item: "carnevaleball", description: "Carnevaleball" },
      { type: "item", item: "maschera_doge", description: "Maschera del Doge" },
      { type: "money", amount: 5000, description: "₿5000" }
    ],
    prerequisites: ["defeat_dolomax_gym"],
    repeatable: false,
  },
  {
    id: "tower_view",
    name: "La Vista dalla Torre",
    description: "Scala la Torre di Osservazione e ammira il panorama",
    type: "side",
    chapter: 8,
    location: "torre_osservazione",
    giver: "Guardiano",
    objectives: [
      { type: "visit", target: "torre_osservazione", description: "Entra nella torre" },
      { type: "visit", target: "torre_osservazione_2", description: "Sali in cima" },
      { type: "collect", target: "pietra_alba", description: "Trova la Pietra Alba" }
    ],
    rewards: [
      { type: "item", item: "pietra_alba", description: "Pietra Alba" },
      { type: "experience", amount: 300, description: "300 EXP" }
    ],
    prerequisites: ["defeat_trevisella_gym"],
    repeatable: false,
  },
  {
    id: "temple_secrets",
    name: "I Segreti del Tempio",
    description: "Entra nel Tempio Antico e scopri la verità",
    type: "side",
    chapter: 7,
    location: "tempio_antico",
    giver: "Sacerdote",
    objectives: [
      { type: "visit", target: "tempio_antico", description: "Entra nel tempio" },
      { type: "collect", target: "sigillo_doge", description: "Trova il Sigillo del Doge" },
      { type: "visit", target: "tempio_antico_2", description: "Scendi al livello 2" },
      { type: "defeat", target: "guardiano_sacro", description: "Sconfiggi il Guardiano Sacro" },
      { type: "visit", target: "tempio_antico_3", description: "Raggiungi il santuario" },
      { type: "collect", target: "tesoro_sacro", description: "Ottieni il tesoro sacro" }
    ],
    rewards: [
      { type: "item", item: "anello_doge", description: "Anello del Doge" },
      { type: "item", item: "mappa_antica", description: "Mappa Antica" },
      { type: "money", amount: 3000, description: "₿3000" }
    ],
    prerequisites: ["sansovino_truth"],
    repeatable: false,
  },
  {
    id: "underground_lab",
    name: "Il Laboratorio Segreto",
    description: "Trova e explora il laboratorio segreto sotto Canalborgo",
    type: "side",
    chapter: 3,
    location: "lab_segreto",
    giver: "Scienziato",
    objectives: [
      { type: "visit", target: "lab_segreto", description: "Trova il laboratorio" },
      { type: "defeat", target: "guardia_lab", description: "Sconfiggi la guardia" },
      { type: "visit", target: "lab_segreto_2", description: "Scopri i segreti" },
      { type: "collect", target: "tesoro_lab", description: "Ottieni il tesoro del lab" }
    ],
    rewards: [
      { type: "item", item: "dogeball", description: "Dogeball" },
      { type: "item", item: "maschera_doge", description: "Maschera del Doge" }
    ],
    prerequisites: ["defeat_spritzia_gym"],
    repeatable: false,
  },
  {
    id: "beach_day",
    name: "Una Giornata in Spiaggia",
    description: "Rilassati alla spiaggia di Gardalago e cattura Besti marini",
    type: "side",
    chapter: 9,
    location: "spiaggia",
    giver: "Bagnino",
    objectives: [
      { type: "visit", target: "spiaggia", description: "Vai alla spiaggia" },
      { type: "capture", target: "bestia_acqua", description: "Cattura Besti d'acqua", amount: 3 }
    ],
    rewards: [
      { type: "item", item: "scampaball", description: "Scampaball x5" },
      { type: "money", amount: 500, description: "₿500" }
    ],
    prerequisites: ["defeat_dolomax_gym"],
    repeatable: false,
  },
  {
    id: "nonno_wisdom",
    name: "La Saggezza del Nonno",
    description: "Ascolta le storie del Nonno e ricevi la sua benedizione",
    type: "side",
    chapter: 4,
    location: "casa_nonno",
    giver: "Nonno",
    objectives: [
      { type: "visit", target: "casa_nonno", description: "Vai a casa del nonno" },
      { type: "talk", target: "Nonno", description: "Ascolta le storie", amount: 3 },
      { type: "visit", target: "casa_nonno_2", description: "Guarda di sopra" },
      { type: "collect", target: "ricetta", description: "Ottieni la Ricetta Segreta" }
    ],
    rewards: [
      { type: "item", item: "ricetta_segreta", description: "Ricetta Segreta" },
      { type: "experience", amount: 200, description: "200 EXP" }
    ],
    prerequisites: ["defeat_spritzia_gym"],
    repeatable: false,
  },
  {
    id: "gym_canalborgo",
    name: "Gym Canalborgo - Il Canale",
    description: "Completa la Palestra Canalborgo e ottieni il Badge Gondola!",
    type: "main",
    chapter: 2,
    location: "gym_canalborgo",
    giver: "Leader Marco",
    objectives: [
      { type: "visit", target: "gym_canalborgo", description: "Entra nel Gym" },
      { type: "defeat", target: "allenatore_1", description: "Sconfiggi gli sfidanti" },
      { type: "visit", target: "gym_canalborgo_2", description: "Sali al piano 2" },
      { type: "defeat", target: "Leader Marco", description: "Sconfiggi il Leader" }
    ],
    rewards: [
      { type: "badge", item: "badge_gondola", description: "BADGE GONDOLA!" },
      { type: "tm", item: "TM_Surf_Canali", description: "TM Surf Canali" },
      { type: "money", amount: 800, description: "₿800" }
    ],
    prerequisites: ["explore_canalborgo"],
    repeatable: false,
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// FUNZIONI UTILITY
// ═══════════════════════════════════════════════════════════════════════════════

export function getQuestsByChapter(chapter: number): Quest[] {
  return [...MAIN_QUESTS, ...SIDE_QUESTS].filter(q => q.chapter === chapter)
}

export function getQuestsByLocation(location: string): Quest[] {
  return [...MAIN_QUESTS, ...SIDE_QUESTS].filter(q => q.location === location)
}

export function getMainQuests(): Quest[] {
  return MAIN_QUESTS
}

export function getSideQuests(): Quest[] {
  return SIDE_QUESTS
}

export function getQuestById(id: string): Quest | undefined {
  return [...MAIN_QUESTS, ...SIDE_QUESTS].find(q => q.id === id)
}

export function checkQuestPrerequisites(questId: string, completedQuests: string[]): boolean {
  const quest = getQuestById(questId)
  if (!quest) return false
  return quest.prerequisites.every(prereq => completedQuests.includes(prereq))
}

export function getAvailableQuests(completedQuests: string[], currentChapter: number): Quest[] {
  return [...MAIN_QUESTS, ...SIDE_QUESTS].filter(quest => {
    if (completedQuests.includes(quest.id)) return false
    if (quest.chapter > currentChapter) return false
    return checkQuestPrerequisites(quest.id, completedQuests)
  })
}

export default {
  GAME_CHAPTERS,
  MAIN_QUESTS,
  SIDE_QUESTS,
  getQuestById,
  getQuestsByChapter,
  getQuestsByLocation,
  getAvailableQuests,
  checkQuestPrerequisites,
}
