import React from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
    handleCloseModal: ()=>void,
}

const ModalOverlay:React.FC<TModalOverlayProps> = ({handleCloseModal, children}) => {
    return (
        <div className={styles.overlay} onClick={handleCloseModal}>
            {children}
        </div>
    )
}

export default ModalOverlay;

