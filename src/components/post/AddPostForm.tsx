import React, { useState } from "react";
import styles from "../../App.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { storage } from "../../firebase/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

type Inputs = {
  title: string;
  description: string;
};

type File = {
  name: string;
  size: number;
  type: string;
};

const AddPostForm = () => {
  const usersCollectionRef = collection(db, "Posts");
  const [FormInput, setFormInput] = useState<Inputs>({
    title: "",
    description: "",
  });
  const [img, setimg] = useState<any>({});
  const HandleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleImageInput = (e: { target: HTMLInputElement }) => {
    const files: FileList | null = e.target.files;
    if (files) {
      const file: File = files[0];
      setimg(file);
    }
  };

  const AddPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (FormInput.title !== "") {
      const date: Date = new Date();
      const DateTime: number = date.getTime();
      const uid:string = uuidv4();
      const imageref = ref(storage, `image/${img?.name + "_" + uid}`);
      await addDoc(usersCollectionRef, {
        postID: uid,
        title: FormInput.title,
        desc: FormInput.description,
        img: `${img.name ? img.name + "_" + uid : "none"}`,
        date: date.toLocaleString(),
        datetime: DateTime,
        like: 0,
      });
      if (img.name) {
        await uploadBytes(imageref, img);
      }
    }
  };

  return (
    <>
      <form className={styles.PostForm} onSubmit={AddPost}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={HandleInput}
          value={FormInput.title}
          className={styles.PostFormTitleInput}
        />
        <textarea
          placeholder="Description"
          name="description"
          onChange={HandleInput}
          value={FormInput.description}
        ></textarea>

        <input
          type="file"
          id="img"
          accept="image/png, image/jpeg"
          multiple
          name="image"
          onChange={HandleImageInput}
        />

        <span className={styles.PostFormButtonPanel}>
          <button>Cancel</button>
          <button
            type="reset"
            onClick={() =>
              setFormInput({
                title: "",
                description: "",
              })
            }
          >
            Clear
          </button>
          <button type="submit">ADD</button>
        </span>
      </form>
    </>
  );
};

export default AddPostForm;
