export interface FullVideoList {
  title:       string;
  embed:       string;
  url:         string;
  thumbnail:   string;
  date:        string;
  side1:       Side;
  side2:       Side;
  competition: Competition;
  videos:      Video[];
}

export interface Competition {
  name: string;
  id:   number;
  url:  string;
}

export interface Side {
  name: string;
  url:  string;
}

export interface Video {
  title: Title;
  embed: string;
}

export enum Title {
  Highlights = "Highlights",
  LiveStream = "Live Stream",
  The11KeiyaShiihashi = "1-1 Keiya Shiihashi",
}

/////////////////////////////////

export interface TeamStandings {
  position:       number;
  team:           Team;
  playedGames:    number;
  form:           string;
  won:            number;
  draw:           number;
  lost:           number;
  points:         number;
  goalsFor:       number;
  goalsAgainst:   number;
  goalDifference: number;
}

export interface Team {
  id:        number;
  name:      string;
  shortName: string;
  tla:       string;
  crest:     string;
}


//////////////////////////////////

export interface Team {
  position:       number;
  team:           TeamClass;
  playedGames:    number;
  form:           string;
  won:            number;
  draw:           number;
  lost:           number;
  points:         number;
  goalsFor:       number;
  goalsAgainst:   number;
  goalDifference: number;
}

export interface TeamClass {
  id:        number;
  name:      string;
  shortName: string;
  tla:       string;
  crest:     string;
}