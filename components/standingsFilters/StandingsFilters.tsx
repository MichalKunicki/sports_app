import Link from "next/link";
import styles from "../standingsFilters/StandingsFilters.module.scss";

export default function StandingsFilters() {
  return (
    <section className={styles.filtersSection}>
      <Link href="/standings/PL">
        <button>Premier League</button>
      </Link>
      <Link href="/standings/PD">
        <button>La Liga</button>
      </Link>
      <Link href="/standings/FL1">
        <button>Ligue 1</button>
      </Link>
      <Link href="/standings/SA">
        <button>Serie A</button>
      </Link>
      <Link href="/standings/BL1">
        <button>Bundesliga</button>
      </Link>
    </section>
  );
}
