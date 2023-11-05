import { useEffect, useState } from "react";
import styles from "./slider.module.css";

export default function PhotoSlider() {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  function Slider() {
    setInterval(() => {
      setActiveSlide((prev) => {
        if (prev < 7) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 5000);
  }

  useEffect(() => {
    Slider();
  }, []);
  return (
    <div className={styles.slider}>
      <ul>
        <li className={activeSlide === 0 ? `${styles.active}` : ""}>
          <img src="./slide1.jpg" alt="slide photo" />
        </li>
        <li className={activeSlide === 1 ? `${styles.active}` : ""}>
          <img src="./slide2.jpg" alt="slide photo" />
        </li>
        <li className={activeSlide === 2 ? `${styles.active}` : ""}>
          <img src="./slide3.jpg" alt="slide photo" />
        </li>
        <li className={activeSlide === 3 ? `${styles.active}` : ""}>
          <img src="./slide4.jpg" alt="slide photo" />
        </li>
        <li className={activeSlide === 4 ? `${styles.active}` : ""}>
          <img src="./slide6.jpg" alt="slide photo" />
        </li>
        <li className={activeSlide === 5 ? `${styles.active}` : ""}>
          <img src="./slide7.jpg" alt="slide photo" />
        </li>
        <li className={activeSlide === 6 ? `${styles.active}` : ""}>
          <img src="./slide8.jpg" alt="slide photo" />
        </li>
        <li className={activeSlide === 7 ? `${styles.active}` : ""}>
          <img src="./slide9.jpg" alt="slide photo" />
        </li>
      </ul>
    </div>
  );
}
