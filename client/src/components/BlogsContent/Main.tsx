import SelectBar from "./SelectBar";
import styles from "./blogs.module.css";
import { FiSearch } from "react-icons/fi";

export default function Main() {
  return (
    <div className={styles.blogs}>
      <div className={styles.blogs__filterBar}>
        <div className={styles.blogs__searchBar}>
          <input type="text" placeholder="Search..." />
          <div className={styles.blogs__searchBar__options}>
            <select>
              <option value="title">Title</option>
              <option value="tag">Tag</option>
            </select>
            <div>
              <FiSearch />
            </div>
          </div>
        </div>
        <SelectBar />
      </div>
      <div className={styles.blogs__content}>blogs</div>
    </div>
  );
}
