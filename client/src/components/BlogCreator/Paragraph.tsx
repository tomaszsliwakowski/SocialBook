import styles from "./blogCreator.module.css";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";

export default function Paragraph() {
  return (
    <>
      <PragraphTextAndImage />
      <PragraphText />
      <PragraphImage />
    </>
  );
}

const PragraphTextAndImage = () => {
  return (
    <li className={styles.creator__editor__paragraph}>
      <div className={styles.creator__editor__paragraph__content}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
          nemo necessitatibus maxime a labore impedit deleniti reiciendis enim
          modi sequi. Pariatur, aspernatur alias quas expedita recusandae qui
          debitis harum dolor. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. deleniti reiciendis enim modi sequi. Pariatur,
          aspernatur alias quas expedita recusandae qui debitis harum dolor.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. deleniti
          reiciendis enim modi sequi. Pariatur, aspernatur alias quas expedita
          recusandae qui debitis harum dolor. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. deleniti reiciendis enim modi sequi.
          Pariatur, aspernatur alias quas expedita recusandae qui debitis harum
          dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          deleniti reiciendis enim modi sequi. Pariatur, aspernatur alias quas
          expedita recusandae qui debitis harum dolor. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. deleniti reiciendis enim modi
          sequi. Pariatur, aspernatur alias quas expedita recusandae qui debitis
          harum dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <img src="../travel.jpg" alt="" />
      </div>
      <div className={styles.creator__editor__paragraph__action}>
        <div>
          <button>Show</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div>
          <IoIosArrowDropupCircle />
          <IoIosArrowDropdownCircle />
        </div>
      </div>
    </li>
  );
};
const PragraphText = () => {
  return (
    <li className={styles.creator__editor__paragraph}>
      <div className={styles.creator__editor__paragraph__content}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
          nemo necessitatibus maxime a labore impedit deleniti reiciendis enim
          modi sequi. Pariatur, aspernatur alias quas expedita recusandae qui
          debitis harum dolor. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. deleniti reiciendis enim modi sequi. Pariatur,
          aspernatur alias quas expedita recusandae qui debitis harum dolor.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. deleniti
          reiciendis enim modi sequi. Pariatur, aspernatur alias quas expedita
          recusandae qui debitis harum dolor. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. deleniti reiciendis enim modi sequi.
          Pariatur, aspernatur alias quas expedita recusandae qui debitis harum
          dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          deleniti reiciendis enim modi sequi. Pariatur, aspernatur alias quas
          expedita recusandae qui debitis harum dolor. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. deleniti reiciendis enim modi
          sequi. Pariatur, aspernatur alias quas expedita recusandae qui debitis
          harum dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className={styles.creator__editor__paragraph__action}>
        <div>
          <button>Show</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div>
          <IoIosArrowDropupCircle />
          <IoIosArrowDropdownCircle />
        </div>
      </div>
    </li>
  );
};
const PragraphImage = () => {
  return (
    <li className={styles.creator__editor__paragraph}>
      <div className={styles.creator__editor__paragraph__content}>
        <img src="../travel.jpg" alt="" />
        <img src="../travel.jpg" alt="" />
        <img src="../travel.jpg" alt="" />
        <img src="../travel.jpg" alt="" />
      </div>
      <div className={styles.creator__editor__paragraph__action}>
        <div>
          <button>Show</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div>
          <IoIosArrowDropupCircle />
          <IoIosArrowDropdownCircle />
        </div>
      </div>
    </li>
  );
};
