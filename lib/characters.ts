// ═══════════════════════════════════════════════════════════════════════════════
// PERSONAGGI PARODIA VENETI - Personaggi divertenti della tradizione veneta
// ═══════════════════════════════════════════════════════════════════════════════

export interface VenetianCharacter {
  id: string
  name: string
  role: string
  dialect: string
  quirks: string[]
  famousPhrase: string
  sprite: string
}

export const PARODY_CHARACTERS: Record<string, VenetianCharacter> = {
  // Il Pizzard - Il ragazzo delle pizze
  pizzard: {
    id: 'pizzard',
    name: 'Pizzard',
    role: 'Pizzaiolo Ambulante',
    dialect: 'Pizzaiolo con lo scooterino che fa le consegne in tutta Venetia',
    quirks: ['Sempre in ritardo', 'Sbaglia sempre indirizzo', 'La pizza è sempre fredda', 'Fuma come un turco'],
    famousPhrase: 'Pizzzaaa! Calda e filante! Oddio, ho sbagliato strada... de novo!',
    sprite: 'pizza_guy',
  },

  // Il Gondoliere - Ma neanche per sogno
  gondoliere_rock: {
    id: 'gondoliere_rock',
    name: 'Rocky',
    role: 'Gondoliere Rock',
    dialect: 'Ex rockstar che ora fa il gondoliere',
    quirks: ['Canta sempre', 'Ha perso la voce', 'Tifa per l\'Inter', 'Beve troppo Spritz'],
    famousPhrase: 'O sole mio... *tosse* scusa, ho il raffreddore da 3 mesi!',
    sprite: 'gondolier',
  },

  // La Nonna - Sa tutto, fa tutto
  nonna_gina: {
    id: 'nonna_gina',
    name: 'Nonna Gina',
    role: 'Saggio del Villaggio',
    dialect: 'Nonna che ha visto tutto e sa tutto',
    quirks: ['Sa fare tutto', 'Cucina il risotto perfetto', 'Ti da sempre del cattivo tempo', 'Ha 47 nipoti'],
    famousPhrase: 'Nel mio tempo... era tutto meglio! E anche peggio! Ma meglio!',
    sprite: 'old_lady',
  },

  // Il Bacaro - Il re del cicchetto
  bacaro_max: {
    id: 'bacaro_max',
    name: 'Max el Bacaro',
    role: 'Re del Cicchetto',
    dialect: 'Basso che lavora solo per bere',
    quirks: ['Beve 12 spritz al giorno', 'Paga sempre con il bancontact', 'Dà sempre credito', 'Chiude alle 3 di notte'],
    famousPhrase: 'Un another cicchetto! Today I feel like a lion!',
    sprite: 'scientist',
  },

  // Il Fotografo - Sempre dal tono sbagliato
  foto_mario: {
    id: 'foto_mario',
    name: 'Foto Mario',
    role: 'Fotografo Turistico',
    dialect: 'Fotografo che urla sempre i comandi sbagliati',
    quirks: ['Urla "sorridi" in dialetto', 'Le foto vengono sempre brutte', 'Cambia sempre idea', ' Usa filtri strani'],
    famousPhrase: 'SORRISI! BRAVI! NO ASPETA! TROPPI DENTI! ...Bel sorriso! Ma no, era meglio prima!',
    sprite: 'photographer',
  },

  // Il Tifoso - Sempre scorretto
  tifoso_mario: {
    id: 'tifoso_mario',
    name: 'Mario Tifoso',
    role: 'Tifoso Incallito',
    dialect: 'Tifoso che ha tifato per tutte le squadre almeno una volta',
    quirks: ['Cambia tifoseria', 'Litiga con tutti', 'Sa sempre meglio', 'Beve birra calda'],
    famousPhrase: 'FORZA VENEZIA! ...No aspetta, oggi tifo per la Roma! O il Milan! Chi vince oggi?',
    sprite: 'fisherman',
  },

  // Il Muratore - Sempre stanco
  muratore_bruno: {
    id: 'muratore_bruno',
    name: 'Bruno el Murador',
    role: 'Murant sul cantier',
    dialect: 'Muratore che lavora sul serio',
    quirks: ['Sempre coperto de polvere', 'Fa le pause ogni 10 minuti', 'Sa dove sono tutte le osterie', 'Lavora dal 1972'],
    famousPhrase: 'Xe 40 anni che gò fato el muro! E ancora no xe finio!',
    sprite: 'hiker',
  },

  // La Cameriera - Sempre indaffarata
  cameriera_maria: {
    id: 'cameriera_maria',
    name: 'Maria la Cameriera',
    role: 'Regina del Bar',
    dialect: 'Cameriera che fa 100 cose insieme',
    quirks: ['Mai ferma un secondo', 'Sbatte tutto', 'Conosce tutti i pettegolezzi', 'Fuma in cucina'],
    famousPhrase: 'Un tavolo per due! Tre! NO ASPETA! Il caffè! CHE Caffè?! ... CORRETTO!',
    sprite: 'lass',
  },

  // Il Professore - Sempre distratto
  prof_sansovino: {
    id: 'prof_sansovino',
    name: 'Prof. Sansovino',
    role: 'Professore Distratto',
    dialect: 'Professore universitario sempre con la testa tra le nuvole',
    quirks: ['Perde sempre gli occhiali', 'Insegna cose sbagliate', 'Dimentica gli esami', 'Pubblica paperi inventati'],
    famousPhrase: 'Quindi, come dicevo ieri... no, l\'altro ieri... mmm, quando ho detto... ehm... DOMANI!',
    sprite: 'professor',
  },

  // Il Prete - Sempre a messa
  don_bepi: {
    id: 'don_bepi',
    name: 'Don Bepi',
    role: 'Prete del Paese',
    dialect: 'Prete che fa messa 3 volte al giorno',
    quirks: ['Benedice tutti', 'Non capisce i giovani', 'Sa i pettegolezzi prima di tutti', 'Gioca a carte con le nonne'],
    famousPhrase: 'Dio ti benedica, figliolo! Ma... te goto vedesto stamattina in piazza? A far cosa? Mmm!',
    sprite: 'scientist',
  },

  // Il Pescatore - Sempre bugiardo
  pescatore_tonic: {
    id: 'pescatore_tonic',
    name: 'Sior Tonic',
    role: 'Pescatore Bugiardo',
    dialect: 'Pescatore che racconta sempre storie enormi',
    quirks: ['Le sue storie crescono ogni volta', 'Non ha mai preso niente', 'Sa dove sono i pesci ma non ci va mai', 'Beve vino bianco'],
    famousPhrase: 'Ieri gavevo 'na spigola così! No aspetta,era un torpedine! No, el pesce siluro! ...No, gò inventà tutto!',
    sprite: 'fisherman',
  },

  // Il Lattaio - Sempre in ritardo
  lattaio_gino: {
    id: 'lattaio_gino',
    name: 'Gino el Lata',
    role: 'Lattaio delle Dolomiti',
    dialect: 'Lattaio che porta il latte in cima alle montagne',
    quirks: ['Arriva sempre in ritardo', 'Le mucche scappano sempre', 'Ha le scarpe rotte', 'Fuma la pipa'],
    famousPhrase: 'El latte! Freschissimo! ...No, xe de ieri. Ma xe sempre fresco! Se no gò perso el viaggio!',
    sprite: 'hiker',
  },

  // Il Sindaco - Sempre in campagna elettorale
  sindaco_umberto: {
    id: 'sindaco_umberto',
    name: 'Dott. Umberto',
    role: 'Sindaco per 40 anni',
    dialect: 'Sindaco che non molla mai la poltrona',
    quirks: ['Promette sempre', 'Mai mantenuto niente', 'Sa tutti i voti prima delle elezioni', 'Gioca a golf con gli assessori'],
    famousPhrase: ' Voterè per mi! Voterè per mi! ...Votème anca vostro cugn! Vorèghe ben!',
    sprite: 'champion',
  },

  // Il Dottore - Sempre ammalato
  dottore_leo: {
    id: 'dottore_leo',
    name: 'Dott. Leo',
    role: 'Medico del Paese',
    dialect: 'Medico che cura tutti con la grappa',
    quirks: ['E lui stesso sempre malato', 'Prescrive grappa per tutto', 'Ha lo studio in casa', 'Non lava mai le mani'],
    famousPhrase: 'Te gò fato la riceta! Grapa! No, prima la grapa, poì el medicinal! ...No, prima el medicinal! Orpo!',
    sprite: 'scientist',
  },

  // L\'Elettricista - Mai fatto niente
  elettricista_fabio: {
    id: 'elettricista_fabio',
    name: 'Fabio Elettrico',
    role: 'Elettricista a Riposo',
    dialect: 'Elettricista che ha fatto 3 lavori in vita sua',
    quirks: ['Ha rotto più case di quante ne ha riparate', 'Lavorava prima in tv', 'Conosce tutti i politici', 'Fuma 4 pacchetti al giorno'],
    famousPhrase: 'El contatore? L\'ò fissà! No, l\'ò rotto! No, xe un altro problema! Ma niente paura!',
    sprite: 'scientist',
  },

  // La Befana - Arriva sempre in ritardo
  befana_maria: {
    id: 'befana_maria',
    name: 'La Befana',
    role: 'La Befana Veneta',
    dialect: 'Befana che porta carbonella e polenta',
    quirks: ['Arriva a Febbraio', 'Porta solo carbonella', 'Volare con la scopa rotta', 'Beve troppo vin brulé'],
    famousPhrase: 'Sono in ritardo! Sono in ritardo! ...Dove sono? Xeedo? No, Treviso! Oddio!',
    sprite: 'old_lady',
  },

  // Il Panettiere - Sempre chiuso
  panettiere_giacomo: {
    id: 'panettiere_giacomo',
    name: 'Giacomo el Panetier',
    role: 'Panettiere Mitico',
    dialect: 'Panettiere che fa il pane migliore ma è sempre chiuso',
    quirks: ['Apre quando gli pare', 'Il pane finisce sempre subito', 'Tira tardi la mattina', 'Sa sempre quando hai fame'],
    famousPhrase: 'El pan! L\'ò finio! ...No, l\'ò beguno! ...No, xe in casa! Vieni doman! Ma doman son chiuso!',
    sprite: 'scientist',
  },

  // Il Postino - Sempre in giro
  postino_roberto: {
    id: 'postino_roberto',
    name: 'Roberto el Postin',
    role: 'Portalettere',
    dialect: 'Postino che conosce tutti i pettegolezzi',
    quirks: ['Conosce tutti gli affari di paese', 'Perde sempre le lettere', 'Legge le cartoline', 'Beve caffè in ogni bar'],
    famousPhrase: 'C\'è una lettera! Per chi? Per tutti! No, per nissun! ...Xe per ti! Ma no, l\'ò perdesta!',
    sprite: 'youngster',
  },

  // Il Parrucchiere - Sempre in ritardo
  parrucchiere_silvia: {
    id: 'parrucchiere_silvia',
    name: 'Silvia la Parruchiera',
    role: 'Regina del Bello',
    dialect: 'Parrucchiera che fa i tagli più strani',
    quirks: ['I suoi tagli sono sempre di moda... o no', 'Parlotta senza sosta', 'Sa tutti i segreti delle donne', 'Fuma in pausa'],
    famousPhrase: 'Te farò 'na belesa! Un taglio modern! Come le modelle! ...No, le modelle de 30 anni fa! Ma xe igual!',
    sprite: 'lass',
  },
}

// Get random funny dialogue for a character
export const getCharacterDialog = (characterId: string): string[] => {
  const char = PARODY_CHARACTERS[characterId]
  if (!char) return ['...']

  const dialogues = [
    char.famousPhrase,
    `Oi, te! Senti 'sta storia!`,
    `Nel mio paese el facesvamo cusì!`,
    `Te sa cosa gò sentio stamattina?`,
    `Vien qua che te conto!`,
    `Xe 'na storia lunga, ma te la conto lo steso!`,
    `No te credar, ma...`,
    `Xe tanto tempo, ma me recordo!`,
    `Mi gò vesto 'na roba!`,
    `Te digo 'na cosa, ma no dirghene a nissun!`,
    `Ho fame! ...No, scusa, continuemo!`,
    `El tempo xe mal, ma无所谓!`,
  ]

  return dialogues
}

// Get greeting based on time of day
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours()
  
  if (hour < 12) {
    return 'Buongiorno!'
  } else if (hour < 18) {
    return 'Buonasera!'
  } else if (hour < 22) {
    return 'Buonasera! O ben, xe sera! '
  } else {
    return 'Buonanotte! Ma chi gò da far a quest\'ora?'
  }
}
