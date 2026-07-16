export type ArtistType = "band" | "solo" | "instrumental"

export type Album = {
  title: string
  artist: string
  year: number
  genre: Genre
  artistType: ArtistType
  obscure: boolean
}

export const GENRES = [
  "Rock",
  "Pop",
  "Hip-Hop",
  "R&B/Soul",
  "Electronic",
  "Jazz",
  "Metal",
  "Punk",
  "New Wave",
  "Indie/Alternative",
  "Country",
] as const

export type Genre = (typeof GENRES)[number]

export const DECADES = [
  { label: "1960s", start: 1960, end: 1969 },
  { label: "1970s", start: 1970, end: 1979 },
  { label: "1980s", start: 1980, end: 1989 },
  { label: "1990s", start: 1990, end: 1999 },
  { label: "2000s", start: 2000, end: 2009 },
  { label: "2010s", start: 2010, end: 2019 },
] as const

export type DecadeLabel = (typeof DECADES)[number]["label"]

// Curated library of real albums. `obscure: true` marks deeper cuts / less mainstream picks.
export const ALBUMS: Album[] = [
  // ---------------- ROCK ----------------
  { title: "Abbey Road", artist: "The Beatles", year: 1969, genre: "Rock", artistType: "band", obscure: false },
  { title: "Are You Experienced", artist: "The Jimi Hendrix Experience", year: 1967, genre: "Rock", artistType: "band", obscure: false },
  { title: "Forever Changes", artist: "Love", year: 1967, genre: "Rock", artistType: "band", obscure: true },
  { title: "Led Zeppelin IV", artist: "Led Zeppelin", year: 1971, genre: "Rock", artistType: "band", obscure: false },
  { title: "Rumours", artist: "Fleetwood Mac", year: 1977, genre: "Rock", artistType: "band", obscure: false },
  { title: "Maggot Brain", artist: "Funkadelic", year: 1971, genre: "Rock", artistType: "band", obscure: true },
  { title: "Born to Run", artist: "Bruce Springsteen", year: 1975, genre: "Rock", artistType: "solo", obscure: false },
  { title: "The Joshua Tree", artist: "U2", year: 1987, genre: "Rock", artistType: "band", obscure: false },
  { title: "Doolittle", artist: "Pixies", year: 1989, genre: "Rock", artistType: "band", obscure: true },
  { title: "Nevermind", artist: "Nirvana", year: 1991, genre: "Rock", artistType: "band", obscure: false },
  { title: "OK Computer", artist: "Radiohead", year: 1997, genre: "Rock", artistType: "band", obscure: false },
  { title: "Grace", artist: "Jeff Buckley", year: 1994, genre: "Rock", artistType: "solo", obscure: true },
  { title: "Is This It", artist: "The Strokes", year: 2001, genre: "Rock", artistType: "band", obscure: false },
  { title: "Turn On the Bright Lights", artist: "Interpol", year: 2002, genre: "Rock", artistType: "band", obscure: true },
  { title: "Elephant", artist: "The White Stripes", year: 2003, genre: "Rock", artistType: "band", obscure: false },
  { title: "Wasting Light", artist: "Foo Fighters", year: 2011, genre: "Rock", artistType: "band", obscure: false },
  { title: "El Camino", artist: "The Black Keys", year: 2011, genre: "Rock", artistType: "band", obscure: false },
  { title: "Blood Visions", artist: "Jay Reatard", year: 2006, genre: "Rock", artistType: "solo", obscure: true },

  // ---------------- POP ----------------
  { title: "Thriller", artist: "Michael Jackson", year: 1982, genre: "Pop", artistType: "solo", obscure: false },
  { title: "Like a Prayer", artist: "Madonna", year: 1989, genre: "Pop", artistType: "solo", obscure: false },
  { title: "Hounds of Love", artist: "Kate Bush", year: 1985, genre: "Pop", artistType: "solo", obscure: true },
  { title: "Rhythm Nation 1814", artist: "Janet Jackson", year: 1989, genre: "Pop", artistType: "solo", obscure: false },
  { title: "Ray of Light", artist: "Madonna", year: 1998, genre: "Pop", artistType: "solo", obscure: false },
  { title: "Emotion", artist: "Carly Rae Jepsen", year: 2015, genre: "Pop", artistType: "solo", obscure: true },
  { title: "1989", artist: "Taylor Swift", year: 2014, genre: "Pop", artistType: "solo", obscure: false },
  { title: "Confessions on a Dance Floor", artist: "Madonna", year: 2005, genre: "Pop", artistType: "solo", obscure: false },
  { title: "Back to Black", artist: "Amy Winehouse", year: 2006, genre: "Pop", artistType: "solo", obscure: false },
  { title: "Vespertine", artist: "Björk", year: 2001, genre: "Pop", artistType: "solo", obscure: true },
  { title: "Off the Wall", artist: "Michael Jackson", year: 1979, genre: "Pop", artistType: "solo", obscure: false },

  // ---------------- HIP-HOP ----------------
  { title: "Paid in Full", artist: "Eric B. & Rakim", year: 1987, genre: "Hip-Hop", artistType: "band", obscure: true },
  { title: "The Low End Theory", artist: "A Tribe Called Quest", year: 1991, genre: "Hip-Hop", artistType: "band", obscure: false },
  { title: "Enter the Wu-Tang (36 Chambers)", artist: "Wu-Tang Clan", year: 1993, genre: "Hip-Hop", artistType: "band", obscure: false },
  { title: "Illmatic", artist: "Nas", year: 1994, genre: "Hip-Hop", artistType: "solo", obscure: false },
  { title: "Aquemini", artist: "OutKast", year: 1998, genre: "Hip-Hop", artistType: "band", obscure: false },
  { title: "Madvillainy", artist: "Madvillain", year: 2004, genre: "Hip-Hop", artistType: "band", obscure: true },
  { title: "The College Dropout", artist: "Kanye West", year: 2004, genre: "Hip-Hop", artistType: "solo", obscure: false },
  { title: "good kid, m.A.A.d city", artist: "Kendrick Lamar", year: 2012, genre: "Hip-Hop", artistType: "solo", obscure: false },
  { title: "To Pimp a Butterfly", artist: "Kendrick Lamar", year: 2015, genre: "Hip-Hop", artistType: "solo", obscure: false },
  { title: "Reasonable Doubt", artist: "Jay-Z", year: 1996, genre: "Hip-Hop", artistType: "solo", obscure: true },
  { title: "Fishscale", artist: "Ghostface Killah", year: 2006, genre: "Hip-Hop", artistType: "solo", obscure: true },

  // ---------------- R&B / SOUL ----------------
  { title: "What's Going On", artist: "Marvin Gaye", year: 1971, genre: "R&B/Soul", artistType: "solo", obscure: false },
  { title: "Songs in the Key of Life", artist: "Stevie Wonder", year: 1976, genre: "R&B/Soul", artistType: "solo", obscure: false },
  { title: "There's a Riot Goin' On", artist: "Sly and the Family Stone", year: 1971, genre: "R&B/Soul", artistType: "band", obscure: true },
  { title: "Voodoo", artist: "D'Angelo", year: 2000, genre: "R&B/Soul", artistType: "solo", obscure: true },
  { title: "The Miseducation of Lauryn Hill", artist: "Lauryn Hill", year: 1998, genre: "R&B/Soul", artistType: "solo", obscure: false },
  { title: "Channel Orange", artist: "Frank Ocean", year: 2012, genre: "R&B/Soul", artistType: "solo", obscure: false },
  { title: "Baduizm", artist: "Erykah Badu", year: 1997, genre: "R&B/Soul", artistType: "solo", obscure: true },
  { title: "Songs for Women", artist: "Anita Baker", year: 1986, genre: "R&B/Soul", artistType: "solo", obscure: true },

  // ---------------- ELECTRONIC ----------------
  { title: "Homework", artist: "Daft Punk", year: 1997, genre: "Electronic", artistType: "band", obscure: false },
  { title: "Discovery", artist: "Daft Punk", year: 2001, genre: "Electronic", artistType: "band", obscure: false },
  { title: "Selected Ambient Works 85–92", artist: "Aphex Twin", year: 1992, genre: "Electronic", artistType: "solo", obscure: true },
  { title: "Music Has the Right to Children", artist: "Boards of Canada", year: 1998, genre: "Electronic", artistType: "band", obscure: true },
  { title: "Play", artist: "Moby", year: 1999, genre: "Electronic", artistType: "solo", obscure: false },
  { title: "Untrue", artist: "Burial", year: 2007, genre: "Electronic", artistType: "solo", obscure: true },
  { title: "Random Access Memories", artist: "Daft Punk", year: 2013, genre: "Electronic", artistType: "band", obscure: false },
  { title: "Since I Left You", artist: "The Avalanches", year: 2000, genre: "Electronic", artistType: "band", obscure: true },
  { title: "Dig Your Own Hole", artist: "The Chemical Brothers", year: 1997, genre: "Electronic", artistType: "band", obscure: false },

  // ---------------- JAZZ ----------------
  { title: "Kind of Blue", artist: "Miles Davis", year: 1959, genre: "Jazz", artistType: "solo", obscure: false },
  { title: "A Love Supreme", artist: "John Coltrane", year: 1965, genre: "Jazz", artistType: "solo", obscure: false },
  { title: "Maiden Voyage", artist: "Herbie Hancock", year: 1965, genre: "Jazz", artistType: "solo", obscure: true },
  { title: "Bitches Brew", artist: "Miles Davis", year: 1970, genre: "Jazz", artistType: "solo", obscure: true },
  { title: "Head Hunters", artist: "Herbie Hancock", year: 1973, genre: "Jazz", artistType: "solo", obscure: false },
  { title: "The Epic", artist: "Kamasi Washington", year: 2015, genre: "Jazz", artistType: "solo", obscure: true },
  { title: "Black Radio", artist: "Robert Glasper Experiment", year: 2012, genre: "Jazz", artistType: "band", obscure: true },

  // ---------------- METAL ----------------
  { title: "Paranoid", artist: "Black Sabbath", year: 1970, genre: "Metal", artistType: "band", obscure: false },
  { title: "The Number of the Beast", artist: "Iron Maiden", year: 1982, genre: "Metal", artistType: "band", obscure: false },
  { title: "Master of Puppets", artist: "Metallica", year: 1986, genre: "Metal", artistType: "band", obscure: false },
  { title: "Rust in Peace", artist: "Megadeth", year: 1990, genre: "Metal", artistType: "band", obscure: false },
  { title: "Blackwater Park", artist: "Opeth", year: 2001, genre: "Metal", artistType: "band", obscure: true },
  { title: "Jane Doe", artist: "Converge", year: 2001, genre: "Metal", artistType: "band", obscure: true },
  { title: "Sunbather", artist: "Deafheaven", year: 2013, genre: "Metal", artistType: "band", obscure: true },
  { title: "Toxicity", artist: "System of a Down", year: 2001, genre: "Metal", artistType: "band", obscure: false },

  // ---------------- PUNK ----------------
  { title: "Ramones", artist: "Ramones", year: 1976, genre: "Punk", artistType: "band", obscure: false },
  { title: "Never Mind the Bollocks", artist: "Sex Pistols", year: 1977, genre: "Punk", artistType: "band", obscure: false },
  { title: "London Calling", artist: "The Clash", year: 1979, genre: "Punk", artistType: "band", obscure: false },
  { title: "Damaged", artist: "Black Flag", year: 1981, genre: "Punk", artistType: "band", obscure: true },
  { title: "Double Nickels on the Dime", artist: "Minutemen", year: 1984, genre: "Punk", artistType: "band", obscure: true },
  { title: "Dookie", artist: "Green Day", year: 1994, genre: "Punk", artistType: "band", obscure: false },
  { title: "The Shape of Punk to Come", artist: "Refused", year: 1998, genre: "Punk", artistType: "band", obscure: true },

  // ---------------- NEW WAVE ----------------
  { title: "Remain in Light", artist: "Talking Heads", year: 1980, genre: "New Wave", artistType: "band", obscure: false },
  { title: "Dare", artist: "The Human League", year: 1981, genre: "New Wave", artistType: "band", obscure: true },
  { title: "Architecture & Morality", artist: "Orchestral Manoeuvres in the Dark", year: 1981, genre: "New Wave", artistType: "band", obscure: true },
  { title: "Violator", artist: "Depeche Mode", year: 1990, genre: "New Wave", artistType: "band", obscure: false },
  { title: "Seventeen Seconds", artist: "The Cure", year: 1980, genre: "New Wave", artistType: "band", obscure: true },
  { title: "The Head on the Door", artist: "The Cure", year: 1985, genre: "New Wave", artistType: "band", obscure: false },
  { title: "Rio", artist: "Duran Duran", year: 1982, genre: "New Wave", artistType: "band", obscure: false },
  { title: "Tin Drum", artist: "Japan", year: 1981, genre: "New Wave", artistType: "band", obscure: true },

  // ---------------- INDIE / ALTERNATIVE ----------------
  { title: "Murmur", artist: "R.E.M.", year: 1983, genre: "Indie/Alternative", artistType: "band", obscure: true },
  { title: "Slanted and Enchanted", artist: "Pavement", year: 1992, genre: "Indie/Alternative", artistType: "band", obscure: true },
  { title: "In the Aeroplane Over the Sea", artist: "Neutral Milk Hotel", year: 1998, genre: "Indie/Alternative", artistType: "band", obscure: true },
  { title: "Funeral", artist: "Arcade Fire", year: 2004, genre: "Indie/Alternative", artistType: "band", obscure: false },
  { title: "Illinois", artist: "Sufjan Stevens", year: 2005, genre: "Indie/Alternative", artistType: "solo", obscure: true },
  { title: "For Emma, Forever Ago", artist: "Bon Iver", year: 2007, genre: "Indie/Alternative", artistType: "solo", obscure: true },
  { title: "Modern Vampires of the City", artist: "Vampire Weekend", year: 2013, genre: "Indie/Alternative", artistType: "band", obscure: false },
  { title: "Lonerism", artist: "Tame Impala", year: 2012, genre: "Indie/Alternative", artistType: "solo", obscure: false },

  // ---------------- COUNTRY ----------------
  { title: "At Folsom Prison", artist: "Johnny Cash", year: 1968, genre: "Country", artistType: "solo", obscure: false },
  { title: "Red Headed Stranger", artist: "Willie Nelson", year: 1975, genre: "Country", artistType: "solo", obscure: true },
  { title: "Coat of Many Colors", artist: "Dolly Parton", year: 1971, genre: "Country", artistType: "solo", obscure: false },
  { title: "Guitar Town", artist: "Steve Earle", year: 1986, genre: "Country", artistType: "solo", obscure: true },
  { title: "Car Wheels on a Gravel Road", artist: "Lucinda Williams", year: 1998, genre: "Country", artistType: "solo", obscure: true },
  { title: "Golden Hour", artist: "Kacey Musgraves", year: 2018, genre: "Country", artistType: "solo", obscure: false },
  { title: "Southeastern", artist: "Jason Isbell", year: 2013, genre: "Country", artistType: "solo", obscure: true },

  // ---------------- INSTRUMENTAL (cross-genre) ----------------
  { title: "F♯ A♯ ∞", artist: "Godspeed You! Black Emperor", year: 1997, genre: "Rock", artistType: "instrumental", obscure: true },
  { title: "Lift Your Skinny Fists Like Antennas to Heaven", artist: "Godspeed You! Black Emperor", year: 2000, genre: "Rock", artistType: "instrumental", obscure: true },
  { title: "Young Team", artist: "Mogwai", year: 1997, genre: "Rock", artistType: "instrumental", obscure: true },
  { title: "( )", artist: "Sigur Rós", year: 2002, genre: "Rock", artistType: "instrumental", obscure: true },
  { title: "Ágætis byrjun", artist: "Sigur Rós", year: 1999, genre: "Rock", artistType: "instrumental", obscure: true },
  { title: "The Rip Tide", artist: "Explosions in the Sky", year: 2011, genre: "Rock", artistType: "instrumental", obscure: true },
  { title: "The Earth Is Not a Cold Dead Place", artist: "Explosions in the Sky", year: 2003, genre: "Rock", artistType: "instrumental", obscure: true },
  { title: "Amok", artist: "Atoms for Peace", year: 2013, genre: "Electronic", artistType: "instrumental", obscure: true },
  { title: "Substrata", artist: "Biosphere", year: 1997, genre: "Electronic", artistType: "instrumental", obscure: true },
  { title: "Music for 18 Musicians", artist: "Steve Reich", year: 1978, genre: "Jazz", artistType: "instrumental", obscure: true },
  { title: "Shadows in Time", artist: "The Cinematic Orchestra", year: 2007, genre: "Jazz", artistType: "instrumental", obscure: true },
]
