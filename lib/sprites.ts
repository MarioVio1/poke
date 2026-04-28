// Bestie Sprites - Uses PNG images from public/sprites/
// If no PNG found, falls back to generated SVG

export interface SpriteData {
  front: string
  back: string
  icon: string
  shiny?: string
}

export const BESTIE_SVG_SPRITES: Record<string, SpriteData> = {}

// Helper per creare SVG (fallback)
const createSvg = (content: string, width = 96, height = 96): string => 
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${content}</svg>`)}`

// Helper per ottenere il percorso dell'immagine PNG
const getPngPath = (name: string): string => `/sprites/${name}.PNG`

// Mappa che tiene traccia degli sprite PNG disponibili
const pngSpritesLoaded: Set<string> = new Set()

// Inizializza gli sprite PNG (carica le immagini disponibili)
const initPngSprites = () => {
  const spriteNames = [
    'fogaron', 'fogarox', 'fogarion', 'fogarion_shiny',
    'radicor', 'radicorso', 'radicthron',
    'canalot', 'canalisk', 'canalord',
    'gabbianzo',
  ]
  
  spriteNames.forEach(name => {
    pngSpritesLoaded.add(name)
  })
}

initPngSprites()

// RADICCOR - Nature Starter
BESTIE_SVG_SPRITES.radicor = {
  front: getPngPath('Radicor'),
  back: getPngPath('Radicor'),
  icon: getPngPath('Radicor'),
}

BESTIE_SVG_SPRITES.radicorso = {
  front: getPngPath('Radicorso'),
  back: getPngPath('Radicorso'),
  icon: getPngPath('Radicorso'),
}

BESTIE_SVG_SPRITES.radicthron = {
  front: getPngPath('Radicthron'),
  back: getPngPath('Radicthron'),
  icon: getPngPath('Radicthron'),
}

// CANALOT - Water Starter
BESTIE_SVG_SPRITES.canalot = {
  front: getPngPath('Canalot'),
  back: getPngPath('Canalot'),
  icon: getPngPath('Canalot'),
}

BESTIE_SVG_SPRITES.canalisk = {
  front: getPngPath('Canalisk'),
  back: getPngPath('Canalisk'),
  icon: getPngPath('Canalisk'),
}

BESTIE_SVG_SPRITES.canalord = {
  front: getPngPath('Canalord'),
  back: getPngPath('Canalord'),
  icon: getPngPath('Canalord'),
}

// GABBIANZO - Air
BESTIE_SVG_SPRITES.gabbianzo = {
  front: getPngPath('Gabbianzo'),
  back: getPngPath('Gabbianzo'),
  icon: getPngPath('Gabbianzo'),
}
BESTIE_SVG_SPRITES.fogaron = {
  front: getPngPath('Fogaron'),
  back: getPngPath('Fogaron'),
  icon: getPngPath('Fogaron'),
}

BESTIE_SVG_SPRITES.fogarox = {
  front: getPngPath('Fogarox'),
  back: getPngPath('Fogarox'),
  icon: getPngPath('Fogarox'),
}

BESTIE_SVG_SPRITES.fogarion = {
  front: getPngPath('Fogarion'),
  back: getPngPath('Fogarion'),
  icon: getPngPath('Fogarion'),
  shiny: getPngPath('Fogarion2'),
}

// ═══════════════════════════════════════════════════════════════
// DOLOMITOR - Ice/Earth Legendary (Dolomites Spirit)
// ═══════════════════════════════════════════════════════════════
BESTIE_SVG_SPRITES.dolomitor = {
  front: createSvg(`
    <defs>
      <linearGradient id="dolo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#00BCD4"/>
        <stop offset="100%" style="stop-color:#006064"/>
      </linearGradient>
      <linearGradient id="dolo-shine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#E0F7FA"/>
        <stop offset="100%" style="stop-color:#80DEEA"/>
      </linearGradient>
    </defs>
    <!-- Body -->
    <ellipse cx="48" cy="55" rx="32" ry="28" fill="url(#dolo-grad)"/>
    <!-- Ice crystals on body -->
    <polygon points="25,40 30,25 35,40" fill="#B2EBF2"/>
    <polygon points="55,35 65,20 70,38" fill="#B2EBF2"/>
    <polygon points="40,60 48,70 56,60" fill="#B2EBF2"/>
    <!-- Face -->
    <ellipse cx="38" cy="48" rx="6" ry="7" fill="#1a1a2e"/>
    <ellipse cx="58" cy="48" rx="6" ry="7" fill="#1a1a2e"/>
    <ellipse cx="40" cy="46" rx="2" ry="2" fill="#fff"/>
    <ellipse cx="60" cy="46" rx="2" ry="2" fill="#fff"/>
    <!-- Mouth -->
    <path d="M 42 62 Q 48 68 54 62" stroke="#1a1a2e" stroke-width="2" fill="none"/>
    <!-- Mountain peaks on head -->
    <polygon points="48,10 35,35 61,35" fill="url(#dolo-shine)"/>
    <polygon points="35,20 25,40 45,40" fill="#B2EBF2" opacity="0.7"/>
    <polygon points="61,20 51,40 71,40" fill="#B2EBF2" opacity="0.7"/>
    <!-- Snow cap -->
    <polygon points="48,10 42,18 54,18" fill="#fff"/>
    <!-- Arms -->
    <ellipse cx="18" cy="55" rx="10" ry="12" fill="url(#dolo-grad)"/>
    <ellipse cx="78" cy="55" rx="10" ry="12" fill="url(#dolo-grad)"/>
    <!-- Claws -->
    <circle cx="14" cy="50" r="3" fill="#80DEEA"/>
    <circle cx="18" cy="48" r="3" fill="#80DEEA"/>
    <circle cx="22" cy="50" r="3" fill="#80DEEA"/>
    <circle cx="74" cy="50" r="3" fill="#80DEEA"/>
    <circle cx="78" cy="48" r="3" fill="#80DEEA"/>
    <circle cx="82" cy="50" r="3" fill="#80DEEA"/>
    <!-- Feet -->
    <ellipse cx="35" cy="82" rx="12" ry="8" fill="url(#dolo-grad)"/>
    <ellipse cx="61" cy="82" rx="12" ry="8" fill="url(#dolo-grad)"/>
    <!-- Tail -->
    <path d="M 75 70 Q 90 75 85 90 Q 80 85 70 80" fill="url(#dolo-grad)"/>
  `),
  back: createSvg(`
    <defs>
      <linearGradient id="dolo-back" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4DD0E1"/>
        <stop offset="100%" style="stop-color:#0097A7"/>
      </linearGradient>
    </defs>
    <!-- Back body -->
    <ellipse cx="48" cy="50" rx="38" ry="35" fill="url(#dolo-back)"/>
    <!-- Mountain pattern -->
    <polygon points="48,20 20,70 76,70" fill="#006064" opacity="0.3"/>
    <polygon points="48,30 30,65 66,65" fill="#00838F" opacity="0.4"/>
    <!-- Ice crystals -->
    <polygon points="30,35 40,20 45,38" fill="#B2EBF2"/>
    <polygon points="55,30 65,18 70,35" fill="#B2EBF2"/>
    <polygon points="40,55 48,65 56,55" fill="#B2EBF2"/>
    <!-- Tail visible -->
    <ellipse cx="20" cy="60" rx="15" ry="10" fill="url(#dolo-back)"/>
    <!-- Arms -->
    <ellipse cx="15" cy="45" rx="12" ry="10" fill="url(#dolo-back)"/>
    <ellipse cx="81" cy="45" rx="12" ry="10" fill="url(#dolo-back)"/>
  `),
  icon: createSvg(`
    <defs>
      <linearGradient id="dolo-icon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#00BCD4"/>
        <stop offset="100%" style="stop-color:#006064"/>
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#dolo-icon)"/>
    <polygon points="24,6 15,24 33,24" fill="#B2EBF2"/>
    <polygon points="24,6 20,12 28,12" fill="#fff"/>
    <ellipse cx="20" cy="22" rx="3" ry="4" fill="#1a1a2e"/>
    <ellipse cx="28" cy="22" rx="3" ry="4" fill="#1a1a2e"/>
    <path d="M 20 28 Q 24 32 28 28" stroke="#1a1a2e" stroke-width="1.5" fill="none"/>
  `, 48, 48)
}

// ═══════════════════════════════════════════════════════════════
// LAGORION - Water/Dragon Legendary (Lake Lord)
// ═══════════════════════════════════════════════════════════════
BESTIE_SVG_SPRITES.lagorion = {
  front: createSvg(`
    <defs>
      <linearGradient id="lago-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2196F3"/>
        <stop offset="100%" style="stop-color:#0D47A1"/>
      </linearGradient>
      <linearGradient id="lago-belly" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#64B5F6"/>
        <stop offset="100%" style="stop-color:#1976D2"/>
      </linearGradient>
    </defs>
    <!-- Body -->
    <ellipse cx="48" cy="50" rx="30" ry="32" fill="url(#lago-grad)"/>
    <!-- Belly -->
    <ellipse cx="48" cy="58" rx="20" ry="18" fill="url(#lago-belly)"/>
    <!-- Head crest/fins -->
    <path d="M 30 25 Q 35 10 40 25 Q 48 5 56 25 Q 61 10 66 25" fill="url(#lago-belly)"/>
    <!-- Dorsal fin -->
    <path d="M 35 20 L 48 5 L 61 20" fill="#1565C0"/>
    <!-- Eyes -->
    <ellipse cx="36" cy="42" rx="7" ry="8" fill="#fff"/>
    <ellipse cx="60" cy="42" rx="7" ry="8" fill="#fff"/>
    <ellipse cx="37" cy="43" rx="4" ry="5" fill="#1a1a2e"/>
    <ellipse cx="61" cy="43" rx="4" ry="5" fill="#1a1a2e"/>
    <circle cx="38" cy="41" r="2" fill="#fff"/>
    <circle cx="62" cy="41" r="2" fill="#fff"/>
    <!-- Mouth -->
    <ellipse cx="48" cy="58" rx="8" ry="4" fill="#0D47A1"/>
    <ellipse cx="48" cy="57" rx="6" ry="2" fill="#1a1a2e"/>
    <!-- Whiskers -->
    <path d="M 28 55 Q 15 50 10 55" stroke="#1565C0" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 28 60 Q 15 60 8 58" stroke="#1565C0" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 68 55 Q 81 50 86 55" stroke="#1565C0" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 68 60 Q 81 60 88 58" stroke="#1565C0" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Tail fin -->
    <path d="M 70 65 Q 95 50 90 75 Q 85 90 70 80" fill="url(#lago-grad)"/>
    <path d="M 75 70 Q 88 65 85 78" stroke="#1565C0" stroke-width="2" fill="none"/>
    <!-- Scales detail -->
    <circle cx="40" cy="35" r="3" fill="#1565C0" opacity="0.5"/>
    <circle cx="56" cy="35" r="3" fill="#1565C0" opacity="0.5"/>
    <circle cx="48" cy="28" r="3" fill="#1565C0" opacity="0.5"/>
  `),
  back: createSvg(`
    <defs>
      <linearGradient id="lago-back" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#42A5F5"/>
        <stop offset="100%" style="stop-color:#1565C0"/>
      </linearGradient>
    </defs>
    <!-- Back body -->
    <ellipse cx="48" cy="48" rx="40" ry="38" fill="url(#lago-back)"/>
    <!-- Belly visible -->
    <ellipse cx="48" cy="60" rx="28" ry="22" fill="#64B5F6"/>
    <!-- Back fin -->
    <path d="M 30 15 Q 48 -5 66 15" fill="#1565C0"/>
    <!-- Tail fin from back -->
    <path d="M 25 60 Q 5 50 10 70 Q 5 90 25 80" fill="url(#lago-back)"/>
    <!-- Scale pattern -->
    <circle cx="35" cy="40" r="4" fill="#1565C0" opacity="0.4"/>
    <circle cx="48" cy="35" r="4" fill="#1565C0" opacity="0.4"/>
    <circle cx="61" cy="40" r="4" fill="#1565C0" opacity="0.4"/>
    <circle cx="42" cy="50" r="3" fill="#1565C0" opacity="0.3"/>
    <circle cx="54" cy="50" r="3" fill="#1565C0" opacity="0.3"/>
  `),
  icon: createSvg(`
    <defs>
      <linearGradient id="lago-icon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2196F3"/>
        <stop offset="100%" style="stop-color:#0D47A1"/>
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#lago-icon)"/>
    <path d="M 18 12 Q 24 5 30 12" fill="#64B5F6"/>
    <ellipse cx="20" cy="22" rx="3" ry="4" fill="#1a1a2e"/>
    <ellipse cx="28" cy="22" rx="3" ry="4" fill="#1a1a2e"/>
    <path d="M 20 28 Q 24 31 28 28" stroke="#1a1a2e" stroke-width="1.5" fill="none"/>
  `, 48, 48)
}

// ═══════════════════════════════════════════════════════════════
// SERENISSIMA - Psycho/Air Legendary (Spirit of Venice)
// ═══════════════════════════════════════════════════════════════
BESTIE_SVG_SPRITES.serenissima = {
  front: createSvg(`
    <defs>
      <linearGradient id="sere-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#9C27B0"/>
        <stop offset="100%" style="stop-color:#4A148C"/>
      </linearGradient>
      <linearGradient id="sere-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#E1BEE7"/>
        <stop offset="100%" style="stop-color:#CE93D8"/>
      </linearGradient>
    </defs>
    <!-- Glow effect -->
    <ellipse cx="48" cy="48" rx="42" ry="42" fill="#E1BEE7" opacity="0.2"/>
    <!-- Body -->
    <ellipse cx="48" cy="50" rx="28" ry="30" fill="url(#sere-grad)"/>
    <!-- Wing-like ears -->
    <ellipse cx="18" cy="35" rx="12" ry="20" fill="url(#sere-glow)" transform="rotate(-20 18 35)"/>
    <ellipse cx="78" cy="35" rx="12" ry="20" fill="url(#sere-glow)" transform="rotate(20 78 35)"/>
    <!-- Decorative mask-like pattern -->
    <ellipse cx="35" cy="45" rx="10" ry="8" fill="url(#sere-glow)" opacity="0.5"/>
    <ellipse cx="61" cy="45" rx="10" ry="8" fill="url(#sere-glow)" opacity="0.5"/>
    <!-- Eyes - mystical -->
    <ellipse cx="35" cy="45" rx="8" ry="9" fill="#fff"/>
    <ellipse cx="61" cy="45" rx="8" ry="9" fill="#fff"/>
    <ellipse cx="36" cy="46" rx="5" ry="6" fill="#7B1FA2"/>
    <ellipse cx="62" cy="46" rx="5" ry="6" fill="#7B1FA2"/>
    <circle cx="37" cy="44" r="2" fill="#fff"/>
    <circle cx="63" cy="44" r="2" fill="#fff"/>
    <!-- Third eye -->
    <ellipse cx="48" cy="30" rx="5" ry="4" fill="#E1BEE7"/>
    <ellipse cx="48" cy="30" rx="3" ry="2" fill="#9C27B0"/>
    <!-- Mouth -->
    <path d="M 42 60 Q 48 66 54 60" stroke="#4A148C" stroke-width="2" fill="none"/>
    <!-- Floating orbs -->
    <circle cx="20" cy="70" r="6" fill="#CE93D8" opacity="0.7"/>
    <circle cx="76" cy="70" r="6" fill="#CE93D8" opacity="0.7"/>
    <circle cx="25" cy="20" r="4" fill="#E1BEE7" opacity="0.6"/>
    <circle cx="71" cy="20" r="4" fill="#E1BEE7" opacity="0.6"/>
    <!-- Crown-like antenna -->
    <line x1="48" y1="15" x2="48" y2="5" stroke="#E1BEE7" stroke-width="2"/>
    <circle cx="48" cy="5" r="4" fill="#CE93D8"/>
  `),
  back: createSvg(`
    <defs>
      <linearGradient id="sere-back" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#AB47BC"/>
        <stop offset="100%" style="stop-color:#7B1FA2"/>
      </linearGradient>
    </defs>
    <!-- Back body -->
    <ellipse cx="48" cy="48" rx="38" ry="40" fill="url(#sere-back)"/>
    <!-- Back wings -->
    <ellipse cx="15" cy="50" rx="18" ry="30" fill="#CE93D8" opacity="0.6"/>
    <ellipse cx="81" cy="50" rx="18" ry="30" fill="#CE93D8" opacity="0.6"/>
    <!-- Pattern -->
    <ellipse cx="48" cy="40" rx="20" ry="15" fill="#E1BEE7" opacity="0.3"/>
    <!-- Floating orbs -->
    <circle cx="15" cy="75" r="8" fill="#CE93D8" opacity="0.5"/>
    <circle cx="81" cy="75" r="8" fill="#CE93D8" opacity="0.5"/>
  `),
  icon: createSvg(`
    <defs>
      <linearGradient id="sere-icon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#9C27B0"/>
        <stop offset="100%" style="stop-color:#4A148C"/>
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#sere-icon)"/>
    <ellipse cx="18" cy="22" rx="5" ry="6" fill="#E1BEE7"/>
    <ellipse cx="30" cy="22" rx="5" ry="6" fill="#E1BEE7"/>
    <ellipse cx="18" cy="23" rx="3" ry="4" fill="#7B1FA2"/>
    <ellipse cx="30" cy="23" rx="3" ry="4" fill="#7B1FA2"/>
    <line x1="24" y1="10" x2="24" y2="5" stroke="#E1BEE7" stroke-width="2"/>
    <circle cx="24" cy="5" r="3" fill="#CE93D8"/>
  `, 48, 48)
}

// ═══════════════════════════════════════════════════════════════
// OMBRASPRITZ - Magic/Poison Legendary (Aperitif Spirit)
// ═══════════════════════════════════════════════════════════════
BESTIE_SVG_SPRITES.ombraspritz = {
  front: createSvg(`
    <defs>
      <linearGradient id="ombr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#E91E63"/>
        <stop offset="100%" style="stop-color:#880E4F"/>
      </linearGradient>
      <linearGradient id="ombr-poison" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#CE93D8"/>
        <stop offset="100%" style="stop-color:#9C27B0"/>
      </linearGradient>
    </defs>
    <!-- Shadow aura -->
    <ellipse cx="48" cy="50" rx="40" ry="40" fill="#880E4F" opacity="0.3"/>
    <!-- Main body - ghostly/spiritual -->
    <ellipse cx="48" cy="52" rx="26" ry="28" fill="url(#ombr-grad)"/>
    <!-- Head area -->
    <ellipse cx="48" cy="35" rx="22" ry="20" fill="url(#ombr-grad)"/>
    <!-- Poison bubbles -->
    <circle cx="25" cy="25" r="8" fill="url(#ombr-poison)" opacity="0.7"/>
    <circle cx="71" cy="25" r="8" fill="url(#ombr-poison)" opacity="0.7"/>
    <circle cx="30" cy="15" r="5" fill="#E1BEE7" opacity="0.6"/>
    <circle cx="66" cy="18" r="4" fill="#E1BEE7" opacity="0.6"/>
    <circle cx="48" cy="12" r="6" fill="#CE93D8" opacity="0.7"/>
    <!-- Mask-like face pattern -->
    <ellipse cx="36" cy="38" rx="9" ry="10" fill="#AD1457"/>
    <ellipse cx="60" cy="38" rx="9" ry="10" fill="#AD1457"/>
    <!-- Eyes - seductive/mysterious -->
    <ellipse cx="36" cy="38" rx="6" ry="7" fill="#fff"/>
    <ellipse cx="60" cy="38" rx="6" ry="7" fill="#fff"/>
    <ellipse cx="37" cy="39" rx="4" ry="5" fill="#4A148C"/>
    <ellipse cx="61" cy="39" rx="4" ry="5" fill="#4A148C"/>
    <circle cx="38" cy="37" r="2" fill="#fff"/>
    <circle cx="62" cy="37" r="2" fill="#fff"/>
    <!-- Mouth - smirk -->
    <path d="M 40 52 Q 48 58 56 52" stroke="#4A148C" stroke-width="2" fill="none"/>
    <path d="M 42 52 Q 48 50 54 52" stroke="#AD1457" stroke-width="2" fill="none"/>
    <!-- Decorative swirls -->
    <path d="M 20 60 Q 10 70 15 80" stroke="#CE93D8" stroke-width="3" fill="none" opacity="0.6"/>
    <path d="M 76 60 Q 86 70 81 80" stroke="#CE93D8" stroke-width="3" fill="none" opacity="0.6"/>
    <!-- Spirit tail wisps -->
    <path d="M 30 78 Q 20 90 25 95" stroke="#E91E63" stroke-width="4" fill="none" opacity="0.5"/>
    <path d="M 48 80 Q 48 92 48 96" stroke="#E91E63" stroke-width="4" fill="none" opacity="0.5"/>
    <path d="M 66 78 Q 76 90 71 95" stroke="#E91E63" stroke-width="4" fill="none" opacity="0.5"/>
    <!-- Spritz garnish -->
    <circle cx="35" cy="18" r="3" fill="#4CAF50"/>
    <circle cx="61" cy="18" r="3" fill="#4CAF50"/>
  `),
  back: createSvg(`
    <defs>
      <linearGradient id="ombr-back" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#EC407A"/>
        <stop offset="100%" style="stop-color:#C2185B"/>
      </linearGradient>
    </defs>
    <!-- Back body -->
    <ellipse cx="48" cy="48" rx="40" ry="42" fill="url(#ombr-back)"/>
    <!-- Inner pattern -->
    <ellipse cx="48" cy="50" rx="30" ry="32" fill="#AD1457" opacity="0.4"/>
    <!-- Spirit wisps -->
    <path d="M 20 40 Q 5 50 10 70 Q 5 85 20 80" fill="#E91E63" opacity="0.5"/>
    <path d="M 76 40 Q 91 50 86 70 Q 91 85 76 80" fill="#E91E63" opacity="0.5"/>
    <!-- Bubbles -->
    <circle cx="25" cy="30" r="6" fill="#CE93D8" opacity="0.5"/>
    <circle cx="71" cy="30" r="6" fill="#CE93D8" opacity="0.5"/>
    <circle cx="40" cy="25" r="4" fill="#E1BEE7" opacity="0.4"/>
    <circle cx="56" cy="25" r="4" fill="#E1BEE7" opacity="0.4"/>
  `),
  icon: createSvg(`
    <defs>
      <linearGradient id="ombr-icon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#E91E63"/>
        <stop offset="100%" style="stop-color:#880E4F"/>
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#ombr-icon)"/>
    <circle cx="18" cy="18" r="5" fill="#CE93D8" opacity="0.7"/>
    <circle cx="30" cy="18" r="5" fill="#CE93D8" opacity="0.7"/>
    <ellipse cx="18" cy="24" rx="4" ry="5" fill="#fff"/>
    <ellipse cx="30" cy="24" rx="4" ry="5" fill="#fff"/>
    <ellipse cx="19" cy="25" rx="2" ry="3" fill="#4A148C"/>
    <ellipse cx="31" cy="25" rx="2" ry="3" fill="#4A148C"/>
    <path d="M 20 32 Q 24 35 28 32" stroke="#880E4F" stroke-width="1.5" fill="none"/>
  `, 48, 48)
}

// ═══════════════════════════════════════════════════════════════
// GABBIANZO - Seagull Bestia (Common)
// ═══════════════════════════════════════════════════════════════
BESTIE_SVG_SPRITES.gabbianzo = {
  front: createSvg(`
    <defs>
      <linearGradient id="gab-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ECEFF1"/>
        <stop offset="100%" style="stop-color:#B0BEC5"/>
      </linearGradient>
    </defs>
    <!-- Body -->
    <ellipse cx="48" cy="50" rx="22" ry="20" fill="url(#gab-grad)"/>
    <!-- Head -->
    <circle cx="48" cy="32" r="16" fill="url(#gab-grad)"/>
    <!-- Wings -->
    <ellipse cx="22" cy="50" rx="14" ry="8" fill="#90A4AE" transform="rotate(-15 22 50)"/>
    <ellipse cx="74" cy="50" rx="14" ry="8" fill="#90A4AE" transform="rotate(15 74 50)"/>
    <!-- Beak -->
    <polygon points="48,38 42,45 54,45" fill="#FFB300"/>
    <!-- Eyes -->
    <circle cx="42" cy="30" r="5" fill="#fff"/>
    <circle cx="54" cy="30" r="5" fill="#fff"/>
    <circle cx="43" cy="31" r="3" fill="#1a1a2e"/>
    <circle cx="55" cy="31" r="3" fill="#1a1a2e"/>
    <!-- Eyebrow (angry look) -->
    <line x1="38" y1="24" x2="46" y2="26" stroke="#78909C" stroke-width="2"/>
    <line x1="62" y1="24" x2="54" y2="26" stroke="#78909C" stroke-width="2"/>
    <!-- Feet -->
    <path d="M 40 68 L 35 78 M 40 78 L 40 82 M 35 78 L 32 82 M 45 78 L 48 82" stroke="#FFB300" stroke-width="2" fill="none"/>
    <path d="M 56 68 L 51 78 M 51 78 L 51 82 M 56 78 L 59 82 M 61 78 L 61 82" stroke="#FFB300" stroke-width="2" fill="none"/>
    <!-- Wing tips dark -->
    <circle cx="12" cy="48" r="4" fill="#546E7A"/>
    <circle cx="84" cy="48" r="4" fill="#546E7A"/>
  `),
  back: createSvg(`
    <ellipse cx="48" cy="50" rx="28" ry="26" fill="#B0BEC5"/>
    <ellipse cx="48" cy="48" rx="20" ry="18" fill="#ECEFF1"/>
    <circle cx="40" cy="45" r="3" fill="#90A4AE"/>
    <circle cx="56" cy="45" r="3" fill="#90A4AE"/>
    <circle cx="48" cy="55" r="3" fill="#90A4AE"/>
  `),
  icon: createSvg(`
    <circle cx="24" cy="24" r="20" fill="#B0BEC5"/>
    <circle cx="24" cy="20" r="10" fill="#ECEFF1"/>
    <polygon points="24,24 20,28 28,28" fill="#FFB300"/>
    <circle cx="21" cy="19" r="2" fill="#1a1a2e"/>
    <circle cx="27" cy="19" r="2" fill="#1a1a2e"/>
  `, 48, 48)
}

// ═══════════════════════════════════════════════════════════════
// SPRITZINO - Spritz Creature
// ═══════════════════════════════════════════════════════════════
BESTIE_SVG_SPRITES.spritzino = {
  front: createSvg(`
    <defs>
      <linearGradient id="sprit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FF9800"/>
        <stop offset="100%" style="stop-color:#E65100"/>
      </linearGradient>
      <linearGradient id="sprit-bubbles" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#FFB74D"/>
        <stop offset="100%" style="stop-color:#FF9800"/>
      </linearGradient>
    </defs>
    <!-- Glass shape -->
    <path d="M 30 75 L 35 35 Q 48 30 61 35 L 66 75 Z" fill="url(#sprit-grad)" opacity="0.3"/>
    <path d="M 32 75 L 36 38 Q 48 33 60 38 L 64 75 Z" fill="url(#sprit-grad)"/>
    <!-- Liquid -->
    <path d="M 34 75 L 37 42 Q 48 38 59 42 L 62 75 Z" fill="#FFEB3B" opacity="0.6"/>
    <!-- Bubbles -->
    <circle cx="42" cy="55" r="4" fill="url(#sprit-bubbles)"/>
    <circle cx="52" cy="60" r="3" fill="url(#sprit-bubbles)"/>
    <circle cx="46" cy="48" r="2" fill="#FFF59D"/>
    <circle cx="54" cy="52" r="2" fill="#FFF59D"/>
    <!-- Orange slice -->
    <circle cx="48" cy="40" r="8" fill="#FF9800"/>
    <circle cx="48" cy="40" r="6" fill="#FFB74D"/>
    <line x1="48" y1="35" x2="48" y2="45" stroke="#FF9800" stroke-width="1"/>
    <line x1="43" y1="40" x2="53" y2="40" stroke="#FF9800" stroke-width="1"/>
    <!-- Face on glass -->
    <circle cx="40" cy="58" r="4" fill="#fff"/>
    <circle cx="56" cy="58" r="4" fill="#fff"/>
    <circle cx="41" cy="59" r="2" fill="#1a1a2e"/>
    <circle cx="57" cy="59" r="2" fill="#1a1a2e"/>
    <path d="M 44 66 Q 48 70 52 66" stroke="#1a1a2e" stroke-width="2" fill="none"/>
    <!-- Stem -->
    <rect x="46" y="28" width="4" height="8" fill="#8D6E63"/>
    <!-- Sparkles -->
    <circle cx="30" cy="45" r="2" fill="#fff" opacity="0.8"/>
    <circle cx="66" cy="50" r="2" fill="#fff" opacity="0.8"/>
  `),
  back: createSvg(`
    <path d="M 28 78 L 33 35 Q 48 28 63 35 L 68 78 Z" fill="#E65100"/>
    <path d="M 30 78 L 35 40 Q 48 34 61 40 L 66 78 Z" fill="#FF9800"/>
    <text x="48" y="65" text-anchor="middle" fill="#FFF59D" font-size="20">🍊</text>
  `),
  icon: createSvg(`
    <circle cx="24" cy="24" r="20" fill="#FF9800"/>
    <path d="M 16 32 L 18 20 Q 24 17 30 20 L 32 32 Z" fill="#E65100"/>
    <circle cx="24" cy="18" r="5" fill="#FFB74D"/>
    <circle cx="21" cy="26" r="2" fill="#1a1a2e"/>
    <circle cx="27" cy="26" r="2" fill="#1a1a2e"/>
    <path d="M 22 31 Q 24 33 26 31" stroke="#1a1a2e" stroke-width="1" fill="none"/>
  `, 48, 48)
}

// ═══════════════════════════════════════════════════════════════
// Dynamic Fallback Sprite Generator
// ═══════════════════════════════════════════════════════════════
const TYPE_COLORS: Record<string, string> = {
  nature: '#4CAF50', water: '#2196F3', fire: '#F44336',
  air: '#00BCD4', earth: '#795548', magic: '#E91E63',
  poison: '#9C27B0', ice: '#E1F5FE', dragon: '#3F51B5',
  psycho: '#FF4081', normal: '#9E9E9E', sweet: '#FFEB3B',
  electric: '#FFEB3B', shadow: '#212121', flying: '#81D4FA'
}

export const getDynamicFallback = (id: string, types: string[] = ['normal']): SpriteData => {
  const primaryColor = TYPE_COLORS[types[0]] || '#9E9E9E'
  const secondaryColor = TYPE_COLORS[types[1]] || primaryColor

  const hasType = (t: string) => types.includes(t)
  const typeIcon = hasType('fire') ? '🔥' : hasType('water') ? '💧' : hasType('nature') ? '🌿' : hasType('electric') ? '⚡' : '🐾'

  let features = ''

  // Wings for Aria/Flying/Magic
  if (hasType('air') || hasType('magic') || hasType('flying')) {
    features += `
      <path d="M 20 40 Q 0 10 25 15" fill="${secondaryColor}" opacity="0.6"/>
      <path d="M 76 40 Q 96 10 71 15" fill="${secondaryColor}" opacity="0.6"/>
    `
  }

  // Fins/Tail for Water/Ice
  if (hasType('water') || hasType('ice')) {
    features += `
      <path d="M 76 65 Q 95 60 92 80 Q 85 95 70 85" fill="${primaryColor}"/>
      <path d="M 48 20 Q 48 5 35 15" fill="${secondaryColor}" opacity="0.5"/>
    `
  }

  // Flames for Fire
  if (hasType('fire')) {
    features += `
      <path d="M 35 25 Q 48 -10 61 25" fill="#FF9800" opacity="0.8"/>
      <path d="M 40 20 Q 48 5 56 20" fill="#F44336"/>
    `
  }

  // Horns for Dragon/Earth/Normal/Poison
  if (hasType('dragon') || hasType('earth') || hasType('poison')) {
    features += `
      <path d="M 30 25 L 15 5" stroke="${secondaryColor}" stroke-width="5" stroke-linecap="round"/>
      <path d="M 66 25 L 81 5" stroke="${secondaryColor}" stroke-width="5" stroke-linecap="round"/>
    `
  }

  // Leaves/Vines for Nature
  if (hasType('nature')) {
    features += `
      <circle cx="25" cy="25" r="6" fill="#4CAF50"/>
      <circle cx="71" cy="25" r="6" fill="#4CAF50"/>
      <path d="M 48 85 L 48 95" stroke="#2E7D32" stroke-width="3"/>
    `
  }

  // Bubbles for Poison/Magic/Sweet
  if (hasType('poison') || hasType('magic') || hasType('sweet')) {
    features += `
      <circle cx="20" cy="30" r="4" fill="#E1BEE7" opacity="0.7"/>
      <circle cx="76" cy="30" r="4" fill="#CE93D8" opacity="0.7"/>
      <circle cx="25" cy="15" r="3" fill="#F3E5F5" opacity="0.6"/>
    `
  }

  return {
    front: createSvg(`
      <defs>
        <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${primaryColor}"/>
          <stop offset="100%" style="stop-color:${secondaryColor}"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="1" flood-opacity="0.3"/>
        </filter>
      </defs>
      ${features}
      <!-- Monster Main Body (Chunky pixel style) -->
      <path d="M 24 75 L 24 35 L 32 25 L 64 25 L 72 35 L 72 75 L 64 85 L 32 85 Z" fill="url(#grad-${id})" filter="url(#shadow)"/>

      <!-- Face Details -->
      <rect x="34" y="40" width="8" height="10" fill="white"/>
      <rect x="54" y="40" width="8" height="10" fill="white"/>
      <rect x="36" y="42" width="4" height="4" fill="#1a1a2e"/>
      <rect x="56" y="42" width="4" height="4" fill="#1a1a2e"/>

      <!-- Mouth -->
      <path d="M 40 65 L 56 65" stroke="#1a1a2e" stroke-width="2" stroke-linecap="round"/>

      <!-- Type Indicator -->
      <text x="48" y="78" text-anchor="middle" font-size="18" filter="drop-shadow(1px 1px 1px rgba(0,0,0,0.5))">${typeIcon}</text>
      <text x="48" y="92" text-anchor="middle" fill="white" font-size="7" font-family="monospace" font-weight="bold" stroke="black" stroke-width="0.3">${types.join('/').toUpperCase()}</text>
    `),
    back: createSvg(`
      <path d="M 24 80 L 24 40 L 32 30 L 64 30 L 72 40 L 72 80 L 64 90 L 32 90 Z" fill="${primaryColor}" opacity="0.8"/>
      <path d="M 32 40 L 64 40 L 64 70 L 32 70 Z" fill="${secondaryColor}" opacity="0.5"/>
    `),
    icon: createSvg(`
      <rect x="4" y="4" width="40" height="40" rx="8" fill="${primaryColor}"/>
      <rect x="12" y="16" width="6" height="6" fill="#fff"/>
      <rect x="30" y="16" width="6" height="6" fill="#fff"/>
    `, 48, 48)
  }
}

export const getDefaultSprite = (): SpriteData => getDynamicFallback('unknown', ['normal'])

// Export for use in game
export const BESTIE_SPRITES = BESTIE_SVG_SPRITES
export { BESTIE_SVG_SPRITES as SVG_SPRITES }
