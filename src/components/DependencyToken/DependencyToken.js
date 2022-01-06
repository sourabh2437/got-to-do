import React from 'react'
import PropTypes from 'prop-types'
import './DependencyToken.scss'

const DependencyToken = ({ isEditable, text, onClick }) => {
    return (
        <div className="DependencyToken">
            <div className="DependencyToken__Text">{text}</div>
            {isEditable && <div className="DependencyToken__ClearBtn" onClick={onClick}>&#10005;</div>}
        </div>
    )
}

DependencyToken.propTypes = {
    onClick: PropTypes.func,
    isEditable: PropTypes.bool,
    text: PropTypes.string
}

DependencyToken.defaultProps = {
    onClick: () => { },
    isEditable: false,
    text: ''
}

export default DependencyToken;

