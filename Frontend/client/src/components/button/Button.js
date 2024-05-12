import React from 'react'
import propTypes from 'prop-types'
import './Button.css'

const Button = (props) => {
    const btnClassName = [props.btnClassName]

    if(props.isPrimary) btnClassName.push("btn btn-primary ")
    if(props.isBtnOutlinePrimary) btnClassName.push("btn btn-outline-primary")

    return (
        <button className={btnClassName.join('')} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

Button.propTypes = {
    onClick: propTypes.func,
    btnClassName: propTypes.string,
    isPrimary: propTypes.bool,
    isBtnOutlinePrimary: propTypes.bool
}

export default Button