// Teleportation System - Move between cities
export interface TeleportLocation {
  id: string
  name: string
  description: string
  map: string
  x: number
  y: number
  unlocked: boolean
  unlockCondition?: string
  unlockText?: string
  icon: string
  region: string
}

export const TELEPORT_LOCATIONS: TeleportLocation[] = [
  // CANALBORGO REGION
  {
    id: 'canalborgo',
    name: 'Canalborgo',
    description: 'Città dei canali e gondole',
    map: 'canalborgo',
    x: 7,
    y: 9,
    unlocked: true,
    icon: '🏛️',
    region: 'Regione Centro',
  },
  {
    id: 'casa',
    name: 'Casa',
    description: 'La tua casa a Canalborgo',
    map: 'casa',
    x: 4,
    y: 4,
    unlocked: true,
    icon: '🏠',
    region: 'Regione Centro',
  },
  {
    id: 'centro_canalborgo',
    name: 'Centro Bestie',
    description: 'Cura i tuoi Bestie',
    map: 'centro',
    x: 4,
    y: 4,
    unlocked: true,
    icon: '🏥',
    region: 'Regione Centro',
  },
  {
    id: 'shop_canalborgo',
    name: 'Negozio',
    description: 'Compra oggetti',
    map: 'shop_centro',
    x: 3,
    y: 3,
    unlocked: true,
    icon: '🏪',
    region: 'Regione Centro',
  },

  // SPRITZIA REGION
  {
    id: 'spritzia',
    name: 'Spritzia',
    description: 'Città dell\'aperitivo',
    map: 'spritzia',
    x: 10,
    y: 6,
    unlocked: true,
    unlockCondition: 'badge_aperitivo',
    unlockText: 'Vinci il Badge Aperitivo a Spritzia!',
    icon: '🍹',
    region: 'Regione Sud',
  },
  {
    id: 'centro_spritzia',
    name: 'Centro Spritzia',
    description: 'Cura i tuoi Bestie',
    map: 'centro_spritzia',
    x: 4,
    y: 4,
    unlocked: true,
    unlockCondition: 'badge_aperitivo',
    icon: '🏥',
    region: 'Regione Sud',
  },
  {
    id: 'shop_spritzia',
    name: 'Bar Spritz',
    description: 'Compra oggetti speciali',
    map: 'shop_spritzia',
    x: 3,
    y: 3,
    unlocked: true,
    unlockCondition: 'badge_aperitivo',
    icon: '🍸',
    region: 'Regione Sud',
  },
  {
    id: 'gym_spritzia',
    name: 'Gym Spritzia',
    description: 'Sfida Bepi lo Spritzaro',
    map: 'spritzia',
    x: 10,
    y: 6,
    unlocked: true,
    unlockCondition: 'badge_aperitivo',
    icon: '🏆',
    region: 'Regione Sud',
  },

  // VERONARA REGION
  {
    id: 'veronara',
    name: 'Veronara',
    description: 'Città dell\'amore',
    map: 'veronara',
    x: 10,
    y: 6,
    unlocked: true,
    unlockCondition: 'badge_arena',
    unlockText: 'Vinci il Badge Arena a Veronara!',
    icon: '🏟️',
    region: 'Regione Est',
  },
  {
    id: 'centro_veronara',
    name: 'Centro Veronara',
    description: 'Cura i tuoi Bestie',
    map: 'centro_veronara',
    x: 4,
    y: 4,
    unlocked: true,
    unlockCondition: 'badge_arena',
    icon: '🏥',
    region: 'Regione Est',
  },
  {
    id: 'shop_veronara',
    name: 'Bottega Arena',
    description: 'Compra oggetti Arena',
    map: 'shop_veronara',
    x: 3,
    y: 3,
    unlocked: true,
    unlockCondition: 'badge_arena',
    icon: '🏪',
    region: 'Regione Est',
  },
  {
    id: 'gym_veronara',
    name: 'Gym Arena',
    description: 'Sfida Giuliano Arena',
    map: 'veronara',
    x: 5,
    y: 4,
    unlocked: true,
    unlockCondition: 'badge_arena',
    icon: '🏆',
    region: 'Regione Est',
  },

  // PADOANA REGION
  {
    id: 'padoana',
    name: 'Padoana',
    description: 'Città dell\'università',
    map: 'padoana',
    x: 10,
    y: 6,
    unlocked: true,
    unlockCondition: 'badge_studio',
    unlockText: 'Vinci il Badge Studio a Padoana!',
    icon: '🎓',
    region: 'Regione Ovest',
  },
  {
    id: 'centro_padoana',
    name: 'Centro Padoana',
    description: 'Cura i tuoi Bestie',
    map: 'centro_padoana',
    x: 4,
    y: 4,
    unlocked: true,
    unlockCondition: 'badge_studio',
    icon: '🏥',
    region: 'Regione Ovest',
  },
  {
    id: 'shop_padoana',
    name: 'Libreria',
    description: 'Compra oggetti speciali',
    map: 'shop_padoana',
    x: 3,
    y: 3,
    unlocked: true,
    unlockCondition: 'badge_studio',
    icon: '📚',
    region: 'Regione Ovest',
  },

  // TREVISELLA REGION
  {
    id: 'trevisella',
    name: 'Trevisella',
    description: 'Città del radicchio',
    map: 'trevisella',
    x: 10,
    y: 6,
    unlocked: true,
    unlockCondition: 'badge_radicchio',
    unlockText: 'Vinci il Badge Radicchio a Trevisella!',
    icon: '🥬',
    region: 'Regione Nord',
  },
  {
    id: 'centro_trevisella',
    name: 'Centro Trevisella',
    description: 'Cura i tuoi Bestie',
    map: 'centro_trevisella',
    x: 4,
    y: 4,
    unlocked: true,
    unlockCondition: 'badge_radicchio',
    icon: '🏥',
    region: 'Regione Nord',
  },
  {
    id: 'shop_trevisella',
    name: 'Bottega Radicchio',
    description: 'Compra oggetti freschi',
    map: 'shop_trevisella',
    x: 3,
    y: 3,
    unlocked: true,
    unlockCondition: 'badge_radicchio',
    icon: '🥗',
    region: 'Regione Nord',
  },

  // DOLOMAX REGION
  {
    id: 'dolomax',
    name: 'Dolomax',
    description: 'Città delle montagne',
    map: 'dolomax',
    x: 10,
    y: 6,
    unlocked: true,
    unlockCondition: 'badge_ghiaccio',
    unlockText: 'Vinci il Badge Ghiaccio a Dolomax!',
    icon: '🏔️',
    region: 'Regione Montana',
  },
  {
    id: 'centro_dolomax',
    name: 'Centro Dolomax',
    description: 'Cura i tuoi Bestie',
    map: 'centro_dolomax',
    x: 4,
    y: 4,
    unlocked: true,
    unlockCondition: 'badge_ghiaccio',
    icon: '🏥',
    region: 'Regione Montana',
  },
  {
    id: 'shop_dolomax',
    name: 'Bottega Montagna',
    description: 'Compra oggetti alpini',
    map: 'shop_dolomax',
    x: 3,
    y: 3,
    unlocked: true,
    unlockCondition: 'badge_ghiaccio',
    icon: '⛷️',
    region: 'Regione Montana',
  },

  // GARDALAGO REGION
  {
    id: 'gardalago',
    name: 'Gardalago',
    description: 'Città del lago',
    map: 'gardalago',
    x: 10,
    y: 8,
    unlocked: true,
    unlockCondition: 'badge_laguna',
    unlockText: 'Vinci il Badge Laguna a Gardalago!',
    icon: '🏖️',
    region: 'Regione Finale',
  },
  {
    id: 'centro_gardalago',
    name: 'Centro Gardalago',
    description: 'Cura i tuoi Bestie',
    map: 'centro_gardalago',
    x: 4,
    y: 4,
    unlocked: true,
    unlockCondition: 'badge_laguna',
    icon: '🏥',
    region: 'Regione Finale',
  },
  {
    id: 'shop_gardalago',
    name: 'Negozio Lago',
    description: 'Compra gli oggetti migliori',
    map: 'shop_gardalago',
    x: 3,
    y: 3,
    unlocked: true,
    unlockCondition: 'badge_laguna',
    icon: '🏪',
    region: 'Regione Finale',
  },
  // LEAGUE LOCATIONS
  {
    id: 'league_entrance',
    name: 'Sede della Lega',
    description: "L'ingresso della Lega Bestie",
    map: 'league_entrance',
    x: 10,
    y: 1,
    unlocked: true,
    unlockCondition: 'league',
    icon: '🏆',
    region: 'Lega di Venetia',
  },
  {
    id: 'league_champion',
    name: 'Sala del Campione',
    description: 'La sala del Dux Venetiae',
    map: 'league_champion',
    x: 10,
    y: 6,
    unlocked: true,
    unlockCondition: 'elite',
    icon: '👑',
    region: 'Lega di Venetia',
  },
]

const normalizeBadgeId = (badge: string): string => {
  const normalized = badge
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

  switch (normalized) {
    case 'badgeaperitivo':
      return 'aperitivo'
    case 'badgearena':
      return 'arena'
    case 'badgestudio':
      return 'studio'
    case 'badgeradicchio':
      return 'radicchio'
    case 'badgeghiaccio':
      return 'ghiaccio'
    case 'badgelaguna':
      return 'laguna'
    case 'campionedivenetia':
    case 'campione':
    case 'champion':
      return 'campione'
    default:
      return normalized
  }
}

// Check if location is unlocked based on player's badges
export const isLocationUnlocked = (
  location: TeleportLocation,
  badges: string[],
  storyProgress: number
): boolean => {
  const normalizedBadges = badges.map(normalizeBadgeId)

  if (location.unlocked) return true
  
  if (!location.unlockCondition) return false

  switch (location.unlockCondition) {
    case 'badge_aperitivo':
      return normalizedBadges.includes('aperitivo')
    case 'badge_arena':
      return normalizedBadges.includes('arena')
    case 'badge_studio':
      return normalizedBadges.includes('studio')
    case 'badge_radicchio':
      return normalizedBadges.includes('radicchio')
    case 'badge_ghiaccio':
      return normalizedBadges.includes('ghiaccio')
    case 'badge_laguna':
      return normalizedBadges.includes('laguna')
    case 'champion':
      return normalizedBadges.includes('campione')
    case 'league':
      return ['aperitivo', 'arena', 'studio', 'radicchio', 'ghiaccio', 'laguna'].every(badge => normalizedBadges.includes(badge))
    case 'elite':
      return normalizedBadges.includes('league_pass')
    default:
      return false
  }
}

// Get locations grouped by region
export const getLocationsByRegion = (unlocked: TeleportLocation[]) => {
  const grouped: Record<string, TeleportLocation[]> = {}
  
  unlocked.forEach(loc => {
    if (!grouped[loc.region]) {
      grouped[loc.region] = []
    }
    grouped[loc.region].push(loc)
  })
  
  return grouped
}
