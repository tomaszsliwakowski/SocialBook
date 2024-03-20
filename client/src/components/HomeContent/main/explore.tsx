import { UserType } from "../../../context/Auth";
import {
  AnimalsTagRoute,
  BuisnessTagRoute,
  CarsTagRoute,
  FashionTagRoute,
  FitnessTagRoute,
  FoodTagRoute,
  LOGIN_ROUTE,
  LifeStyleTagRoute,
  SportsTagRoute,
  TravelTagRoute,
} from "../../../routes";
import styles from "./main.module.css";
import { Link } from "react-router-dom";

type PROPS = {
  User: UserType;
};

type EXPLORE_TYPE = {
  address: string;
  img: string;
  name: string;
};

const exploreData: EXPLORE_TYPE[] = [
  {
    address: FoodTagRoute,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943197/food_rp5opr.jpg",
    name: "Food",
  },
  {
    address: TravelTagRoute,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943252/travel_mp00eb.jpg",
    name: "Travel",
  },
  {
    address: LifeStyleTagRoute,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943201/lifestyle_eoewly.jpg",
    name: "LifeStyle",
  },
  {
    address: FashionTagRoute,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943189/fashion_cnptsr.jpg",
    name: "Fashion",
  },
  {
    address: BuisnessTagRoute,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943180/buisness_funtvc.jpg",
    name: "Buisness",
  },
  {
    address: SportsTagRoute,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943243/sports_v7ffmx.jpg",
    name: "Sports",
  },
  {
    address: CarsTagRoute,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943209/slide1_vqxehd.jpg",
    name: "Cars",
  },
  {
    address: FitnessTagRoute,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943193/fitness_hihi7r.jpg",
    name: "Fitness",
  },
  {
    address: AnimalsTagRoute,
    img: "https://res.cloudinary.com/dhte02cxo/image/upload/v1710943178/animals_j8nvtz.jpg",
    name: "Animals",
  },
];

export default function Explore({ User }: PROPS) {
  return (
    <div className={styles.main__explore}>
      <h2>Explore Popular Categories</h2>
      <ul>
        {exploreData.map((item: EXPLORE_TYPE, id: number) => (
          <Link
            key={id}
            to={User.email !== "" ? item.address : LOGIN_ROUTE}
            className={styles.main__category}
          >
            <span>{item.name}</span>
            <img src={item.img} alt={item.name} />
          </Link>
        ))}
      </ul>
    </div>
  );
}
