// import Navbar from "./components/Navbar";
import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../src/components/Users/Signup";
import Login from "../src/components/Users/Login";
import Home from "../src/pages/Home";
import ProductList from "../src/components/Products/ProductList";
import ProductDetail from "./components/Products/ProductDetail";
import FavouriteProduct from "./components/Products/FavouriteProduct";
import Protected from "../src/app/Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/product/:id" element={<ProductList></ProductList>}></Route>
        <Route path="/product-detail/:id" element={<ProductDetail></ProductDetail>}></Route>
        {/* <Route element={<Protected />}> */}
          <Route path="/wishlist-item" element={<Protected><FavouriteProduct/></Protected>}></Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;