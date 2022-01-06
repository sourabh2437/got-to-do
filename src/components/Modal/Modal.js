import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';
import { isTouchFriendly } from '../../utils';
const device = isTouchFriendly ? 'Mobile' : 'Desktop'
const Modal = props => {
    const { show, showHeader, onClose, title, children } = props;
    return (
        <>
            <div className={`Modal ${show ? 'Show' : ''} ${device}`}>
                {showHeader && (
                    <div className={`Modal__Header`}>
                        <div className="Modal__Header__Title">{title}</div>
                        <div className={`Modal__Header__CloseButton`} onClick={onClose}>
                            <div className="Modal__Header__CloseButton__Icon">&#10005;</div>
                        </div>
                    </div>
                )}
                <div className={`Modal__Content`}>{children}</div>
            </div>
            <div className={`ModalOverlay ${show ? 'Show' : ''}`} onClick={onClose}></div>
        </>
    );
};

Modal.propTypes = {
    show: PropTypes.bool,
    showHeader: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.node,
};

Modal.defaultProps = {
    show: false,
    onClose: () => { },
    children: null,
    title: '',
    showHeader: true,
};

export default Modal;
