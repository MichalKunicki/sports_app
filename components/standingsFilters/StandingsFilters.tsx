import React, { useState } from "react";
import styles from "../standingsFilters/StandingsFilters.module.scss";
import { useRouter } from "next/router";

const StandingsFilters: React.FunctionComponent = () => {
  const router = useRouter();

  const year = new Date().getFullYear();
  const [season, setSeason] = useState<number>(year);

  return (
    <section className={styles.filtersSection}>
      <select
        className={styles.selectBox}
        onChange={(e) => {
          e.preventDefault;
          setSeason(Number(e.target.value));
          router.push(
            `/standings/${Number(e.target.value)}/${router.query.leagueID}`
          );
        }}
      >
        <option disabled selected>
          Season
        </option>
        <option className={styles.option} value={year}>
          {year}/{year + 1}
        </option>

        <option className={styles.option} value={year - 1}>
          {year - 1}/{year}
        </option>

        <option className={styles.option} value={year - 2}>
          {year - 2}/{year - 1}
        </option>
      </select>
      <select
        className={styles.selectBox}
        onChange={(e) => {
          const selectBox = e.target;
          const selectedValue = selectBox.options[selectBox.selectedIndex].id;
          router.push(`/standings/${season}/${selectedValue}`);
        }}
      >
        <option disabled selected>
          League
        </option>
        <option id="PL">Premier League</option>
        <option id="PD">La Liga</option>
        <option id="FL1">Ligue 1</option>
        <option id="SA">Serie A</option>
        <option id="PPL">Primeira Liga</option>
      </select>
      {/* <Link href={`/standings/${season}/PL`}>
        <button>Premier League</button>
      </Link>
      <Link href={`/standings/${season}/PD`}>
        <button>La Liga</button>
      </Link>
      <Link href={`/standings/${season}/FL1`}>
        <button>Ligue 1</button>
      </Link>
      <Link href={`/standings/${season}/SA`}>
        <button>Serie A</button>
      </Link>
      <Link href={`/standings/${season}/BL1`}>
        <button>Bundesliga</button>
      </Link>
      <Link href={`/standings/${season}/PPL`}>
        <button>Primeira Liga</button>
      </Link> */}
    </section>
  );
};

export default StandingsFilters;
