import styles from "./posts.module.css";
import { FiHome } from "react-icons/fi";
import { MdPeopleOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PROFILE_ROUTE } from "../../routes";
import MenuElement from "./MenuElement";
import MenuSearchElement from "./MenuSearchElement";

type PROPS = {
  paramsMenuHandler: Function;
  navParams: {
    nav: string | null;
    search: string | null;
  };
  handleAddPostModal: Function;
};

export default function Menu({
  handleAddPostModal,
  paramsMenuHandler,
  navParams,
}: PROPS) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchPosts = () => {
    if (searchValue === "") return;
    paramsMenuHandler("nav", "search", searchValue.toLocaleLowerCase());
    setSearchActive(false);
  };

  const handleSearchActive = (value: boolean) => {
    setSearchActive(value);
  };

  const handleSetSearchValue = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.posts__menu}>
      <div className={styles.posts__add}>
        <button onClick={() => handleAddPostModal(true)}>Add Post</button>
      </div>
      <ul>
        <MenuElement
          nav={navParams.nav}
          search={navParams.search}
          Icon={<FiHome />}
          paramsMenuHandler={paramsMenuHandler}
          paramsValue="all"
          name="For You"
        />
        <MenuElement
          nav={navParams.nav}
          search={navParams.search}
          Icon={<MdPeopleOutline />}
          paramsMenuHandler={paramsMenuHandler}
          paramsValue="watched"
          name="Watched"
        />
        <MenuSearchElement
          nav={navParams.nav}
          search={navParams.search}
          searchActive={searchActive}
          searchValue={searchValue}
          handleSearchActive={handleSearchActive}
          handleSearchPosts={handleSearchPosts}
          handleSetSearchValue={handleSetSearchValue}
        />
        <MenuElement
          nav={navParams.nav}
          search={navParams.search}
          Icon={<FaRegHeart />}
          paramsMenuHandler={paramsMenuHandler}
          paramsValue="liked"
          name="Liked"
        />
        <NavLink to={PROFILE_ROUTE}>
          <BiUser />
          <span>Profile</span>
        </NavLink>
      </ul>
    </div>
  );
}
