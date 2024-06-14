import React from 'react'
import HeroImage from '../assets/images/hero.jpg'
import './Hero.css'

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-image">
                <img src={HeroImage} alt="hero" />
            </div>
            <div className="hero-content">
                <h1>Welcome to Your Learning Journey</h1>
                <p>
                    Explore thousands of courses designed to help you succeed.
                </p>
            </div>
        </div>
    );
};

export default Hero