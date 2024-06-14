import { Link } from "react-router-dom";
import "./header2.css";
import React from 'react';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cart/action";

export const Header = () => {
  const token = localStorage.getItem("token") || null;
  const { cart } = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`https://udemy-vr4p.onrender.com/cart/${token?.user?._id}`)
        .then(({ data }) => {
          dispatch(addToCart(data.length));
        });
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header-container">
      <div className="topnavbar">

        <div className={`nav-items ${isMenuOpen ? "open" : ""}`}>
        <Link className="udemylink" to={"/"}>
          <img
            className="udemylogo"
            src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
            alt="Udemy"
          />
        </Link>
          <nav className="main-nav">
            <button>
              <span className="nav-span">Categories</span>
            </button>
          </nav>
          {token && (
                      <>

          <Link className="linkstyle" to="/files">
          Files
        </Link>
        <Link className="linkstyle" to="/upload">
          Upload
        </Link>
        <Link className="linkstyle" to="/home">
          Home
        </Link>
        <Link className="linkstyle" to="/payment">
          Payment
        </Link>
             </>
          )}
     

          <div className="searchbar">
            <button>
              <SearchIcon />
            </button>
            <input type="text" placeholder="Search for anything" />
          </div>
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>
              More
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link className="linkstyle" to={"#"}>
                  Udemy Business
                </Link>
                <Link className="linkstyle" to={"#"}>
                  Teach on Udemy
                </Link>
                {token && (
                  <>
                    <Link className="linkstyle" to={"#"}>
                      My learning
                    </Link>
                    <Link to={"/wishlist"}>
                      <button className="cart">
                        <FavoriteBorderOutlinedIcon />
                      </button>
                    </Link>
                    <Link to={"#"}>
                      <button className="cart">
                        <Badge color="secondary" badgeContent={0}>
                          <NotificationsNoneOutlinedIcon />
                        </Badge>
                      </button>
                    </Link>
                    <Link to={"#"}>
                      <button className="lang">
                        <LanguageIcon />
                      </button>
                    </Link>
                    <Link to={"/cart"}>
            <button className="cart">
              <Badge color="secondary" badgeContent={cart}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </button>
          </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {token ? (
            <>            <Link to={"/join/logout-popup"}>
            <button className="login">Log out</button>
          </Link>
                      <div>
                      <Link to={"#"}>
                        <button className="cart">
                          <Badge
                            color="secondary"
                            overlap="circular"
                            badgeContent=" "
                            variant="dot"
                          >
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>
                              {user.user != null
                                ? user.user?.name[0].toUpperCase()
                                : null}
                            </Avatar>
                          </Badge>
                        </button>
                      </Link>
                    </div>
            </>
          ) : (
            <>
              <Link to={"/join/login-popup"}>
                <button className="login">Log in</button>
              </Link>
              <Link to={"/join/signup-popup"}>
                <button className="signup">Sign up</button>
              </Link>
            </>
          )}
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};
