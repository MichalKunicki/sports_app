import styles from "../header/Header.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        src="/bg.jpg"
        alt="soccer-pitch"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        blurDataURL="/bg.jpg"
        placeholder="blur"
      />
      <h1 className={styles.headertext}>
        The last soccer hub you will ever need.
      </h1>
      <div className={styles.subheadingContainer}>
        <h2 className={styles.subheadertext}>
          EXPLORE LIVE STREAMS &amp; HIGHLIGHTS
        </h2>
        <Image
          id="svgArrow"
          src="/arrow.svg"
          alt="arrow"
          height="30"
          width="30"
        />
      </div>
    </header>
  );
}
