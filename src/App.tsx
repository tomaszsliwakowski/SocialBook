import React from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/body/homeBody';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import SinglePost from './components/post/singlePost.tsx';
import LoginPage from './components/user/login';
import RegisterPage from './components/user/register';
import NotFoundPage from './components/body/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/post/:postID' element={<SinglePost/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
