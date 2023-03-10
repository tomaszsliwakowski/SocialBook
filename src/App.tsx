import React from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./components/body/homeBody";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SinglePost from "./components/post/singlePost.tsx";
import LoginPage from "./components/user/login";
import RegisterPage from "./components/user/register";
import NotFoundPage from "./components/body/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/SocialBook/" element={<Home />} />
        <Route path="/SocialBook/post/:postID" element={<SinglePost />} />
        <Route path="/SocialBook/login/" element={<LoginPage />} />
        <Route path="/SocialBook/register/" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
