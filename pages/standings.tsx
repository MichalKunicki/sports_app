import type { GetServerSideProps, NextPage } from "next";
import { Team, TeamStandings } from "../types";
import styles from "../styles/Standings.module.scss";
import Image from "next/image";
import Link from "next/link";
import StandingsFilters from "../components/standingsFilters/StandingsFilters";

const Standings: NextPage<{ table: TeamStandings[] }> = ({ table }) => {
  return (
    <section className={styles.standingsPage}>
      <div>
        <StandingsFilters />
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    "https://api.football-data.org/v4/competitions/SA/standings/?season=2021",
    {
      method: "GET",
      headers: {
        "X-Auth-Token": "4e9e470375b640a38e6c3081069133c2",
      },
    }
  );
  const { standings } = await res.json();
  const { table } = standings[0];

  return {
    props: {
      table,
    },
  };
};

export default Standings;
