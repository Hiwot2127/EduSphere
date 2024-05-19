import React from 'react';
import { Route, Routes } from "react-router-dom";
import { CartPage } from "../Cart/Cart";
import { Header } from "../Header/Header";
import { Landigpage } from "../LandingPage/Landin";
import Login from "../Login_Signup/Login";
import Signup from "../Login_Signup/Signup";
import Payment from "../Payment/Payment";
import Footer from "../Footer/Footer";
import { Product } from "../Product/Product";

export const AllRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landigpage />}></Route>
        <Route path="/courses/:id" element={<Product />}></Route>

        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/join/signup-popup" element={<Signup />}></Route>
        <Route path="/join/login-popup" element={<Login />}></Route>
      </Routes>
      <Footer />
      {/* <Bottombar /> */}
    </>
  );
};
