// Besti (Monster) Data - Complete with Evolution System
export interface Bestia {
  id: string
  name: string
  types: string[]
  desc: string
  bs: { hp: number; atk: number; def: number; spd: number }
  ev?: string
  evLvl?: number
  evItem?: string
  moves: string[]
  moveLearn?: { at: number; move: string }[]
  isLegendary?: boolean
  eggGroup?: string
  catchRate?: number
  expYield?: number
}

export const BESTI: Record<string, Bestia> = {
  // ═══════════════════════════════════════════════════════════════
  // STARTERS (3 scelte iniziali)
  // ═══════════════════════════════════════════════════════════════
  fogaron: { 
    id: 1, name: 'Fogaron', types: ['fire'], 
    desc: 'Drago di fuoco nato dai falò veneti. Ama le notti calde.', 
    bs: { hp: 45, atk: 60, def: 40, spd: 50 },
    ev: 'fogarox', evLvl: 16,
    moves: ['Ardore', 'Morso', 'Ruggito', 'Lava'],
    moveLearn: [{ at: 1, move: 'Ardore' }, { at: 5, move: 'Ruggito' }, { at: 9, move: 'Morso' }, { at: 13, move: 'Lava' }],
    catchRate: 45, expYield: 65,
  },
  fogarox: { 
    id: 2, name: 'Fogarox', types: ['fire'], 
    desc: 'Respira fiamme intense. Il suo fuoco può fondere il ferro.', 
    bs: { hp: 60, atk: 75, def: 55, spd: 65 },
    ev: 'fogarion', evLvl: 36,
    moves: ['Lava', 'Colpo Rapido', 'Falò', 'Dragofiamma'],
    moveLearn: [{ at: 1, move: 'Ardore' }, { at: 5, move: 'Ruggito' }, { at: 9, move: 'Morso' }, { at: 13, move: 'Lava' }, { at: 18, move: 'Falò' }, { at: 25, move: 'Colpo Rapido' }, { at: 32, move: 'Dragofiamma' }],
    catchRate: 45, expYield: 142,
  },
  fogarion: { 
    id: 3, name: 'Fogarion', types: ['fire', 'dragon'], 
    desc: 'Il leggendario drago dei vulcani veneti. La sua fiamma è eterna.', 
    bs: { hp: 80, atk: 100, def: 70, spd: 85 },
    moves: ['Inferno', 'Dragofiamma', 'Volata', 'Terremoto'],
    moveLearn: [{ at: 1, move: 'Ardore' }, { at: 5, move: 'Ruggito' }, { at: 9, move: 'Morso' }, { at: 13, move: 'Lava' }, { at: 18, move: 'Falò' }, { at: 25, move: 'Colpo Rapido' }, { at: 36, move: 'Dragofiamma' }, { at: 45, move: 'Inferno' }],
    isLegendary: false, catchRate: 30, expYield: 218,
  },
  
  radicor: { 
    id: 4, name: 'Radicor', types: ['nature'], 
    desc: 'Ispirato al radicchio di Treviso. Le sue foglie sono curative.', 
    bs: { hp: 50, atk: 45, def: 55, spd: 45 },
    ev: 'radicorso', evLvl: 16,
    moves: ['Vite', 'Assorbi', 'Cresci', 'Radura'],
    moveLearn: [{ at: 1, move: 'Vite' }, { at: 5, move: 'Assorbi' }, { at: 9, move: 'Cresci' }, { at: 13, move: 'Radura' }],
    catchRate: 45, expYield: 65,
  },
  radicorso: { 
    id: 5, name: 'Radicorso', types: ['nature'], 
    desc: 'Le sue foglie hanno poteri curativi straordinari.', 
    bs: { hp: 65, atk: 60, def: 70, spd: 55 },
    ev: 'radicthron', evLvl: 36,
    moves: ['Radura', 'Veleno', 'Sintesi', 'Tempesta Verde'],
    moveLearn: [{ at: 1, move: 'Vite' }, { at: 5, move: 'Assorbi' }, { at: 9, move: 'Cresci' }, { at: 13, move: 'Radura' }, { at: 18, move: 'Sintesi' }, { at: 25, move: 'Veleno' }, { at: 32, move: 'Tempesta Verde' }],
    catchRate: 45, expYield: 142,
  },
  radicthron: { 
    id: 6, name: 'Radicthron', types: ['nature', 'earth'], 
    desc: 'Spirito delle campagne venete. Protegge i raccolti.', 
    bs: { hp: 85, atk: 80, def: 95, spd: 60 },
    moves: ['Tempesta Verde', 'Radice', 'Terremoto', 'Cura Solare'],
    moveLearn: [{ at: 1, move: 'Vite' }, { at: 5, move: 'Assorbi' }, { at: 9, move: 'Cresci' }, { at: 13, move: 'Radura' }, { at: 18, move: 'Sintesi' }, { at: 25, move: 'Veleno' }, { at: 36, move: 'Tempesta Verde' }, { at: 45, move: 'Radice' }],
    isLegendary: false, catchRate: 30, expYield: 218,
  },
  
  canalot: { 
    id: 7, name: 'Canalot', types: ['water'], 
    desc: 'Nuota nei canali e ruba panini ai turisti.', 
    bs: { hp: 50, atk: 40, def: 45, spd: 55 },
    ev: 'canalisk', evLvl: 16,
    moves: ['Splash', 'Bolla', 'Att. Rapido', 'Idropompa'],
    moveLearn: [{ at: 1, move: 'Splash' }, { at: 5, move: 'Bolla' }, { at: 9, move: 'Att. Rapido' }, { at: 13, move: 'Idropompa' }],
    catchRate: 45, expYield: 65,
  },
  canalisk: { 
    id: 8, name: 'Canalisk', types: ['water'], 
    desc: 'Il serpente dei canali. Molto furbo e veloce.', 
    bs: { hp: 65, atk: 55, def: 60, spd: 70 },
    ev: 'canalord', evLvl: 36,
    moves: ['Idropompa', 'Onda', 'Agilità', 'Dragobolla'],
    moveLearn: [{ at: 1, move: 'Splash' }, { at: 5, move: 'Bolla' }, { at: 9, move: 'Att. Rapido' }, { at: 13, move: 'Idropompa' }, { at: 18, move: 'Onda' }, { at: 25, move: 'Agilità' }, { at: 32, move: 'Dragobolla' }],
    catchRate: 45, expYield: 142,
  },
  canalord: { 
    id: 9, name: 'Canalord', types: ['water', 'dragon'], 
    desc: 'Signore dei canali e delle lagune. Temuto dai gondolieri.', 
    bs: { hp: 85, atk: 75, def: 80, spd: 90 },
    moves: ['Tsunami', 'Dragobolla', 'Idrovortice', 'Surf'],
    moveLearn: [{ at: 1, move: 'Splash' }, { at: 5, move: 'Bolla' }, { at: 9, move: 'Att. Rapido' }, { at: 13, move: 'Idropompa' }, { at: 18, move: 'Onda' }, { at: 25, move: 'Agilità' }, { at: 36, move: 'Dragobolla' }, { at: 45, move: 'Tsunami' }],
    isLegendary: false, catchRate: 30, expYield: 218,
  },

  // ═══════════════════════════════════════════════════════════════
  // BESTI COMUNI (prima evoluzione)
  // ═══════════════════════════════════════════════════════════════
  gabbianzo: { 
    id: 10, name: 'Gabbianzo', types: ['air'], 
    desc: 'Gabbiano aggressivo. Ruba il cibo ai bambini.', 
    bs: { hp: 40, atk: 55, def: 30, spd: 70 },
    ev: 'gabbianator', evLvl: 18,
    moves: ['Beccata', 'Tornado', 'Volo'],
    moveLearn: [{ at: 1, move: 'Beccata' }, { at: 6, move: 'Tornado' }, { at: 12, move: 'Volo' }],
    catchRate: 255, expYield: 58,
  },
  gabbianator: { 
    id: 11, name: 'Gabbianator', types: ['air'], 
    desc: 'Tiranno dei cieli veneti. Solo lui comanda i cieli!', 
    bs: { hp: 60, atk: 80, def: 50, spd: 95 },
    moves: ['Urlo del Gabbiano', 'Tornado', 'Picchiata', 'Aeroassalto'],
    catchRate: 120, expYield: 156,
  },
  
  polentaur: { 
    id: 12, name: 'Polentaur', types: ['earth'], 
    desc: 'Creatura di polenta solidificata. Saporito ma pericoloso.', 
    bs: { hp: 70, atk: 60, def: 70, spd: 20 },
    ev: 'polentitan', evLvl: 30,
    moves: ['Polenta Smash', 'Terremoto', 'Protezione'],
    moveLearn: [{ at: 1, move: 'Polenta Smash' }, { at: 8, move: 'Terremoto' }, { at: 15, move: 'Protezione' }],
    catchRate: 200, expYield: 100,
  },
  polentitan: { 
    id: 13, name: 'Polentitan', types: ['earth'], 
    desc: 'Gigante di polenta. Il suo corpo è indistruttibile.', 
    bs: { hp: 100, atk: 85, def: 100, spd: 25 },
    moves: ['Valanga', 'Muro', 'Frana', 'Sfida'],
    catchRate: 90, expYield: 200,
  },
  
  spritzino: { 
    id: 14, name: 'Spritzino', types: ['magic'], 
    desc: 'Mostro frizzante degli aperitivi. Fa ridere chi lo vede.', 
    bs: { hp: 35, atk: 30, def: 30, spd: 80 },
    ev: 'spritzilla', evLvl: 18,
    moves: ['Spritz Splash', 'Bolla', 'Confusione'],
    moveLearn: [{ at: 1, move: 'Spritz Splash' }, { at: 6, move: 'Confusione' }, { at: 12, move: 'Bolla' }],
    catchRate: 255, expYield: 55,
  },
  spritzilla: { 
    id: 15, name: 'Spritzilla', types: ['magic', 'poison'], 
    desc: 'Spritz concentrato letale. Troppo alcol fa male!', 
    bs: { hp: 55, atk: 50, def: 45, spd: 100 },
    moves: ['Spritz Explosivo', 'Tossicità', 'Nebbia', 'Sbornia'],
    catchRate: 120, expYield: 150,
  },
  
  gondolo: { 
    id: 16, name: 'Gondolo', types: ['water'], 
    desc: 'Il gondoliere dei canali. Lavora per pochi soldi.', 
    bs: { hp: 45, atk: 40, def: 50, spd: 60 },
    ev: 'gondrago', evLvl: 22,
    moves: ['Remata', 'Splash', 'Scudo'],
    moveLearn: [{ at: 1, move: 'Remata' }, { at: 6, move: 'Splash' }, { at: 12, move: 'Scudo' }],
    catchRate: 200, expYield: 65,
  },
  gondrago: { 
    id: 17, name: 'Gondrago', types: ['water'], 
    desc: 'Maestro gondoliere. Conosce tutti i canali segreti.', 
    bs: { hp: 65, atk: 55, def: 70, spd: 75 },
    moves: ['Voga', 'Tsunami', 'Gondolata', 'Idroauta'],
    catchRate: 100, expYield: 155,
  },
  
  salamix: { 
    id: 18, name: 'Salamix', types: ['poison'], 
    desc: 'Salamandra velenosa delle cantine venete.', 
    bs: { hp: 40, atk: 50, def: 35, spd: 55 },
    ev: 'salamastro', evLvl: 20,
    moves: ['Coda Velenosa', 'Morso', 'Fumo'],
    moveLearn: [{ at: 1, move: 'Coda Velenosa' }, { at: 6, move: 'Morso' }, { at: 12, move: 'Fumo' }],
    catchRate: 200, expYield: 60,
  },
  salamastro: { 
    id: 19, name: 'Salamastro', types: ['poison'], 
    desc: 'Velenoso del Veneto. Il suo veleno è famoso.', 
    bs: { hp: 60, atk: 75, def: 50, spd: 70 },
    moves: ['Tossina', 'Zanna', 'Fumo', 'Energibomba'],
    catchRate: 90, expYield: 145,
  },
  
  prosecchino: { 
    id: 20, name: 'Prosecchino', types: ['sweet'], 
    desc: 'Bollicine dolci. Il prosecco prende vita!', 
    bs: { hp: 40, atk: 35, def: 40, spd: 75 },
    ev: 'prosecchione', evLvl: 24,
    moves: ['Bolle', 'Dolce', 'Scintilla'],
    moveLearn: [{ at: 1, move: 'Bolle' }, { at: 6, move: 'Dolce' }, { at: 12, move: 'Scintilla' }],
    catchRate: 200, expYield: 70,
  },
  prosecchione: { 
    id: 21, name: 'Prosecchione', types: ['sweet', 'magic'], 
    desc: 'Celebrazioni in forma liquida. Bere con moderazione!', 
    bs: { hp: 60, atk: 55, def: 60, spd: 95 },
    moves: ['Spumante', 'Festeggiamento', 'Sciampagna', 'Sbronza'],
    catchRate: 100, expYield: 165,
  },
  
  mascarin: { 
    id: 22, name: 'Mascarin', types: ['psycho'], 
    desc: 'Maschera veneziana fantasma. Spaventa i turisti.', 
    bs: { hp: 45, atk: 50, def: 40, spd: 60 },
    ev: 'mascarion', evLvl: 28,
    moves: ['Ipnosi', 'Psicoraggio', 'Ombra'],
    moveLearn: [{ at: 1, move: 'Ipnosi' }, { at: 8, move: 'Psicoraggio' }, { at: 15, move: 'Ombra' }],
    catchRate: 180, expYield: 80,
  },
  mascarion: { 
    id: 23, name: 'Mascarion', types: ['psycho'], 
    desc: 'Spirito del carnevale. Porta allegria e paura.', 
    bs: { hp: 65, atk: 70, def: 55, spd: 80 },
    moves: ['Incantamento', 'Psylaser', 'Ombra', 'Ballo'],
    catchRate: 80, expYield: 180,
  },
  
  vespolo: { 
    id: 24, name: 'Vespolo', types: ['electric'], 
    desc: 'Vespa elettrica. Punge e fa anche cortocircuito.', 
    bs: { hp: 35, atk: 45, def: 25, spd: 70 },
    ev: 'vespatron', evLvl: 22,
    moves: ['Tuonoshock', 'Att. Rapido', 'Pungiglione'],
    moveLearn: [{ at: 1, move: 'Tuonoshock' }, { at: 6, move: 'Att. Rapido' }, { at: 12, move: 'Pungiglione' }],
    catchRate: 200, expYield: 75,
  },
  vespatron: { 
    id: 25, name: 'Vespatron', types: ['electric'], 
    desc: 'Sciame elettrico. Può mandare in tilt un quartiere.', 
    bs: { hp: 55, atk: 70, def: 40, spd: 90 },
    moves: ['Tuono', 'Fulmine', 'Sciame', 'Elettroshock'],
    catchRate: 90, expYield: 170,
  },
  
  nevelet: { 
    id: 26, name: 'Nevelet', types: ['ice'], 
    desc: 'Neve delle Dolomiti. Freddo ma adorable.', 
    bs: { hp: 40, atk: 35, def: 45, spd: 55 },
    ev: 'dolomor', evLvl: 24,
    moves: ['Polvere di Neve', 'Vento Gelido', 'Protezione'],
    moveLearn: [{ at: 1, move: 'Polvere di Neve' }, { at: 6, move: 'Vento Gelido' }, { at: 12, move: 'Protezione' }],
    catchRate: 200, expYield: 70,
  },
  dolomor: { 
    id: 27, name: 'Dolomor', types: ['ice'], 
    desc: 'Guardiano delle montagne. Protettore della neve.', 
    bs: { hp: 60, atk: 55, def: 65, spd: 70 },
    moves: ['Blizzard', 'Valanga', 'Congelamento', 'Tempesta'],
    catchRate: 100, expYield: 160,
  },
  
  alpibex: { 
    id: 28, name: 'Alpibex', types: ['earth'], 
    desc: 'Capra delle Alpi. Salta ovunque senza paura.', 
    bs: { hp: 50, atk: 45, def: 55, spd: 60 },
    ev: 'dolomibex', evLvl: 26,
    moves: ['Attacco Corno', 'Pestone', 'Scalata'],
    moveLearn: [{ at: 1, move: 'Attacco Corno' }, { at: 6, move: 'Pestone' }, { at: 12, move: 'Scalata' }],
    catchRate: 200, expYield: 75,
  },
  dolomibex: { 
    id: 29, name: 'Dolomibex', types: ['earth', 'ice'], 
    desc: 'Re delle montagne. Le sue corna sfondano tutto.', 
    bs: { hp: 70, atk: 65, def: 75, spd: 75 },
    moves: ['Valanga', 'Corno Ghiacciato', 'Frana', 'Crollo'],
    catchRate: 90, expYield: 175,
  },
  
  lagunello: { 
    id: 30, name: 'Lagunello', types: ['water'], 
    desc: 'Abitante della laguna. Mangia pesce e alghe.', 
    bs: { hp: 45, atk: 35, def: 50, spd: 60 },
    ev: 'lagunaga', evLvl: 26,
    moves: ['Splash', 'Fango', 'Vortice'],
    moveLearn: [{ at: 1, move: 'Splash' }, { at: 6, move: 'Fango' }, { at: 12, move: 'Vortice' }],
    catchRate: 200, expYield: 65,
  },
  lagunaga: { 
    id: 31, name: 'Lagunaga', types: ['water', 'psycho'], 
    desc: 'Spirito della laguna. Conosce i segreti dell\'acqua.', 
    bs: { hp: 65, atk: 55, def: 70, spd: 80 },
    moves: ['Marea', 'Nebbia', 'Psiconda', 'Tsunami'],
    catchRate: 90, expYield: 165,
  },
  
  smogatto: { 
    id: 32, name: 'Smogatto', types: ['poison'], 
    desc: 'Gatto della nebbia velenosa. Miagola e puzza.', 
    bs: { hp: 45, atk: 50, def: 40, spd: 65 },
    ev: 'fumigor', evLvl: 28,
    moves: ['Gas Velenoso', 'Graffio', 'Fumo'],
    moveLearn: [{ at: 1, move: 'Gas Velenoso' }, { at: 6, move: 'Graffio' }, { at: 12, move: 'Fumo' }],
    catchRate: 200, expYield: 70,
  },
  fumigor: { 
    id: 33, name: 'Fumigor', types: ['poison'], 
    desc: 'Nebbia tossica. Rende ciechi i nemici.', 
    bs: { hp: 65, atk: 70, def: 55, spd: 80 },
    moves: ['Tossina', 'Fumo', 'Veleno', 'Esplosione'],
    catchRate: 90, expYield: 170,
  },
  
  colombo: { 
    id: 34, name: 'Colombo', types: ['air'], 
    desc: 'Piccione veneto. Sporca tutto ma è simpatico.', 
    bs: { hp: 40, atk: 35, def: 40, spd: 55 },
    ev: 'colombarion', evLvl: 24,
    moves: ['Beccata', 'Raffica', 'Vola Via'],
    moveLearn: [{ at: 1, move: 'Beccata' }, { at: 6, move: 'Raffica' }, { at: 12, move: 'Vola Via' }],
    catchRate: 255, expYield: 55,
  },
  colombarion: { 
    id: 35, name: 'Colombarion', types: ['air'], 
    desc: 'Re dei piccioni. Tutti lo rispettano.', 
    bs: { hp: 60, atk: 55, def: 60, spd: 75 },
    moves: ['Beccata', 'Tornado', 'Picchiata', 'Tempesta'],
    catchRate: 120, expYield: 150,
  },
  
  tiramisu: { 
    id: 36, name: 'Tiramisù', types: ['sweet'], 
    desc: 'Crema dolce e caffè. Il dolce più famoso!', 
    bs: { hp: 50, atk: 45, def: 55, spd: 50 },
    ev: 'tiramisuper', evLvl: 26,
    moves: ['Dolce', 'Cura', 'Caffè'],
    moveLearn: [{ at: 1, move: 'Dolce' }, { at: 6, move: 'Cura' }, { at: 12, move: 'Caffè' }],
    catchRate: 180, expYield: 80,
  },
  tiramisuper: { 
    id: 37, name: 'Tiramisuper', types: ['sweet', 'magic'], 
    desc: 'Dolce italiano potente. Una fetta e sei in cielo!', 
    bs: { hp: 75, atk: 65, def: 75, spd: 65 },
    moves: ['Dessert Fatale', 'Super Cura', 'Caffè Bomb', 'Sbornia Dolce'],
    catchRate: 80, expYield: 185,
  },
  
  vignel: { 
    id: 38, name: 'Vignel', types: ['nature'], 
    desc: 'Verme dei vigneti. Ama l\'uva fermentata.', 
    bs: { hp: 35, atk: 40, def: 30, spd: 50 },
    ev: 'vignarbor', evLvl: 20,
    moves: ['Vite', 'Scava', 'Cresci'],
    moveLearn: [{ at: 1, move: 'Vite' }, { at: 6, move: 'Scava' }, { at: 12, move: 'Cresci' }],
    catchRate: 255, expYield: 55,
  },
  vignarbor: { 
    id: 39, name: 'Vignarbor', types: ['nature'], 
    desc: 'Albero dei vigneti. Produce uva magica.', 
    bs: { hp: 55, atk: 60, def: 50, spd: 55 },
    moves: ['Radura', 'Radice', 'Foglie', 'Uva'],
    catchRate: 120, expYield: 140,
  },
  
  formaggion: { 
    id: 40, name: 'Formaggion', types: ['earth'], 
    desc: 'Formaggio stagionato. Più invecchia, più è forte.', 
    bs: { hp: 50, atk: 55, def: 60, spd: 35 },
    ev: 'parmageddon', evLvl: 30,
    moves: ['Ruota di Formaggio', 'Puzza', 'Rotolamento'],
    moveLearn: [{ at: 1, move: 'Ruota di Formaggio' }, { at: 8, move: 'Puzza' }, { at: 15, move: 'Rotolamento' }],
    catchRate: 180, expYield: 90,
  },
  parmageddon: { 
    id: 41, name: 'Parmageddon', types: ['earth'], 
    desc: 'Formaggio degli dei. Il suo odore è leggendario.', 
    bs: { hp: 75, atk: 80, def: 85, spd: 40 },
    moves: ['Grana', 'Stagionato', 'Esplosione', 'Frana'],
    catchRate: 80, expYield: 195,
  },

  // ═══════════════════════════════════════════════════════════════
  // BESTI RARI (non si evolvono in catena)
  // ═══════════════════════════════════════════════════════════════
  focacino: { 
    id: 42, name: 'Focacino', types: ['fire', 'earth'], 
    desc: 'Pane ripieno di formaggio fuso. Caldo e filante!', 
    bs: { hp: 55, atk: 65, def: 60, spd: 45 },
    moves: ['Lava', 'Terremoto', 'Pane', 'Cottura'],
    catchRate: 150, expYield: 120,
  },
  scampetto: { 
    id: 43, name: 'Scampetto', types: ['water'], 
    desc: 'Gambero dei canali. Buono fritto!', 
    bs: { hp: 40, atk: 50, def: 35, spd: 65 },
    moves: ['Bolla', 'Pinzata', 'Schiaffo', 'Idropompa'],
    catchRate: 200, expYield: 75,
  },
  risotto_al_nero: { 
    id: 44, name: 'Risotto al Nero', types: ['water', 'earth'], 
    desc: 'Piatto prelibato veneto. Il nero è il nero di seppia!', 
    bs: { hp: 65, atk: 60, def: 70, spd: 40 },
    moves: ['Fango', 'Idropompa', 'Piatto', 'Soffocamento'],
    catchRate: 100, expYield: 140,
  },
  porchetta_bestia: { 
    id: 45, name: 'Porchetta Bestia', types: ['earth'], 
    desc: 'Maiale arrosto giganto. Profuma di festeggiamenti!', 
    bs: { hp: 80, atk: 70, def: 75, spd: 30 },
    moves: ['Morso', 'Terremoto', 'Profumo', 'Banchetto'],
    catchRate: 80, expYield: 170,
  },
  spritzatore: { 
    id: 46, name: 'Spritzatore', types: ['magic', 'water'], 
    desc: 'Distributore automatico di spritz. Alcool puro!', 
    bs: { hp: 50, atk: 45, def: 55, spd: 70 },
    moves: ['Spritz Splash', 'Bolla Magica', 'Confusione', 'Ubriacatura'],
    catchRate: 150, expYield: 110,
  },
  bacaro_mostro: { 
    id: 47, name: 'Bacaro Mostro', types: ['normal'], 
    desc: 'Basso che mangia e beve tutto il giorno. Il patron!', 
    bs: { hp: 60, atk: 50, def: 50, spd: 55 },
    moves: ['Morso', 'Cicchetto', 'Bevo', 'Ombra'],
    catchRate: 180, expYield: 100,
  },
  topo_granchio: { 
    id: 48, name: 'Topo Granchio', types: ['water'], 
    desc: 'Granchio topo. Non è né un topo né un granchio.', 
    bs: { hp: 45, atk: 55, def: 40, spd: 60 },
    moves: ['Pinza', 'Bolla', 'Attacco Rapido', 'Schiaffo'],
    catchRate: 200, expYield: 85,
  },
  fantasma_laghetto: { 
    id: 49, name: 'Fantasma Laghetto', types: ['water', 'psycho'], 
    desc: 'Spirito dell\'acqua. Si vede solo di notte.', 
    bs: { hp: 50, atk: 45, def: 50, spd: 65 },
    moves: ['Nebbia', 'Psiconda', 'Onda', 'Scomparsa'],
    catchRate: 150, expYield: 100,
  },
  fiore_pantofola: { 
    id: 50, name: 'Fiore Pantofola', types: ['nature', 'magic'], 
    desc: 'Fiore che odora di ciabatte vecchie. Belle!', 
    bs: { hp: 55, atk: 50, def: 60, spd: 50 },
    moves: ['Profumo', 'Pollen', 'Cura', 'Radice'],
    catchRate: 180, expYield: 95,
  },

  // ═══════════════════════════════════════════════════════════════
  // BESTI LEGGENDARI (4 totali)
  // ═══════════════════════════════════════════════════════════════
  dolomitor: { 
    id: 100, name: 'Dolomitor', types: ['ice', 'earth'], 
    desc: 'Spirito delle Dolomiti. Signore del freddo eterno.', 
    bs: { hp: 100, atk: 120, def: 110, spd: 80 },
    moves: ['Valanga', 'Terremoto', 'Blizzard', 'Tempesta'],
    isLegendary: true, catchRate: 5, expYield: 300,
  },
  lagorion: { 
    id: 101, name: 'Lagorion', types: ['water', 'dragon'], 
    desc: 'Signore del lago. Il suo ruggito fa tremare le acque.', 
    bs: { hp: 95, atk: 110, def: 95, spd: 90 },
    moves: ['Tsunami', 'Dragopulso', 'Idropompa', 'Surf'],
    isLegendary: true, catchRate: 5, expYield: 300,
  },
  serenissima: { 
    id: 102, name: 'Serenissima', types: ['psycho', 'air'], 
    desc: 'Spirito di Venezia. Protegge la città lagunare.', 
    bs: { hp: 90, atk: 100, def: 90, spd: 110 },
    moves: ['Psicic', 'Aria Tagliente', 'Nebbia', 'Carnevale'],
    isLegendary: true, catchRate: 5, expYield: 300,
  },
  ombraspritz: { 
    id: 103, name: 'OmbraSpritz', types: ['magic', 'poison'], 
    desc: 'Spirito oscuro degli aperitivi. Troppo spritz fa male!', 
    bs: { hp: 85, atk: 105, def: 85, spd: 100 },
    moves: ['Spritz Explosivo', 'Tossicità', 'Nebbia', 'Sera'],
    isLegendary: true, catchRate: 5, expYield: 300,
  },

  // ═══════════════════════════════════════════════════════════════
  // ULTIMATE (non si cattura, si ottiene dalla storia)
  // ═══════════════════════════════════════════════════════════════
  duxvenetiae: { 
    id: 200, name: 'Dux Venetiae', types: ['dragon', 'psycho'], 
    desc: 'Il Doge supremo di Venetia. Solo il migliore può averlo.', 
    bs: { hp: 120, atk: 130, def: 120, spd: 100 },
    moves: ['Dominio', 'Tsunami', 'Inferno', 'Psicic'],
    catchRate: 1, expYield: 400,
  },
}

// ─────────────────────────────────────────────────────────────────
// I 4 STARTER LEGGENDARI (come Pokemon Marron Merda con Entei/Raikou/Suicune)
// ─────────────────────────────────────────────────────────────────
export const LEGENDARY_STARTERS: Record<string, Bestia> = {
  dolomitor: { 
    id: 100, name: 'Dolomitor', types: ['ice', 'earth'], 
    desc: 'Spirito delle Dolomiti. Signore del freddo eterno. Ha il potere delle montagne innevate. Starter leggendario!', 
    bs: { hp: 100, atk: 120, def: 110, spd: 80 },
    moves: ['Valanga', 'Terremoto', 'Blizzard', 'Tempesta'],
    isLegendary: true, catchRate: 5, expYield: 300,
  },
  lagorion: { 
    id: 101, name: 'Lagorion', types: ['water', 'dragon'], 
    desc: 'Signore del lago. Il suo ruggito fa tremare le acque. Starter leggendario!', 
    bs: { hp: 95, atk: 110, def: 95, spd: 90 },
    moves: ['Tsunami', 'Dragopulso', 'Idropompa', 'Surf'],
    isLegendary: true, catchRate: 5, expYield: 300,
  },
  serenissima: { 
    id: 102, name: 'Serenissima', types: ['psycho', 'air'], 
    desc: 'Spirito di Venezia. Protegge la città lagunare. Starter leggendario!', 
    bs: { hp: 90, atk: 100, def: 90, spd: 110 },
    moves: ['Psicic', 'Aria Tagliente', 'Nebbia', 'Carnevale'],
    isLegendary: true, catchRate: 5, expYield: 300,
  },
  ombradriz: { 
    id: 103, name: 'OmbraSpritz', types: ['magic', 'poison'], 
    desc: 'Spirito oscuro degli aperitivi. Starter leggendario!', 
    bs: { hp: 85, atk: 105, def: 85, spd: 100 },
    moves: ['Spritz Explosivo', 'Tossicità', 'Nebbia', 'Sera'],
    isLegendary: true, catchRate: 5, expYield: 300,
  },
}

// All move data
export interface MoveData {
  name: string
  power: number
  accuracy: number
  pp: number
  type: string
  effect?: string
}

export const MOVES: Record<string, MoveData> = {
  // Normali
  Ardore: { name: 'Ardore', power: 40, accuracy: 100, pp: 35, type: 'fire' },
  Ruggito: { name: 'Ruggito', power: 0, accuracy: 100, pp: 40, type: 'normal', effect: 'lower_def' },
  Morso: { name: 'Morso', power: 50, accuracy: 100, pp: 25, type: 'normal' },
  Lava: { name: 'Lava', power: 60, accuracy: 100, pp: 20, type: 'fire' },
  Falò: { name: 'Falò', power: 70, accuracy: 95, pp: 15, type: 'fire' },
  Inferno: { name: 'Inferno', power: 100, accuracy: 75, pp: 5, type: 'fire' },
  Dragofiamma: { name: 'Dragofiamma', power: 80, accuracy: 100, pp: 10, type: 'dragon' },
  
  // Acqua
  Splash: { name: 'Splash', power: 0, accuracy: 100, pp: 40, type: 'water', effect: 'flavor' },
  Bolla: { name: 'Bolla', power: 30, accuracy: 100, pp: 30, type: 'water' },
  'Att. Rapido': { name: 'Att. Rapido', power: 40, accuracy: 100, pp: 30, type: 'normal' },
  Idropompa: { name: 'Idropompa', power: 65, accuracy: 100, pp: 20, type: 'water' },
  Onda: { name: 'Onda', power: 55, accuracy: 100, pp: 20, type: 'water' },
  Tsunami: { name: 'Tsunami', power: 90, accuracy: 100, pp: 10, type: 'water' },
  Surf: { name: 'Surf', power: 80, accuracy: 100, pp: 10, type: 'water' },
  
  // Natura
  Vite: { name: 'Vite', power: 30, accuracy: 100, pp: 30, type: 'nature' },
  Assorbi: { name: 'Assorbi', power: 30, accuracy: 100, pp: 25, type: 'nature', effect: 'heal' },
  Cresci: { name: 'Cresci', power: 0, accuracy: 100, pp: 40, type: 'nature', effect: 'raise_atk' },
  Radura: { name: 'Radura', power: 55, accuracy: 100, pp: 20, type: 'nature' },
  Sintesi: { name: 'Sintesi', power: 70, accuracy: 95, pp: 15, type: 'nature' },
  'Tempesta Verde': { name: 'Tempesta Verde', power: 85, accuracy: 90, pp: 10, type: 'nature' },
  Radice: { name: 'Radice', power: 60, accuracy: 100, pp: 20, type: 'earth' },
  'Cura Solare': { name: 'Cura Solare', power: 0, accuracy: 100, pp: 10, type: 'nature', effect: 'heal_party' },
  
  // Terra
  'Polenta Smash': { name: 'Polenta Smash', power: 50, accuracy: 100, pp: 20, type: 'earth' },
  Terremoto: { name: 'Terremoto', power: 80, accuracy: 100, pp: 10, type: 'earth' },
  Protezione: { name: 'Protezione', power: 0, accuracy: 100, pp: 20, type: 'earth', effect: 'protect' },
  Valanga: { name: 'Valanga', power: 75, accuracy: 90, pp: 15, type: 'ice' },
  Muro: { name: 'Muro', power: 0, accuracy: 100, pp: 15, type: 'earth', effect: 'def_up' },
  Frana: { name: 'Frana', power: 60, accuracy: 95, pp: 15, type: 'earth' },
  
  // Aria
  Beccata: { name: 'Beccata', power: 35, accuracy: 100, pp: 35, type: 'air' },
  Tornado: { name: 'Tornado', power: 40, accuracy: 100, pp: 25, type: 'air' },
  Volo: { name: 'Volo', power: 70, accuracy: 95, pp: 15, type: 'air' },
  'Urlo del Gabbiano': { name: 'Urlo del Gabbiano', power: 55, accuracy: 95, pp: 20, type: 'air' },
  Picchiata: { name: 'Picchiata', power: 65, accuracy: 95, pp: 15, type: 'air' },
  Raffica: { name: 'Raffica', power: 40, accuracy: 100, pp: 30, type: 'air' },
  'Vola Via': { name: 'Vola Via', power: 50, accuracy: 95, pp: 20, type: 'air' },
  
  // Ghiaccio
  'Polvere di Neve': { name: 'Polvere di Neve', power: 30, accuracy: 100, pp: 30, type: 'ice' },
  'Vento Gelido': { name: 'Vento Gelido', power: 45, accuracy: 95, pp: 20, type: 'ice' },
  Blizzard: { name: 'Blizzard', power: 90, accuracy: 85, pp: 5, type: 'ice' },
  'Corno Ghiacciato': { name: 'Corno Ghiacciato', power: 70, accuracy: 95, pp: 15, type: 'ice' },
  Congelamento: { name: 'Congelamento', power: 60, accuracy: 95, pp: 15, type: 'ice' },
  
  // Elettrico
  Tuonoshock: { name: 'Tuonoshock', power: 35, accuracy: 100, pp: 30, type: 'electric' },
  Tuono: { name: 'Tuono', power: 75, accuracy: 90, pp: 10, type: 'electric' },
  Fulmine: { name: 'Fulmine', power: 80, accuracy: 95, pp: 10, type: 'electric' },
  Pungiglione: { name: 'Pungiglione', power: 40, accuracy: 100, pp: 25, type: 'electric' },
  Sciame: { name: 'Sciame', power: 55, accuracy: 95, pp: 20, type: 'electric' },
  Elettroshock: { name: 'Elettroshock', power: 70, accuracy: 100, pp: 15, type: 'electric' },
  
  // Veleno
  'Coda Velenosa': { name: 'Coda Velenosa', power: 35, accuracy: 100, pp: 30, type: 'poison' },
  Tossina: { name: 'Tossina', power: 50, accuracy: 95, pp: 20, type: 'poison' },
  Zanna: { name: 'Zanna', power: 55, accuracy: 95, pp: 20, type: 'poison' },
  Fumo: { name: 'Fumo', power: 40, accuracy: 100, pp: 25, type: 'poison' },
  Veleno: { name: 'Veleno', power: 60, accuracy: 95, pp: 15, type: 'poison' },
  'Gas Velenoso': { name: 'Gas Velenoso', power: 30, accuracy: 90, pp: 25, type: 'poison', effect: 'poison' },
  'Tossicità': { name: 'Tossicità', power: 70, accuracy: 90, pp: 10, type: 'poison' },
  Esplosione: { name: 'Esplosione', power: 100, accuracy: 100, pp: 5, type: 'poison' },
  
  // Psycho
  Ipnosi: { name: 'Ipnosi', power: 0, accuracy: 60, pp: 20, type: 'psycho', effect: 'sleep' },
  Psicoraggio: { name: 'Psicoraggio', power: 50, accuracy: 100, pp: 20, type: 'psycho' },
  Ombra: { name: 'Ombra', power: 45, accuracy: 95, pp: 20, type: 'psycho' },
  Incantamento: { name: 'Incantamento', power: 65, accuracy: 95, pp: 15, type: 'psycho' },
  Psylaser: { name: 'Psylaser', power: 75, accuracy: 100, pp: 10, type: 'psycho' },
  Psicic: { name: 'Psicic', power: 90, accuracy: 100, pp: 10, type: 'psycho' },
  Psiconda: { name: 'Psiconda', power: 60, accuracy: 95, pp: 15, type: 'psycho' },
  
  // Magic
  'Spritz Splash': { name: 'Spritz Splash', power: 30, accuracy: 100, pp: 30, type: 'magic' },
  Confusione: { name: 'Confusione', power: 35, accuracy: 100, pp: 25, type: 'psycho', effect: 'confuse' },
  'Spritz Explosivo': { name: 'Spritz Explosivo', power: 65, accuracy: 90, pp: 15, type: 'magic' },
  Nebbia: { name: 'Nebbia', power: 40, accuracy: 95, pp: 20, type: 'magic' },
  'Spritz Curativo': { name: 'Spritz Curativo', power: 50, accuracy: 100, pp: 15, type: 'magic' },
  
  // Dolce
  Dolce: { name: 'Dolce', power: 35, accuracy: 100, pp: 30, type: 'sweet' },
  Cura: { name: 'Cura', power: 0, accuracy: 100, pp: 15, type: 'sweet', effect: 'heal' },
  Caffè: { name: 'Caffè', power: 40, accuracy: 100, pp: 20, type: 'sweet' },
  'Dessert Fatale': { name: 'Dessert Fatale', power: 80, accuracy: 90, pp: 10, type: 'sweet' },
  'Super Cura': { name: 'Super Cura', power: 0, accuracy: 100, pp: 10, type: 'sweet', effect: 'heal_party' },
  'Caffè Bomb': { name: 'Caffè Bomb', power: 70, accuracy: 90, pp: 10, type: 'sweet' },
  
  // Special
  Remata: { name: 'Remata', power: 35, accuracy: 100, pp: 30, type: 'water' },
  Scudo: { name: 'Scudo', power: 0, accuracy: 100, pp: 20, type: 'water', effect: 'protect' },
  Voga: { name: 'Voga', power: 50, accuracy: 100, pp: 20, type: 'water' },
  Gondolata: { name: 'Gondolata', power: 65, accuracy: 95, pp: 15, type: 'water' },
  Idroauta: { name: 'Idroauta', power: 75, accuracy: 90, pp: 10, type: 'water' },
  Dragobolla: { name: 'Dragobolla', power: 70, accuracy: 95, pp: 15, type: 'dragon' },
  Idrovortice: { name: 'Idrovortice', power: 80, accuracy: 90, pp: 10, type: 'water' },
  'Attacco Corno': { name: 'Attacco Corno', power: 50, accuracy: 95, pp: 25, type: 'earth' },
  Pestone: { name: 'Pestone', power: 45, accuracy: 100, pp: 20, type: 'earth' },
  Scalata: { name: 'Scalata', power: 55, accuracy: 95, pp: 20, type: 'earth' },
  Crollo: { name: 'Crollo', power: 70, accuracy: 90, pp: 15, type: 'earth' },
  Marea: { name: 'Marea', power: 60, accuracy: 95, pp: 15, type: 'water' },
  Vortice: { name: 'Vortice', power: 45, accuracy: 95, pp: 20, type: 'water' },
  Graffio: { name: 'Graffio', power: 35, accuracy: 100, pp: 35, type: 'normal' },
  'Ruota di Formaggio': { name: 'Ruota di Formaggio', power: 50, accuracy: 95, pp: 20, type: 'earth' },
  Puzza: { name: 'Puzza', power: 0, accuracy: 90, pp: 30, type: 'earth', effect: 'lower_spd' },
  Rotolamento: { name: 'Rotolamento', power: 55, accuracy: 90, pp: 20, type: 'earth' },
  Grana: { name: 'Grana', power: 65, accuracy: 95, pp: 15, type: 'earth' },
  Stagionato: { name: 'Stagionato', power: 75, accuracy: 90, pp: 10, type: 'earth' },
  Bolle: { name: 'Bolle', power: 30, accuracy: 100, pp: 30, type: 'sweet' },
  Scintilla: { name: 'Scintilla', power: 40, accuracy: 100, pp: 25, type: 'electric' },
  Spumante: { name: 'Spumante', power: 60, accuracy: 95, pp: 15, type: 'sweet' },
  Festeggiamento: { name: 'Festeggiamento', power: 70, accuracy: 90, pp: 10, type: 'sweet' },
  Sciampagna: { name: 'Sciampagna', power: 80, accuracy: 85, pp: 10, type: 'sweet' },
  Ballo: { name: 'Ballo', power: 50, accuracy: 95, pp: 20, type: 'psycho', effect: 'confuse' },
  'Aria Tagliente': { name: 'Aria Tagliente', power: 75, accuracy: 90, pp: 10, type: 'air' },
  Carnevale: { name: 'Carnevale', power: 85, accuracy: 85, pp: 5, type: 'psycho' },
  'Sera': { name: 'Sera', power: 80, accuracy: 90, pp: 10, type: 'magic' },
  Tempera: { name: 'Tempera', power: 0, accuracy: 100, pp: 10, type: 'earth', effect: 'def_up' },
  Cottura: { name: 'Cottura', power: 60, accuracy: 95, pp: 15, type: 'fire' },
  Piatto: { name: 'Piatto', power: 50, accuracy: 100, pp: 20, type: 'normal' },
  Soffocamento: { name: 'Soffocamento', power: 65, accuracy: 90, pp: 15, type: 'water' },
  Profumo: { name: 'Profumo', power: 40, accuracy: 95, pp: 25, type: 'nature' },
  Banchetto: { name: 'Banchetto', power: 70, accuracy: 90, pp: 10, type: 'normal' },
  Pinza: { name: 'Pinza', power: 35, accuracy: 100, pp: 30, type: 'water' },
  Pinzata: { name: 'Pinzata', power: 50, accuracy: 95, pp: 20, type: 'water' },
  Schiaffo: { name: 'Schiaffo', power: 40, accuracy: 95, pp: 25, type: 'normal' },
  Polline: { name: 'Polline', power: 30, accuracy: 95, pp: 25, type: 'nature', effect: 'poison' },
  Scomparsa: { name: 'Scomparsa', power: 0, accuracy: 100, pp: 20, type: 'psycho', effect: 'evade' },
  'Aeroassalto': { name: 'Aeroassalto', power: 75, accuracy: 90, pp: 10, type: 'air' },
  Energibomba: { name: 'Energibomba', power: 80, accuracy: 90, pp: 10, type: 'poison' },
  Tempesta: { name: 'Tempesta', power: 85, accuracy: 85, pp: 10, type: 'air' },
  'Domination': { name: 'Dominio', power: 100, accuracy: 95, pp: 5, type: 'dragon' },
}

// Game map interface
export interface MapEvent {
  type: string
  x: number
  y: number
  name?: string
  npcId?: string
  dialog?: string[]
  givesStarter?: boolean
  text?: string
  dest?: string
  dx?: number
  dy?: number
  item?: { name: string; type: string; val: number }
  badge?: string
  team?: { id: string; lvl: number }[]
  items?: { name: string; price: number; type: string; val: number }[]
  isEnemy?: boolean
  vehicle?: string
  heal?: boolean
  shop?: string
  requireBadge?: string
  storyFlag?: string
  gift?: string
  requires?: string
}

export interface GameMap {
  name: string
  tiles: number[][]
  events: MapEvent[]
  wild?: string[]
  wildLvl?: number[]
  wildRate?: number
  canSurf?: boolean
  canBike?: boolean
  safe?: boolean
}
