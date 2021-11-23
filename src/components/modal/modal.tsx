import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type TModalProps = {
    handleCloseModal: ()=>void,
}

const Modal:React.FC<TModalProps> = ({handleCloseModal, children}) => {
    const modalRoot:HTMLElement|null = document.getElementById("react-modals");

    // Возвращаем ReactDOM.createPortal,
    // который поместит дочерние элементы в react-modals
    return modalRoot && ReactDOM.createPortal(<ModalOverlay handleCloseModal={handleCloseModal} >
        <div onClick={(e)=>{ e.stopPropagation()}} className={styles.modal + ' pt-10'}>
            <header className={'mr-10 ml-10 text text_type_main-medium ' + styles.header}>
                <CloseIcon type="primary" onClick={handleCloseModal} />
            </header>
            <section>{children}</section>
        </div>
    </ModalOverlay>, modalRoot);
}

export default Modal;
