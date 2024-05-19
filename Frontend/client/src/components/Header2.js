import React from 'react';
import Logo from './Logo';
import SearchIcon from '../assets/images/pics/search.png';
import CartIcon from '../assets/images/pics/cart.png';
import logoicon from '../assets/images/pics/logo-udemy.svg';
import WorldIcon from '../assets/images/pics/world.png';
import './main.css';

const Header = () => {
  return (
    <div class="headersection">
      <div class="logo">
        <Logo />
      </div>
      <div class="headsection2">
        <nav class="nav">
          <div class="sectpre">
            <div class="categorydrop">
              <a href="#"><li>Categories</li></a>
              <div class="dropdownnav">
                <ul>
                  <div class="dropdownnavchildsection">
                    <li>Development</li>
                    <div class="dropdownnavchild">
                      <ul>
                        <li>Business</li>
                        <li>Finance and Accounting</li>
                        <li>IT and Software</li>
                        <li>Personal Developent</li>
                        <li>Design</li>
                        <li>Marketing</li>
                        <li>Lifestyle</li>
                        <li>Photograpy and Video</li>
                        <li>Health and Fitness</li>
                        <li>Music</li>
                      </ul>
                    </div>
                  </div>
                  <li>Business</li>
                  <li>Finance and Accounting</li>
                  <li>IT and Software</li>
                  <li>Personal Developent</li>
                  <li>Design</li>
                  <li>Marketing</li>
                  <li>Lifestyle</li>
                  <li>Photograpy and Video</li>
                  <li>Health and Fitness</li>
                  <li>Music</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="search">
            <ul>
              <li>   
                <img src={SearchIcon} />
                <input type="text" placeholder="Seach for anything" />
              </li>
            </ul>
          </div>

          <div class="sect1">
            <ul>
              <div class="udemybizdrop">
                <a href="#"><li>Udemy Business</li></a>
                <div class="udemybizdropchild">
                  <h2>
                    Get your team access to over<br />
                    15,000 top Udemy courses,<br />
                    anytime, anywhere.
                  </h2>
                  <button>Try Udemy Business</button>
                </div>
              </div>

              <a href="#"><li>Teach on Udemy</li></a>
            </ul>
          </div>

          <div class="enteries">
            <ul>
              <a href="#" ><li><img src={CartIcon} /></li></a>
              <li><button class="login">Log In</button></li>
              <div class="button2"><li><button class="signup">Sign Up</button></li></div>
              <div class="iconpremeium"><a href="#" ><img src={WorldIcon} /></a></div>
            </ul>
          </div>

        </nav>
      </div>
    </div>
  );
};

export default Header;