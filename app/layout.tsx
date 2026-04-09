import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pokemona - Besti di Venetia | GBA Online',
  description: 'Un gioco RPG ispirato a Pokémon, ambientato nella regione Venetia in Italia. Gioca online come un emulatore GBA!',
  keywords: 'pokemon, gba, gioco, rpg, online, emulator, besti, venetia',
  openGraph: {
    title: 'Pokemona - Besti di Venetia',
    description: 'Gioca online come un emulatore GBA!',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
