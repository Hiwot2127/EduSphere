import React from 'react'
import Partner1 from '../assets/images/partner1.svg'
import Partner2 from '../assets/images/partner2.svg'
import Partner3 from '../assets/images/partner3.svg'
import Partner4 from '../assets/images/partner4.svg'
import Partner5 from '../assets/images/partner5.svg'

const Partner = () => {
    return (
        <div className="partner-container">
            <div className="partner-header">
                <h2>Trusted by companies of all sizes</h2>
            </div>

            <div className="partner-info">
                <div className="logo-item">
                    <img src={Partner1} alt="booking" />
                </div>

                <div className="logo-item">
                    <img src={Partner2} style={{ width: 148, height: 28 }} alt="booking" />
                </div>

                <div className="logo-item">
                    <img src={Partner3} alt="booking" />
                </div>

                <div className="logo-item">
                    <img src={Partner4} alt="booking" />
                </div>

                <div className="logo-item">
                    <img src={Partner5} alt="booking" />
                </div>
            </div>
        </div>
    )
}

export default Partner