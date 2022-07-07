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

export interface Matches {
  area:        Area;
  competition: CompetitionData;
  season:      Season;
  id:          number;
  utcDate:     Date;
  status:      Status;
  matchday:    number | null;
  stage:       Stage;
  group:       null;
  lastUpdated: Date;
  homeTeam:    TeamData;
  awayTeam:    Team;
  score:       Score;
  odds:        Odds;
  referees:    any[];
}

export interface Area {
  id:   number;
  name: AreaName;
  code: AreaCode;
  flag: null | string;
}

export enum AreaCode {
  Bra = "BRA",
  Eur = "EUR",
  Sam = "SAM",
}

export enum AreaName {
  Brazil = "Brazil",
  Europe = "Europe",
  SouthAmerica = "South America",
}

export interface TeamData {
  id:        number;
  name:      string;
  shortName: null | string;
  tla:       null | string;
  crest:     null | string;
}

export interface CompetitionData {
  id:     number;
  name:   CompetitionName;
  code:   CompetitionCode;
  type:   Type;
  emblem: string;
}

export enum CompetitionCode {
  BSA = "BSA",
  CLI = "CLI",
  Cl = "CL",
}

export enum CompetitionName {
  CampeonatoBrasileiroSérieA = "Campeonato Brasileiro Série A",
  CopaLibertadores = "Copa Libertadores",
  UEFAChampionsLeague = "UEFA Champions League",
}

export enum Type {
  Cup = "CUP",
  League = "LEAGUE",
}

export interface Odds {
  msg: Msg;
}

export enum Msg {
  ActivateOddsPackageInUserPanelToRetrieveOdds = "Activate Odds-Package in User-Panel to retrieve odds.",
}

export interface Score {
  winner:   null | string;
  duration: Duration;
  fullTime: Time;
  halfTime: Time;
}

export enum Duration {
  Regular = "REGULAR",
}

export interface Time {
  home: number | null;
  away: number | null;
}

export interface Season {
  id:              number;
  startDate:       Date;
  endDate:         Date;
  currentMatchday: number;
  winner:          null;
}

export enum Stage {
  Last16 = "LAST_16",
  QualificationRound1 = "QUALIFICATION_ROUND_1",
  RegularSeason = "REGULAR_SEASON",
}

export enum Status {
  Finished = "FINISHED",
  Timed = "TIMED",
}
