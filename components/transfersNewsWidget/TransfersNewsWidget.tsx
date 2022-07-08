import styles from "../transfersNewsWidget/TransfersNewsWidget.module.scss";
import { Transfers } from "../../types";

const TransfersNewsWidget = ({ transfers }: { transfers: Transfers[] }) => {
  return (
    <section className={styles.widgetContainer}>
      <span className={styles.header}>Transfer News</span>
      <div className={styles.linksContainer}>
        {transfers.map((transfer: Transfers, i) => (
          <div className={styles.singleNews} key={i}>
            <a href={transfer.url} target="_blank" rel="noreferrer">
              <span>{transfer.title}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TransfersNewsWidget;
