// NPCs - Funny Venetian Characters
export interface NPCData {
  id: string
  name: string
  role: string
  dialog: string[]
  sprite: string
  isEnemy?: boolean
  team?: { id: string; lvl: number }[]
  badge?: string
  gift?: string
}

export const NPCs: Record<string, NPCData> = {
  // CANALBORGO NPCs
  prof_barcaro: {
    id: 'prof_barcaro',
    name: 'Prof. GheSboro',
    role: 'Scientist',
    dialog: [
      'Ciao! Sono il Prof. GheSboro!',
      'Studio i Bestie da 40 anni, ma ho ancora i capelli!',
      'Scegli il tuo primo Bestie!',
    ],
    sprite: 'professor',
    gift: 'starter',
  },
  mamma: {
    id: 'mamma',
    name: 'Mamma',
    role: 'Mom',
    dialog: [
      'Tesoro mio! Sei uscito?',
      'Stai attento e mangia!',
      'Non dimenticare di lavarti... le orecchie!',
      'Se perdi, torna a casa che ti faccio il risotto!',
    ],
    sprite: 'mom',
  },
  nonno_piero: {
    id: 'nonno_piero',
    name: 'Nonno Piero',
    role: 'Old Man',
    dialog: [
      'Nel mio tempo i Bestie si chiamavano... ehm... Bestie!',
      'E non c\'era ste palle, si usava il cappello!',
      'Vado a pescare, anzi no, il pesce è finito...',
      'Fammi il favore, vieni a trovarmi più spesso!',
    ],
    sprite: 'old_man',
  },
  gondoliere_nero: {
    id: 'gondoliere_nero',
    name: 'Gondoliere',
    role: 'Boatman',
    dialog: [
      'Vogando per i canali, vogando... e bestemmiando!',
      'Vuoi attraversare? Costa 80€ perché te seti foresto!',
      'Ma chi te fè? El Doge? No, el Doge el paga in sghèi, ti te paghi in lacrime!',
      'Ocio ai pìcoli in canal, che i magna le gambe!',
    ],
    sprite: 'gondolier',
  },
  pizzard_忘掉: {
    id: 'pizzard忘掉',
    name: 'Pizzard',
    role: 'Pizza Delivery',
    dialog: [
      'Pizzzaaa! Calda e filante!',
      'Oddio, ho sbagliato indirizzo... di nuovo!',
      'La margherita o la capricciosa? ...La tua risposta!',
    ],
    sprite: 'pizza_guy',
  },
  bambino_cecato: {
    id: 'bambino_cecato',
    name: 'Cecco',
    role: 'Kid',
    dialog: [
      'Mamma! C\'è un signore con un mostro!',
      'Posso toccarlo? Però non vedo bene...',
      'Ho perso i miei 5€! Qualcuno li ha trovati?',
    ],
    sprite: 'kid',
  },
  
  // SPRITZIA NPCs
  bepi_spritzaro: {
    id: 'bepi_spritzaro',
    name: 'Bepi lo Spritzaro',
    role: 'Gym Leader',
    dialog: [
      ' CHE BEVEMO OGGI?!',
      'Spritzino! Pronto per l\'Happy Hour!',
      'Combattiamo! Ma dopo... spritz!',
    ],
    sprite: 'gym_leader_fire',
    team: [
      { id: 'spritzino', lvl: 14 },
      { id: 'vespolo', lvl: 15 },
      { id: 'fogaron', lvl: 16 },
    ],
    badge: 'Badge Aperitivo',
  },
  grint_polenta: {
    id: 'grint_polenta',
    name: 'Grint della Polenta',
    role: 'Compagnia Member',
    dialog: [
      'LA COMPAGNIA DELLA POLENTA REGNERÀ!',
      'Il nostro piano è perfetto... quasi!',
      'Dov\'è finita la mia polenta?!',
    ],
    sprite: 'grunt',
    isEnemy: true,
    team: [
      { id: 'polentaur', lvl: 12 },
      { id: 'salamix', lvl: 11 },
    ],
  },
  fotografo: {
    id: 'fotografo',
    name: 'Foto Mario',
    role: 'Photographer',
    dialog: [
      'SORRISI! Siamo a Spritzia!',
      'Posso fotografare il tuo Bestie?',
      'Uè, questo l\'ho già fotografato... vattela!',
    ],
    sprite: 'photographer',
    gift: 'camera',
  },
  vecchia_spritzia: {
    id: 'vecchia_spritzia',
    name: 'Nonna Marisa',
    role: 'Old Lady',
    dialog: [
      'Nel mio tempo i bocia i laorava, mica i coreva drio a ste Bestie de fero!',
      'Magnate un poco de polenta che te seti un stichetto!',
      'Bevi acqua, non spritz! ...Scherzavo, dame un goto de bianco anca a mi!',
      'Ghe sboro, che bel moroso che te seti diventà!',
    ],
    sprite: 'lady',
  },
  
  // VERONARA NPCs
  giuliano_arena: {
    id: 'giuliano_arena',
    name: 'Giuliano Arena',
    role: 'Gym Leader',
    dialog: [
      'Benvenuto nell\'ARENA!',
      'Come a Verona, dove gli innamorati giurano!',
      'Combattiamo con onore!',
    ],
    sprite: 'gym_leader_earth',
    team: [
      { id: 'polentaur', lvl: 18 },
      { id: 'alpibex', lvl: 19 },
      { id: 'dolomor', lvl: 20 },
    ],
    badge: 'Badge Arena',
  },
  totti_tifoso: {
    id: 'totti_tifoso',
    name: 'Totti Tifoso',
    role: 'Fan',
    dialog: [
      'FORZA VENEZIA! ...Scusa, ROMA!',
      'Hai visto la partita ieri? No? Peccato!',
      'Vincemo noi, semo in casa!',
    ],
    sprite: 'fisherman',
  },
  prete: {
    id: 'prete',
    name: 'Don Bepi',
    role: 'Priest',
    dialog: [
      'Dio ti benedica, figliolo!',
      'I Bestie? Li ha creati Lui pure!',
      'Vieni a messa la domenica! ...E pure il martedì!',
    ],
    sprite: 'scientist',
  },
  
  // PADOANA NPCs
  prof_padova: {
    id: 'prof_padova',
    name: 'Prof. Sansovino',
    role: 'Professor',
    dialog: [
      'Benvenuto all\'Università!',
      'I Bestie sono creature straordinarie!',
      'Ho bisogno di campioni per la mia ricerca...',
    ],
    sprite: 'professor',
  },
  cameriera: {
    id: 'cameriera',
    name: 'Signora Maria',
    role: 'Waitress',
    dialog: [
      'Cosa desidera, caro?',
      'Il speciale di oggi? Tutto quello che c\'è!',
      'Il caffè? Corretto o normale? ...CORRETTO!',
    ],
    sprite: 'lass',
  },
  studente_fannullone: {
    id: 'studente_fannullone',
    name: 'Marco',
    role: 'Student',
    dialog: [
      'Eh, gli esami...',
      'Ma chi me lo fa fare?',
      'Vado a prendere un spritz... anzi due...',
      'Poi studio. Promesso!',
    ],
    sprite: 'youngster',
  },
  
  // TREVISELLA NPCs
  pescatore: {
    id: 'pescatore',
    name: 'Sior Tonic',
    role: 'Fisherman',
    dialog: [
      'El pesce xe finio!',
      'Una volta i pesci i xeata infiniti!',
      'Vieni a pescare con me domani?',
    ],
    sprite: 'fisherman',
  },
  vecchio_treviso: {
    id: 'vecchio_treviso',
    name: 'Nono Gino',
    role: 'Old Man',
    dialog: [
      'Xe 90 anni che vivo qui!',
      'E ancora non capisso perché piove!',
      'El radicchio? Quello vero xe solo mio!',
    ],
    sprite: 'old_man',
  },
  
  // VICENTIA NPCs  
  venditore_panchine: {
    id: 'venditore_panchine',
    name: 'Panchina Carlo',
    role: 'Salesman',
    dialog: [
      'Panchine! Le migliori panchine!',
      'Dove le metto? ...In ogni dove!',
      'Una panchina per ogni tua problematica!',
    ],
    sprite: 'scientist',
  },
  
  // DOLOMAX NPCs
  montanaro: {
    id: 'montanaro',
    name: 'Bepi de Monte',
    role: 'Mountain Man',
    dialog: [
      'Benvenuto in altura!',
      'Qui l\'aria xe fina!',
      'E i Bestie i cognosse el fatto loro!',
    ],
    sprite: 'hiker',
  },
  yeti_finto: {
    id: 'yeti_finto',
    name: 'Bepi Yeti',
    role: 'Cryptozoologist',
    dialog: [
      'L\'ho visto! Il Yeti!',
      '...Era una Bestia Nevelet!',
      'Ma l\'ho visto lo stesso!',
    ],
    sprite: 'hiker',
  },
  
  // GARDALAGO NPCs
  gondoliere_verde: {
    id: 'gondoliere_verde',
    name: 'Gondoliere Eco',
    role: 'Eco Guide',
    dialog: [
      'Benvenuto al Gardalago!',
      'Qui l\'acqua xe più verde che blu!',
      'Ma almeno xe pulita! ...Più o meno!',
    ],
    sprite: 'gondolier',
  },
  
  // COMPAGNIA DELLA POLENTA - STORY NPCs
  capo_polenta: {
    id: 'capo_polenta',
    name: 'Dux Polenta',
    role: 'Final Boss',
    dialog: [
      'HAHAHA! Sei arrivato fin qui!',
      'LA POLENTA È IL FUTURO!',
      'Preparati a perdere!',
    ],
    sprite: 'capo',
    isEnemy: true,
    team: [
      { id: 'polentitan', lvl: 35 },
      { id: 'fogarox', lvl: 34 },
      { id: 'canalisk', lvl: 34 },
      { id: 'dolomitor', lvl: 40 },
    ],
    badge: 'Badge Finale',
  },
  
  // CHAMPION
  campione_veneto: {
    id: 'campione_veneto',
    name: 'Maestro Marco',
    role: 'Champion',
    dialog: [
      'Hai dimostrato di essere forte!',
      'Ma io sono il Campione di Venetia!',
      'Preparati alla sfida finale!',
    ],
    sprite: 'champion',
    team: [
      { id: 'serenissima', lvl: 42 },
      { id: 'lagorion', lvl: 42 },
      { id: 'fogarion', lvl: 42 },
      { id: 'radicthron', lvl: 41 },
      { id: 'canalord', lvl: 41 },
    ],
    badge: 'Campione',
  },
}

export const TRAINER_NAMES = [
  'Marco', 'Luca', 'Paolo', 'Giovanni', 'Andrea',
  'Maria', 'Giulia', 'Francesca', 'Anna', 'Sara',
  'Nonna Gina', 'Zio Toni', 'Cugino Max', 'Sorella',
  'Bepi', 'Ernesto', 'Sior', 'Don', 'Mastro',
]

export const getRandomTrainer = (): NPCData => {
  const names = Object.values(NPCs).filter(n => n.team && !n.isEnemy)
  return names[Math.floor(Math.random() * names.length)]
}

// Extra unique characters for each city
export const EXTRA_NPCs: Record<string, NPCData> = {
  // CANALBORGO
  fotografo_turista: {
    id: 'fotografo_turista',
    name: 'Foto Mario',
    role: 'Tourist Photographer',
    dialog: [
      'SORRISI! Siamo a Canalborgo!',
      'POSSO FOTOGRAFARE IL TUO BESTIE?',
      'Bellissimo! ...No, era meglio prima!',
      'AH! VEDO! VEDO! ...No, no vedo!',
    ],
    sprite: 'photographer',
  },
  pescatore_serio: {
    id: 'pescatore_serio',
    name: 'Sior Tonic',
    role: 'Fisherman',
    dialog: [
      'El pesce xe finio!',
      'Una volta i pesci i xeata infiniti!',
      'Ieri gavevo na spigola così!',
      'No, era un torpedone!',
    ],
    sprite: 'fisherman',
  },
  turistica_tedesca: {
    id: 'turistica_tedesca',
    name: 'Greta',
    role: 'Tourist',
    dialog: [
      'Entschuldigung! Wo ist der Bahnhof?',
      'Ah, no English? Italian pizza, please!',
      'Venice is so romantic! So expensive!',
    ],
    sprite: 'lass',
  },
  
  // SPRITZIA
  vignaiolo_doc: {
    id: 'vignaiolo_doc',
    name: 'Silvio Vignaiolo',
    role: 'Wine Maker',
    dialog: [
      'El prosecco xe el nostro oro!',
      'Bevi con moderazione! ...Ma chi te credi?!',
      'Vuoi un assaggio? Solo uno!',
    ],
    sprite: 'hiker',
  },
  cameriera_sprintz: {
    id: 'cameriera_sprintz',
    name: 'Maria',
    role: 'Waitress',
    dialog: [
      'Un tavolo per due! Tre! NO ASPETA!',
      'Il caffè! CHE Caffè?! ...CORRETTO!',
      'Sempre in movimento qui!',
    ],
    sprite: 'lass',
  },
  wine_tourist: {
    id: 'wine_tourist',
    name: 'Hans',
    role: 'Wine Tourist',
    dialog: [
      'Wunderbar! Prosecco is fantastic!',
      'I will take 100 bottles home!',
      'One more glass, please!',
    ],
    sprite: 'hiker',
  },
  
  // VERONARA
  tifoso_incallito: {
    id: 'tifoso_incallito',
    name: 'Totti Tifoso',
    role: 'Die Hard Fan',
    dialog: [
      'FORZA ROMA! ...No aspetta, VENEZIA!',
      'Hai visto la partita ieri?',
      'No, era l\'altro ieri... oddio!',
    ],
    sprite: 'fisherman',
  },
  Romeo_veneto: {
    id: 'Romeo_veneto',
    name: 'Romeo',
    role: 'Romeo',
    dialog: [
      'Oh Giulietta, dove sei?',
      'Sono sul balcone! Aspetta, no...',
      'Amo l\'arena! Il football!',
    ],
    sprite: 'youngster',
  },
  Giulietta_veneta: {
    id: 'Giulietta_veneta',
    name: 'Giulietta',
    role: 'Juliet',
    dialog: [
      'Romeo, Romeo, dove sei?',
      'Ah, sei qui! Non ti avevo visto!',
      'Andiamo a bere spritz!',
    ],
    sprite: 'lass',
  },
  
  // PADOANA
  studente_fannullone: {
    id: 'studente_fannullone',
    name: 'Marco',
    role: 'Lazy Student',
    dialog: [
      'Eh, gli esami...',
      'Ma chi me lo fa fare?',
      'Vado a prendere un spritz...',
    ],
    sprite: 'youngster',
  },
  professore_distratto: {
    id: 'professore_distratto',
    name: 'Prof. Sansovino',
    role: 'Distracted Professor',
    dialog: [
      'Quindi, come dicevo ieri...',
      'No, l\'altro ieri... mmm...',
      'Dove ero? Ah sì, combattiamo!',
    ],
    sprite: 'professor',
  },
  laureando_stressato: {
    id: 'laureando_stressato',
    name: 'Laura',
    role: 'Stressed Graduate',
    dialog: [
      'La tesi! Mancano 3 giorni!',
      'E il relatore non risponde!',
      'Un caffè! No, tre caffè!',
    ],
    sprite: 'lass',
  },
  
  // TREVISELLA
  contadino_radicchio: {
    id: 'contadino_radicchio',
    name: 'Nono Gino',
    role: 'Radicchio Farmer',
    dialog: [
      'Xe 90 anni che coltivo radicchio!',
      'El radicchio? Quello vero xe solo mio!',
      'Gli altri i gà solo insalata!',
    ],
    sprite: 'old_man',
  },
  pescatore_laguna: {
    id: 'pescatore_laguna',
    name: 'Sior Tonic',
    role: 'Lago Fisherman',
    dialog: [
      'Una volta i pesci i xeata infiniti!',
      'Ieri gavevo na spigola così!',
      'No, era un torpedone! ...No, invento!',
    ],
    sprite: 'fisherman',
  },
  cicogna_padovana: {
    id: 'cicogna_padovana',
    name: 'Bepi de Monte',
    role: 'Mountain Man',
    dialog: [
      'Benvenuto in altura!',
      'Qui l\'aria xe fina!',
      'E i Bestie i cognosse el fatto loro!',
    ],
    sprite: 'hiker',
  },
  
  // DOLOMAX
  yeti_finto: {
    id: 'yeti_finto',
    name: 'Bepi Yeti',
    role: 'Yeti Spotter',
    dialog: [
      'L\'HO VISTO! Il Yeti!',
      'Era là, in cima alla montagna!',
      '...Era una Bestia Nevelet!',
    ],
    sprite: 'hiker',
  },
  sciatore_principiante: {
    id: 'sciatore_principiante',
    name: 'Max',
    role: 'Beginner Skier',
    dialog: [
      'Ehi! Sto imparando a sciare!',
      'Ogni 10 metri cado!',
      'Ma mi piace! ...Forse!',
    ],
    sprite: 'youngster',
  },
  regina_ghiacci: {
    id: 'regina_ghiacci',
    name: 'Regina dei Ghiacci',
    role: 'Ice Queen',
    dialog: [
      'IL FREDDO È MIO ALLEATO!',
      'Le mie Bestie vengono dalle Dolomiti!',
      'Sono freddi come il mio cuore!',
    ],
    sprite: 'champion',
    team: [
      { id: 'nevelet', lvl: 24 },
      { id: 'dolomor', lvl: 26 },
      { id: 'dolomibex', lvl: 28 },
    ],
    badge: 'Badge Ghiaccio',
  },
  
  // GARDALAGO
  gondoliere_verde: {
    id: 'gondoliere_verde',
    name: 'Gondoliere Eco',
    role: 'Green Gondolier',
    dialog: [
      'Benvenuto al Gardalago!',
      'Solo gondole verdi qui!',
      'Paga 100€ e semo pari!',
    ],
    sprite: 'gondolier',
  },
  nuotatore_maratona: {
    id: 'nuotatore_maratona',
    name: 'Luca',
    role: 'Swimmer',
    dialog: [
      'Domani la traversata del lago!',
      '12 ore a nuoto!',
      'Con una birra in mano!',
    ],
    sprite: 'youngster',
  },
  pescatore_vecchio: {
    id: 'pescatore_vecchio',
    name: 'Nonno Toni',
    role: 'Old Fisherman',
    dialog: [
      'El pesce xe finio dapertuto!',
      'Una volta xeata un\'epoca...',
      'Vado a pesca domani! Forse!',
    ],
    sprite: 'old_man',
  },

  // ═══════════════════════════════════════════════════════════════════
  // PERSONAGGI FASTIDIOSI EXTRA
  // ═══════════════════════════════════════════════════════════════════
  
  // MARANZA
  maranzo: {
    id: 'maranzo',
    name: 'Maranzo de Milano',
    role: 'Maranza',
    dialog: [
      'Maranzo de Milano!',
      'Xe el pì figo de Canalborgo!',
      'La mia Vespa? Modificata!',
      'Le ragazze? Tutte per mi!',
    ],
    sprite: 'youngster',
  },
  sgarbo_milanese: {
    id: 'sgarbo_milanese',
    name: 'Sgarbo Milanese',
    role: 'Maranza',
    dialog: [
      'SONO DI MILANO!',
      'LA LOMBARDIA È SUPERIORE!',
      'I veneti? Campagnoli!',
      'Il risotto? Con lo zafferano!',
    ],
    sprite: 'youngster',
  },
  
  // TERRONI
  salvatore_napoli: {
    id: 'salvatore_napoli',
    name: 'Salvatore da Napoli',
    role: 'Terrone',
    dialog: [
      'So\' Salvatore! De Napoli!',
      'Pizza? Sempe fresca!',
      'Maradona? Dio!',
      'Napoli è superiore a tutto!',
    ],
    sprite: 'youngster',
  },
  carmelo_catania: {
    id: 'carmelo_catania',
    name: 'Carmelo da Catania',
    role: 'Terrone',
    dialog: [
      'Carmelo! Sono catanese!',
      'Il cannolo? Specialità!',
      'L\'Etna? Mia!',
    ],
    sprite: 'youngster',
  },
  
  // ROMPIPALLE
  commentatore_calabrese: {
    id: 'commentatore_calabrese',
    name: 'Commentatore Calabrese',
    role: 'Rompipalle',
    dialog: [
      'MA CHE BELLO! CHE FORMA!',
      'Guarda che rovesciata!',
      'INCRE-DIBILE!',
      'Il migliore del mondo!',
    ],
    sprite: 'hiker',
  },
  filosofo_torinese: {
    id: 'filosofo_torinese',
    name: 'Filosofo Torinese',
    role: 'Rompipalle',
    dialog: [
      'Esiste il tempo? O esiste solo lo spazio?',
      'E se il tempo fosse una palla di polenta?',
      'La risposta è dentro di te!',
    ],
    sprite: 'professor',
  },
  pettegola_veneta: {
    id: 'pettegola_veneta',
    name: 'Pettegola Veneta',
    role: 'Rompipalle',
    dialog: [
      'Lo sai chi è stato?',
      'TE LO DICO IO!',
      'È stato quello! Con quell\'altro!',
    ],
    sprite: 'lass',
  },
  chiacchierone: {
    id: 'chiacchierone',
    name: 'Chiacchierone',
    role: 'Rompipalle',
    dialog: [
      'Allora, come ti dicevo...',
      'Dove ero? Ah sì!',
      'C\'era una volta...',
    ],
    sprite: 'old_man',
  },
  
  // NONNI FASTIDIOSI
  nonna_credula: {
    id: 'nonna_credula',
    name: 'Nonna Che-Crede-Di-Avere-Ragione',
    role: 'Nonna Fastidiosa',
    dialog: [
      'NEL MIO TEMPO ERA MEGLIO!',
      'I Bestie? Più forti!',
      'La polenta? Più buona!',
    ],
    sprite: 'lass',
  },
  nonna_pettegola: {
    id: 'nonna_pettegola',
    name: 'Nonna Pettegola',
    role: 'Nonna Fastidiosa',
    dialog: [
      'LO SAI DI MARIA?',
      'E DI GIUSEPPE?',
      'E DEL CANE DI GINO?',
    ],
    sprite: 'lass',
  },
  nonno_storie: {
    id: 'nonno_storie',
    name: 'Nonno Storie Infinite',
    role: 'Nonno Fastidioso',
    dialog: [
      'TE LO DICO IO!',
      'UNA VOLTA...',
      'C\'ERA UNA VOLTA...',
    ],
    sprite: 'old_man',
  },
  
  // BAMBINI FASTIDIOSI
  capriccio: {
    id: 'capriccio',
    name: 'Capriccio',
    role: 'Bambino Fastidioso',
    dialog: [
      'VOGLIO! VOGLIO! VOGLIO!',
      'IL BESTIEA! QUELLO VERDE!',
      'NO! QUELLO BLU!',
    ],
    sprite: 'kid',
  },
  cinquecento_domande: {
    id: 'cinquecento_domande',
    name: '500 Domande',
    role: 'Bambino Fastidioso',
    dialog: [
      'Perché?',
      'E perché?',
      'E poi perché?',
      'E ancora perché?',
    ],
    sprite: 'kid',
  },
  gambero: {
    id: 'gambero',
    name: 'Gambero',
    role: 'Bambino Fastidioso',
    dialog: [
      'SCAPPO!',
      '*inciampa*',
      '*cade*',
      '*piange*',
    ],
    sprite: 'kid',
  },
  
  // TIFOSI
  tifoso_juve: {
    id: 'tifoso_juve',
    name: 'Tifoso Juventus',
    role: 'Tifoso',
    dialog: [
      'FORZA JUVE!',
      'SEMPRE FORZA!',
      'La Serie A è nostra!',
    ],
    sprite: 'youngster',
  },
  tifoso_napoli: {
    id: 'tifoso_napoli',
    name: 'Tifoso Napoli',
    role: 'Tifoso',
    dialog: [
      'FORZA NAPOLI!',
      'MARADONA È DIO!',
      'Il gol? Infinito!',
    ],
    sprite: 'youngster',
  },
  
  // ZII FASTIDIOSI
  zio_imbarazzante: {
    id: 'zio_imbarazzante',
    name: 'Zio Imbarazzante',
    role: 'Zio Fastidioso',
    dialog: [
      'SEI GRASSO!',
      'SEI MAGRO!',
      'MANGIA DI PIÙ!',
      'QUANDO TI SPOSI?!',
    ],
    sprite: 'hiker',
  },
  zia_impicciona: {
    id: 'zia_impicciona',
    name: 'Zia Impicciona',
    role: 'Zia Fastidiosa',
    dialog: [
      'QUANTO GUADAGNI?',
      'DOVE VIVI?',
      'CON CHI VIVI?',
    ],
    sprite: 'lass',
  },
  
  // YOUTUBER
  youtuber_molesto: {
    id: 'youtuber_molesto',
    name: 'Youtuber Molesto',
    role: 'Youtuber',
    dialog: [
      'CIAO A TUTTI!',
      'ISCRIVETIVI!',
      'LIKE! COMMENT! SUBSCRIBE!',
      'QUESTO È UN VIDEO!',
    ],
    sprite: 'youngster',
  },
  
  // ATTIVISTI
  attivista_animale: {
    id: 'attivista_animale',
    name: 'Attivista Animale',
    role: 'Attivista',
    dialog: [
      'I BESTIE SONO LIBERI!',
      'LIBERTÀ PER TUTTI!',
      'LA POLENTA È UN CRIMINE!',
    ],
    sprite: 'youngster',
  },
  ambientalista: {
    id: 'ambientalista',
    name: 'Ambientalista',
    role: 'Attivista',
    dialog: [
      'IL PIANETA STA MORENDO!',
      'I CANALI SONO INQUINATI!',
      'PIANTATE ALBERI!',
    ],
    sprite: 'hiker',
  },
  
  // VENDITORI
  venditore_spazzole: {
    id: 'venditore_spazzole',
    name: 'Venditore Spazzole',
    role: 'Venditore',
    dialog: [
      'SPAZZOLE! PER CAPELLI!',
      'Per denti! Per casa!',
      'Per Bestie! Per pavimenti!',
    ],
    sprite: 'hiker',
  },
  venditore_integratori: {
    id: 'venditore_integratori',
    name: 'Venditore Integratori',
    role: 'Venditore',
    dialog: [
      'Integratori! Per muscoli!',
      'Per memoria! Per sonno!',
      'Solo 30€ OGNI UNO!',
    ],
    sprite: 'hiker',
  },
  
  // LADRI
  ladro_cioccolatini: {
    id: 'ladro_cioccolatini',
    name: 'Ladro Cioccolatini',
    role: 'Ladro',
    dialog: [
      'Cioccolatini! Caldi!',
      '*distrae*',
      '*ruba*',
      '*scappa*',
    ],
    sprite: 'youngster',
  },
  
  // POLIZIA
  vigile_ossessivo: {
    id: 'vigile_ossessivo',
    name: 'Vigile Ossessivo',
    role: 'Polizia',
    dialog: [
      'ALTO! DOCUMENTI!',
      'La luce? Gialla!',
      'La multa? 500€!',
    ],
    sprite: 'hiker',
  },
  
  // COMPLETTAMENTI STORIA - Nuove aggiunte per le location multi-piano
  nobildonna_villa: {
    id: 'nobildonna_villa',
    name: 'Nobildonna',
    role: 'Villa Owner',
    dialog: [
      'Benvenuto nella mia villa!',
      'La mia famiglia ha 300 anni!',
      'Il pavimento è di marmo!',
      'E la polenta... non la servo mai!',
    ],
    sprite: 'lass',
  },
  guardiano_museo: {
    id: 'guardiano_museo',
    name: 'Guardiano del Museo',
    role: 'Museum Guard',
    dialog: [
      'Il tesoro è protetto!',
      'Non passare!',
      '*sbadiglia* ...Scusa, sonno!',
    ],
    sprite: 'hiker',
    team: [
      { id: 'mascherotto', lvl: 20 },
    ],
  },
  speleologo_grotta: {
    id: 'speleologo_grotta',
    name: 'Speleologo',
    role: 'Explorer',
    dialog: [
      'Ho trovato il segreto!',
      'La grotta nasconde tesori!',
      'Ma sono per me! ...Ehi!',
    ],
    sprite: 'hiker',
    team: [
      { id: 'dolomibex', lvl: 28 },
    ],
  },
  guardiano_sacro: {
    id: 'guardiano_sacro',
    name: 'Guardiano Sacro',
    role: 'Temple Guardian',
    dialog: [
      'Il tempio ti ha scelto!',
      'Solo i degni possono passare!',
      'Ma non sei degno! ...Forse!',
    ],
    sprite: 'hiker',
    team: [
      { id: 'mascherodoro', lvl: 30 },
    ],
  },
  scienziato_lab: {
    id: 'scienziato_lab',
    name: 'Scienziato',
    role: 'Scientist',
    dialog: [
      'Benvenuto nel mio laboratorio segreto!',
      'Sto creando il Bestie perfetto!',
      'Presto sarà pronto! ...O forse no!',
    ],
    sprite: 'professor',
  },
}
