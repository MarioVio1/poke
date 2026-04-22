// ═══════════════════════════════════════════════════════════════════
// ACHIEVEMENT SYSTEM - Trofei e obiettivi
// ═══════════════════════════════════════════════════════════════════

export interface Achievement {
  id: string
  name: string
  desc: string
  icon: string
  reward?: { money?: number; item?: string }
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  // BATTAGLIA
  first_battle: { id: 'first_battle', name: 'Prima Vittoria', desc: 'Hai vinto la tua prima battaglia!', icon: '⚔️' },
  ten_battles: { id: 'ten_battles', name: 'Combattente', desc: 'Hai vinto 10 battaglie!', icon: '🏆' },
  fifty_battles: { id: 'fifty_battles', name: 'Veterano', desc: 'Hai vinto 50 battaglie!', icon: '🎖️' },
  hundred_battles: { id: 'hundred_battles', name: 'Maestro di Battaglia', desc: 'Hai vinto 100 battaglie!', icon: '👑' },
  
  // CATTURA
  first_capture: { id: 'first_capture', name: 'Cacciatore', desc: 'Hai catturato il tuo primo Bestia!', icon: '🎯' },
  ten_captures: { id: 'ten_captures', name: 'Collezionista', desc: 'Hai catturato 10 Bestie!', icon: '📦' },
  twenty_five_captures: { id: 'twenty_five_captures', name: 'Catturatore Pro', desc: 'Hai catturato 25 Bestie!', icon: '🎯' },
  fifty_captures: { id: 'fifty_captures', name: 'Maestro Catturatore', desc: 'Hai catturato 50 Bestie!', icon: '🏅' },
  
  // EVOLUZIONE
  first_evolution: { id: 'first_evolution', name: 'Crescita', desc: 'Il tuo Bestia si è evoluto per la prima volta!', icon: '✨' },
  ten_evolutions: { id: 'ten_evolutions', name: 'Allevatore', desc: 'Hai fatto evolvere 10 Bestie!', icon: '🌟' },
  
  // GAMESTI
  first_badge: { id: 'first_badge', name: 'Sfidante', desc: 'Hai ottenuto il tuo primo Badge!', icon: '🏅' },
  five_badges: { id: 'five_badges', name: 'Gym Leader', desc: 'Hai ottenuto 5 Badge!', icon: '🎖️' },
  all_badges: { id: 'all_badges', name: 'Campione', desc: 'Hai ottenuto tutti gli 8 Badge!', icon: '👑' },
  
  // SPEED
  quick_victory: { id: 'quick_victory', name: 'Veloce', desc: 'Hai vinto una battaglia in un turno!', icon: '⚡' },
  no_damage: { id: 'no_damage', name: 'Perfetto', desc: 'Hai vinto senza prendere danni!', icon: '💎' },
  
  // EXPLORAZIONE
  all_cities: { id: 'all_cities', name: 'Viaggiatore', desc: 'Hai visitato tutte le 7 città!', icon: '🗺️' },
  secret_found: { id: 'secret_found', name: 'Esploratore', desc: 'Hai trovato un luogo segreto!', icon: '🔍' },
  
  // SPECIALI
  legendary_caught: { id: 'legendary_caught', name: 'Cacciatore di Leggende', desc: 'Hai catturato una Bestia Leggendaria!', icon: '🌟', reward: { money: 5000 } },
  starter_legendary: { id: 'starter_legendary', name: 'Scelta del Destino', desc: 'Hai scelto un Leggendario come starter!', icon: '✨' },
  
  // TRADING / STORY
  rival_defeated: { id: 'rival_defeated', name: 'Superiore', desc: 'Hai sconfitto il tuo rivale!', icon: '😤' },
  elite_four_complete: { id: 'elite_four_complete', name: 'Elite', desc: 'Hai completato la Elite Four!', icon: '🏆', reward: { money: 10000 } },
  champion: { id: 'champion', name: 'CAMPIONE DI VENETIA', desc: 'Hai sconfitto il Dux!', icon: '👑', reward: { money: 50000 } },
}

// ═══════════════════════════════════════════════════════════════════
// STONE EVOLUTIONS - Mappatura pietre -> evoluzioni
// ═══════════════════════════════════════════════════════════════════

export const STONE_EVOLUTIONS: Record<string, { from: string; to: string }[]> = {
  pietra_focaia: [
    { from: 'fogaron', to: 'fogarox' },
  ],
  pietra_acquatica: [
    { from: 'canalot', to: 'canalisk' },
  ],
  pietra_tuono: [
    { from: 'vespolo', to: 'vespatron' },
  ],
  pietra_verde: [
    { from: 'vignel', to: 'vignarbor' },
  ],
  pietra_ghiaccio: [
    { from: 'nevelet', to: 'dolomor' },
  ],
  pietra_luna: [
    { from: 'mascarin', to: 'mascarion' },
  ],
  pietra_sole: [
    { from: 'fogaron', to: 'fogarox' },
  ],
  pietra_tramonto: [
    { from: 'lagunello', to: 'lagunaga' },
  ],
  pietra_polenta: [
    { from: 'polentaur', to: 'polentitan' },
  ],
  pietra_maschera: [
    { from: 'scemo', to: 'zanni' },
  ],
  pietra_ombra: [
    { from: 'smogatto', to: 'fumigor' },
  ],
  pietra_drago: [
    { from: 'canalisk', to: 'canalord' },
  ],
  pietra_vino: [
    { from: 'formaggion', to: 'parmageddon' },
  ],
}

export function canEvolveWithStone(bestiaId: string | number, stoneId: string): boolean {
  const evolutions = STONE_EVOLUTIONS[stoneId]
  if (!evolutions) return false
  return evolutions.some(e => e.from === String(bestiaId))
}

export function getStoneEvolution(bestiaId: string | number, stoneId: string): string | null {
  const evolutions = STONE_EVOLUTIONS[stoneId]
  if (!evolutions) return null
  const evo = evolutions.find(e => e.from === String(bestiaId))
  return evo?.to || null
}

// ═══════════════════════════════════════════════════════════════════
// DAY/NIGHT CYCLE
// ═══════════════════════════════════════════════════════════════════

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 22) return 'evening'
  return 'night'
}

export function getTimeGreeting(time: TimeOfDay): string {
  switch (time) {
    case 'morning': return 'Buongiorno!'
    case 'afternoon': return 'Buon pomeriggio!'
    case 'evening': return 'Buonasera!'
    case 'night': return 'Buonanotte!'
  }
}

export const TIME_EFFECTS: Record<TimeOfDay, { bg: string; filter: string; message: string }> = {
  morning: { bg: '#87CEEB', filter: 'brightness(1.1)', message: '☀️ Mattina' },
  afternoon: { bg: '#4a90d9', filter: 'brightness(1.0)', message: '🌤️ Pomeriggio' },
  evening: { bg: '#ff6b35', filter: 'brightness(0.85) sepia(0.3)', message: '🌅 Tramonto' },
  night: { bg: '#1a1a3e', filter: 'brightness(0.6) sepia(0.2)', message: '🌙 Notte' },
}

// Wild Bestie rate modifier based on time
export function getWildEncounterModifier(time: TimeOfDay): { rate: number; specialBestie: string[] } {
  switch (time) {
    case 'morning':
      return { rate: 1.0, specialBestie: ['gabbianzo', 'colombo'] }
    case 'afternoon':
      return { rate: 1.2, specialBestie: ['fogaron', 'polentaur'] }
    case 'evening':
      return { rate: 1.5, specialBestie: ['spritzino', 'mascarin'] }
    case 'night':
      return { rate: 2.0, specialBestie: ['smogatto', 'stregatto', 'fantasma'] }
  }
}

// Capture rate modifier based on time
export function getCaptureModifier(time: TimeOfDay): number {
  switch (time) {
    case 'morning': return 1.0
    case 'afternoon': return 1.0
    case 'evening': return 1.2 // Spritzball bonus
    case 'night': return 1.3 // Mascheraball bonus
  }
}
