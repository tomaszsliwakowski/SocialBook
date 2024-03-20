import { useEffect, useState } from "react";
import styles from "./slider.module.css";

type SlidesType = {
  slide: number;
  img: string;
};

const slides: SlidesType[] = [
  {
    slide: 0,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943184/cars_aw8v1u.jpg",
  },
  {
    slide: 1,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943213/slide2_igbf0z.jpg",
  },
  {
    slide: 2,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943218/slide3_xln4yx.jpg",
  },
  {
    slide: 3,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943222/slide4_ffh6hv.jpg",
  },
  {
    slide: 4,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943227/slide6_hrlf8k.jpg",
  },
  {
    slide: 5,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943230/slide7_alxpey.jpg",
  },
  {
    slide: 6,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943236/slide8_ap3fh6.jpg",
  },
  {
    slide: 7,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943240/slide9_xi87eq.jpg",
  },
];

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
        {slides.map((item, id) => (
          <li
            key={id}
            className={activeSlide === item.slide ? `${styles.active}` : ""}
          >
            <img src={item.img} alt="slide photo" />
          </li>
        ))}
      </ul>
    </div>
  );
}
