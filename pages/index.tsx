import type { GetServerSideProps, NextPage } from "next";
import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { FullVideoList } from "../types";
import Header from "../components/header/Header";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const parent = e.currentTarget.parentElement;
  const grandparent = parent?.parentElement;
  const grandGrandParent = grandparent?.parentElement;
  const target = grandGrandParent?.parentElement;
  if (target != undefined) {
    target.style.display = "none";
  }
};
const paginate = (
  array: FullVideoList[],
  page_size: number,
  page_number: number
) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

const getTodaysDate = () => {
  const today = new Date().toLocaleDateString();
  const [dd, mm, yyyy] = today.split("/");
  return `${yyyy}-${mm}-${dd}`;
};
const todaysDate = getTodaysDate();

const Home: NextPage<{
  fullVideoList: FullVideoList[];
  paginatedVideoList: FullVideoList[];
}> = ({ fullVideoList, paginatedVideoList }) => {
  const highlightsRef = useRef<HTMLDivElement | null>(null);

  const [displayedVideos, setDisplayedVideos] = useState(paginatedVideoList);

  const [page, setPage] = useState(1);

  const [isTeamNameFilterOn, setIsTeamNameFilterOn] = useState(false);
  const [isDateFilterOn, setIsDateFilterOn] = useState(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    const value = element.value.toLowerCase();

    // 2 Cases when deleting last character and turning off filter.
    if (value.length === 0 && isDateFilterOn === false) {
      setIsTeamNameFilterOn(false);
      setDisplayedVideos(paginatedVideoList);
      setPage(1);
    } else if (value.length === 0 && isDateFilterOn === true) {
      setIsTeamNameFilterOn(false);
      setDisplayedVideos(
        displayedVideos.filter(
          (video) =>
            video.side1.name.toLowerCase().startsWith(value) ||
            video.side2.name.toLowerCase().startsWith(value)
        )
      );
      setPage(1);
    }
    // Two cases when you start typing / turn on filter.
    else if (isDateFilterOn === true) {
      setIsTeamNameFilterOn(true);
      setDisplayedVideos(
        displayedVideos.filter(
          (video) =>
            video.side1.name.toLowerCase().startsWith(value) ||
            video.side2.name.toLowerCase().startsWith(value)
        )
      );
    } else {
      setIsTeamNameFilterOn(true);
      setDisplayedVideos(
        fullVideoList.filter(
          (video) =>
            video.side1.name.toLowerCase().startsWith(value) ||
            video.side2.name.toLowerCase().startsWith(value)
        )
      );
    }
  };

  const handlePagination = () => {
    setPage((page) => page + 1);
    setDisplayedVideos(paginate(fullVideoList, 12, page));
    highlightsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCalendarChange = (e: React.FormEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    const value = element.value.toLowerCase();
    // Two cases when you remove date.
    if (value.length === 0 && isTeamNameFilterOn === false) {
      setIsDateFilterOn(false);
      setDisplayedVideos(paginatedVideoList);
      setPage(1);
    } else if (value.length === 0 && isTeamNameFilterOn === true) {
      setIsDateFilterOn(false);
      setDisplayedVideos(
        displayedVideos.filter((video) => video.date.slice(0, 10) === value)
      );
      setPage(1);
    }
    // Two cases when you add date.
    else if (isTeamNameFilterOn === true) {
      setIsDateFilterOn(true);
      setDisplayedVideos(
        displayedVideos.filter((video) => video.date.slice(0, 10) === value)
      );
    } else {
      setIsDateFilterOn(true);
      setDisplayedVideos(
        fullVideoList.filter((video) => video.date.slice(0, 10) === value)
      );
    }
  };

  return (
    <>
      <Head>
        <title>foothub</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header></Header>
        <section className={styles.filtersSection} ref={highlightsRef}>
          <input
            type="text"
            className={styles.inputBox}
            placeholder="Enter a team..."
            onChange={handleChange}
          ></input>
          <input
            type="date"
            className={styles.dateBox}
            max={todaysDate}
            onChange={handleCalendarChange}
          ></input>
        </section>
        {displayedVideos.map((video: FullVideoList) => (
          <div id="highlights" className={styles.matchCard} key={video.title}>
            <div className={styles.matchName}>
              <p className={styles.date}>{video.date.slice(0, 10)}</p>
              <div className={styles.title}>
                <a href={video.side1.url} target="_blank" rel="noreferrer">
                  <p className={styles.side}>{`${
                    video.title.split("-")[0]
                  }`}</p>
                </a>
                <p>&nbsp;:&nbsp;</p>
                <a href={video.side2.url} target="_blank" rel="noreferrer">
                  <p className={styles.side}>{video.title.split("-")[1]}</p>
                </a>
              </div>
            </div>
            <a href={video.url} target="_blank" rel="noreferrer">
              <div className={styles.image}>
                <Image
                  blurDataURL={video.thumbnail}
                  placeholder="blur"
                  alt="thumbnail-photo"
                  src={video.thumbnail}
                  layout="responsive"
                  height="55%"
                  width="100%"
                  onError={(e) => handleImageError(e)}
                />
              </div>
            </a>
          </div>
        ))}
        {!isTeamNameFilterOn ||
          (isDateFilterOn && (
            <div className={styles.paginationContainer}>
              <button
                className={styles.paginationButton}
                onClick={handlePagination}
              >
                Next page...
              </button>
            </div>
          ))}
        {displayedVideos.length === 0 && <h3>No results found...</h3>}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://free-football-soccer-videos.p.rapidapi.com/",
    {
      headers: {
        "X-RapidAPI-Key": "6e53d9a08cmsh751eda812235656p1e847fjsn1fa6500eb5cd",
        "X-RapidAPI-Host": "free-football-soccer-videos.p.rapidapi.com",
      },
    }
  );
  const fullVideoList = await res.json();
  const paginatedVideoList = paginate(fullVideoList, 12, 1);

  return {
    props: {
      fullVideoList,
      paginatedVideoList,
    },
  };
};

export default Home;
