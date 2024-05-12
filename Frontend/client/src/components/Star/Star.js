import React from 'react'
import PropTypes from 'prop-types'

const Star = ({ value, color, fontSize }) => {
    return (
        <div className="rating">
            <span>
                <i
                    style={{ color, fontSize }}
                    className = {
                        value >= 1 
                            ? 'bx bxs-star'
                            : value >= 0.5
                            ? 'bx bxs-star-half'
                            : 'bx bx-star'
                    }
                />

                <i
                    style={{ color, fontSize }}
                    className = {
                        value >= 2 
                            ? 'bx bxs-star'
                            : value >= 1.5
                            ? 'bx bxs-star-half'
                            : 'bx bx-star'
                    }
                />

                <i
                    style={{ color, fontSize }}
                    className = {
                        value >= 3 
                            ? 'bx bxs-star'
                            : value >= 2.5
                            ? 'bx bxs-star-half'
                            : 'bx bx-star'
                    }
                />

                <i
                    style={{ color, fontSize }}
                    className = {
                        value >= 4 
                            ? 'bx bxs-star'
                            : value >= 3.5
                            ? 'bx bxs-star-half'
                            : 'bx bx-star'
                    }
                />

                <i
                    style={{ color, fontSize }}
                    className = {
                        value >= 5 
                            ? 'bx bxs-star'
                            : value >= 4.5
                            ? 'bx bxs-star-half'
                            : 'bx bx-star'
                    }
                />
            </span>
        </div>
    )
}

Star.defaultProps = {
    color: '#eb8a2f',
    fontSize: '14px'
}

Star.propTypes = {
    value: PropTypes.number,
    color: PropTypes.string
}

export default Star