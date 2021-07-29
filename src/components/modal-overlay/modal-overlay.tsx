import React from 'react';
import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
    return (
        <div className={styles.overlay} onClick={props.handleCloseModal}>
            {props.children}
        </div>
    )
}

export default ModalOverlay;
