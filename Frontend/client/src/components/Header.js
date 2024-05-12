import React from 'react'
import Button from './button/Button'
import Logo from './Logo'

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* <div className="container-fluid"> */}
                    <Logo />
                    <div className="header-button">
                        <a href="#"> Categories </a>
                    </div>
                    <div className="header-search">
                        <input type="text" placeholder='Search for anything'/>
                    </div>
                    <div className="header-cart-icon">
                        <i className='bx bx-cart'></i>
                    </div>
                    
                    <div className="header-button">
                        <Button isBtnOutlinePrimary>Log in</Button>
                        <Button isPrimary>Sign up</Button>
                    </div>
            </nav>
        </header>
    )
}

export default Header