---
title: af
sdk: docker
emoji: 🚀
colorTo: red
---
# 🎮 Bestie de Venetia - Bestie de Venetia

Un gioco RPG estilo Pokemon ambientato nella regione veneta con Bestie ispirati alla cucina e cultura italiana.

![Game](https://img.shields.io/badge/Game-Pokemon%20style-blue)
![Platform](https://img.shields.io/badge/Platform-Next.js-green)
![Deploy](https://img.shields.io/badge/Deploy-Vercel/HF%20Spaces-orange)

---

## 🚀 Quick Start

### Gioca Subito (Standalone HTML)
Apri [`public/index.html`](public/index.html) nel browser!

### Next.js Development
```bash
npm install
npm run dev
```

---

## 🎮 Caratteristiche Complete

| Feature | Status |
|---------|--------|
| **50+ Bestie unici** | ✅ |
| **4 Bestie Leggendari starter** | ✅ |
| **7 città tematiche** | ✅ |
| **Sistema battaglia completo** | ✅ |
| **Cattura Bestie** | ✅ |
| **Pixel art sprites** | ✅ |
| **Effetti sonori** | ✅ |
| **Mobile touch controls** | ✅ |
| **Indoor/Outdoor grafica** | ✅ |
| **Teleportation system** | ✅ |
| **Elite Four** | ✅ |
| **Achievement System (20+ trofei)** | ✅ |
| **Evolution Stones (15 pietre)** | ✅ |
| **Day/Night Cycle** | ✅ |
| **Multi-floor buildings** | ✅ |
| **15 Pokeball types** | ✅ |
| **35+ TM moves** | ✅ |
| **30+ NPCs fastidiosi** | ✅ |
| **Save/Load system** | ✅ |
| **Quest system** | ✅ |

---

## 🎨 Bestie Leggendari (Starter)

| Bestia | Tipi | Descrizione |
|--------|------|------------|
| **Dolomitor** | 🧊 Ghiaccio / 🌍 Terra | Spirito delle Dolomiti |
| **Lagorion** | 💧 Acqua / 🐉 Drago | Signore del Lago |
| **Serenissima** | 🧠 Psico / 💨 Aria | Spirito di Venezia |
| **OmbraSpritz** | ✨ Magico / ☠️ Veleno | Spirito degli Aperitivi |

---

## 🏆 Elite Four Challenge

Dopo aver sconfitto tutti gli 8 GYM, affronta la **Lega Bestie**:

1. **Il Fuocoso** - Specialista Fuoco (lvl 45-43)
2. **L'Acquoso** - Specialista Acqua (lvl 46-44)
3. **Il Naturale** - Specialista Terra (lvl 47-45)
4. **Il Magico** - Specialista Magia (lvl 48-47)

**E infine... il CAMPIONE!**

5. **DUX VENETIAE** - I 4 Leggendari (lvl 50-52)

---

## 📱 Controlli

| Azione | Desktop | Mobile |
|--------|---------|--------|
| Movimento | WASD / Frecce | D-Pad |
| Conferma | Z / Enter | Pulsante A |
| Menu | X / Esc | Pulsante B |
| Dialogo | Space | Tap |
| Inventario | I | Menu |

---

## 🌆 Città del Gioco

1. **Canalborgo** - Città dei canali (Venezia) 💙
2. **Spritzia** - Città dell'aperitivo (Prosecco) 🧡
3. **Veronara** - Città dell'amore (Arena) ❤️
4. **Padoana** - Città dell'università 💜
5. **Trevisella** - Città del radicchio 💚
6. **Dolomax** - Città delle montagne 🤍
7. **Gardalago** - Città del lago (Finale) 💙

---

## 🎒 Sistema Items

### Pokeball (15 tipi)
- Gondolball, Mascheraball, Spritzball, Polentaball, Scampaball
- Vinoball, Lagunaball, Montagnaball, Aereoball, Graticciaball
- Serenaball, Dragoball, Dogeball, Carnevaleball, Fantasmaball

### Evolution Stones (15 tipi)
- Pietra Focaia, Acquatica, Tuono, Verde, Ghiaccio
- Luna, Sole, Alba, Tramonto, Fulmine, Temporale
- Polenta, Maschera, Ombra, Drago

---

## 👥 NPCs Fastidiosi

- **Maranza** - Il milanese fastidioso
- **Terroni** - Vari napoletani che parlano
- **Zii Imbarazzanti** - Zio e Zia che chiedono sempre di te
- **Filosofo Torinese** - Dice sempre cose strane
- **Commentatore Calabrese** - "MA CHE BELLU!"
- **Nonna Maria** - Preoccupata sempre
- **Attivista Greta** - Diriti dei Bestie
- **E tanti altri...**

---

## ☁️ Deploy

### Vercel (Next.js)
```bash
npm install
npm run dev
# or
vercel deploy
```

### HuggingFace Spaces (Static)
1. Vai su [huggingface.co/new-space](https://huggingface.co/new-space)
2. Seleziona **"Static"** come SDK
3. Carica `public/index.html` come `index.html`
4. Fatto! 🎉

### GitHub + HF Spaces
1. Push su GitHub
2. Importa su HuggingFace Spaces

---

## 📁 Struttura Progetto

```
bestie_de_venetia-next/
├── app/
│   ├── page.tsx          # Main game (3300+ lines)
│   ├── layout.tsx        # App layout
│   └── globals.css       # Styles
├── lib/
│   ├── besti.ts          # Bestie data (50+ creatures)
│   ├── pixelSprites.ts   # Pixel art sprites
│   ├── maps.ts           # Map definitions (7 cities + dungeons)
│   ├── dialogs.ts        # Dialog system
│   ├── npcs.ts          # NPCs
│   ├── items.ts          # Items (balls, stones, TMs)
│   ├── quests.ts         # Quest system
│   ├── story.ts         # Main story
│   ├── systems.ts        # Achievements, Evolution, Day/Night
│   ├── sounds.ts        # Sound effects
│   ├── teleport.ts      # Teleportation
│   └── ...
├── public/
│   └── index.html        # Standalone version
└── package.json
```

**Totale: ~19,000 linee di codice!**

---

---

## 🚀 Deploy su HuggingFace Spaces (Docker/Node.js)

### Opzione 1: Crea nuovo Space su HF

1. Vai su [huggingface.co/new-space](https://huggingface.co/new-space)
2. Seleziona **Docker** come SDK
3. Scegli hardware **medium** (per Next.js)
4. Clona il repository sul tuo account HF
5. Push del codice - HF farà il build automatico!

```bash
# Clona il tuo nuovo Space
git clone https://huggingface.co/spaces/TUO_USERNAME/bestie_de_venetia

# Aggiungi come remote e push
git remote add hf https://hf.co/spaces/TUO_USERNAME/bestie_de_venetia
git push hf main
```

### Opzione 2: Da repository esistente

1. Aggiungi i file Docker al tuo repo:
   - `Dockerfile`
   - `huggingfaceSpaces.json`
   - `next.config.js` (aggiornato per standalone)

2. Crea nuovo Space su HF selezionando **Docker**
3. Push tutto su HF

### Verifica deployment

- Il build richiede ~3-5 minuti
- Una volta completato, il gioco sarà accessibile su `https://TUO_USERNAME-bestie_de_venetia.hf.space`
- Il server Node.js gira sulla porta 7860

### Troubleshooting

- **Build fail**: Controlla i log su HF Spaces
- **Memory**: Seleziona hardware più potente se necessario
- **Porta**: HF Spaces usa 7860, il Dockerfile è già configurato

---

## 📜 Licenza

MIT - Fatto con ❤️ in Veneto

## 🎯 Obiettivo del Gioco

1. Scegli il tuo **LEGgendario starter**
2. Cattura e allena **Bestie**
3. Sconfiggi gli **8 GYM** per ottenere i Badge
4. Affronta l'**Elite Four**
5. **Sconfiggi il DUX VENETIAE** e diventa il Campione!