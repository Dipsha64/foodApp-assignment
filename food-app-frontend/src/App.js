// import Navbar from "./components/Navbar";
import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../src/components/Users/Signup";
import Login from "../src/components/Users/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;