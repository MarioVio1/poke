// ═══════════════════════════════════════════════════════════════════════════════════════
// MAPPA COMPLETA - Tutte le zone di gioco
// ═══════════════════════════════════════════════════════════════════════════════════════

import { GameMap } from './besti'

export const COMPLETE_MAPS: Record<string, GameMap> = {
  // ═══════════════════════════════════════════════════════════════════════════════════
  // CANALBORGO - Città di Venezia (Start)
  // ═══════════════════════════════════════════════════════════════════════════════════
  canalborgo: {
    name: 'Canalborgo',
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,2,2,2,0,0,0,0,0,2,2,2,0,0,0,0,0,1],
      [1,0,0,2,2,2,0,0,0,0,0,2,2,2,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    ],
    events: [
      { type: 'npc', x: 10, y: 7, name: 'Prof. Barcaro', npcId: 'prof_barcaro', 
        dialog: ['Ah, sei arrivato!', 'Sono il Prof. Barcaro!', 'Ho 4 Besti leggendari per te!', 'Scegli il tuo!'], givesStarter: true },
      { type: 'npc', x: 4, y: 9, name: 'Mamma', npcId: 'mamma', dialog: ['Tesoro!', 'Vai dal Prof. Barcaro!', 'E non litigare!'] },
      { type: 'npc', x: 5, y: 4, name: 'Nonno Piero', npcId: 'nonno_piero', dialog: ['Nel mio tempo...', '...era tutto meglio!'] },
      { type: 'npc', x: 2, y: 5, name: 'Gondoliere', npcId: 'gondoliere_nero', dialog: ['Vogando...', 'Costa 50€ il giro!'] },
      { type: 'sign', x: 8, y: 9, text: 'CANALBORGO\nLa città dei canali!' },
      { type: 'sign', x: 15, y: 4, text: 'Centro Besti ➜' },
      { type: 'warp', x: 7, y: 11, dest: 'casa', dx: 4, dy: 5 },
      { type: 'warp', x: 12, y: 11, dest: 'casa', dx: 5, dy: 5 },
      { type: 'warp', x: 9, y: 6, dest: 'centro', dx: 4, dy: 4 },
      { type: 'warp', x: 10, y: 6, dest: 'shop_centro', dx: 3, dy: 4 },
      { type: 'warp', x: 7, y: 14, dest: 'route1', dx: 10, dy: 1 },
    ],
  },

  // HOME
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
      { type: 'npc', x: 4, y: 3, name: 'Mamma', npcId: 'mamma', dialog: ['Vai dal Prof.!'] },
      { type: 'item', x: 7, y: 4, item: { name: 'Pozioncino', type: 'heal', val: 20 } },
      { type: 'item', x: 6, y: 3, item: { name: 'Gondolball', type: 'capture', val: 0 } },
      { type: 'warp', x: 4, y: 5, dest: 'canalborgo', dx: 7, dy: 12 },
      { type: 'warp', x: 5, y: 5, dest: 'canalborgo', dx: 12, dy: 12 },
    ],
  },

  // BESTI CENTER
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
      { type: 'npc', x: 4, y: 3, name: 'Infermiera', npcId: 'lass', dialog: ['Curato!', 'Buona fortuna!'] },
      { type: 'heal' },
      { type: 'warp', x: 4, y: 5, dest: 'canalborgo', dx: 9, dy: 7 },
    ],
  },

  // SHOP
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
      { type: 'shop', x: 3, y: 3, items: [
        { name: 'Pozioncino', price: 100, type: 'heal', val: 20 },
        { name: 'Gondolball', price: 200, type: 'capture', val: 0 },
        { name: 'Caffè Corretto', price: 80, type: 'heal', val: 10 },
      ]},
      { type: 'warp', x: 3, y: 4, dest: 'canalborgo', dx: 10, dy: 7 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // ROUTE 1 - Via del Prosecco
  // ═══════════════════════════════════════════════════════════════════════════════════
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
    wild: ['gabbianzo', 'canalot', 'colombo', 'vespolo'],
    wildLvl: [3, 4, 3, 4],
    wildRate: 10,
    events: [
      { type: 'sign', x: 10, y: 5, text: 'Via del Prosecco\n➜ Spritzia' },
      { type: 'trainer', x: 5, y: 7, name: 'Luca', npcId: 'kid', dialog: ['Combattiamo!'], team: [{ id: 'colombo', lvl: 5 }] },
      { type: 'item', x: 14, y: 5, item: { name: 'Pozioncino', type: 'heal', val: 20 } },
      { type: 'warp', x: 10, y: 0, dest: 'canalborgo', dx: 7, dy: 13 },
      { type: 'warp', x: 10, y: 11, dest: 'spritzia', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // SPRITZIA - Città dell'Aperitivo
  // ═══════════════════════════════════════════════════════════════════════════════════
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
      { type: 'gym', x: 10, y: 6, name: 'Bepi lo Spritzaro', npcId: 'bepi_spritzaro', badge: 'Badge Aperitivo',
        dialog: ['CHE BEVEMO OGGI?!', 'Combattiamo!'], team: [{ id: 'spritzino', lvl: 14 }, { id: 'vespolo', lvl: 15 }, { id: 'fogaron', lvl: 16 }] },
      { type: 'trainer', x: 4, y: 7, name: 'Grint', npcId: 'grint_polenta', isEnemy: true, dialog: ['LA COMPAGNIA!'], team: [{ id: 'polentaur', lvl: 12 }, { id: 'salamix', lvl: 11 }] },
      { type: 'npc', x: 16, y: 4, name: 'Foto Mario', npcId: 'fotografo', dialog: ['SORRISI!', 'Bel bestia!'] },
      { type: 'npc', x: 3, y: 4, name: 'Nonna Marisa', npcId: 'vecchia_spritzia', dialog: ['Nel mio tempo...'] },
      { type: 'sign', x: 10, y: 8, text: 'SPRITZIA\nCittà dell\'Aperitivo!' },
      { type: 'warp', x: 17, y: 4, dest: 'shop_spritzia', dx: 3, dy: 4 },
      { type: 'warp', x: 10, y: 4, dest: 'centro_spritzia', dx: 4, dy: 4 },
      { type: 'warp', x: 10, y: 0, dest: 'route1', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'route2', dx: 10, dy: 1 },
    ],
  },

  centro_spritzia: {
    name: 'Centro Spritzia',
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
      { type: 'shop', x: 3, y: 3, items: [
        { name: 'Pozioncino', price: 100, type: 'heal', val: 20 },
        { name: 'Super Pozione', price: 250, type: 'heal', val: 50 },
        { name: 'Gondolball', price: 200, type: 'capture', val: 0 },
        { name: 'Spritz Ball', price: 400, type: 'capture', val: 0 },
        { name: 'Pietra Focaia', price: 800, type: 'stone', val: 0 },
      ]},
      { type: 'warp', x: 3, y: 4, dest: 'spritzia', dx: 17, dy: 5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // ROUTE 2 - Via delle Vigne
  // ═══════════════════════════════════════════════════════════════════════════════════
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
      { type: 'trainer', x: 5, y: 8, name: 'Nonna Gina', npcId: 'nonno_piero', dialog: ['Combattiamo!'], team: [{ id: 'vignel', lvl: 10 }, { id: 'radicor', lvl: 11 }] },
      { type: 'item', x: 14, y: 8, item: { name: 'Super Pozione', type: 'heal', val: 50 } },
      { type: 'warp', x: 10, y: 0, dest: 'spritzia', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'veronara', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // VERONARA - Città dell'Amore (Arena)
  // ═══════════════════════════════════════════════════════════════════════════════════
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
      { type: 'gym', x: 5, y: 4, name: 'Giuliano Arena', npcId: 'giuliano_arena', badge: 'Badge Arena',
        dialog: ['BENVENUTO NELL\'ARENA!', 'Combattiamo!'], team: [{ id: 'polentaur', lvl: 18 }, { id: 'alpibex', lvl: 19 }, { id: 'dolomor', lvl: 20 }] },
      { type: 'npc', x: 14, y: 7, name: 'Totti Tifoso', npcId: 'totti_tifoso', dialog: ['FORZA VENEZIA! ...Scusa, ROMA!'] },
      { type: 'npc', x: 17, y: 4, name: 'Don Bepi', npcId: 'prete', dialog: ['Dio ti benedica!'] },
      { type: 'sign', x: 10, y: 8, text: 'VERONARA\nCittà dell\'Amore!' },
      { type: 'warp', x: 4, y: 4, dest: 'shop_veronara', dx: 3, dy: 4 },
      { type: 'warp', x: 15, y: 4, dest: 'centro_veronara', dx: 4, dy: 4 },
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
      { type: 'shop', x: 3, y: 3, items: [
        { name: 'Super Pozione', price: 250, type: 'heal', val: 50 },
        { name: 'Iper Pozione', price: 500, type: 'heal', val: 100 },
        { name: 'Spritz Ball', price: 400, type: 'capture', val: 0 },
        { name: 'Polentaball', price: 600, type: 'capture', val: 0 },
        { name: 'Pietra Verde', price: 800, type: 'stone', val: 0 },
      ]},
      { type: 'warp', x: 3, y: 4, dest: 'veronara', dx: 4, dy: 5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // ROUTE 3 - Via degli Studenti
  // ═══════════════════════════════════════════════════════════════════════════════════
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
      { type: 'trainer', x: 6, y: 7, name: 'Marco', npcId: 'studente_fannullone', dialog: ['Gli esami...'], team: [{ id: 'smogatto', lvl: 15 }, { id: 'formaggion', lvl: 14 }] },
      { type: 'item', x: 14, y: 4, item: { name: 'Polentaball', type: 'capture', val: 0 } },
      { type: 'warp', x: 10, y: 0, dest: 'veronara', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'padoana', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // PADOANA - Città dell'Università
  // ═══════════════════════════════════════════════════════════════════════════════════
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
      { type: 'npc', x: 10, y: 6, name: 'Prof. Sansovino', npcId: 'prof_padova', dialog: ['Benvenuto!', 'Studia i Besti!'] },
      { type: 'npc', x: 4, y: 7, name: 'Marco', npcId: 'studente_fannullone', dialog: ['Ma chi me lo fa fare?'] },
      { type: 'trainer', x: 16, y: 7, name: 'Laura', npcId: 'lass', dialog: ['Combattiamo!'], team: [{ id: 'tiramisu', lvl: 18 }, { id: 'prosecchione', lvl: 17 }] },
      { type: 'sign', x: 10, y: 8, text: 'PADOANA\nCittà dell\'Università!' },
      { type: 'warp', x: 4, y: 4, dest: 'shop_padoana', dx: 3, dy: 4 },
      { type: 'warp', x: 15, y: 4, dest: 'centro_padoana', dx: 4, dy: 4 },
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
      { type: 'shop', x: 3, y: 3, items: [
        { name: 'Pozioncino', price: 100, type: 'heal', val: 20 },
        { name: 'Gondolball', price: 200, type: 'capture', val: 0 },
        { name: 'Super Pozione', price: 250, type: 'heal', val: 50 },
        { name: 'Pietra Temporale', price: 1000, type: 'stone', val: 0 },
      ]},
      { type: 'warp', x: 3, y: 4, dest: 'padoana', dx: 4, dy: 5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // ROUTE 4 - Via del Radicchio
  // ═══════════════════════════════════════════════════════════════════════════════════
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
    wild: ['lagunello', 'smogatto', 'radicor', 'lagunaga'],
    wildLvl: [15, 16, 17, 18],
    wildRate: 15,
    events: [
      { type: 'sign', x: 10, y: 5, text: 'Via del Radicchio\n➜ Trevisella' },
      { type: 'trainer', x: 5, y: 8, name: 'Sior Tonic', npcId: 'pescatore', dialog: ['El pesce xe finio!'], team: [{ id: 'lagunello', lvl: 16 }, { id: 'scampetto', lvl: 17 }] },
      { type: 'item', x: 14, y: 5, item: { name: 'Pietra Acquatica', type: 'stone', val: 0 } },
      { type: 'warp', x: 10, y: 0, dest: 'padoana', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'trevisella', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // TREVISELLA - Città del Radicchio
  // ═══════════════════════════════════════════════════════════════════════════════════
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
      { type: 'npc', x: 5, y: 4, name: 'Nono Gino', npcId: 'vecchio_treviso', dialog: ['Xe 90 anni che vivo qui!', 'El radicchio? Quello vero xe solo mio!'] },
      { type: 'npc', x: 14, y: 4, name: 'Sior Tonic', npcId: 'pescatore', dialog: ['Vieni a pescare!'] },
      { type: 'trainer', x: 10, y: 8, name: 'Beppo', npcId: 'bepi_spritzaro', dialog: ['Combattiamo!'], team: [{ id: 'radicorso', lvl: 18 }, { id: 'lagunaga', lvl: 19 }] },
      { type: 'npc', x: 3, y: 7, name: 'Cugino Max', npcId: 'kid', dialog: ['Tieni questa bici!', 'L\'ho rubata a mio cugino!'], gift: 'biciRubata' },
      { type: 'sign', x: 10, y: 9, text: 'TREVISELLA\nCittà del Radicchio!' },
      { type: 'warp', x: 4, y: 6, dest: 'shop_trevisella', dx: 3, dy: 4 },
      { type: 'warp', x: 15, y: 6, dest: 'centro_trevisella', dx: 4, dy: 4 },
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
      { type: 'shop', x: 3, y: 3, items: [
        { name: 'Pozioncino', price: 100, type: 'heal', val: 20 },
        { name: 'Spritz Curativo', price: 150, type: 'heal', val: 30 },
        { name: 'Gondolball', price: 200, type: 'capture', val: 0 },
        { name: 'Scampaball', price: 500, type: 'capture', val: 0 },
      ]},
      { type: 'warp', x: 3, y: 4, dest: 'trevisella', dx: 4, dy: 7 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // ROUTE 5 - Via delle Dolomiti
  // ═══════════════════════════════════════════════════════════════════════════════════
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
      { type: 'trainer', x: 6, y: 7, name: 'Bepi de Monte', npcId: 'montanaro', dialog: ['Benvenuto in altura!'], team: [{ id: 'alpibex', lvl: 22 }, { id: 'dolomor', lvl: 23 }] },
      { type: 'item', x: 14, y: 4, item: { name: 'Iper Pozione', type: 'heal', val: 100 } },
      { type: 'warp', x: 10, y: 0, dest: 'trevisella', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'dolomax', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // DOLOMAX - Città delle Montagne
  // ═══════════════════════════════════════════════════════════════════════════════════
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
      { type: 'npc', x: 5, y: 7, name: 'Bepi de Monte', npcId: 'montanaro', dialog: ['Qui l\'aria xe fina!'] },
      { type: 'npc', x: 14, y: 7, name: 'Bepi Yeti', npcId: 'yeti_finto', dialog: ['L\'ho visto! Il Yeti! ...Era un Nevelet!'] },
      { type: 'gym', x: 9, y: 6, name: 'Regina dei Ghiacci', npcId: 'vecchia_spritzia', badge: 'Badge Ghiaccio',
        dialog: ['Il freddo è mio alleato!', 'Combattiamo!'], team: [{ id: 'nevelet', lvl: 24 }, { id: 'dolomor', lvl: 26 }, { id: 'dolomibex', lvl: 28 }] },
      { type: 'sign', x: 10, y: 9, text: 'DOLOMAX\nLa città delle Nevi!' },
      { type: 'warp', x: 4, y: 6, dest: 'shop_dolomax', dx: 3, dy: 4 },
      { type: 'warp', x: 15, y: 6, dest: 'centro_dolomax', dx: 4, dy: 4 },
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
      { type: 'shop', x: 3, y: 3, items: [
        { name: 'Super Pozione', price: 250, type: 'heal', val: 50 },
        { name: 'Iper Pozione', price: 500, type: 'heal', val: 100 },
        { name: 'Gondolball', price: 200, type: 'capture', val: 0 },
      ]},
      { type: 'warp', x: 3, y: 4, dest: 'dolomax', dx: 4, dy: 7 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // ROUTE 6 - Via del Gardalago
  // ═══════════════════════════════════════════════════════════════════════════════════
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
    wild: ['gabbianator', 'tiramisuper', 'dolomibex', 'lagorion'],
    wildLvl: [25, 26, 27, 30],
    wildRate: 18,
    events: [
      { type: 'sign', x: 10, y: 5, text: 'Via del Gardalago\n➜ Gardalago' },
      { type: 'trainer', x: 5, y: 7, name: 'Elite Marco', npcId: 'champion', dialog: ['Preparati!'], team: [{ id: 'fogarion', lvl: 28 }, { id: 'canalord', lvl: 28 }] },
      { type: 'item', x: 15, y: 5, item: { name: 'Mascheraball', type: 'capture', val: 0 } },
      { type: 'warp', x: 10, y: 0, dest: 'dolomax', dx: 10, dy: 10 },
      { type: 'warp', x: 10, y: 11, dest: 'gardalago', dx: 10, dy: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════════
  // GARDALAGO - Città del Lago Finale
  // ═══════════════════════════════════════════════════════════════════════════════════
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
      { type: 'npc', x: 9, y: 6, name: 'Gondoliere Eco', npcId: 'gondoliere_verde', dialog: ['Benvenuto!', 'Prendi la Gondola d\'Oro!'], gift: 'gondola_oro' },
      { type: 'trainer', x: 10, y: 8, name: 'Maestro Marco', npcId: 'campione_veneto', dialog: ['Preparati alla Liga!'], team: [{ id: 'serenissima', lvl: 42 }, { id: 'lagorion', lvl: 42 }, { id: 'fogarion', lvl: 42 }] },
      { type: 'sign', x: 10, y: 10, text: 'GARDALAGO\nL\'ultima sfida!' },
      { type: 'warp', x: 4, y: 8, dest: 'shop_gardalago', dx: 3, dy: 4 },
      { type: 'warp', x: 15, y: 8, dest: 'centro_gardalago', dx: 4, dy: 4 },
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
      { type: 'shop', x: 3, y: 3, items: [
        { name: 'Super Pozione', price: 250, type: 'heal', val: 50 },
        { name: 'Iper Pozione', price: 500, type: 'heal', val: 100 },
        { name: 'Panino Veneto', price: 300, type: 'food', val: 999 },
        { name: 'Mascheraball', price: 1000, type: 'capture', val: 0 },
        { name: 'Spritz Ball', price: 400, type: 'capture', val: 0 },
      ]},
      { type: 'warp', x: 3, y: 4, dest: 'gardalago', dx: 4, dy: 9 },
    ],
  },
}

// Export as default for compatibility
export default COMPLETE_MAPS
