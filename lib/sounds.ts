// Sound System - Web Audio API based sound effects
// Using synthesized sounds for retro game feel

class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    this.initAudio()
  }

  enable() { this.enabled = true }
  disable() { this.enabled = false }

  private initAudio() {
    if (this.audioContext || typeof window === 'undefined') return

    try {
      const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextCtor) return
      this.audioContext = new AudioContextCtor()
    } catch (error) {
      this.audioContext = null
      this.enabled = false
      console.error('Audio init failed:', error)
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'square', volume: number = 0.1) {
    this.initAudio()
    if (!this.audioContext || !this.enabled) return

    try {
      if (this.audioContext.state === 'suspended') {
        void this.audioContext.resume().catch(() => {})
      }

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.type = type
      oscillator.frequency.value = frequency

      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    } catch (error) {
      console.error('Audio play failed:', error)
    }
  }

  // Button press - short beep
  buttonPress() {
    this.playTone(880, 0.05, 'square', 0.08)
  }

  // Menu select
  menuSelect() {
    this.playTone(523, 0.08, 'square', 0.1)
    setTimeout(() => this.playTone(659, 0.08, 'square', 0.1), 80)
  }

  // Menu back
  menuBack() {
    this.playTone(392, 0.1, 'square', 0.08)
  }

  // Battle - attack
  battleAttack() {
    this.playTone(200, 0.15, 'sawtooth', 0.15)
    setTimeout(() => this.playTone(150, 0.1, 'sawtooth', 0.1), 100)
  }

  // Battle - damage taken
  battleDamage() {
    this.playTone(100, 0.2, 'square', 0.12)
  }

  // Battle - enemy fainted
  battleVictory() {
    const notes = [523, 659, 784, 1047]
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.15, 'square', 0.1), i * 120)
    })
  }

  // Capture ball - throw
  ballThrow() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.playTone(300 + i * 50, 0.05, 'sine', 0.08), i * 50)
    }
  }

  // Capture success
  captureSuccess() {
    const notes = [392, 523, 659, 784, 1047]
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.12, 'sine', 0.1), i * 100)
    })
  }

  // Capture fail
  captureFail() {
    this.playTone(200, 0.3, 'sawtooth', 0.1)
    setTimeout(() => this.playTone(150, 0.3, 'sawtooth', 0.08), 200)
  }

  // Level up
  levelUp() {
    const notes = [523, 659, 784, 1047, 1319]
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.1, 'square', 0.12), i * 80)
    })
  }

  // Evolution
  evolve() {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => this.playTone(400 + i * 100, 0.15, 'sine', 0.1), i * 100)
    }
  }

  // Evolution alias
  evolution() {
    this.evolve()
  }

  // Dialog text
  dialogText() {
    this.playTone(800, 0.02, 'sine', 0.03)
  }

  // Wild encounter
  encounter() {
    this.playTone(300, 0.2, 'square', 0.12)
    setTimeout(() => this.playTone(400, 0.2, 'square', 0.1), 150)
    setTimeout(() => this.playTone(500, 0.2, 'square', 0.08), 300)
  }

  // Badge obtained
  badgeGet() {
    const notes = [523, 784, 1047, 1568]
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.2, 'square', 0.12), i * 150)
    })
  }

  // Item found
  itemFound() {
    this.playTone(600, 0.1, 'sine', 0.1)
    setTimeout(() => this.playTone(800, 0.1, 'sine', 0.1), 100)
  }

  // Menu open
  menuOpen() {
    this.playTone(440, 0.08, 'square', 0.08)
  }

  // Footstep (for walking)
  footstep() {
    this.playTone(100, 0.03, 'square', 0.02)
  }

  // Teleport
  teleport() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const freq = 200 + Math.random() * 400
        this.playTone(freq, 0.05, 'sine', 0.05)
      }, i * 50)
    }
  }

  // Healing
  heal() {
    const notes = [523, 587, 659, 698, 784]
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.15, 'sine', 0.08), i * 100)
    })
  }

  // Coin/Reward
  coin() {
    this.playTone(988, 0.05, 'square', 0.08)
    setTimeout(() => this.playTone(1319, 0.08, 'square', 0.08), 60)
  }

  // Achievement unlocked
  success() {
    const notes = [523, 659, 784, 1047, 1319, 1568]
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.12, 'triangle', 0.1), i * 100)
    })
  }
}

export const soundManager = new SoundManager()
