# Guida per aggiungere sprites personalizzati

## Opzione 1: Scarica da PokeAPI

Puoi scaricare gli sprite ufficiali Pokemon da PokeAPI:

1. Vai su: https://pokeapi.co/api/v2/pokemon/[nome-pokemon]
2. Oppure usa direttamente GitHub:
   ```
   https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/[numero].png
   ```

Esempi:
- Bulbasaur: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
- Charmander: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png
- Squirtle: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png

## Opzione 2: Crea i tuoi sprite

1. Usa **Piskel** (https://www.piskelapp.com) - gratuito online
2. Crea sprite 64x64 pixel
3. Esporta in PNG
4. Metti i file in `public/sprites/bestie/`

## Come aggiungere al gioco

Dopo aver messo le immagini in `public/sprites/bestie/`:

1. Modifica `lib/sprites.ts` per usare le immagini invece degli SVG
2. Oppure modifica `lib/pixelSprites.ts` per aggiungere nuovi sprite

## Struttura suggerita

```
public/
  sprites/
    bestie/
      fogaron.png      (fronte)
      fogaron-back.png (retro)
      lagorion.png
      ...
```

## Esempio di modifica codice

In `lib/sprites.ts`, cambia da SVG a immagine:

```typescript
BESTIE_SVG_SPRITES.fogaron = {
  front: '/sprites/bestie/fogaron.png',
  back: '/sprites/bestie/fogaron-back.png',
  icon: '/sprites/bestie/fogaron-icon.png',
}
```

---

**Nota**: Attualmente il gioco usa sprite SVG generati automaticamente. 
Vuoi che modifichi il codice per usare immagini PNG invece?