import { PopularTags, TimeSpanList, sortOptionList } from "../../assets/assets";
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
        <SelectBar
          defaultValue={"All"}
          id="tagsModal"
          list={PopularTags}
          headName={"Popular tag"}
        />
        <SelectBar
          defaultValue={"Latest"}
          id="sortModal"
          list={sortOptionList}
          headName={"Sorting"}
        />
        <SelectBar
          id="timeModal"
          defaultValue={"All"}
          list={TimeSpanList}
          headName={"Time span"}
        />
      </div>
      <div className={styles.blogs__content}>blogs</div>
    </div>
  );
}
