import React from 'react';
import { Route, Routes } from "react-router-dom";
import { CartPage } from "../Cart/Cart";
import { Header } from "../Header/Header";
import { Landigpage } from "../LandingPage/Landin";
import Home from '../../pages/Home';
import Login from "../Login_Signup/Login";
import Signup from "../Login_Signup/Signup";
import Payment from "../Payment/Payment";
import Footer from "../Footer/Footer";
import { Product } from "../Product/Product";
import { Logout } from '../Login_Signup/logout';
import RequireAuth from './requirement';
import StripeProvider from '../../stripe/stripeProvider';
import FileUpload from '../upload/upload';
import FileList from '../upload/list';

function AllRoutes () {
  return (
    <>
      <Header />
      <Routes>
        <Route>
           <Route path="/" element={<Landigpage />}></Route>
           <Route path="/join/signup-popup" element={<Signup />}></Route>
        <Route path="/join/login-popup" element={<Login />}></Route>
        <Route path="/join/logout-popup" element={<Logout />}></Route>
        </Route>
        <Route element={<RequireAuth/>}>
          <Route path="/files" element={<FileList/>}></Route>
          <Route path='/upload' element={<FileUpload/>}></Route>
          <Route path="/courses/:id" element={<Product />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/payment" element={<StripeProvider />}></Route>
        </Route>

      </Routes>
      <Footer />
      {/* <Bottombar /> */}
    </>
  );
};
export default AllRoutes;