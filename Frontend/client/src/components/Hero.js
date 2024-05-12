import React from 'react'
import HeroImage from '../assets/images/hero.jpg'

const Hero = () => {
    return (
        <div className="hero-image">
            <img src={HeroImage} alt="hero" />
        </div>
    )
}

export default Hero