import { ReactElement } from "react";

type PROPS = {
  nav: string | null;
  search: string | null;
  Icon: ReactElement;
  paramsMenuHandler: Function;
  name: string;
  paramsValue: string;
};

export default function MenuElement({
  nav,
  search,
  Icon,
  paramsMenuHandler,
  name,
  paramsValue,
}: PROPS) {
  return (
    <li
      style={
        nav === paramsValue && search === null
          ? { fontWeight: "500", color: "#3a86ff" }
          : {}
      }
      onClick={() => paramsMenuHandler("search", "nav", paramsValue)}
    >
      {Icon}
      <span>{name}</span>
    </li>
  );
}
