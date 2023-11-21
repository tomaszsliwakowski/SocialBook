import styles from "./posts.module.css";
import Post from "./Post";

export interface POST_TYPE {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  data: string;
  content: {
    text: string;
    image: string;
  };
  like: string;
  comments: string;
}

const postsData: POST_TYPE[] = [
  {
    id: "awdawdawd",
    user: {
      id: "awdd2dwedaw",
      name: "test",
      email: "test@gmail.com",
    },
    data: "21.11.2023",
    content: {
      text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, odit laboriosam blanditiis qui reprehenderit dolore aliquid molestiae, impedit placeat nulla suscipit necessitatibus mollitia. Molestias et nemo beatae ut, veniam dolor!",
      image:
        "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    like: "892",
    comments: "102",
  },
  {
    id: "awdawdawd",
    user: {
      id: "awdd2dwedaw",
      name: "test",
      email: "test@gmail.com",
    },
    data: "21.11.2023",
    content: {
      text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, odit laboriosam blanditiis qui reprehenderit dolore aliquid molestiae, impedit placeat nulla suscipit necessitatibus mollitia. Molestias et nemo beatae ut, veniam dolor!",
      image:
        "https://x-kom.pl/img/media/inspiration/large-20231117134508-black-week-4-2023-1920x600.jpg",
    },
    like: "892",
    comments: "102",
  },
];

export default function Posts() {
  return (
    <div className={styles.posts__content}>
      <ul className={styles.posts__list}>
        {postsData.map((item, id) => (
          <Post key={id} postData={item} />
        ))}
      </ul>
    </div>
  );
}
