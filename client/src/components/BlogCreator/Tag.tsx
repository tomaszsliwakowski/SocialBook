import { IoIosClose } from "react-icons/io";

type PROPS = {
  name: string;
  deleteSelectedTag: Function;
};

export default function Tag({ name, deleteSelectedTag }: PROPS) {
  return (
    <li>
      <span>{name}</span>
      <IoIosClose onClick={() => deleteSelectedTag(name)} />
    </li>
  );
}
