import React from "react";
import Home from "./components/homepage";
import { Route, Routes } from "react-router-dom";
import About from "./components/about";
import NavigationBar from "./components/navigationBar";
import Posts from "./components/posts";
import Albums from "./components/albums";
import Comments from "./components/comments";
import Photos from "./components/photos";
import Todos from "./components/todos";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Posts />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/albums/:id" element={<Albums />} />
        <Route path="/photos/:id" element={<Photos />} />
        <Route path="/todos/:id" element={<Todos />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
