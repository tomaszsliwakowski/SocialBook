import React, { useEffect, useState } from "react";
import styles from "../../App.module.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { storage } from "../../firebase/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { InputsForm } from "../types/type";
import { File } from "../types/type";
import { propsType } from "../types/type";
import { UserType } from "../types/type";

const AddPostForm = (props: propsType) => {
  const UsersCollectionRef = collection(db, "Users");
  const PostCollectionRef = collection(db, "Posts");
  const [FormInput, setFormInput] = useState<InputsForm>({
    title: "",
    description: "",
  });
  const [user, setuser] = useState<UserType>({
    email: "",
    id: "",
    password: "",
    userID: "",
    username: "",
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
      const uid: string = uuidv4();
      const imageref = ref(storage, `image/${img?.name + "_" + uid}`);
      await addDoc(PostCollectionRef, {
        postID: uid,
        title: FormInput.title,
        desc: FormInput.description,
        img: `${img.name ? img.name + "_" + uid : "none"}`,
        date: date.toLocaleString(),
        datetime: DateTime,
        like: [],
        com: [],
        user: `${user.username}`,
      });

      if (img.name) {
        await uploadBytes(imageref, img);
      }
      props.postrender(uid);
    }
  };

  const getUser = async (Userid: string) => {
    const UsersData = await getDocs(UsersCollectionRef);
    const Users: any = UsersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const UserObj = Users.filter((item: UserType) => item.userID === Userid);
    setuser(UserObj[0]);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        getUser(currentUser.uid);
      }
    });
  }, []);

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
          <button onClick={() => props.closepanel(false)}>Cancel</button>
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
