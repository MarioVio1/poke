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
  0: { base: '#9fe29b', detail: '#69b85d', walkable: true, type: 'grass' },
  1: { base: '#8a7a61', detail: '#6d604d', walkable: false, type: 'wall' },
  2: { base: '#67c7dd', detail: '#b7f0f4', walkable: false, type: 'water' },
  3: { base: '#d86356', detail: '#b94e46', walkable: false, type: 'building' }, // Roof
  4: { base: '#f7f1d4', detail: '#d7ccc8', walkable: false, type: 'building' }, // Wall
  5: { base: '#7a5b45', detail: '#5d4037', walkable: true, type: 'building' }, // Door
  6: { base: '#7bc86a', detail: '#4f9649', walkable: true, type: 'grass' },
  7: { base: '#c44b5b', detail: '#8d2136', walkable: true, type: 'grass' },
  8: { base: '#d9f6e4', detail: '#b9e3cf', walkable: true, type: 'grass' },
  9: { base: '#845f35', detail: '#5f4529', walkable: false, type: 'tree' },
  10: { base: '#82db6f', detail: '#4e9d42', walkable: false, type: 'tree' },
}

// Indoor tiles (floors, walls, furniture)
export const INDOOR_TILES: Record<number, {
  base: string
  detail?: string
  walkable: boolean
  type: 'floor' | 'wall' | 'counter' | 'carpet' | 'heal' | 'bed' | 'table' | 'chair' | 'window' | 'door' | 'rug' | 'plant' | 'lamp' | 'bookshelf' | 'fireplace'
}> = {
  0: { base: '#efeff7', detail: '#d6d8ea', walkable: true, type: 'floor' },
  1: { base: '#7d7364', detail: '#5c554a', walkable: false, type: 'wall' },
  2: { base: '#d8c59d', detail: '#bfa468', walkable: false, type: 'wall' },
  3: { base: '#c9e1ac', detail: '#9dca7a', walkable: true, type: 'carpet' },
  4: { base: '#dff8ff', detail: '#9de0f1', walkable: true, type: 'heal' },
  5: { base: '#c9c6d6', detail: '#9790a9', walkable: false, type: 'counter' },
  6: { base: '#ead58f', detail: '#d1b665', walkable: true, type: 'floor' },
  7: { base: '#92a7ef', detail: '#6e82d4', walkable: true, type: 'carpet' },
  8: { base: '#d45353', detail: '#a73f3f', walkable: false, type: 'wall' },
  9: { base: '#8b5a2b', detail: '#6b4423', walkable: false, type: 'bed' },
  10: { base: '#5d4037', detail: '#4e342e', walkable: false, type: 'table' },
  11: { base: '#8d6e63', detail: '#795548', walkable: true, type: 'chair' },
  12: { base: '#87ceeb', detail: '#4fc3f7', walkable: false, type: 'window' },
  13: { base: '#4e342e', detail: '#3e2723', walkable: true, type: 'door' },
  14: { base: '#b71c1c', detail: '#c62828', walkable: true, type: 'rug' },
  15: { base: '#2e7d32', detail: '#1b5e20', walkable: true, type: 'plant' },
  16: { base: '#ffeb3b', detail: '#ffc107', walkable: true, type: 'lamp' },
  17: { base: '#5d4037', detail: '#3e2723', walkable: false, type: 'bookshelf' },
  18: { base: '#bf360c', detail: '#d84315', walkable: false, type: 'fireplace' },
  19: { base: '#f5f5f5', detail: '#e0e0e0', walkable: true, type: 'floor' },
  20: { base: '#9e9e9e', detail: '#757575', walkable: false, type: 'wall' },
}

// Detect if map is indoor
export const isIndoorMap = (mapName: string): boolean => {
  return mapName.includes('casa') || 
         mapName.includes('centro') || 
         mapName.includes('shop') ||
         mapName.includes('gym') ||
         mapName.includes('prof') ||
         mapName.includes('laboratorio') ||
         mapName.includes('porto') ||
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
  const detailColor = tile.detail ?? tile.base
  
  // Base color
  ctx.fillStyle = tile.base
  ctx.fillRect(x, y, size, size)
  
  // Tile detail pattern
  ctx.fillStyle = detailColor
  if (tile.type === 'grass') {
    // Grass blades
    ctx.fillStyle = tile.detail || 'rgba(0,0,0,0.1)'
    ctx.fillRect(x + 3, y + 4, 1, 3)
    ctx.fillRect(x + 4, y + 5, 1, 2)
    ctx.fillRect(x + 10, y + 8, 1, 4)
    ctx.fillRect(x + 11, y + 9, 1, 3)

    // Highlights
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.fillRect(x + 2, y + 3, 1, 1)
    ctx.fillRect(x + 9, y + 7, 1, 1)

    // Random flowers
    if ((x * 7 + y * 13) % 31 === 0) {
      ctx.fillStyle = '#ff5252' // Red flower
      ctx.fillRect(x + 6, y + 6, 2, 2)
      ctx.fillStyle = '#ffeb3b' // Center
      ctx.fillRect(x + 6.5, y + 6.5, 1, 1)
    } else if ((x * 11 + y * 17) % 41 === 0) {
      ctx.fillStyle = '#ba68c8' // Purple flower
      ctx.fillRect(x + 12, y + 4, 2, 2)
    }
  }
  
  if (tile.type === 'path') {
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.fillRect(x + 1, y + 1, size - 2, 1)
    ctx.fillStyle = detailColor
    ctx.fillRect(x + 3, y + 4, 3, 2)
    ctx.fillRect(x + 9, y + 10, 4, 2)
  }

  if (tile.type === 'water') {
    const waveOffset = Math.sin(time / 400 + (x + y) / 20) * 3
    ctx.fillStyle = '#4fc3f7' // Base water
    ctx.fillRect(x, y, size, size)

    // Wave highlights
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.fillRect(x + ((x + waveOffset) % size), y + 4, 4, 1)
    ctx.fillRect(x + ((y - waveOffset + size) % size), y + 10, 3, 1)

    // Deep water patches
    ctx.fillStyle = 'rgba(0,0,0,0.05)'
    ctx.fillRect(x + 2, y + 6, 6, 4)
  }
  
  if (tile.type === 'wall') {
    ctx.fillRect(x, y, size, 2)
    ctx.fillRect(x, y, 2, size)
    ctx.fillRect(x + 7, y, 1, size)
    ctx.fillRect(x, y + 7, size, 1)
  }

  if (tile.type === 'building') {
    if (tileType === 3) { // Roof
      ctx.fillStyle = tile.base
      ctx.fillRect(x, y + 4, size, size - 4)
      ctx.fillStyle = tile.detail || tile.base
      ctx.fillRect(x, y + 2, size, 2)
      ctx.fillStyle = 'rgba(255,255,255,0.1)'
      ctx.fillRect(x + 2, y + 6, size - 4, 2)
    } else if (tileType === 4) { // Wall
      ctx.fillStyle = tile.base
      ctx.fillRect(x, y, size, size)
      ctx.fillStyle = 'rgba(0,0,0,0.1)'
      ctx.fillRect(x, y + size - 2, size, 2)
      // Small window
      ctx.fillStyle = '#88bdf2'
      ctx.fillRect(x + 4, y + 4, 8, 6)
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'
      ctx.strokeRect(x + 4, y + 4, 8, 6)
    } else if (tileType === 5) { // Door
      ctx.fillStyle = '#f7f1d4' // Wall around door
      ctx.fillRect(x, y, size, size)
      ctx.fillStyle = tile.base
      ctx.fillRect(x + 2, y, size - 4, size)
      ctx.fillStyle = '#ffd700' // Handle
      ctx.fillRect(x + size - 6, y + size/2, 2, 2)
    }
  }
  
  if (tile.type === 'floor' || tile.type === 'carpet') {
    ctx.fillStyle = detailColor
    ctx.fillRect(x + 2, y + 2, 1, 1)
    ctx.fillRect(x + 6, y + 6, 1, 1)
    ctx.fillRect(x + 10, y + 10, 1, 1)
    ctx.fillRect(x + 14, y + 14, 1, 1)
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.fillRect(x, y, size, 1)
    ctx.fillStyle = 'rgba(120,120,140,0.18)'
    ctx.fillRect(x + 4, y, 1, size)
    ctx.fillRect(x + 12, y, 1, size)
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

  if (tile.type === 'counter') {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(x, y, size, 3)
    ctx.fillStyle = '#a39ab4'
    ctx.fillRect(x, y + 3, size, size - 3)
    ctx.fillStyle = '#6d6480'
    ctx.fillRect(x, y + size - 2, size, 2)
  }

  // New indoor furniture rendering
  if (tile.type === 'bed') {
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(x + 1, y + 4, size - 2, size - 5)
    ctx.fillStyle = '#e0e0e0'
    ctx.fillRect(x + 2, y + 5, size - 4, 2)
    ctx.fillStyle = '#8b5a2b'
    ctx.fillRect(x + 1, y + 2, 3, 3)
    ctx.fillRect(x + size - 4, y + 2, 3, 3)
    ctx.fillStyle = '#2196f3'
    ctx.fillRect(x + 3, y + 6, size - 6, 4)
    ctx.fillStyle = '#1565c0'
    ctx.fillRect(x + 1, y + 9, size - 2, 2)
  }

  if (tile.type === 'table') {
    ctx.fillStyle = '#5d4037'
    ctx.fillRect(x + 1, y + 3, size - 2, 3)
    ctx.fillStyle = '#4e342e'
    ctx.fillRect(x + 2, y + 6, 2, size - 6)
    ctx.fillRect(x + size - 4, y + 6, 2, size - 6)
    ctx.fillStyle = '#3e2723'
    ctx.fillRect(x + 1, y + size - 2, 2, 2)
    ctx.fillRect(x + size - 3, y + size - 2, 2, 2)
    ctx.fillStyle = '#8d6e63'
    ctx.fillRect(x + 3, y + 3, 4, 1)
    ctx.fillRect(x + size - 7, y + 3, 4, 1)
  }

  if (tile.type === 'chair') {
    ctx.fillStyle = '#8d6e63'
    ctx.fillRect(x + 2, y + 1, size - 4, 3)
    ctx.fillRect(x + 2, y + 4, 2, size - 5)
    ctx.fillRect(x + size - 4, y + 4, 2, size - 5)
    ctx.fillStyle = '#a1887f'
    ctx.fillRect(x + 3, y + 5, size - 6, 3)
  }

  if (tile.type === 'window') {
    ctx.fillStyle = '#87ceeb'
    ctx.fillRect(x + 1, y + 1, size - 2, size - 2)
    ctx.fillStyle = '#4fc3f7'
    ctx.fillRect(x + 1, y + 1, size - 2, 2)
    ctx.fillStyle = '#0288d1'
    ctx.fillRect(x + 1, y + 1, 2, size - 2)
    ctx.fillRect(x + size/2 - 1, y + 1, 2, size - 2)
    ctx.fillRect(x + 1, y + size/2 - 1, size - 2, 2)
    ctx.fillStyle = 'rgba(255,255,255,0.3)'
    ctx.fillRect(x + 3, y + 3, 3, 3)
    ctx.fillRect(x + size - 6, y + 3, 3, 3)
  }

  if (tile.type === 'door') {
    ctx.fillStyle = '#4e342e'
    ctx.fillRect(x + 1, y + 1, size - 2, size - 1)
    ctx.fillStyle = '#3e2723'
    ctx.fillRect(x + 1, y + 1, 2, size - 1)
    ctx.fillStyle = '#ffb300'
    ctx.beginPath()
    ctx.arc(x + size - 4, y + size/2, 1.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#5d4037'
    ctx.fillRect(x + 3, y + 3, size - 6, size - 5)
  }

  if (tile.type === 'rug') {
    ctx.fillStyle = '#c62828'
    ctx.fillRect(x + 1, y + 1, size - 2, size - 2)
    ctx.fillStyle = '#b71c1c'
    ctx.fillRect(x + 2, y + 2, size - 4, size - 4)
    ctx.fillStyle = '#ffeb3b'
    ctx.fillRect(x + 3, y + 3, size - 6, 1)
    ctx.fillRect(x + 3, y + size - 4, size - 6, 1)
    ctx.fillRect(x + 3, y + 3, 1, size - 6)
    ctx.fillRect(x + size - 4, y + 3, 1, size - 6)
    ctx.fillStyle = '#d32f2f'
    ctx.fillRect(x + 4, y + 4, size - 8, size - 8)
  }

  if (tile.type === 'plant') {
    ctx.fillStyle = '#5d4037'
    ctx.fillRect(x + 5, y + 10, 6, 6)
    ctx.fillStyle = '#4e342e'
    ctx.fillRect(x + 6, y + 11, 4, 1)
    ctx.fillRect(x + 6, y + 14, 4, 1)
    ctx.fillStyle = '#2e7d32'
    ctx.beginPath()
    ctx.arc(x + 8, y + 6, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#388e3c'
    ctx.beginPath()
    ctx.arc(x + 5, y + 8, 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x + 11, y + 8, 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#1b5e20'
    ctx.beginPath()
    ctx.arc(x + 8, y + 4, 2, 0, Math.PI * 2)
    ctx.fill()
  }

  if (tile.type === 'lamp') {
    ctx.fillStyle = '#ffeb3b'
    ctx.fillRect(x + 6, y + 2, 4, 3)
    ctx.fillStyle = '#ffc107'
    ctx.fillRect(x + 5, y + 5, 6, 1)
    ctx.fillStyle = '#5d4037'
    ctx.fillRect(x + 7, y + 6, 2, 8)
    ctx.fillStyle = '#3e2723'
    ctx.fillRect(x + 6, y + 13, 4, 2)
    const glow = ctx.createRadialGradient(x + 8, y + 4, 0, x + 8, y + 4, 8)
    glow.addColorStop(0, 'rgba(255,235,59,0.4)')
    glow.addColorStop(1, 'rgba(255,235,59,0)')
    ctx.fillStyle = glow
    ctx.fillRect(x, y, size, size)
  }

  if (tile.type === 'bookshelf') {
    ctx.fillStyle = '#5d4037'
    ctx.fillRect(x + 1, y + 1, size - 2, size - 2)
    ctx.fillStyle = '#3e2723'
    ctx.fillRect(x + 1, y + 4, size - 2, 1)
    ctx.fillRect(x + 1, y + 8, size - 2, 1)
    ctx.fillRect(x + 1, y + 12, size - 2, 1)
    ctx.fillStyle = '#c62828'
    ctx.fillRect(x + 2, y + 5, 2, 3)
    ctx.fillStyle = '#1976d2'
    ctx.fillRect(x + 5, y + 5, 2, 3)
    ctx.fillStyle = '#388e3c'
    ctx.fillRect(x + 8, y + 9, 2, 3)
    ctx.fillStyle = '#fbc02d'
    ctx.fillRect(x + 3, y + 9, 2, 3)
    ctx.fillStyle = '#7b1fa2'
    ctx.fillRect(x + 7, y + 13, 2, 3)
  }

  if (tile.type === 'fireplace') {
    ctx.fillStyle = '#5d4037'
    ctx.fillRect(x + 2, y + 3, size - 4, size - 3)
    ctx.fillStyle = '#3e2723'
    ctx.fillRect(x + 3, y + 4, size - 6, 1)
    ctx.fillRect(x + 3, y + size - 2, size - 6, 1)
    ctx.fillRect(x + 2, y + 3, 1, size - 3)
    ctx.fillRect(x + size - 3, y + 3, 1, size - 3)
    ctx.fillStyle = '#bf360c'
    ctx.fillRect(x + 3, y + 5, size - 6, 3)
    ctx.fillStyle = '#ff5722'
    ctx.fillRect(x + 4, y + 6, size - 8, 1)
    ctx.fillStyle = '#ffab00'
    ctx.fillRect(x + 5, y + 4, size - 10, 2)
  }

  if (tile.type === 'tree') {
    if (tileType === 9) { // Trunk
      ctx.fillStyle = '#7c5c3a'
      ctx.fillRect(x + 5, y, 6, size)
      ctx.fillStyle = 'rgba(0,0,0,0.1)'
      ctx.fillRect(x + 5, y, 2, size)
    } else { // Foliage
      // Dark base
      ctx.fillStyle = '#2e7d32'
      ctx.beginPath()
      ctx.arc(x + 8, y + 8, 8, 0, Math.PI * 2)
      ctx.fill()

      // Main green
      ctx.fillStyle = '#4caf50'
      ctx.beginPath()
      ctx.arc(x + 8, y + 6, 6, 0, Math.PI * 2)
      ctx.fill()

      // Highlights
      ctx.fillStyle = '#81c784'
      ctx.beginPath()
      ctx.arc(x + 5, y + 4, 3, 0, Math.PI * 2)
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
