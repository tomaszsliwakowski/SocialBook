import styles from "./blogCreator.module.css";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";

export default function Main() {
  return (
    <div className={styles.creator__main}>
      <h2>Blog Creator</h2>
      <div className={styles.creator__editor}>
        <div className={styles.creator__editor__content}>
          <div className={styles.creator__editor__title}>
            <h3>Title</h3>
            <input type="text" placeholder="Blog title" />
          </div>
          <div className={styles.creator__editor__paragraphList}>
            <h4>Blog Content</h4>
            <button className={styles.creator__editor__AddBtn}>
              Add Content
            </button>
            <ul>
              <li className={styles.creator__editor__paragraph}>
                <div className={styles.creator__editor__paragraph__content}>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Excepturi nemo necessitatibus maxime a labore impedit
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
              <li className={styles.creator__editor__paragraph}>
                <div className={styles.creator__editor__paragraph__content}>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Excepturi nemo necessitatibus maxime a labore impedit
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    deleniti reiciendis enim modi sequi. Pariatur, aspernatur
                    alias quas expedita recusandae qui debitis harum dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
            </ul>
          </div>
          <div className={styles.creator__editor__tags}>
            <h4>Tags</h4>
          </div>
        </div>
        <div className={styles.creator__editor__attachment}>
          <div className={styles.creator__editor__smallBaner}>small baner</div>
          <div className={styles.creator__editor__mainBaner}>main baner</div>
        </div>
      </div>
      <div className={styles.creator__editor__action}>
        <button>Clear Creator</button>
        <button>Share Blog</button>
      </div>
    </div>
  );
}
