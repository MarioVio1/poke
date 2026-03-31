// Maps - Unique Venetian towns with characteristic themes
import { GameMap, MapEvent } from './besti'

// City theme colors and atmospheres
export const CITY_THEMES: Record<string, {
  name: string
  theme: string
  bgGradient: string
  accentColor: string
  description: string
  npcs: { name: string; greeting: string }[]
}> = {
  canalborgo: {
    name: 'Canalborgo',
    theme: 'Venice - Canals & Gondolas',
    bgGradient: 'linear-gradient(180deg, #1a5f7a 0%, #0d3b4d 100%)',
    accentColor: '#4fc3f7',
    description: 'La città dei canali e delle maschere',
    npcs: [
      { name: 'Prof. Barcaro', greeting: 'Studio i Besti da 40 anni!' },
      { name: 'Gondoliere', greeting: 'Vogando per i canali...' },
      { name: 'Foto Mario', greeting: 'SORRISI! Siamo a Canalborgo!' },
    ]
  },
  spritzia: {
    name: 'Spritzia',
    theme: 'Prosecco Country - Aperitivo',
    bgGradient: 'linear-gradient(180deg, #8d6e63 0%, #5d4037 100%)',
    accentColor: '#ffb74d',
    description: 'La città dell\'Aperitivo',
    npcs: [
      { name: 'Bepi lo Spritzaro', greeting: 'CHE BEVEMO OGGI?!' },
      { name: 'Nonna Marisa', greeting: 'Bevi acqua, non spritz!' },
      { name: 'Grint Polenta', greeting: 'LA COMPAGNIA REGNERÀ!' },
    ]
  },
  veronara: {
    name: 'Veronara',
    theme: 'Romeo & Juliet - Arena',
    bgGradient: 'linear-gradient(180deg, #c62828 0%, #7f0000 100%)',
    accentColor: '#ef5350',
    description: 'La città dell\'Amore e dell\'Arena',
    npcs: [
      { name: 'Giuliano Arena', greeting: 'Combattiamo con ONORE!' },
      { name: 'Totti Tifoso', greeting: 'FORZA ROMA! ...No, VENEZIA!' },
      { name: 'Don Bepi', greeting: 'Dio ti benedica!' },
    ]
  },
  padoana: {
    name: 'Padoana',
    theme: 'University - Galileo',
    bgGradient: 'linear-gradient(180deg, #5e35b1 0%, #311b92 100%)',
    accentColor: '#b388ff',
    description: 'La città dell\'Università',
    npcs: [
      { name: 'Prof. Sansovino', greeting: 'Dove ero? Ah sì, combattiamo!' },
      { name: 'Marco', greeting: 'Ma chi me lo fa fare...' },
      { name: 'Laura', greeting: 'Combattiamo!' },
    ]
  },
  trevisella: {
    name: 'Trevisella',
    theme: 'Radicchio - Slow Life',
    bgGradient: 'linear-gradient(180deg, #558b2f 0%, #33691e 100%)',
    accentColor: '#7cb342',
    description: 'La città del Radicchio rosso',
    npcs: [
      { name: 'Nono Gino', greeting: 'El radicchio? Quello vero xe solo mio!' },
      { name: 'Sior Tonic', greeting: 'Una volta i pesci...' },
      { name: 'Cugino Max', greeting: 'Tieni questa bici!' },
    ]
  },
  dolomax: {
    name: 'Dolomax',
    theme: 'Mountains - Snow & Yeti',
    bgGradient: 'linear-gradient(180deg, #78909c 0%, #455a64 100%)',
    accentColor: '#90caf9',
    description: 'La città delle Nevi',
    npcs: [
      { name: 'Regina Ghiacci', greeting: 'Il freddo è mio alleato!' },
      { name: 'Bepi de Monte', greeting: 'Qui l\'aria xe fina!' },
      { name: 'Bepi Yeti', greeting: 'L\'ho visto! Il Yeti!' },
    ]
  },
  gardalago: {
    name: 'Gardalago',
    theme: 'Lake - Final Challenge',
    bgGradient: 'linear-gradient(180deg, #0277bd 0%, #01579b 100%)',
    accentColor: '#4fc3f7',
    description: 'L\'ultima sfida - Il Lago',
    npcs: [
      { name: 'Maestro Marco', greeting: 'Sei pronto per la LEGA?' },
      { name: 'Gondoliere Eco', greeting: 'Benvenuto al Gardalago!' },
    ]
  },
}

// Get theme for current map
export const getCityTheme = (mapName: string) => {
  const cityMap = Object.entries(CITY_THEMES).find(([key]) => 
    mapName?.includes(key) || mapName === key
  )
  return cityMap ? cityMap[1] : CITY_THEMES.canalborgo
}

export const MAPS: Record<string, GameMap> = {
  // ═══════════════════════════════════════════════════════════════════
  // CANALBORGO - Starting town (Venice inspired)
  // Characteristic: Water canals, bridges, gondolas, masks
  // ═══════════════════════════════════════════════════════════════════
  canalborgo: {
    name: 'Canalborgo',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,2,2,2,0,0,0,0,0,2,2,2,0,0,0,0,0,1],
      [1,0,0,2,2,2,0,0,0,0,0,2,2,2,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    ],
    events: [
      // Professor's Lab (center)
      { type: 'npc', x: 10, y: 7, name: 'Prof. Barcaro', npcId: 'prof_barcaro', 
        dialog: ['Ciao! Sono il Prof. Barcaro!', 'Studio i Besti da 40 anni!', 'Scegli il tuo primo Besti!'], givesStarter: true },
      
      // Mom (home)
      { type: 'npc', x: 4, y: 9, name: 'Mamma', npcId: 'mamma',
        dialog: ['Tesoro! Sei uscito?', 'Stai attento e non litigare!', 'Se perdi, torno a casa che ti faccio il risotto!'] },
      
      // Old man near canal
      { type: 'npc', x: 5, y: 4, name: 'Nonno Piero', npcId: 'nonno_piero',
        dialog: ['Nel mio tempo...', '...i Besti si chiamavano Bestie!', 'E non c\'era ste palle!'] },
      
      // Gondoliere
      { type: 'npc', x: 2, y: 5, name: 'Gondoliere', npcId: 'gondoliere_nero',
        dialog: ['Vogando per i canali...', 'Vuoi attraversare? Costa 50€!'] },
      
      // Sign
      { type: 'sign', x: 8, y: 9, text: 'Benvenuti a CANALBORGO!\nLa città dei canali.' },
      { type: 'sign', x: 15, y: 4, text: 'Centro Besti ➜' },
      
      // Home entrance
      { type: 'warp', x: 7, y: 11, dest: 'casa', dx: 4, dy: 5 },
      { type: 'warp', x: 12, y: 11, dest: 'casa', dx: 5, dy: 5 },
      
      // Center entrance
      { type: 'warp', x: 9, y: 6, dest: 'centro', dx: 4, dy: 4 },
      
      // Shop entrance
      { type: 'warp', x: 10, y: 6, dest: 'shop_centro', dx: 3, dy: 4 },
      
      // Route to Spritzia
      { type: 'warp', x: 7, y: 14, dest: 'route1', dx: 10, dy: 1 },
    ],
  },

  // Home interior
  casa: {
    name: 'Casa di Federico',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 4, y: 3, name: 'Mamma', npcId: 'mamma', dialog: ['Vai dal Prof. Barcaro!'] },
      { type: 'item', x: 7, y: 4, item: { name: 'Pozioncino', type: 'heal', val: 20 } },
      { type: 'item', x: 6, y: 3, item: { name: 'Gondolball', type: 'capture', val: 0 } },
      { type: 'warp', x: 4, y: 5, dest: 'canalborgo', dx: 7, dy: 12 },
      { type: 'warp', x: 5, y: 5, dest: 'canalborgo', dx: 12, dy: 12 },
    ],
  },

  // Besti Center
  centro: {
    name: 'Centro Besti',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,5,5,5,5,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass',
        dialog: ['Il tuo Besti è stato curato!', 'Buona fortuna nel viaggio!'] },
      { type: 'heal' },
      { type: 'warp', x: 4, y: 5, dest: 'canalborgo', dx: 9, dy: 7 },
    ],
  },

  // Shop - Canalborgo style
  shop_centro: {
    name: 'Negozio Base',
    tiles: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'shop', x: 3, y: 3, 
        items: [
          { name: 'Pozioncino', price: 100, type: 'heal', val: 20 },
          { name: 'Gondolball', price: 200, type: 'capture', val: 0 },
          { name: 'Caffè Corretto', price: 80, type: 'heal', val: 10 },
        ]},
      { type: 'warp', x: 3, y: 4, dest: 'canalborgo', dx: 10, dy: 7 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ROUTE 1 - Canal to Spritzia (wine country)
  // ═══════════════════════════════════════════════════════════════════
  route1: {
    name: 'Via del Prosecco',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    wild: ['gabbianzo', 'canalot', 'colombo'],
    wildLvl: [3, 4, 3],
    wildRate: 10,
    events: [
      // Sign
      { type: 'sign', x: 10, y: 5, text: 'Via del Prosecco\n➜ Spritzia' },
      
      // Trainer
      { type: 'trainer', x: 5, y: 7, name: 'Luca', npcId: 'kid',
        dialog: ['Combattiamo!'], team: [{ id: 'colombo', lvl: 5 }] },
      
      // Item on ground
      { type: 'item', x: 14, y: 5, item: { name: 'Pozioncino', type: 'heal', val: 20 } },
      
      // Warps
      { type: 'warp', x: 10, y: 0, dest: 'canalborgo', dx: 7, dy: 13 },
      { type: 'warp', x: 10, y: 11, dest: 'spritzia', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SPRITZIA - Aperitivo town (Prosecco country)
  // Characteristic: Wine bars, spritz culture, happy hour
  // ═══════════════════════════════════════════════════════════════════
  spritzia: {
    name: 'Spritzia',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,3,3,3,3,0,0,0,0,0,0,3,3,3,3,0,0,0,1],
      [1,0,3,3,3,3,0,0,0,0,0,0,3,3,3,3,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      // Gym Leader
      { type: 'gym', x: 10, y: 6, name: 'Bepi lo Spritzaro', npcId: 'bepi_spritzaro',
        badge: 'Badge Aperitivo',
        dialog: ['CHE BEVEMO OGGI?!', 'Spritzino! Pronto per l\'Happy Hour!', 'Combattiamo! Ma dopo... spritz!'],
        team: [{ id: 'spritzino', lvl: 14 }, { id: 'vespolo', lvl: 15 }, { id: 'fogaron', lvl: 16 }] },
      
      // Enemy Grunt
      { type: 'trainer', x: 4, y: 7, name: 'Grint', npcId: 'grint_polenta', isEnemy: true,
        dialog: ['LA COMPAGNIA DELLA POLENTA REGNERÀ!'],
        team: [{ id: 'polentaur', lvl: 12 }, { id: 'salamix', lvl: 11 }] },
      
      // Photographer
      { type: 'npc', x: 16, y: 4, name: 'Foto Mario', npcId: 'fotografo',
        dialog: ['SORRISI! Siamo a Spritzia!', 'Posso fotografare il tuo Besti?'], gift: 'camera' },
      
      // Old Lady
      { type: 'npc', x: 3, y: 4, name: 'Nonna Marisa', npcId: 'vecchia_spritzia',
        dialog: ['Nel mio tempo... era meglio prima!', 'Bevi acqua, non spritz! ...Ma chi te credi?!'] },
      
      // Shop
      { type: 'warp', x: 17, y: 4, dest: 'shop_spritzia', dx: 3, dy: 4 },
      
      // Center
      { type: 'warp', x: 10, y: 4, dest: 'centro_spritzia', dx: 4, dy: 4 },
      
      // Story - package to deliver
      { type: 'npc', x: 6, y: 9, name: 'Grint', npcId: 'grint_polenta', isEnemy: true,
        dialog: ['Consegnalo a Veronara!', 'E non aprirlo!'] },
      
      // Sign
      { type: 'sign', x: 10, y: 8, text: 'SPRITZIA\nLa città dell\'Aperitivo!' },
      
      // Routes
      { type: 'warp', x: 10, y: 0, dest: 'route1', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'route2', dx: 10, dy: 1 },
    ],
  },

  // Spritzia Besti Center
  centro_spritzia: {
    name: 'Centro Besti Spritzia',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,5,5,5,5,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!'] },
      { type: 'heal' },
      { type: 'warp', x: 4, y: 5, dest: 'spritzia', dx: 10, dy: 5 },
    ],
  },

  // Spritzia Shop
  shop_spritzia: {
    name: 'Bar Spritz',
    tiles: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'shop', x: 3, y: 3,
        items: [
          { name: 'Pozioncino', price: 100, type: 'heal', val: 20 },
          { name: 'Super Pozione', price: 250, type: 'heal', val: 50 },
          { name: 'Gondolball', price: 200, type: 'capture', val: 0 },
          { name: 'Spritz Ball', price: 400, type: 'capture', val: 0 },
          { name: 'Pietra Focaia', price: 800, type: 'stone', val: 0 },
          { name: 'Pietra Acquatica', price: 800, type: 'stone', val: 0 },
          { name: 'Spritz Curativo', price: 150, type: 'heal', val: 30 },
        ]},
      { type: 'warp', x: 3, y: 4, dest: 'spritzia', dx: 17, dy: 5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ROUTE 2 - To Veronara (grape fields)
  // ═══════════════════════════════════════════════════════════════════
  route2: {
    name: 'Via delle Vigne',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,6,6,0,0,0,0,0,0,0,0,0,6,6,0,0,0,1],
      [1,0,0,6,6,0,0,0,0,0,0,0,0,0,6,6,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    wild: ['vignel', 'radicor', 'prosecchino', 'colombo'],
    wildLvl: [7, 8, 8, 7],
    wildRate: 12,
    events: [
      { type: 'sign', x: 10, y: 5, text: 'Via delle Vigne\n➜ Veronara' },
      
      // Trainer
      { type: 'trainer', x: 5, y: 8, name: 'Nonna Gina', npcId: 'nonno_piero',
        dialog: ['Combattiamo!'], team: [{ id: 'vignel', lvl: 10 }, { id: 'radicor', lvl: 11 }] },
      
      // Item
      { type: 'item', x: 14, y: 8, item: { name: 'Super Pozione', type: 'heal', val: 50 } },
      
      // Warps
      { type: 'warp', x: 10, y: 0, dest: 'spritzia', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'veronara', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // VERONARA - Arena town (Verona inspired)
  // Characteristic: Roman arena, love stories, balcony
  // ═══════════════════════════════════════════════════════════════════
  veronara: {
    name: 'Veronara',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,3,3,3,3,0,0,0,0,0,3,3,3,3,0,0,0,1],
      [1,0,0,3,3,3,3,0,0,0,0,0,3,3,3,3,0,0,0,1],
      [1,0,0,3,3,3,3,0,0,0,0,0,3,3,3,3,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      // Gym Leader - Arena style
      { type: 'gym', x: 5, y: 4, name: 'Giuliano Arena', npcId: 'giuliano_arena',
        badge: 'Badge Arena',
        dialog: ['Benvenuto nell\'ARENA!', 'Come a Verona, dove gli innamorati giurano!', 'Combattiamo con onore!'],
        team: [{ id: 'polentaur', lvl: 18 }, { id: 'alpibex', lvl: 19 }, { id: 'dolomor', lvl: 20 }] },
      
      // Tifoso
      { type: 'npc', x: 14, y: 7, name: 'Totti Tifoso', npcId: 'totti_tifoso',
        dialog: ['FORZA VENEZIA! ...Scusa, ROMA!', 'Hai visto la partita ieri?'] },
      
      // Priest
      { type: 'npc', x: 17, y: 4, name: 'Don Bepi', npcId: 'prete',
        dialog: ['Dio ti benedica, figliolo!', 'I Besti? Li ha creati Lui pure!'] },
      
      // Shop
      { type: 'warp', x: 4, y: 4, dest: 'shop_veronara', dx: 3, dy: 4 },
      
      // Center
      { type: 'warp', x: 15, y: 4, dest: 'centro_veronara', dx: 4, dy: 4 },
      
      // Sign
      { type: 'sign', x: 10, y: 8, text: 'VERONARA\nLa città dell\'Amore!' },
      
      // Routes
      { type: 'warp', x: 10, y: 0, dest: 'route2', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'route3', dx: 10, dy: 1 },
    ],
  },

  centro_veronara: {
    name: 'Centro Besti Veronara',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,5,5,5,5,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!'] },
      { type: 'heal' },
      { type: 'warp', x: 4, y: 5, dest: 'veronara', dx: 15, dy: 5 },
    ],
  },

  shop_veronara: {
    name: 'Bottega Arena',
    tiles: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'shop', x: 3, y: 3,
        items: [
          { name: 'Super Pozione', price: 250, type: 'heal', val: 50 },
          { name: 'Iper Pozione', price: 500, type: 'heal', val: 100 },
          { name: 'Spritz Ball', price: 400, type: 'capture', val: 0 },
          { name: 'Polentaball', price: 600, type: 'capture', val: 0 },
          { name: 'Pietra Verde', price: 800, type: 'stone', val: 0 },
          { name: 'Pietra Polenta', price: 1000, type: 'stone', val: 0 },
          { name: 'Panino Veneto', price: 300, type: 'food', val: 999 },
        ]},
      { type: 'warp', x: 3, y: 4, dest: 'veronara', dx: 4, dy: 5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ROUTE 3 - To Padoana (university city)
  // ═══════════════════════════════════════════════════════════════════
  route3: {
    name: 'Via degli Studenti',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    wild: ['smogatto', 'formaggion', 'focacino', 'tiramisu'],
    wildLvl: [12, 13, 14, 14],
    wildRate: 14,
    events: [
      { type: 'sign', x: 10, y: 5, text: 'Via degli Studenti\n➜ Padoana' },
      
      // Trainer
      { type: 'trainer', x: 6, y: 7, name: 'Marco', npcId: 'studente_fannullone',
        dialog: ['Gli esami... chi me lo fa fare?'],
        team: [{ id: 'smogatto', lvl: 15 }, { id: 'formaggion', lvl: 14 }] },
      
      { type: 'item', x: 14, y: 4, item: { name: 'Polentaball', type: 'capture', val: 0 } },
      
      { type: 'warp', x: 10, y: 0, dest: 'veronara', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'padoana', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // PADOANA - University town (Padova inspired)
  // Characteristic: Old university, Galileo, prying students
  // ═══════════════════════════════════════════════════════════════════
  padoana: {
    name: 'Padoana',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,3,3,3,3,3,3,0,0,3,3,3,3,3,3,0,0,1],
      [1,0,0,3,3,3,3,3,3,0,0,3,3,3,3,3,3,0,0,1],
      [1,0,0,3,3,3,3,3,3,0,0,3,3,3,3,3,3,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      // Professor Sansovino
      { type: 'npc', x: 10, y: 6, name: 'Prof. Sansovino', npcId: 'prof_padova',
        dialog: ['Benvenuto all\'Università!', 'I Besti sono creature straordinarie!'] },
      
      // Camera for photos
      { type: 'npc', x: 4, y: 7, name: 'Marco', npcId: 'studente_fannullone',
        dialog: ['Ma chi me lo fa fare?', 'Vado a prendere un spritz...'] },
      
      // Trainer battle
      { type: 'trainer', x: 16, y: 7, name: 'Laura', npcId: 'lass',
        dialog: ['Combattiamo!'], team: [{ id: 'tiramisu', lvl: 18 }, { id: 'prosecchione', lvl: 17 }] },
      
      // Shop
      { type: 'warp', x: 4, y: 4, dest: 'shop_padoana', dx: 3, dy: 4 },
      
      // Center
      { type: 'warp', x: 15, y: 4, dest: 'centro_padoana', dx: 4, dy: 4 },
      
      // Sign
      { type: 'sign', x: 10, y: 8, text: 'PADOANA\nCittà dell\'Università!' },
      
      // Routes
      { type: 'warp', x: 10, y: 0, dest: 'route3', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'route4', dx: 10, dy: 1 },
    ],
  },

  centro_padoana: {
    name: 'Centro Besti Padoana',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,5,5,5,5,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!'] },
      { type: 'heal' },
      { type: 'warp', x: 4, y: 5, dest: 'padoana', dx: 15, dy: 5 },
    ],
  },

  shop_padoana: {
    name: 'Libreria Universitaria',
    tiles: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'shop', x: 3, y: 3,
        items: [
          { name: 'Pozioncino', price: 100, type: 'heal', val: 20 },
          { name: 'Gondolball', price: 200, type: 'capture', val: 0 },
          { name: 'Super Pozione', price: 250, type: 'heal', val: 50 },
          { name: 'Pietra Temporale', price: 1000, type: 'stone', val: 0 },
          { name: 'Pietra Maschera', price: 1200, type: 'stone', val: 0 },
        ]},
      { type: 'warp', x: 3, y: 4, dest: 'padoana', dx: 4, dy: 5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ROUTE 4 - To Trevisella (radicchio fields)
  // ═══════════════════════════════════════════════════════════════════
  route4: {
    name: 'Via del Radicchio',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,7,7,7,0,0,0,0,0,0,0,0,7,7,7,0,0,1],
      [1,0,0,7,7,7,0,0,0,0,0,0,0,0,7,7,7,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    wild: ['lagunello', 'smogatto', 'radiccor', 'lagunaga'],
    wildLvl: [15, 16, 17, 18],
    wildRate: 15,
    events: [
      { type: 'sign', x: 10, y: 5, text: 'Via del Radicchio\n➜ Trevisella' },
      
      { type: 'trainer', x: 5, y: 8, name: 'Sior Tonic', npcId: 'pescatore',
        dialog: ['El pesce xe finio!'], team: [{ id: 'lagunello', lvl: 16 }, { id: 'scampetto', lvl: 17 }] },
      
      { type: 'item', x: 14, y: 5, item: { name: 'Pietra Acquatica', type: 'stone', val: 0 } },
      
      { type: 'warp', x: 10, y: 0, dest: 'padoana', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'trevisella', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // TREVISELLA - Radicchio town (Treviso inspired)
  // Characteristic: Red radicchio fields, canals, slow life
  // ═══════════════════════════════════════════════════════════════════
  trevisella: {
    name: 'Trevisella',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,7,7,7,0,0,0,0,0,0,7,7,7,0,0,0,0,1],
      [1,0,0,7,7,7,0,0,0,0,0,0,7,7,7,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      // Old man with radicchio wisdom
      { type: 'npc', x: 5, y: 4, name: 'Nono Gino', npcId: 'vecchio_treviso',
        dialog: ['Xe 90 anni che vivo qui!', 'El radicchio? Quello vero xe solo mio!'] },
      
      // Fisherman
      { type: 'npc', x: 14, y: 4, name: 'Sior Tonic', npcId: 'pescatore',
        dialog: ['Una volta i pesci i xeata infiniti!', 'Vieni a pescare con me domani?'] },
      
      // Trainer
      { type: 'trainer', x: 10, y: 8, name: 'Beppo', npcId: 'bepi_spritzaro',
        dialog: ['Combattiamo!'], team: [{ id: 'radicorso', lvl: 18 }, { id: 'lagunaga', lvl: 19 }] },
      
      // Give bike story event
      { type: 'npc', x: 3, y: 7, name: 'Cugino Max', npcId: 'kid',
        dialog: ['Tieni questa bici!', 'L\'ho rubata a mio cugino!', 'Non dire niente!'], gift: 'biciRubata' },
      
      // Shop
      { type: 'warp', x: 4, y: 6, dest: 'shop_trevisella', dx: 3, dy: 4 },
      
      // Center
      { type: 'warp', x: 15, y: 6, dest: 'centro_trevisella', dx: 4, dy: 4 },
      
      // Sign
      { type: 'sign', x: 10, y: 9, text: 'TREVISELLA\nCittà del Radicchio!' },
      
      // Routes
      { type: 'warp', x: 10, y: 0, dest: 'route4', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'route5', dx: 10, dy: 1 },
    ],
  },

  centro_trevisella: {
    name: 'Centro Besti Trevisella',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,5,5,5,5,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!'] },
      { type: 'heal' },
      { type: 'warp', x: 4, y: 5, dest: 'trevisella', dx: 15, dy: 7 },
    ],
  },

  shop_trevisella: {
    name: 'Bottega del Radicchio',
    tiles: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'shop', x: 3, y: 3,
        items: [
          { name: 'Pozioncino', price: 100, type: 'heal', val: 20 },
          { name: 'Spritz Curativo', price: 150, type: 'heal', val: 30 },
          { name: 'Gondolball', price: 200, type: 'capture', val: 0 },
          { name: 'Scampaball', price: 500, type: 'capture', val: 0 },
          { name: 'Pietra Acquatica', price: 800, type: 'stone', val: 0 },
          { name: 'Caffè Corretto', price: 80, type: 'heal', val: 10 },
        ]},
      { type: 'warp', x: 3, y: 4, dest: 'trevisella', dx: 4, dy: 7 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ROUTE 5 - To Dolomax (mountains)
  // ═══════════════════════════════════════════════════════════════════
  route5: {
    name: 'Via delle Dolomiti',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,1],
      [1,0,0,8,8,8,0,0,0,0,0,0,0,0,8,8,8,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    wild: ['nevelet', 'dolomor', 'alpibex', 'dolomibex'],
    wildLvl: [20, 22, 21, 24],
    wildRate: 15,
    events: [
      { type: 'sign', x: 10, y: 5, text: 'Via delle Dolomiti\n➜ Dolomax' },
      
      { type: 'trainer', x: 6, y: 7, name: 'Bepi de Monte', npcId: 'montanaro',
        dialog: ['Benvenuto in altura!'], team: [{ id: 'alpibex', lvl: 22 }, { id: 'dolomor', lvl: 23 }] },
      
      { type: 'item', x: 14, y: 4, item: { name: 'Iper Pozione', type: 'heal', val: 100 } },
      
      { type: 'warp', x: 10, y: 0, dest: 'trevisella', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'dolomax', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // DOLOMAX - Mountain town (Dolomiti inspired)
  // Characteristic: Snow, mountains, ski lifts, Yeti legends
  // ═══════════════════════════════════════════════════════════════════
  dolomax: {
    name: 'Dolomax',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,8,8,8,8,8,8,8,8,8,8,8,8,8,0,0,0,1],
      [1,0,0,8,8,8,8,8,8,8,8,8,8,8,8,8,0,0,0,1],
      [1,0,0,8,8,8,3,3,3,3,3,3,8,8,8,8,0,0,0,1],
      [1,0,0,8,8,8,3,3,3,3,3,3,8,8,8,8,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      // Mountain man
      { type: 'npc', x: 5, y: 7, name: 'Bepi de Monte', npcId: 'montanaro',
        dialog: ['Qui l\'aria xe fina!', 'E i Besti i cognosse el fatto loro!'] },
      
      // Yeti guy
      { type: 'npc', x: 14, y: 7, name: 'Bepi Yeti', npcId: 'yeti_finto',
        dialog: ['L\'ho visto! Il Yeti!', '...Era un Besti Nevelet!'] },
      
      // Gym Leader - Ice type
      { type: 'gym', x: 9, y: 6, name: 'Regina dei Ghiacci', npcId: 'vecchia_spritzia',
        badge: 'Badge Ghiaccio',
        dialog: ['Il freddo è mio alleato!', 'Combattiamo!'],
        team: [{ id: 'nevelet', lvl: 24 }, { id: 'dolomor', lvl: 26 }, { id: 'dolomibex', lvl: 28 }] },
      
      // Shop
      { type: 'warp', x: 4, y: 6, dest: 'shop_dolomax', dx: 3, dy: 4 },
      
      // Center
      { type: 'warp', x: 15, y: 6, dest: 'centro_dolomax', dx: 4, dy: 4 },
      
      // Sign
      { type: 'sign', x: 10, y: 9, text: 'DOLOMAX\nLa città delle Nevi!' },
      
      // Routes
      { type: 'warp', x: 10, y: 0, dest: 'route5', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'route6', dx: 10, dy: 1 },
    ],
  },

  centro_dolomax: {
    name: 'Centro Besti Dolomax',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,5,5,5,5,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!'] },
      { type: 'heal' },
      { type: 'warp', x: 4, y: 5, dest: 'dolomax', dx: 15, dy: 7 },
    ],
  },

  shop_dolomax: {
    name: 'Bottega di Montagna',
    tiles: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'shop', x: 3, y: 3,
        items: [
          { name: 'Super Pozione', price: 250, type: 'heal', val: 50 },
          { name: 'Iper Pozione', price: 500, type: 'heal', val: 100 },
          { name: 'Gondolball', price: 200, type: 'capture', val: 0 },
          { name: 'Polentaball', price: 600, type: 'capture', val: 0 },
        ]},
      { type: 'warp', x: 3, y: 4, dest: 'dolomax', dx: 4, dy: 7 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ROUTE 6 - Final route to Gardalago
  // ═══════════════════════════════════════════════════════════════════
  route6: {
    name: 'Via del Gardalago',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    wild: ['gabbianator', 'tiramisuper', 'dolomibex', 'crimignolo'],
    wildLvl: [25, 26, 27, 28],
    wildRate: 18,
    events: [
      { type: 'sign', x: 10, y: 5, text: 'Via del Gardalago\n➜ Gardalago' },
      
      // Final trainer before elite
      { type: 'trainer', x: 5, y: 7, name: 'Elite Marco', npcId: 'champion',
        dialog: ['Preparati!'], team: [{ id: 'fogarion', lvl: 28 }, { id: 'canalord', lvl: 28 }] },
      
      { type: 'item', x: 15, y: 5, item: { name: 'Mascheraball', type: 'capture', val: 0 } },
      
      { type: 'warp', x: 10, y: 0, dest: 'dolomax', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'gardalago', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // GARDALAGO - Lake town (Lake Garda inspired)
  // Characteristic: Big lake, gondola ride, final city before elite
  // ═══════════════════════════════════════════════════════════════════
  gardalago: {
    name: 'Gardalago',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,2,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    canSurf: true,
    events: [
      // Gondola boatman
      { type: 'npc', x: 9, y: 6, name: 'Gondoliere Eco', npcId: 'gondoliere_verde',
        dialog: ['Benvenuto al Gardalago!', 'Vuoi attraversare il lago? Costa 100€!'],
        vehicle: 'gondola_oro' },
      
      // Champion battle
      { type: 'trainer', x: 10, y: 8, name: 'Maestro Marco', npcId: 'campione_veneto',
        dialog: ['Hai dimostrato di essere forte!', 'Ma io sono il Campione di Venetia!'],
        team: [{ id: 'serenissima', lvl: 42 }, { id: 'lagorion', lvl: 42 }, { id: 'fogarion', lvl: 42 }, { id: 'radicthron', lvl: 41 }, { id: 'canalord', lvl: 41 }] },
      
      // Final badge
      { type: 'gym', x: 10, y: 6, name: 'Maestro Marco', npcId: 'campione_veneto',
        badge: 'Campione di Venetia',
        dialog: ['Hai vinto! Sei il nuovo Campione!'],
        team: [{ id: 'serenissima', lvl: 50 }, { id: 'lagorion', lvl: 50 }, { id: 'fogarion', lvl: 50 }, { id: 'radicthron', lvl: 49 }, { id: 'canalord', lvl: 49 }] },
      
      // Shop
      { type: 'warp', x: 4, y: 8, dest: 'shop_gardalago', dx: 3, dy: 4 },
      
      // Center
      { type: 'warp', x: 15, y: 8, dest: 'centro_gardalago', dx: 4, dy: 4 },
      
      // Sign
      { type: 'sign', x: 10, y: 10, text: 'GARDALAGO\nL\'ultima sfida!' },
      
      // Routes
      { type: 'warp', x: 10, y: 0, dest: 'route6', dx: 10, dy: 10 },
    ],
  },

  centro_gardalago: {
    name: 'Centro Besti Gardalago',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,5,5,5,5,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!'] },
      { type: 'heal' },
      { type: 'warp', x: 4, y: 5, dest: 'gardalago', dx: 15, dy: 9 },
    ],
  },

  shop_gardalago: {
    name: 'Negozio sul Lago',
    tiles: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'shop', x: 3, y: 3,
        items: [
          { name: 'Super Pozione', price: 250, type: 'heal', val: 50 },
          { name: 'Iper Pozione', price: 500, type: 'heal', val: 100 },
          { name: 'Panino Veneto', price: 300, type: 'food', val: 999 },
          { name: 'Mascheraball', price: 1000, type: 'capture', val: 0 },
          { name: 'Spritz Ball', price: 400, type: 'capture', val: 0 },
          { name: 'Polentaball', price: 600, type: 'capture', val: 0 },
        ]},
      { type: 'warp', x: 3, y: 4, dest: 'gardalago', dx: 4, dy: 9 },
    ],
  },
}

// Tiles legend:
// 0 = grass
// 1 = wall/edge
// 2 = water (canals)
// 3 = building
// 4 = indoor floor
// 5 = center floor (healing)
// 6 = vineyard (route2)
// 7 = radicchio fields (trevisella)
// 8 = snow/mountain (dolomax)
// 9 = stairs up
// 10 = stairs down
// 11 = locked door
// 12 = treasure chest

// ═══════════════════════════════════════════════════════════════════
// MULTI-FLOOR GYMS
// ═══════════════════════════════════════════════════════════════════

// Canalborgo Gym - 2 floors, puzzle style
gym_canalborgo: {
  name: 'Palestra Canalborgo (Piano 1)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,0,0,0,0,0,0,4,4,4,4,4,0,1],
    [1,0,4,0,0,0,4,0,0,0,0,0,0,4,0,0,0,4,0,1],
    [1,0,4,0,0,0,4,0,0,0,0,0,0,4,0,0,0,4,0,1],
    [1,0,4,4,4,4,4,0,0,0,0,0,0,4,4,4,4,4,0,1],
    [1,0,0,0,0,0,0,0,0,9,9,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'trainer', x: 3, y: 3, name: 'Giovanni', npcId: 'lass',
      dialog: ['Combattiamo!'], team: [{ id: 'canalot', lvl: 8 }, { id: 'gabbianzo', lvl: 9 }] },
    { type: 'trainer', x: 16, y: 3, name: 'Paolo', npcId: 'lass',
      dialog: ['Preparati!'], team: [{ id: 'colombo', lvl: 10 }, { id: 'canalino', lvl: 9 }] },
    { type: 'item', x: 9, y: 4, item: { name: 'Gondolball', type: 'capture', val: 0 } },
    { type: 'warp', x: 9, y: 6, dest: 'gym_canalborgo_2', dx: 9, dy: 3 },
    { type: 'warp', x: 9, y: 10, dest: 'canalborgo', dx: 17, dy: 5 },
  ],
},

gym_canalborgo_2: {
  name: 'Palestra Canalborgo (Piano 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'gym', x: 9, y: 6, name: 'Leader Marco', npcId: 'campione_veneto',
      badge: 'Badge Gondola',
      dialog: ['Benvenuto nella mia palestra!', 'I canali nascondono molti segreti!'],
      team: [{ id: 'canalord', lvl: 15 }, { id: 'lagunello', lvl: 14 }, { id: 'canalot', lvl: 16 }] },
    { type: 'warp', x: 9, y: 6, dest: 'gym_canalborgo', dx: 9, dy: 6 },
  ],
},

// Spritzia Gym - 2 floors, wine theme
gym_spritzia: {
  name: 'Palestra Spritzia (Piano 1)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,1],
    [1,0,4,0,4,4,4,4,0,0,0,0,4,4,4,4,0,4,0,1],
    [1,0,4,0,4,0,0,4,0,0,0,0,4,0,0,4,0,4,0,1],
    [1,0,4,0,4,0,0,4,0,9,9,0,4,0,0,4,0,4,0,1],
    [1,0,4,0,4,4,4,4,0,0,0,0,4,4,4,4,0,4,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'trainer', x: 5, y: 5, name: 'Bepi', npcId: 'lass',
      dialog: ['CHE BEVEMO!'], team: [{ id: 'vespolo', lvl: 12 }] },
    { type: 'trainer', x: 14, y: 5, name: 'Gianni', npcId: 'lass',
      dialog: ['Lo spritz è la mia forza!'], team: [{ id: 'spritzino', lvl: 13 }, { id: 'prosecchino', lvl: 12 }] },
    { type: 'item', x: 9, y: 3, item: { name: 'Spritz Ball', type: 'capture', val: 0 } },
    { type: 'warp', x: 9, y: 6, dest: 'gym_spritzia_2', dx: 9, dy: 3 },
    { type: 'warp', x: 9, y: 10, dest: 'spritzia', dx: 9, dy: 5 },
  ],
},

gym_spritzia_2: {
  name: 'Palestra Spritzia (Piano 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'gym', x: 9, y: 6, name: 'Bepi lo Spritzaro', npcId: 'bepi_spritzaro',
      badge: 'Badge Aperitivo',
      dialog: ['CHE BEVEMO OGGI?!', 'Spritzino! Pronto per l\'Happy Hour!', 'Combattiamo! Ma dopo... spritz!'],
      team: [{ id: 'spritzino', lvl: 18 }, { id: 'vespolo', lvl: 19 }, { id: 'fogaron', lvl: 20 }] },
    { type: 'warp', x: 9, y: 6, dest: 'gym_spritzia', dx: 9, dy: 6 },
  ],
},

// Veronara Gym - 3 floors, arena style
gym_veronara: {
  name: 'Arena Veronara (Piano 1)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,1],
    [1,0,4,0,0,0,9,9,9,0,0,0,9,9,9,0,0,4,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'trainer', x: 4, y: 5, name: 'Gladiatore', npcId: 'lass',
      dialog: ['Combatti con onore!'], team: [{ id: 'polentaur', lvl: 16 }, { id: 'alpibex', lvl: 15 }] },
    { type: 'trainer', x: 15, y: 5, name: 'Guardia', npcId: 'lass',
      dialog: ['L Arena non perdona!'], team: [{ id: 'dolomor', lvl: 17 }, { id: 'polentaur', lvl: 16 }] },
    { type: 'item', x: 9, y: 5, item: { name: 'Polentaball', type: 'capture', val: 0 } },
    { type: 'warp', x: 7, y: 5, dest: 'gym_veronara_2', dx: 7, dy: 3 },
    { type: 'warp', x: 12, y: 5, dest: 'gym_veronara_2', dx: 12, dy: 3 },
    { type: 'warp', x: 9, y: 9, dest: 'veronara', dx: 5, dy: 5 },
  ],
},

gym_veronara_2: {
  name: 'Arena Veronara (Piano 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,9,9,9,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'trainer', x: 9, y: 5, name: 'Mago Arena', npcId: 'lass',
      dialog: ['La magia dell Arena ti colpira!'], team: [{ id: 'mascherotto', lvl: 20 }] },
    { type: 'warp', x: 8, y: 5, dest: 'gym_veronara_3', dx: 8, dy: 4 },
    { type: 'warp', x: 10, y: 5, dest: 'gym_veronara_3', dx: 10, dy: 4 },
    { type: 'warp', x: 9, y: 10, dest: 'gym_veronara', dx: 9, dy: 5 },
  ],
},

gym_veronara_3: {
  name: 'Arena Veronara (Piano 3)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'gym', x: 9, y: 5, name: 'Giuliano Arena', npcId: 'giuliano_arena',
      badge: 'Badge Arena',
      dialog: ['Benvenuto nell ARENA!', 'Come a Verona, dove gli innamorati giurano!', 'Combattiamo con onore!'],
      team: [{ id: 'polentaur', lvl: 22 }, { id: 'alpibex', lvl: 23 }, { id: 'dolomor', lvl: 24 }] },
    { type: 'warp', x: 9, y: 5, dest: 'gym_veronara_2', dx: 9, dy: 5 },
  ],
},

// Dolomax Gym - 3 floors, ice theme
gym_dolomax: {
  name: 'Palestra Dolomax (Piano 1)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,1],
    [1,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,1],
    [1,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,1],
    [1,0,8,0,0,0,0,0,9,9,9,0,0,0,0,0,0,8,0,1],
    [1,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,1],
    [1,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,1],
    [1,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'trainer', x: 4, y: 4, name: 'Alpinista', npcId: 'montanaro',
      dialog: ['Il freddo mi ha temprato!'], team: [{ id: 'alpibex', lvl: 22 }, { id: 'nevelet', lvl: 21 }] },
    { type: 'trainer', x: 15, y: 4, name: 'Sciatore', npcId: 'lass',
      dialog: ['Sciare e combattere!'], team: [{ id: 'dolomor', lvl: 23 }, { id: 'nevelet', lvl: 22 }] },
    { type: 'item', x: 9, y: 5, item: { name: 'Montagnaball', type: 'capture', val: 0 } },
    { type: 'warp', x: 9, y: 5, dest: 'gym_dolomax_2', dx: 9, dy: 4 },
    { type: 'warp', x: 9, y: 9, dest: 'dolomax', dx: 9, dy: 5 },
  ],
},

gym_dolomax_2: {
  name: 'Palestra Dolomax (Piano 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,9,9,9,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'trainer', x: 9, y: 5, name: 'Guardiano', npcId: 'lass',
      dialog: ['Non passerai facilmente!'], team: [{ id: 'dolomibex', lvl: 26 }] },
    { type: 'warp', x: 9, y: 5, dest: 'gym_dolomax_3', dx: 9, dy: 4 },
    { type: 'warp', x: 9, y: 10, dest: 'gym_dolomax', dx: 9, dy: 5 },
  ],
},

gym_dolomax_3: {
  name: 'Palestra Dolomax (Piano 3)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'gym', x: 9, y: 5, name: 'Regina dei Ghiacci', npcId: 'regina_ghiacci',
      badge: 'Badge Ghiaccio',
      dialog: ['Il freddo è mio alleato!', 'Le Dolomiti sono la mia casa!', 'Combattiamo!'],
      team: [{ id: 'nevelet', lvl: 28 }, { id: 'dolomor', lvl: 30 }, { id: 'dolomibex', lvl: 32 }] },
    { type: 'warp', x: 9, y: 5, dest: 'gym_dolomax_2', dx: 9, dy: 5 },
  ],
},

// ═══════════════════════════════════════════════════════════════════
// EXPLORABLE HOUSES - Multi-floor villas and mansions
// ═══════════════════════════════════════════════════════════════════

// Villa Veneta - 3 floor mansion
villa_veneta: {
  name: 'Villa Veneta (Piano 1)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,1],
    [1,0,4,4,0,0,0,0,9,9,9,0,0,0,0,0,4,4,0,1],
    [1,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'npc', x: 5, y: 4, name: 'Nobildonna', npcId: 'lass',
      dialog: ['Benvenuto nella mia villa!'] },
    { type: 'npc', x: 14, y: 4, name: 'Servitore', npcId: 'lass',
      dialog: ['Posso offrirti qualcosa?'] },
    { type: 'item', x: 9, y: 4, item: { name: 'Super Pozione', type: 'heal', val: 50 } },
    { type: 'warp', x: 9, y: 5, dest: 'villa_veneta_2', dx: 9, dy: 4 },
    { type: 'warp', x: 9, y: 9, dest: 'padoana', dx: 4, dy: 7 },
  ],
},

villa_veneta_2: {
  name: 'Villa Veneta (Piano 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,9,9,9,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'item', x: 9, y: 5, item: { name: 'Pietra Maschera', type: 'stone', val: 0 } },
    { type: 'warp', x: 9, y: 5, dest: 'villa_veneta_3', dx: 9, dy: 4 },
    { type: 'warp', x: 9, y: 10, dest: 'villa_veneta', dx: 9, dy: 5 },
  ],
},

villa_veneta_3: {
  name: 'Villa Veneta (Piano 3)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'item', x: 9, y: 5, item: { name: 'Mascheraball', type: 'capture', val: 0 } },
    { type: 'warp', x: 9, y: 5, dest: 'villa_veneta_2', dx: 9, dy: 5 },
  ],
},

// Casa del Nonno - 2 floor house
casa_nonno: {
  name: 'Casa del Nonno (Piano 1)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,0,1],
    [1,0,4,0,0,0,0,0,0,4,0,1],
    [1,0,4,0,0,0,9,9,0,4,0,1],
    [1,0,4,0,0,0,0,0,0,4,0,1],
    [1,0,4,4,4,4,4,4,4,4,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'npc', x: 4, y: 4, name: 'Nonno', npcId: 'nonno_piero',
      dialog: ['Nel mio tempo...', '...i Besti si chiamavano Bestie!', 'E non c era ste palle!'] },
    { type: 'item', x: 7, y: 4, item: { name: 'Pozioncino', type: 'heal', val: 20 } },
    { type: 'warp', x: 7, y: 4, dest: 'casa_nonno_2', dx: 7, dy: 3 },
    { type: 'warp', x: 5, y: 7, dest: 'trevisella', dx: 3, dy: 5 },
  ],
},

casa_nonno_2: {
  name: 'Casa del Nonno (Piano 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,10,10,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'item', x: 7, y: 5, item: { name: 'Ricetta Segreta', type: 'key', val: 0 } },
    { type: 'warp', x: 7, y: 5, dest: 'casa_nonno', dx: 7, dy: 4 },
  ],
},

// Museum of Besti - 2 floor exploration
museo_besti: {
  name: 'Museo dei Besti (Piano 1)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,0,4,0,0,0,0,4,4,0,0,0,0,4,0,1],
    [1,0,4,0,4,4,0,4,4,0,4,4,0,4,0,1],
    [1,0,4,0,4,4,0,0,0,0,4,4,0,4,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,4,0,1],
    [1,0,4,4,4,4,4,4,9,4,4,4,4,4,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'npc', x: 3, y: 4, name: 'Guida', npcId: 'prof_barcaro',
      dialog: ['Benvenuto nel Museo dei Besti!'] },
    { type: 'npc', x: 12, y: 4, name: 'Studioso', npcId: 'prof_padova',
      dialog: ['I fossili raccontano storie antiche!'] },
    { type: 'item', x: 6, y: 4, item: { name: 'Fossile Uovo', type: 'key', val: 0 } },
    { type: 'item', x: 9, y: 4, item: { name: 'Piuma Verde', type: 'key', val: 0 } },
    { type: 'warp', x: 8, y: 7, dest: 'museo_besti_2', dx: 8, dy: 4 },
    { type: 'warp', x: 7, y: 8, dest: 'padoana', dx: 10, dy: 6 },
  ],
},

museo_besti_2: {
  name: 'Museo dei Besti (Piano 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,10,10,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'item', x: 8, y: 5, item: { name: 'Diario del Doge', type: 'key', val: 0 } },
    { type: 'trainer', x: 8, y: 3, name: 'Guardiano', npcId: 'lass',
      dialog: ['Il tesoro e protetto!'], team: [{ id: 'mascherotto', lvl: 20 }] },
    { type: 'warp', x: 8, y: 5, dest: 'museo_besti', dx: 8, dy: 7 },
  ],
},

// ═══════════════════════════════════════════════════════════════════
// SECRET CAVES - Multi-floor dungeons
// ═══════════════════════════════════════════════════════════════════

grotta_segreta: {
  name: 'Grotta Segreta (Livello 1)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  wild: ['nevelet', 'dolomor'],
  wildLvl: [25, 26],
  wildRate: 20,
  events: [
    { type: 'item', x: 5, y: 5, item: { name: 'Pietra Ghiaccio', type: 'stone', val: 0 } },
    { type: 'item', x: 14, y: 5, item: { name: 'Pietra Ghiaccio', type: 'stone', val: 0 } },
    { type: 'warp', x: 9, y: 5, dest: 'grotta_segreta_2', dx: 9, dy: 4 },
  ],
},

grotta_segreta_2: {
  name: 'Grotta Segreta (Livello 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  wild: ['dolomibex', 'crimignolo'],
  wildLvl: [28, 30],
  wildRate: 25,
  events: [
    { type: 'trainer', x: 9, y: 4, name: 'Speleologo', npcId: 'champion',
      dialog: ['Ho trovato il segreto!'], team: [{ id: 'dolomibex', lvl: 28 }, { id: 'crimignolo', lvl: 30 }] },
    { type: 'item', x: 9, y: 6, item: { name: 'Dogeball', type: 'capture', val: 0 } },
    { type: 'warp', x: 9, y: 5, dest: 'grotta_segreta_3', dx: 9, dy: 4 },
    { type: 'warp', x: 9, y: 5, dest: 'grotta_segreta', dx: 9, dy: 5 },
  ],
},

grotta_segreta_3: {
  name: 'Grotta Segreta (Livello 3 - Tesoro)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  wild: ['crimignolo'],
  wildLvl: [35],
  wildRate: 5,
  events: [
    { type: 'item', x: 9, y: 5, item: { name: 'Carnevaleball', type: 'capture', val: 0 } },
    { type: 'item', x: 9, y: 5, item: { name: 'Maschera del Doge', type: 'key', val: 0 } },
    { type: 'trainer', x: 9, y: 3, name: 'Guardiano Finale', npcId: 'champion',
      dialog: ['Il tesoro e mio!'], team: [{ id: 'crimignolo', lvl: 35 }, { id: 'dolomibex', lvl: 32 }] },
    { type: 'warp', x: 9, y: 5, dest: 'grotta_segreta_2', dx: 9, dy: 5 },
  ],
},

// ═══════════════════════════════════════════════════════════════════
// EXPANDED CITY MAPS - Larger outdoor areas
// ═══════════════════════════════════════════════════════════════════

canalborgo_extended: {
    name: 'Canalborgo Estesa',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,1],
      [1,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,1],
      [1,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    ],
    canSurf: true,
    events: [
      { type: 'npc', x: 10, y: 7, name: 'Prof. Barcaro', npcId: 'prof_barcaro',
        dialog: ['Ciao! Sono il Prof. Barcaro!', 'Studio i Besti da 40 anni!', 'Scegli il tuo primo Besti!'], givesStarter: true },
      { type: 'npc', x: 4, y: 10, name: 'Mamma', npcId: 'mamma',
        dialog: ['Tesoro! Sei uscito?', 'Stai attento e non litigare!'] },
      { type: 'npc', x: 24, y: 10, name: 'Nonno Piero', npcId: 'nonno_piero',
        dialog: ['Nel mio tempo...', '...i Besti si chiamavano Bestie!'] },
      { type: 'npc', x: 25, y: 7, name: 'Gondoliere', npcId: 'gondoliere_nero',
        dialog: ['Vogando per i canali...', 'Vuoi attraversare? Costa 50!'] },
      { type: 'npc', x: 14, y: 3, name: 'Foto Mario', npcId: 'fotografo',
        dialog: ['SORRISI! Siamo a Canalborgo!'] },
      { type: 'npc', x: 5, y: 3, name: 'Attivista', npcId: 'attivista_animale',
        dialog: ['I BESTI SONO LIBERI!', 'LIBERTÀ PER TUTTI!'] },
      { type: 'npc', x: 18, y: 5, name: 'Nonna Pettegola', npcId: 'nonna_pettegola',
        dialog: ['LO SAI DI MARIA?', 'E DI GIUSEPPE?'] },
      { type: 'npc', x: 8, y: 8, name: 'Bambino Capriccio', npcId: 'capriccio',
        dialog: ['VOGLIO! VOGLIO! VOGLIO!', 'IL BESTIA! QUELLO VERDE!'] },
      { type: 'npc', x: 21, y: 3, name: 'Turista', npcId: 'turistica_tedesca',
        dialog: ['Entschuldigung! Wo ist der Bahnhof?', 'Venice is so romantic!'] },
      { type: 'npc', x: 27, y: 8, name: 'Zio Imbarazzante', npcId: 'zio_imbarazzante',
        dialog: ['SEI GRASSO!', 'QUANDO TI SPOSI?!'] },
      { type: 'sign', x: 15, y: 9, text: 'Benvenuti a CANALBORGO!' },
      { type: 'sign', x: 5, y: 5, text: 'Centro Besti ➜' },
      { type: 'sign', x: 23, y: 5, text: '➜ Negozio' },
      { type: 'item', x: 9, y: 5, item: { name: 'Pozioncino', type: 'heal', val: 20 } },
      { type: 'item', x: 19, y: 5, item: { name: 'Gondolball', type: 'capture', val: 0 } },
      { type: 'warp', x: 7, y: 12, dest: 'casa', dx: 4, dy: 5 },
      { type: 'warp', x: 21, y: 12, dest: 'casa', dx: 5, dy: 5 },
      { type: 'warp', x: 6, y: 6, dest: 'centro', dx: 4, dy: 4 },
      { type: 'warp', x: 23, y: 6, dest: 'shop_centro', dx: 3, dy: 4 },
      { type: 'warp', x: 4, y: 6, dest: 'gym_canalborgo', dx: 9, dy: 9 },
      { type: 'warp', x: 7, y: 14, dest: 'route1', dx: 10, dy: 1 },
    ],
  },

// Underground Lab - 2 floors
lab_segreto: {
  name: 'Laboratorio Segreto (Piano 1)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,4,0,1],
    [1,0,4,0,4,4,4,4,4,4,4,4,0,4,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,4,0,4,0,1],
    [1,0,4,0,4,0,9,9,9,0,0,4,0,4,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,4,0,4,0,1],
    [1,0,4,0,4,4,4,4,4,4,4,4,0,4,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,4,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'npc', x: 7, y: 4, name: 'Scienziato', npcId: 'prof_barcaro',
      dialog: ['Benvenuto nel mio laboratorio segreto!'] },
    { type: 'trainer', x: 12, y: 6, name: 'Guardia', npcId: 'lass',
      dialog: ['Non dovresti essere qui!'], team: [{ id: 'mascherotto', lvl: 25 }] },
    { type: 'item', x: 7, y: 6, item: { name: 'Fossile Uovo', type: 'key', val: 0 } },
    { type: 'item', x: 8, y: 6, item: { name: 'Ricetta Segreta', type: 'key', val: 0 } },
    { type: 'warp', x: 7, y: 6, dest: 'lab_segreto_2', dx: 7, dy: 4 },
    { type: 'warp', x: 7, y: 11, dest: 'canalborgo', dx: 10, dy: 7 },
  ],
},

lab_segreto_2: {
  name: 'Laboratorio Segreto (Piano 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,10,10,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'item', x: 8, y: 5, item: { name: 'Dogeball', type: 'capture', val: 0 } },
    { type: 'item', x: 8, y: 5, item: { name: 'Maschera del Doge', type: 'key', val: 0 } },
    { type: 'warp', x: 8, y: 5, dest: 'lab_segreto', dx: 7, dy: 6 },
  ],
},

// ═══════════════════════════════════════════════════════════════════
// ADDITIONAL LOCATIONS
// ═══════════════════════════════════════════════════════════════════

// Watchtower - 2 floor tower
torre_osservazione: {
  name: 'Torre di Osservazione (Piano 1)',
  tiles: [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,4,4,4,0,1],
    [1,0,4,0,4,0,1],
    [1,0,4,9,4,0,1],
    [1,0,4,0,4,0,1],
    [1,0,4,4,4,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'npc', x: 3, y: 4, name: 'Guardiano', npcId: 'lass',
      dialog: ['Questa torre ha una vista magnifica!'] },
    { type: 'item', x: 3, y: 3, item: { name: 'Binocolo', type: 'key', val: 0 } },
    { type: 'warp', x: 3, y: 4, dest: 'torre_osservazione_2', dx: 3, dy: 4 },
    { type: 'warp', x: 3, y: 7, dest: 'dolomax', dx: 18, dy: 7 },
  ],
},

torre_osservazione_2: {
  name: 'Torre di Osservazione (Piano 2)',
  tiles: [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,10,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'item', x: 3, y: 4, item: { name: 'Pietra Alba', type: 'stone', val: 0 } },
    { type: 'warp', x: 3, y: 4, dest: 'torre_osservazione', dx: 3, dy: 4 },
  ],
},

// Ancient Temple - 3 floor
tempio_antico: {
  name: 'Tempio Antico (Livello 1)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,0,1],
    [1,0,4,0,0,0,0,0,0,4,0,1],
    [1,0,4,0,0,0,9,0,0,4,0,1],
    [1,0,4,0,0,0,0,0,0,4,0,1],
    [1,0,4,0,0,0,0,0,0,4,0,1],
    [1,0,4,4,4,4,4,4,4,4,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'npc', x: 5, y: 4, name: 'Sacerdote', npcId: 'prof_barcaro',
      dialog: ['Questo tempio nasconde segreti antichi...'] },
    { type: 'item', x: 6, y: 4, item: { name: 'Sigillo del Doge', type: 'key', val: 0 } },
    { type: 'warp', x: 6, y: 4, dest: 'tempio_antico_2', dx: 6, dy: 4 },
    { type: 'warp', x: 5, y: 8, dest: 'route3', dx: 10, dy: 6 },
  ],
},

tempio_antico_2: {
  name: 'Tempio Antico (Livello 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,10,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'trainer', x: 6, y: 5, name: 'Guardiano Sacro', npcId: 'champion',
      dialog: ['Il tempio ti ha scelto!'], team: [{ id: 'mascherodoro', lvl: 30 }] },
    { type: 'item', x: 6, y: 4, item: { name: 'Anello del Doge', type: 'key', val: 0 } },
    { type: 'warp', x: 6, y: 5, dest: 'tempio_antico_3', dx: 6, dy: 4 },
    { type: 'warp', x: 6, y: 5, dest: 'tempio_antico', dx: 6, dy: 4 },
  ],
},

tempio_antico_3: {
  name: 'Tempio Antico (Livello 3 - Santuario)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,12,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'item', x: 6, y: 5, item: { name: 'Carnevaleball', type: 'capture', val: 0 } },
    { type: 'item', x: 6, y: 5, item: { name: 'Mappa Antica', type: 'key', val: 0 } },
    { type: 'warp', x: 6, y: 5, dest: 'tempio_antico_2', dx: 6, dy: 5 },
  ],
},

// Beach area
spiaggia: {
  name: 'Spiaggia di Gardalago',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  canSurf: true,
  wild: ['scampetto', 'lagunello', 'lagunaga', 'grancanale'],
  wildLvl: [20, 22, 24, 26],
  wildRate: 20,
  events: [
    { type: 'npc', x: 5, y: 5, name: 'Bagnino', npcId: 'pescatore',
      dialog: ['Acqua bella fresca!'] },
    { type: 'item', x: 10, y: 5, item: { name: 'Scampaball', type: 'capture', val: 0 } },
    { type: 'item', x: 14, y: 5, item: { name: 'Alga Laguna', type: 'hold', val: 0 } },
    { type: 'warp', x: 10, y: 9, dest: 'gardalago', dx: 5, dy: 4 },
  ],
},

// ═══════════════════════════════════════════════════════════════════
// ELITE FOUR CHALLENGE - The Final Challenge
// ═══════════════════════════════════════════════════════════════════

league_entrance: {
  name: 'Sede della Lega Besti',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,4,0,4,4,4,4,4,4,4,4,4,4,4,0,4,0,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,0,0,0,4,0,4,0,0,1],
    [1,0,4,0,4,0,4,4,4,10,4,4,4,0,4,0,4,0,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,0,0,0,4,0,4,0,0,1],
    [1,0,4,0,4,4,4,4,4,4,4,4,4,4,4,0,4,0,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    // Elite 1 - Il Fuocoso
    { type: 'trainer', x: 4, y: 5, name: 'Il Fuocoso', npcId: 'elite_fire',
      dialog: ['Sono il primo Elite!', 'Il mio fuoco è inarrestabile!', 'Preparati a bruciare!'],
      team: [{ id: 'fogarion', lvl: 45 }, { id: 'fogarox', lvl: 44 }, { id: 'fritellon', lvl: 43 }] },
    
    // Elite 2 - L'Acquoso  
    { type: 'trainer', x: 8, y: 3, name: 'L\'Acquoso', npcId: 'elite_water',
      dialog: ['Le acque di Venetia sono mie!', 'I miei Besti controllano il mare!'],
      team: [{ id: 'canalord', lvl: 46 }, { id: 'lagunaga', lvl: 45 }, { id: 'gondrago', lvl: 44 }] },
    
    // Elite 3 - Il Naturale
    { type: 'trainer', x: 15, y: 5, name: 'Il Naturale', npcId: 'elite_nature',
      dialog: ['La terra e le piante sono la mia forza!', 'Dalla natura ho tutto!'],
      team: [{ id: 'radicthron', lvl: 47 }, { id: 'polentitan', lvl: 46 }, { id: 'parmageddon', lvl: 45 }] },
    
    // Elite 4 - Il Magico
    { type: 'trainer', x: 10, y: 7, name: 'Il Magico', npcId: 'elite_magic',
      dialog: ['La magia antica scorre in me!', 'I miei incantesimi sono imbattibili!'],
      team: [{ id: 'mascarion', lvl: 48 }, { id: 'mascarin', lvl: 47 }, { id: 'spritz_supreme', lvl: 47 }] },
    
    // Stairs to Champion
    { type: 'sign', x: 10, y: 6, text: 'Per il CAMPIONE ➜' },
    
    // Entrance/Exit
    { type: 'warp', x: 10, dy: 0, dest: 'gardalago', dx: 10, dy: 1 },
  ],
},

// ═══════════════════════════════════════════════════════════════════
// CHAMPION'S ROOM - Final Battle
// ═══════════════════════════════════════════════════════════════════

league_champion: {
  name: 'Sala del Campione',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,1],
    [1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    // The Champion - Marco il Rivale!
    { type: 'trainer', x: 10, y: 5, name: 'DUX VENETIAE', npcId: 'champion',
      dialog: [
        'Hai superato la Elite Four...',
        'Ma io sono il DUX! Il sovrano di Venetia!',
        'I miei 4 LEGGENDARI sono imbattibili!',
        'Questa sarà la nostra battaglia finale!'
      ],
      team: [
        { id: 'dolomitor', lvl: 50 },
        { id: 'lagorion', lvl: 50 },
        { id: 'serenissima', lvl: 50 },
        { id: 'ombradriz', lvl: 52 },
      ],
      isChampion: true,
      finalBattle: true },
    
    // Back to entrance
    { type: 'warp', x: 10, dy: 1, dest: 'league_entrance', dx: 10, dy: 11 },
  ],
},

// ═══════════════════════════════════════════════════════════════════
// VILLA VENETA - Multi-floor mansion
// ═══════════════════════════════════════════════════════════════════

villa_veneta: {
  name: 'Villa Veneta',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,4,0,4,4,4,4,4,4,4,4,4,4,4,0,4,0,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,0,0,0,4,0,4,0,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,0,0,0,4,0,4,0,0,1],
    [1,0,4,0,4,0,0,0,9,0,0,0,0,0,4,0,4,0,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,0,0,0,4,0,4,0,0,1],
    [1,0,4,0,4,4,4,4,4,4,4,4,4,4,4,0,4,0,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'npc', x: 10, y: 4, name: 'Nobildonna', npcId: 'nobildonna',
      dialog: ['Questa villa è della mia famiglia da secoli!'] },
    { type: 'item', x: 5, y: 3, item: { name: 'Vino Pregiato', type: 'hold', val: 0 } },
    { type: 'item', x: 14, y: 8, item: { name: 'Mascheraball', type: 'capture', val: 0 } },
    { type: 'warp', x: 8, dy: 8, dest: 'villa_veneta_2', dx: 8, dy: 4 },
    { type: 'warp', x: 9, dy: 8, dest: 'route1', dx: 15, dy: 5 },
  ],
},

villa_veneta_2: {
  name: 'Villa Veneta (Piano 2)',
  tiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,4,0,4,4,4,4,4,4,4,4,4,4,4,0,4,0,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,0,0,0,4,0,4,0,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,0,0,0,4,0,4,0,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,0,0,0,4,0,4,0,0,1],
    [1,0,4,0,4,0,0,0,0,0,0,0,0,0,4,0,4,0,0,1],
    [1,0,4,0,4,4,4,4,4,4,4,4,4,4,4,0,4,0,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  events: [
    { type: 'npc', x: 10, y: 4, name: 'Maestro', npcId: 'maestro',
      dialog: ['La conoscenza è potere!'] },
    { type: 'item', x: 5, y: 5, item: { name: 'Pietra Sole', type: 'stone', val: 0 } },
    { type: 'item', x: 14, y: 5, item: { name: 'Dragoball', type: 'capture', val: 0 } },
    { type: 'trainer', x: 10, y: 6, name: 'Guardiano', npcId: 'champion',
      dialog: ['Non passerai!'], team: [{ id: 'gondrago', lvl: 30 }] },
    { type: 'warp', x: 8, dy: 4, dest: 'villa_veneta', dx: 8, dy: 8 },
  ],
},

}
