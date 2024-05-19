import React from 'react'
import Logo2 from '../Logo2'
import WorldImage from './w.jpg'
import './Footer.css'

const Footer = () => {
    return (
        <div class="Fotter">
            <div class="Fotterinside">
                <div>
                    <ul>
                        <a href="https://www.udemy.com"><li>Udemy Business</li></a>


                        <a href="#"><li>Teach on Udemy</li></a>


                        <a href="#"><li>Get the app</li></a>


                        <a href="#"><li>About us</li></a>

                        <a href="#"><li>Contact us</li></a>

                    </ul>
                </div>


                <div>
                    <ul>
                        <a href="#"><li>Carrers</li></a>


                        <a href="#"><li>Blog</li></a>


                        <a href="#"><li>Help and Support</li></a>

                        <a href="#"><li>Affiliate</li></a>

                        <a href="#"><li>Investor</li></a>

                    </ul>
                </div>



                <div>
                    <ul>
                        <a href="#"><li>Terms</li></a>


                        <a href="#"><li>Privacy Policy</li></a>


                        <a href="#"><li>Cookie Settings</li></a>

                        <a href="#"><li>Sitemap</li></a>

                        <a href="#"><li>Accessibility Statement</li></a>

                    </ul>
                </div>


            </div>
            <div class="fotterbutton">
                <img src={WorldImage} alt='world'/>
                <button>English</button>
            </div>

            <h4>© 2024 Udemy, Inc.</h4>
            <div class="fotterlogo">
                <Logo2 />
            </div>
        </div>
    )
}
export default Footer