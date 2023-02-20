import React ,{useState,useEffect}from 'react';
import { db } from "./firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { storage } from "./firebase/firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/body/homeBody';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import SinglePost from './components/post/singlePost.tsx';
import LoginPage from './components/user/login';


export type PostType = {
  id: string;
  postID: string;
  title: string;
  desc: string;
  img: string;
  date: string;
  datetime: number;
};

function App() {
  const [imageList, setimageList] = useState<Array<string>>([]);
  const usersCollectionRef = collection(db, "Posts");
  const imageListRef = ref(storage, "image/");
  const [Posts, setPosts] = useState<Array<PostType>>([]);


  const getPosts = async () => {
    const data = await getDocs(usersCollectionRef);
    const PostData: any = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPosts(PostData);
  };
  const getImg = async () => {
    await listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setimageList((prev) => [...prev, url]);
        });
      });
    });
  };



  useEffect(() => {
    getImg();
    getPosts();
  }, []);



  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home Posts={Posts} imageList={imageList} />}/>
      <Route path='/post/:postID' element={<SinglePost Posts={Posts} imageList={imageList}/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
