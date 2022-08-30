import "./App.css";
import React from "react";
import {  Routes, Route } from "react-router-dom";
import Signin from "./User/Signin";
import Signup from "./User/Signup";
import Home from "./Core/Home";
import NavBar from "./Core/NavBar";
function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  );
}

export default App;
