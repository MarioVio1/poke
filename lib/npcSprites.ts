// NPC 2D Sprites - SVG Data URLs
export const NPC_SPRITES: Record<string, string> = {
  // Professor (with lab coat)
  professor: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="20" y="4" width="24" height="20" fill="#fff"/>
      <rect x="24" y="4" width="16" height="16" fill="#f5f5f5"/>
      <rect x="24" y="8" width="16" height="4" fill="#607d8b"/>
      <rect x="26" y="28" width="12" height="24" fill="#1565c0"/>
      <rect x="24" y="32" width="16" height="16" fill="#1976d2"/>
      <rect x="20" y="52" width="10" height="10" fill="#5d4037"/>
      <rect x="34" y="52" width="10" height="10" fill="#5d4037"/>
      <rect x="28" y="4" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="6" width="4" height="4" fill="#fff"/>
      <rect x="28" y="12" width="8" height="6" fill="#fff"/>
    </svg>
  `)}`,

  // Mom
  mom: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="24" y="8" width="16" height="12" fill="#8d6e63"/>
      <rect x="22" y="4" width="20" height="8" fill="#5d4037"/>
      <rect x="26" y="4" width="12" height="4" fill="#6d4c41"/>
      <rect x="28" y="20" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="22" width="4" height="4" fill="#fff"/>
      <rect x="32" y="22" width="4" height="4" fill="#fff"/>
      <rect x="26" y="28" width="12" height="20" fill="#e91e63"/>
      <rect x="24" y="32" width="16" height="12" fill="#f48fb1"/>
      <rect x="20" y="48" width="10" height="14" fill="#e91e63"/>
      <rect x="34" y="48" width="10" height="14" fill="#e91e63"/>
    </svg>
  `)}`,

  // Old Man
  old_man: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="28" y="4" width="8" height="12" fill="#bdbdbd"/>
      <rect x="24" y="8" width="16" height="8" fill="#9e9e9e"/>
      <rect x="28" y="16" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="18" width="4" height="4" fill="#fff"/>
      <rect x="32" y="18" width="4" height="4" fill="#fff"/>
      <rect x="28" y="24" width="8" height="24" fill="#5d4037"/>
      <rect x="24" y="28" width="16" height="16" fill="#6d4c41"/>
      <rect x="20" y="48" width="10" height="14" fill="#3e2723"/>
      <rect x="34" y="48" width="10" height="14" fill="#3e2723"/>
    </svg>
  `)}`,

  // Gondolier
  gondolier: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="24" y="4" width="16" height="16" fill="#1565c0"/>
      <rect x="28" y="8" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="10" width="4" height="4" fill="#fff"/>
      <rect x="32" y="10" width="4" height="4" fill="#fff"/>
      <rect x="28" y="20" width="8" height="28" fill="#1565c0"/>
      <rect x="24" y="24" width="16" height="20" fill="#1976d2"/>
      <rect x="20" y="48" width="10" height="14" fill="#0d47a1"/>
      <rect x="34" y="48" width="10" height="14" fill="#0d47a1"/>
      <rect x="48" y="20" width="12" height="4" fill="#8d6e63"/>
      <rect x="56" y="12" width="4" height="12" fill="#5d4037"/>
    </svg>
  `)}`,

  // Pizza Delivery Guy
  pizza_guy: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="24" y="4" width="16" height="16" fill="#f44336"/>
      <rect x="28" y="8" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="10" width="4" height="4" fill="#fff"/>
      <rect x="32" y="10" width="4" height="4" fill="#fff"/>
      <rect x="28" y="20" width="8" height="24" fill="#f44336"/>
      <rect x="24" y="24" width="16" height="16" fill="#e53935"/>
      <rect x="20" y="44" width="10" height="8" fill="#212121"/>
      <rect x="34" y="44" width="10" height="8" fill="#212121"/>
      <rect x="22" y="48" width="8" height="14" fill="#212121"/>
      <rect x="34" y="48" width="8" height="14" fill="#212121"/>
      <rect x="8" y="20" width="16" height="16" fill="#ffeb3b"/>
      <rect x="4" y="24" width="8" height="8" fill="#8d6e63"/>
    </svg>
  `)}`,

  // Kid
  kid: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="28" y="8" width="8" height="8" fill="#ffcc80"/>
      <rect x="26" y="4" width="12" height="6" fill="#5d4037"/>
      <rect x="24" y="6" width="16" height="4" fill="#6d4c41"/>
      <rect x="30" y="10" width="4" height="4" fill="#fff"/>
      <rect x="32" y="10" width="4" height="4" fill="#fff"/>
      <rect x="28" y="16" width="8" height="20" fill="#4caf50"/>
      <rect x="24" y="20" width="16" height="12" fill="#66bb6a"/>
      <rect x="24" y="36" width="6" height="16" fill="#1565c0"/>
      <rect x="34" y="36" width="6" height="16" fill="#1565c0"/>
      <rect x="26" y="48" width="4" height="14" fill="#212121"/>
      <rect x="34" y="48" width="4" height="14" fill="#212121"/>
    </svg>
  `)}`,

  // Gym Leader Fire (Bepi)
  gym_leader_fire: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="24" y="4" width="16" height="12" fill="#ff6b35"/>
      <rect x="28" y="8" width="8" height="6" fill="#ffcc80"/>
      <rect x="30" y="10" width="4" height="3" fill="#fff"/>
      <rect x="32" y="10" width="4" height="3" fill="#fff"/>
      <rect x="20" y="4" width="8" height="4" fill="#ff6b35"/>
      <rect x="36" y="4" width="8" height="4" fill="#ff6b35"/>
      <rect x="28" y="16" width="8" height="28" fill="#1565c0"/>
      <rect x="24" y="20" width="16" height="20" fill="#1976d2"/>
      <rect x="20" y="44" width="10" height="8" fill="#8d6e63"/>
      <rect x="34" y="44" width="10" height="8" fill="#8d6e63"/>
      <rect x="22" y="48" width="8" height="14" fill="#5d4037"/>
      <rect x="34" y="48" width="8" height="14" fill="#5d4037"/>
    </svg>
  `)}`,

  // Gym Leader Earth (Giuliano)
  gym_leader_earth: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="24" y="4" width="16" height="16" fill="#8d6e63"/>
      <rect x="28" y="8" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="10" width="4" height="4" fill="#fff"/>
      <rect x="32" y="10" width="4" height="4" fill="#fff"/>
      <rect x="20" y="4" width="8" height="4" fill="#8d6e63"/>
      <rect x="36" y="4" width="8" height="4" fill="#8d6e63"/>
      <rect x="28" y="20" width="8" height="28" fill="#ffc107"/>
      <rect x="24" y="24" width="16" height="20" fill="#ffca28"/>
      <rect x="20" y="48" width="10" height="14" fill="#8d6e63"/>
      <rect x="34" y="48" width="10" height="14" fill="#8d6e63"/>
    </svg>
  `)}`,

  // Grunt (Compagnia della Polenta)
  grunt: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="20" y="4" width="24" height="16" fill="#5d4037"/>
      <rect x="28" y="8" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="10" width="4" height="4" fill="#fff"/>
      <rect x="32" y="10" width="4" height="4" fill="#fff"/>
      <rect x="16" y="4" width="8" height="4" fill="#5d4037"/>
      <rect x="40" y="4" width="8" height="4" fill="#5d4037"/>
      <rect x="28" y="20" width="8" height="28" fill="#ffc107"/>
      <rect x="24" y="24" width="16" height="20" fill="#ffca28"/>
      <rect x="20" y="48" width="10" height="14" fill="#5d4037"/>
      <rect x="34" y="48" width="10" height="14" fill="#5d4037"/>
    </svg>
  `)}`,

  // Photographer
  photographer: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="24" y="4" width="16" height="12" fill="#607d8b"/>
      <rect x="28" y="8" width="8" height="6" fill="#ffcc80"/>
      <rect x="30" y="10" width="4" height="3" fill="#fff"/>
      <rect x="32" y="10" width="4" height="3" fill="#fff"/>
      <rect x="28" y="16" width="8" height="24" fill="#1976d2"/>
      <rect x="24" y="20" width="16" height="16" fill="#2196f3"/>
      <rect x="4" y="20" width="20" height="16" fill="#212121"/>
      <rect x="8" y="24" width="12" height="8" fill="#37474f"/>
      <rect x="20" y="40" width="10" height="8" fill="#212121"/>
      <rect x="34" y="40" width="10" height="8" fill="#212121"/>
      <rect x="22" y="44" width="8" height="18" fill="#212121"/>
      <rect x="34" y="44" width="8" height="18" fill="#212121"/>
    </svg>
  `)}`,

  // Lady
  lady: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="24" y="8" width="16" height="12" fill="#9e9e9e"/>
      <rect x="22" y="4" width="20" height="8" fill="#bdbdbd"/>
      <rect x="26" y="4" width="12" height="4" fill="#9e9e9e"/>
      <rect x="28" y="20" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="22" width="4" height="4" fill="#fff"/>
      <rect x="32" y="22" width="4" height="4" fill="#fff"/>
      <rect x="26" y="28" width="12" height="20" fill="#9c27b0"/>
      <rect x="24" y="32" width="16" height="12" fill="#ba68c8"/>
      <rect x="20" y="48" width="10" height="14" fill="#7b1fa2"/>
      <rect x="34" y="48" width="10" height="14" fill="#7b1fa2"/>
    </svg>
  `)}`,

  // Fisherman
  fisherman: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="28" y="4" width="8" height="12" fill="#fff9c4"/>
      <rect x="24" y="4" width="8" height="4" fill="#ffc107"/>
      <rect x="32" y="4" width="8" height="4" fill="#ffc107"/>
      <rect x="28" y="16" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="18" width="4" height="4" fill="#fff"/>
      <rect x="32" y="18" width="4" height="4" fill="#fff"/>
      <rect x="28" y="24" width="8" height="24" fill="#1565c0"/>
      <rect x="24" y="28" width="16" height="16" fill="#1976d2"/>
      <rect x="20" y="48" width="10" height="14" fill="#0d47a1"/>
      <rect x="34" y="48" width="10" height="14" fill="#0d47a1"/>
      <rect x="52" y="8" width="4" height="24" fill="#8d6e63"/>
      <rect x="44" y="32" width="8" height="4" fill="#607d8b"/>
    </svg>
  `)}`,

  // Scientist
  scientist: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="20" y="4" width="24" height="16" fill="#fff"/>
      <rect x="24" y="4" width="16" height="12" fill="#f5f5f5"/>
      <rect x="28" y="8" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="10" width="4" height="4" fill="#fff"/>
      <rect x="32" y="10" width="4" height="4" fill="#fff"/>
      <rect x="28" y="20" width="8" height="28" fill="#9e9e9e"/>
      <rect x="24" y="24" width="16" height="20" fill="#bdbdbd"/>
      <rect x="20" y="48" width="10" height="14" fill="#5d4037"/>
      <rect x="34" y="48" width="10" height="14" fill="#5d4037"/>
    </svg>
  `)}`,

  // Lass (waitress)
  lass: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="24" y="8" width="16" height="12" fill="#5d4037"/>
      <rect x="22" y="4" width="20" height="8" fill="#6d4c41"/>
      <rect x="24" y="4" width="16" height="4" fill="#5d4037"/>
      <rect x="28" y="20" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="22" width="4" height="4" fill="#fff"/>
      <rect x="32" y="22" width="4" height="4" fill="#fff"/>
      <rect x="26" y="28" width="12" height="20" fill="#fff"/>
      <rect x="24" y="32" width="16" height="12" fill="#f5f5f5"/>
      <rect x="20" y="48" width="10" height="14" fill="#212121"/>
      <rect x="34" y="48" width="10" height="14" fill="#212121"/>
    </svg>
  `)}`,

  // Youngster (student)
  youngster: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="28" y="4" width="8" height="10" fill="#5d4037"/>
      <rect x="26" y="8" width="12" height="6" fill="#6d4c41"/>
      <rect x="28" y="14" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="16" width="4" height="4" fill="#fff"/>
      <rect x="32" y="16" width="4" height="4" fill="#fff"/>
      <rect x="28" y="22" width="8" height="24" fill="#f44336"/>
      <rect x="24" y="26" width="16" height="16" fill="#e53935"/>
      <rect x="24" y="46" width="6" height="16" fill="#1565c0"/>
      <rect x="34" y="46" width="6" height="16" fill="#1565c0"/>
      <rect x="26" y="58" width="4" height="4" fill="#212121"/>
      <rect x="34" y="58" width="4" height="4" fill="#212121"/>
    </svg>
  `)}`,

  // Hiker
  hiker: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="24" y="4" width="16" height="14" fill="#5d4037"/>
      <rect x="28" y="8" width="8" height="8" fill="#ffcc80"/>
      <rect x="30" y="10" width="4" height="4" fill="#fff"/>
      <rect x="32" y="10" width="4" height="4" fill="#fff"/>
      <rect x="28" y="18" width="8" height="30" fill="#8d6e63"/>
      <rect x="24" y="22" width="16" height="22" fill="#a1887f"/>
      <rect x="18" y="48" width="12" height="14" fill="#5d4037"/>
      <rect x="34" y="48" width="12" height="14" fill="#5d4037"/>
    </svg>
  `)}`,

  // Capo (Final Boss)
  capo: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="20" y="4" width="24" height="16" fill="#ffc107"/>
      <rect x="24" y="8" width="16" height="8" fill="#8d6e63"/>
      <rect x="28" y="8" width="8" height="6" fill="#ffcc80"/>
      <rect x="30" y="10" width="4" height="3" fill="#fff"/>
      <rect x="32" y="10" width="4" height="3" fill="#fff"/>
      <rect x="16" y="4" width="8" height="4" fill="#ffc107"/>
      <rect x="40" y="4" width="8" height="4" fill="#ffc107"/>
      <rect x="28" y="20" width="8" height="28" fill="#ffc107"/>
      <rect x="24" y="24" width="16" height="20" fill="#ffca28"/>
      <rect x="20" y="48" width="10" height="14" fill="#5d4037"/>
      <rect x="34" y="48" width="10" height="14" fill="#5d4037"/>
    </svg>
  `)}`,

  // Champion
  champion: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect x="20" y="4" width="24" height="12" fill="#ffc107"/>
      <rect x="24" y="4" width="16" height="8" fill="#ffd54f"/>
      <rect x="28" y="8" width="8" height="6" fill="#ffcc80"/>
      <rect x="30" y="10" width="4" height="3" fill="#fff"/>
      <rect x="32" y="10" width="4" height="3" fill="#fff"/>
      <rect x="16" y="4" width="8" height="4" fill="#ffc107"/>
      <rect x="40" y="4" width="8" height="4" fill="#ffc107"/>
      <rect x="28" y="16" width="8" height="32" fill="#1565c0"/>
      <rect x="24" y="20" width="16" height="24" fill="#1976d2"/>
      <rect x="20" y="48" width="10" height="14" fill="#0d47a1"/>
      <rect x="34" y="48" width="10" height="14" fill="#0d47a1"/>
      <rect x="4" y="4" width="12" height="4" fill="#ffc107"/>
      <rect x="48" y="4" width="12" height="4" fill="#ffc107"/>
    </svg>
  `)}`,
}

export const getNPCSprite = (npcId: string): string => {
  return NPC_SPRITES[npcId] || NPC_SPRITES.scientist
}
