import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Modal(props) {
    const modalRoot: any = document.getElementById("react-modals");

    // Возвращаем ReactDOM.createPortal,
    // который поместит дочерние элементы в react-modals
    return ReactDOM.createPortal(<ModalOverlay handleCloseModal={props.handleCloseModal} >
        <div onClick={(e)=>{ e.stopPropagation()}} className={styles.modal + ' pt-10'}>
            <header className={'mr-10 ml-10 text text_type_main-medium ' + styles.header}>
                <CloseIcon type="primary" onClick={props.handleCloseModal} />
            </header>
            <section>{props.children}</section>
        </div>
    </ModalOverlay>, modalRoot);
}

export default Modal;

Modal.propTypes = {
    handleCloseModal: PropTypes.func,
    children: PropTypes.element
};
