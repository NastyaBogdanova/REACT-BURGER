import React, { ReactElement } from 'react';
import PortalReactDOM from 'react-dom';
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal: React.FC<TModal> = ({ onClose, title, children }) => {

    const closeModalOnEsc = (e: KeyboardEvent) => {
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
                        <button className={`${styles.close} close-button`} onClick={onClose}>
                            <CloseIcon type="primary" />
                        </button>
                    </div>
                    <div className={styles.content}>{children}</div>
                </div>
            </div>,
            document.getElementById("modals")!
        )
    )
}

type TModal = {
    title: string;
    onClose: () => void;
    children: ReactElement;
};

export default Modal;