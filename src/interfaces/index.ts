export interface Creator {
  name: string;
  link: string;
}

export interface Lyric {
  lyric: string;
  wait: number;
  timestamp: number;
}

export interface Audios {
  original: string;
  instrumental: string;
}

export interface VerseData {
  verseId: string;
  verseName: string;
  songName: string;
  creators: Creator[];
  lyrics: Lyric[];
  audios: Audios;
}

