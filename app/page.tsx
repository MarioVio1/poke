'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { BESTI, Bestia, MOVES, GameMap, MapEvent, MoveData, LEGENDARY_STARTERS } from '@/lib/besti'
import { MAPS, CITY_THEMES, getCityTheme } from '@/lib/maps'
import { ITEMS, SHOP_ITEMS, GameItem } from '@/lib/items'
import { NPCs, NPCData } from '@/lib/npcs'
import { VEHICLES, VehicleType, canMoveOnTile, getMovementSpeed } from '@/lib/vehicles'
import { BESTI_SVG_SPRITES, BESTI_SPRITES, SpriteData, getDefaultSprite } from '@/lib/sprites'
import { PIXEL_SPRITES, getSpriteUrl, getIconUrl } from '@/lib/pixelSprites'
import { getNPCSprite } from '@/lib/npcSprites'
import { TYPE_COLORS, TILE_COLORS, TYPE_CHART, isIndoorMap, getMapBackground, renderTile, renderBuilding } from '@/lib/types'
import { soundManager } from '@/lib/sounds'
import { TELEPORT_LOCATIONS, isLocationUnlocked, TeleportLocation } from '@/lib/teleport'
import { ACHIEVEMENTS, Achievement, STONE_EVOLUTIONS, canEvolveWithStone, getStoneEvolution, getTimeOfDay, getTimeGreeting, TIME_EFFECTS, TimeOfDay } from '@/lib/systems'

const TILE = 16
const MAPW = 15
const MAPH = 10

interface PartyBestia extends Bestia {
  level: number
  exp: number
  expTL: number
  hp: number
  maxHp: number
  atk: number
  def: number
  spd: number
  moves: string[]
  status?: string
  isPlayer?: boolean
}

interface GameFlags {
  hasStarter: boolean
  hasBike: boolean
  hasBoat: boolean
  defeatedRival: boolean
  battlesWon?: number
  collectedItems?: string[]
  receivedGifts?: string[]
  defeatedTrainers?: string[]
  caughtBesti?: number[]
}

type PlayerIdentity = 'maschio' | 'femmina' | 'trans'

interface GameState {
  player: { name: string; x: number; y: number; money: number; badges: string[]; gender?: PlayerIdentity }
  party: PartyBestia[]
  rival?: PartyBestia
  pc: PartyBestia[]
  inv: { item: GameItem; qty: number }[]
  flags: GameFlags
  map: string
  vehicle: VehicleType
  storyProgress: number
  defeatedRival: boolean
  achievements?: string[]
  evolutions?: number
  citiesVisited?: string[]
}

interface BattleState {
  enemy: PartyBestia
  enemyTeam: PartyBestia[]
  enemyIdx: number
  isWild: boolean
  over: boolean
  won?: boolean
  badge?: string
  trainerName?: string
}

interface StoryIntroScene {
  speaker: string
  title: string
  text: string
  accent: string
}

type VirtualControl = 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'start' | 'select'
type ControlMode = 'boot' | 'title' | 'setup' | 'story' | 'dialog' | 'shop' | 'menu' | 'overlay' | 'overworld' | 'battle'

// Intro animation frames
const INTRO_FRAMES = [
  { text: '★ POKEMONA ★', subtext: 'Besti di Venetia', delay: 2000 },
  { text: 'Una regione magica...', subtext: 'Dove i canali cantano', delay: 1500 },
  { text: 'Dove i Besti regnano...', subtext: 'Tra spritz e polenta', delay: 1500 },
  { text: 'La tua avventura inizia ora!', subtext: '', delay: 2000 },
]

const getIntroStarStyle = (index: number) => ({
  left: `${(index * 17 + 9) % 100}%`,
  top: `${(index * 29 + 11) % 100}%`,
  animationDelay: `${(index % 5) * 0.35}s`,
})

const getTitleParticleStyle = (index: number) => ({
  left: `${(index * 11 + 7) % 100}%`,
  animationDelay: `${(index % 6) * 0.4}s`,
})

const toSvgDataUrl = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`

const PLAYER_FRONT_PORTRAIT = toSvgDataUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 96">
    <rect width="80" height="96" fill="#dbeff7"/>
    <ellipse cx="40" cy="82" rx="20" ry="6" fill="#b7d1da"/>
    <rect x="26" y="16" width="28" height="18" fill="#c23b35"/>
    <rect x="22" y="20" width="8" height="14" fill="#f4f4f4"/>
    <rect x="50" y="20" width="8" height="14" fill="#f4f4f4"/>
    <rect x="28" y="28" width="24" height="18" fill="#f6d2ae"/>
    <rect x="30" y="34" width="6" height="6" fill="#1f1f1f"/>
    <rect x="44" y="34" width="6" height="6" fill="#1f1f1f"/>
    <rect x="24" y="42" width="32" height="8" fill="#f6d2ae"/>
    <rect x="30" y="52" width="20" height="20" fill="#e7e6d8"/>
    <rect x="22" y="50" width="12" height="24" fill="#f0c330"/>
    <rect x="46" y="50" width="12" height="24" fill="#f0c330"/>
    <rect x="16" y="54" width="10" height="18" fill="#ffffff"/>
    <rect x="54" y="54" width="10" height="18" fill="#ffffff"/>
    <rect x="30" y="72" width="10" height="16" fill="#5385cf"/>
    <rect x="40" y="72" width="10" height="16" fill="#3765b7"/>
    <rect x="28" y="88" width="12" height="6" fill="#443b37"/>
    <rect x="40" y="88" width="12" height="6" fill="#443b37"/>
  </svg>
`)

const PLAYER_BACK_PORTRAIT = toSvgDataUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <rect width="96" height="96" fill="none"/>
    <ellipse cx="48" cy="86" rx="23" ry="6" fill="#b08f4f"/>
    <rect x="30" y="8" width="32" height="18" fill="#c53731"/>
    <rect x="26" y="12" width="8" height="14" fill="#f1f1f1"/>
    <rect x="62" y="12" width="8" height="14" fill="#f1f1f1"/>
    <rect x="30" y="24" width="32" height="16" fill="#4a2c1e"/>
    <rect x="30" y="38" width="36" height="26" fill="#f0c330"/>
    <rect x="34" y="42" width="28" height="18" fill="#f7e4ac"/>
    <rect x="36" y="44" width="24" height="14" fill="#c98d45"/>
    <rect x="36" y="64" width="12" height="18" fill="#4f7fd0"/>
    <rect x="48" y="64" width="12" height="18" fill="#335fb7"/>
    <rect x="34" y="82" width="14" height="8" fill="#413833"/>
    <rect x="48" y="82" width="14" height="8" fill="#413833"/>
  </svg>
`)

const PLAYER_FRONT_FEMALE = toSvgDataUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 96">
    <rect width="80" height="96" fill="#dbeff7"/>
    <ellipse cx="40" cy="82" rx="20" ry="6" fill="#b7d1da"/>
    <rect x="24" y="16" width="32" height="18" fill="#8b4d2f"/>
    <rect x="28" y="30" width="24" height="18" fill="#f6d2ae"/>
    <rect x="30" y="36" width="5" height="5" fill="#1f1f1f"/>
    <rect x="45" y="36" width="5" height="5" fill="#1f1f1f"/>
    <rect x="24" y="46" width="32" height="8" fill="#f6d2ae"/>
    <rect x="24" y="52" width="32" height="20" fill="#ffffff"/>
    <rect x="22" y="54" width="10" height="16" fill="#ef6c7e"/>
    <rect x="48" y="54" width="10" height="16" fill="#ef6c7e"/>
    <rect x="30" y="72" width="10" height="16" fill="#3c6dd0"/>
    <rect x="40" y="72" width="10" height="16" fill="#3159b0"/>
    <rect x="28" y="88" width="12" height="6" fill="#443b37"/>
    <rect x="40" y="88" width="12" height="6" fill="#443b37"/>
  </svg>
`)

const PLAYER_BACK_FEMALE = toSvgDataUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <rect width="96" height="96" fill="none"/>
    <ellipse cx="48" cy="86" rx="23" ry="6" fill="#b08f4f"/>
    <rect x="28" y="10" width="36" height="22" fill="#8b4d2f"/>
    <rect x="32" y="34" width="32" height="28" fill="#ffffff"/>
    <rect x="28" y="38" width="10" height="18" fill="#ef6c7e"/>
    <rect x="58" y="38" width="10" height="18" fill="#ef6c7e"/>
    <rect x="36" y="62" width="12" height="20" fill="#4f7fd0"/>
    <rect x="48" y="62" width="12" height="20" fill="#335fb7"/>
    <rect x="34" y="82" width="14" height="8" fill="#413833"/>
    <rect x="48" y="82" width="14" height="8" fill="#413833"/>
  </svg>
`)

const PLAYER_FRONT_TRANS = toSvgDataUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 96">
    <rect width="80" height="96" fill="#dbeff7"/>
    <ellipse cx="40" cy="82" rx="20" ry="6" fill="#b7d1da"/>
    <rect x="22" y="16" width="36" height="18" fill="#6f3dc4"/>
    <rect x="24" y="18" width="10" height="10" fill="#57b9ff"/>
    <rect x="46" y="18" width="10" height="10" fill="#ff76aa"/>
    <rect x="28" y="30" width="24" height="18" fill="#f6d2ae"/>
    <rect x="30" y="36" width="5" height="5" fill="#1f1f1f"/>
    <rect x="45" y="36" width="5" height="5" fill="#1f1f1f"/>
    <rect x="26" y="52" width="28" height="20" fill="#ffd54f"/>
    <rect x="22" y="54" width="8" height="14" fill="#57b9ff"/>
    <rect x="50" y="54" width="8" height="14" fill="#ff76aa"/>
    <rect x="30" y="72" width="10" height="16" fill="#57b9ff"/>
    <rect x="40" y="72" width="10" height="16" fill="#ff76aa"/>
    <rect x="28" y="88" width="12" height="6" fill="#443b37"/>
    <rect x="40" y="88" width="12" height="6" fill="#443b37"/>
  </svg>
`)

const PLAYER_BACK_TRANS = toSvgDataUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <rect width="96" height="96" fill="none"/>
    <ellipse cx="48" cy="86" rx="23" ry="6" fill="#b08f4f"/>
    <rect x="28" y="10" width="36" height="22" fill="#6f3dc4"/>
    <rect x="30" y="14" width="10" height="10" fill="#57b9ff"/>
    <rect x="56" y="14" width="10" height="10" fill="#ff76aa"/>
    <rect x="30" y="36" width="36" height="26" fill="#ffd54f"/>
    <rect x="28" y="42" width="8" height="14" fill="#57b9ff"/>
    <rect x="60" y="42" width="8" height="14" fill="#ff76aa"/>
    <rect x="36" y="62" width="12" height="20" fill="#57b9ff"/>
    <rect x="48" y="62" width="12" height="20" fill="#ff76aa"/>
    <rect x="34" y="82" width="14" height="8" fill="#413833"/>
    <rect x="48" y="82" width="14" height="8" fill="#413833"/>
  </svg>
`)

const OPENING_STORY: StoryIntroScene[] = [
  {
    speaker: 'Prof. GheSboro',
    title: 'Benvenuto a Venetia',
    text: 'Questa e una terra di canali, colline, lagune e Besti strani. Ogni citta ha le sue abitudini, le sue palestre e le sue leggende.',
    accent: '#4f8cff',
  },
  {
    speaker: 'Prof. GheSboro',
    title: 'I Besti di Venetia',
    text: 'Alcuni nascono tra i campi, altri nei canali, altri ancora tra nebbia, neve e spritz. Per capirli serve curiosita, coraggio e un buon compagno.',
    accent: '#68c16f',
  },
  {
    speaker: 'Mamma',
    title: 'Sveglia, Federico',
    text: 'Il Dottor GheSboro ti aspetta. Muoviti, vestite e va in laboratorio: oggi scegli il tuo primo Besti e inizi davvero il viaggio.',
    accent: '#f28cae',
  },
]

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastVirtualPressRef = useRef<Record<string, number>>({})
  const lastMoveAtRef = useRef(0)
  const heldDirectionRef = useRef<string | null>(null)
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const normalizePlayer = useCallback((player: Partial<GameState['player']> | undefined): GameState['player'] => ({
    name: player?.name || 'Federico',
    x: typeof player?.x === 'number' ? player.x : 7,
    y: typeof player?.y === 'number' ? player.y : 9,
    money: typeof player?.money === 'number' ? player.money : 3000,
    badges: Array.isArray(player?.badges) ? player.badges : [],
    gender: player?.gender === 'femmina' || player?.gender === 'trans' ? player.gender : 'maschio',
  }), [])

  const normalizeFlags = useCallback((flags: Partial<GameFlags> | undefined): GameFlags => ({
    hasStarter: !!flags?.hasStarter,
    hasBike: !!flags?.hasBike,
    hasBoat: !!flags?.hasBoat,
    defeatedRival: !!flags?.defeatedRival,
    battlesWon: typeof flags?.battlesWon === 'number' ? flags.battlesWon : 0,
    collectedItems: Array.isArray(flags?.collectedItems) ? flags.collectedItems : [],
    receivedGifts: Array.isArray(flags?.receivedGifts) ? flags.receivedGifts : [],
    defeatedTrainers: Array.isArray(flags?.defeatedTrainers) ? flags.defeatedTrainers : [],
  }), [])

  const normalizeInventory = useCallback((inventory: Array<{ item: unknown; qty: number }> | undefined) => {
    if (!Array.isArray(inventory)) return []

    return inventory.flatMap((entry) => {
      const qty = typeof entry?.qty === 'number' && entry.qty > 0 ? entry.qty : 0
      if (!qty) return []

      const rawItem = entry.item
      let item: GameItem | undefined

      if (typeof rawItem === 'string') {
        item = ITEMS[rawItem]
      } else if (rawItem && typeof rawItem === 'object') {
        const candidate = rawItem as Partial<GameItem>
        item = (candidate.id && ITEMS[candidate.id]) || Object.values(ITEMS).find(i => i.name === candidate.name)
      }

      return item ? [{ item, qty }] : []
    })
  }, [])

  const getEventKey = useCallback((mapId: string, ev: MapEvent, fallback: string) => (
    `${mapId}:${ev.type}:${ev.name || ev.npcId || fallback}:${ev.x ?? 'na'}:${ev.y ?? 'na'}`
  ), [])
  
  // Game states
  const [gameStarted, setGameStarted] = useState(false)
  const [inBattle, setInBattle] = useState(false)
  const [inDialog, setInDialog] = useState(false)
  const [inShop, setInShop] = useState(false)
  const [inMenu, setInMenu] = useState(false)
  
  // UI States
  const [showStarterChoice, setShowStarterChoice] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayTitle, setOverlayTitle] = useState('')
  const [overlayContent, setOverlayContent] = useState<React.ReactNode>(null)
  const [notification, setNotification] = useState('')
  const [showBattleMsg, setShowBattleMsg] = useState(false)
  const [battleMsg, setBattleMsg] = useState('')
  
  // Intro state
  const [showIntro, setShowIntro] = useState(false)
  const [introFrame, setIntroFrame] = useState(0)
  const [showIntroText, setShowIntroText] = useState(false)
  const [titleSelection, setTitleSelection] = useState(0)
  const [showPlayerSetup, setShowPlayerSetup] = useState(false)
  const [mapTransition, setMapTransition] = useState(false)
  const [setupName, setSetupName] = useState('Federico')
  const [setupIdentity, setSetupIdentity] = useState<PlayerIdentity>('maschio')
  const [showStoryIntro, setShowStoryIntro] = useState(false)
  const [storyIntroStep, setStoryIntroStep] = useState(0)
  const [menuSelection, setMenuSelection] = useState(0)
  
  // Battle states
  const [battleState, setBattleState] = useState<BattleState | null>(null)
  const [playerHp, setPlayerHp] = useState({ current: 0, max: 0 })
  const [enemyHp, setEnemyHp] = useState({ current: 0, max: 0 })
  const [movesOpen, setMovesOpen] = useState(false)
  const [animating, setAnimating] = useState(false)
  
  // Dialog states
  const [dialogs, setDialogs] = useState<string[]>([])
  const [speaker, setSpeaker] = useState('')
  const [dialogCallback, setDialogCallback] = useState<(() => void) | null>(null)
  
  // Current map event for shop
  const [currentShopItems, setCurrentShopItems] = useState<GameItem[]>([])
  
  // Teleport state
  const [inTeleport, setInTeleport] = useState(false)

  // Battle animation
  const [battleAnimation, setBattleAnimation] = useState<'idle' | 'attack' | 'damage' | 'capturing'>('idle')
  const [shakeScreen, setShakeScreen] = useState(false)
  
  // Ball selection in battle
  const [showBallSelect, setShowBallSelect] = useState(false)
  
  // Battle menu selection (0=luotta, 1=mossa, 2=oggetto, 3=fuga)
  const [battleMenuSelection, setBattleMenuSelection] = useState(0)
  
  // Battle option cycling
  const [battleOption, setBattleOption] = useState(0)

  // Achievement system
  const [achievements, setAchievements] = useState<string[]>([])
  const [showAchievement, setShowAchievement] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)

  // Day/Night cycle
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning')

  // Evolution state
  const [showEvolve, setShowEvolve] = useState(false)
  const [evolvingBestia, setEvolvingBestia] = useState<PartyBestia | null>(null)

  const [gs, setGs] = useState<GameState>({
    player: { name: 'Federico', x: 7, y: 9, money: 3000, badges: [], gender: 'maschio' },
    party: [],
    rival: undefined,
    pc: [],
    inv: [
      { item: ITEMS.pozioncino, qty: 5 },
      { item: ITEMS.gondolball, qty: 5 },
      { item: ITEMS.caffette, qty: 3 },
    ],
    flags: { hasStarter: false, hasBike: false, hasBoat: false, defeatedRival: false, battlesWon: 0, collectedItems: [], receivedGifts: [], defeatedTrainers: [] },
    map: 'canalborgo',
    vehicle: 'none',
    storyProgress: 0,
    defeatedRival: false,
    achievements: [],
    evolutions: 0,
    citiesVisited: [],
  })

  // Save/Load System with Auto-Save
  const saveGame = useCallback((autoSave = false) => {
    try {
      const dataToSave = {
        ...gs,
        savedAt: new Date().toISOString(),
        version: '1.0.0',
      }
      localStorage.setItem('pokemona_save', JSON.stringify(dataToSave))
      if (!autoSave) {
        setNotification('Partita salvata!')
        soundManager.levelUp()
      }
      return true
    } catch (e) {
      console.error('Save failed:', e)
      if (!autoSave) setNotification('Errore nel salvataggio!')
      return false
    }
  }, [gs])

  // Auto-save every 30 seconds
  useEffect(() => {
    if (gameStarted && !inBattle && gs.party.length > 0) {
      const autoSaveInterval = setInterval(() => {
        saveGame(true)
      }, 30000)
      return () => clearInterval(autoSaveInterval)
    }
  }, [gameStarted, inBattle, gs.party.length, saveGame])

  const loadGame = useCallback(() => {
    try {
      const saved = localStorage.getItem('pokemona_save')
      if (saved) {
        const saveData = JSON.parse(saved)
        setGs({
          player: normalizePlayer(saveData.player),
          party: saveData.party,
          rival: saveData.rival,
          pc: saveData.pc,
          inv: normalizeInventory(saveData.inv),
          flags: normalizeFlags(saveData.flags),
          map: saveData.map,
          vehicle: saveData.vehicle,
          storyProgress: saveData.storyProgress,
          defeatedRival: saveData.defeatedRival ?? !!saveData.flags?.defeatedRival,
          achievements: saveData.achievements || [],
          evolutions: saveData.evolutions || 0,
          citiesVisited: saveData.citiesVisited || [],
        })
        setAchievements(saveData.achievements || [])
        setNotification('Partita caricata!')
        return true
      }
    } catch (e) {
      console.error('Load failed:', e)
      setNotification('Errore nel caricamento!')
    }
    return false
  }, [normalizeFlags, normalizeInventory, normalizePlayer])

  const hasSave = useCallback(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('pokemona_save') !== null
  }, [])

  const getSaveInfo = useCallback(() => {
    try {
      if (typeof window === 'undefined') return null
      const saved = localStorage.getItem('pokemona_save')
      if (saved) {
        const saveData = JSON.parse(saved)
        return {
          playerName: saveData.player?.name || 'Sconosciuto',
          level: saveData.party?.[0]?.level || 1,
          badges: saveData.player?.badges?.length || 0,
          savedAt: saveData.savedAt ? new Date(saveData.savedAt).toLocaleString('it-IT') : 'Sconosciuto',
          map: saveData.map || 'Sconosciuto',
        }
      }
    } catch (e) {
      console.error('Get save info failed:', e)
    }
    return null
  }, [])

  const startNewGame = useCallback(() => {
    setSetupName('Federico')
    setSetupIdentity('maschio')
    setTitleSelection(0)
    setShowPlayerSetup(true)
    setShowIntro(false)
    setShowStoryIntro(false)
    setShowStarterChoice(false)
    setShowOverlay(false)
    setInDialog(false)
    setDialogs([])
    setSpeaker('')
    setDialogCallback(null)
  }, [])

  const confirmNewGameSetup = useCallback(() => {
    const playerName = setupName.trim() || 'Federico'
    setGs({
      player: { name: playerName, x: 4, y: 2, money: 3000, badges: [], gender: setupIdentity },
      party: [],
      rival: undefined,
      pc: [],
      inv: [
        { item: ITEMS.pozioncino, qty: 5 },
        { item: ITEMS.gondolball, qty: 5 },
        { item: ITEMS.caffette, qty: 3 },
      ],
      flags: { hasStarter: false, hasBike: false, hasBoat: false, defeatedRival: false, battlesWon: 0, collectedItems: [], receivedGifts: [], defeatedTrainers: [] },
      map: 'casa',
      vehicle: 'none',
      storyProgress: 0,
      defeatedRival: false,
      achievements: [],
      evolutions: 0,
      citiesVisited: [],
    })
    setAchievements([])
    setShowPlayerSetup(false)
    setShowIntro(false)
    setStoryIntroStep(0)
    setShowStoryIntro(true)
    setShowStarterChoice(false)
    setShowOverlay(false)
    setInMenu(false)
    setDialogs([])
    setSpeaker('')
    setDialogCallback(null)
    setGameStarted(true)
  }, [setupIdentity, setupName])

  const startSavedGame = useCallback(() => {
    if (!hasSave()) {
      setNotification('Nessun salvataggio trovato.')
      return
    }
    if (loadGame()) {
      setTitleSelection(0)
      setShowPlayerSetup(false)
      setShowIntro(false)
      setShowStarterChoice(false)
      setGameStarted(true)
      setInDialog(false)
      setShowOverlay(false)
    }
  }, [hasSave, loadGame])

  const deleteSave = useCallback(() => {
    localStorage.removeItem('pokemona_save')
    setNotification('Salvataggio eliminato!')
  }, [])

  const advanceStoryIntro = useCallback(() => {
    const nextStep = storyIntroStep + 1
    if (nextStep >= OPENING_STORY.length) {
      setGs(prev => ({ ...prev, storyProgress: Math.max(prev.storyProgress, 2) }))
      setShowStoryIntro(false)
      setNotification('La Mamma ti ha svegliato. Prendi quello che trovi in camera e poi vai dal Dottor GheSboro.')
      setTimeout(() => setNotification(''), 2200)
      return
    }
    setStoryIntroStep(nextStep)
    soundManager.dialogText()
  }, [storyIntroStep])

  const addItemToInventory = useCallback((item: GameItem, qty: number = 1) => {
    setGs(prev => {
      const existing = prev.inv.find(entry => entry.item.id === item.id)
      return {
        ...prev,
        inv: existing
          ? prev.inv.map(entry => entry.item.id === item.id ? { ...entry, qty: entry.qty + qty } : entry)
          : [...prev.inv, { item, qty }],
      }
    })
  }, [])

  // Auto-load on mount
  useEffect(() => {
    const saved = localStorage.getItem('pokemona_save')
    if (saved) {
      try {
        const saveData = JSON.parse(saved)
        setGs({
          player: normalizePlayer(saveData.player),
          party: saveData.party,
          rival: saveData.rival,
          pc: saveData.pc,
          inv: normalizeInventory(saveData.inv),
          flags: normalizeFlags(saveData.flags),
          map: saveData.map,
          vehicle: saveData.vehicle,
          storyProgress: saveData.storyProgress,
          defeatedRival: saveData.defeatedRival ?? !!saveData.flags?.defeatedRival,
          achievements: saveData.achievements || [],
          evolutions: saveData.evolutions || 0,
          citiesVisited: saveData.citiesVisited || [],
        })
        setAchievements(saveData.achievements || [])
      } catch (e) {
        console.error('Auto-load failed:', e)
      }
    }
  }, [normalizeFlags, normalizeInventory, normalizePlayer])

  // Intro animation effect
  useEffect(() => {
    if (!showIntro) return
    
    const frame = INTRO_FRAMES[introFrame]
    if (!frame) {
      setShowIntro(false)
      return
    }
    
    setShowIntroText(false)
    const showTimer = setTimeout(() => {
      setShowIntroText(true)
      soundManager.dialogText()
    }, 300)
    
    const nextTimer = setTimeout(() => {
      setIntroFrame(prev => prev + 1)
    }, frame.delay)
    
    return () => {
      clearTimeout(showTimer)
      clearTimeout(nextTimer)
    }
  }, [showIntro, introFrame])

  // Skip intro
  const skipIntro = useCallback(() => {
    setShowIntro(false)
  }, [])

  // Create a Bestia with stats (including legendary starters)
  const createBesti = useCallback((id: string, lvl: number): PartyBestia => {
    const t = BESTI[id] || LEGENDARY_STARTERS[id]
    if (!t) throw new Error('Bestia not found: ' + id)
    const lf = lvl / 50
    const hp = Math.floor(t.bs.hp * lf + 10 + lvl)
    const moves = t.moves.slice(0, 4)
    return {
      ...t,
      level: lvl,
      exp: 0,
      expTL: lvl * 100,
      hp,
      maxHp: hp,
      atk: Math.floor(t.bs.atk * lf + 5),
      def: Math.floor(t.bs.def * lf + 5),
      spd: Math.floor(t.bs.spd * lf + 5),
      moves,
    }
  }, [])

  // Get sprite URL for a Bestia (try pixel art first, then SVG)
  const getBestiaSprite = (id: string | number, isBack: boolean = false): string => {
    // Try pixel sprites first
    const pixelUrl = getSpriteUrl(id, isBack)
    if (pixelUrl) return pixelUrl
    
    // Fallback to SVG sprites
    const sprite = BESTI_SVG_SPRITES[String(id)] || BESTI_SPRITES[String(id)] || getDefaultSprite()
    return isBack ? (sprite.back || sprite.front) : sprite.front
  }

  // Get icon sprite
  const getBestiaIcon = (id: string | number): string => {
    // Try pixel sprites first
    const iconUrl = getIconUrl(id)
    if (iconUrl) return iconUrl
    
    // Fallback to SVG sprites
    const sprite = BESTI_SVG_SPRITES[String(id)] || BESTI_SPRITES[String(id)] || getDefaultSprite()
    return sprite.icon || sprite.front
  }

  const getPlayerFrontPortrait = (identity: PlayerIdentity = 'maschio'): string => {
    if (identity === 'femmina') return PLAYER_FRONT_FEMALE
    if (identity === 'trans') return PLAYER_FRONT_TRANS
    return PLAYER_FRONT_PORTRAIT
  }

  const getPlayerBackPortrait = (identity: PlayerIdentity = 'maschio'): string => {
    if (identity === 'femmina') return PLAYER_BACK_FEMALE
    if (identity === 'trans') return PLAYER_BACK_TRANS
    return PLAYER_BACK_PORTRAIT
  }

  const personalizeText = (text: string): string => text.replaceAll('Federico', gs.player.name)

  const getSpeakerPortrait = (name: string): string => {
    const lower = name.toLowerCase()
    if (lower.includes('ghe') || lower.includes('prof')) return getNPCSprite('professor')
    if (lower.includes('mamma')) return getNPCSprite('mom')
    if (lower.includes('nonna') || lower.includes('lady')) return getNPCSprite('lady')
    if (lower.includes('infermiera')) return getNPCSprite('lass')
    if (lower.includes(gs.player.name.toLowerCase()) || lower.includes('federico')) return getPlayerFrontPortrait(gs.player.gender)
    return getNPCSprite('kid')
  }

  // Draw the game world - Pokemon style
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const map = MAPS[gs.map]
    if (!map) return

    const currentTime = Date.now()
    const indoor = isIndoorMap(gs.map)
    const bgColors = getMapBackground(gs.map)
    
    // Background gradient based on indoor/outdoor
    if (indoor) {
      // Indoor: darker, ceiling visible
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, 240, 160)
      
      // Ceiling lights effect
      for (let i = 0; i < 5; i++) {
        const gradient = ctx.createRadialGradient(
          i * 50 + 25, 0, 0,
          i * 50 + 25, 0, 60
        )
        gradient.addColorStop(0, 'rgba(255,255,200,0.1)')
        gradient.addColorStop(1, 'rgba(255,255,200,0)')
        ctx.fillStyle = gradient
        ctx.fillRect(i * 50, 0, 50, 60)
      }
    } else {
      // Outdoor: sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 160)
      gradient.addColorStop(0, bgColors.sky)
      gradient.addColorStop(0.6, bgColors.ground)
      gradient.addColorStop(1, '#4a4a4a')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 240, 160)
      
      // Clouds for outdoor
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      const cloudOffset = (currentTime / 50) % 240
      ctx.beginPath()
      ctx.arc(50 + cloudOffset, 25, 15, 0, Math.PI * 2)
      ctx.arc(70 + cloudOffset, 20, 12, 0, Math.PI * 2)
      ctx.arc(35 + cloudOffset, 22, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(150 + cloudOffset * 0.7, 35, 12, 0, Math.PI * 2)
      ctx.arc(165 + cloudOffset * 0.7, 32, 10, 0, Math.PI * 2)
      ctx.fill()
    }

    const sx = Math.max(0, Math.min(gs.player.x - 7, (map.tiles[0]?.length || 0) - MAPW))
    const sy = Math.max(0, Math.min(gs.player.y - 4, (map.tiles.length || 0) - MAPH))

    // Draw tiles with detail
    for (let y = sy; y < sy + MAPH + 1 && y < map.tiles.length; y++) {
      for (let x = sx; x < sx + MAPW + 1 && map.tiles[y] && x < map.tiles[y].length; x++) {
        const t = map.tiles[y][x]
        renderTile(ctx, t, (x - sx) * TILE, (y - sy) * TILE, TILE, indoor, currentTime)
        
        // Add light grass tufts for outdoor
        if (!indoor && (t === 0 || t === 6 || t === 7 || t === 8) && (x + y) % 4 === 0) {
          ctx.fillStyle = '#3d8b3d'
          ctx.fillRect((x - sx) * TILE + 3, (y - sy) * TILE + 2, 2, 5)
          ctx.fillRect((x - sx) * TILE + 10, (y - sy) * TILE + 4, 2, 4)
        }
      }
    }

    // Draw events with Pokemon-style sprites
    map.events?.forEach((e: MapEvent) => {
      if (typeof e.x !== 'number' || typeof e.y !== 'number') return
      if (e.x >= sx && e.x < sx + MAPW && e.y >= sy && e.y < sy + MAPH) {
        const ex = (e.x - sx) * TILE
        const ey = (e.y - sy) * TILE
        
        if (e.type === 'trainer' || e.type === 'gym' || e.type === 'npc') {
          const palette = e.type === 'gym'
            ? { hat: '#c37a1f', hair: '#6f3a15', shirt: '#f4d34a', jacket: '#3b4ea2', legs: '#2a2f55', accent: '#f6d2ae' }
            : e.isEnemy
              ? { hat: '#4c2a21', hair: '#3b1f1a', shirt: '#cc4d43', jacket: '#3b2b2b', legs: '#2a2335', accent: '#f6d2ae' }
              : { hat: '#2d2d2d', hair: '#1f1f1f', shirt: '#4aa3f0', jacket: '#3465c7', legs: '#263266', accent: '#f6d2ae' }

          ctx.fillStyle = 'rgba(0,0,0,0.3)'
          ctx.beginPath()
          ctx.ellipse(ex + 8, ey + 14, 5, 3, 0, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = '#1a1a1a'
          ctx.fillRect(ex + 4, ey + 2, 8, 1)
          ctx.fillRect(ex + 3, ey + 3, 10, 1)
          ctx.fillStyle = palette.hat
          ctx.fillRect(ex + 4, ey + 2, 8, 3)
          ctx.fillRect(ex + 3, ey + 5, 10, 1)
          ctx.fillStyle = palette.hair
          ctx.fillRect(ex + 4, ey + 6, 1, 2)
          ctx.fillRect(ex + 11, ey + 6, 1, 2)
          ctx.fillStyle = palette.accent
          ctx.fillRect(ex + 5, ey + 6, 6, 4)
          ctx.fillStyle = '#1d1d1d'
          ctx.fillRect(ex + 6, ey + 7, 1, 1)
          ctx.fillRect(ex + 9, ey + 7, 1, 1)
          ctx.fillStyle = '#9c4d3a'
          ctx.fillRect(ex + 7, ey + 9, 2, 1)
          ctx.fillStyle = palette.jacket
          ctx.fillRect(ex + 4, ey + 10, 8, 4)
          ctx.fillStyle = palette.shirt
          ctx.fillRect(ex + 6, ey + 10, 4, 4)
          ctx.fillStyle = palette.accent
          ctx.fillRect(ex + 3, ey + 10, 1, 3)
          ctx.fillRect(ex + 12, ey + 10, 1, 3)
          ctx.fillStyle = palette.legs
          ctx.fillRect(ex + 5, ey + 14, 2, 2)
          ctx.fillRect(ex + 9, ey + 14, 2, 2)
          ctx.fillStyle = '#2c2c2c'
          ctx.fillRect(ex + 5, ey + 15, 2, 1)
          ctx.fillRect(ex + 9, ey + 15, 2, 1)
        }
        
        if (e.type === 'sign') {
          // Wooden sign
          ctx.fillStyle = '#8B4513'
          ctx.fillRect(ex + 6, ey + 6, 4, 10)
          ctx.fillStyle = '#a0522d'
          ctx.fillRect(ex + 3, ey + 2, 10, 8)
          ctx.fillStyle = '#fff'
          ctx.font = '4px Arial'
          ctx.fillText('!', ex + 6, ey + 8)
        }
        
        if (e.type === 'item') {
          const itemKey = getEventKey(gs.map, e, e.item?.name || 'item')
          if ((gs.flags.collectedItems || []).includes(itemKey)) return

          // Item on ground with sparkle
          ctx.fillStyle = 'rgba(255,255,0,0.5)'
          ctx.beginPath()
          ctx.arc(ex + 8, ey + 8, 6 + Math.sin(currentTime / 100) * 2, 0, Math.PI * 2)
          ctx.fill()
          
          // Pokeball-like item
          ctx.fillStyle = '#f44336'
          ctx.beginPath()
          ctx.arc(ex + 8, ey + 8, 5, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(ex + 8, ey + 8, 5, 0, Math.PI, true)
          ctx.fill()
          ctx.fillStyle = '#333'
          ctx.fillRect(ex + 3, ey + 6, 10, 4)
        }
        
        if (e.type === 'heal') {
          // Healing circle
          const pulse = Math.sin(currentTime / 300) * 0.3 + 0.7
          ctx.fillStyle = `rgba(129,199,132,${pulse})`
          ctx.beginPath()
          ctx.arc(ex + 8, ey + 8, 8, 0, Math.PI * 2)
          ctx.fill()
        }
        
        if (e.type === 'shop') {
          // Door frame
          ctx.fillStyle = '#5d4037'
          ctx.fillRect(ex + 2, ey + 2, 12, 14)
          ctx.fillStyle = '#8d6e63'
          ctx.fillRect(ex + 4, ey + 4, 8, 10)
          
          // Shop sign
          ctx.fillStyle = '#ffeb3b'
          ctx.fillRect(ex + 1, ey - 2, 14, 5)
        }
        
        if (e.type === 'warp') {
          // Door/entrance
          ctx.fillStyle = indoor ? '#333' : '#5d4037'
          ctx.fillRect(ex + 2, ey + 2, 12, 14)
          ctx.fillStyle = indoor ? '#222' : '#8d6e63'
          ctx.fillRect(ex + 4, ey + 4, 8, 10)
        }
      }
    })

    // Draw player with shadow and animation
    const bobOffset = Math.sin(currentTime / 200) * 1
    const px = (gs.player.x - sx) * TILE
    const py = (gs.player.y - sy) * TILE
    const playerPalette = gs.player.gender === 'femmina'
      ? { hat: '#ef6c7e', hair: '#8b4d2f', jacket: '#ffffff', shirt: '#ef6c7e', legs: '#3c6dd0', accent: '#f6d2ae', bag: '#f2c16c' }
      : gs.player.gender === 'trans'
        ? { hat: '#57b9ff', hair: '#6f3dc4', jacket: '#ffd54f', shirt: '#ff76aa', legs: '#57b9ff', accent: '#f6d2ae', bag: '#f0c25e' }
        : { hat: '#d13b35', hair: '#5e2d18', jacket: '#f0c330', shirt: '#ffffff', legs: '#4f7fd0', accent: '#f6d2ae', bag: '#f1c36c' }
    
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.beginPath()
    ctx.ellipse(px + 8, py + 14, 5, 3, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(px + 4, py + 2 + bobOffset, 8, 1)
    ctx.fillRect(px + 3, py + 3 + bobOffset, 10, 1)
    ctx.fillStyle = playerPalette.hat
    ctx.fillRect(px + 4, py + 2 + bobOffset, 8, 3)
    ctx.fillRect(px + 3, py + 5 + bobOffset, 10, 1)
    ctx.fillStyle = playerPalette.hair
    ctx.fillRect(px + 4, py + 6 + bobOffset, 1, 2)
    ctx.fillRect(px + 11, py + 6 + bobOffset, 1, 2)
    ctx.fillStyle = playerPalette.accent
    ctx.fillRect(px + 5, py + 6 + bobOffset, 6, 4)
    ctx.fillStyle = '#1d1d1d'
    ctx.fillRect(px + 6, py + 7 + bobOffset, 1, 1)
    ctx.fillRect(px + 9, py + 7 + bobOffset, 1, 1)
    ctx.fillStyle = '#9c4d3a'
    ctx.fillRect(px + 7, py + 9 + bobOffset, 2, 1)
    ctx.fillStyle = playerPalette.jacket
    ctx.fillRect(px + 4, py + 10 + bobOffset, 8, 4)
    ctx.fillStyle = playerPalette.shirt
    ctx.fillRect(px + 6, py + 10 + bobOffset, 4, 4)
    ctx.fillStyle = playerPalette.bag
    ctx.fillRect(px + 3, py + 10 + bobOffset, 1, 3)
    ctx.fillRect(px + 12, py + 10 + bobOffset, 1, 3)
    ctx.fillStyle = playerPalette.legs
    ctx.fillRect(px + 5, py + 14 + bobOffset, 2, 2)
    ctx.fillRect(px + 9, py + 14 + bobOffset, 2, 2)
    ctx.fillStyle = '#3a3431'
    ctx.fillRect(px + 5, py + 15 + bobOffset, 2, 1)
    ctx.fillRect(px + 9, py + 15 + bobOffset, 2, 1)
  }, [gs])

  // Move player
  const move = useCallback((dir: string) => {
    try {
      const now = Date.now()
      if (now - lastMoveAtRef.current < 120) return
      if (inBattle || inDialog || inShop || inMenu || showOverlay || mapTransition || animating || !gameStarted || showStoryIntro || showPlayerSetup) return

      setGs(prev => {
        let nx = prev.player.x
        let ny = prev.player.y
        if (dir === 'up') ny--
        if (dir === 'down') ny++
        if (dir === 'left') nx--
        if (dir === 'right') nx++

        const map = MAPS[prev.map]
        if (!map?.tiles?.[ny] || typeof map.tiles[ny][nx] === 'undefined') return prev

        const tile = map.tiles[ny][nx]
        
        // Block on furniture and obstacles (tiles 9,10,11,12,13,17,18 are not walkable)
        const INDOOR_OBSTACLES = [9, 10, 11, 12, 13, 17, 18]
        if (INDOOR_OBSTACLES.includes(tile)) return prev
        
        if (!canMoveOnTile(tile, prev.vehicle)) return prev

        // Block on NPCs and other characters
        const npcBlocking = map.events?.find((e: MapEvent) => 
          (e.type === 'npc' || e.type === 'trainer' || e.type === 'gym' || e.type === 'gymLeader') && 
          typeof e.x === 'number' && typeof e.y === 'number' && 
          e.x === nx && e.y === ny
        )
        if (npcBlocking) return prev

        const warpEvent = map.events?.find((e: MapEvent) => 
          e.type === 'warp' && typeof e.x === 'number' && typeof e.y === 'number' && 
          e.x === nx && e.y === ny && e.dest
        )

        if (warpEvent) {
          const we = warpEvent as any
          setTimeout(() => {
            setMapTransition(true)
            setTimeout(() => {
              setGs(g => ({ ...g, map: we.dest, player: { ...g.player, x: we.dx, y: we.dy } }))
              setTimeout(() => setMapTransition(false), 160)
            }, 160)
          }, 50)
          return prev
        }

        return { ...prev, player: { ...prev.player, x: nx, y: ny } }
      })

      lastMoveAtRef.current = now
      soundManager.footstep()
    } catch (error) {
      console.error('Move failed:', error)
    }
  }, [animating, gameStarted, inBattle, inDialog, inMenu, inShop, mapTransition, showOverlay, showPlayerSetup, showStoryIntro])

  // Handle map events
  const handleEvent = useCallback((ev: MapEvent) => {
    const eventKey = getEventKey(gs.map, ev, ev.type)
    const giftKey = ev.gift ? `${eventKey}:gift:${ev.gift}` : ''
    const giftAlreadyReceived = giftKey ? (gs.flags.receivedGifts || []).includes(giftKey) : false
    const trainerKey = `${gs.map}:${ev.name || ev.npcId || 'trainer'}`
    const trainerAlreadyDefeated = (gs.flags.defeatedTrainers || []).includes(trainerKey)

    switch (ev.type) {
      case 'npc':
        if (gs.map === 'casa' && ev.name === 'Mamma' && !gs.flags.hasStarter) {
          setGs(prev => ({ ...prev, storyProgress: Math.max(prev.storyProgress, 2) }))
          setDialogs(gs.storyProgress < 2 ? [
            `${gs.player.name}, finalmente te sì in piedi.`,
            'Prima di uscire, controlla bene la stanza: qualche aiuto te farà comodo.',
            'Dopo va in laboratorio dal Dottor GheSboro. Oggi comincia davvero il tuo viaggio.',
          ] : [
            'Sei ancora qua?',
            'Vai dal Dottor GheSboro prima che scelga il tuo Besti per conto suo.',
          ])
          setSpeaker(ev.name || '')
          setDialogCallback(null)
          setInDialog(true)
        } else if (ev.givesStarter && !gs.flags.hasStarter) {
          setDialogs([
            'Finalmente te son rivà fin qua!',
            'I Besti di Venetia xe più agitati del solito, e qualcuno deve capirne il motivo.',
            'Non ti serve solo forza: ti serve testa, curiosità e un compagno giusto.',
            'Scegli il Besti che senti tuo, e portalo con dignità.',
          ])
          setSpeaker(ev.name || '')
          setDialogCallback(() => {
            setGs(prev => ({ ...prev, storyProgress: Math.max(prev.storyProgress, 3) }))
            setShowStarterChoice(true)
          })
          setInDialog(true)
        } else if (ev.dialog) {
          if (trainerAlreadyDefeated && (ev.team?.length || ev.badge)) {
            setDialogs([
              `${ev.name || 'Allenatore'}: Stavolta niente sfida.`,
              'Hai già dimostrato abbastanza. Continua pure il viaggio.',
            ])
            setSpeaker(ev.name || '')
            setDialogCallback(null)
            setInDialog(true)
            break
          }

          const dialogLines = [...ev.dialog]
          if (ev.gift === 'pokedex') {
            if (giftAlreadyReceived) {
              dialogLines.splice(0, dialogLines.length, 'Il PokeDioex te l\'ho già dato.', 'Adesso riempilo, non lasciarlo a far polvere.')
            } else {
              dialogLines.push('Tienilo stretto: ti aiuterà a capire chi hai incontrato e cosa ti manca ancora.')
            }
          }
          if (ev.gift === 'biciRubata') {
            if (giftAlreadyReceived) {
              dialogLines.splice(0, dialogLines.length, 'La bici te l\'ho già passata.', 'Se te la fai portar via, però, non torno a cercartene un\'altra.')
            } else {
              dialogLines.push('Pedala piano sui ponti, che non xe pista da corsa.')
            }
          }

          setDialogs(dialogLines)
          setSpeaker(ev.name || '')
          setDialogCallback(() => {
            if (ev.gift) {
              if (ev.gift === 'starter') {
                setShowStarterChoice(true)
                return
              }
              if (ev.gift === 'pokedex' && !giftAlreadyReceived) {
                addItemToInventory(ITEMS.pokedex)
                setGs(prev => ({
                  ...prev,
                  flags: { ...prev.flags, receivedGifts: [...(prev.flags.receivedGifts || []), giftKey] },
                }))
                setNotification('Ottenuto: PokeDioex!')
                return
              }
              if (ev.gift === 'biciRubata') {
                if (!giftAlreadyReceived) {
                  setGs(prev => ({
                    ...prev,
                    vehicle: 'biciRubata' as VehicleType,
                    flags: {
                      ...prev.flags,
                      hasBike: true,
                      receivedGifts: [...(prev.flags.receivedGifts || []), giftKey],
                    },
                  }))
                  setNotification('Ottenuto: Bici Rubata!')
                }
                return
              }
            }
          })
          setInDialog(true)
        }
        break
      case 'sign':
        setDialogs([ev.text || ''])
        setSpeaker('')
        setInDialog(true)
        break
      case 'warp':
        if (gs.map === 'casa' && ev.dest === 'canalborgo' && !gs.flags.hasStarter && gs.storyProgress < 2) {
          setDialogs([
            'Aspeta un secondo.',
            'Prima parla con la Mamma che xe vegnua in camera a sveiarte.',
          ])
          setSpeaker('Narratore')
          setInDialog(true)
          break
        }
        setMapTransition(true)
        setTimeout(() => {
          setGs(prev => ({ ...prev, map: ev.dest!, player: { ...prev.player, x: ev.dx!, y: ev.dy! } }))
          setTimeout(() => setMapTransition(false), 160)
        }, 160)
        break
      case 'heal':
        setGs(prev => ({
          ...prev,
          party: prev.party.map(p => ({ ...p, hp: p.maxHp, status: undefined })),
        }))
        soundManager.heal()
        setDialogs(['I tuoi Besti sono stati curati!'])
        setSpeaker('Infermiera')
        setInDialog(true)
        break
      case 'shop':
        if (ev.items) {
          setCurrentShopItems(ev.items.map(i => ITEMS[i.name.toLowerCase().replace(/ /g, '')]).filter(Boolean))
        } else {
          setCurrentShopItems(SHOP_ITEMS.basics)
        }
        setInShop(true)
        break
      case 'gym':
        if (gs.player.badges.includes(ev.badge!)) {
          setDialogs(['Hai già questo badge!'])
          setSpeaker('')
          setInDialog(true)
        } else if (trainerAlreadyDefeated) {
          setDialogs(['Hai già vinto questa sfida.', 'Torna pure quando vuoi, ma il badge ormai è tuo.'])
          setSpeaker(ev.name || '')
          setInDialog(true)
        } else {
          startTrainerBattle(ev)
        }
        break
      case 'trainer':
        if (trainerAlreadyDefeated) {
          setDialogs([
            `${ev.name || 'Allenatore'}: Mi ricordo ancora l’ultima batosta.`,
            'Per oggi passo.',
          ])
          setSpeaker(ev.name || '')
          setInDialog(true)
        } else {
          startTrainerBattle(ev)
        }
        break
    }
  }, [addItemToInventory, getEventKey, gs])

  // Automatic tile events only
  const checkAutoEvents = useCallback(() => {
    const map = MAPS[gs.map]
    
    // Item pickup
    const itemEv = map.events?.find((e: MapEvent) => e.type === 'item' && typeof e.x === 'number' && typeof e.y === 'number' && e.x === gs.player.x && e.y === gs.player.y)
    if (itemEv && itemEv.item) {
      const itemKey = getEventKey(gs.map, itemEv, itemEv.item.name)
      if (!(gs.flags.collectedItems || []).includes(itemKey)) {
        const foundItem = ITEMS[itemEv.item.name.toLowerCase().replace(/ /g, '')] || Object.values(ITEMS).find(i => i.name === itemEv.item!.name)
        if (foundItem) {
          addItemToInventory(foundItem)
          setGs(prev => ({
            ...prev,
            flags: {
              ...prev.flags,
              collectedItems: [...(prev.flags.collectedItems || []), itemKey],
            },
          }))
          soundManager.itemFound()
          setNotification(`Trovato: ${foundItem.name}!`)
          setTimeout(() => setNotification(''), 2000)
        }
      }
    }

    const ev = map.events?.find((e: MapEvent) => {
      if (e.type === 'warp' || e.type === 'heal' || e.type === 'shop') {
        if (typeof e.x !== 'number' || typeof e.y !== 'number') return false
        return e.x === gs.player.x && e.y === gs.player.y
      }
      return false
    })

    if (ev) handleEvent(ev)
  }, [addItemToInventory, getEventKey, gs, handleEvent])

  // Manual interaction with A button
  const checkInteractionEvents = useCallback(() => {
    const map = MAPS[gs.map]

    const ev = map.events?.find((e: MapEvent) => {
      if (e.type === 'npc' || e.type === 'trainer' || e.type === 'gym' || e.type === 'sign') {
        if (typeof e.x !== 'number' || typeof e.y !== 'number') return false
        return Math.abs(e.x - gs.player.x) + Math.abs(e.y - gs.player.y) <= 1
      }
      return false
    })

    if (ev) handleEvent(ev)
  }, [gs, handleEvent])

  // Advance dialog
  const advanceDialog = useCallback(() => {
    if (dialogs.length === 0) {
      setInDialog(false)
      if (dialogCallback) {
        dialogCallback()
        setDialogCallback(null)
      }
      return
    }
    soundManager.dialogText()
    setDialogs(dialogs.slice(1))
  }, [dialogs, dialogCallback])

  // Select starter - RIVAL always picks the strongest (like in Pokemon)
  const selectStarter = useCallback((id: string) => {
    soundManager.menuSelect()
    const b = createBesti(id, 5)
    
    // Rival picks the strongest legendary (OmbraSpritz = index 3)
    const rivalStarter = createBesti('ombradriz', 5)
    
    setGs(prev => ({
      ...prev,
      party: [...prev.party, b],
      rival: rivalStarter,
      flags: { ...prev.flags, hasStarter: true },
      storyProgress: Math.max(prev.storyProgress, 4),
    }))
    
    setShowStarterChoice(false)
    setDialogs([
      `Hai scelto ${b.name}!`,
      `Marco: Come osi! Io prendo ${rivalStarter.name}!`,
      `Marco: Il più forte, ovviamente.`,
      `Prof. GheSboro: Bene. Adesso vediamo se contano più le chiacchiere o l'intesa col proprio Besti.`,
      `Marco: Preparati, perché non ti regalo niente!`,
    ])
    setSpeaker('Marco')
    setDialogCallback(() => {
      // Start rival battle
      setBattleState({
        enemy: rivalStarter,
        enemyTeam: [rivalStarter],
        enemyIdx: 0,
        isWild: false,
        over: false,
        trainerName: 'Marco',
      })
      setPlayerHp({ current: b.hp, max: b.maxHp })
      setEnemyHp({ current: rivalStarter.hp, max: rivalStarter.maxHp })
      setInDialog(false)
      setInBattle(true)
      setBattleMsg(`Marco vuole combattere!`)
      setShowBattleMsg(true)
    })
    setInDialog(true)
  }, [createBesti])

  // Start wild encounter
  const startWild = useCallback(() => {
    if (!gs.party.length) return
    const map = MAPS[gs.map]
    const idx = Math.floor(Math.random() * (map.wild?.length || 1))
    const wildId = map.wild?.[idx] || 'gabbianzo'
    const minLvl = map.wildLvl?.[idx] || 3
    const lvl = minLvl + Math.floor(Math.random() * 3)
    const enemy = createBesti(wildId, lvl)

    setBattleState({
      enemy,
      enemyTeam: [enemy],
      enemyIdx: 0,
      isWild: true,
      over: false,
    })
    setPlayerHp({ current: gs.party[0].hp, max: gs.party[0].maxHp })
    setEnemyHp({ current: enemy.hp, max: enemy.maxHp })
    setInBattle(true)
    soundManager.encounter()
    setBattleMsg(`Un ${enemy.name} selvatico è apparso!`)
    setShowBattleMsg(true)
  }, [gs.party, createBesti])

  // Start trainer battle
  const startTrainerBattle = useCallback((ev: MapEvent) => {
    if (!gs.party.length) return
    const team = (ev.team || []).map((t: { id: string; lvl: number }) => createBesti(t.id, t.lvl))
    setBattleState({
      enemy: team[0],
      enemyTeam: team,
      enemyIdx: 0,
      isWild: false,
      over: false,
      badge: ev.badge,
      trainerName: ev.name,
    })
    setDialogs(ev.dialog || [`${ev.name} vuole combattere!`])
    setSpeaker(ev.name || '')
    setDialogCallback(() => {
      setPlayerHp({ current: gs.party[0].hp, max: gs.party[0].maxHp })
      setEnemyHp({ current: team[0].hp, max: team[0].maxHp })
      setInBattle(true)
    })
    setInDialog(true)
  }, [gs.party, createBesti])

  // Calculate damage
  const calcDmg = useCallback((a: PartyBestia, d: PartyBestia, m: string): number => {
    const moveData = MOVES[m]
    if (!moveData) return 30
    
    let p = moveData.power
    let eff = 1
    a.types.forEach(at => {
      const c = TYPE_CHART[at]
      if (c?.weakTo?.includes(d.types[0])) eff *= 2
      if (c?.strong?.includes(d.types[0])) eff *= 0.5
    })
    const crit = Math.random() < 0.1 ? 1.5 : 1
    return Math.floor((a.level * 0.4 + 2) * p * (a.atk / d.def) * eff * crit / 50 + 2)
  }, [])

  // Use move
  const useMove = useCallback((i: number) => {
    if (!battleState || !gs.party[0] || animating) return
    setAnimating(true)
    setMovesOpen(false)
    setBattleAnimation('attack')
    
    const m = gs.party[0].moves[i]
    const dmg = calcDmg(gs.party[0], battleState.enemy, m)
    const moveData = MOVES[m]

    setBattleMsg(`${gs.party[0].name} usa ${m}! -${dmg}`)
    setShowBattleMsg(true)
    soundManager.battleAttack()

    const newEnemyHp = Math.max(0, enemyHp.current - dmg)
    setEnemyHp({ ...enemyHp, current: newEnemyHp })

    setTimeout(() => {
      setBattleAnimation('damage')
      setShakeScreen(true)
      setTimeout(() => setShakeScreen(false), 200)
      
      if (newEnemyHp <= 0) {
        setBattleAnimation('idle')
        enemyFainted()
      } else {
        setTimeout(() => {
          enemyTurn()
          setBattleAnimation('idle')
        }, 300)
      }
    }, 400)
  }, [battleState, gs.party, animating, calcDmg, enemyHp])

  // Enemy turn
  const enemyTurn = useCallback(() => {
    if (!battleState) return
    const m = battleState.enemy.moves[Math.floor(Math.random() * battleState.enemy.moves.length)]
    const dmg = calcDmg(battleState.enemy, gs.party[0], m)
    const newPlayerHp = Math.max(0, playerHp.current - dmg)
    setPlayerHp({ ...playerHp, current: newPlayerHp })
    setBattleMsg(`${battleState.enemy.name} usa ${m}! -${dmg}`)
    setShowBattleMsg(true)
    soundManager.battleDamage()

    setTimeout(() => {
      if (newPlayerHp <= 0) {
        playerFainted()
      } else {
        setShowBattleMsg(false)
        setAnimating(false)
      }
    }, 800)
  }, [battleState, gs.party, playerHp, calcDmg])

  // Enemy fainted
  const enemyFainted = useCallback(() => {
    const exp = battleState!.enemy.level * 10 + 20
    const money = battleState!.enemy.level * 5

    setBattleMsg(`${battleState!.enemy.name} è stato sconfitto! +${exp} EXP`)
    soundManager.battleVictory()
    
    // Check if it was the rival battle
    const isRivalBattle = battleState?.trainerName === 'Marco' && !gs.defeatedRival
    
    // Add exp to party
    setGs(prev => ({
      ...prev,
      party: prev.party.map((p, idx) => idx === 0 ? { ...p, exp: p.exp + exp } : p),
      player: { ...prev.player, money: prev.player.money + money },
      defeatedRival: isRivalBattle ? true : prev.defeatedRival,
      flags: {
        ...prev.flags,
        defeatedRival: isRivalBattle ? true : prev.flags.defeatedRival,
      },
    }))

    // Check for level up
    setTimeout(() => checkLevelUp(), 500)
  }, [battleState, gs.defeatedRival])

  // Check for level up
  const checkLevelUp = useCallback(() => {
    const p = gs.party[0]
    if (p && p.exp >= p.expTL) {
      const newLvl = p.level + 1
      const newExpTL = newLvl * 100
      const lf = newLvl / 50
      const pData = BESTI[p.id]
      const newHp = Math.floor((pData?.bs.hp || 50) * lf + 10 + newLvl)
      const newAtk = Math.floor((pData?.bs.atk || 50) * lf + 5)
      const newDef = Math.floor((pData?.bs.def || 50) * lf + 5)
      const newSpd = Math.floor((pData?.bs.spd || 50) * lf + 5)

      setGs(prev => ({
        ...prev,
        party: prev.party.map((b, idx) => idx === 0 ? {
          ...b,
          level: newLvl,
          exp: p.exp - p.expTL,
          expTL: newExpTL,
          hp: b.hp + (newHp - b.maxHp),
          maxHp: newHp,
          atk: newAtk,
          def: newDef,
          spd: newSpd,
        } : b),
      }))

      setBattleMsg(`${p.name} è salito al livello ${newLvl}!`)
      soundManager.levelUp()
      
      // Check for evolution
      const bestiaData = BESTI[p.id]
      if (bestiaData?.ev && newLvl >= (bestiaData?.evLvl || 99)) {
        setTimeout(() => evolveBestia(String(p.id), bestiaData.ev!), 1000)
      }
    } else {
      continueBattle()
    }
  }, [gs.party])

  // Evolve Bestia
  const evolveBestia = useCallback((fromId: string, toId: string) => {
    const newBesti = createBesti(toId, gs.party[0].level)
    setGs(prev => ({
      ...prev,
      party: prev.party.map((b, idx) => idx === 0 ? { ...b, ...newBesti, id: newBesti.id } : b),
    }))
    setBattleMsg(`${gs.party[0].name} si è evoluto in ${newBesti.name}!`)
    soundManager.evolve()
    setTimeout(() => continueBattle(), 1500)
  }, [gs.party, createBesti])

  // Continue battle
  const continueBattle = useCallback(() => {
    if (battleState!.isWild) {
      setInBattle(false)
      setShowBattleMsg(false)
      setAnimating(false)
      setGs(prev => ({
        ...prev,
        flags: { ...prev.flags, battlesWon: (prev.flags.battlesWon || 0) + 1 },
      }))
    } else {
      const nextIdx = battleState!.enemyIdx + 1
      
      // Check if it was rival battle
      if (battleState!.trainerName === 'Marco' && nextIdx === battleState!.enemyTeam.length) {
        setBattleMsg(`Hai vinto contro Marco!`)
        setGs(prev => ({
          ...prev,
          flags: {
            ...prev.flags,
            battlesWon: (prev.flags.battlesWon || 0) + 1,
            defeatedTrainers: [...new Set([...(prev.flags.defeatedTrainers || []), `${prev.map}:Marco`])],
          },
        }))
        setTimeout(() => {
          setInBattle(false)
          setShowBattleMsg(false)
          setAnimating(false)
          setDialogs([
            `Marco: BEL COMBATTIMENTO!`,
            `Marco: Sei più forte di quello che pensavo!`,
            `Marco: Ma non mollare! Ci rivedremo presto!`,
            `Marco: Nel frattempo, allenati e diventa più forte!`,
            `Marco: Io andrò avanti per primo! Ciao!`,
            ``,
            `Ora sei libero di esplorare CANALBORGO!`,
            `Vai verso nord per raggiungere SPRITZIA!`,
            `Lì troverai il primo GYM della regione!`,
          ])
          setSpeaker('Narratore')
          setInDialog(true)
        }, 1500)
        return
      }
      
      if (nextIdx < battleState!.enemyTeam.length) {
        const nextEnemy = battleState!.enemyTeam[nextIdx]
        setBattleState({ ...battleState!, enemy: nextEnemy, enemyIdx: nextIdx })
        setEnemyHp({ current: nextEnemy.hp, max: nextEnemy.maxHp })
        setBattleMsg(`Vai! ${nextEnemy.name}!`)
      } else {
        const reward = battleState!.enemyTeam.reduce((s, b) => s + b.level, 0) * 10
        
        // Check if this is the final champion battle
        if (battleState!.trainerName === 'DUX VENETIAE') {
          soundManager.badgeGet()
          setBattleMsg(`HAI SCONFITTO IL DUX!`)
          unlockAchievement('champion')
          setTimeout(() => {
            setBattleMsg(`COMPLIMENTS! SEI IL NUOVO CAMPIONE DI VENETIA!`)
            setTimeout(() => {
              setInBattle(false)
              setShowBattleMsg(false)
              setAnimating(false)
              setDialogs([
                ``,
                `★★★ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ★★★`,
                ``,
                `COMPLIMENTS!`,
                `HAI COMPLETATO POKEMONA - BESTI DI VENETIA!`,
                ``,
                `Sei ufficialmente il nuovo DUCE di Venetia!`,
                `I migliori allenatori ti omaggeranno!`,
                ``,
                `Grazie per aver giocato!`,
                ``,
                `★★★ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ★★★`,
              ])
              setSpeaker('Narratore')
              setInDialog(true)
              unlockAchievement('elite_four_complete')
            }, 2000)
          }, 2000)
          return
        }
        
        // Check if this is an Elite battle
        if (['Il Fuocoso', "L'Acquoso", 'Il Naturale', 'Il Magico'].includes(battleState!.trainerName || '')) {
          soundManager.success()
          setBattleMsg(`Hai sconfitto ${battleState!.trainerName}!`)
          setGs(prev => ({
            ...prev,
            player: { ...prev.player, money: prev.player.money + reward, badges: ['league_pass', ...prev.player.badges] },
            flags: {
              ...prev.flags,
              battlesWon: (prev.flags.battlesWon || 0) + 1,
              defeatedTrainers: battleState!.trainerName
                ? [...new Set([...(prev.flags.defeatedTrainers || []), `${prev.map}:${battleState!.trainerName}`])]
                : prev.flags.defeatedTrainers,
            },
          }))
          setTimeout(() => {
            setInBattle(false)
            setShowBattleMsg(false)
            setAnimating(false)
            setDialogs([
              `${battleState!.trainerName}: Sei forte...`,
              `Ma gli altri Elite sono più forti di me!`,
              `Continua il tuo cammino!`,
            ])
            setSpeaker(battleState!.trainerName || '')
            setInDialog(true)
          }, 1500)
          return
        }
        
        soundManager.coin()
        setBattleMsg(`Hai vinto! +₿${reward}`)
        setGs(prev => ({
          ...prev,
          player: { ...prev.player, money: prev.player.money + reward, badges: battleState!.badge ? [...prev.player.badges, battleState!.badge!] : prev.player.badges },
          flags: {
            ...prev.flags,
            battlesWon: (prev.flags.battlesWon || 0) + 1,
            defeatedTrainers: battleState!.trainerName
              ? [...new Set([...(prev.flags.defeatedTrainers || []), `${prev.map}:${battleState!.trainerName}`])]
              : prev.flags.defeatedTrainers,
          },
        }))
        
        if (battleState!.badge) {
          soundManager.badgeGet()
          setTimeout(() => {
            setBattleMsg(`Hai ottenuto il ${battleState!.badge}!`)
            setTimeout(() => {
              setInBattle(false)
              setShowBattleMsg(false)
              setAnimating(false)
            }, 1500)
          }, 1500)
        } else {
          setTimeout(() => {
            setInBattle(false)
            setShowBattleMsg(false)
            setAnimating(false)
          }, 1500)
        }
      }
    }
  }, [battleState])

  // Player Bestia fainted
  const playerFainted = useCallback(() => {
    setBattleMsg(`${gs.party[0].name} è esausto!`)
    setTimeout(() => {
      setInBattle(false)
      setShowBattleMsg(false)
      setAnimating(false)
      setGs(prev => ({
        ...prev,
        party: prev.party.map(p => ({ ...p, hp: p.maxHp })),
      }))
    }, 1500)
  }, [gs.party])

  // Cycle through battle options (fight/bag/run)
  const cycleBattleOption = useCallback(() => {
    setBattleOption(prev => (prev + 1) % 4)
  }, [])

  // Select battle action
  const selectBattleAction = useCallback((selection: number) => {
    setMovesOpen(false)
    switch (selection) {
      case 0: // Fight
        setMovesOpen(true)
        break
      case 1: // Move (open moves)
        setMovesOpen(true)
        break
      case 2: // Item
        setShowBallSelect(true)
        break
      case 3: // Run
        if (!battleState?.isWild) {
          setBattleMsg('Non puoi fuggire da un trainer!')
          setShowBattleMsg(true)
        } else {
          setBattleMsg('Fuggito!')
          setInBattle(false)
          setShowBattleMsg(false)
        }
        break
    }
  }, [battleState])

  // Calculate capture rate based on ball type
  const getCaptureRate = useCallback((ballId: string, enemyHp: number, enemyMaxHp: number, enemy: PartyBestia): number => {
    const hpRatio = enemyHp / enemyMaxHp
    let baseRate = (1 - hpRatio) * 0.6 + 0.1
    
    switch (ballId) {
      case 'dogeball':
        return 1.0 // 100% capture
      case 'carnevaleball':
        return 0.95 // 95% capture
      case 'dragoball':
        baseRate += enemy.types?.includes('drago') ? 0.4 : 0
        break
      case 'graticciaball':
        baseRate += enemy.types?.includes('magia') ? 0.4 : 0
        break
      case 'serenaball':
        baseRate += enemy.types?.includes('psico') ? 0.4 : 0
        break
      case 'fantasmaball':
        baseRate += enemy.types?.includes('ombra') ? 0.4 : 0
        break
      case 'scampaball':
        baseRate += enemy.types?.includes('acqua') ? 0.3 : 0
        break
      case 'montagnaball':
        baseRate += enemy.types?.includes('ghiaccio') ? 0.3 : 0
        break
      case 'vinoball':
        baseRate += enemy.types?.includes('terra') ? 0.3 : 0
        break
      case 'aereoball':
        baseRate += enemy.types?.includes('aria') ? 0.3 : 0
        break
      case 'polentaball':
        baseRate += hpRatio < 0.3 ? 0.3 : 0 // Better when enemy is weak
        break
      case 'spritzball':
        // Bonus at dusk (we'll simplify to always give small bonus)
        baseRate += 0.15
        break
      case 'lagunaball':
        baseRate += 0.2 // Water zone bonus
        break
      case 'mascheraball':
        baseRate += 0.1 // Night bonus
        break
    }
    
    // Legendary bonus
    if (enemy.isLegendary) {
      baseRate *= 0.3
    }
    
    return Math.min(baseRate, 0.99)
  }, [])

  // Try capture with ball selection
  const tryCaptureWithBall = useCallback((ballId: string) => {
    if (!battleState?.isWild) return
    
    const ballItem = gs.inv.find(i => i.item.id === ballId)
    if (!ballItem || ballItem.qty <= 0) {
      setBattleMsg(`Non hai ${ballItem?.item.name || 'questa ball'}!`)
      setShowBattleMsg(true)
      return
    }
    
    const ball = ITEMS[ballId]
    const ballName = ball?.name || ballId
    const rate = getCaptureRate(ballId, enemyHp.current, enemyHp.max, battleState.enemy)
    
    setBattleMsg(`Lancia ${ballName}...`)
    setShowBattleMsg(true)
    soundManager.ballThrow()
    setBattleAnimation('capturing')
    
    setTimeout(() => {
        if (Math.random() < rate) {
        const caught = { ...battleState.enemy }
        if (gs.party.length < 6) {
          setGs(prev => ({
            ...prev,
            party: [...prev.party, caught],
            flags: {
              ...prev.flags,
              caughtBesti: [...(prev.flags.caughtBesti || []), caught.id],
            },
            inv: prev.inv.map(i => i.item.id === ballId ? { ...i, qty: i.qty - 1 } : i)
          }))
        } else {
          setGs(prev => ({
            ...prev,
            pc: [...prev.pc, caught],
            flags: {
              ...prev.flags,
              caughtBesti: [...(prev.flags.caughtBesti || []), caught.id],
            },
            inv: prev.inv.map(i => i.item.id === ballId ? { ...i, qty: i.qty - 1 } : i)
          }))
        }
        soundManager.captureSuccess()
        setNotification(`Hai catturato ${battleState.enemy.name}!`)
        setInBattle(false)
        setShowBattleMsg(false)
        setBattleAnimation('idle')
      } else {
        setBattleMsg('È fuggito!')
        soundManager.captureFail()
        setTimeout(() => {
          setInBattle(false)
          setShowBattleMsg(false)
          setBattleAnimation('idle')
        }, 1000)
      }
    }, 2000)
  }, [battleState, gs.inv, gs.party, enemyHp, getCaptureRate])

  // Legacy capture function - uses first available ball
  const tryCapture = useCallback(() => {
    if (!battleState?.isWild) return
    const balls = gs.inv.find(i => i.item.type === 'capture')
    if (!balls || balls.qty <= 0) {
      setBattleMsg('Senza Capture Ball!')
      return
    }
    tryCaptureWithBall(balls.item.id)
  }, [battleState, gs.inv, tryCaptureWithBall])

  // Try run
  const tryRun = useCallback(() => {
    if (!battleState?.isWild) {
      setBattleMsg("Non puoi scappare!")
      return
    }
    if (Math.random() < 0.7) {
      setInBattle(false)
      setShowBattleMsg(false)
    } else {
      setBattleMsg("Non riesci!")
      setTimeout(() => enemyTurn(), 800)
    }
  }, [battleState, enemyTurn])

  // Menu functions
  const showMoves = () => setMovesOpen(true)

  const showBag = () => {
    setOverlayTitle(`ZAINO - ₿${gs.player.money}`)
    setOverlayContent(
      <div className="menu-grid">
        {gs.inv.map((inv, i) => (
          <div key={i} className="menu-item" onClick={() => useItemFromMenu(inv.item)}>
            <span className="item-icon">
              {inv.item.type === 'stone' ? '💎' : inv.item.type === 'capture' ? '⚪' : inv.item.type === 'heal' ? '❤️' : '📦'}
            </span>
            <span>{inv.item.name}</span>
            <span className="item-qty">x{inv.qty}</span>
            {inv.item.type === 'stone' && gs.party[0] && canEvolveWithStone(gs.party[0].id, inv.item.id) && (
              <span className="item-hint">✨</span>
            )}
          </div>
        ))}
      </div>
    )
    setShowOverlay(true)
  }

  const useItemFromMenu = (item: GameItem) => {
    if (item.type === 'heal' && gs.party[0]) {
      const healAmt = item.val || 20
      const newHp = Math.min(gs.party[0].maxHp, gs.party[0].hp + healAmt)
      setGs(prev => ({
        ...prev,
        party: prev.party.map((p, i) => i === 0 ? { ...p, hp: newHp } : p),
        inv: prev.inv.map(i => i.item.name === item.name ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0)
      }))
      setPlayerHp({ current: newHp, max: gs.party[0].maxHp })
      setNotification(`${gs.party[0].name} recupera ${healAmt} PS!`)
      setShowOverlay(false)
    }
    
    // Stone evolution
    if (item.type === 'stone' && gs.party[0]) {
      const bestia = gs.party[0]
      if (canEvolveWithStone(bestia.id, item.id)) {
        useStone(item, bestia)
        setShowOverlay(false)
      } else {
        setNotification(`${bestia.name} non può usare questa pietra!`)
        setTimeout(() => setNotification(''), 2000)
      }
    }
  }

  const showParty = () => {
    setOverlayTitle('SQUADRA')
    setOverlayContent(
      <div className="party-list">
        {gs.party.map((b, i) => (
          <div key={i} className="party-member">
            <img 
              src={getBestiaIcon(b.id)} 
              className="party-sprite" 
              alt={b.name}
              style={{ background: TYPE_COLORS[b.types[0]] }}
            />
            <div className="party-info">
              <div className="party-name">{b.name}</div>
              <div className="party-level">Lv.{b.level}</div>
              <div className="hp-bar-mini">
                <div className="hp-fill-mini" style={{ width: `${(b.hp / b.maxHp) * 100}%` }}></div>
              </div>
              <div className="party-hp-text">{b.hp}/{b.maxHp} PS</div>
            </div>
          </div>
        ))}
      </div>
    )
    setShowOverlay(true)
  }

  const showPokedex = () => {
    const caughtBesti = gs.flags.caughtBesti || []
    const allBesti = Object.values(BESTI)
    
    // Mostra tutti i besti, evidenziando quelli catturati
    setOverlayTitle(`BESTIDEX ${caughtBesti.length}/${allBesti.length}`)
    setOverlayContent(
      <div className="dex-full">
        <div className="dex-list">
          {allBesti.map(b => {
            const isCaught = caughtBesti.includes(b.id)
            return (
              <div 
                key={b.id} 
                className={`dex-row ${isCaught ? 'caught' : 'uncaught'}`}
                onClick={() => {
                  if (isCaught) {
                    // Mostra dettagli
                    const evol = b.ev ? BESTI[b.ev] : null
                    setOverlayContent(
                      <div className="dex-detail">
                        <div className="dex-detail-header">
                          <img src={getBestiaIcon(b.id)} className="dex-detail-sprite" alt={b.name} />
                          <div className="dex-detail-info">
                            <div className="dex-detail-name">{b.name}</div>
                            <div className="dex-detail-num">#{String(b.id).padStart(3, '0')}</div>
                            <div className="dex-detail-types">{b.types.map(t => <span key={t} className={`type-badge type-${t}`}>{t}</span>)}</div>
                          </div>
                        </div>
                        <div className="dex-detail-desc">{b.desc}</div>
                        <div className="dex-detail-stats">
                          <div className="stat-row"><span>HP</span><span>{b.bs.hp}</span></div>
                          <div className="stat-row"><span>ATK</span><span>{b.bs.atk}</span></div>
                          <div className="stat-row"><span>DEF</span><span>{b.bs.def}</span></div>
                          <div className="stat-row"><span>SPD</span><span>{b.bs.spd}</span></div>
                        </div>
                        {b.ev && <div className="dex-detail-ev">Evoluzione: {b.ev} (livello {b.evLvl})</div>}
                        {b.evItem && <div className="dex-detail-ev">Evoluzione: {b.evItem}</div>}
                        <div className="dex-detail-moves">Mosse: {b.moves.join(', ')}</div>
                        <button className="back-btn" onClick={() => showPokedex()}>← Indietro</button>
                      </div>
                    )
                  }
                }}
              >
                <span className="dex-num">#{String(b.id).padStart(3, '0')}</span>
                <img src={isCaught ? getBestiaIcon(b.id) : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect fill="%23333" width="24" height="24"/><text x="12" y="16" text-anchor="middle" fill="%23666" font-size="10">?</text></svg>'} className="dex-icon" alt="" />
                <span className="dex-name">{isCaught ? b.name : '???'}</span>
                <span className="dex-types">{b.types.map(t => <span key={t} className={`type-badge type-${t}`}>{t}</span>)}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
    setShowOverlay(true)
  }

  const showSave = () => {
    saveGame()
    setShowOverlay(false)
    setInMenu(false)
  }

  // ═══════════════════════════════════════════════════════════════════
  // ACHIEVEMENT SYSTEM
  // ═══════════════════════════════════════════════════════════════════
  
  const unlockAchievement = (achievementId: string) => {
    if (achievements.includes(achievementId)) return // Already unlocked
    const achievement = ACHIEVEMENTS[achievementId]
    if (!achievement) return
    
    setAchievements(prev => [...prev, achievementId])
    setCurrentAchievement(achievement)
    setShowAchievement(true)
    
    // Apply rewards
    if (achievement.reward?.money) {
      setGs(prev => ({ ...prev, player: { ...prev.player, money: prev.player.money + achievement.reward!.money! } }))
    }
    if (achievement.reward?.item) {
      const item = ITEMS[achievement.reward.item]
      if (item) {
        setGs(prev => ({
          ...prev,
          inv: [...prev.inv, { item, qty: 1 }]
        }))
      }
    }
    
    // Auto-hide after 3 seconds
    setTimeout(() => setShowAchievement(false), 3000)
    soundManager.success()
  }

  const showAchievements = () => {
    setOverlayTitle('TROFEI')
    setOverlayContent(
      <div className="achievements-list">
        {Object.values(ACHIEVEMENTS).map(ach => (
          <div key={ach.id} className={`achievement-item ${achievements.includes(ach.id) ? 'unlocked' : 'locked'}`}>
            <span className="achievement-icon">{ach.icon}</span>
            <div className="achievement-info">
              <div className="achievement-name">{ach.name}</div>
              <div className="achievement-desc">{ach.desc}</div>
            </div>
            {achievements.includes(ach.id) && <span className="achievement-check">✓</span>}
          </div>
        ))}
      </div>
    )
    setShowOverlay(true)
    setInMenu(false)
  }

  // Check achievements based on game state
  const checkAchievements = () => {
    const caught = gs.pc.length + gs.party.length
    const battlesWon: number = gs.flags.battlesWon ?? 0
    
    if (battlesWon >= 1) unlockAchievement('first_battle')
    if (battlesWon >= 10) unlockAchievement('ten_battles')
    if (battlesWon >= 50) unlockAchievement('fifty_battles')
    if (caught >= 1) unlockAchievement('first_capture')
    if (caught >= 10) unlockAchievement('ten_captures')
    if (caught >= 25) unlockAchievement('twenty_five_captures')
    if (caught >= 50) unlockAchievement('fifty_captures')
    if (gs.player.badges.length >= 1) unlockAchievement('first_badge')
    if (gs.player.badges.length >= 5) unlockAchievement('five_badges')
    if (gs.player.badges.length >= 8) unlockAchievement('all_badges')
    if (gs.flags.defeatedRival) unlockAchievement('rival_defeated')
  }

  useEffect(() => {
    if (!gameStarted || showStoryIntro) return
    checkAchievements()
  }, [achievements, gameStarted, gs.flags.battlesWon, gs.flags.defeatedRival, gs.party.length, gs.pc.length, gs.player.badges.length, showStoryIntro])

  // ═══════════════════════════════════════════════════════════════════
  // STONE EVOLUTION SYSTEM
  // ═══════════════════════════════════════════════════════════════════

  const useStone = (item: GameItem, bestia: PartyBestia) => {
    if (item.type !== 'stone') return
    
    const newForm = getStoneEvolution(bestia.id, item.id)
    if (!newForm) {
      setNotification(`${bestia.name} non può evolversi con ${item.name}!`)
      setTimeout(() => setNotification(''), 2000)
      return
    }
    
    const evolved = BESTI[newForm]
    if (!evolved) return
    
    // Show evolution animation
    setEvolvingBestia({ ...bestia })
    setShowEvolve(true)
    
    setTimeout(() => {
      // Perform evolution
      setGs(prev => ({
        ...prev,
        party: prev.party.map(p => p === bestia ? {
          ...p,
          id: BESTI[newForm]?.id ?? p.id,
          name: evolved.name,
          types: evolved.types,
          maxHp: Math.floor(evolved.bs.hp * 1.5),
          hp: Math.min(Math.floor(evolved.bs.hp * 1.5), p.hp),
          atk: Math.floor(evolved.bs.atk * 1.5),
          def: Math.floor(evolved.bs.def * 1.5),
          spd: Math.floor(evolved.bs.spd * 1.5),
          moves: evolved.moves,
        } : p),
        inv: prev.inv.map(i => i.item.name === item.name ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0)
      }))
      
      setShowEvolve(false)
      setNotification(`${bestia.name} si evolve in ${evolved.name}!`)
      unlockAchievement('first_evolution')
      setTimeout(() => setNotification(''), 3000)
      soundManager.evolution()
    }, 2000)
  }

  const canUseStoneOn = (item: GameItem, bestia: PartyBestia): boolean => {
    if (item.type !== 'stone') return false
    return canEvolveWithStone(bestia.id, item.id)
  }

  const showLoad = () => {
    if (hasSave()) {
      setOverlayTitle('CARICA PARTITA')
      setOverlayContent(
        <div className="save-load-menu">
          <p className="save-load-info">Clicca per caricare la partita salvata.</p>
          <button className="save-load-btn load-btn" onClick={() => { loadGame(); setShowOverlay(false); setInMenu(false); }}>
            CARICA
          </button>
          <button className="save-load-btn delete-btn" onClick={() => { deleteSave(); setShowOverlay(false); setInMenu(false); }}>
            ELIMINA SALVATAGGIO
          </button>
        </div>
      )
      setShowOverlay(true)
      setInMenu(false)
    } else {
      setNotification('Nessun salvataggio trovato!')
      setTimeout(() => setNotification(''), 2000)
    }
  }

  const showTeleport = () => {
    soundManager.menuSelect()
    const unlockedLocations = TELEPORT_LOCATIONS.filter(loc => 
      isLocationUnlocked(loc, gs.player.badges, gs.storyProgress)
    )
    
    setOverlayTitle('TELEPORTO')
    setOverlayContent(
      <div className="teleport-list">
        {unlockedLocations.length === 0 ? (
          <div className="teleport-empty">Nessuna località disponibile</div>
        ) : (
          unlockedLocations.map(loc => (
            <div 
              key={loc.id} 
              className={`teleport-item ${gs.map === loc.map ? 'current' : ''}`}
              onClick={() => teleportTo(loc)}
            >
              <span className="teleport-icon">{loc.icon}</span>
              <div className="teleport-info">
                <div className="teleport-name">{loc.name}</div>
                <div className="teleport-desc">{loc.description}</div>
                <div className="teleport-region">{loc.region}</div>
              </div>
            </div>
          ))
        )}
      </div>
    )
    setShowOverlay(true)
    setInTeleport(true)
    setInMenu(false)
  }

  const teleportTo = (loc: TeleportLocation) => {
    soundManager.teleport()
    setGs(prev => ({
      ...prev,
      map: loc.map,
      player: { ...prev.player, x: loc.x, y: loc.y }
    }))
    setInTeleport(false)
    setShowOverlay(false)
    setNotification(`Teletrasporto a ${loc.name}!`)
    setTimeout(() => setNotification(''), 2000)
  }

  const toggleMenu = useCallback(() => {
    soundManager.menuOpen()
    if (inMenu) {
      setInMenu(false)
      setShowOverlay(false)
    } else {
      setOverlayTitle('MENU')
      setMenuSelection(0)
      setOverlayContent(
        <div className="menu-options">
          <div className={`menu-option ${menuSelection === 0 ? 'selected' : ''}`} onClick={() => runMenuAction(0)}>🏠 SQUADRA</div>
          <div className={`menu-option ${menuSelection === 1 ? 'selected' : ''}`} onClick={() => runMenuAction(1)}>🎒 ZAINO</div>
          <div className={`menu-option ${menuSelection === 2 ? 'selected' : ''}`} onClick={() => runMenuAction(2)}>📖 BESTIDEX</div>
          <div className={`menu-option ${menuSelection === 3 ? 'selected' : ''}`} onClick={() => runMenuAction(3)}>🗺️ TELEPORTO</div>
          <div className={`menu-option ${menuSelection === 4 ? 'selected' : ''}`} onClick={() => runMenuAction(4)}>🏆 TROFEI</div>
          <div className={`menu-option ${menuSelection === 5 ? 'selected' : ''}`} onClick={() => runMenuAction(5)}>💾 SALVA</div>
          <div className={`menu-option ${menuSelection === 6 ? 'selected' : ''}`} onClick={() => { setInMenu(false); setShowOverlay(false) }}>❌ ESCI</div>
        </div>
      )
      setShowOverlay(true)
      setInMenu(true)
    }
  }, [inMenu, menuSelection])

  // Shop functions
  const buyItem = (item: GameItem) => {
    if (gs.player.money >= item.price) {
      const existing = gs.inv.find(i => i.item.name === item.name)
      if (existing) {
        setGs(prev => ({
          ...prev,
          player: { ...prev.player, money: prev.player.money - item.price },
          inv: prev.inv.map(i => i.item.name === item.name ? { ...i, qty: i.qty + 1 } : i)
        }))
      } else {
        setGs(prev => ({
          ...prev,
          player: { ...prev.player, money: prev.player.money - item.price },
          inv: [...prev.inv, { item, qty: 1 }]
        }))
      }
      soundManager.coin()
      setNotification(`Acquistato: ${item.name}!`)
    } else {
      setNotification('Non hai abbastanza soldi!')
    }
  }

  const runMenuAction = useCallback((index: number) => {
    switch (index) {
      case 0:
        setInMenu(false)
        showParty()
        return
      case 1:
        setInMenu(false)
        showBag()
        return
      case 2:
        setInMenu(false)
        showPokedex()
        return
      case 3:
        setInMenu(false)
        showTeleport()
        return
      case 4:
        setInMenu(false)
        showAchievements()
        return
      case 5:
        setInMenu(false)
        showSave()
        return
      case 6:
        setInMenu(false)
        showLoad()
        return
      default:
        setInMenu(false)
        setShowOverlay(false)
    }
  }, [showAchievements, showBag, showLoad, showParty, showPokedex, showSave, showTeleport])

  const getControlMode = useCallback((): ControlMode => {
    if (showIntro) return 'boot'
    if (!gameStarted && !showPlayerSetup) return 'title'
    if (showPlayerSetup) return 'setup'
    if (showStoryIntro) return 'story'
    if (inBattle) return 'battle'
    if (inDialog) return 'dialog'
    if (inShop) return 'shop'
    if (inMenu) return 'menu'
    if (showOverlay) return 'overlay'
    return 'overworld'
  }, [gameStarted, inBattle, inDialog, inMenu, inShop, showIntro, showOverlay, showPlayerSetup, showStoryIntro])

  const cycleSetupIdentity = useCallback((step: number) => {
    const identities: PlayerIdentity[] = ['maschio', 'femmina', 'trans']
    const currentIndex = identities.indexOf(setupIdentity)
    const nextIndex = (currentIndex + step + identities.length) % identities.length
    setSetupIdentity(identities[nextIndex])
  }, [setupIdentity])

  const showObjectiveHint = useCallback(() => {
    const hint = !gs.flags.hasStarter
      ? (gs.storyProgress < 2 ? 'Obiettivo: parla con la Mamma e raccogli gli oggetti in camera' : 'Obiettivo: vai dal Dottor GheSboro in laboratorio')
      : gs.defeatedRival
        ? `Obiettivo: lascia ${MAPS[gs.map]?.name || 'Canalborgo'} e punta a nord verso Spritzia`
        : 'Obiettivo: scegli il tuo Besti e supera Marco'
    setNotification(hint)
    setTimeout(() => setNotification(''), 1600)
  }, [gs.defeatedRival, gs.flags.hasStarter, gs.map, gs.storyProgress])

  const handleControlAction = useCallback((control: VirtualControl) => {
    const mode = getControlMode()

    if (control === 'a' || control === 'start') {
      soundManager.buttonPress()
    } else if (control === 'b' || control === 'select') {
      soundManager.menuBack()
    }

    switch (mode) {
      case 'boot':
        if (control === 'a' || control === 'b' || control === 'start') {
          skipIntro()
        }
        return
      case 'title':
        if (control === 'up' || control === 'left') {
          setTitleSelection(0)
          return
        }
        if (control === 'down' || control === 'right') {
          setTitleSelection(1)
          return
        }
        if (control === 'a' || control === 'start') {
          if (titleSelection === 1 && hasSave()) {
            startSavedGame()
          } else {
            startNewGame()
          }
        }
        return
      case 'setup':
        if (control === 'left' || control === 'up') {
          cycleSetupIdentity(-1)
          return
        }
        if (control === 'right' || control === 'down') {
          cycleSetupIdentity(1)
          return
        }
        if (control === 'a' || control === 'start') {
          confirmNewGameSetup()
          return
        }
        if (control === 'b') {
          setShowPlayerSetup(false)
        }
        return
      case 'story':
        if (control === 'a' || control === 'start') {
          advanceStoryIntro()
        }
        return
      case 'battle':
        if (movesOpen) {
          if (control === 'up' || control === 'left') {
            setBattleMenuSelection(prev => prev === 0 ? 3 : prev === 1 ? 0 : prev === 2 ? 1 : 2)
            return
          }
          if (control === 'down' || control === 'right') {
            setBattleMenuSelection(prev => prev === 3 ? 0 : prev === 0 ? 1 : prev === 1 ? 2 : 3)
            return
          }
          if (control === 'a' || control === 'start') {
            selectBattleAction(battleMenuSelection)
            return
          }
          if (control === 'b') {
            setMovesOpen(false)
            return
          }
        } else {
          if (control === 'a' || control === 'start') {
            setMovesOpen(true)
            return
          }
          if (control === 'b') {
            setShowBallSelect(false)
            return
          }
          if (control === 'up' || control === 'down' || control === 'left' || control === 'right') {
            cycleBattleOption()
            return
          }
        }
        return
      case 'dialog':
        if (control === 'a' || control === 'start') {
          advanceDialog()
          return
        }
        if (control === 'b') {
          setInDialog(false)
          setDialogs([])
        }
        return
      case 'shop':
        if (control === 'a' || control === 'b' || control === 'start') {
          setInShop(false)
        }
        return
      case 'menu':
        if (control === 'up' || control === 'left') {
          setMenuSelection(prev => (prev === 0 ? 7 : prev - 1))
          return
        }
        if (control === 'down' || control === 'right') {
          setMenuSelection(prev => (prev === 7 ? 0 : prev + 1))
          return
        }
        if (control === 'a' || control === 'start') {
          runMenuAction(menuSelection)
          return
        }
        if (control === 'b' || control === 'select') {
          setInMenu(false)
          setShowOverlay(false)
        }
        return
      case 'overlay':
        if (control === 'a' || control === 'b' || control === 'start' || control === 'select') {
          setShowOverlay(false)
        }
        return
      case 'overworld':
        if (control === 'up' || control === 'down' || control === 'left' || control === 'right') {
          move(control)
          return
        }
        if (control === 'a') {
          checkInteractionEvents()
          return
        }
        if (control === 'start') {
          toggleMenu()
          return
        }
        if (control === 'select') {
          showObjectiveHint()
        }
        return
    }
  }, [advanceDialog, advanceStoryIntro, battleMenuSelection, battleOption, checkInteractionEvents, confirmNewGameSetup, cycleBattleOption, cycleSetupIdentity, getControlMode, hasSave, menuSelection, movesOpen, move, runMenuAction, selectBattleAction, showObjectiveHint, skipIntro, startNewGame, startSavedGame, titleSelection, toggleMenu])

  const handleA = useCallback(() => {
    handleControlAction('a')
  }, [handleControlAction])

  const handleB = useCallback(() => {
    handleControlAction('b')
  }, [handleControlAction])

  const handleDirectionInput = useCallback((dir: 'up' | 'down' | 'left' | 'right') => {
    handleControlAction(dir)
  }, [handleControlAction])

  const handleStartButton = useCallback(() => {
    handleControlAction('start')
  }, [handleControlAction])

  const handleSelectButton = useCallback(() => {
    handleControlAction('select')
  }, [handleControlAction])

  const handleVirtualPress = useCallback((control: VirtualControl) => {
    const now = Date.now()
    const last = lastVirtualPressRef.current[control] || 0
    if (now - last < 80) return
    lastVirtualPressRef.current[control] = now
    handleControlAction(control)
  }, [handleControlAction])

  const bindVirtualControl = useCallback((control: VirtualControl) => {
    const isDirection = ['up', 'down', 'left', 'right'].includes(control)
    const handlePress = () => {
      if (isDirection) {
        heldDirectionRef.current = control
      }
      if (control === 'start') {
        handleControlAction('start')
      } else if (control === 'select') {
        handleControlAction('select')
      } else if (isDirection) {
        handleControlAction(control)
      } else {
        handleVirtualPress(control)
      }
    }
    const handleRelease = () => {
      if (isDirection && heldDirectionRef.current === control) {
        heldDirectionRef.current = null
      }
    }
    return {
      onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        handlePress()
      },
      onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        handleRelease()
      },
      onPointerLeave: (e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleRelease()
      },
      onPointerCancel: (e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleRelease()
      },
      style: { touchAction: 'none' } as React.CSSProperties,
    }
  }, [handleControlAction, handleVirtualPress])

  // Effects
  useEffect(() => {
    if (!gameStarted) return
    const interval = setInterval(() => {
      if (!inBattle && !inDialog && !inShop) draw()
    }, 100)
    return () => clearInterval(interval)
  }, [gameStarted, inBattle, inDialog, inShop, draw])

  // Continuous movement when holding direction buttons
  useEffect(() => {
    if (!gameStarted || showStoryIntro) return
    
    const interval = setInterval(() => {
      if (heldDirectionRef.current && !inBattle && !inDialog && !inShop && !inMenu && !showOverlay && !mapTransition && !animating && !showPlayerSetup) {
        handleDirectionInput(heldDirectionRef.current as 'up' | 'down' | 'left' | 'right')
      }
    }, 120)
    return () => clearInterval(interval)
  }, [gameStarted, showStoryIntro, inBattle, inDialog, inShop, inMenu, showOverlay, mapTransition, animating, showPlayerSetup])

  useEffect(() => {
    if (!gameStarted || showStoryIntro) return
    checkAutoEvents()
    const map = MAPS[gs.map]
    if (gs.flags.hasStarter && map.wild && map.wild.length && Math.random() * 100 < (map.wildRate || 10)) {
      startWild()
    }
  }, [checkAutoEvents, gameStarted, gs.flags.hasStarter, gs.map, gs.player.x, gs.player.y, showStoryIntro, startWild])

  useEffect(() => {
    if (battleState) {
      setEnemyHp({ current: battleState.enemy.hp, max: battleState.enemy.maxHp })
      setPlayerHp({ current: gs.party[0]?.hp || 0, max: gs.party[0]?.maxHp || 1 })
    }
  }, [battleState, gs.party])

  // Day/Night cycle - update every minute
  useEffect(() => {
    if (!gameStarted || showStoryIntro) return
    const updateTime = () => setTimeOfDay(getTimeOfDay())
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [gameStarted, showStoryIntro])

  // Auto-save every 5 minutes
  useEffect(() => {
    if (!gameStarted || showStoryIntro) return
    const interval = setInterval(() => {
      if (gs.party.length > 0) saveGame(true)
    }, 300000)
    return () => clearInterval(interval)
  }, [gameStarted, gs, showStoryIntro])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      try {
        const key = e.key
        switch (key) {
          case 'ArrowUp': case 'w': case 'W':
            e.preventDefault()
            e.stopPropagation()
            handleDirectionInput('up')
            break
          case 'ArrowDown': case 's': case 'S':
            e.preventDefault()
            e.stopPropagation()
            handleDirectionInput('down')
            break
          case 'ArrowLeft': case 'q': case 'Q':
            e.preventDefault()
            e.stopPropagation()
            handleDirectionInput('left')
            break
          case 'ArrowRight': case 'e': case 'E':
            e.preventDefault()
            e.stopPropagation()
            handleDirectionInput('right')
            break
          case 'Enter': case 'z': case 'Z': case ' ':
            e.preventDefault()
            e.stopPropagation()
            handleA()
            break
          case 'Escape': case 'x': case 'X': case 'Backspace':
            e.preventDefault()
            e.stopPropagation()
            handleB()
            break
          case 'Shift':
            e.preventDefault()
            e.stopPropagation()
            handleStartButton()
            break
          case 'Control':
            e.preventDefault()
            e.stopPropagation()
            handleSelectButton()
            break
        }
      } catch (error) {
        console.error('Keyboard input failed:', error)
      }
    }
    window.addEventListener('keydown', handleKey, { passive: false })
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleA, handleB, handleDirectionInput, handleSelectButton, handleStartButton])

  const gameWrapperRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.tabIndex = 0
      node.focus()
    }
  }, [])

  useEffect(() => {
    const focusGame = () => {
      const wrapper = document.querySelector('.game-wrapper') as HTMLElement
      if (wrapper) wrapper.focus()
    }
    focusGame()
    window.addEventListener('click', focusGame)
    return () => window.removeEventListener('click', focusGame)
  }, [gameStarted])

  return (
    <div className="game-wrapper" ref={gameWrapperRef} tabIndex={0} onFocus={() => {}}>
      <div className="gba-console">
        {/* TOP SCREEN */}
        <div className="top-screen">
          <div className="screen-bezel">
            <div className={`game-container top ${gs.map.includes('canalborgo') || gs.map === 'casa' ? 'city-canalborgo' : gs.map.includes('spritzia') ? 'city-spritzia' : gs.map.includes('veronara') ? 'city-veronara' : gs.map.includes('padoana') ? 'city-padoana' : gs.map.includes('trevisella') ? 'city-trevisella' : gs.map.includes('dolomax') ? 'city-dolomax' : gs.map.includes('gardalago') ? 'city-gardalago' : ''}`}>
              <canvas ref={canvasRef} className={`game-canvas ${shakeScreen ? 'shake' : ''}`} width={240} height={160} />

              {/* INTRO SEQUENCE */}
              {showIntro && (
                <div className="intro-screen">
                  <div className="intro-stars">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className="star" 
                        style={getIntroStarStyle(i)}
                      />
                    ))}
                  </div>
                  <div className="intro-content">
                    {showIntroText && (
                      <>
                        <img 
                          src={getBestiaSprite('serenissima')} 
                          alt="Serenissima"
                          className="intro-sprite pixel-sprite"
                        />
                        <h1 className="intro-title">{INTRO_FRAMES[introFrame]?.text}</h1>
                        <p className="intro-subtitle">{INTRO_FRAMES[introFrame]?.subtext}</p>
                      </>
                    )}
                  </div>
                  <button className="skip-btn" onClick={skipIntro}>SALTA ▸</button>
                </div>
              )}

              {/* Title Screen */}
              {!gameStarted && !showIntro && !showPlayerSetup && (
                <div className="title-screen">
                  <div className="title-bg-pattern" />
                  <div className="title-glow" />
                  
                  <div className="title-dragon-container">
                    <img src={getBestiaSprite('lagorion')} alt="Lagorion" />
                  </div>
                  
                  <div className="title-spritz-glass" />

                  <div className="title-frame">
                    <div className="title-main">
                      <div className="title-pokemona">POKEMONA</div>
                      <div className="title-venetia">DE VENETIA</div>
                      <div className="title-version">ROSSO SPRITZ</div>
                      <div className="title-subtext">
                        Cacia i Besti · Ghefa i Spritz · Drio la Gloria
                      </div>
                    </div>

                    <div className="title-hero">
                      <img src={getBestiaSprite('lagorion')} alt="Lagorion" className="title-hero-side pixel-sprite" />
                      <img src={getBestiaSprite('serenissima')} alt="Serenissima" className="title-hero-main pixel-sprite" />
                      <img src={getBestiaSprite('ombradriz')} alt="Ombradriz" className="title-hero-side pixel-sprite" />
                    </div>

                    <div className="title-menu-card">
                      <button className={`start-btn-large ${titleSelection === 0 ? 'selected' : ''}`} onClick={startNewGame}>
                        NUOVA PARTIA
                      </button>
                      <button className={`start-btn-large secondary ${titleSelection === 1 ? 'selected' : ''}`} onClick={startSavedGame} disabled={!hasSave()}>
                        CARIGA PARTIA
                      </button>
                      {hasSave() && (
                        <div className="title-save-info">
                          <div>{getSaveInfo()?.playerName || 'Alenador'}</div>
                          <div>{getSaveInfo()?.map || 'Venetia'} · Lv {getSaveInfo()?.level || 1}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!gameStarted && showPlayerSetup && (
                <div className="player-setup-screen">
                  <div className="player-setup-card">
                    <div className="player-setup-title">Chi sei?</div>
                    <div className="player-setup-subtitle">Scegli il nome e il protagonista della tua avventura.</div>
                    <div className="player-preview-stage">
                      <img
                        src={getPlayerFrontPortrait(setupIdentity)}
                        alt={setupIdentity}
                        className="player-preview-sprite pixel-sprite"
                      />
                    </div>
                    <div className="name-field">
                      <label htmlFor="player-name">Nome</label>
                      <input
                        id="player-name"
                        value={setupName}
                        maxLength={12}
                        onChange={(e) => setSetupName(e.target.value)}
                        placeholder="Federico"
                      />
                    </div>
                    <div className="identity-grid">
                      <button type="button" className={`identity-btn ${setupIdentity === 'maschio' ? 'active' : ''}`} onClick={() => setSetupIdentity('maschio')}>
                        <img src={PLAYER_FRONT_PORTRAIT} alt="Maschio" className="pixel-sprite" />
                        <span>Maschio</span>
                      </button>
                      <button type="button" className={`identity-btn ${setupIdentity === 'femmina' ? 'active' : ''}`} onClick={() => setSetupIdentity('femmina')}>
                        <img src={PLAYER_FRONT_FEMALE} alt="Femmina" className="pixel-sprite" />
                        <span>Femmina</span>
                      </button>
                      <button type="button" className={`identity-btn ${setupIdentity === 'trans' ? 'active' : ''}`} onClick={() => setSetupIdentity('trans')}>
                        <img src={PLAYER_FRONT_TRANS} alt="Trans" className="pixel-sprite" />
                        <span>Trans</span>
                      </button>
                    </div>
                    <div className="player-setup-actions">
                      <button type="button" className="start-btn-large secondary" onClick={() => setShowPlayerSetup(false)}>INDIETRO</button>
                      <button type="button" className="start-btn-large" onClick={confirmNewGameSetup}>INIZIA</button>
                    </div>
                  </div>
                </div>
              )}

              {gameStarted && showStoryIntro && (
                <div className="story-intro-screen" onClick={advanceStoryIntro}>
                  <div className="story-intro-card">
                    <div className="story-intro-stage">
                      <img
                        src={storyIntroStep === 1 ? getBestiaSprite('serenissima') : getSpeakerPortrait(OPENING_STORY[storyIntroStep]?.speaker || '')}
                        alt={OPENING_STORY[storyIntroStep]?.speaker}
                        className={`story-stage-sprite pixel-sprite ${storyIntroStep === 1 ? 'bestia' : ''}`}
                      />
                      {storyIntroStep === 1 && (
                        <>
                          <img src={getBestiaSprite('lagorion')} alt="Lagorion" className="story-stage-side pixel-sprite left" />
                          <img src={getBestiaSprite('ombradriz')} alt="Ombradriz" className="story-stage-side pixel-sprite right" />
                        </>
                      )}
                    </div>
                    <div className="story-intro-box" style={{ borderColor: OPENING_STORY[storyIntroStep]?.accent }}>
                      <div className="story-intro-speaker" style={{ color: OPENING_STORY[storyIntroStep]?.accent }}>
                        {OPENING_STORY[storyIntroStep]?.speaker}
                      </div>
                      <div className="story-intro-title">{personalizeText(OPENING_STORY[storyIntroStep]?.title || '')}</div>
                      <div className="story-intro-text">{personalizeText(OPENING_STORY[storyIntroStep]?.text || '')}</div>
                      <div className="story-intro-hint">Premi A o tocca per continuare</div>
                    </div>
                  </div>
                </div>
              )}

              {/* HUD */}
              {gameStarted && !inBattle && !showIntro && !showStoryIntro && (
                <div className="hud-top">
                  <span className="hud-name">{gs.player.name}</span>
                  <span className="hud-money">₿{gs.player.money}</span>
                </div>
              )}
              
              {/* City Badge */}
              {gameStarted && !inBattle && !inDialog && !showOverlay && !showIntro && !showStoryIntro && (
                <div className="city-badge">
                  {MAPS[gs.map]?.name || '???'}
                </div>
              )}

              {/* Time of Day Indicator */}
              {gameStarted && !inBattle && !inDialog && !showOverlay && !showIntro && !showStoryIntro && (
                <div className="time-indicator">
                  {timeOfDay === 'morning' && '☀️'}
                  {timeOfDay === 'afternoon' && '🌤️'}
                  {timeOfDay === 'evening' && '🌅'}
                  {timeOfDay === 'night' && '🌙'}
                </div>
              )}
              
              {/* Floor Indicator for Multi-floor Buildings */}
              {gameStarted && !inBattle && !inDialog && !showIntro && !showStoryIntro && (
                <>
                  {gs.map.includes('_') && (
                    <div className="floor-indicator">
                      {(() => {
                        const parts = gs.map.split('_')
                        const mapBase = parts[0]
                        const floor = parts[1]
                        if (['villa', 'casa', 'museo', 'gym', 'lab', 'torre', 'tempio', 'grotta'].includes(mapBase)) {
                          const floorName = floor === '2' ? 'Piano 2' : floor === '3' ? 'Piano 3' : 'Piano 1'
                          return `📍 ${MAPS[gs.map]?.name || floorName}`
                        }
                        return null
                      })()}
                    </div>
                  )}
                  
                </>
              )}

              {/* Dialog */}
              {inDialog && (
                <div className="dialog-box">
                  <img src={getSpeakerPortrait(speaker || 'Federico')} alt={speaker || 'Narratore'} className="dialog-portrait pixel-sprite" />
                  {speaker && <div className="dialog-speaker">{speaker}</div>}
                  <div className="dialog-text">{dialogs[0]}</div>
                  <div className="dialog-arrow">▼</div>
                </div>
              )}

{/* Battle UI */}
              {inBattle && gs.party[0] && (
                <div className={`battle-scene ${battleAnimation === 'attack' ? 'attack-animation' : ''}`}>
                  {/* Battle background - Pokemon style grass arena */}
                  <div className="battle-bg">
                    <div className="battle-ground"></div>
                    <div className="battle-trees"></div>
                  </div>
                  
                   {/* Enemy Info + Sprite */}
                  <div className="enemy-area">
                    <div className="enemy-info-box">
                      <span className="enemy-name">{battleState?.enemy.name}</span>
                      <span className="enemy-level">Lv.{battleState?.enemy.level}</span>
                      <div className="hp-bar hp-bar-enemy">
                        <div className={`hp-fill ${enemyHp.current / enemyHp.max < 0.2 ? 'low' : ''}`} style={{ width: `${(enemyHp.current / enemyHp.max) * 100}%` }}></div>
                      </div>
                    </div>
                    <img 
                      src={getBestiaSprite(String(battleState?.enemy?.id ?? ''), false)}
                      className={`bestia-sprite enemy-sprite pixel-sprite ${battleAnimation === 'damage' ? 'battle-sprite-damage' : 'sprite-idle'}`}
                      alt={battleState?.enemy.name}
                    />
                    {/* Critical Hit indicator */}
                    {battleAnimation === 'damage' && (
                      <div className="type-effectiveness">-MOSSA-</div>
                    )}
                  </div>
                    
                  {/* Player Bestia */}
                  <div className="player-area">
                    <img
                      src={getPlayerBackPortrait(gs.player.gender)}
                      className="battle-trainer-back pixel-sprite"
                      alt="Allenatore"
                    />
                    <img 
                      src={getBestiaSprite(gs.party[0].id, true)} 
                      className={`bestia-sprite player-sprite pixel-sprite ${battleAnimation === 'attack' ? 'battle-sprite-attack' : 'sprite-idle'}`}
                      alt={gs.party[0].name}
                    />
                    <div className="player-info-box">
                      <div className="player-name-row">
                        <span className="player-name">{gs.party[0].name}</span>
                        <span className="player-level">Lv.{gs.party[0].level}</span>
                      </div>
                      <div className="hp-bar hp-bar-player">
                        <div className={`hp-fill ${playerHp.current / playerHp.max < 0.2 ? 'low' : ''}`} style={{ width: `${(playerHp.current / playerHp.max) * 100}%` }}></div>
                      </div>
                      <div className="hp-text">{playerHp.current}/{playerHp.max}</div>
                    </div>
                  </div>

                  {/* Battle Message */}
                  {showBattleMsg && (
                    <div className="battle-message">{battleMsg}</div>
                  )}

                  {/* Battle Menu */}
                  {!showBattleMsg && !movesOpen && (
                    <div className="battle-menu">
                      <button className="battle-btn" onClick={showMoves}>MOSSA</button>
                      <button className="battle-btn" onClick={showBag}>ZAINO</button>
                      <button className="battle-btn" onClick={showParty}>BESTIA</button>
                      <button className="battle-btn" onClick={battleState?.isWild ? () => setShowBallSelect(true) : tryRun}>
                        {battleState?.isWild ? 'CATTURA' : 'SCAPPA'}
                      </button>
                    </div>
                  )}
                  
                  {/* Ball Selection Modal */}
                  {showBallSelect && (
                    <div className="ball-select-modal">
                      <div className="ball-select-header">
                        <h3>Scegli una Ball</h3>
                        <button className="close-btn" onClick={() => setShowBallSelect(false)}>X</button>
                      </div>
                      <div className="ball-grid">
                        {gs.inv.filter(i => i.item.type === 'capture').map((inv, i) => (
                          <button 
                            key={i} 
                            className="ball-item"
                            onClick={() => {
                              tryCaptureWithBall(inv.item.id)
                              setShowBallSelect(false)
                            }}
                            disabled={inv.qty <= 0}
                          >
                            <div className="ball-icon">{inv.item.name[0]}</div>
                            <div className="ball-info">
                              <span className="ball-name">{inv.item.name}</span>
                              <span className="ball-qty">x{inv.qty}</span>
                            </div>
                          </button>
                        ))}
                        {gs.inv.filter(i => i.item.type === 'capture').length === 0 && (
                          <div className="no-balls">Non hai balls!</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Moves Menu */}
                  {!showBattleMsg && movesOpen && (
                    <div className="moves-menu">
                      {gs.party[0]?.moves.map((m, i) => (
                        <button key={i} className="move-btn" onClick={() => useMove(i)}>
                          <span>{m}</span>
                          <span className="move-type">{MOVES[m]?.type || 'normal'}</span>
                        </button>
                      ))}
                      <button className="move-btn back" onClick={() => setMovesOpen(false)}>INDIETRO</button>
                    </div>
                  )}
                </div>
              )}

              {/* Starter Choice - 4 LEGENDARY STARTERS */}
              {showStarterChoice && (
                <div className="starter-choice">
                  <h2>Scegli il tuo Besti!</h2>
                  <p className="starter-subtitle">4 Besti Leggendari</p>
                  <div className="starter-container legendary">
                    <div className="starter-btn legendary" onClick={() => selectStarter('dolomitor')}>
                      <img src={getBestiaSprite('dolomitor')} alt="Dolomitor" className="pixel-sprite" />
                      <div className="starter-name">DOLOMITOR</div>
                      <span className="type-badge type-ice">Ghiaccio</span>
                      <span className="type-badge type-earth">Terra</span>
                    </div>
                    <div className="starter-btn legendary" onClick={() => selectStarter('lagorion')}>
                      <img src={getBestiaSprite('lagorion')} alt="Lagorion" className="pixel-sprite" />
                      <div className="starter-name">LAGORION</div>
                      <span className="type-badge type-water">Acqua</span>
                      <span className="type-badge type-dragon">Drago</span>
                    </div>
                    <div className="starter-btn legendary" onClick={() => selectStarter('serenissima')}>
                      <img src={getBestiaSprite('serenissima')} alt="Serenissima" className="pixel-sprite" />
                      <div className="starter-name">SERENISSIMA</div>
                      <span className="type-badge type-psycho">Psico</span>
                      <span className="type-badge type-air">Aria</span>
                    </div>
                    <div className="starter-btn legendary" onClick={() => selectStarter('ombradriz')}>
                      <img src={getBestiaSprite('ombradriz')} alt="OmbraSpritz" className="pixel-sprite" />
                      <div className="starter-name">OMBRASPRITZ</div>
                      <span className="type-badge type-magic">Magico</span>
                      <span className="type-badge type-poison">Veleno</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Achievement Popup */}
              {showAchievement && currentAchievement && (
                <div className="achievement-popup">
                  <div className="title">🏆 TROFEO OTTENUTO! 🏆</div>
                  <div className="icon">{currentAchievement.icon}</div>
                  <div className="name">{currentAchievement.name}</div>
                  <div className="desc">{currentAchievement.desc}</div>
                </div>
              )}

              {/* Evolution Animation */}
              {showEvolve && evolvingBestia && (
                <div className="evolution-overlay">
                  <div className="evolution-text">{evolvingBestia.name} si sta evolvendo...</div>
                  <img 
                    src={getBestiaSprite(evolvingBestia.id)} 
                    alt={evolvingBestia.name}
                    className="evolution-sprite pixel-sprite"
                  />
                </div>
              )}

              {/* Shop */}
              {inShop && (
                <div className="shop-screen">
                  <div className="shop-header">NEGOZIO</div>
                  <div className="shop-items">
                    {currentShopItems.map((item, i) => (
                      <div key={i} className="shop-item" onClick={() => buyItem(item)}>
                        <span className="shop-item-name">{item.name}</span>
                        <span className="shop-item-price">₿{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <button className="shop-close" onClick={() => setInShop(false)}>ESCI</button>
                </div>
              )}

              {/* Notification */}
              {notification && (
                <div className="notification">{notification}</div>
              )}

              {mapTransition && <div className="map-fade"></div>}

              {/* Overlay (Menus) */}
              {showOverlay && (
                <div className="overlay">
                  <div className="overlay-header">{overlayTitle}</div>
                  <button className="close-btn" onClick={() => { setShowOverlay(false); setInMenu(false) }}>✕</button>
                  <div className="overlay-content">
                    {inMenu ? (
                      <div className="menu-options">
                        {['Squadra', 'Zaino', 'BestiDex', 'Teletrasporto', 'Trofei', 'Salva', 'Carica', 'Chiudi'].map((label, index) => (
                          <div
                            key={label}
                            className={`menu-option ${menuSelection === index ? 'selected' : ''}`}
                            onClick={() => runMenuAction(index)}
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                    ) : overlayContent}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM SCREEN */}
        <div className="bottom-screen">
          <div className="screen-bezel-bottom">
            <div className="bottom-content">
              {/* Info Panel */}
              <div className="info-panel">
                {gameStarted ? (
                  <>
                    <div className="location">{MAPS[gs.map]?.name || '???'}</div>
                    {!gs.flags.hasStarter && (
                      <div className="current-objective">
                        {gs.storyProgress < 2 ? 'Parla con la Mamma e cerca gli oggetti in camera' : 'Vai dal Dottor GheSboro'}
                      </div>
                    )}
                    {gs.flags.hasStarter && gs.defeatedRival && (
                      <div className="current-objective">
                        Esci da Canalborgo e raggiungi Spritzia
                      </div>
                    )}
                    <div className="party-preview">
                      {gs.party.slice(0, 3).map((b, i) => (
                        <div key={i} className="preview-bestia">
                          <img src={getBestiaIcon(b.id)} alt={b.name} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="boot-panel">
                    <div className="boot-led"></div>
                    <div className="boot-brand">ROSSO SPRITZ</div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="controls-area">
                {/* D-Pad with MOBILE support */}
                <div className="dpad-container">
                  <div className="dpad">
                    <button 
                      type="button"
                      className="dpad-btn dpad-up" 
                      {...bindVirtualControl('up')}
                    >▲</button>
                    <button 
                      type="button"
                      className="dpad-btn dpad-down" 
                      {...bindVirtualControl('down')}
                    >▼</button>
                    <button 
                      type="button"
                      className="dpad-btn dpad-left" 
                      {...bindVirtualControl('left')}
                    >◀</button>
                    <button 
                      type="button"
                      className="dpad-btn dpad-right" 
                      {...bindVirtualControl('right')}
                    >▶</button>
                    <div className="dpad-center"></div>
                  </div>
                </div>

                {/* Action Buttons - MOBILE TOUCH */}
                <div className="action-btns">
                  <button 
                    type="button"
                    className="action-btn" 
                    id="btn-a" 
                    {...bindVirtualControl('a')}
                  >A</button>
                  <button 
                    type="button"
                    className="action-btn" 
                    id="btn-b" 
                    {...bindVirtualControl('b')}
                  >B</button>
                </div>

                {/* Start/Select */}
                <div className="start-select">
                  <button 
                    type="button"
                    className="start-btn" 
                    aria-label="Start"
                    {...bindVirtualControl('start')}
                  />
                  <button 
                    type="button"
                    className="select-btn" 
                    aria-label="Select"
                    {...bindVirtualControl('select')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        body { 
          background: #0a1225;
          width: 100%;
          height: 100vh;
          display: flex; 
          justify-content: center; 
          align-items: center;
          font-family: 'Press Start 2P', monospace;
          overflow: hidden;
        }

        .game-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100vw;
          overflow: hidden;
          background: #0a1225;
        }

        .gba-console {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 100vw;
          display: flex;
          flex-direction: column;
          background:
            radial-gradient(circle at 35% 25%, rgba(132,90,255,0.45) 0%, rgba(132,90,255,0) 38%),
            linear-gradient(180deg, #202026 0%, #131317 22%, #5f19d4 58%, #4d0fb9 100%);
          border-radius: 0;
          padding: 0;
          border: 0;
          box-shadow: none;
          overflow: hidden;
        }

        .gba-console::before {
          display: none;
        }

        .gba-console::after {
          display: none;
        }

        .top-screen {
          width: 100%;
          flex: 1;
          display: flex;
        }

        .bottom-screen {
          width: 100%;
          flex-shrink: 0;
          display: flex;
        }

        .screen-bezel {
          flex: 1;
          background: #000;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
          display: flex;
          flex-direction: column;
        }

        .game-container {
          position: relative;
          width: 100%;
          height: 100%;
          aspect-ratio: 3 / 2;
          min-height: 0;
          background: #000;
          overflow: hidden;
          border-radius: 0;
        }

        .game-canvas {
          display: block;
          width: 100%;
          height: 100%;
          image-rendering: pixelated;
        }

        .game-canvas.shake {
          animation: shake 0.2s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        /* INTRO SCREEN */
        .intro-screen {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #1a0a2e 0%, #0d1b2a 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 100;
          overflow: hidden;
        }

        .intro-stars {
          position: absolute;
          inset: 0;
        }

        .star {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #fff;
          border-radius: 50%;
          animation: twinkle 2s infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        .intro-content {
          text-align: center;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .intro-sprite {
          width: 80px;
          height: 80px;
          margin-bottom: 15px;
          animation: float 3s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(156, 39, 176, 0.5));
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .intro-title {
          font-size: 12px;
          color: #ffd700;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
          margin-bottom: 8px;
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
          50% { text-shadow: 0 0 20px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.5); }
        }

        .intro-subtitle {
          font-size: 7px;
          color: #87ceeb;
        }

        .skip-btn {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.5);
          font-family: 'Press Start 2P', monospace;
          font-size: 6px;
          padding: 5px 10px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .skip-btn:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .story-intro-screen {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(255,220,160,0.18) 0%, rgba(255,220,160,0) 28%),
            linear-gradient(180deg, #18385f 0%, #1d5c7d 42%, #8ccf86 42%, #78b96f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 90;
          padding: 10px;
        }

        .story-intro-card {
          width: min(100%, 280px);
          height: 100%;
          display: grid;
          grid-template-rows: 1fr auto;
          gap: 8px;
        }

        .story-intro-stage {
          position: relative;
          border-radius: 14px;
          border: 4px solid #22344f;
          background:
            radial-gradient(circle at 50% 78%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 22%),
            linear-gradient(180deg, #d7edf1 0%, #d7edf1 54%, #c9dbc6 54%, #c9dbc6 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .story-stage-sprite {
          width: 80px;
          height: 80px;
          object-fit: contain;
          z-index: 2;
          filter: drop-shadow(0 6px 0 rgba(0,0,0,0.18));
        }

        .story-stage-sprite.bestia {
          width: 64px;
          height: 64px;
        }

        .story-stage-side {
          position: absolute;
          bottom: 24px;
          width: 36px;
          height: 36px;
          object-fit: contain;
          opacity: 0.95;
        }

        .story-stage-side.left {
          left: 20px;
        }

        .story-stage-side.right {
          right: 20px;
        }

        .story-intro-box {
          background: #f8f8f0;
          border: 4px solid #4f8cff;
          border-radius: 12px;
          box-shadow: 0 6px 0 rgba(0,0,0,0.18);
          padding: 10px 10px 12px;
        }

        .story-intro-speaker {
          font-size: 6px;
          letter-spacing: 1px;
        }

        .story-intro-title {
          font-size: 10px;
          color: #1f2e4f;
          line-height: 1.2;
        }

        .story-intro-text {
          font-size: 7px;
          line-height: 1.5;
          color: #1d1d1d;
        }

        .story-intro-hint {
          font-size: 5px;
          text-align: right;
          color: #526179;
        }

        .title-screen {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 50% 0%, rgba(139,69,19,0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255,99,71,0.3) 0%, transparent 40%),
            linear-gradient(180deg, #0d0805 0%, #1a0f0a 40%, #2d1810 70%, #1a0f0a 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          overflow: hidden;
        }

        .title-bg-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px),
            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px);
          opacity: 0.5;
        }

        .title-dragon-container {
          position: absolute;
          bottom: 5%;
          right: 5%;
          width: 120px;
          height: 120px;
          opacity: 0.6;
          animation: titleDragonFloat 8s ease-in-out infinite;
        }

        .title-dragon-container img {
          width: 100%;
          height: 100%;
          image-rendering: pixelated;
          filter: drop-shadow(0 0 10px rgba(255,100,50,0.3));
        }

        @keyframes titleDragonFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }

        .title-spritz-glass {
          position: absolute;
          bottom: 18%;
          right: 18%;
          width: 24px;
          height: 32px;
          opacity: 0.7;
        }

        .title-spritz-glass::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 20px;
          background: linear-gradient(180deg, #ff9966 0%, #ff5e62 100%);
          border-radius: 2px 2px 4px 4px;
          clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
        }

        .title-spritz-glass::after {
          content: '';
          position: absolute;
          top: 0;
          left: 2px;
          width: 20px;
          height: 8px;
          background: rgba(255,255,255,0.3);
          border-radius: 2px 2px 0 0;
        }

        .title-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .title-glow {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 100px;
          background: radial-gradient(ellipse at center, rgba(255,200,100,0.2) 0%, transparent 70%);
          pointer-events: none;
        }

        .title-frame {
          position: relative;
          z-index: 1;
          width: min(320px, 95%);
          max-height: 95%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .title-main {
          text-align: center;
          padding: 20px;
        }

        .title-pokemona {
          font-size: clamp(36px, 12vw, 64px);
          font-weight: 900;
          background: linear-gradient(180deg, #ffd700 0%, #ffb347 25%, #ff6b35 50%, #c41e3a 75%, #800020 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(3px 3px 0 #1a0a00) drop-shadow(0 0 20px rgba(255,100,50,0.4));
          letter-spacing: 2px;
          line-height: 1.15;
          animation: titleGlow 2s ease-in-out infinite alternate;
        }

        @keyframes titleGlow {
          from { filter: drop-shadow(3px 3px 0 #1a0a00) drop-shadow(0 0 20px rgba(255,100,50,0.4)); }
          to { filter: drop-shadow(3px 3px 0 #1a0a00) drop-shadow(0 0 30px rgba(255,150,80,0.6)); }
        }

        .title-venetia {
          font-size: clamp(14px, 5vw, 22px);
          color: #d4af37;
          margin-top: 8px;
          letter-spacing: 8px;
          text-shadow: 1px 1px 2px #000;
          font-weight: 400;
        }

        .title-version {
          font-size: clamp(10px, 4vw, 16px);
          color: #e8d5b7;
          margin-top: 4px;
          letter-spacing: 4px;
          font-weight: 400;
        }

        .title-subtext {
          font-size: clamp(7px, 2.5vw, 11px);
          color: #a08060;
          margin-top: 16px;
          text-align: center;
          line-height: 1.8;
        }

        .title-hero {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px 0;
        }

        .title-hero-main {
          width: 56px;
          height: 56px;
          filter: drop-shadow(0 0 15px rgba(255,200,100,0.4));
          animation: titleFloat 3s ease-in-out infinite;
        }

        .title-hero-side {
          width: 32px;
          height: 32px;
          opacity: 0.85;
          animation: titleFloatSide 3.5s ease-in-out infinite;
        }

        .title-hero-side:last-child {
          animation-delay: 1s;
        }

        @keyframes titleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes titleFloatSide {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.05); }
        }

        .title-menu-card {
          width: 100%;
          padding: 5px;
          border: 3px solid #1b1b1b;
          border-radius: 10px;
          background: rgba(250,250,242,0.96);
          display: grid;
          gap: 6px;
          box-shadow: 0 4px 0 rgba(28,28,28,0.2);
        }

        .start-btn-large {
          width: 100%;
          padding: 5px 7px;
          background: linear-gradient(180deg, #f0f4ff, #c7d7ff);
          border: 2px solid #19243f;
          border-radius: 8px;
          color: #162241;
          font-family: inherit;
          font-size: 5px;
          text-align: left;
          cursor: pointer;
          box-shadow: 0 3px 0 rgba(25,36,63,0.32);
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .start-btn-large.secondary {
          background: linear-gradient(180deg, #fff7d4, #ffe18d);
          color: #5e4300;
          border-color: #6f4f08;
          box-shadow: 0 4px 0 rgba(111,79,8,0.3);
        }

        .start-btn-large:disabled {
          opacity: 0.55;
          cursor: default;
          transform: none;
        }

        .start-btn-large:hover:not(:disabled) {
          transform: translateY(-1px);
          background: linear-gradient(180deg, #ffffff, #dae5ff);
        }

        .start-btn-large.selected {
          background: linear-gradient(180deg, #fff8cf, #ffd86b);
          border-color: #7a5a0a;
          color: #543a00;
          box-shadow: 0 3px 0 rgba(111,79,8,0.35);
        }

        .start-btn-large.secondary:hover:not(:disabled) {
          background: linear-gradient(180deg, #fffbe7, #ffe9a7);
        }

        .title-save-info {
          min-height: 14px;
          padding: 3px 5px;
          border-radius: 6px;
          background: #dde7d8;
          border: 2px solid #52614b;
          font-size: 4px;
          color: #243120;
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .title-screen {
            padding: 10px;
          }
          
          .title-frame {
            width: 95%;
            gap: 8px;
          }
          
          .title-main {
            padding: 15px 10px;
          }
          
          .title-pokemona {
            letter-spacing: 1px;
          }
          
          .title-venetia, .title-version {
            letter-spacing: 4px;
          }
          
          .title-hero {
            padding: 10px 0;
            gap: 6px;
          }
          
          .title-hero-main {
            width: 44px;
            height: 44px;
          }
          
          .title-hero-side {
            width: 26px;
            height: 26px;
          }
          
          .title-menu-card {
            width: 100%;
            padding: 8px;
            gap: 8px;
          }
          
          .start-btn-large {
            padding: 8px 10px;
            font-size: 6px;
          }
        }

        @media (max-width: 400px) {
          .title-main {
            padding: 10px 5px;
          }
          
          .title-pokemona {
            letter-spacing: 0px;
          }
          
          .title-venetia, .title-version {
            letter-spacing: 2px;
          }
          
          .title-hero-main {
            width: 36px;
            height: 36px;
          }
          
          .title-hero-side {
            width: 22px;
            height: 22px;
          }
        }

        .player-setup-screen {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 18%, rgba(255,239,170,0.28) 0%, rgba(255,239,170,0) 22%),
            linear-gradient(180deg, #8ecfe0 0%, #d7f2f2 36%, #9edb99 36%, #7dbf75 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        .player-setup-card {
          width: min(100%, 256px);
          background: #f8f8f0;
          border: 4px solid #1b1b1b;
          border-radius: 14px;
          box-shadow: 0 8px 0 rgba(0,0,0,0.18);
          padding: 10px;
          display: grid;
          gap: 6px;
        }

        .player-setup-title {
          font-size: 9px;
          color: #1f2e4f;
        }

        .player-setup-subtitle {
          font-size: 5px;
          color: #455368;
          line-height: 1.5;
        }

        .player-preview-stage {
          height: 74px;
          border: 3px solid #284061;
          border-radius: 10px;
          background: linear-gradient(180deg, #d9eef8 0%, #d9eef8 58%, #cae0c2 58%, #cae0c2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .player-preview-sprite {
          width: 56px;
          height: 56px;
          object-fit: contain;
        }

        .name-field {
          display: grid;
          gap: 4px;
        }

        .name-field label {
          font-size: 6px;
          color: #2a3652;
        }

        .name-field input {
          width: 100%;
          border: 3px solid #22344f;
          border-radius: 8px;
          padding: 8px 10px;
          font-family: inherit;
          font-size: 7px;
          color: #1a2237;
          background: #ffffff;
          outline: none;
        }

        .identity-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
        }

        .identity-btn {
          border: 3px solid #32465f;
          background: #eef4ff;
          border-radius: 10px;
          padding: 4px 3px;
          display: grid;
          justify-items: center;
          gap: 4px;
          font-family: inherit;
          font-size: 5px;
          color: #24314a;
          cursor: pointer;
        }

        .identity-btn img {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }

        .identity-btn.active {
          background: #fff0b8;
          border-color: #8d6820;
          box-shadow: 0 3px 0 rgba(141,104,32,0.22);
        }

        .player-setup-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .hud-top {
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
          display: flex;
          justify-content: space-between;
          font-size: 8px;
          color: white;
          text-shadow: 1px 1px 0 #000;
          z-index: 10;
        }

        .dialog-box {
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 10px;
          min-height: 72px;
          background: #f8f8f0;
          border: 4px solid #1b1b1b;
          border-radius: 10px;
          padding: 12px 14px 18px 68px;
          z-index: 20;
          box-shadow: 0 8px 0 rgba(0,0,0,0.22);
        }

        .dialog-portrait {
          position: absolute;
          left: 10px;
          top: -30px;
          width: 50px;
          height: 50px;
          object-fit: contain;
          background: #eaf2f4;
          border: 3px solid #1b1b1b;
          border-radius: 10px;
          box-shadow: 0 4px 0 rgba(0,0,0,0.18);
        }

        .dialog-speaker {
          font-size: 8px;
          color: #304f9c;
          margin-bottom: 6px;
        }

        .dialog-text {
          font-size: 10px;
          line-height: 1.55;
          color: #202020;
        }

        .dialog-arrow {
          position: absolute;
          bottom: 6px;
          right: 10px;
          font-size: 10px;
          animation: blink 0.5s infinite;
        }

        .notification {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0,0,0,0.8);
          color: #ffd700;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 8px;
          z-index: 100;
        }

        .map-fade {
          position: absolute;
          inset: 0;
          background: #000;
          opacity: 0.88;
          z-index: 95;
          pointer-events: none;
          animation: mapFadePulse 0.32s ease;
        }

        @keyframes mapFadePulse {
          0% { opacity: 0; }
          50% { opacity: 0.92; }
          100% { opacity: 0.88; }
        }

        .battle-scene {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, #cfae73 0%, #b8935d 100%);
          border: 3px solid #1c1c1c;
          border-radius: 8px;
          overflow: hidden;
          padding: 8px;
          box-shadow: inset 0 0 12px rgba(0,0,0,0.35);
        }

        .battle-scene::before {
          content: '';
          position: absolute;
          left: -10%;
          right: -10%;
          top: 16px;
          height: 92px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 12px);
          opacity: 0.5;
        }

        .battle-scene.attack-animation {
          animation: battleFlash 0.3s;
        }

        @keyframes battleFlash {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.5); }
        }

        .enemy-area {
          position: absolute;
          top: 14px;
          right: 14px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          z-index: 2;
        }

        .enemy-info {
          display: flex;
          gap: 10px;
          font-size: 8px;
          color: white;
          text-shadow: 1px 1px 0 #000;
        }

        .enemy-name { color: #ff6b6b; }
        .enemy-level { color: #ffd93d; }

        .enemy-info-box,
        .player-info-box {
          min-width: 126px;
          background: #f8f7e3;
          border: 3px solid #506a58;
          border-radius: 12px 4px 12px 4px;
          padding: 8px 10px 6px;
          box-shadow: 4px 4px 0 rgba(76, 95, 69, 0.35);
        }

        .hp-bar {
          width: 100%;
          height: 10px;
          background: #f3d26e;
          border: 2px solid #4b5345;
          border-radius: 999px;
          margin-top: 4px;
        }

        .hp-fill {
          height: 100%;
          background: linear-gradient(180deg, #7dd56f, #3c8c35);
          border-radius: 999px;
          transition: width 0.3s;
        }

        .hp-fill.low {
          background: linear-gradient(180deg, #f44336, #c62828);
        }

        .bestia-sprite {
          width: 96px;
          height: 96px;
          image-rendering: pixelated;
          transition: transform 0.2s;
        }

        .enemy-sprite {
          position: relative;
          top: 0;
          right: 0;
          filter: drop-shadow(8px 10px 0 rgba(97, 79, 48, 0.4));
        }

        .enemy-sprite.damage-animation {
          animation: damage 0.3s ease-out;
        }

        @keyframes damage {
          0%, 100% { transform: translateX(0); filter: brightness(1); }
          25% { transform: translateX(10px); filter: brightness(2); }
          75% { transform: translateX(-10px); filter: brightness(0.5); }
        }

        .player-area {
          position: absolute;
          bottom: 52px;
          left: 14px;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          z-index: 2;
        }

        .battle-trainer-back {
          position: absolute;
          left: -4px;
          bottom: 16px;
          width: 70px;
          height: 70px;
          object-fit: contain;
          opacity: 0.95;
        }

        .player-sprite.attack-animation {
          animation: attack 0.3s ease-out;
        }

        @keyframes attack {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }

        .player-info {
          font-size: 9px;
          color: #1c1c1c;
        }

        .player-name-row {
          display: flex;
          gap: 10px;
        }

        .player-name { color: #223a73; }

        .hp-text {
          font-size: 6px;
          margin-top: 3px;
          text-align: right;
        }

        .battle-message {
          position: absolute;
          bottom: 8px;
          left: 8px;
          right: 8px;
          background: #33506a;
          padding: 12px 14px;
          border-radius: 8px;
          border: 4px solid #f3e2a5;
          font-size: 10px;
          text-align: left;
          color: #ffffff;
          z-index: 10;
        }

        .battle-menu, .moves-menu {
          position: absolute;
          bottom: 6px;
          right: 6px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          width: 186px;
          background: #33506a;
          border: 4px solid #f3e2a5;
          border-radius: 8px;
          padding: 6px;
          z-index: 10;
        }

        .battle-btn, .move-btn {
          background: #f5f7fb;
          border: 2px solid #203245;
          border-radius: 4px;
          padding: 6px;
          font-family: inherit;
          font-size: 9px;
          cursor: pointer;
        }

        .battle-btn:hover, .move-btn:hover {
          background: #e3f2fd;
        }

        .move-btn {
          display: flex;
          justify-content: space-between;
        }

        .move-btn.back {
          grid-column: span 2;
        }

        .starter-choice {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          overflow-y: auto;
          z-index: 30;
        }

        .starter-choice h2 {
          font-size: 12px;
          margin-bottom: 5px;
          color: #ffd700;
          text-shadow: 0 0 10px rgba(255,215,0,0.5);
        }

        .starter-subtitle {
          font-size: 7px;
          color: #87ceeb;
          margin-bottom: 10px;
        }

        .starter-container.legendary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          max-height: 120px;
          overflow-y: auto;
        }

        .starter-btn {
          background: #333;
          border: 2px solid #555;
          border-radius: 10px;
          padding: 8px;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
        }

        .starter-btn.legendary {
          background: linear-gradient(145deg, #2a2a4a, #1a1a3a);
          border-color: #ffd700;
          padding: 5px;
        }

        .starter-btn.legendary:hover {
          border-color: #fff;
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(255,215,0,0.5);
        }

        .starter-btn img {
          width: 48px;
          height: 48px;
          image-rendering: pixelated;
        }

        .starter-btn.legendary img {
          width: 64px;
          height: 64px;
          image-rendering: pixelated;
          margin-bottom: 5px;
        }

        .starter-name {
          font-size: 7px;
          margin: 5px 0;
          font-weight: bold;
        }

        .starter-btn.legendary .starter-name {
          font-size: 6px;
          color: #ffd700;
        }

        .starter-desc {
          font-size: 5px;
          color: #aaa;
        }

        .type-badge {
          font-size: 5px;
          padding: 2px 4px;
          border-radius: 3px;
          color: white;
        }

        .starter-btn.legendary .type-badge {
          font-size: 4px;
          padding: 1px 3px;
          margin: 1px;
        }

        .type-fire { background: #f44336; }
        .type-water { background: #2196f3; }
        .type-nature { background: #4caf50; }
        .type-earth { background: #8d6e63; }
        .type-air { background: #87ceeb; }
        .type-psycho { background: #9c27b0; }
        .type-ice { background: #00bcd4; }
        .type-poison { background: #4a148c; }
        .type-electric { background: #ffc107; }
        .type-magic { background: #e91e63; }
        .type-sweet { background: #ff9800; }
        .type-dragon { background: #673ab7; }
        .type-normal { background: #9e9e9e; }

        .shop-screen {
          position: absolute;
          inset: 0;
          background: white;
          padding: 10px;
          z-index: 25;
        }

        .shop-header {
          font-size: 10px;
          text-align: center;
          margin-bottom: 10px;
        }

        .shop-items {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .shop-item {
          display: flex;
          justify-content: space-between;
          padding: 5px;
          background: #f5f5f5;
          border-radius: 3px;
          cursor: pointer;
          font-size: 7px;
        }

        .shop-item:hover {
          background: #e3f2fd;
        }

        .shop-close {
          margin-top: 10px;
          width: 100%;
          padding: 8px;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 5px;
          font-family: inherit;
          font-size: 7px;
          cursor: pointer;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%);
          padding: 20px;
          overflow-y: auto;
          z-index: 30;
          display: flex;
          flex-direction: column;
        }

        .overlay-header {
          font-size: 14px;
          text-align: center;
          padding-bottom: 16px;
          border-bottom: 3px solid #ffd700;
          margin-bottom: 16px;
          color: #ffd700;
          text-shadow: 2px 2px 0 #000;
          letter-spacing: 2px;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #c41e3a;
          color: white;
          border: 2px solid #fff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        }

        .close-btn:hover {
          background: #ff5722;
        }

        .overlay-content {
          font-size: 8px;
          color: #fff;
        }

        .menu-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
        }

        .menu-option {
          padding: 16px 20px;
          background: linear-gradient(180deg, #2a1a4a 0%, #1a0a2e 100%);
          border: 2px solid #ffd700;
          border-radius: 12px;
          cursor: pointer;
          font-size: 10px;
          color: #ffd700;
          text-align: left;
          transition: all 0.2s;
        }

        .menu-option:hover, .menu-option.selected {
          background: linear-gradient(180deg, #ffd700 0%, #ff8c00 100%);
          color: #1a0a2e;
          transform: scale(1.02);
        }
          cursor: pointer;
          font-size: 10px;
          text-align: left;
          transition: all 0.1s;
        }

        .menu-option:hover, .menu-option.selected {
          background: #e94560;
          color: white;
          border-color: #c62828;
          transform: scale(1.02);
        }

        .menu-grid {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px;
          background: #f5f5f5;
          border-radius: 3px;
          cursor: pointer;
        }

        .menu-item:hover {
          background: #e3f2fd;
        }

        .item-icon {
          width: 20px;
          height: 20px;
          background: #333;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          font-size: 10px;
        }

        .item-qty {
          margin-left: auto;
          color: #666;
        }

        .item-hint {
          margin-left: 5px;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .party-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .party-member {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px;
          background: #f5f5f5;
          border-radius: 3px;
        }

        .party-sprite {
          width: 32px;
          height: 32px;
          border-radius: 5px;
        }

        .party-info {
          flex: 1;
        }

        .party-name {
          font-weight: bold;
        }

        .party-level {
          font-size: 6px;
          color: #666;
        }

        .hp-bar-mini {
          width: 100%;
          height: 4px;
          background: #333;
          border-radius: 2px;
          margin: 3px 0;
        }

        .hp-fill-mini {
          height: 100%;
          background: #4caf50;
          border-radius: 2px;
        }

        .party-hp-text {
          font-size: 5px;
          color: #666;
        }

        .dex-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
        }

        .dex-full {
          max-height: 400px;
          overflow-y: auto;
        }

        .dex-list {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .dex-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 8px;
        }

        .dex-row.caught {
          background: rgba(76, 175, 80, 0.15);
        }

        .dex-row.uncaught {
          background: rgba(0, 0, 0, 0.2);
          opacity: 0.6;
        }

        .dex-row:hover {
          background: rgba(255, 193, 7, 0.2);
        }

        .dex-icon {
          width: 24px;
          height: 24px;
        }

        .dex-detail {
          padding: 10px;
        }

        .dex-detail-header {
          display: flex;
          gap: 15px;
          margin-bottom: 10px;
        }

        .dex-detail-sprite {
          width: 64px;
          height: 64px;
        }

        .dex-detail-info {
          flex: 1;
        }

        .dex-detail-name {
          font-size: 12px;
          font-weight: bold;
          color: #333;
        }

        .dex-detail-num {
          font-size: 8px;
          color: #666;
        }

        .dex-detail-types {
          margin-top: 5px;
        }

        .dex-detail-desc {
          font-size: 7px;
          color: #555;
          margin-bottom: 10px;
          line-height: 1.4;
        }

        .dex-detail-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
          margin-bottom: 10px;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 7px;
          background: #f0f0f0;
          padding: 3px 6px;
          border-radius: 2px;
        }

        .stat-row span:first-child {
          color: #666;
        }

        .dex-detail-ev, .dex-detail-moves {
          font-size: 7px;
          color: #555;
          margin-bottom: 5px;
        }

        .back-btn {
          margin-top: 10px;
          padding: 5px 10px;
          font-size: 7px;
          background: #e94560;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }

        .dex-entry {
          background: #f5f5f5;
          padding: 5px;
          border-radius: 3px;
          text-align: center;
        }

        .dex-sprite {
          width: 32px;
          height: 32px;
          margin: 0 auto 5px;
        }

        .dex-num {
          font-size: 6px;
          color: #666;
        }

        .dex-name {
          font-size: 7px;
          margin: 2px 0;
        }

        .dex-types {
          display: flex;
          gap: 3px;
          justify-content: center;
        }

        .menu-options {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .menu-option {
          padding: 10px;
          background: #f5f5f5;
          border-radius: 5px;
          cursor: pointer;
          text-align: center;
        }

        .menu-option:hover {
          background: #e3f2fd;
        }

        .menu-option.selected {
          background: #d9ebff;
          border: 2px solid #3f7de8;
          box-shadow: inset 0 0 0 2px rgba(255,255,255,0.75);
        }

        /* Teleport */
        .teleport-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          max-height: 140px;
          overflow-y: auto;
        }

        .teleport-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          background: #f5f5f5;
          border-radius: 5px;
          cursor: pointer;
        }

        .teleport-item:hover {
          background: #e3f2fd;
        }

        .teleport-item.current {
          background: #c8e6c9;
          border: 2px solid #4caf50;
        }

        .teleport-icon {
          font-size: 20px;
          width: 30px;
          text-align: center;
        }

        .teleport-info {
          flex: 1;
        }

        .teleport-name {
          font-size: 8px;
          font-weight: bold;
        }

        .teleport-desc {
          font-size: 6px;
          color: #666;
        }

        .teleport-region {
          font-size: 5px;
          color: #999;
        }

        .teleport-empty {
          text-align: center;
          font-size: 8px;
          color: #999;
          padding: 20px;
        }

        /* Achievement System */
        .achievements-list {
          max-height: 200px;
          overflow-y: auto;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: 6px;
          margin-bottom: 6px;
          background: #333;
        }

        .achievement-item.locked {
          opacity: 0.5;
          filter: grayscale(1);
        }

        .achievement-item.unlocked {
          background: linear-gradient(135deg, #4a4a1a 0%, #2a2a0a 100%);
          border: 1px solid #ffd700;
        }

        .achievement-icon {
          font-size: 24px;
          width: 30px;
          text-align: center;
        }

        .achievement-info {
          flex: 1;
        }

        .achievement-name {
          font-size: 8px;
          font-weight: bold;
          color: #fff;
        }

        .achievement-desc {
          font-size: 6px;
          color: #aaa;
        }

        .achievement-check {
          color: #4caf50;
          font-size: 16px;
        }

        /* Achievement Popup */
        .achievement-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
          border: 4px solid #fff;
          border-radius: 12px;
          padding: 20px 30px;
          text-align: center;
          z-index: 1000;
          animation: achievementPop 0.5s ease-out;
        }

        .achievement-popup .title {
          font-size: 10px;
          color: #333;
          margin-bottom: 5px;
        }

        .achievement-popup .icon {
          font-size: 40px;
          margin: 10px 0;
        }

        .achievement-popup .name {
          font-size: 14px;
          font-weight: bold;
          color: #222;
        }

        .achievement-popup .desc {
          font-size: 8px;
          color: #555;
          margin-top: 5px;
        }

        @keyframes achievementPop {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        /* Evolution Animation */
        .evolution-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .evolution-text {
          color: #fff;
          font-size: 12px;
          margin-bottom: 20px;
        }

        .evolution-sprite {
          width: 80px;
          height: 80px;
          animation: evolveGlow 1s infinite alternate;
        }

        @keyframes evolveGlow {
          0% { filter: brightness(1) drop-shadow(0 0 5px #fff); }
          100% { filter: brightness(1.5) drop-shadow(0 0 20px #ffd700); }
        }

        /* Time of Day Indicator */
        .time-indicator {
          position: absolute;
          top: 5px;
          right: 35px;
          font-size: 10px;
          background: rgba(0,0,0,0.5);
          padding: 2px 6px;
          border-radius: 4px;
          color: #fff;
          z-index: 5;
        }

        /* Night mode filter */
        .night-mode .gba-screen {
          filter: brightness(0.7) sepia(0.2);
        }

        .evening-mode .gba-screen {
          filter: brightness(0.85) sepia(0.15);
        }

        .screen-bezel-bottom {
          position: relative;
          flex-shrink: 0;
          background: linear-gradient(180deg, #111a33 0%, #0b1224 100%);
          border-radius: 0;
          min-height: 150px;
          max-height: 40%;
          height: 30%;
          padding: 0;
          overflow: hidden;
          display: flex;
        }

        .bottom-content {
          position: relative;
          width: 100%;
          flex: 1;
          overflow: auto;
          min-height: 0;
          height: 100%;
        }

        .info-panel {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          background: linear-gradient(180deg, rgba(34,22,72,0.94) 0%, rgba(25,16,54,0.96) 100%);
          border-radius: 16px;
          padding: 14px 16px;
          min-height: 68px;
          color: white;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .location {
          font-size: 10px;
          margin-bottom: 10px;
          color: #f4ecff;
        }

        .boot-panel {
          display: grid;
          justify-items: start;
          gap: 6px;
        }

        .boot-led {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, #9dff8f 0%, #4fbf47 55%, #2a7a28 100%);
          box-shadow: 0 0 10px rgba(113, 255, 125, 0.45);
        }

        .boot-brand {
          font-size: 10px;
          color: #fff3af;
        }

        .boot-sub {
          font-size: 6px;
          color: #dcd2ff;
          line-height: 1.5;
        }

        .party-preview {
          display: flex;
          gap: 5px;
        }

        .current-objective {
          font-size: 6px;
          color: #d7c8ff;
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .preview-bestia {
          width: 24px;
          height: 24px;
          background: #555;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .preview-bestia img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .controls-area {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: auto;
        }

        .dpad-container {
          position: absolute;
          left: 26px;
          bottom: 20px;
          width: 144px;
          height: 144px;
          touch-action: none;
          z-index: 5;
          pointer-events: auto;
        }

        .dpad {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .dpad-btn {
          position: absolute;
          width: 46px;
          height: 46px;
          background: linear-gradient(145deg, #5a5a5a, #2d2d2d);
          border: 3px solid #1b1b1b;
          border-radius: 12px;
          color: white;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          box-shadow: 0 4px 0 #181818;
          outline: none;
        }

        .dpad-btn:active, .dpad-btn.pressed {
          background: linear-gradient(145deg, #666, #444);
          box-shadow: 0 4px 0 #181818;
        }

        .dpad-up { 
          top: 0; 
          left: 50%; 
          transform: translateX(-50%);
        }
        .dpad-down { 
          bottom: 0; 
          left: 50%; 
          transform: translateX(-50%);
        }
        .dpad-left { 
          left: 0; 
          top: 50%; 
          transform: translateY(-50%);
        }
        .dpad-right { 
          right: 0; 
          top: 50%; 
          transform: translateY(-50%);
        }
        .dpad-center {
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%);
          width: 22px;
          height: 22px;
          background: linear-gradient(145deg, #505050, #242424);
          border-radius: 50%;
          border: 3px solid #222;
        }

        .action-btns {
          position: absolute;
          right: 22px;
          bottom: 24px;
          width: 148px;
          height: 136px;
          z-index: 5;
          pointer-events: auto;
        }

        .action-btn {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 4px solid #181818;
          font-family: 'Press Start 2P', monospace;
          font-size: 14px;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          box-shadow: 0 6px 0 #141414, inset 0 2px 0 rgba(255,255,255,0.35);
          outline: none;
        }

        #btn-a {
          right: 12px;
          bottom: 10px;
        }

        #btn-b {
          left: 12px;
          top: 8px;
        }

        .action-btn:active {
          box-shadow: 0 6px 0 #141414, inset 0 2px 0 rgba(255,255,255,0.35);
        }

        #btn-a {
          background: linear-gradient(145deg, #e53935, #b71c1c);
          color: white;
        }

        #btn-b {
          background: linear-gradient(145deg, #fb8c00, #e65100);
          color: white;
        }

        /* Pixel Sprite styling */
        .pixel-sprite {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }

        .bestia-sprite.pixel-sprite {
          image-rendering: pixelated;
        }

        .start-select {
          position: absolute;
          left: 50%;
          top: 98px;
          transform: translateX(-50%);
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: center;
          z-index: 5;
          pointer-events: auto;
        }

        .start-btn, .select-btn {
          width: 52px;
          height: 18px;
          background: linear-gradient(180deg, #6a6a6a 0%, #3d3d3d 100%);
          border: 2px solid #1a1a1a;
          border-radius: 10px;
          cursor: pointer;
          transform: rotate(-10deg);
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .start-btn:active, .select-btn:active {
          background: linear-gradient(180deg, #888 0%, #555 100%);
          transform: rotate(-10deg) scale(0.95);
        }

        .start-btn::after,
        .select-btn::after {
          display: none;
        }

        .start-btn::before { content: ''; }
        .select-btn::before { content: ''; }

        .start-btn:hover, .select-btn:hover {
          background: #777;
        }

        /* City Theme Backgrounds */
        .city-canalborgo {
          background: linear-gradient(180deg, #1a5f7a 0%, #0d3b4d 100%);
        }
        
        .city-spritzia {
          background: linear-gradient(180deg, #8d6e63 0%, #5d4037 100%);
        }
        
        .city-veronara {
          background: linear-gradient(180deg, #c62828 0%, #7f0000 100%);
        }
        
        .city-padoana {
          background: linear-gradient(180deg, #5e35b1 0%, #311b92 100%);
        }
        
        .city-trevisella {
          background: linear-gradient(180deg, #558b2f 0%, #33691e 100%);
        }
        
        .city-dolomax {
          background: linear-gradient(180deg, #78909c 0%, #455a64 100%);
        }
        
        .city-gardalago {
          background: linear-gradient(180deg, #0277bd 0%, #01579b 100%);
        }

        /* City Badge */
        .city-badge {
          position: absolute;
          top: 5px;
          right: 5px;
          background: rgba(0,0,0,0.7);
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 6px;
          color: #ffd700;
          z-index: 5;
        }

        /* Delta-like mobile layout */
        @media (max-width: 768px), (max-height: 600px) {
          * {
            max-width: 100vw;
            overflow-x: hidden;
          }

          html, body {
            width: 100%;
            max-width: 100vw;
            overflow-x: hidden;
            overscroll-behavior: none;
          }

          body {
            padding: 0;
            align-items: stretch;
          }

          .game-wrapper {
            width: 100%;
            min-height: 100dvh;
            height: 100dvh;
            max-width: 100vw;
            overflow: hidden;
          }

          .gba-console {
            display: flex;
            flex-direction: column;
            min-height: 100dvh;
            height: 100dvh;
            border: 0;
            border-radius: 0;
            padding: 0;
            gap: 0;
            background: linear-gradient(180deg, #0d1834 0%, #08101f 100%);
            box-shadow: none;
            overflow: hidden;
          }

          .gba-console::before,
          .gba-console::after {
            display: none;
          }

          .top-screen {
            flex: 1;
            min-height: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: stretch;
            overflow: hidden;
          }

          .screen-bezel {
            flex: 1;
            width: 100%;
            height: 100%;
            padding: 0;
            border-radius: 0;
            background: #000;
            box-shadow: none;
            overflow: hidden;
          }

          .game-container {
            width: 100%;
            height: 100%;
            max-width: 100vw;
            border-radius: 0;
            aspect-ratio: auto;
            min-height: 0;
            flex: 1;
          }

          .top-screen, .bottom-screen {
            width: 100%;
            flex-shrink: 0;
          }

          .bottom-screen {
            flex-shrink: 0;
            display: flex;
            align-items: stretch;
            height: auto;
            min-height: auto;
          }

          .screen-bezel-bottom {
            width: 100%;
            height: auto;
            min-height: 22dvh;
            max-height: 30dvh;
            border-radius: 0;
            background: linear-gradient(180deg, #111a33 0%, #0b1224 100%);
          }

          .bottom-content {
            height: auto;
            min-height: 22dvh;
            max-height: 30dvh;
          }

          .info-panel {
            top: 10px;
            left: 12px;
            right: 12px;
            min-height: 54px;
            padding: 10px 12px;
            border-radius: 14px;
          }

          .location {
            font-size: 9px;
            margin-bottom: 8px;
          }

          .current-objective {
            font-size: 6px;
          }

          .dpad-container {
            left: 18px;
            bottom: 40px;
            width: 132px;
            height: 132px;
          }

          .dpad-btn {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }

          .action-btns {
            right: 18px;
            bottom: 40px;
            width: 130px;
            height: 120px;
          }

          .action-btn {
            width: 46px;
            height: 46px;
            font-size: 14px;
          }

          .start-select {
            top: auto;
            bottom: 10px;
            display: flex;
            gap: 18px;
            align-items: center;
            justify-content: center;
          }

          .start-btn,
          .select-btn {
            width: 48px;
            height: 16px;
            transform: rotate(0deg);
          }
        }

        @media (max-width: 400px) {
          .top-screen {
            flex: 1;
            min-height: 0;
          }

          .screen-bezel-bottom,
          .bottom-content {
            min-height: 28dvh;
            flex-shrink: 0;
          }

          .bottom-screen {
            flex-shrink: 0;
            height: auto;
          }

          .dpad-container {
            left: 14px;
            bottom: 34px;
            width: 118px;
            height: 118px;
          }

          .dpad-btn {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .action-btns {
            right: 14px;
            bottom: 34px;
            width: 118px;
            height: 108px;
          }

          .action-btn {
            width: 42px;
            height: 42px;
            font-size: 13px;
          }

          .start-select {
            top: auto;
            bottom: 8px;
            gap: 14px;
          }

          .start-btn,
          .select-btn {
            width: 46px;
            height: 11px;
            transform: rotate(0deg);
          }
        }
        
        /* Prevent text selection on mobile */
        * {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }
        
        button {
          -webkit-appearance: none;
          appearance: none;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
