import styles from "../navbar/Navbar.module.scss";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <h1 className={styles.logo}>SPORTIFY.COM</h1>
      </Link>
      <div className={styles.links}>
        <Link href="/standings">
          <a>Fixtures</a>
        </Link>
        <Link href="/standings">
          <a>Odds</a>
        </Link>
        <Link href="/standings">
          <a>Standings</a>
        </Link>
        <Link href="/standings">
          <a>News</a>
        </Link>
      </div>
    </nav>
  );
}
