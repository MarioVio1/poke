import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pokemona - Besti di Venetia',
  description: 'Un gioco RPG ispirato a Pokémon, ambientato nella regione Venetia in Italia.',
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
