import Link from "next/link";
import { useState } from "react";
import styles from "../standingsFilters/StandingsFilters.module.scss";
import { useRouter } from "next/router";

const StandingsFilters: React.FC = () => {
  const router = useRouter();

  const year = new Date().getFullYear();
  const [season, setSeason] = useState<number>(year);

  return (
    <section className={styles.filtersSection}>
      <select
        className={styles.select}
        onChange={(e) => {
          setSeason(Number(e.target.value));
          router.push(
            `/standings/${Number(e.target.value)}/${router.query.leagueID}`
          );
        }}
      >
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
      <Link href={`/standings/${season}/PL`}>
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
      </Link>
    </section>
  );
};

export default StandingsFilters;
