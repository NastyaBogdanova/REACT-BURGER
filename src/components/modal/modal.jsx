import React from 'react';
import PropTypes from 'prop-types';
import PortalReactDOM from 'react-dom';
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ onClose, title, children }) => {
    const closeModalOnEsc = (e) => {
        if (e.key === 'Escape') {
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
        PortalReactDOM.createPortal(
            <div>
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
            </div>,
            document.getElementById("modals")
        )

    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default Modal;