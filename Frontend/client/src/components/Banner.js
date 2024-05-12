import React from 'react'
import BannerImage from '../assets/images/banner.jpg'

const Banner = () => {
    return (
        <div className="banner-wrapper">
            <div className="banner-left">
                <h4>Expand your career opportunities with Python</h4>
                <p>Whether you work in machine learning or finance, or are purcuising a career in web development or data science, Python is one of the most important skills you can learn. Python's simple syntax is especially suited for desktop, web and business applications.</p>
            </div>

            <div className="banner-right">
                <img src={BannerImage} alt="banner" />
            </div>
        </div>
    )
}

export default Banner
