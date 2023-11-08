import styles from "./main.module.css";
import { Link } from "react-router-dom";

type EXPLORE_TYPE = {
  address: string;
  img: string;
  name: string;
};

const exploreData: EXPLORE_TYPE[] = [
  { address: "/", img: "./food.jpg", name: "Food" },
  { address: "/", img: "./travel.jpg", name: "Travel" },
  { address: "/", img: "./lifestyle.jpg", name: "LifeStyle" },
  { address: "/", img: "./fashion.jpg", name: "Fashion" },
  { address: "/", img: "./buisness.jpg", name: "Buisness" },
  { address: "/", img: "./sports.jpg", name: "Sports" },
  { address: "/", img: "./cars.jpg", name: "Cars" },
  { address: "/", img: "./fitness.jpg", name: "Fitness" },
  { address: "/", img: "./animals.jpg", name: "Animals" },
];

export default function Explore() {
  return (
    <div className={styles.main__explore}>
      <h2>Explore Popular Categories</h2>
      <ul>
        {exploreData.map((item: EXPLORE_TYPE, id: number) => (
          <Link key={id} to={item.address} className={styles.main__category}>
            <span>{item.name}</span>
            <img src={item.img} alt={item.name} />
          </Link>
        ))}
      </ul>
    </div>
  );
}
