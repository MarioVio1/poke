// Type colors for styling
export const TYPE_COLORS: Record<string, string> = {
  fire: '#f44336',
  water: '#2196f3',
  nature: '#4caf50',
  earth: '#8d6e63',
  air: '#87ceeb',
  psycho: '#9c27b0',
  ice: '#00bcd4',
  poison: '#4a148c',
  electric: '#ffc107',
  magic: '#e91e63',
  sweet: '#ff9800',
  dragon: '#673ab7',
  normal: '#9e9e9e',
}

// Type effectiveness chart
export const TYPE_CHART: Record<string, { weakTo: string[]; strong: string[] }> = {
  fire: { weakTo: ['water', 'earth'], strong: ['nature', 'ice'] },
  water: { weakTo: ['electric', 'nature'], strong: ['fire', 'ice'] },
  nature: { weakTo: ['fire', 'air', 'ice'], strong: ['water', 'earth'] },
  earth: { weakTo: ['water', 'nature'], strong: ['fire', 'electric'] },
  air: { weakTo: ['electric'], strong: ['nature'] },
  psycho: { weakTo: ['air', 'poison'], strong: ['poison'] },
  ice: { weakTo: ['fire', 'earth', 'dragon'], strong: ['nature', 'air'] },
  poison: { weakTo: ['earth', 'psycho'], strong: ['nature'] },
  electric: { weakTo: ['earth'], strong: ['water', 'air'] },
  magic: { weakTo: ['poison'], strong: ['fire', 'ice'] },
  sweet: { weakTo: ['poison'], strong: ['nature'] },
  dragon: { weakTo: ['ice', 'dragon'], strong: ['fire', 'water'] },
}

// ═══════════════════════════════════════════════════════════════
// TILE SYSTEM - Pokemon style graphics
// ═══════════════════════════════════════════════════════════════

// Outdoor tiles (grass, paths, water, trees)
export const OUTDOOR_TILES: Record<number, {
  base: string
  detail?: string
  walkable: boolean
  type: 'grass' | 'path' | 'water' | 'tree' | 'wall' | 'building'
}> = {
  0: { base: '#48a148', detail: '#3d8b3d', walkable: true, type: 'grass' },      // grass
  1: { base: '#6b5b45', detail: '#5a4a3a', walkable: false, type: 'wall' },       // wall/border
  2: { base: '#3b8fc2', detail: '#5ba8d4', walkable: false, type: 'water' },     // water
  3: { base: '#8b7355', detail: '#6d5a45', walkable: false, type: 'building' }, // building
  6: { base: '#7cb342', detail: '#9ccc65', walkable: true, type: 'grass' },        // vineyard
  7: { base: '#c62828', detail: '#d32f2f', walkable: true, type: 'grass' },        // radicchio
  8: { base: '#cfd8dc', detail: '#eceff1', walkable: true, type: 'grass' },        // snow
  9: { base: '#5d4037', detail: '#4e342e', walkable: false, type: 'tree' },       // tree/trunk
  10: { base: '#2e7d32', detail: '#388e3c', walkable: false, type: 'tree' },        // tree/leaves
}

// Indoor tiles (floors, walls, furniture)
export const INDOOR_TILES: Record<number, {
  base: string
  detail?: string
  walkable: boolean
  type: 'floor' | 'wall' | 'counter' | 'carpet' | 'heal'
}> = {
  0: { base: '#d7ccc8', detail: '#bcaaa4', walkable: true, type: 'floor' },     // indoor floor
  1: { base: '#6d4c41', detail: '#5d4037', walkable: false, type: 'wall' },   // wall
  2: { base: '#a1887f', detail: '#8d6e63', walkable: false, type: 'wall' },     // wall accent
  3: { base: '#bcaaa4', detail: '#d7ccc8', walkable: true, type: 'carpet' },    // carpet
  4: { base: '#80cbc4', detail: '#4db6ac', walkable: true, type: 'heal' },       // healing circle
  5: { base: '#8d6e63', detail: '#6d5a45', walkable: false, type: 'counter' }, // counter/shop
  6: { base: '#ffcc80', detail: '#ffb74d', walkable: true, type: 'floor' },      // wooden floor
  7: { base: '#7986cb', detail: '#5c6bc0', walkable: true, type: 'carpet' },    // blue carpet
  8: { base: '#f44336', detail: '#e53935', walkable: false, type: 'wall' },      // red wall accent
}

// Detect if map is indoor
export const isIndoorMap = (mapName: string): boolean => {
  return mapName.includes('casa') || 
         mapName.includes('centro') || 
         mapName.includes('shop') ||
         mapName.includes('gym') ||
         mapName.includes('prof') ||
         mapName.includes('inside')
}

// Get background color for map
export const getMapBackground = (mapName: string): { sky: string; ground: string } => {
  if (isIndoorMap(mapName)) {
    return {
      sky: '#2d2d2d',    // dark indoor ceiling
      ground: '#1a1a1a'   // indoor shadow
    }
  }
  
  // Outdoor maps based on city theme
  if (mapName.includes('canalborgo')) {
    return { sky: '#5ba8d4', ground: '#4a9ed4' }
  }
  if (mapName.includes('spritzia')) {
    return { sky: '#87ceeb', ground: '#7bc8eb' }
  }
  if (mapName.includes('veronara')) {
    return { sky: '#ff8a65', ground: '#ffa726' }
  }
  if (mapName.includes('padoana')) {
    return { sky: '#9575cd', ground: '#9575cd' }
  }
  if (mapName.includes('trevisella')) {
    return { sky: '#81c784', ground: '#66bb6a' }
  }
  if (mapName.includes('dolomax')) {
    return { sky: '#90a4ae', ground: '#78909c' }
  }
  if (mapName.includes('gardalago')) {
    return { sky: '#4fc3f7', ground: '#29b6f6' }
  }
  if (mapName.includes('route')) {
    return { sky: '#81d4fa', ground: '#4fc3f7' }
  }
  
  return { sky: '#87ceeb', ground: '#7bc8eb' }
}

// Render a single tile with details
export const renderTile = (
  ctx: CanvasRenderingContext2D,
  tileType: number,
  x: number,
  y: number,
  size: number,
  isIndoor: boolean,
  time: number
) => {
  const tiles = isIndoor ? INDOOR_TILES : OUTDOOR_TILES
  const tile = tiles[tileType] || { base: '#ff00ff', detail: '#ff00ff', walkable: true, type: 'grass' }
  
  // Base color
  ctx.fillStyle = tile.base
  ctx.fillRect(x, y, size, size)
  
  // Tile detail pattern
  ctx.fillStyle = tile.detail
  if (tile.type === 'grass') {
    // Grass blades
    if ((x + y) % (size / 2) === 0) {
      ctx.fillRect(x + 3, y + 2, 2, 4)
      ctx.fillRect(x + 10, y + 6, 2, 4)
    }
    // Random flowers
    if ((x * 7 + y * 13) % 23 === 0) {
      ctx.fillStyle = '#ffeb3b'
      ctx.fillRect(x + 7, y + 7, 2, 2)
    }
  }
  
  if (tile.type === 'water') {
    // Water ripples
    const waveOffset = Math.sin(time / 300 + x / 10) * 2
    ctx.fillRect(x + waveOffset + 2, y + 6, 5, 2)
    ctx.fillRect(x - waveOffset + 8, y + 10, 4, 2)
  }
  
  if (tile.type === 'wall') {
    // Brick pattern
    if (y % (size / 2) === 0) {
      ctx.fillRect(x, y, size, 1)
    }
    if (x % (size / 2) === 0) {
      ctx.fillRect(x, y, 1, size)
    }
  }
  
  if (tile.type === 'floor' || tile.type === 'carpet') {
    // Floor pattern
    if ((x + y) % (size * 2) === 0) {
      ctx.fillStyle = tile.detail
      ctx.fillRect(x, y, 2, 2)
    }
  }
  
  if (tile.type === 'heal') {
    // Healing circle glow
    const gradient = ctx.createRadialGradient(
      x + size/2, y + size/2, 0,
      x + size/2, y + size/2, size/2
    )
    gradient.addColorStop(0, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(0.5, 'rgba(129,199,132,0.5)')
    gradient.addColorStop(1, 'rgba(129,199,132,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(x, y, size, size)
  }
  
  if (tile.type === 'tree') {
    if (tileType === 9) {
      // Tree trunk
      ctx.fillStyle = '#5d4037'
      ctx.fillRect(x + 6, y + 4, 4, 12)
    } else {
      // Tree leaves
      ctx.fillStyle = '#2e7d32'
      ctx.beginPath()
      ctx.arc(x + 8, y + 8, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#388e3c'
      ctx.beginPath()
      ctx.arc(x + 6, y + 6, 4, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

// Render a building
export const renderBuilding = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  type: 'house' | 'shop' | 'center' | 'gym',
  time: number
) => {
  const tileSize = 16
  
  // Building colors based on type
  const colors = {
    house: { wall: '#d7ccc8', roof: '#c62828', door: '#5d4037', window: '#64b5f6' },
    shop: { wall: '#ffe0b2', roof: '#ff9800', door: '#795548', window: '#64b5f6' },
    center: { wall: '#e1bee7', roof: '#9c27b0', door: '#7b1fa2', window: '#64b5f6' },
    gym: { wall: '#fff9c4', roof: '#fbc02d', door: '#ff5722', window: '#64b5f6' },
  }
  
  const c = colors[type]
  
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)'
  ctx.fillRect(x + 4, y + height - 4, width, 8)
  
  // Wall
  ctx.fillStyle = c.wall
  ctx.fillRect(x, y + 20, width, height - 20)
  
  // Roof
  ctx.fillStyle = c.roof
  ctx.beginPath()
  ctx.moveTo(x - 8, y + 24)
  ctx.lineTo(x + width / 2, y)
  ctx.lineTo(x + width + 8, y + 24)
  ctx.closePath()
  ctx.fill()
  
  // Door
  ctx.fillStyle = c.door
  ctx.fillRect(x + width/2 - 10, y + height - 30, 20, 30)
  
  // Door knob
  ctx.fillStyle = '#ffd700'
  ctx.beginPath()
  ctx.arc(x + width/2 + 5, y + height - 15, 2, 0, Math.PI * 2)
  ctx.fill()
  
  // Windows
  ctx.fillStyle = c.window
  ctx.fillRect(x + 10, y + 35, 20, 20)
  ctx.fillRect(x + width - 30, y + 35, 20, 20)
  
  // Window frames
  ctx.fillStyle = '#5d4037'
  ctx.fillRect(x + 19, y + 35, 2, 20)
  ctx.fillRect(x + 10, y + 44, 20, 2)
  ctx.fillRect(x + width - 21, y + 35, 2, 20)
  ctx.fillRect(x + width - 30, y + 44, 20, 2)
  
  // Shop sign for shops
  if (type === 'shop') {
    ctx.fillStyle = '#ffeb3b'
    ctx.fillRect(x + 10, y + 20, width - 20, 10)
    ctx.fillStyle = '#333'
    ctx.font = '6px Arial'
    ctx.fillText('SHOP', x + 20, y + 28)
  }
  
  // Pokeball for centers
  if (type === 'center') {
    ctx.fillStyle = '#f44336'
    ctx.beginPath()
    ctx.arc(x + width/2, y + 12, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(x + width/2, y + 12, 8, 0, Math.PI, true)
    ctx.fill()
    ctx.fillStyle = '#333'
    ctx.fillRect(x + width/2 - 8, y + 10, 16, 4)
  }
}

// Old export for compatibility
export const TILE_COLORS: Record<number, string> = {
  0: '#48a148', // grass
  1: '#5a5a5a', // wall
  2: '#3b8fc2', // water
  3: '#8b7355', // building
  4: '#d7ccc8', // indoor floor
  5: '#b2ebf2', // center floor
  6: '#7cb342', // vineyard
  7: '#c62828', // radicchio
  8: '#cfd8dc', // snow
  9: '#5d4037', // tree trunk
  10: '#2e7d32', // tree leaves
}
