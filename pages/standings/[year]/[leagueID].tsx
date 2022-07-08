import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { TeamStandings } from "../../../types";
import styles from "../../../styles/LeagueID.module.scss";
import Image from "next/image";
import StandingsFilters from "../../../components/standingsFilters/StandingsFilters";

const Fixtures: NextPage<{ table: TeamStandings[] }> = ({ table }) => {
  return (
    <main className={styles.standingsPage}>
      <StandingsFilters />
      <div className={styles.standingsContainer}>
        <div className={styles.standingsFirstRow}>
          <span>#</span>
          <span>Team</span>
          <span className={styles.points}>P</span>
          <span>D</span>
          <span>L</span>
          <span>W</span>
          <span>GF</span>
          <span>GA</span>
          <span>GD</span>
        </div>
        {table?.map((team) => (
          <div className={styles.standingsRow} key={team.position}>
            <span>{team?.position}</span>
            <div className={styles.teamName}>
              <Image
                src={team.team.crest}
                alt="team-crest"
                height={18}
                width={18}
              />
              <span>{team?.team.name}</span>
            </div>
            <span className={styles.points}>{team?.points}</span>
            <span>{team?.won}</span>
            <span>{team?.draw}</span>
            <span>{team?.lost}</span>
            <span>{team?.goalsFor}</span>
            <span>{team?.goalsAgainst}</span>
            <span>{team?.goalDifference}</span>
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(table, undefined, 2)}</pre>; */}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await fetch(
      `https://api.football-data.org/v4/competitions/${context.query.leagueID}/standings/?season=${context.query.year}`,
      {
        method: "GET",
        headers: {
          "X-Auth-Token": "4e9e470375b640a38e6c3081069133c2",
        },
      }
    );
    const { standings } = await res?.json();
    const { table } = standings[0];

    return {
      props: {
        table,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/standings",
        permanent: false,
      },
    };
  }
};

export default Fixtures;
