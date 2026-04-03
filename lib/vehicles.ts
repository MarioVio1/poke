// Transportation System - Venetian themed vehicles
export type VehicleType = 'none' | 'biciRubata' | 'barchino' | 'gondola_oro' | 'scooterino'
export type VehicleCategory = 'none' | 'bici' | 'barchino' | 'gondola' | 'scooter'

export interface Vehicle {
  id: string
  name: string
  desc: string
  type: VehicleCategory
  speed: number
  canSurf: boolean
  canWater: boolean
  sprite: string
}

export const VEHICLES: Record<string, Vehicle> = {
  none: {
    id: 'none',
    name: 'Niente',
    desc: 'A piedi.',
    type: 'none',
    speed: 1,
    canSurf: false,
    canWater: false,
    sprite: '',
  },
  biciRubata: {
    id: 'biciRubata',
    name: 'Bici Rubata',
    desc: 'Bici rubata dal cugino. Il cugino non lo sa ancora! +50% velocità.',
    type: 'bici',
    speed: 2,
    canSurf: false,
    canWater: false,
    sprite: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect x="28" y="4" width="8" height="32" fill="#f44336"/>
        <rect x="26" y="8" width="12" height="8" fill="#d32f2f"/>
        <rect x="30" y="36" width="4" height="8" fill="#212121"/>
        <rect x="12" y="44" width="16" height="4" fill="#9e9e9e"/>
        <rect x="36" y="44" width="16" height="4" fill="#9e9e9e"/>
        <rect x="8" y="48" width="12" height="12" fill="#9e9e9e"/>
        <rect x="44" y="48" width="12" height="12" fill="#9e9e9e"/>
        <rect x="10" y="50" width="8" height="8" fill="#757575"/>
        <rect x="46" y="50" width="8" height="8" fill="#757575"/>
        <rect x="28" y="40" width="8" height="8" fill="#bdbdbd"/>
      </svg>
    `)}`,
  },
  barchino: {
    id: 'barchino',
    name: 'Barchino',
    desc: 'Barchino per attraversare i canali. Un po\' scassato ma galleggia!',
    type: 'barchino',
    speed: 1.5,
    canSurf: false,
    canWater: true,
    sprite: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect x="8" y="24" width="48" height="24" fill="#8d6e63"/>
        <rect x="12" y="28" width="40" height="16" fill="#a1887f"/>
        <rect x="4" y="20" width="8" height="8" fill="#5d4037"/>
        <rect x="52" y="20" width="8" height="8" fill="#5d4037"/>
        <rect x="28" y="12" width="8" height="12" fill="#607d8b"/>
        <rect x="30" y="8" width="4" height="8" fill="#78909c"/>
        <rect x="8" y="48" width="48" height="4" fill="#4fc3f7"/>
        <rect x="16" y="52" width="32" height="4" fill="#29b6f6"/>
      </svg>
    `)}`,
  },
  gondola_oro: {
    id: 'gondola_oro',
    name: 'Gondola d\'Oro',
    desc: 'Gondola del Doge! Può surfare sui canali. L\'unica e inestimabile!',
    type: 'gondola',
    speed: 2,
    canSurf: true,
    canWater: true,
    sprite: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect x="4" y="28" width="56" height="20" fill="#ffc107"/>
        <rect x="8" y="32" width="48" height="12" fill="#ffd54f"/>
        <rect x="12" y="36" width="40" height="4" fill="#ffca28"/>
        <rect x="56" y="24" width="8" height="12" fill="#8d6e63"/>
        <rect x="54" y="20" width="12" height="8" fill="#ffc107"/>
        <rect x="24" y="20" width="16" height="12" fill="#ffc107"/>
        <rect x="28" y="24" width="8" height="4" fill="#ffd54f"/>
        <rect x="4" y="48" width="56" height="4" fill="#4fc3f7"/>
        <rect x="12" y="52" width="40" height="4" fill="#29b6f6"/>
      </svg>
    `)}`,
  },
  scooterino: {
    id: 'scooterino',
    name: 'Scooterino',
    desc: 'Motorino per viaggiare veloce! Non chiedere da dove viene...',
    type: 'scooter',
    speed: 3,
    canSurf: false,
    canWater: false,
    sprite: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect x="16" y="8" width="32" height="20" fill="#1565c0"/>
        <rect x="20" y="12" width="24" height="12" fill="#1976d2"/>
        <rect x="24" y="16" width="16" height="4" fill="#90caf9"/>
        <rect x="12" y="28" width="8" height="20" fill="#212121"/>
        <rect x="44" y="28" width="8" height="20" fill="#212121"/>
        <rect x="8" y="48" width="16" height="12" fill="#212121"/>
        <rect x="40" y="48" width="16" height="12" fill="#212121"/>
        <rect x="10" y="50" width="12" height="8" fill="#424242"/>
        <rect x="42" y="50" width="12" height="8" fill="#424242"/>
        <rect x="48" y="12" width="8" height="20" fill="#757575"/>
        <rect x="50" y="8" width="4" height="8" fill="#9e9e9e"/>
      </svg>
    `)}`,
  },
}

// Water tiles that require vehicles
export const WATER_TILES = [2, 20] // regular water and canals
export const DEEP_WATER_TILES = [21, 22] // lagoon/deep water reserved for the gondola

// Check if player can move on tile
export const canMoveOnTile = (
  tile: number,
  currentVehicle: VehicleType
): boolean => {
  // Wall/obstacle tiles
  if (tile === 1 || tile === 3) return false
  
  // Water tiles
  if (DEEP_WATER_TILES.includes(tile)) {
    return currentVehicle === 'gondola_oro'
  }

  if (WATER_TILES.includes(tile)) {
    if (currentVehicle === 'barchino' || currentVehicle === 'gondola_oro') {
      return true
    }
    return false
  }
  
  return true
}

// Speed modifiers based on vehicle
export const getMovementSpeed = (vehicle: VehicleType): number => {
  return VEHICLES[vehicle]?.speed || 1
}

// Random encounter rate modifiers
export const getEncounterRate = (vehicle: VehicleType, baseRate: number): number => {
  switch (vehicle) {
    case 'biciRubata':
      return baseRate * 0.8 // Less encounters on bike
    case 'scooterino':
      return baseRate * 0.5 // Much less on scooter
    case 'barchino':
    case 'gondola_oro':
      return 0 // No wild encounters in water
    default:
      return baseRate
  }
}
