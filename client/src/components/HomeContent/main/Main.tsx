import PhotoSlider from "../slider/PhotoSlider";
import styles from "./main.module.css";
import Explore from "./explore";

export default function Main() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.main__content}>
          <p>
            <h1>
              Welcome to <strong className={styles.strong}>S</strong>ocial
              <strong className={styles.strong}>B</strong>ook
            </h1>
            <br />
            <div className={styles.smallText}>
              <span>Share and discover your stories and creative ideas.</span>
              <span>Talk to other people and share your opinions.</span>
            </div>
          </p>
          <Explore />
        </div>
        <div className={styles.main__images}>
          <PhotoSlider />
        </div>
      </div>
      <div>popular blogs</div>
    </>
  );
}
