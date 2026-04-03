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
      { name: 'Dottor GheSboro', greeting: 'Studio i Besti tra nebbia e cicheti da una vita!' },
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
      [1,0,3,3,3,3,0,0,0,0,0,0,3,3,3,3,0,0,0,1],
      [1,0,3,3,3,3,0,2,2,2,0,0,3,3,3,3,0,0,0,1],
      [1,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,3,3,3,3,0,0,0,0,0,0,0,0,3,3,3,0,0,1],
      [1,0,3,3,3,3,0,0,0,0,0,0,0,0,3,3,3,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    ],
    events: [
      // Town NPCs
      { type: 'npc', x: 4, y: 5, name: 'Mamma', npcId: 'mamma',
        dialog: ['Bravo, te si rivà fin in piazza.', 'Adesso va dal Dottor GheSboro in laboratorio, vicino al canale.'] },
      
      // Old man near canal
      { type: 'npc', x: 6, y: 5, name: 'Nonno Piero', npcId: 'nonno_piero',
        dialog: ['Nel mio tempo...', '...i Besti si chiamavano Bestie!', 'E non c\'era ste palle!'] },
      
      // Gondoliere
      { type: 'npc', x: 10, y: 4, name: 'Gondoliere', npcId: 'gondoliere_nero',
        dialog: ['Vogando per i canali...', 'Vuoi attraversare? Costa 50€!'] },
      
      // Sign
      { type: 'sign', x: 8, y: 9, text: 'Benvenuti a CANALBORGO!\nLa città dei canali.' },
      { type: 'sign', x: 3, y: 1, text: 'Casa di Federico' },
      { type: 'sign', x: 9, y: 5, text: 'Laboratorio GheSboro ➜' },
      { type: 'sign', x: 15, y: 1, text: 'Centro Besti ➜' },
      { type: 'sign', x: 15, y: 8, text: 'Bottega di Bruna' },
      
      // Home entrance
      { type: 'warp', x: 3, y: 3, dest: 'casa', dx: 4, dy: 5 },

      // Professor lab
      { type: 'warp', x: 9, y: 7, dest: 'laboratorio', dx: 5, dy: 6 },
      
      // Center entrance
      { type: 'warp', x: 14, y: 3, dest: 'centro', dx: 4, dy: 4 },
      
      // Shop entrance
      { type: 'warp', x: 15, y: 9, dest: 'shop_centro', dx: 3, dy: 4 },

      // Neighbor house
      { type: 'warp', x: 15, y: 3, dest: 'casa_vicina', dx: 4, dy: 5 },
      
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
      [1,4,3,3,4,4,4,3,4,1],
      [1,4,3,3,4,4,4,3,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,4,4,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 5, y: 3, name: 'Mamma', npcId: 'mamma', dialog: ['Te son qua in camera apposta: sveiate ben, fio mio.', 'Prima sistema la testa, dopo va dal Dottor GheSboro.', 'No sta vegnir zo dal letto come un sacco de patate.'] },
      { type: 'item', x: 7, y: 5, item: { name: 'Pozioncino', type: 'heal', val: 20 } },
      { type: 'item', x: 2, y: 5, item: { name: 'Gondolball', type: 'capture', val: 0 } },
      { type: 'warp', x: 4, y: 6, dest: 'canalborgo', dx: 7, dy: 12 },
      { type: 'warp', x: 5, y: 6, dest: 'canalborgo', dx: 12, dy: 12 },
    ],
  },

  laboratorio: {
    name: 'Laboratorio GheSboro',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,4,1],
      [1,4,5,5,4,4,4,5,5,4,1],
      [1,4,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,4,1,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 5, y: 2, name: 'Dottor GheSboro', npcId: 'professor',
        dialog: ['Finalmente te son rivà fin qua!', 'Sono il Dottor GheSboro, e oggi ti affido il tuo primo Besti!', 'Scegli con criterio: el viaggio sarà longo e pien de monade.'], givesStarter: true },
      { type: 'npc', x: 3, y: 5, name: 'Assistente Nora', npcId: 'scientist',
        dialog: ['Qua dentro cataloghemo tutto.', 'Se te servi una mano, basta domandare.'] },
      { type: 'warp', x: 5, y: 7, dest: 'canalborgo', dx: 9, dy: 8 },
    ],
  },

  casa_vicina: {
    name: 'Casa del Vicino',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,4,4,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 4, y: 3, name: 'Zia Bruna', npcId: 'lady',
        dialog: ['Te vedi che el paese no xe vuoto.', 'Passa quando vuoi: qua ghe xe sempre qualcuno che ciacola.'] },
      { type: 'item', x: 7, y: 4, item: { name: 'Caffè Corretto', type: 'heal', val: 10 } },
      { type: 'warp', x: 4, y: 6, dest: 'canalborgo', dx: 15, dy: 4 },
      { type: 'warp', x: 5, y: 6, dest: 'canalborgo', dx: 15, dy: 4 },
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
        dialog: ['Il tuo Besti è stato curato!', 'Tien qua anche un PokeDioex: cussì no vai in giro come un mona.', 'Buona fortuna nel viaggio!'], gift: 'pokedex' },
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
      { type: 'npc', x: 4, y: 2, name: 'Commessa Bruna', npcId: 'lass',
        dialog: ['Se te manca el PokeDioex, qua te lo sistemo subito.', 'Annota i Besti e dopo torna a comprare, fio mio.'], gift: 'pokedex' },
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
        badge: 'aperitivo',
        dialog: ['CHE BEVEMO OGGI, OSTREGA?!', 'Spritzino! Se me batti te offro da bere, se no torna a casa, mona!', 'Combattiamo! Ma dopo... ombra e cicheto!'],
        team: [{ id: 'spritzino', lvl: 14 }, { id: 'vespolo', lvl: 15 }, { id: 'fogaron', lvl: 16 }] },
      
      // Enemy Grunt
      { type: 'trainer', x: 4, y: 7, name: 'Grint', npcId: 'grint_polenta', isEnemy: true,
        dialog: ['LA COMPAGNIA DELLA POLENTA REGNERA!', 'No sta far el furbo, fiolo: qua comandemo noi!'],
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
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!', 'Sei a Spritzia: porta via anche el PokeDioex e segnate tuto.'], gift: 'pokedex' },
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
        badge: 'arena',
        dialog: ['Benvenuto nell\'ARENA!', 'Qua tra balconi, promesse e ciacole se misura il valore vero!', 'Combattiamo con onore, fiolo, e senza sceneggiate!'],
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
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!', 'Mi raccomando: col PokeDioex vedi chi te manca ancora.'], gift: 'pokedex' },
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
      // Gym Leader - Universita
      { type: 'gym', x: 10, y: 6, name: 'Prof. Sansovino', npcId: 'prof_padova',
        badge: 'studio',
        dialog: ['Benvenuto all\'Universita!', 'Niente ciacole, ostrega: qua se studia e dopo se combatte!', 'Vediamo se hai imparato qualcosa o se te sei qua solo per lo spritz.'],
        team: [{ id: 'tiramisu', lvl: 22 }, { id: 'prosecchione', lvl: 23 }, { id: 'mascarion', lvl: 24 }] },
      
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
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!', 'A Padoana i studenti lo perdono sempre: tien stretto sto PokeDioex.'], gift: 'pokedex' },
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
      
      // Gym Leader - Radicchio
      { type: 'gym', x: 10, y: 8, name: 'Nonna Gina', npcId: 'vecchio_treviso',
        badge: 'radicchio',
        dialog: ['El radicchio vero no perdona, ostia!', 'Se vuoi el mio badge te lo devi sudare, fiolo, altro che scorciatoie!'],
        team: [{ id: 'radicorso', lvl: 26 }, { id: 'lagunaga', lvl: 27 }, { id: 'canalisk', lvl: 28 }] },
      
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
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!', 'Se trovi Besti nei campi, segnali subito nel PokeDioex.'], gift: 'pokedex' },
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
        badge: 'ghiaccio',
        dialog: ['Il freddo xe el mio alleato!', 'Se tremi adesso, in vetta no duri gnanca un minuto!'],
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
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!', 'Qua in montagna ghe serve memoria: tien anche el tuo PokeDioex.'], gift: 'pokedex' },
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
        dialog: ['Benvenuto al Gardalago!', 'Co sta gondola te porti dove vuoi, basta no far el mona sul molo!'],
        vehicle: 'gondola_oro' },
      
      // Gym Leader - Final city badge
      { type: 'gym', x: 10, y: 8, name: 'Maestro Marco', npcId: 'campione_veneto',
        badge: 'laguna',
        dialog: ['Hai attraversato tutta Venetia per arrivare qua, bravo.', 'Se vuoi entrare nella Lega, prima devi superare mi. Niente paura, ma gnanca regali.'],
        team: [{ id: 'lagunaga', lvl: 36 }, { id: 'canalord', lvl: 38 }, { id: 'lagorion', lvl: 40 }] },
      
      // Optional rematch before the League
      { type: 'trainer', x: 10, y: 6, name: 'Maestro Marco', npcId: 'campione_veneto',
        dialog: ['Sei quasi pronto per la Lega.', 'Femo una rivincita: vedemo se reggi la pressione o te sciopi come un ombrellone al lago!'],
        team: [{ id: 'serenissima', lvl: 42 }, { id: 'lagorion', lvl: 42 }, { id: 'fogarion', lvl: 42 }, { id: 'radicthron', lvl: 41 }, { id: 'canalord', lvl: 41 }] },
      
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
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!', 'Tra lago e porto se perde tutto: per fortuna el PokeDioex no.'], gift: 'pokedex' },
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
      [1,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,4,4,4,4,4,0,0,0,0,0,0,4,4,4,4,4,0,1],
      [1,0,4,0,0,0,4,0,0,0,0,0,0,4,0,0,0,4,0,1],
      [1,0,4,0,0,0,4,0,0,0,0,0,0,4,0,0,0,4,0,1],
      [1,0,4,0,0,0,4,0,0,0,0,0,0,4,0,0,0,4,0,1],
      [1,0,4,4,4,4,4,0,0,0,0,0,0,4,4,4,4,4,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'trainer', x: 3, y: 6, name: 'Maestra Lucia', npcId: 'beauty',
        dialog: ['Sconfitta? Impossibile!'], team: [{ id: 'canalisk', lvl: 12 }, { id: 'vespatron', lvl: 13 }] },
      { type: 'trainer', x: 16, y: 9, name: 'Maestro Paolo', npcId: 'gentleman',
        dialog: ['Non sottovalutarmi!'], team: [{ id: 'vignel', lvl: 11 }, { id: 'canalot', lvl: 12 }] },
      { type: 'gymLeader', x: 10, y: 8, name: 'Dottoressa Chiara', npcId: 'gym_canalborgo',
        dialog: ['Benvenuto nella mia Palestra! Il canale è pieno di segreti...', 'Preparati a perderti!'],
        team: [{ id: 'canalord', lvl: 18 }], badge: 'acqua', prize: 1500 },
      { type: 'warp', x: 9, y: 3, dest: 'gym_canalborgo', dx: 9, dy: 6 },
    ],
  },

  // Villa Veneta - 2 floors
  villa_veneta: {
    name: 'Villa Veneta (Piano Terra)',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1],
      [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1],
      [1,4,0,0,4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,1],
      [1,4,0,0,4,5,5,5,5,5,5,5,5,5,4,0,0,0,4,1],
      [1,4,0,0,4,5,0,0,0,0,0,0,0,5,4,0,0,0,4,1],
      [1,4,0,0,4,5,0,0,0,0,0,0,0,5,4,0,0,0,4,1],
      [1,4,0,0,4,5,5,5,0,0,0,0,5,5,4,0,0,0,4,1],
      [1,4,0,0,4,4,4,4,4,9,9,4,4,4,4,0,0,0,4,1],
      [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1],
      [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'warp', x: 9, y: 9, dest: 'villa_veneta_2', dx: 9, dy: 3 },
      { type: 'item', x: 2, y: 2, item: { name: 'Super Pozione', type: 'heal', val: 50 } },
      { type: 'item', x: 17, y: 2, item: { name: 'Iper Pozione', type: 'heal', val: 100 } },
      { type: 'item', x: 2, y: 11, item: { name: 'Mascheraball', type: 'capture', val: 0 } },
    ],
  },
  villa_veneta_2: {
    name: 'Villa Veneta (Piano 1)',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,4,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,4,1],
      [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1],
      [1,4,0,0,4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,1],
      [1,4,0,0,4,5,5,5,5,5,5,5,5,5,4,0,0,0,4,1],
      [1,4,0,0,4,5,0,0,0,0,0,0,0,5,4,0,0,0,4,1],
      [1,4,0,0,4,5,0,0,0,0,0,0,0,5,4,0,0,0,4,1],
      [1,4,0,0,4,5,5,5,0,0,0,0,5,5,4,0,0,0,4,1],
      [1,4,0,0,4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,1],
      [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1],
      [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'warp', x: 9, y: 3, dest: 'villa_veneta', dx: 9, dy: 9 },
      { type: 'item', x: 4, y: 2, item: { name: 'Pietra Acquatica', type: 'evolution', val: 0 } },
      { type: 'item', x: 15, y: 2, item: { name: 'Pietra Tuono', type: 'evolution', val: 0 } },
      { type: 'item', x: 9, y: 5, item: { name: 'Ultra Ball', type: 'capture', val: 0 } },
    ],
  },

  // League Entrance
  league_entrance: {
    name: 'Sede della Lega Besti',
    width: 20,
    height: 15,
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
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'trainer', x: 3, y: 4, name: 'Il Fuocoso Marco', npcId: 'elite_1',
        dialog: ['Sono Il Fuocoso Marco! Le mie fiamme no perdona!', 'Se te vien vicino troppo, te cusi come polenta dimenticata sul fogo!'],
        team: [{ id: 'fogarox', lvl: 40 }, { id: 'dolomitor', lvl: 42 }, { id: 'lagorion', lvl: 41 }] },
      { type: 'trainer', x: 16, y: 4, name: 'L\'Acquoso Luca', npcId: 'elite_2',
        dialog: ['Io sono L\'Acquoso Luca! I miei canali xe profondi e pieni de sorprese!'],
        team: [{ id: 'canalord', lvl: 40 }, { id: 'nevelet', lvl: 42 }, { id: 'ombradriz', lvl: 41 }] },
      { type: 'trainer', x: 3, y: 10, name: 'Il Naturale Giulia', npcId: 'elite_3',
        dialog: ['Sono Il Naturale Giulia! La natura xe dalla mia parte, e no la puoi fregare!'],
        team: [{ id: 'vignarbor', lvl: 40 }, { id: 'polentitan', lvl: 42 }, { id: 'serenissima', lvl: 41 }] },
      { type: 'trainer', x: 16, y: 10, name: 'Il Magico Antonio', npcId: 'elite_4',
        dialog: ['Sono Il Magico Antonio! Le ombre nasconde poteri grossi, fiolo. Sta atento!'],
        team: [{ id: 'mascarion', lvl: 40 }, { id: 'stregatto', lvl: 42 }, { id: 'fantasma', lvl: 41 }] },
      { type: 'warp', x: 10, y: 13, dest: 'league_champion', dx: 10, dy: 3, requires: 'elite' },
    ],
  },
  league_champion: {
    name: 'Arena del Campione',
    width: 22,
    height: 17,
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,1],
      [1,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,1],
      [1,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,1],
      [1,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,1],
      [1,0,0,0,4,0,0,0,0,0,5,0,0,0,0,0,4,0,0,0,0,1],
      [1,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,1],
      [1,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,1],
      [1,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    events: [
      { type: 'gymLeader', x: 10, y: 8, name: 'DUX VENETIAE', npcId: 'champion',
        dialog: ['Dopo questo lungo viaggio...', '...finalmente ci incontriamo, fiolo!', 'Sono il DUX VENETIAE!', 'Dimostra il tuo valore, senza ciacole e senza paura!'],
        team: [
          { id: 'dolomitor', lvl: 50 },
          { id: 'lagorion', lvl: 50 },
          { id: 'serenissima', lvl: 50 },
          { id: 'ombradriz', lvl: 50 },
          { id: 'fogarox', lvl: 52 },
          { id: 'canalord', lvl: 52 },
        ], badge: 'champion', prize: 50000 },
      { type: 'warp', x: 10, y: 15, dest: 'league_entrance', dx: 10, dy: 1 },
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
