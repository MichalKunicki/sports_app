import { GetServerSideProps } from "next";
import { MatchesGroupedArray, Transfers } from "../types";
import styles from "../styles/Fixtures.module.scss";
import Image from "next/image";
import TransfersNewsWidget from "../components/transfersNewsWidget/TransfersNewsWidget";

const today = new Date().toISOString().slice(0, 10);
const [yyyy, mm, dd] = today.split("-");
const plusOneWeek = `${yyyy}-${mm}-${Number(dd) + 7}`;

interface Competition {
  name: string;
  url: string;
  area: string;
}

const formatDate = (date: Date) => {
  const day = date.toString().slice(8, 10);
  const month = date.toString().slice(4, 7);
  const dayAndMonth = day + month;
  const time = date.toString().slice(11, 16);
  return dayAndMonth + " | " + time;
};

const Fixtures = ({
  matches,
  competitions,
  transfers,
}: {
  matches: MatchesGroupedArray[];
  competitions: Competition[];
  transfers: Transfers[];
}) => {
  return (
    <main className={styles.fixturesPage}>
      <div className={styles.allFixturesContainer}>
        <h1 className={styles.header}>FIXTURES THIS WEEK (UTC Time)</h1>
        {competitions.map((comp, i) => (
          <div className={styles.competitionContainer} key={i}>
            <div className={styles.competitionName}>
              <div className={styles.logoBackground}>
                <Image
                  alt="competition-crest"
                  src={comp.url}
                  height={40}
                  width={40}
                />
              </div>
              <span>{comp.name}</span>
              <span className={styles.area}>{`(${comp.area})`}</span>
            </div>
            <div>
              {matches.map((match) => {
                if (comp.name === match.competition.name) {
                  return (
                    <div className={styles.match} key={match.id}>
                      <span>{formatDate(match.utcDate)}</span>
                      <div className={styles.teamVSteam}>
                        <span
                          className={styles.homeSide}
                        >{`${match.homeTeam.name}`}</span>
                        {match.homeTeam.crest !== null && (
                          <Image
                            alt="hometeam-crest"
                            src={match.homeTeam.crest}
                            height={18}
                            width={18}
                          />
                        )}
                        <span>vs</span>
                        {match.awayTeam.crest !== null && (
                          <Image
                            alt="awayteam-crest"
                            src={match.awayTeam.crest}
                            height={18}
                            width={18}
                          />
                        )}
                        <span className={styles.awaySide}>
                          {`${match.awayTeam.name}`}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(matches, undefined, 2)}</pre> */}
      <TransfersNewsWidget transfers={transfers} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    `https://api.football-data.org/v4/matches?dateFrom=${today}&dateTo=${plusOneWeek}
    `,
    {
      method: "GET",
      headers: {
        "X-Auth-Token": "4e9e470375b640a38e6c3081069133c2",
      },
    }
  );
  // Matches Array
  const { matches }: { matches: MatchesGroupedArray[] } = await response.json();

  //Competitions Array
  const competitions: Competition[] = [];

  matches.forEach((match) => {
    const isFound = competitions.some((comp) => {
      if (comp.name === match.competition.name) {
        return true;
      }
      return false;
    });

    const obj: Competition = {
      name: match.competition.name,
      url: match.competition.emblem,
      area: match.area.name,
    };
    !isFound && competitions.push(obj);
  });
  /////// FIXTURES DATA
  const responseFixtures = await fetch(
    "https://football-transfer-news1.p.rapidapi.com/news",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6e53d9a08cmsh751eda812235656p1e847fjsn1fa6500eb5cd",
        "X-RapidAPI-Host": "football-transfer-news1.p.rapidapi.com",
      },
    }
  );
  const transfersData: Transfers[] = await responseFixtures.json();
  const transfers = transfersData.slice(0, -1);
  // .filter((v, i, a) => a.findIndex((v2) => v2.title === v.title) === i);
  console.log(transfers);

  return {
    props: {
      matches,
      competitions,
      transfers,
    },
  };
};

export default Fixtures;
