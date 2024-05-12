import React from 'react'
import Logo from '../Logo'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <Logo />
            <div className="footer-left">
                <ul>
                    <li><a href="#business">Udemy for Business</a></li>
                    <li><a href="#teach">Teach on Udemy</a></li>
                    <li><a href="#app">Get the App</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#contact">Contact us</a></li>
                </ul>
            </div>

            <div className="footer-center">
                <ul>
                    <li><a href="#career">Careers</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#help">Help and Support</a></li>
                    <li><a href="#affiliate">Affiliate</a></li>
                </ul>
            </div>

            <div className="footer-right">
                <ul>
                    <li><a href="#terms">Terms</a></li>
                    <li><a href="#privacy">Privacy Policy</a></li>
                    <li><a href="#sitemap">Sitemap</a></li>
                    <li><a href="#featured">Featured Courses</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer