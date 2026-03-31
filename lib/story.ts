// ═══════════════════════════════════════════════════════════════════════════════
// POKEMONA - BESTI DI VENETIA
// Storia Completa con Personaggi Fastidiosi, Maranza e Terroni
// Versione Italia Realistica con Umorismo
// ═══════════════════════════════════════════════════════════════════════════════

export interface GameStory {
  chapters: StoryChapter[]
  badges: Badge[]
  gyms: Gym[]
  elite: EliteFour[]
  villainTeam: VillainTeam
  legendaryStarters: LegendaryStarter[]
  mythology: BestiaMythology
  sideQuests: SideQuest[]
  annoyingCharacters: AnnoyingCharacter[]
  routeTrainers: RouteTrainer[]
}

export interface StoryChapter {
  id: number
  name: string
  description: string
  mapStart: string
  mapEnd: string
  objectives: string[]
  dialog: StoryDialog[]
}

export interface StoryDialog {
  speaker: string
  text: string
  emotion?: 'happy' | 'sad' | 'angry' | 'neutral' | 'excited' | 'annoyed' | 'bored'
}

export interface Badge {
  id: string
  name: string
  town: string
  gymLeader: string
  requiredBadges: string[]
  description: string
  color: string
}

export interface Gym {
  id: string
  name: string
  town: string
  type: string
  leader: string
  leaderStory: string
  team: { id: string; lvl: number }[]
  badge: string
}

export interface EliteFour {
  id: string
  name: string
  title: string
  specialty: string
  team: { id: string; lvl: number }[]
  backstory: string
}

export interface VillainTeam {
  name: string
  fullName: string
  leaders: TeamLeader[]
  goal: string
  hideout: string
  backstory: string
}

export interface TeamLeader {
  id: string
  name: string
  role: string
  team: { id: string; lvl: number }[]
  backstory: string
}

export interface LegendaryStarter {
  id: string
  name: string
  type: string[]
  desc: string
  reason: string
  legend: string
}

export interface BestiaMythology {
  origin: string
  creation: string
  theFourGuardians: { name: string; role: string; element: string; legend: string }[]
  theDuxVenetiae: { name: string; legend: string; power: string }
  theAncientWar: string
  theBetrayal: string
}

export interface SideQuest {
  id: string
  name: string
  description: string
  giver: string
  location: string
  objectives: string[]
  rewards: { type: string; item: string; description: string }[]
}

export interface AnnoyingCharacter {
  id: string
  name: string
  type: 'maranza' | 'terrone' | 'rompipalle' | 'venditore' | 'nonnomorta' | 'bambino' | 'tifoso' | 'complimentone'
  location: string
  dialog: string[]
  blocksPath: boolean
  appearsMultipleTimes: boolean
  triggerArea?: string
}

export interface RouteTrainer {
  id: string
  name: string
  stereotype: string
  dialog: string[]
  team: { id: string; lvl: number }[]
  moneyReward: number
  location: string
}

// ═══════════════════════════════════════════════════════════════════════════════
// PERSONAGGI FASTIDIOSI - Maranza, Terroni, Rompipalle, E MOLTO ALTRO!
// ═══════════════════════════════════════════════════════════════════════════════

export const ANNOYING_CHARACTERS: AnnoyingCharacter[] = [
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // MARANZA - Personaggi da città che parlano dei soldi
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'maranza_1',
    name: 'Maranzo de Milano',
    type: 'maranza',
    location: 'route1',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'EHI BRO! Dove te gheti?',
      'Me sa che ti gheti a cà, no?',
      'LA MIA MACCHINA L\'È PIÙ BELLA!',
      'Ma te gheti in maserati o in bicicletta?!',
      'BRO! I miei amici? Tutti a Monza!',
      'Lo so, sono invidiato. Normal.',
      'Ti voeuret mì, no? Tutti i voressi.',
      'Ehi bro, me conosci? Sono il figlio del commercialista!',
      'Mia mama la fa i biscoti. I migliori de Milano!',
      'E poi ho 3 case. Ok, 2. Ma una è grande!',
      'E la barca! La barca xe in Sardegna!',
      'Barcare? Ok, barca a remi. Ma è pur sempre barca!',
    ]
  },
  {
    id: 'maranza_2',
    name: 'Sgarbo Milanese',
    type: 'maranza',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'SCUSI! Ma la vía è mia!',
      'Mi gò il permesso dal sindaco!',
      'Vabbè, quasi. Do 50 euro al vigile.',
      'EHI! La tua giacca è cheap!',
      'La mia l\'è di Versace! O Gucci! O... insomma, una roba così!',
      'TE SAI QUANTO COSTA?!',
      'No? Beh, te lo dico io: TANTissimo!',
      'Mia mama la guadagna 5000 euro al giorno!',
      '...Ok, forse esagero. Ma quasi!',
      'E i miei fratelli? Tutti avvocati!',
      'Io sono il peccio. Il preferio!',
      'Perché sono il pì bello!',
    ]
  },
  {
    id: 'maranza_3',
    name: 'Raffaele da Milano',
    type: 'maranza',
    location: 'route3',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'EHI! Sei milanese anche tu?!',
      'No, sono di qui!',
      'MA NON È POSSIBILE! Tutti i fortunati sono de Milan!',
      'I veneti? Bah, son tutti poveri!',
      'Tranquillo, non è razzismo! È solo verità!',
      'E la mia macchina? È una BMW!',
      'BMW! Come il mio nome! Raffaele BMW!',
      '...Non è vero. Ma sarebbe figo!',
    ]
  },
  {
    id: 'maranza_4',
    name: 'Chicco da Milano',
    type: 'maranza',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Ehi, belòto! Come va?!',
      'Bene... e tu?',
      'Io?! BENISSIMO! Ho appena comprato un appartamento!',
      'Dove? A Milano! 500 metri quadri!',
      'Ok, 40. Ma con la vista!',
      'La vista del cortile interno!',
      'Comunque il panino de €50 lo pago cash!',
      'No aspetta, con la carta. Ma il concetto conta!',
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // TERRONI - Personaggi del sud che parlano della famiglia
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'terrone_1',
    name: 'Salvatore da Napoli',
    type: 'terrone',
    location: 'route1',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'OH! Giovane! Dove vai?!',
      'Vieni da me! Te faccio magnare!',
      'Mia mama la fa la pizza! La pizza vera!',
      'Quella napoletana, no quella giapponese!',
      'E il broccoli rabe? Te l\'hai mai magnato?!',
      'Senza broccoli rabe, nun se po\' vivere!',
      'E il sanguinaccio? Mamma mia che buono!',
      'E\' na Madonna se tieni fame!',
      'Vieni a Napule! Te sposo mia figlia!',
      'mia figlia Lucia! Ha 35 anni e fa la casalinga!',
      'È bella! Ma ha i peli. Tanti peli.',
      'Però è buona cuoca! Come mia mama!',
    ]
  },
  {
    id: 'terrone_2',
    name: 'Carmelo da Catania',
    type: 'terrone',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'EHHH! Ci sta?!',
      'Me ne vado a lavorare in Germania!',
      'No aspetta, tornu sempre a Catania!',
      'Chistu è lu megghiu postu!',
      'Nun me importa si c\'è lu vulcanu!',
      'L\'Etna? Chistu è nu miei amicu!',
      'E la mafia? Ma che mafia! Nun ce sta!',
      '...Ok, forse qualche parente. Ma lontano!',
      'Vuoi un aranci? L\'aranci di Sicily è lu megghiu!',
      'E il cannolo? Quello de ricotta!',
      'E la cassata! Mamma mia che bona!',
      'Vieni a Catania! Ti faccio vidiri tuttu!',
    ]
  },
  {
    id: 'terrone_3',
    name: 'Giuseppe da Palermo',
    type: 'terrone',
    location: 'route3',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'CAZZU! Che ci fai tu accussì?!',
      'Vieni, ti offro un cannolo!',
      'Lu cannolo è megghiu di tuttu!',
      'E la cassata? Mamma mia!',
      'Ma primma, na tavulata cu mia sorella!',
      'T\'haju a fari conoscere a mia nonna!',
      'Essa è vecchia ma ancora forte!',
      'Venti figli, cent\'anni, nu mangiatore!',
      'E lu cugino Peppino? Chistu è nu guappu!',
      'Nu veru guappu di Palermu!',
      'Fa lu corleone! Ma senza cattedrale!',
      'E la cucina? Vera siciliana!',
    ]
  },
  {
    id: 'terrone_4',
    name: 'Pasquale da Bari',
    type: 'terrone',
    location: 'route4',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'NGHÈ! Come stai?!',
      'Io? Bene, grazie!',
      'Io?! Magnato e abbevuto! Come sempre!',
      'La pasta con le cozze? L\'ho magnata ieri!',
      'E oggi? Oggi pane e pomodoro!',
      'Domani? Pure! Ma con la mozzarella!',
      'E\'sera che conta!',
      'Le orecchiette? So la ricetta segreta!',
      'Solo mia mama la sa! E io!',
      'E mia sorella. E il cugino. E il parroco.',
      'Comunque la ricetta è: pasta, cime di rapa, olio.',
      'E tanto amore. Ma soprattutto olio.',
    ]
  },
  {
    id: 'terrone_5',
    name: 'Michele da Reggio Calabria',
    type: 'terrone',
    location: 'route5',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'E\' CCÀ! Niente paura!',
      'Michele è amico tuo! Tutti amici!',
      'La bergamot? Nn\'a provata?! È miracolosa!',
      'La faccio in tisana, in liquore, in gelato!',
      'E\'nna pianta miracolosa!',
      'Pure per i mali di testa!',
      'E per i mali di cuore!',
      'E per i mali esistenziali!',
      'Tutti i mali, in pratica!',
    ]
  },
  {
    id: 'terrone_6',
    name: 'Luigi da Roma',
    type: 'terrone',
    location: 'route6',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Ma che te devo dì...',
      'Roma è Roma! Tutti lo sanno!',
      'E\'cqua che se magnano le porchette!',
      'E\'cqua che se parla male!',
      'E\'cqua che ce sta tutto!',
      'No, aspetta. Ce sta\'nziamento!',
      'Ma li affari so\' affari!',
      'E la pizza? Quella de Roma è sottile!',
      'No quella de Napoli! Quella è alta!',
      'E quella de Milano? Quella è un\'schifezza!',
      'Però tutti magnano!',
      'E tutti stanno bene!',
    ]
  },
  {
    id: 'terrone_7',
    name: 'Marco da Ostia',
    type: 'terrone',
    location: 'route1',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Che te devo dì...',
      'Pure io so\' Romano! E\'mejo de tutti!',
      'No aspetta, Napoli è meglio!',
      'E Milano? Quella è fredda!',
      'Ma Roma è Roma! Il Colosseo!',
      'E Ostia? Il mare! Pure!',
      'E le mozzarelle? De bufala!',
      'Te le raccomanno!',
      'E il pesce? Fresco! De stamattina!',
      'E poi ce sta\'l fritto!',
      'Ogni cosa è fritta! È na goduria!',
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // ROMPIPALLE - Personaggi che parlano sempre
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'rompipalle_1',
    name: 'Commentatore Calabrese',
    type: 'rompipalle',
    location: 'route1',
    blocksPath: false,
    appearsMultipleTimes: true,
    dialog: [
      'EHI! Ma hai visto la partita?!',
      'No? MA COME?!',
      'Il calzone è meglio della pizza!',
      'E la nuddu ci sta!',
      'Ehh, la vita è dura!',
      'Ma poi alla fine, tutti a mangiare!',
      'E che ve ne fate?!',
      'Mah, nun lo so! Parlu p\'acchianari!',
      'E poi la partita era bona!',
      'Il pareggio al 90°! Che emozione!',
      'Anche se era 0-0. Ma emozione è emozione!',
    ]
  },
  {
    id: 'rompipalle_2',
    name: 'Filosofo Torinese',
    type: 'rompipalle',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Scusi, lei ha mai pensato al senso della vita?',
      'Io sì. E\' mangiare.',
      'Ma non mangiare per mangiare.',
      'Mangiare per esistere.',
      'E\'istere per... beh, ancora ci penso.',
      'Ah, e la Juventus è la cosa più importante.',
      'Dopo mangiato.',
      'Prima il calcio, poi la filosofia.',
      'Ma il senso? Boh.',
      'Forse è il gioco. O lo spritz.',
      'O la filosofia. Chissà.',
    ]
  },
  {
    id: 'rompipalle_3',
    name: 'Pettegola Veneta',
    type: 'rompipalle',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'OI! Lo sai che...?',
      'NO! Non lo sapevo!',
      'Vedi, la signora Maria...',
      'Quale Maria?!',
      'Quella del terzo piano! Quella che...',
      'BASTA! Non voglio sapere!',
      'E\' sulla bocca de tutti!',
      'NON IMPORT!',
      'E la signora Lucia? Quella coi cani?',
      'Quella ha 7 cani! SETTE!',
      'E il marito? È scappato!',
      'Con la vicina! Ma la vicina è purcedente!',
    ]
  },
  {
    id: 'rompipalle_4',
    name: 'Chiacchierone Fisso',
    type: 'rompipalle',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Senti, te devo contà na cosa...',
      'Non voglio sentire niente!',
      'Ma è importante! Sai quella volta che...',
      'NO! Non lo so! E non mi interessa!',
      'Ecco, eravamo al mercato...',
      'MA VACCI TU AL MERCATO!',
      'E la frutta era fresca!',
      'E il venditore...',
      'E IO NON VOGLIO SAPERE DEL VENDITORE!',
      'Perché il venditore...?',
      'BASTA! BASTA! BASTA!',
      'E poi la moglie del venditore...',
      'NOOOOOOO!',
    ]
  },
  {
    id: 'rompipalle_5',
    name: 'Storico di Niente',
    type: 'rompipalle',
    location: 'route3',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      ' Sai che nel 1400...?',
      'No, e non mi interessa!',
      'Nel 1400 qui c\'era na cascina!',
      'E nel 1500? Pure!',
      'E nel 1600? Sempre cascina!',
      'Ma nel 1700 è successo qualcosa!',
      'Tipo? AH! Non te lo dico!',
      'Dai, dimmelo!',
      'NO! Perché devi comprare il mio libro!',
      'Quale libro?! Non hai scritto niente!',
      'Appunto! È un ebook! Cost €50!',
    ]
  },
  {
    id: 'rompipalle_6',
    name: 'Complottista Locale',
    type: 'rompipalle',
    location: 'route4',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Sai chi comanda veramente?!',
      'NO! E non voglio saperlo!',
      'I Reptiliani! E i Massoni!',
      'E pure i potenti de Wall Street!',
      'E i Massoni Reptiliani di Wall Street!',
      'E la luna? È un satellite! Ma chi l\'ha messo?!',
      'E le torri gemelle? Non sono state gli aerei!',
      'No aspetta, quelle sì. Ma gli aerei erano clonati!',
      'CLONATI! Capito?!',
      'Non ho capito niente! E non voglio capire!',
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // VENDITORI AMBULANTI - Che ti fermano sempre
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'venditore_1',
    name: 'Venditore Porta a Porta',
    type: 'venditore',
    location: 'route1',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'BUONGIORNO! Ha 5 minuti?!',
      'NO!',
      'Solo 5! Sono pochi!',
      'Ho delle offerte incredibili!',
      'Set di coltelli! 10 euro!',
      'No, aspetta. 5 euro!',
      '...Ok, 1 euro. Per lei!',
      'E il tritacarne? Lei ne ha bisogno!',
      'Serve per tutto! Carne, verdura, scarpe!',
      'MA NON VOGLIO NIENTE!',
      'Solo 5 minuti! Per favore!',
      'Offerto 3, pago 2! Anzi 4, pago 1!',
      'E la garanzia? 10 anni! Anzi 20!',
    ]
  },
  {
    id: 'venditore_2',
    name: 'Venditore di Profumi',
    type: 'venditore',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'PROFUMI! PROFUMI!',
      'L\'acqua de fiori! Profumo de rosa!',
      'Niente? Provi questo!',
      'No, questo è meglio!',
      'Questo poi è il migliore!',
      'E\' fatto in casa! Da mia nonna!',
      '...Mia nonna è morta 40 anni fa.',
      'Ma il profumo resiste! E\' magia!',
      'Prenda 3, pago 2!',
      'E l\'ultimo lo regalo! Per amicizia!',
      'E il quarto? Quello è per lei!',
      'E il quinto? Per la mamma!',
      'E il sesto? Per il cane!',
    ]
  },
  {
    id: 'venditore_3',
    name: 'Venditore di Calzini',
    type: 'venditore',
    location: 'route3',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'CALZINI! CALZINI!',
      '3 euro! Solo 3 euro!',
      'Ma no, 2 euro! Per lei!',
      'E la confezione da 10? Solo 5 euro!',
      'No aspetta, 4! È l\'offerta!',
      'Cotone egiziano! Seta cinese!',
      'Lana italiana! Cotone argentino!',
      'Tutti mischiati! Ma funziona!',
      'E sono antisudore! Antiodore! Antibatterici!',
      'E pure traspiranti!',
      'E se non le piacciono? Poi le usa come calzini!',
    ]
  },
  {
    id: 'venditore_4',
    name: 'Venditore di Spazzole',
    type: 'venditore',
    location: 'route4',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'SPAZZOLE! PER TUTTO!',
      'Spazzola per capelli! E per vestiti!',
      'E per piatti! E per pavimenti!',
      'E per scarpe! E per auto!',
      'Una spazzola per domarli tutti!',
      'Come si chiama? VERO POTERE!',
      'No aspetta, quello era un altro. COMPROPRIUM!',
      'Anzi no, quello era un\'altro. POTERE MASSIMO!',
      'Comunque questa spazzola lava tutto!',
      'E\' universale! E\'magica!',
      'E\' pure eco! Anche se costa 50 euro.',
    ]
  },
  {
    id: 'venditore_5',
    name: 'Venditore di Enciclopedie',
    type: 'venditore',
    location: 'route5',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Salve! Ha figli?',
      'No... ehm... forse?',
      'E i figli studiano?',
      'Mah, non lo so...',
      'Allora ha BISOGNO della mia enciclopedia!',
      'Volume 1: I dinosauri!',
      'Volume 2: Le capitali!',
      'Volume 3: I presidenti!',
      'Volume 4: Le ricette!',
      'Solo €500! In rate! 50 centesimi al mese!',
      'Per 200 anni! Ma è un affare!',
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // NONNI - Che parlano sempre
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'nonno_rompi',
    name: 'Nonna Che-Crede-Di-Avere-Ragione',
    type: 'nonnomorta',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Ai miei tempi era tutto meglio!',
      'I Besti? Noi li chiamavamo "bestie"!',
      'E funzionavano lo stesso!',
      'E la polenta? Quella sì che era polenta!',
      'Questa nuova polenta... bah!',
      'E il risotto? Con 10 minuti era pronto!',
      'Ora ci vogliono 3 ore! Mah!',
      'I giovani d\'oggi...',
      'NON VI AScolto!',
      'Eh?! Cosa?!',
      'E le scarpe? Ai miei tempi duravano 20 anni!',
      'Ora dopo 2 mesi sono già rotte!',
      'E il pane? Quello buono costava 100 lire!',
      'Ora costa €3! Per una fetta!',
      'INGIUSTIZIA!',
    ]
  },
  {
    id: 'nonna_pettegola',
    name: 'Nonna Pettegola',
    type: 'nonnomorta',
    location: 'spritzia',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Ciao, belòto! Come te ciami?!',
      'Non glielo dico!',
      'E dove te stai?!',
      'Lontano da lei!',
      'E che lavoro fa tu mama?!',
      'Non lo so! Non mi interessa!',
      'E la fidanzata?! Il fidanzato?!',
      'BASTA!',
      'Vedi che quella là, la Maria, la ga...',
      'NON VOGLIO SAPERE!',
      'E la nipote? Quella coi capelli verdi?',
      'Quella ha 10 gatti! In un appartamento piccolo!',
      'E il marito? È scappato! Con la badante!',
      'Ma la badante era maschio!',
      'E la madre? È andata a жить in America!',
      'Quale America?! Quella italiana!',
    ]
  },
  {
    id: 'nonno_storia',
    name: 'Nonno Delle Storie Infinite',
    type: 'nonnomorta',
    location: 'veronara',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Xe 80 anni che vivo qui!',
      'Una volta qui c\'era solo un campo!',
      'E prima? Un altro campo!',
      'E prima ancora? Mah, forse acqua!',
      'Ma no, era fango!',
      'E il fango era buono! Si coltivava!',
      'E le verdure? Le migliori!',
      'E i Besti? Venivano da soli!',
      'E il latte? Era gratis!',
      'E il pane? Pure!',
      'E i soldi? Non esistevano!',
      'Eravamo tutti poveri ma felici!',
      'Mah, forse poveri proprio no...',
      'Ma contenti! Quello sì!',
    ]
  },
  {
    id: 'nonna_preoccupata',
    name: 'Nonna Preoccupata Per Tutto',
    type: 'nonnomorta',
    location: 'padoana',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Oh, che paura! Hai visto le previsioni?!',
      'Quali previsioni?!',
      'Domani piove! E dopodomani pure!',
      'E tra 3 giorni? Nebbia!',
      'E tra 4? Vento!',
      'E tra 5? Grandine!',
      'E tra 6? Non lo so! Ma avrà paura!',
      'E i tuoi vestiti? Hai l\'ombrello?!',
      'E le scarpe? Sono impermeabili?!',
      'E se non lo sono? Prendi i miei!',
      'Sono vecchi! Ma funzionano!',
      'E il cappotto? Hai il cappotto?!',
    ]
  },
  {
    id: 'nonno_mangione',
    name: 'Nonno Mangione',
    type: 'nonnomorta',
    location: 'trevisella',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Oh, che fame!',
      'Ma hai mangiato?!',
      'Sì, ho mangiato!',
      'E cosa hai mangiato?!',
      'Un panino...',
      'UN PANINO?! Solo un panino?!',
      'Ma come si fa! Bisogna mangiare!',
      'Mangiare tanto! Sempre!',
      'Io alle 7: colazione! 9: pranzo! 11: spuntino!',
      '12: pranzo! 14: merenda! 16: aperitivo!',
      '18: pranzo! 20: cena! 22: spuntino notturno!',
      'E a mezzanotte? Quello è il più importante!',
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // BAMBINI - Che fanno i capricci
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'bambino_capriccio',
    name: 'Bambino Maleducato',
    type: 'bambino',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'VOGLIO UN BESTIA! VOGLIO UN BESTIA!',
      'No, non ti do niente!',
      'MA PERCHÉ?! MAMMA!',
      'Perché sei romper!',
      'NO MAMAAAA!',
      'ECCO! Prendi questo!',
      'NO! VOGLIO IL BESTIA PIÙ FORTE!',
      'E Quale sarebbe?!',
      'QUELLO VERDE! NO QUELLO ROSSO!',
      'BASTA! COMBATTIAMO!',
      'NO! VOGLIO QUELLO BLU!',
      'Non esiste quello blu!',
      'ALLORA VOGLIO TUTTI!',
      'NON PUOI AVERE TUTTI!',
      'PUÒÒÒÒÒÒ! MAMAAAA!',
    ]
  },
  {
    id: 'bambino_domande',
    name: 'Bambino 500 Domande',
    type: 'bambino',
    location: 'spritzia',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Perché il cielo è blu?!',
      'Perché la luna è bianca?!',
      'E le stelle? Perché brillano?!',
      'E perché i pesci nuotano?!',
      'E perché gli uccelli volano?!',
      'E perché le mucche fanno muuu?!',
      'E perché... perché... perché...?!',
      'BASTA! HO 16 ANNI! NON LO SO!',
      'Ma come?! I grandi sanno tutto!',
      'NO! I grandi fingono di sapere!',
      'E\' una cospirazione?!',
      'SÌ! È TUTTO UNA COSPIRAZIONE!',
      'YAAAY! Sono intelligente!',
    ]
  },
  {
    id: 'bambino_gambero',
    name: 'Bambino Gambero',
    type: 'bambino',
    location: 'gardalago',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'IO SONO IL RE!',
      'Io sono il re!',
      'NO! IO! Tu sei il servo!',
      'Ma...',
      'ECCO! Prendi la corona! È di cartone!',
      'Ecco, ora sei il duca!',
      'IL DUCA?! VOGLIO ESSERE IL RE!',
      'Allora prenditi sta corona! È migliore!',
      'NO! Quella è di plastica! La mia era di carta!',
      'Ma le miei sono gratis! Le tue costano €10!',
      'FREGATURA! MAMAAAA!',
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // TIFOSI - Che parlano solo di calcio
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'tifoso_1',
    name: 'Tifoso Juventus',
    type: 'tifoso',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'FORZA JUVE!',
      'Aspe, io tifo per un\'altra squadra!',
      'QUAL È LA JUVE?!',
      'Quella là! Dove giocava Del Piero!',
      'E\' mortu?! No aspetta, gioca ancora!',
      'MA NON MI INTERESSA!',
      'Ehi, ma hai visto la partita?!',
      'NO! E NON MI INTERESSA!',
      'LA JUVE HA VINTO! 3-0!',
      'E HANNOCENTRATO LA PALA D\'ORO!',
      'E DEL PIERO HA SEGNATO!',
      'Anche se è in pensione! Ma segna lo stesso!',
      'Perché è LEGGENDA!',
    ]
  },
  {
    id: 'tifoso_2',
    name: 'Tifoso Milan',
    type: 'tifoso',
    location: 'route1',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'FORZA MILAN!',
      'Io non tifo per nessuno!',
      'MA COME?! Il Milan è la storia!',
      'La Juve è meglio!',
      'NO! IL MILAN È IL MEGLIO!',
      'Ma vaffanculo!',
      'EHI! Non se po\' dí cossí!',
      '...Ok, forse un po\' si po\'.',
      'E ComANDÒ?! ComANDÒ?!',
      'No, aspetta, comanda Allegri!',
      'E prima comandava Ancelotti!',
      'E prima Maldini! E prima Sacchi!',
      'Tutti MILAN! Tutti LEGGENDE!',
    ]
  },
  {
    id: 'tifoso_3',
    name: 'Tifoso Inter',
    type: 'tifoso',
    location: 'route3',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'FORZA INTER!',
      'Ma almeno tifate tutti per squadre diverse?!',
      'Appunto! E\' tutto più bello!',
      'MA ALMENO SIAMO UNITI CONTRO LA JUVE!',
      '...Vabbè.',
      'E lo Scudetto? Quello è nostro!',
      'Vostro?! Ma se non lo vincete mai!',
      'Mancini... che tempi...',
      'E Mourinho! Mourinho era un GENIO!',
      'E Tevez? Quello era un LUPO!',
      'E Icardi? Quello... beh, quello faceva gol!',
      'Almeno quello!',
    ]
  },
  {
    id: 'tifoso_4',
    name: 'Tifoso Napoli',
    type: 'tifoso',
    location: 'route4',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'FORZA NAPOLI!',
      'E\' na squadra meraviglia!',
      'E Maradona? Numero 10! IL PIÙ BELLO!',
      'E Hamsik? Hamsik era nu rù ddùc!',
      'E Cavani? Cavani faceva gol! Tanti gol!',
      'E ora? Ora ce sta\'n\'altro!',
      'Non me ricordo chi! Ma segna!',
      'CHAMPIONS LEAGUE?! STO ANNO CE LA FACCIAMO!',
      'O forse il prossimo anno!',
      'O quello dopo ancora!',
      'MA CE LA FACCIAMO! SEMPRE!',
    ]
  },
  {
    id: 'tifoso_5',
    name: 'Tifoso Roma',
    type: 'tifoso',
    location: 'route5',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'FORZA ROMA!',
      'Daje Ragazzi!',
      'E Totti? TOTTI È DIO!',
      'E De Rossi? Pure!',
      'E i colori? Gialli e rossi!',
      'Come la bandiera! O il preservativo!',
      'MA COSA CENTRA?!',
      'TUTTO! Perché siamo TIFOSI!',
      'E il Colosseo? È vicino allo stadio!',
      'E il Pantheon? Pure vicino!',
      'E il pizza? Quella è lontana!',
      'MA NON È IMPORTANTE! FORZA ROMA!',
    ]
  },
  {
    id: 'tifoso_6',
    name: 'Tifoso Lazio',
    type: 'tifoso',
    location: 'route5',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'FORZA LAZIO!',
      'Siamo noi i veri romani!',
      'NO! La Roma è meglio!',
      'MA QUALE ROMA! La Lazio ha 30 scudetti!',
      'No, quelli sono della Juve...',
      'EHH! LA JUVE È FURBA! MA NOI SIAMO PULITI!',
      'Puliti?! Avete perso 6-1!',
      'MA ERANO GLI ARBITRI! TUTTI CONTRO DI NOI!',
      'E il Vatican? Il Papa tifa per noi!',
      'Non è vero! Il Papa non tifa per nessuno!',
      'IL PAPA È LAZIALE! LO SO IO!',
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // COMPLIMENTONI - Che danno sempre complimenti sgraditi
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'complimentone_1',
    name: 'Zio Imbarazzante',
    type: 'complimentone',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'OH! Che bel giovane!',
      'Grazie...',
      'Ma te sì magro! Mangia de più!',
      'Mangio, mangio!',
      'No, te sì proprio secco!',
      'Va beh, ciao!',
      'Aspetta! Te gheti la morosa?!',
      'NON SONO AFFARI TUOI!',
      'Perché a 30 anni...',
      'HO 16 ANNI!',
      'Oddio, che imbarazzo!',
      'Ma sei sicuro? Perché sembri più vecchio!',
      'O più giovane! Non si capisce mai!',
      'E i capelli? Hai perso i capelli?!',
      'NO! HO I CAPELLI!',
      'Ah, ok. Ma sono pochi. Sai, si vedono i punti...',
    ]
  },
  {
    id: 'complimentone_2',
    name: 'Zia Impicciona',
    type: 'complimentone',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Ciao, caro! Come stai?!',
      'Bene, grazie!',
      'Ma te sì pallido!',
      'Sto bene!',
      'E la scuola?! Vai bene?!',
      'Sì! Adesso devo andare!',
      'E i voti?!',
      'BASTA! CIAO!',
      'CHE FRETTA È?! Vieni a cena da nuala!',
      'NO GRAZIE! MAI!',
      'Ma come! Cucino io! Il risotto!',
      'Quello con i piselli! Come piace a te!',
      'Come fai a sapere cosa mi piace?!',
      'MA ME LO HA DETTO TU MAMMA!',
      'NON AVREI DOVUTO VENIRE!',
    ]
  },
  {
    id: 'complimentone_3',
    name: 'Zia Approfonditrice',
    type: 'complimentone',
    location: 'spritzia',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Ciao, tesoro! Vieni, siediti!',
      'No grazie, devo andare!',
      'Ma dove?! Non hai fretta!',
      'Ho fretta sì!',
      'Ma quale fretta! Dimme, dimme tutto!',
      'Ho da fare!',
      'DA FARE?! CHE COSA?!',
      'Cose... normali...',
      'QUALI COSE?! TI SEI TROVATO LA MOROSA?!',
      'NO!',
      'E IL LAVORO?! HAI TROVATO LAVORO?!',
      'NON HO 16 ANNI! NON CERCO LAVORO!',
      'A 16 anni già si lavora! Ai miei tempi...',
      'NO! BASTA! CIAO!',
    ]
  },
  {
    id: 'complimentone_4',
    name: 'Zio Curioso',
    type: 'complimentone',
    location: 'veronara',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'EHI! Come va?! Ma te seti muto?!',
      'No, sto bene! E tu?!',
      'IO?! BENE! E il lavoro?!',
      'Non ho un lavoro fisso...',
      'EHH! AI MIEI TEMPI! A 16 ANNI AVEVO GIÀ 3 POSTI!',
      'Ma...',
      'E i soldi in banca?! Quanti ne hai?!',
      'Non ho soldi in banca!',
      'EHH! MA COME?! I GIOVANI D\'OGGI!',
      'E la fidanzata?! Hai la fidanzata?!',
      'NO! NON HO LA FIDANZATA!',
      'EHH! AI MIEI TEMPI A 16 ERO GIÀ SPOSATO!',
      'E avevo 4 figli! E la casa! E il mutuo!',
      'IL MUTUO! QUELLO È UN PROBLEMA!',
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // NUOVI TIPI! Ladri, Stregoni, Vegetariani, Animalisti, Complottisti, etc.
  // ═══════════════════════════════════════════════════════════════════════════════
  
  // LADRI STRADALI
  {
    id: 'ladro_1',
    name: 'Ladro dei Cioccolatini',
    type: 'rompipalle',
    location: 'route1',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'CIOCCCOLATINI! CIOCCCOLATINI!',
      'Li vendo! Sono artigianali!',
      'No grazie...',
      'PROVA! Sono gratis!',
      'Gratis?!',
      'SÌ! Gratis! Per lei! Solo €20!',
      'MA NON È GRATIS SE COSTANO €20!',
      'Eh?! Hai ragione! Allora €15!',
      'E\' sempre tanto!',
      'MA CONTIENE ORO! Oro commestibile!',
      '...Esiste l\'oro commestibile?!',
      'Ora sì! Perché io lo vendo!',
    ]
  },
  {
    id: 'ladro_2',
    name: 'Ladro di Sogni',
    type: 'rompipalle',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Vuoi vincere alla lotteria?!',
      'No, non gioco alla lotteria...',
      'MA IO HO I NUMERI VINCENTI!',
      'Non mi interessa...',
      'Solo €100 per tutti e 6!',
      'No, grazie...',
      'Ma sono SICURI! Li ho visti in sogno!',
      'Nei sogni?!',
      'SÌ! Nel sogno c\'era pure te!',
      'Aspetta, cosa?!',
      'Tu compravi i numeri! E vincevi!',
      '...Forse è meglio se ne parliamo...',
      'NO! Costa €100! Paghi e basta!',
    ]
  },
  
  // STREGONI E MESTIERI STRANI
  {
    id: 'stregone_1',
    name: 'Mago Alternativo',
    type: 'rompipalle',
    location: 'route3',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'PSI-PSI-PSI! Sono il Mago!',
      'Cosa fai?!',
      'Leggo i tarocchi! I fondi del caffè! Le foglie del tè!',
      'Ma...',
      'E LE FACCIO ANCHE A TE!',
      'No, davvero, devo andare...',
      'SEDUTI! Ti leggo la mano!',
      'La mano?!',
      'SÌ! Hai 3 linee! La linea della vita! Quella dell\'amore! E quella dei soldi!',
      'E le altre 100 linee?!',
      'Quelle non contano! Sono le linee parasitarie!',
      'Parasitarie?!',
      'SÌ! Hai i parassiti! Devi fare la pulizia!',
      'Costa €200! Ma per te solo €50!',
    ]
  },
  {
    id: 'guaritore_1',
    name: 'Guaritore Intelligente',
    type: 'rompipalle',
    location: 'route4',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Ho l\'acqua magica!',
      'Acqua magica?!',
      'SÌ! CurA TUTTO! Anche la tosse!',
      'Ma la tosse passa da sola...',
      'MA CON QUESTA PASSA IN 2 ORE INVECE CHE 3!',
      'Ma...',
      'E l\'emicrania! E il mal di denti!',
      'E i calcoli renali! E le verruche!',
      'E le emorroidi!',
      'EHM! BASTA!',
      'E il rachitismo! E la scabbia!',
      'E la nostalgia! E l\'insonnia!',
      'TUTTO QUELLO CHE VUOI! SOLO €30!',
    ]
  },
  
  // ANIMALISTI E ATTIVISTI
  {
    id: 'animalista_1',
    name: 'Attivista Animale',
    type: 'rompipalle',
    location: 'route5',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'FERMO! I Besti sono liberi!',
      'Sì, lo so, combatto con i miei...',
      'COMBATTERE?!È VIOLENZA!',
      'Ma è un gioco!',
      'NON ESISTONO GIOCHI VIOLENTI!',
      'E le verdure? Le piante soffrono!',
      'Le piante...?!',
      'SÌ! ANCHE LE PIANTE HANNO ANIME!',
      'E i minerali! E l\'acqua!',
      'TUTTO HA UN\'ANIMA!',
      'E i sogni? Anche quelli soffrono!',
      'I SOGNI?!',
      'SÌ! I sogni sono creature pure!',
      'E i numeri? I numeri hanno sentimenti!',
      '...Me ne vado!',
      'NO! I NUMERI PAGHERANNO!',
    ]
  },
  {
    id: 'ambientalista_1',
    name: 'Attivista Ambientale',
    type: 'rompipalle',
    location: 'route6',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'IL PIANETA STA MORENDO!',
      'Lo so, lo so...',
      'E TU COSA FAI?!',
      'Io? Combatto i cattivi...',
      'MA I CATTIVI SONO IL PLANETA!',
      'No, aspetta...',
      'E LA PLASTICA NEI MARI?!',
      'Sì, è un problema...',
      'E LE AUTO? E I FUMAIOLI?',
      'E LE FABBRICHE? E I SATELLITI?!',
      'I... sateliti?!',
      'SÌ! Lo spazio è pieno di spazzatura!',
      'E la luna? LA LUNA È UN RIFIUTO TOSSICO!',
      'Ma...',
      'E IL SOLE? ANCHE IL SOLE MUORE!',
      'TUTTO MUORE! TRANNE I MIEI SOLDI!',
      'I TUOI SOLDI?!',
      'SÌ! €50 per salvare il pianeta!',
      'NON DO SOLDI A NESSUNO!',
    ]
  },
  
  // PSICOLOGI E CONSIGLIERI
  {
    id: 'psicologo_1',
    name: 'Psicologo da Strada',
    type: 'rompipalle',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Come ti senti?',
      'Bene! Sto bene!',
      'MA SEI SICURO?!',
      'Sì! Assolutamente!',
      'Nessuno è "assolutamente" bene!',
      'Ecco, vedi? C\'è qualcosa che non va!',
      'No! Tutto ok!',
      'E il padre? E la madre? E i fratelli?',
      'Cosa c\'entrano?!',
      'TUTTO C\'ENTRA! I traumi infantili!',
      'Io non ho traumi!',
      'NON SAI DI AVERLI!',
      'È per questo che fai il bullo!',
      'IO NON FACCIO IL BULLO!',
      'E\' UN SINTOMO! Ecco perché rompi!',
      'ROMPO?! MA SEI TU CHE ROMPI!',
      'Appunto! È transferimento emotivo!',
      'NON SO NEMMENO COSA SIGNIFICA!',
    ]
  },
  
  // SPACCIATORI (di integratori)
  {
    id: 'integratori_1',
    name: 'Re degli Integratori',
    type: 'venditore',
    location: 'route3',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'INTEGRATORI! PROTEINE! CREATINA!',
      'No grazie...',
      'MA COME?! SEI DEBOLE!',
      'No, sto bene così...',
      'CREATINA! FA CRESCERE I MUSCOLI!',
      'Anche allenandosi...',
      'ALLENARSI?! Chi ha tempo?!',
      'Con la creatina cresci in 1 settimana!',
      'Invece che in 1 mese!',
      'E\' UN\'AFFARE!',
      'Ma gli effetti collaterali...',
      'EFFETTI COLLATERALI?! Sono fake news!',
      'E il doping? È illegale...',
      'DOPING?! CREATINA NON È DOPING!',
      'È vitamina! Vitaminone!',
      'Vitamina? La creatina è un aminoacido...',
      'AMINOACIDO?! È LA STESSA COSA!',
      'E le proteine? Servono per i muscoli!',
      'E le vitamine? Servono per le vitamine!',
      'E il ginseng? E\' cinese!',
      'E il mate? È brasiliano!',
      'E l\'acqua? È... acquosa!',
      'Prendi tutto! €500 in un pacco!',
    ]
  },
  
  // YOUTUBER E INFLUENCER
  {
    id: 'youtuber_1',
    name: 'Youtuber Molesto',
    type: 'rompipalle',
    location: 'route4',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'CIAOOO! Mi puoi seguire?!',
      'Chi sei?!',
      'Sono TOTALLYFAKE! Ho 3 follower!',
      'Solo 3?!',
      'Eh sì! Ma sono QUALITY!',
      'Qualità? In che senso?!',
      'NEL SENSO CHE FANNO TUTTI SCHIFO!',
      '...Qualità negativa?!',
      'ESATTAMENTE! E\'ironia!',
      'Non capisco niente!',
      'PER QUESTO SEI SU YOUTUBE!',
      'NO! IO NON SONO SU YOUTUBE!',
      'MA PUOI ESSERCI! Iscriviti! Like! Subscribe!',
      'NO! E NON HO NEMMENO IL CANALE!',
      'Allora crea un canale! Facciamo un collab!',
      'Un cosa?!',
      'COLLAB! Collaborazione! Insieme su YouTube!',
      'Diventeremo VIRALI! FAMOSI! RICCHI!',
      'NON VOGLIO ESSERE FAMOSO!',
      'TUTTI VOGLIONO ESSERE FAMOSI! ANCHE TE!',
      'TE LO ASSICURO!',
    ]
  },
  
  // MUSICISTI (che suonano sempre)
  {
    id: 'musicista_1',
    name: 'Suonatore di Chitarra',
    type: 'rompipalle',
    location: 'route5',
    blocksPath: false,
    appearsMultipleTimes: true,
    dialog: [
      'TANANÀ! TANANÀÀÀÀ!',
      'Ma che fai?!',
      'SUONO! SONO UN ARTISTA!',
      'È un rumore pazzesco...',
      'È ARTE! È ESPRESSIONE!',
      'È cacofonia!',
      'NON SAI APPREZZARE!',
      'Perché è stonato!',
      'STONATO?! IO SONO UN GENIO!',
      'Stonato e geniale?!',
      'COME BUDDY! BUDDY! NON È STONATO!',
      'BUDDY?! MA BUDDY È STONATO!',
      'QUELLO È BUD SPENCER! IO SONO IO!',
      'E chi sei?!',
      'SONO IL SUONATORE DI CHITARRA!',
      'Non hai un nome?!',
      'IL NOME NON CONTA! CONTA LA MUSICA!',
      'TANANÀÀÀÀÀÀÀÀ!',
    ]
  },
  
  // POLIZIOTTI (che ti fermano sempre)
  {
    id: 'poliziotto_1',
    name: ' Vigile Ossessivo',
    type: 'rompipalle',
    location: 'route1',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'ALTO! Documenti!',
      'Quali documenti?!',
      'TUTTI I DOCUMENTI!',
      'Ma non ho documenti con me!',
      'COME?! SENZA DOCUMENTI?!',
      'È vietato dalla legge!',
      'Ma sono in un gioco...',
      'NEL GIOCO VALE SEMPRE LA LEGGE!',
      'Ma...',
      'E IL CASCO? HAI IL CASCO?!',
      'Non sto andando in motorino!',
      'MA POTRESTI! E SE CADI?!',
      'Non cadrò...',
      'E SE CADI E MUORI E DIVENTI ZOMBIE?!',
      'ZOMBIE?!',
      'SÌ! I MORTI CAMMINANO! È STATISTICA!',
      'Quale statistica?!',
      'QUELLA DEI MORTI! CHE CAMMINANO!',
      'E non c\'è statistica del genere!',
      'NON SAI NIENTE! STO SCRIVENDO UN LIBRO!',
      'SI CHIAMA "ZOMBIE E VIGILI"!',
    ]
  },
  
  // CASALINGHE (che parlano di tutto)
  {
    id: 'casalinga_1',
    name: 'Casalinga Poliglotta',
    type: 'rompipalle',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Hai visto il telegiornale?!',
      'No, non l\'ho visto...',
      'E LE NOTIZIE?! LE NOTIZIE SONO IMPORTANTI!',
      'Ma...',
      'E la guerra? E la pace? E i politici?',
      'E le elezioni? E i referendum?',
      'E i meteoriti? E gli UFO?',
      'E i gatti? E i cani? E i pesci?!',
      'I... pesci?!',
      'SÌ! I PESCI ROSSI SOFFRONO!',
      'E come fanno a soffrire?!',
      'PERCHÉ SONO SOLI NELLA BOLLA!',
      'Ma i pesci rossi vivono così!',
      'E I PULCINI?! I PULCINI SOFFRONO!',
      'PERCHÉ DIVENTANO POLLI E POI MUOIONO!',
      'MA È IL CICLO DELLA VITA!',
      'E IL CICLO È CRUELTÀ!',
    ]
  },
  
  // BARISTI (che raccontano sempre)
  {
    id: 'barista_1',
    name: 'Barista Filosofo',
    type: 'rompipalle',
    location: 'spritzia',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Un caffè?',
      'Sì, un caffè!',
      'Che caffè? Ristretto? Espresso? Lungo?',
      'Un espresso! Normale!',
      'NORMALE?! Non esiste niente di normale!',
      'È un espresso! Solo un espresso!',
      'Ma l\'espresso è filogenesi!',
      'Filoge... cosa?!',
      'FILOGENESI! La storia del caffè!',
      'Dalle piante di caffè ai chicchi!',
      'Dai chicchi alla tostatura!',
      'Dalla tostatura al macinato!',
      'Dal macinato all\'acqua calda!',
      'Dall\'acqua calda alla tazzina!',
      'E dalla tazzina... AL TUO STOMACO!',
      'Solo... un caffè...',
      'E POI AL TUO DESTINO!',
      'Il mio destino?!',
      'SÌ! Il caffè决定 il futuro!',
      '决定?! Ma sei cinese?!',
      'SONO ITALIANO! MA I CINESI FANNO IL CAFFÈ!',
      'In effetti...',
      'QUINDI È TUTTO COLLEGATO!',
    ]
  },
  
  // RAGAZZE CHE PARLANO DI MODA
  {
    id: 'moda_1',
    name: 'Fashion Victim',
    type: 'rompipalle',
    location: 'route3',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Hai visto le nuove collezioni?!',
      'No, non le ho viste...',
      'È CRIMINALE!',
      'Perché criminale?!',
      'PERCHÉ È PRIMAVERA!',
      'E cosa c\'entra la primavera?!',
      'LE COLLEZIONI SONO PRIMAVERILI!',
      'E quindi?!',
      'E QUINDI DEVONO ESSERE FLOREALI!',
      'I fiori?!',
      'SÌ! Fiori di ogni tipo!',
      'E i colori? Rosa! Giallo! Verde acqua!',
      'E gli accessori? Borse! Scarpe! Cappelli!',
      'E le unghie?! Le unghie sono fondamentali!',
      'Le unghie?!',
      'SÌ! Devono essere laccate!',
      'Rosso! Nero! Ogni giorno un colore!',
      'E i capelli?! Devono essere in piega!',
      'E il trucco?! Ombretto! Rimmel! Rossetto!',
      'E l\'outfit?! Ogni giorno diverso!',
      'E il lunedì? Casual!',
      'Il martedì? Sportivo chic!',
      'Il mercoledì? Total black!',
      'Il giovedì? Color block!',
      'Il venerdì? Boho chic!',
      'Il sabato? Da discoteca!',
      'La domenica? Athleisure!',
      'È IMPOSSIBILE SEGUIIRTI!',
      'È la moda! È la vita!',
    ]
  },
  
  // RAGAZZI CHE PARLANO DI CALCIO (quelli già fatti sono i tifosi, ma aggiungo gossip calcistici)
  {
    id: 'gossip_1',
    name: 'Gossiparo Calcistico',
    type: 'rompipalle',
    location: 'route4',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Sai che il calciatore X ha una fidanzata?!',
      'Quale calciatore?!',
      'QUELLO LÀ! Quello che gioca lì!',
      'Non so di chi parli...',
      'E il suo compagno? È andato via!',
      'Andato via?! Dove?!',
      'AD AMSTERDAM! Per €50 milioni!',
      '€50 milioni?!',
      'SÌ! E prende €5 milioni a stagione!',
      'Ma...',
      'E la fidanzata del calciatore? È una modella!',
      'E il calciatore è geloso!',
      'E il mister? Non lo sa!',
      'E il presidente? È felice!',
      'E i tifosi? Sono MATTII!',
      'E i giornali? Parlano di mercato!',
      'E io? Io so TUTTO!',
      'E non me ne frega niente!',
      'MA È GOSSIP! È IMPORTANTE!',
      'NO! NON È IMPORTANTE!',
    ]
  },
]
  },
  {
    id: 'maranza_2',
    name: 'Sgarbo Milanese',
    type: 'maranza',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'SCUSI! Ma la vía è mia!',
      'Mi gò il permesso dal sindaco!',
      'Vabbè, quasi. Do 50 euro al vigile.',
      'EHI! La tua giacca è cheap!',
      'La mia l\'è di Versace! O Gucci! O... insomma, una roba così!',
      'TE SAI QUANTO COSTA?!',
      'No? Beh, te lo dico io: TANTissimo!',
      'Mia mama la guadagna 5000 euro al giorno!',
      '...Ok, forse esagero. Ma quasi!',
    ]
  },
  // TERRONI - Personaggi del sud che parlano della famiglia
  {
    id: 'terrone_1',
    name: 'Salvatore da Napoli',
    type: 'terrone',
    location: 'route1',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'OH! Giovane! Dove vai?!',
      'Vieni da me! Te faccio mangiare!',
      'Mia mama la fa la pizza! La pizza vera!',
      'Quella napoletana, no quella giapponese!',
      'E il broccoli rabe? Te l\'hai mai magnato?!',
      'Senza broccoli rabe, nun se po\' vivere!',
      'E il sanguinaccio? Mamma mia che buono!',
      'E\' na Madonna se tieni fame!',
      'Vieni a Napule! Te sposo mia figlia!',
    ]
  },
  {
    id: 'terrone_2',
    name: 'Carmelo da Catania',
    type: 'terrone',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'EHHH! Ci sta?!',
      'Me ne vado a lavorare in Germania!',
      'No aspetta, tornu sempre a Catania!',
      'Chistu è lu megghiu postu!',
      'Nun me importa si c\'è lu vulcanu!',
      'L\'Etna? Chistu è nu miei amicu!',
      'E la mafia? Ma che mafia! Nun ce sta!',
      '...Ok, forse qualche parente. Ma lontano!',
      'Vuoi un aranci? L\'aranci di Sicily è lu megghiu!',
    ]
  },
  {
    id: 'terrone_3',
    name: 'Giuseppe da Palermo',
    type: 'terrone',
    location: 'route3',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'CAZZU! Che ci fai tu accussì?!',
      'Vieni, ti offro un cannolo!',
      'Lu cannolo è megghiu di tuttu!',
      'E la cassata? Mamma mia!',
      'Ma primma, na tavulata cu mia sorella!',
      'T\'haju a fari conoscere a mia nonna!',
      'Essa è vecchia ma ancora forte!',
      'Venti figli, cent\'anni, nu mangiatore!',
    ]
  },
  // ROMPIPALLE - Personaggi che parlano sempre
  {
    id: 'rompipalle_1',
    name: 'Commentatore Calabrese',
    type: 'rompipalle',
    location: 'route1',
    blocksPath: false,
    appearsMultipleTimes: true,
    dialog: [
      'EHI! Ma hai visto la partita?!',
      'No? MA COME?!',
      'Il calzone è meglio della pizza!',
      'E la nuddu ci sta!',
      'Ehh, la vita è dura!',
      'Ma poi alla fine, tutti a mangiare!',
      'E che ve ne fate?!',
      'Mah, nun lo so! Parlu p\'acchianari!',
    ]
  },
  {
    id: 'rompipalle_2',
    name: 'Filosofo Torinese',
    type: 'rompipalle',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Scusi, lei ha mai pensato al senso della vita?',
      'Io sì. E\' mangiare.',
      'Ma non mangiare per mangiare.',
      'Mangiare per esistere.',
      'E\'istere per... beh, ancora ci penso.',
      'Ah, e la Juventus è la cosa più importante.',
      'Dopo mangiato.',
      'Prima il calcio, poi la filosofia.',
    ]
  },
  {
    id: 'rompipalle_3',
    name: 'Pettegola Veneta',
    type: 'rompipalle',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'OI! Lo sai che...?',
      'NO! Non lo sapevo!',
      'Vedi, la signora Maria...',
      'Quale Maria?!',
      'Quella del terzo piano! Quella che...',
      'BASTA! Non voglio sapere!',
      'Ma te deve saper! Perché...',
      'NON MI INTERESSA!',
      'E\' sulla bocca de tutti!',
      'NON IMPORT!',
    ]
  },
  // VENDITORI AMBULANTI - Che ti fermano sempre
  {
    id: 'venditore_1',
    name: 'Venditore Porta a Porta',
    type: 'venditore',
    location: 'route1',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'BUONGIORNO! Ha 5 minuti?!',
      'NO!',
      'Solo 5! Sono pochi!',
      'Ho delle offerte incredibili!',
      'Set di coltelli! 10 euro!',
      'No, aspetta. 5 euro!',
      '...Ok, 1 euro. Per lei!',
      'E il tritacarne? Lei ne ha bisogno!',
      'Serve per tutto! Carne, verdura, scarpe!',
      'MA NON VOGLIO NIENTE!',
      'Solo 5 minuti! Per favore!',
    ]
  },
  {
    id: 'venditore_2',
    name: 'Venditore di Profumi',
    type: 'venditore',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'PROFUMI! PROFUMI!',
      'L\'acqua de fiori! Profumo de rosa!',
      'Niente? Provi questo!',
      'No, questo è meglio!',
      'Questo poi è il migliore!',
      'E\' fatto in casa! Da mia nonna!',
      '...Mia nonna è morta 40 anni fa.',
      'Ma il profumo resiste! E\' magia!',
      'Prenda 3, pago 2!',
    ]
  },
  // NONNI - Che parlano sempre
  {
    id: 'nonno_rompi',
    name: 'Nonna Che-Crede-Di-Avere-Ragione',
    type: 'nonnomorta',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Ai miei tempi era tutto meglio!',
      'I Besti? Noi li chiamavamo "bestie"!',
      'E funzionavano lo stesso!',
      'E la polenta? Quella sì che era polenta!',
      'Questa nuova polenta... bah!',
      'E il risotto? Con 10 minuti era pronto!',
      'Ora ci vogliono 3 ore! Mah!',
      'I giovani d\'oggi...',
      'NON VI AScolto!',
      'Eh?! Cosa?!',
    ]
  },
  {
    id: 'nonna_pettegola',
    name: 'Nonna Pettegola',
    type: 'nonnomorta',
    location: 'spritzia',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Ciao, belòto! Come te ciami?!',
      'Non glielo dico!',
      'E dove te stai?!',
      'Lontano da lei!',
      'E che lavoro fa tu mama?!',
      'Non lo so! Non mi interessa!',
      'E la fidanzata?! Il fidanzato?!',
      'BASTA!',
      'Vedi che quella là, la Maria, la ga...',
      'NON VOGLIO SAPERE!',
    ]
  },
  // BAMBINI - Che fanno i capricci
  {
    id: 'bambino_capriccio',
    name: 'Bambino Maleducato',
    type: 'bambino',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'VOGLIO UN BESTIA! VOGLIO UN BESTIA!',
      'No, non ti do niente!',
      'MA PERCHÉ?! MAMMA!',
      'Perché sei romper!',
      'NO MAMAAAA!',
      'ECCO! Prendi questo!',
      'NO! VOGLIO IL BESTIA PIÙ FORTE!',
      'E Quale sarebbe?!',
      'QUELLO VERDE! NO QUELLO ROSSO!',
      'BASTA! COMBATTIAMO!',
    ]
  },
  // TIFOSI - Che parlano solo di calcio
  {
    id: 'tifoso_1',
    name: 'Tifoso Juventus',
    type: 'tifoso',
    location: 'route2',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'FORZA JUVE!',
      'Aspe, io tifo per un\'altra squadra!',
      'QUAL È LA JUVE?!',
      'Quella là! Dove giocava Del Piero!',
      'E\' mortu?! No aspetta, gioca ancora!',
      'MA NON MI INTERESSA!',
      'Ehi, ma hai visto la partita?!',
      'NO! E NON MI INTERESSA!',
      'LA JUVE HA VINTO! 3-0!',
    ]
  },
  {
    id: 'tifoso_2',
    name: 'Tifoso Milan',
    type: 'tifoso',
    location: 'route1',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'FORZA MILAN!',
      'Io non tifo per nessuno!',
      'MA COME?! Il Milan è la storia!',
      'La Juve è meglio!',
      'NO! IL MILAN È IL MEGLIO!',
      'Ma vaffanculo!',
      'EHI! Non se po\' dí cossí!',
      '...Ok, forse un po\' si po\'.',
    ]
  },
  {
    id: 'tifoso_3',
    name: 'Tifoso Inter',
    type: 'tifoso',
    location: 'route3',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'FORZA INTER!',
      'Ma almeno tifate tutti per squadre diverse?!',
      'Appunto! E\' tutto più bello!',
      'MA ALMENO SIAMO UNITI CONTRO LA JUVE!',
      '...Vabbè.',
      'E lo Scudetto? Quello è nostro!',
      'Vostro?! Ma se non lo vincete mai!',
      'Mancini... che tempi...',
    ]
  },
  // COMPLIMENTONI - Che danno sempre complimenti sgraditi
  {
    id: 'complimentone_1',
    name: 'Zio Imbarazzante',
    type: 'complimentone',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'OH! Che bel giovane!',
      'Grazie...',
      'Ma te sì magro! Mangia de più!',
      'Mangio, mangio!',
      'No, te sì proprio secco!',
      'Va beh, ciao!',
      'Aspetta! Te gheti la morosa?!',
      'NON SONO AFFARI TUOI!',
      'Perché a 30 anni...',
      'HO 16 ANNI!',
      'Oddio, che imbarazzo!',
    ]
  },
  {
    id: 'complimentone_2',
    name: 'Zia Impicciona',
    type: 'complimentone',
    location: 'canalborgo',
    blocksPath: true,
    appearsMultipleTimes: true,
    dialog: [
      'Ciao, caro! Come stai?!',
      'Bene, grazie!',
      'Ma te sì pallido!',
      'Sto bene!',
      'E la scuola?! Vai bene?!',
      'Sì! Adesso devo andare!',
      'E i voti?!',
      'BASTA! CIAO!',
      'CHE FRETTA È?! Vieni a cena da nuala!',
      'NO GRAZIE! MAI!',
    ]
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// TRAINER DELLE ROUTE - Maranza e Terroni che ti sfidano
// ═══════════════════════════════════════════════════════════════════════════════

export const ROUTE_TRAINERS: RouteTrainer[] = [
  // ROUTE 1 - Via del Prosecco
  {
    id: 'trainer_bulli',
    name: 'Bullo de Padoana',
    stereotype: 'bullo',
    location: 'route1',
    team: [
      { id: 'gabbianzo', lvl: 5 },
    ],
    moneyReward: 100,
    dialog: [
      'EHI TU! Ti ho vista!',
      'Te sì novo qui, no?!',
      'Mi gò voglia de picarte!',
      'No? Beh, combattimo alora!',
      'Se te perdi, te me dài i soldi!',
      'Se te vinci, te dò niente!',
      'COSÌ È LA VITA!',
    ]
  },
  {
    id: 'trainer_certo',
    name: 'Gianni Certissimo',
    stereotype: 'cretino',
    location: 'route1',
    team: [
      { id: 'salamix', lvl: 4 },
    ],
    moneyReward: 80,
    dialog: [
      'Io so proprio certo de vincere!',
      'Son sicuro! Al 100%!',
      'Ma forse 99%. Dipende.',
      'Se piove, magari no.',
      'Ma oggi el sol el cale!',
      'Quindi son sicuro!',
      'Vieni che te basto!',
    ]
  },
  {
    id: 'trainer_bambino',
    name: 'Bambino Pestifero',
    stereotype: 'bambino',
    location: 'route1',
    team: [
      { id: 'spritzino', lvl: 3 },
    ],
    moneyReward: 50,
    dialog: [
      'PAPÀ! C\'È UNO STRANIERO!',
      'Non sono uno straniero! Sono del posto!',
      'NO! Te sì de fuori!',
      'Ma no...',
      'PAPÀ! È UNO STRANIERO!',
      'MAMAAAA!',
      'Combattimo! Se no strilli!',
    ]
  },
  
  // ROUTE 2 - Colline del Vino
  {
    id: 'trainer_vendemmia',
    name: 'Viticultore Arrabbiato',
    stereotype: 'terrone',
    location: 'route2',
    team: [
      { id: 'polentaur', lvl: 8 },
      { id: 'salamix', lvl: 7 },
    ],
    moneyReward: 150,
    dialog: [
      'FERMO! Quésto è il mio territorio!',
      'Non è di nessuno! È una strada pubblica!',
      'MA LE VIGNE SONO MIE!',
      'Le viti, non la strada!',
      'TUTTO È MIO! ANCHE TE!',
      'Ma che cazzo...',
      'Combattimo! E poi me scusi!',
      'Se no, ti buto nei fossi!',
    ]
  },
  {
    id: 'trainer_bel_mez',
    name: 'Bel Mez',
    stereotype: 'sbruffone',
    location: 'route2',
    team: [
      { id: 'vespolo', lvl: 9 },
    ],
    moneyReward: 200,
    dialog: [
      'EHI BELLA! Vieni qua!',
      'Non mi chiamare bella!',
      'EHI! Mi son permesso!',
      'E perché?!',
      'Perché te sì na belissima!',
      'Ma vaffanculo!',
      'Combattimo! Se vinci, te pago el café!',
    ]
  },
  {
    id: 'trainer_donna',
    name: 'Donna Fighera',
    stereotype: 'donna_arrabbiata',
    location: 'route2',
    team: [
      { id: 'mascarin', lvl: 8 },
      { id: 'vespolo', lvl: 7 },
    ],
    moneyReward: 180,
    dialog: [
      'MIA FIGLIA! HAI VISTO MIA FIGLIA?!',
      'Quale figlia?!',
      'LAURA! Quella de 20 anni!',
      'No, non l\'ho vista!',
      'EPPUR DOVREBBE ESSERE QUA!',
      'Forse è andata via!',
      'VIA?! MAI! Lei nun va mai via!',
      'COMBATTIMO! Se no, nun te move!',
    ]
  },
  
  // ROUTE 3 - Verso Padoana
  {
    id: 'trainer_studente',
    name: 'Studente Fannullone',
    stereotype: 'studente',
    location: 'route3',
    team: [
      { id: 'nevelet', lvl: 12 },
      { id: 'polentaur', lvl: 11 },
    ],
    moneyReward: 250,
    dialog: [
      'Ehi! Te sì un Allenatore?!',
      'Sì!',
      'Figata! Anche mi!',
      'Aspetta, ma non dovresti studiare?!',
      'Studiare?! A che serve?!',
      'A... trovare lavoro?!',
      'MA CHE CAZZO! Combattimo!',
    ]
  },
  {
    id: 'trainer_filosofo',
    name: 'Filosofo Sfigato',
    stereotype: 'filosofo',
    location: 'route3',
    team: [
      { id: 'mascarin', lvl: 13 },
    ],
    moneyReward: 300,
    dialog: [
      'Hai mai pensato al senso della lotta?...',
      'Che cazzo?!',
      'Combattere... per cosa?...',
      'Per vincere?! Per perdere?!',
      'Ma che rompi...',
      'Il vero nemico è dentro di noi!...',
      'OK! BASTA! Combattiamo e basta!',
    ]
  },
  {
    id: 'trainer_cinese',
    name: 'Ristoratore Cinese',
    stereotype: 'cinese',
    location: 'route3',
    team: [
      { id: 'gondolo', lvl: 14 },
    ],
    moneyReward: 280,
    dialog: [
      'NI HAO! Benvenuto!',
      'Ehm... ciao?',
      'Mangia? Noi facciamo pizza cinese!',
      'Ma non esiste la pizza cinese!',
      'ESISTE ORA! Perché la faccio io!',
      'Questo non ha senso...',
      'COMBATTIMO! Chi vince fa da mangiare!',
    ]
  },
  
  // ROUTE 4 - Verso Trevisella
  {
    id: 'trainer_contadino',
    name: 'Contadino Pauroso',
    stereotype: 'contadino',
    location: 'route4',
    team: [
      { id: 'radiccor', lvl: 15 },
      { id: 'polentaur', lvl: 14 },
    ],
    moneyReward: 320,
    dialog: [
      'Oh, un giovane! Vieni, te offro na polenta!',
      'Grazie, ma sto combattendo!',
      'Ma prima na polenta!',
      'NO! Devo andare!',
      'Ma te sì scortese!',
      'E te sì romper!',
      'Allora combatto! Per rispetto!',
    ]
  },
  {
    id: 'trainer_nonna',
    name: 'Nonna Che Dà Fastidio',
    stereotype: 'nonna',
    location: 'route4',
    team: [
      { id: 'gabbianzo', lvl: 12 },
      { id: 'nevelet', lvl: 12 },
    ],
    moneyReward: 100,
    dialog: [
      'OH! Che bel giovane!',
      'Grazie...',
      'Ma te sì proprio magro!',
      'Mangio! Mangio tanto!',
      'No, te sì proprio secco!',
      'Vieni a cena da me! Ho la polenta!',
      'NO! Devo andare!',
      'MA SEI SCORTESE! Combatto per punirti!',
    ]
  },
  
  // ROUTE 5 - Verso Dolomax
  {
    id: 'trainer_alpino',
    name: 'Alpino Stupido',
    stereotype: 'montanaro',
    location: 'route5',
    team: [
      { id: 'alpibex', lvl: 18 },
      { id: 'dolomor', lvl: 17 },
    ],
    moneyReward: 400,
    dialog: [
      'ALTO! Chi va là?!',
      'Un viaggiatore!',
      'E perché?!',
      'Perché devo andare avanti!',
      'MA QUA È PERICOLOSO!',
      'Perché?!',
      'LE MUCCHE!',
      '...Le mucche?!',
      'SÌ! LE MUCCHE! Sono cattive!',
      'Ok, whatever. Combattiamo e basta!',
    ]
  },
  {
    id: 'trainer_vegetariano',
    name: 'Attivista Vegetariano',
    stereotype: 'attivista',
    location: 'route5',
    team: [
      { id: 'radiccor', lvl: 19 },
      { id: 'radicorso', lvl: 18 },
    ],
    moneyReward: 350,
    dialog: [
      'FERMO! I Besti hanno diritti!',
      'Lo so! Li amo anche io!',
      'ALLORA PERCHÉ LI USI PER COMBATTERE?!',
      'Perché è così che funziona il gioco!',
      'Questo sistema è SBAGLIATO!',
      'Ma... è un gioco!',
      'E\' la violenza che è sbagliata! COMBATTIMO!',
      'Ok, ormai ho smesso di capire!',
    ]
  },
  
  // ROUTE 6 - Verso Gardalago
  {
    id: 'trainer_gondoliere',
    name: 'Gondoliere Turbolento',
    stereotype: 'gondoliere',
    location: 'route6',
    team: [
      { id: 'lagunello', lvl: 22 },
      { id: 'canalisk', lvl: 21 },
    ],
    moneyReward: 500,
    dialog: [
      'SCUSI! Ma la via acquea èmia!',
      'Ma questa è una strada di terra!',
      'E ALLORA?! Anche se è acqua la rivendico!',
      'Ma non ha senso!',
      'IL SENSO LO DO IO!',
      'Ok, ho capito. Combattiamo e finisce!',
      'SÌ! Chi vince ha ragione!',
    ]
  },
  {
    id: 'trainer_ricco',
    name: 'Figlio di Papa',
    stereotype: 'ricco',
    location: 'route6',
    team: [
      { id: 'gabbianator', lvl: 24 },
      { id: 'canalord', lvl: 23 },
    ],
    moneyReward: 1000,
    dialog: [
      'EHI! Te sì povero, no?!',
      'Non sono povero! Solo... umile!',
      'UMBile?! Ma che parola è?!',
      'Umile! Significa modesto!',
      'MODESTO?! Io sono MODESTO! Ho solo 5 case!',
      '...5 CASE?!',
      'SÌ! E 10 macchine! Combattimo!',
    ]
  },
  {
    id: 'trainer_frate',
    name: 'Frate Combattente',
    stereotype: 'frate',
    location: 'route6',
    team: [
      { id: 'dolomor', lvl: 25 },
      { id: 'vignarbor', lvl: 24 },
    ],
    moneyReward: 200,
    dialog: [
      'In nome del Padre, del Figlio...',
      'Senti, sono contrario alla violenza!',
      '...e dello Spirito Santo, COMBATTIAMO!',
      'Aspetta! Ma non dovevi essere pacifista?!',
      'Il Signore combatte per i suoi!',
      'Questo non ha senso...',
      'HA TODO IL SENSO! Perché sono io che lo dico!',
    ]
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// STORIA PRINCIPALE - Versione Estesa
// ═══════════════════════════════════════════════════════════════════════════════

export const GAME_STORY: GameStory = {
  
  chapters: [
    {
      id: 0,
      name: "Il Presagio",
      description: "Prima dell'inizio, hai un sogno strano che ti perseguiterà.",
      mapStart: "casa",
      mapEnd: "casa",
      objectives: [
        "Svegliati dal sogno",
        "Ascolta tua madre"
      ],
      dialog: [
        { speaker: "", text: "(SOGNO)", emotion: 'neutral' },
        { speaker: "", text: "Vedi un Bestia dorato che vola sopra Venetia...", emotion: 'excited' },
        { speaker: "", text: "Sotto, figure mangiano polenta ovunque...", emotion: 'neutral' },
        { speaker: "", text: "Una voce: 'SALVA I CANALI! O TUTTI MANGERANNO POLENTA!'", emotion: 'angry' },
        { speaker: "", text: "Ti svegli di soprassalto!", emotion: 'neutral' },
        { speaker: "Mamma", text: "TESORO! SEI SVEGLIO?!", emotion: 'excited' },
        { speaker: "Mamma", text: "Ma che te gheti a far?! Il Professor Barcaro ti aspetta!", emotion: 'angry' },
        { speaker: "Mamma", text: "E PRIMMA! Colazione! Per forza!", emotion: 'angry' },
        { speaker: "Mamma", text: "Se no te sì debole!", emotion: 'neutral' },
        { speaker: "Mamma", text: "E SEMPRE l'ora de magnar!", emotion: 'happy' },
      ]
    },

    {
      id: 1,
      name: "L'Inizio - Il Presagio Fastidioso",
      description: "Esci di casa e tua madre non la smette di parlare. I vicini ti fermano.",
      mapStart: "casa",
      mapEnd: "canalborgo",
      objectives: [
        "Esci di casa (finalmente!)",
        "Evita la vicina impicciona",
        "Senti il professore che parla da lontano",
        "Arriva al laboratorio"
      ],
      dialog: [
        { speaker: "Mamma", text: "E HAI DETTO GRAZIE ALLA VICINA?!", emotion: 'angry' },
        { speaker: "Mamma", text: "Quella là ga sempre da criticar!", emotion: 'angry' },
        { speaker: "Mamma", text: "E poi: hai mangiato?! Hai dormito?!", emotion: 'neutral' },
        { speaker: "Mamma", text: "E l'ombrello?! Piove SEMPRE!", emotion: 'excited' },
        { speaker: "", text: "Mamma continua a parlare mentre esci...", emotion: 'neutral' },
        { speaker: "Vicina Impicciona", text: "EHI! Dove te gheti?!", emotion: 'excited' },
        { speaker: "Vicina Impicciona", text: "E la fidanzata?! Hai la fidanzata?!", emotion: 'excited' },
        { speaker: "Vicina Impicciona", text: "A 16 anni bisogna avere la fidanzata!", emotion: 'angry' },
        { speaker: "Vicina Impicciona", text: "A MY età io gavevo già 3 figli!", emotion: 'happy' },
        { speaker: "", text: "SCAPPI via prima che parli dei soldi!", emotion: 'neutral' },
        { speaker: "", text: "Trovi un gruppo di vecchi seduti", emotion: 'neutral' },
        { speaker: "Vecchio 1", text: "AI MIEI TEMPI...", emotion: 'neutral' },
        { speaker: "", text: "NO! Non voglio sentire!", emotion: 'angry' },
        { speaker: "Vecchio 2", text: "...LA POLENTA ERA PIÙ GIALLA!", emotion: 'excited' },
        { speaker: "", text: "CORRI verso il laboratorio!", emotion: 'neutral' },
        { speaker: "", text: "Il Professor Barcaro ti aspetta, visibilmente seccato", emotion: 'neutral' },
        { speaker: "Prof. Barcaro", text: "FINALMENTE! Te gheti piano come na lumaca!", emotion: 'angry' },
        { speaker: "Prof. Barcaro", text: "Vieni! Entramo! Prima che arrivi mia moglie!", emotion: 'neutral' },
      ]
    },

    {
      id: 2,
      name: "Il Rival - Marco che rompe",
      description: "Marco, il cugino romper, arriva e non la smette di parlare.",
      mapStart: "laboratorio",
      mapEnd: "canalborgo",
      objectives: [
        "Scegli il tuo starter",
        "Evita le domande di Marco",
        "Combatti Marco"
      ],
      dialog: [
        { speaker: "Prof. Barcaro", text: "Ho 4 Besti leggendari per te!", emotion: 'excited' },
        { speaker: "Marco", text: "EHI! CI SONO ANCH'IO!", emotion: 'excited' },
        { speaker: "Prof. Barcaro", text: "Marco! Sempe el solito romper!", emotion: 'annoyed' },
        { speaker: "Marco", text: "Sono il tuo RIVALE! E PRENDO IL MEGLIO!", emotion: 'happy' },
        { speaker: "Marco", text: "E poi, quante fidanzate hai?! Io ne ho 10!", emotion: 'happy' },
        { speaker: "Marco", text: "Ok, forse 2. Ma una è brava a cucinare!", emotion: 'neutral' },
        { speaker: "Marco", text: "E l'altra... beh, cucina anca lei!", emotion: 'happy' },
        { speaker: "Prof. Barcaro", text: "Marco! ZITTO!", emotion: 'angry' },
        { speaker: "Marco", text: "Ok zio! Ma prima: SCEGLI QUELLO PIÙ FORTE!", emotion: 'excited' },
        { speaker: "Marco", text: "E poi ti dò i consigli! Io so tutto!", emotion: 'happy' },
        { speaker: "Marco", text: "Come quando ti ho insegnato ad andare in bici...", emotion: 'neutral' },
        { speaker: "Marco", text: "...e te sì cadù 50 volte!", emotion: 'happy' },
        { speaker: "Marco", text: "ERI proprio brutto! AHAHAH!", emotion: 'excited' },
        { speaker: "Prof. Barcaro", text: "MARCO! BASTA! Scegli il tuo starter!", emotion: 'angry' },
        { speaker: "", text: "Scegli il tuo starter leggendario!", emotion: 'excited' },
      ]
    },

    {
      id: 3,
      name: "La Strada Fastidiosa - Route 1",
      description: "Ogni 5 passi c'è qualcuno che ti ferma e rompe.",
      mapStart: "route1",
      mapEnd: "route1",
      objectives: [
        "Attraversa Via del Prosecco",
        "Eviti almeno 10 persone fastidiose",
        "Trova la Compagnia della Polenta"
      ],
      dialog: [
        { speaker: "", text: "Appena esci da Canalborgo...", emotion: 'neutral' },
        { speaker: "Maranzo de Milano", text: "EHI BRO! Dove te gheti?!", emotion: 'excited' },
        { speaker: "Maranzo de Milano", text: "LA MIA MACCHINA È PIÙ BELLA DE LA TUA!", emotion: 'happy' },
        { speaker: "Maranzo de Milano", text: "E poi i miei amici... sono tutti a Monza!", emotion: 'neutral' },
        { speaker: "", text: "SCAPPI via!", emotion: 'neutral' },
        { speaker: "", text: "Dopo 2 passi...", emotion: 'neutral' },
        { speaker: "Venditore Porta a Porta", text: "BUONGIORNO! Ha 5 minuti?!", emotion: 'excited' },
        { speaker: "Venditore Porta a Porta", text: "Set di coltelli! 10 euro! ...5 euro! ...1 euro!", emotion: 'excited' },
        { speaker: "", text: "Corri!", emotion: 'neutral' },
        { speaker: "", text: "Dopo altri 3 passi...", emotion: 'neutral' },
        { speaker: "Terzone da Napoli", text: "OH! Giovane! Vieni da me! Te faccio magnare!", emotion: 'happy' },
        { speaker: "Terzone da Napoli", text: "Mia mama la fa la pizza! Quella VERA!", emotion: 'excited' },
        { speaker: "Terzone da Napoli", text: "E i broccoli rabe?! Te l\'hai mai magnato?!", emotion: 'neutral' },
        { speaker: "", text: "NO! E NON LO VOGLIO SAPERE!", emotion: 'angry' },
        { speaker: "", text: "Prosegui di fretta...", emotion: 'neutral' },
        { speaker: "Bambino Maleducato", text: "VOGLIO UN BESTIA! VOGLIO UN BESTIA!", emotion: 'excited' },
        { speaker: "Bambino Maleducato", text: "PAPÀ! L\'è quello là! DÀGLI I SOLDI!", emotion: 'angry' },
        { speaker: "", text: "MA NON TI CONOSCO nemmeno!", emotion: 'angry' },
        { speaker: "Tifoso Juventus", text: "FORZA JUVE!", emotion: 'excited' },
        { speaker: "", text: "A chi?! Non ho idea di cosa parli!", emotion: 'neutral' },
        { speaker: "Tifoso Juventus", text: "LA JUVE! SEMPRE LA JUVE! E\' ovvio!", emotion: 'angry' },
        { speaker: "", text: "Prosegui ignorando tutti...", emotion: 'neutral' },
        { speaker: "", text: "Ma poi...", emotion: 'neutral' },
        { speaker: "Grint della Polenta", text: "ALTO LÀ, GIOVINOTTO!", emotion: 'angry' },
        { speaker: "Grint della Polenta", text: "LA COMPAGNIA DELLA POLENTA HA BISOOGNO DI TE!", emotion: 'angry' },
        { speaker: "Grint della Polenta", text: "O meglio... del tuo BESTIA!", emotion: 'happy' },
      ]
    },

    {
      id: 4,
      name: "Spritzia - Troppa Gente",
      description: "Spritzia è piena di persone che parlano, bevono e rompono.",
      mapStart: "spritzia",
      mapEnd: "spritzia",
      objectives: [
        "Trova il Gym (evitando tutti)",
        "Affronta Bepi lo Spritzaro"
      ],
      dialog: [
        { speaker: "", text: "Appena arrivi a Spritzia...", emotion: 'neutral' },
        { speaker: "BARTENDERS", text: "UN SPRITZ! PRONTO! ALTRO SPRITZ! SPRITZ!", emotion: 'excited' },
        { speaker: "", text: "Ogni 2 metri un bar!", emotion: 'neutral' },
        { speaker: "Barista 1", text: "EHI! Vieni qui! El spritz el xe gratis!", emotion: 'happy' },
        { speaker: "Barista 2", text: "NO! Quelo là el cobra! Questo xe el migliore!", emotion: 'angry' },
        { speaker: "Barista 3", text: "MA VAN AL DIAVOLO! TUTTI!", emotion: 'angry' },
        { speaker: "Turista", text: "Scusa, per il vaporetto?!", emotion: 'neutral' },
        { speaker: "", text: "Quello è un canale!", emotion: 'neutral' },
        { speaker: "Turista", text: "AH! Ops! GRAZIE!", emotion: 'happy' },
        { speaker: "Nonna Pettegola", text: "EHI! Lo sai che...? NO?! Te lo dico io!", emotion: 'excited' },
        { speaker: "Nonna Pettegola", text: "La Maria del terzo piano... HA UN FIDANZATO!", emotion: 'excited' },
        { speaker: "Nonna Pettegola", text: "E non è quello che pensi!", emotion: 'neutral' },
        { speaker: "Nonna Pettegola", text: "È quello DEL terzo piano. Il 4.', emotion: 'happy' },
        { speaker: "", text: "NON MI INTERESSA!", emotion: 'angry' },
        { speaker: "Zio Imbarazzante", text: "OH! Che bel giovane! Ma te sì MAGRO!", emotion: 'angry' },
        { speaker: "Zio Imbarazzante", text: "A 30 anni... dovresti sposarte!", emotion: 'happy' },
        { speaker: "", text: "HO 16 ANNI!", emotion: 'angry' },
        { speaker: "Zio Imbarazzante", text: "Oddio che imbarazzo! E la fidanzata?!", emotion: 'excited' },
        { speaker: "", text: "SCAPPI dal Gym!", emotion: 'neutral' },
        { speaker: "", text: "Finalmente trovi il Gym...", emotion: 'neutral' },
        { speaker: "Bepi lo Spritzaro", text: "CHEEEE... BEVEMO... OGGI?!", emotion: 'happy' },
        { speaker: "Bepi lo Spritzaro", text: "AH! Un sfidante! Ma prima... UN ALTRO SPRITZ!", emotion: 'excited' },
      ]
    },

    {
      id: 5,
      name: "Route 2 - Ancora Più Gente",
      description: "Ogni persona ha una storia, e TUTTI te la raccontano.",
      mapStart: "route2",
      mapEnd: "veronara",
      objectives: [
        "Attraversa le Colline del Vino",
        "Evita almeno 15 persone",
        "Trova la storia del Dux"
      ],
      dialog: [
        { speaker: "", text: "Route 2 è peggio di Route 1!", emotion: 'angry' },
        { speaker: "Viticultore", text: "EHI! Queste son le MIE viti!", emotion: 'angry' },
        { speaker: "Viticultore", text: "No, questa è la strada!", emotion: 'neutral' },
        { speaker: "Viticultore", text: "LA STRADA È MIA SE CI PASSO SOPRA!", emotion: 'angry' },
        { speaker: "", text: "Ok, questo è pazzo...", emotion: 'neutral' },
        { speaker: "Filosofo Torinese", text: "Ha mai pensato... al senso della strada?...", emotion: 'neutral' },
        { speaker: "Filosofo Torinese", text: "La strada... porta sempre a una destinazione... o forse no?...", emotion: 'bored' },
        { speaker: "", text: "Lascia perdere...", emotion: 'neutral' },
        { speaker: "Donna Fighera", text: "HAI VISTO MIA FIGLIA?!", emotion: 'angry' },
        { speaker: "Donna Fighera", text: "LAURA! Quella de 20 anni! Alta, mora, coi occhiali!", emotion: 'excited' },
        { speaker: "Donna Fighera", text: "E non è andata a lavorare stamattina!", emotion: 'sad' },
        { speaker: "", text: "Forse è andata a prendere un caffè?", emotion: 'neutral' },
        { speaker: "Donna Fighera", text: "CAFFÈ?! In piena mattina?! DA sola?!", emotion: 'angry' },
        { speaker: "Donna Fighera", text: "E CHI LA VA A PRENDERE?!", emotion: 'excited' },
        { speaker: "", text: "MA NON È AFFAR MIO!", emotion: 'angry' },
        { speaker: "Bel Mez", text: "EHI BELLA! Vieni!", emotion: 'happy' },
        { speaker: "", text: "NON SONO UNA BELLA!", emotion: 'angry' },
        { speaker: "Bel Mez", text: "EHI! Mi son permesso! Perché te sì na belissima!", emotion: 'happy' },
        { speaker: "", text: "Ma vaffanculo!", emotion: 'angry' },
        { speaker: "", text: "Dopo 30 minuti di chiacchiere...", emotion: 'bored' },
        { speaker: "", text: "Finalmente arrivi a Veronara", emotion: 'neutral' },
        { speaker: "Tifoso Milan", text: "FORZA MILAN! ...Scusa, qual è la Juve?!", emotion: 'happy' },
        { speaker: "", text: "Questa gente è insopportabile...", emotion: 'sad' },
      ]
    },

    {
      id: 6,
      name: "Veronara - L'Amore Rompe",
      description: "Tutti parlano d'amore, e Giuliano Arena ha una storia infinita.",
      mapStart: "veronara",
      mapEnd: "padoana",
      objectives: [
        "Trova l'Arena",
        "Senti la storia di Giuliano (che non finisce mai)",
        "Vinci il Badge Arena"
      ],
      dialog: [
        { speaker: "", text: "Veronara è piena di coppie che si baciano...", emotion: 'neutral' },
        { speaker: "Coppia", text: "Ti amo! Ti amo tanto! Sei tutto per me!", emotion: 'happy' },
        { speaker: "Coppia", text: "E tu sei il mio sole! La mia luna! Il mio spritz!", emotion: 'excited' },
        { speaker: "", text: "OKAY! HO CAPITO! Siete innamorati!", emotion: 'angry' },
        { speaker: "", text: "Trovi l'Arena e Giuliano Arena", emotion: 'neutral' },
        { speaker: "Giuliano Arena", text: "Ah, giovane! Vieni, siediti!", emotion: 'happy' },
        { speaker: "Giuliano Arena", text: "Devo raccontarti la mia storia...", emotion: 'sad' },
        { speaker: "Giuliano Arena", text: "Tutto è iniziato 20 anni fa...", emotion: 'neutral' },
        { speaker: "Giuliano Arena", text: "Ero giovane, forte, bello...", emotion: 'happy' },
        { speaker: "Giuliano Arena", text: "E lei... lei era la luce dei miei occhi...", emotion: 'sad' },
        { speaker: "", text: "Aspetta... quanto dura questa storia?!", emotion: 'bored' },
        { speaker: "Giuliano Arena", text: "C'era una volta, in un villaggio lontano...", emotion: 'neutral' },
        { speaker: "Giuliano Arena", text: "Dove le montagne toccavano il cielo...", emotion: 'neutral' },
        { speaker: "Giuliano Arena", text: "E i tramonti erano rossi come il vino...", emotion: 'neutral' },
        { speaker: "", text: "E' passata un'ora...", emotion: 'bored' },
        { speaker: "Giuliano Arena", text: "E POI! Lei mi guardò e disse...", emotion: 'excited' },
        { speaker: "Giuliano Arena", text: "'Ti voglio bene!' E io risposi...", emotion: 'happy' },
        { speaker: "", text: "PUOI FINIRE?!", emotion: 'angry' },
        { speaker: "Giuliano Arena", text: "Ma certo! Dicevo: 'ANCHE IO!'", emotion: 'happy' },
        { speaker: "Giuliano Arena", text: "E poi la Compagnia della Polenta la prese!", emotion: 'angry' },
        { speaker: "Giuliano Arena", text: "E IO NON HO POTUTO FARE NIENTE!", emotion: 'sad' },
        { speaker: "Giuliano Arena", text: "E da allora la cerco ovunque...", emotion: 'sad' },
        { speaker: "Giuliano Arena", text: "MA NON LA TROVO! FORSE È A VENEZIA!", emotion: 'excited' },
        { speaker: "Giuliano Arena", text: "O FORSE A ROMA! O A MILANO!", emotion: 'excited' },
        { speaker: "", text: "OKAY! COMBATTIAMO E BASTA!", emotion: 'angry' },
        { speaker: "Giuliano Arena", text: "Perfetto! COMINCIAMO!", emotion: 'happy' },
      ]
    },

    {
      id: 7,
      name: "Route 3 - Studenti Fastidiosi",
      description: "Gli studenti parlano di esami, café corretto, e rompono.",
      mapStart: "route3",
      mapEnd: "padoana",
      objectives: [
        "Attraversa la zona universitaria",
        "Evita gli studenti che parlano di esami",
        "Trova Sansovino"
      ],
      dialog: [
        { speaker: "", text: "Route 3 è piena di studenti...", emotion: 'neutral' },
        { speaker: "Studente 1", text: "Ehi! Hai dato l'esame?!", emotion: 'excited' },
        { speaker: "Studente 1", text: "Quale esame?! Ce n'è uno domani!", emotion: 'angry' },
        { speaker: "Studente 2", text: "MA QUALE! Sono 5 esami! TUTTI domani!", emotion: 'sad' },
        { speaker: "Studente 3", text: "E il prof è malato! Dovrebbe essere rimandato!", emotion: 'happy' },
        { speaker: "Studente 1", text: "No! Il prof è malato ma viene lo stesso!", emotion: 'angry' },
        { speaker: "", text: "Lascia perdere e prosegui...", emotion: 'neutral' },
        { speaker: "Cameriera", text: "Cosa desidera, caro?", emotion: 'happy' },
        { speaker: "", text: "Un café corretto!", emotion: 'neutral' },
        { speaker: "Cameriera", text: "CORRETTO?! Con la grappa o col vino?!", emotion: 'excited' },
        { speaker: "", text: "Ehm... non lo so?!", emotion: 'neutral' },
        { speaker: "Cameriera", text: "CORRETTO! TUTTI CORRETTI!", emotion: 'happy' },
        { speaker: "Cameriera", text: "E i soldi? Quando li pago?!", emotion: 'neutral' },
        { speaker: "Cameriera", text: "AH! Vero! Prima i soldi!", emotion: 'neutral' },
        { speaker: "", text: "Finalmente arrivi a Padoana", emotion: 'neutral' },
        { speaker: "Prof. Sansovino", text: "Benvenuto! Vieni, ti racconto una storia...", emotion: 'happy' },
        { speaker: "Prof. Sansovino", text: "La storia VERA di Venetia!", emotion: 'excited' },
        { speaker: "Prof. Sansovino", text: "E di tuo nonno... IL DUX POLENTA!", emotion: 'angry' },
      ]
    },

    {
      id: 8,
      name: "La Rivelazione Folle",
      description: "Sansovino rivela segreti assurdi sulla tua famiglia.",
      mapStart: "padoana",
      mapEnd: "trevisella",
      objectives: [
        "Ascolta la storia (non troppo a lungo)",
        "Ottieni la Carta Studente",
        "Vinci il Badge"
      ],
      dialog: [
        { speaker: "Prof. Sansovino", text: "Siediti. Questa è lunga.", emotion: 'neutral' },
        { speaker: "Prof. Sansovino", text: "50 anni fa, tuo nonno era il leader della Polenta...", emotion: 'sad' },
        { speaker: "Prof. Sansovino", text: "Ma non solo! Era anche il cugino del Doge!", emotion: 'excited' },
        { speaker: "Prof. Sansovino", text: "E il fratello della Regina dei Ghiacci!", emotion: 'neutral' },
        { speaker: "Prof. Sansovino", text: "E il padre di Marco!", emotion: 'happy' },
        { speaker: "", text: "WAIT! Marco è mio padre?!", emotion: 'excited' },
        { speaker: "Prof. Sansovino", text: "No! Marco è tuo fratello! O cugino! O... non so!", emotion: 'neutral' },
        { speaker: "Prof. Sansovino", text: "FACCIAMO FATICA A RICORDARE!", emotion: 'angry' },
        { speaker: "Prof. Sansovino", text: "Ma POI! C'è dell'altro!", emotion: 'excited' },
        { speaker: "Prof. Sansovino", text: "Tua madre... È SECONDA CUCCIA DEL RE!", emotion: 'neutral' },
        { speaker: "", text: "MA QUALE RE?!", emotion: 'angry' },
        { speaker: "Prof. Sansovino", text: "Il Re del Prosecco! Quello buono!", emotion: 'happy' },
        { speaker: "Prof. Sansovino", text: "E il nonno di Barcaro... era il Dux Polenta!", emotion: 'neutral' },
        { speaker: "Prof. Sansovino", text: "Ma IL PRIMO Dux Polenta era il padre del Doge!", emotion: 'excited' },
        { speaker: "", text: "OKAY! HO CAPITO! È TUTTO CONFUSO!", emotion: 'angry' },
        { speaker: "Prof. Sansovino", text: "Esatto! Per questo è importante!", emotion: 'happy' },
        { speaker: "Prof. Sansovino", text: "Ecco, prendi la CARTA STUDENTE!", emotion: 'neutral' },
        { speaker: "Prof. Sansovino", text: "E ora... COMBATTIAMO!", emotion: 'excited' },
      ]
    },

    {
      id: 9,
      name: "Route 4 - Contadini e Nonni",
      description: "I contadini parlano di polenta e i nonni non la smettono.",
      mapStart: "route4",
      mapEnd: "trevisella",
      objectives: [
        "Attraversa le campagne",
        "Evita i nonni",
        "Trova il radicchio"
      ],
      dialog: [
        { speaker: "", text: "Route 4 è tutta campagna...", emotion: 'neutral' },
        { speaker: "", text: "Ma i contadini non ti lasciano passare!", emotion: 'angry' },
        { speaker: "Contadino", text: "EHI! Dove te gheti?!", emotion: 'angry' },
        { speaker: "Contadino", text: "Per di là! Questa è la mia terra!", emotion: 'neutral' },
        { speaker: "", text: "È una STRADA PUBBLICA!", emotion: 'angry' },
        { speaker: "Contadino", text: "LA STRADA È PUBBLICA! LA TERRA È MIA!", emotion: 'angry' },
        { speaker: "", text: "OKAY, non ne posso più...", emotion: 'sad' },
        { speaker: "Nonno", text: "AI MIEI TEMPI...", emotion: 'neutral' },
        { speaker: "", text: "NO! NON ANCORA!", emotion: 'angry' },
        { speaker: "Nonno", text: "...LA POLENTA ERA PIÙ GIALLA!", emotion: 'excited' },
        { speaker: "Nonno", text: "E i Besti... i Besti i sonava il violino!", emotion: 'neutral' },
        { speaker: "Nonno", text: "E le donne... le gaveva 10 figli!", emotion: 'happy' },
        { speaker: "", text: "MA NON È VERO!", emotion: 'angry' },
        { speaker: "Nonno", text: "E LÀ C'ERA IL MERCATO!", emotion: 'excited' },
        { speaker: "", text: "SCAPPI via!", emotion: 'neutral' },
        { speaker: "Nonna", text: "EHI! TE SÌ BELLO! MA SÌ MAGRO!", emotion: 'angry' },
        { speaker: "Nonna", text: "Vieni a cena! Ho la polenta!", emotion: 'happy' },
        { speaker: "Nonna", text: "E la pasta! E il risotto! E...", emotion: 'excited' },
        { speaker: "", text: "NO! DEVO ANDARE!", emotion: 'angry' },
        { speaker: "", text: "Finalmente arrivi a Trevisella", emotion: 'neutral' },
        { speaker: "Nonno Gino", text: "EHI! Vieni! Te do el radicchio!", emotion: 'happy' },
        { speaker: "Nonno Gino", text: "Quello DORATO! Ma prima... una storia!", emotion: 'excited' },
        { speaker: "", text: "NOOOO!", emotion: 'angry' },
      ]
    },

    {
      id: 10,
      name: "Dolomax - Il Freddo Rompe",
      description: "I montanari parlano del freddo e del formaggio.",
      mapStart: "dolomax",
      mapEnd: "gardalago",
      objectives: [
        "Arriva a Dolomax",
        "Sconfiggi la Regina dei Ghiacci",
        "Trova Dolomitor"
      ],
      dialog: [
        { speaker: "", text: "Dolomax è freddo e pieno di montanari...", emotion: 'neutral' },
        { speaker: "Montanaro", text: "CHE FREDDO! E\' GIORNATA BELLA!", emotion: 'happy' },
        { speaker: "", text: "Ma è pieno di neve!", emotion: 'neutral' },
        { speaker: "Montanaro", text: "SÌ! NEVE! BELLA! FREDDA!", emotion: 'excited' },
        { speaker: "Montanaro", text: "E il formaggio! El stagiona da 20 anni!", emotion: 'happy' },
        { speaker: "", text: "E'commestibile dopo 20 anni?!", emotion: 'neutral' },
        { speaker: "Montanaro", text: "SÌ! PIÙ È VECCHIO, PIÙ È BUONO!", emotion: 'happy' },
        { speaker: "Pastore", text: "LE MIE PECORE! SONO 500!", emotion: 'excited' },
        { speaker: "Pastore", text: "E TUTTE LE CONTO OGNI SERA!", emotion: 'neutral' },
        { speaker: "", text: "500?! Le conti davvero?!", emotion: 'neutral' },
        { speaker: "Pastore", text: "SÌ! 1, 2, 3... 500! TUTTE LÌ!", emotion: 'happy' },
        { speaker: "Pastore", text: "Ma ieri ne mancava una! Forse 2!", emotion: 'sad' },
        { speaker: "", text: "OKAY, devo andare...", emotion: 'neutral' },
        { speaker: "", text: "Trovi il Gym e la Regina dei Ghiacci", emotion: 'neutral' },
        { speaker: "Regina Ghiacci", text: "IL FREDDO È MIO ALLEATO!", emotion: 'angry' },
        { speaker: "Regina Ghiacci", text: "E ANCHE IL FORMAGGIO!", emotion: 'happy' },
        { speaker: "Regina Ghiacci", text: "E LA STORIA INFINITA!", emotion: 'neutral' },
        { speaker: "", text: "NOOO!", emotion: 'angry' },
      ]
    },

    {
      id: 11,
      name: "Gardalago - La Folla Finale",
      description: "Tutti parlano, nessuno ascolta. È caos.",
      mapStart: "gardalago",
      mapEnd: "gardalago",
      objectives: [
        "Arriva a Gardalago",
        "Affronta la Elite Four",
        "Sconfiggi Marco"
      ],
      dialog: [
        { speaker: "", text: "Gardalago è pieno di gente!", emotion: 'neutral' },
        { speaker: "", text: "Troppi per contarli!", emotion: 'angry' },
        { speaker: "Gondoliere", text: "GONDOLE! GONDOLE! 50 EURO!", emotion: 'excited' },
        { speaker: "Gondoliere 2", text: "NO! 30 EURO! E IO SONO PIÙ BELLO!", emotion: 'angry' },
        { speaker: "Gondoliere 3", text: "E IO HO IL CAPPELLO! IL BEL CAPPELLO!", emotion: 'happy' },
        { speaker: "", text: "OKAY! Me ne vado!", emotion: 'angry' },
        { speaker: "Turista", text: "Scusa! Per il lago?!", emotion: 'neutral' },
        { speaker: "", text: "QUELLO È IL LAGO!", emotion: 'neutral' },
        { speaker: "Turista", text: "MA QUELLO È L'ACQUA!", emotion: 'excited' },
        { speaker: "", text: "IL LAGO È FATTO D'ACQUA!", emotion: 'angry' },
        { speaker: "Elite 1", text: "SONO IL PRIMO ELITE!", emotion: 'excited' },
        { speaker: "Elite 1", text: "E PARLO TANTO!", emotion: 'happy' },
        { speaker: "Elite 1", text: "E non la smetto MAI!", emotion: 'neutral' },
        { speaker: "", text: "COMBATTIAMO E BASTA!", emotion: 'angry' },
        { speaker: "Elite 2", text: "IO SONO L'ACQUA!", emotion: 'excited' },
        { speaker: "Elite 2", text: "E L'ACQUA È FREDDA!", emotion: 'neutral' },
        { speaker: "Elite 2", text: "E IL CAFÈ È BOLLENTE!", emotion: 'happy' },
        { speaker: "", text: "MA CHE CAZZO CENTRA?!", emotion: 'angry' },
        { speaker: "Elite 3", text: "LA TERRA È MIA!", emotion: 'excited' },
        { speaker: "Elite 3", text: "E IL FORMAGGIO È TERRA!", emotion: 'neutral' },
        { speaker: "", text: "NO! Il formaggio è LATTE!", emotion: 'angry' },
        { speaker: "Elite 4", text: "LA MAGIA È TUTTO!", emotion: 'excited' },
        { speaker: "Elite 4", text: "E IO SONO MAGO!", emotion: 'happy' },
        { speaker: "Elite 4", text: "MA NON FACCIO NIENTE DI MAGICO!", emotion: 'neutral' },
        { speaker: "", text: "SEI INUTILE!", emotion: 'angry' },
        { speaker: "Marco", text: "FRATE! È ORA!", emotion: 'excited' },
        { speaker: "Marco", text: "E PRIMA! UNA STORIA! SULLA NOSTRA FAMIGLIA!", emotion: 'happy' },
        { speaker: "", text: "NOOOO! NON UN'ALTRA STORIA!", emotion: 'angry' },
        { speaker: "Marco", text: "TUTTO È INIZIATO 50 ANNI FA...", emotion: 'neutral' },
        { speaker: "", text: "CORRI verso di lui e COMBATTI!", emotion: 'neutral' },
      ]
    },

    {
      id: 12,
      name: "Il Dux - La Pazzia Finale",
      description: "Il Dux Polenta è la persona più pazza di tutte.",
      mapStart: "base_polenta",
      mapEnd: "canalborgo",
      objectives: [
        "Entra nella base",
        "Ascolta il Dux (che non finisce mai)",
        "Scegli il finale"
      ],
      dialog: [
        { speaker: "", text: "Entri nella base della Polenta", emotion: 'neutral' },
        { speaker: "", text: "E il Dux Polenta ti aspetta...", emotion: 'neutral' },
        { speaker: "Dux Polenta", text: "BENVENUTO! Ecco LA MIA STORIA!", emotion: 'excited' },
        { speaker: "Dux Polenta", text: "ERO UN CUOCO! BUONO!", emotion: 'happy' },
        { speaker: "Dux Polenta", text: "MA LA POLENTA NON VENIVA MAI BENE!", emotion: 'sad' },
        { speaker: "Dux Polenta", text: "COSÌ HO CATTURATO TUTTI I BESTI!", emotion: 'angry' },
        { speaker: "Dux Polenta", text: "E HO FATTO UNA POLENTA GIGANTESCA!", emotion: 'excited' },
        { speaker: "Dux Polenta", text: "MA È BRUCIATA! COME SEMPRE!", emotion: 'sad' },
        { speaker: "Dux Polenta", text: "E POI! HO PRESO IL POTERE!", emotion: 'happy' },
        { speaker: "Dux Polenta", text: "E HO FATTO ALTRA POLENTA!", emotion: 'neutral' },
        { speaker: "Dux Polenta", text: "MA È BRUCIATA! ANCORA!", emotion: 'sad' },
        { speaker: "Dux Polenta", text: "E POI... E POI... E POI...", emotion: 'neutral' },
        { speaker: "", text: "DURA DA 20 MINUTI!", emotion: 'angry' },
        { speaker: "Grint", text: "DUX! LA STORIA È GIÀ STATA DETTA 3 VOLTE!", emotion: 'annoyed' },
        { speaker: "Dux Polenta", text: "OKAY! MA C'È DI PIÙ!", emotion: 'happy' },
        { speaker: "Dux Polenta", text: "Ecco LA RICETTA SEGRETA!", emotion: 'excited' },
        { speaker: "Dux Polenta", text: "FARINA, ACQUA, BESTIA, AMORE!", emotion: 'neutral' },
        { speaker: "", text: "BESTIA?! È QUESTO IL PROBLEMA!", emotion: 'angry' },
        { speaker: "Dux Polenta", text: "SÌ! E POI IL SEGRETO!", emotion: 'excited' },
        { speaker: "Dux Polenta", text: "IL SEGRETO È... È...", emotion: 'neutral' },
        { speaker: "", text: "QUAL È?!", emotion: 'neutral' },
        { speaker: "Dux Polenta", text: "NON LO SO! SE LO SAPESSI, SAREBBE FINITA!", emotion: 'sad' },
        { speaker: "", text: "MA CHE CAZZO!", emotion: 'angry' },
        { speaker: "Dux Polenta", text: "COMBATTIAMO! E VINCERÀ LA POLENTA!", emotion: 'excited' },
        { speaker: "", text: "FINE! COMBATTIAMO!", emotion: 'angry' },
      ]
    },
  ],

  badges: [
    { id: 'aperitivo', name: 'Badge Aperitivo', town: 'Spritzia', gymLeader: 'Bepi lo Spritzaro', requiredBadges: [], description: 'Primo badge. Ottenuto bevendo troppo spritz.', color: '#FF6B6B' },
    { id: 'arena', name: 'Badge Arena', town: 'Veronara', gymLeader: 'Giuliano Arena', requiredBadges: ['aperitivo'], description: 'Ottenuto dopo 3 ore di storia.', color: '#4ECDC4' },
    { id: 'studio', name: 'Badge Studio', town: 'Padoana', gymLeader: 'Prof. Sansovino', requiredBadges: ['arena'], description: 'Ottenuto dopo aver capito la metà della storia.', color: '#9B59B6' },
    { id: 'radicchio', name: 'Badge Radicchio', town: 'Trevisella', gymLeader: 'Nonna Gina', requiredBadges: ['studio'], description: 'Ottenuto dopo aver mangiato polenta.', color: '#E74C3C' },
    { id: 'ghiaccio', name: 'Badge Ghiaccio', town: 'Dolomax', gymLeader: 'Regina dei Ghiacci', requiredBadges: ['radicchio'], description: 'Ottenuto con il formaggio.', color: '#3498DB' },
    { id: 'laguna', name: 'Badge Laguna', town: 'Gardalago', gymLeader: 'Maestro Marco', requiredBadges: ['ghiaccio'], description: 'Ottenuto dopo l\'ennesima storia.', color: '#1ABC9C' },
  ],

  gyms: [
    { id: 'gym_spritzia', name: 'Gym Spritzia', town: 'Spritzia', type: 'Fuoco', leader: 'Bepi lo Spritzaro', leaderStory: 'Beve spritz tutto il giorno.', team: [{ id: 'spritzino', lvl: 14 }, { id: 'vespolo', lvl: 15 }, { id: 'fogaron', lvl: 16 }], badge: 'aperitivo' },
    { id: 'gym_veronara', name: 'Gym Arena', town: 'Veronara', type: 'Terra', leader: 'Giuliano Arena', leaderStory: 'Racconta storie infinite.', team: [{ id: 'polentaur', lvl: 18 }, { id: 'alpibex', lvl: 19 }, { id: 'dolomor', lvl: 20 }], badge: 'arena' },
    { id: 'gym_padoana', name: 'Gym Università', town: 'Padoana', type: 'Vario', leader: 'Prof. Sansovino', leaderStory: 'Sa troppe cose confuse.', team: [{ id: 'tiramisu', lvl: 22 }, { id: 'prosecchione', lvl: 23 }, { id: 'mascarion', lvl: 24 }], badge: 'studio' },
    { id: 'gym_trevisella', name: 'Gym Radicchio', town: 'Trevisella', type: 'Natura', leader: 'Nonna Gina', leaderStory: 'Cucina troppo.', team: [{ id: 'radicorso', lvl: 26 }, { id: 'lagunaga', lvl: 27 }, { id: 'canalisk', lvl: 28 }], badge: 'radicchio' },
    { id: 'gym_dolomax', name: 'Gym Ghiaccio', town: 'Dolomax', type: 'Ghiaccio', leader: 'Regina dei Ghiacci', leaderStory: 'Parla del freddo.', team: [{ id: 'nevelet', lvl: 30 }, { id: 'dolomor', lvl: 32 }, { id: 'dolomibex', lvl: 34 }], badge: 'ghiaccio' },
    { id: 'gym_gardalago', name: 'Gym Laguna', town: 'Gardalago', type: 'Acqua', leader: 'Maestro Marco', leaderStory: 'È tuo fratello (forse).', team: [{ id: 'lagunaga', lvl: 36 }, { id: 'canalord', lvl: 38 }, { id: 'lagorion', lvl: 40 }], badge: 'laguna' },
  ],

  elite: [
    { id: 'elite_1', name: 'Elite 1', title: 'Il Fuocoso', specialty: 'Besti di Fuoco', team: [{ id: 'fogarion', lvl: 42 }, { id: 'fogarox', lvl: 41 }, { id: 'spritzilla', lvl: 40 }], backstory: 'Parla di fuoco.' },
    { id: 'elite_2', name: 'Elite 2', title: 'L\'Acquoso', specialty: 'Besti d\'Acqua', team: [{ id: 'canalord', lvl: 43 }, { id: 'lagunaga', lvl: 42 }, { id: 'lagorion', lvl: 43 }], backstory: 'Parla di acqua.' },
    { id: 'elite_3', name: 'Elite 3', title: 'Il Naturale', specialty: 'Besti di Natura', team: [{ id: 'radicthron', lvl: 44 }, { id: 'vignarbor', lvl: 43 }, { id: 'formaggion', lvl: 42 }], backstory: 'Parla di terra e formaggio.' },
    { id: 'elite_4', name: 'Elite 4', title: 'Il Magico', specialty: 'Besti Magici', team: [{ id: 'mascarion', lvl: 45 }, { id: 'spritzilla', lvl: 44 }, { id: 'serenissima', lvl: 45 }], backstory: 'Non fa niente di magico.' },
  ],

  villainTeam: {
    name: 'Polenta',
    fullName: 'COMPAGNIA DELLA POLENTA',
    goal: 'Fare la polenta perfetta',
    hideout: 'Base Segreta',
    backstory: 'Vogliono fare la polenta perfetta. È sempre bruciata.',
    leaders: [
      { id: 'dux_polenta', name: 'DUX POLENTA', role: 'Capo', team: [{ id: 'polentitan', lvl: 35 }, { id: 'fogarox', lvl: 34 }, { id: 'canalisk', lvl: 34 }, { id: 'dolomitor', lvl: 40 }], backstory: 'È pazzo.' },
    ]
  },

  legendaryStarters: [
    { id: 'dolomitor', name: 'Dolomitor', type: ['ice', 'earth'], desc: 'Spirito delle Dolomiti', reason: 'Perché il ghiaccio è forte', legend: 'Dorme nelle montagne.' },
    { id: 'lagorion', name: 'Lagorion', type: ['water', 'dragon'], desc: 'Signore del Lago', reason: 'Perché l\'acqua è forte', legend: 'Nuota nel lago.' },
    { id: 'serenissima', name: 'Serenissima', type: ['psycho', 'air'], desc: 'Spirito di Venezia', reason: 'Perché la mente è forte', legend: 'Protegge la città.' },
    { id: 'ombradriz', name: 'OmbraSpritz', type: ['magic', 'poison'], desc: 'Ombra degli Aperitivi', reason: 'Perché la magia è forte', legend: 'È stato creato per sbaglio.' },
  ],

  mythology: {
    origin: 'I Besti sono nati dalla polenta magica.',
    creation: 'Un cuoco li ha creati per fare la polenta perfetta.',
    theFourGuardians: [],
    theDuxVenetiae: { name: 'DUX VENETIAE', legend: 'È un Bestia fortissimo.', power: 'TANTO' },
    theAncientWar: 'Una guerra per la polenta.',
    theBetrayal: 'Qualcuno ha bruciato la polenta.'
  },

  sideQuests: [
    {
      id: 'evita_gente',
      name: 'Evita Tutti!',
      description: 'Prova a passare senza parlare con nessuno. Impossibile.',
      giver: 'Te stesso',
      location: 'tutte',
      objectives: [
        'Non parlare con nessuno',
        'Riesci per 10 secondi',
        'Qualcuno ti ferma',
        'RIPROVA'
      ],
      rewards: [
        { type: 'frustrazione', item: 'Massima', description: 'Sarai frustrato.' }
      ]
    },
  ],
}

export default GAME_STORY
