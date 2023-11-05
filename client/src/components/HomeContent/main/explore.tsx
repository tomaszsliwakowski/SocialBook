import styles from "./main.module.css";
import { Link } from "react-router-dom";

export default function Explore() {
  return (
    <div className={styles.main__explore}>
      <h2>Explore Popular Categories</h2>
      <ul>
        <Link to={"/"} className={styles.main__category}>
          <span>Food</span>
          <img src="./food.jpg" alt="food" />
        </Link>
        <Link to={"/"} className={styles.main__category}>
          <span>Travel</span>
          <img src="./travel.jpg" alt="food" />
        </Link>
        <Link to={"/"} className={styles.main__category}>
          <span>LifeStyle</span>
          <img src="./lifestyle.jpg" alt="food" />
        </Link>
        <Link to={"/"} className={styles.main__category}>
          <span>Fashion</span>
          <img src="./fashion.jpg" alt="food" />
        </Link>
        <Link to={"/"} className={styles.main__category}>
          <span>Buisness</span>
          <img src="./buisness.jpg" alt="food" />
        </Link>
        <Link to={"/"} className={styles.main__category}>
          <span>Sports</span>
          <img src="./sports.jpg" alt="food" />
        </Link>
        <Link to={"/"} className={styles.main__category}>
          <span>Cars</span>
          <img src="./cars.jpg" alt="food" />
        </Link>
        <Link to={"/"} className={styles.main__category}>
          <span>Fitness</span>
          <img src="./fitness.jpg" alt="food" />
        </Link>
        <Link to={"/"} className={styles.main__category}>
          <span>Animals</span>
          <img src="./animals.jpg" alt="food" />
        </Link>
      </ul>
    </div>
  );
}
