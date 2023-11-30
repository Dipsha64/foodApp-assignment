// import Navbar from "./components/Navbar";
import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../src/components/Users/Signup";
import Login from "../src/components/Users/Login";
import Home from "../src/pages/Home";
import ProductList from "../src/components/Products/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/product/title?" element={<ProductList></ProductList>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;