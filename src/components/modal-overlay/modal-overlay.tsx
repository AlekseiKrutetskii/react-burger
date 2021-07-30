import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {
    return (
        <div className={styles.overlay} onClick={props.handleCloseModal}>
            {props.children}
        </div>
    )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func,
    children: PropTypes.element
};

