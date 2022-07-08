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

///////////////////////////////////

export interface MatchesGroupedArray {
  area:        Area;
  competition: Competition;
  season:      Season;
  id:          number;
  utcDate:     Date;
  status:      string;
  matchday:    null;
  stage:       string;
  group:       null;
  lastUpdated: Date;
  homeTeam:    Team;
  awayTeam:    Team;
  score:       Score;
  odds:        Odds;
  referees:    any[];
}

export interface Area {
  id:   number;
  name: string;
  code: string;
  flag: null;
}

export interface Team {
  id:        number;
  name:      string;
  shortName: string;
  tla:       string;
  crest:     string;
}

export interface Competition {
  id:     number;
  name:   string;
  code:   string;
  type:   string;
  emblem: string;
}

export interface Odds {
  msg: string;
}

export interface Score {
  winner:   string;
  duration: string;
  fullTime: Time;
  halfTime: Time;
}

export interface Time {
  home: number;
  away: number;
}

export interface Season {
  id:              number;
  startDate:       Date;
  endDate:         Date;
  currentMatchday: number;
  winner:          null;
}

///////////////////////////////
export interface Transfers {
  title: string;
  url: string;
  source: string;
}

