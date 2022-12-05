import React from 'react';
import PropTypes from 'prop-types';
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ onClose, title, children }) => {
    const closeModalOnEsc = (e) => {
        if (e.keyCode == 27) {
            onClose();
        }
    };
    React.useEffect(() => {
        document.addEventListener('keydown', closeModalOnEsc);
        return () => {
            document.removeEventListener('keydown', closeModalOnEsc);
        }
    }, [])
    return (
        <>
            <ModalOverlay close={onClose} />
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={`${styles.title} text_type_main-large`}>{title}</h2>
                    <button className={styles.close} onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </>
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default Modal;