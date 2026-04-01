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

interface GameState {
  player: { name: string; x: number; y: number; money: number; badges: string[] }
  party: PartyBestia[]
  rival?: PartyBestia
  pc: PartyBestia[]
  inv: { item: GameItem; qty: number }[]
  flags: Record<string, boolean>
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

// Intro animation frames
const INTRO_FRAMES = [
  { text: '★ POKEMONA ★', subtext: 'Besti di Venetia', delay: 2000 },
  { text: 'Una regione magica...', subtext: 'Dove i canali cantano', delay: 1500 },
  { text: 'Dove i Besti regnano...', subtext: 'Tra spritz e polenta', delay: 1500 },
  { text: 'La tua avventura inizia ora!', subtext: '', delay: 2000 },
]

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
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
  const [showIntro, setShowIntro] = useState(true)
  const [introFrame, setIntroFrame] = useState(0)
  const [showIntroText, setShowIntroText] = useState(false)
  
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
    player: { name: 'Federico', x: 7, y: 9, money: 3000, badges: [] },
    party: [],
    rival: undefined,
    pc: [],
    inv: [
      { item: ITEMS.pozioncino, qty: 5 },
      { item: ITEMS.gondolball, qty: 5 },
      { item: ITEMS.caffe, qty: 3 },
    ],
    flags: { hasStarter: false, hasBike: false, hasBoat: false },
    map: 'canalborgo',
    vehicle: 'none',
    storyProgress: 0,
    defeatedRival: false,
    achievements: [],
    evolutions: 0,
    citiesVisited: [],
  })

  // Save/Load System
  const saveGame = useCallback(() => {
    try {
      const saveData = {
        ...gs,
        savedAt: new Date().toISOString(),
        version: '1.0.0',
      }
      localStorage.setItem('pokemona_save', JSON.stringify(saveData))
      setNotification('Partita salvata!')
      soundManager.levelUp()
    } catch (e) {
      console.error('Save failed:', e)
      setNotification('Errore nel salvataggio!')
    }
  }, [gs])

  const loadGame = useCallback(() => {
    try {
      const saved = localStorage.getItem('pokemona_save')
      if (saved) {
        const saveData = JSON.parse(saved)
        setGs({
          player: saveData.player,
          party: saveData.party,
          rival: saveData.rival,
          pc: saveData.pc,
          inv: saveData.inv.map((i: { item: string; qty: number }) => ({
            item: ITEMS[i.item] || ITEMS.pozioncino,
            qty: i.qty
          })),
          flags: saveData.flags,
          map: saveData.map,
          vehicle: saveData.vehicle,
          storyProgress: saveData.storyProgress,
          defeatedRival: saveData.defeatedRival,
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
  }, [])

  const hasSave = useCallback(() => {
    return localStorage.getItem('pokemona_save') !== null
  }, [])

  const deleteSave = useCallback(() => {
    localStorage.removeItem('pokemona_save')
    setNotification('Salvataggio eliminato!')
  }, [])

  // Auto-load on mount
  useEffect(() => {
    const saved = localStorage.getItem('pokemona_save')
    if (saved) {
      try {
        const saveData = JSON.parse(saved)
        setGs({
          player: saveData.player,
          party: saveData.party,
          rival: saveData.rival,
          pc: saveData.pc,
          inv: saveData.inv.map((i: { item: string; qty: number }) => ({
            item: ITEMS[i.item] || ITEMS.pozioncino,
            qty: i.qty
          })),
          flags: saveData.flags,
          map: saveData.map,
          vehicle: saveData.vehicle,
          storyProgress: saveData.storyProgress,
          defeatedRival: saveData.defeatedRival,
        })
      } catch (e) {
        console.error('Auto-load failed:', e)
      }
    }
  }, [])

  // Intro animation effect
  useEffect(() => {
    if (!showIntro) return
    
    const frame = INTRO_FRAMES[introFrame]
    if (!frame) {
      setShowIntro(false)
      setGameStarted(true)
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
  const skipIntro = () => {
    setShowIntro(false)
    setGameStarted(true)
  }

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
  const getBestiaSprite = (id: string, isBack: boolean = false): string => {
    // Try pixel sprites first
    const pixelUrl = getSpriteUrl(id, isBack)
    if (pixelUrl) return pixelUrl
    
    // Fallback to SVG sprites
    const sprite = BESTI_SVG_SPRITES[id] || BESTI_SPRITES[id] || getDefaultSprite()
    return isBack ? (sprite.back || sprite.front) : sprite.front
  }

  // Get icon sprite
  const getBestiaIcon = (id: string): string => {
    // Try pixel sprites first
    const iconUrl = getIconUrl(id)
    if (iconUrl) return iconUrl
    
    // Fallback to SVG sprites
    const sprite = BESTI_SVG_SPRITES[id] || BESTI_SPRITES[id] || getDefaultSprite()
    return sprite.icon || sprite.front
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
        
        // Add trees for outdoor grass
        if (!indoor && t === 0 && ((x * 7 + y * 11) % 17 === 0)) {
          // Tree
          ctx.fillStyle = '#5d4037'
          ctx.fillRect((x - sx) * TILE + 6, (y - sy) * TILE + 8, 4, 8)
          ctx.fillStyle = '#2e7d32'
          ctx.beginPath()
          ctx.arc((x - sx) * TILE + 8, (y - sy) * TILE + 6, 7, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#388e3c'
          ctx.beginPath()
          ctx.arc((x - sx) * TILE + 6, (y - sy) * TILE + 4, 5, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Add grass tufts for outdoor
        if (!indoor && t === 0 && (x + y) % 4 === 0) {
          ctx.fillStyle = '#3d8b3d'
          ctx.fillRect((x - sx) * TILE + 3, (y - sy) * TILE + 2, 2, 5)
          ctx.fillRect((x - sx) * TILE + 10, (y - sy) * TILE + 4, 2, 4)
        }
      }
    }

    // Draw events with Pokemon-style sprites
    map.events?.forEach((e: MapEvent) => {
      if (e.x >= sx && e.x < sx + MAPW && e.y >= sy && e.y < sy + MAPH) {
        const ex = (e.x - sx) * TILE
        const ey = (e.y - sy) * TILE
        
        if (e.type === 'trainer' || e.type === 'gym' || e.type === 'npc') {
          // NPC with shadow
          ctx.fillStyle = 'rgba(0,0,0,0.3)'
          ctx.beginPath()
          ctx.ellipse(ex + 8, ey + 14, 6, 3, 0, 0, Math.PI * 2)
          ctx.fill()
          
          // Body
          ctx.fillStyle = e.isEnemy ? '#8B0000' : e.type === 'gym' ? '#FFD700' : '#3f51b5'
          ctx.fillRect(ex + 2, ey + 4, 12, 10)
          
          // Head
          ctx.fillStyle = '#ffcc80'
          ctx.beginPath()
          ctx.arc(ex + 8, ey + 3, 5, 0, Math.PI * 2)
          ctx.fill()
          
          // Hair/hat
          ctx.fillStyle = e.isEnemy ? '#5d0000' : e.type === 'gym' ? '#b8860b' : '#333'
          ctx.fillRect(ex + 3, ey - 2, 10, 4)
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
    
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.beginPath()
    ctx.ellipse(px + 8, py + 14, 6, 3, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // Body
    ctx.fillStyle = '#2196f3'
    ctx.fillRect(px + 4, py + 6 + bobOffset, 8, 8)
    
    // Head
    ctx.fillStyle = '#ffcc80'
    ctx.beginPath()
    ctx.arc(px + 8, py + 5 + bobOffset, 4, 0, Math.PI * 2)
    ctx.fill()
    
    // Hair
    ctx.fillStyle = '#5d4037'
    ctx.fillRect(px + 5, py + 1 + bobOffset, 6, 3)
    
    // Backpack
    ctx.fillStyle = '#f44336'
    ctx.fillRect(px + 2, py + 8 + bobOffset, 3, 5)
  }, [gs])

  // Move player
  const move = useCallback((dir: string) => {
    if (inBattle || inDialog || inShop || animating) return
    let nx = gs.player.x
    let ny = gs.player.y
    if (dir === 'up') ny--
    if (dir === 'down') ny++
    if (dir === 'left') nx--
    if (dir === 'right') nx++

    const map = MAPS[gs.map]
    if (!map.tiles[ny] || !map.tiles[ny][nx]) return
    
    const tile = map.tiles[ny][nx]
    if (!canMoveOnTile(tile, gs.vehicle)) return

    setGs(prev => ({ ...prev, player: { ...prev.player, x: nx, y: ny } }))
    soundManager.footstep()
  }, [gs, inBattle, inDialog, inShop, animating])

  // Handle map events
  const handleEvent = useCallback((ev: MapEvent) => {
    switch (ev.type) {
      case 'npc':
        if (ev.givesStarter && !gs.flags.hasStarter) {
          setDialogs(ev.dialog || [])
          setSpeaker(ev.name || '')
          setDialogCallback(() => setShowStarterChoice(true))
          setInDialog(true)
        } else if (ev.dialog) {
          setDialogs(ev.dialog)
          setSpeaker(ev.name || '')
          setDialogCallback(() => {
            if (ev.gift) {
              if (ev.gift === 'starter') {
                setShowStarterChoice(true)
                return
              }
              if (ev.gift === 'biciRubata') {
                setGs(prev => ({ ...prev, vehicle: 'biciRubata' as VehicleType, flags: { ...prev.flags, hasBike: true } }))
                setNotification('Ottenuto: Bici Rubata!')
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
        setGs(prev => ({ ...prev, map: ev.dest!, player: { ...prev.player, x: ev.dx!, y: ev.dy! } }))
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
        } else {
          startTrainerBattle(ev)
        }
        break
      case 'trainer':
        startTrainerBattle(ev)
        break
    }
  }, [gs])

  // Check for events at current position
  const checkEvents = useCallback(() => {
    const map = MAPS[gs.map]
    
    // Item pickup
    const itemEv = map.events?.find((e: MapEvent) => e.type === 'item' && e.x === gs.player.x && e.y === gs.player.y)
    if (itemEv && itemEv.item) {
      const foundItem = ITEMS[itemEv.item.name.toLowerCase().replace(/ /g, '')] || Object.values(ITEMS).find(i => i.name === itemEv.item!.name)
      if (foundItem) {
        const existing = gs.inv.find(i => i.item.name === foundItem.name)
        if (existing) {
          setGs(prev => ({
            ...prev,
            inv: prev.inv.map(i => i.item.name === foundItem.name ? { ...i, qty: i.qty + 1 } : i)
          }))
        } else {
          setGs(prev => ({ ...prev, inv: [...prev.inv, { item: foundItem, qty: 1 }] }))
        }
        soundManager.itemFound()
        setNotification(`Trovato: ${foundItem.name}!`)
        setTimeout(() => setNotification(''), 2000)
      }
    }

    // Event interaction
    const ev = map.events?.find((e: MapEvent) => {
      if (e.type === 'npc' || e.type === 'trainer' || e.type === 'gym') {
        return e.x === gs.player.x && e.y === gs.player.y
      }
      if (e.type === 'sign' || e.type === 'warp' || e.type === 'heal' || e.type === 'shop') {
        return e.x === gs.player.x && e.y === gs.player.y
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
    }))
    
    setShowStarterChoice(false)
    setDialogs([
      `Hai scelto ${b.name}!`,
      `Come osi! Io prendo ${rivalStarter.name}!`,
      `Il più forte, ovviamente!`,
      `Preparati, perchè ti batterò!`,
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
    }))

    // Check for level up
    setTimeout(() => checkLevelUp(), 500)
  }, [battleState])

  // Check for level up
  const checkLevelUp = useCallback(() => {
    const p = gs.party[0]
    if (p && p.exp >= p.expTL) {
      const newLvl = p.level + 1
      const newExpTL = newLvl * 100
      const lf = newLvl / 50
      const newHp = Math.floor(BESTI[p.id]?.bs.hp * lf + 10 + newLvl) || p.maxHp + 5
      const newAtk = Math.floor((BESTI[p.id]?.bs.atk || 50) * lf + 5)
      const newDef = Math.floor((BESTI[p.id]?.bs.def || 50) * lf + 5)
      const newSpd = Math.floor((BESTI[p.id]?.bs.spd || 50) * lf + 5)

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
      if (BESTI[p.id]?.ev && newLvl >= (BESTI[p.id]?.evLvl || 99)) {
        setTimeout(() => evolveBestia(p.id, BESTI[p.id].ev!), 1000)
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
    } else {
      const nextIdx = battleState!.enemyIdx + 1
      
      // Check if it was rival battle
      if (battleState!.trainerName === 'Marco' && nextIdx === battleState!.enemyTeam.length) {
        setBattleMsg(`Hai vinto contro Marco!`)
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
          setGs(prev => ({ ...prev, player: { ...prev.player, money: prev.player.money + reward, badges: ['league_pass', ...prev.player.badges] } }))
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
            inv: prev.inv.map(i => i.item.id === ballId ? { ...i, qty: i.qty - 1 } : i)
          }))
        } else {
          setGs(prev => ({
            ...prev,
            pc: [...prev.pc, caught],
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
    setOverlayTitle('BESTIDEX')
    setOverlayContent(
      <div className="dex-grid">
        {Object.values(BESTI).slice(0, 50).map(b => (
          <div key={b.id} className="dex-entry">
            <img src={getBestiaIcon(b.id)} className="dex-sprite" alt={b.name} />
            <div className="dex-num">#{String(b.id).padStart(3, '0')}</div>
            <div className="dex-name">{b.name}</div>
            <div className="dex-types">{b.types.map(t => <span key={t} className={`type-badge type-${t}`}>{t}</span>)}</div>
          </div>
        ))}
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
    const battlesWon = gs.flags.battlesWon || 0
    
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
          id: newForm,
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

  const toggleMenu = () => {
    soundManager.menuOpen()
    if (inMenu) {
      setInMenu(false)
      setShowOverlay(false)
    } else {
      setOverlayTitle('MENU')
      setOverlayContent(
        <div className="menu-options">
          <div className="menu-option" onClick={() => { showParty(); setInMenu(false) }}>Squadra</div>
          <div className="menu-option" onClick={() => { showBag(); setInMenu(false) }}>Zaino</div>
          <div className="menu-option" onClick={() => { showPokedex(); setInMenu(false) }}>BestiDex</div>
          <div className="menu-option" onClick={() => { showTeleport(); }}>Teletrasporto</div>
          <div className="menu-option" onClick={() => { showAchievements(); }}>🏆 Trofei</div>
          <div className="menu-option" onClick={() => { showSave(); }}>💾 Salva</div>
          <div className="menu-option" onClick={() => { showLoad(); }}>📂 Carica</div>
          <div className="menu-option" onClick={() => { setInMenu(false) }}>❌ Chiudi</div>
        </div>
      )
      setShowOverlay(true)
      setInMenu(true)
    }
  }

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

  // Handle A button
  const handleA = () => {
    soundManager.buttonPress()
    if (inDialog) {
      advanceDialog()
      return
    }
    if (inShop) {
      setInShop(false)
      return
    }
    if (showOverlay) {
      setShowOverlay(false)
      return
    }
    checkEvents()
  }

  // Handle B button
  const handleB = () => {
    soundManager.menuBack()
    if (inDialog) {
      setInDialog(false)
      setDialogs([])
      return
    }
    if (inShop) {
      setInShop(false)
      return
    }
    if (showOverlay) {
      setShowOverlay(false)
      return
    }
    toggleMenu()
  }

  // Effects
  useEffect(() => {
    if (!gameStarted) return
    const interval = setInterval(() => {
      if (!inBattle && !inDialog && !inShop) draw()
    }, 100)
    return () => clearInterval(interval)
  }, [gameStarted, inBattle, inDialog, inShop, draw])

  useEffect(() => {
    if (!gameStarted) return
    checkEvents()
    const map = MAPS[gs.map]
    if (map.wild && map.wild.length && Math.random() * 100 < (map.wildRate || 10)) {
      startWild()
    }
  }, [gs.player.x, gs.player.y, gs.map, gameStarted])

  useEffect(() => {
    if (battleState) {
      setEnemyHp({ current: battleState.enemy.hp, max: battleState.enemy.maxHp })
      setPlayerHp({ current: gs.party[0]?.hp || 0, max: gs.party[0]?.maxHp || 1 })
    }
  }, [battleState, gs.party])

  // Day/Night cycle - update every minute
  useEffect(() => {
    if (!gameStarted) return
    const updateTime = () => setTimeOfDay(getTimeOfDay())
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [gameStarted])

  // Auto-save every 5 minutes
  useEffect(() => {
    if (!gameStarted) return
    const interval = setInterval(() => {
      if (gs.party.length > 0) saveGame(true)
    }, 300000)
    return () => clearInterval(interval)
  }, [gameStarted, gs])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!gameStarted) return
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': move('up'); break
        case 'ArrowDown': case 's': case 'S': move('down'); break
        case 'ArrowLeft': case 'a': case 'A': move('left'); break
        case 'ArrowRight': case 'd': case 'D': move('right'); break
        case 'Enter': case 'z': case 'Z': handleA(); break
        case 'Escape': case 'x': case 'X': handleB(); break
        case ' ':
          if (inDialog) advanceDialog()
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [gameStarted, inDialog, move, handleA, handleB, advanceDialog])

  return (
    <div className="game-wrapper">
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
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                  <div className="intro-content">
                    <img 
                      src={BESTI_SVG_SPRITES.serenissima?.front} 
                      alt="Serenissima"
                      className="intro-sprite"
                    />
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
              {!gameStarted && !showIntro && (
                <div className="title-screen">
                  <div className="title-particles">
                    {[...Array(15)].map((_, i) => (
                      <div 
                        key={i} 
                        className="particle"
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`
                        }}
                      />
                    ))}
                  </div>
                  <div className="title-logo">POKEMONA</div>
                  <div className="title-subtitle">Besti di Venetia</div>
                  <div className="title-bestia">
                    <img src={getBestiaSprite('dolomitor')} alt="Dolomitor" className="title-sprite-float pixel-sprite" />
                    <img src={getBestiaSprite('lagorion')} alt="Lagorion" className="title-sprite-float pixel-sprite" style={{animationDelay: '0.5s'}} />
                    <img src={getBestiaSprite('serenissima')} alt="Serenissima" className="title-sprite-float pixel-sprite" style={{animationDelay: '1s'}} />
                    <img src={getBestiaSprite('ombradriz')} alt="OmbraSpritz" className="title-sprite-float pixel-sprite" style={{animationDelay: '1.5s'}} />
                  </div>
                  <button className="start-btn-large" onClick={() => {
                    setGameStarted(true)
                    // Start intro dialog
                    setDialogs([
                      'Buongiorno, tesoro mio!',
                      'Oggi è il giorno importante!',
                      'Devi andare dal Professor Barcaro!',
                    ])
                    setSpeaker('Mamma')
                    setDialogCallback(() => {
                      setDialogs([
                        'Ah, sei arrivato finalmente!',
                        'Sono il Prof. Barcaro!',
                        'Ho 4 Besti leggendari per te!',
                        'Scegli il tuo compagno!',
                      ])
                      setSpeaker('Prof. Barcaro')
                      setInDialog(true)
                    })
                    setInDialog(true)
                  }}>
                    NUOVA PARTITA
                  </button>
                </div>
              )}

              {/* HUD */}
              {gameStarted && !inBattle && !showIntro && (
                <div className="hud-top">
                  <span className="hud-name">{gs.player.name}</span>
                  <span className="hud-money">₿{gs.player.money}</span>
                </div>
              )}
              
              {/* City Badge */}
              {gameStarted && !inBattle && !inDialog && !showOverlay && !showIntro && (
                <div className="city-badge">
                  {MAPS[gs.map]?.name || '???'}
                </div>
              )}

              {/* Time of Day Indicator */}
              {gameStarted && !inBattle && !inDialog && !showOverlay && !showIntro && (
                <div className="time-indicator">
                  {timeOfDay === 'morning' && '☀️'}
                  {timeOfDay === 'afternoon' && '🌤️'}
                  {timeOfDay === 'evening' && '🌅'}
                  {timeOfDay === 'night' && '🌙'}
                </div>
              )}
              
              {/* Floor Indicator for Multi-floor Buildings */}
              {gameStarted && !inBattle && !inDialog && !showIntro && (
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
                  
                  {/* Stairs Indicator - show when player is near stairs */}
                  {(() => {
                    const currentMap = MAPS[gs.map]
                    const playerTile = currentMap?.tiles?.[gs.player.y]?.[gs.player.x]
                    const hasStairsNearby = currentMap?.events?.some(e => 
                      e.type === 'warp' && 
                      Math.abs(e.x - gs.player.x) <= 1 && 
                      Math.abs(e.y - gs.player.y) <= 1
                    )
                    if (playerTile === 9 || playerTile === 10 || hasStairsNearby) {
                      return (
                        <div className="stairs-indicator">
                          ⬆️ Premi SPACE per salire/scendere
                        </div>
                      )
                    }
                    return null
                  })()}
                </>
              )}

              {/* Dialog */}
              {inDialog && (
                <div className="dialog-box">
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
                      src={getBestiaSprite(battleState?.enemy.id, false)}
                      className={`bestia-sprite enemy-sprite pixel-sprite ${battleAnimation === 'damage' ? 'damage-animation' : ''}`}
                      alt={battleState?.enemy.name}
                    />
                  </div>
                    
                  {/* Player Bestia */}
                  <div className="player-area">
                    <img 
                      src={getBestiaSprite(gs.party[0].id, true)} 
                      className={`bestia-sprite player-sprite pixel-sprite ${battleAnimation === 'attack' ? 'attack-animation' : ''}`}
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

              {/* Overlay (Menus) */}
              {showOverlay && (
                <div className="overlay">
                  <div className="overlay-header">{overlayTitle}</div>
                  <button className="close-btn" onClick={() => setShowOverlay(false)}>✕</button>
                  <div className="overlay-content">{overlayContent}</div>
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
                <div className="location">{MAPS[gs.map]?.name || '???'}</div>
                <div className="party-preview">
                  {gs.party.slice(0, 3).map((b, i) => (
                    <div key={i} className="preview-bestia">
                      <img src={getBestiaIcon(b.id)} alt={b.name} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="controls-area">
                {/* D-Pad with MOBILE support */}
                <div className="dpad-container">
                  <div className="dpad">
                    <button 
                      className="dpad-btn dpad-up" 
                      onTouchStart={(e) => { e.preventDefault(); move('up'); }}
                      onMouseDown={() => move('up')}
                    >▲</button>
                    <button 
                      className="dpad-btn dpad-down" 
                      onTouchStart={(e) => { e.preventDefault(); move('down'); }}
                      onMouseDown={() => move('down')}
                    >▼</button>
                    <button 
                      className="dpad-btn dpad-left" 
                      onTouchStart={(e) => { e.preventDefault(); move('left'); }}
                      onMouseDown={() => move('left')}
                    >◀</button>
                    <button 
                      className="dpad-btn dpad-right" 
                      onTouchStart={(e) => { e.preventDefault(); move('right'); }}
                      onMouseDown={() => move('right')}
                    >▶</button>
                    <div className="dpad-center"></div>
                  </div>
                </div>

                {/* Action Buttons - MOBILE TOUCH */}
                <div className="action-btns">
                  <button 
                    className="action-btn" 
                    id="btn-a" 
                    onClick={handleA}
                    onTouchEnd={(e) => { e.preventDefault(); handleA(); }}
                  >A</button>
                  <button 
                    className="action-btn" 
                    id="btn-b" 
                    onClick={handleB}
                    onTouchEnd={(e) => { e.preventDefault(); handleB(); }}
                  >B</button>
                </div>

                {/* Start/Select */}
                <div className="start-select">
                  <button 
                    className="start-btn" 
                    onClick={toggleMenu}
                    onTouchEnd={(e) => { e.preventDefault(); toggleMenu(); }}
                  ></button>
                  <button className="select-btn"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          min-height: 100vh; 
          display: flex; 
          justify-content: center; 
          align-items: center;
          font-family: 'Press Start 2P', monospace;
        }

        .game-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .gba-console {
          background: linear-gradient(145deg, #2d2d2d, #1a1a1a);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 
            0 10px 40px rgba(0,0,0,0.5),
            inset 0 2px 0 rgba(255,255,255,0.1);
          max-width: 320px;
        }

        .top-screen, .bottom-screen {
          margin-bottom: 15px;
        }

        .screen-bezel {
          background: #111;
          border-radius: 10px;
          padding: 8px;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
        }

        .game-container {
          position: relative;
          width: 240px;
          height: 160px;
          background: #000;
          overflow: hidden;
        }

        .game-canvas {
          display: block;
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

        .title-screen {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #1e3a5f 0%, #0d1b2a 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          overflow: hidden;
        }

        .title-particles {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          animation: rise 4s infinite;
        }

        @keyframes rise {
          0% { transform: translateY(160px) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px) scale(1); opacity: 0; }
        }

        .title-logo {
          font-size: 24px;
          color: #ffd700;
          text-shadow: 2px 2px 0 #b8860b, 4px 4px 0 #8b6914;
          animation: pulse 2s infinite;
          z-index: 1;
        }

        .title-subtitle {
          font-size: 8px;
          margin-top: 10px;
          color: #87ceeb;
          z-index: 1;
        }

        .title-bestia {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          z-index: 1;
        }

        .title-sprite-float {
          width: 40px;
          height: 40px;
          animation: titleFloat 2s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
        }

        @keyframes titleFloat {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }

        .start-btn-large {
          margin-top: 30px;
          padding: 10px 20px;
          background: linear-gradient(180deg, #4caf50, #2e7d32);
          border: none;
          border-radius: 5px;
          color: white;
          font-family: inherit;
          font-size: 8px;
          cursor: pointer;
          box-shadow: 0 4px 0 #1b5e20;
          z-index: 1;
          transition: all 0.2s;
        }

        .start-btn-large:hover {
          background: linear-gradient(180deg, #66bb6a, #4caf50);
          transform: scale(1.05);
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
          bottom: 5px;
          left: 5px;
          right: 5px;
          background: white;
          border: 2px solid #333;
          border-radius: 5px;
          padding: 8px;
          min-height: 50px;
          z-index: 20;
        }

        .dialog-speaker {
          font-size: 7px;
          color: #1976d2;
          margin-bottom: 4px;
        }

        .dialog-text {
          font-size: 8px;
          line-height: 1.4;
        }

        .dialog-arrow {
          position: absolute;
          bottom: 5px;
          right: 5px;
          font-size: 8px;
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

        .battle-scene {
          position: absolute;
          inset: 0;
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
          top: 10px;
          right: 10px;
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

        .hp-bar {
          width: 80px;
          height: 6px;
          background: #333;
          border-radius: 3px;
          margin-top: 4px;
        }

        .hp-fill {
          height: 100%;
          background: linear-gradient(180deg, #4caf50, #2e7d32);
          border-radius: 3px;
          transition: width 0.3s;
        }

        .hp-fill.low {
          background: linear-gradient(180deg, #f44336, #c62828);
        }

        .bestia-sprite {
          width: 64px;
          height: 64px;
          image-rendering: pixelated;
          transition: transform 0.2s;
        }

        .enemy-sprite {
          position: absolute;
          top: 25px;
          right: 20px;
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
          bottom: 30px;
          left: 10px;
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }

        .player-sprite.attack-animation {
          animation: attack 0.3s ease-out;
        }

        @keyframes attack {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }

        .player-info {
          font-size: 7px;
          color: white;
          text-shadow: 1px 1px 0 #000;
        }

        .player-name-row {
          display: flex;
          gap: 10px;
        }

        .player-name { color: #64b5f6; }

        .hp-text {
          font-size: 6px;
          margin-top: 2px;
        }

        .battle-message {
          position: absolute;
          bottom: 80px;
          left: 5px;
          right: 5px;
          background: white;
          padding: 8px;
          border-radius: 5px;
          font-size: 7px;
          text-align: center;
          z-index: 10;
        }

        .battle-menu, .moves-menu {
          position: absolute;
          bottom: 5px;
          left: 5px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3px;
          width: 145px;
          z-index: 10;
        }

        .battle-btn, .move-btn {
          background: white;
          border: 2px solid #333;
          border-radius: 3px;
          padding: 5px;
          font-family: inherit;
          font-size: 6px;
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
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.95);
          padding: 10px;
          overflow-y: auto;
          z-index: 30;
        }

        .overlay-header {
          font-size: 10px;
          text-align: center;
          padding-bottom: 10px;
          border-bottom: 2px solid #333;
          margin-bottom: 10px;
        }

        .close-btn {
          position: absolute;
          top: 5px;
          right: 5px;
          background: #f44336;
          color: white;
          border: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 10px;
        }

        .overlay-content {
          font-size: 7px;
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

        /* Bottom Screen */
        .screen-bezel-bottom {
          background: #222;
          border-radius: 10px;
          padding: 10px;
        }

        .bottom-content {
          display: flex;
          gap: 10px;
        }

        .info-panel {
          flex: 1;
          background: #333;
          border-radius: 5px;
          padding: 8px;
          color: white;
        }

        .location {
          font-size: 8px;
          margin-bottom: 8px;
        }

        .party-preview {
          display: flex;
          gap: 5px;
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
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .dpad-container {
          position: relative;
          width: 90px;
          height: 90px;
          touch-action: none;
        }

        .dpad {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .dpad-btn {
          position: absolute;
          width: 32px;
          height: 32px;
          background: linear-gradient(145deg, #555, #333);
          border: 2px solid #222;
          border-radius: 6px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          box-shadow: 0 3px 0 #222;
        }

        .dpad-btn:active, .dpad-btn.pressed {
          background: linear-gradient(145deg, #666, #444);
          transform: translateY(2px);
          box-shadow: 0 1px 0 #222;
        }

        .dpad-up { 
          top: 2px; 
          left: 50%; 
          transform: translateX(-50%);
          border-radius: 6px 6px 0 0;
        }
        .dpad-down { 
          bottom: 2px; 
          left: 50%; 
          transform: translateX(-50%);
          border-radius: 0 0 6px 6px;
        }
        .dpad-left { 
          left: 2px; 
          top: 50%; 
          transform: translateY(-50%);
          border-radius: 6px 0 0 6px;
        }
        .dpad-right { 
          right: 2px; 
          top: 50%; 
          transform: translateY(-50%);
          border-radius: 0 6px 6px 0;
        }
        .dpad-center { 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%);
          width: 26px;
          height: 26px;
          background: linear-gradient(145deg, #444, #222);
          border-radius: 50%;
          border: 2px solid #333;
        }

        .action-btns {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid #222;
          font-family: 'Press Start 2P', monospace;
          font-size: 12px;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          box-shadow: 0 4px 0 #222;
        }

        .action-btn:active {
          transform: translateY(3px);
          box-shadow: 0 1px 0 #222;
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
          display: flex;
          gap: 10px;
          margin-left: 10px;
        }

        .start-btn, .select-btn {
          width: 30px;
          height: 10px;
          background: #555;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

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

        /* Responsive GameBoy */
        @media (max-width: 400px) {
          .gba-console {
            transform: scale(1);
            transform-origin: top center;
            padding: 10px;
          }
          
          .game-wrapper {
            padding: 5px;
          }
          
          .dpad-container {
            width: 100px !important;
            height: 100px !important;
          }
          
          .dpad-btn {
            width: 36px !important;
            height: 36px !important;
            font-size: 16px !important;
          }
          
          .action-btn {
            width: 45px !important;
            height: 45px !important;
            font-size: 14px !important;
          }
        }

        @media (min-width: 800px) {
          .gba-console {
            transform: scale(1.2);
            transform-origin: top center;
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
