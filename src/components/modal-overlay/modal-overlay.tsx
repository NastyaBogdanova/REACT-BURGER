import styles from "./modal-overlay.module.css";

const ModalOverlay: React.FC<TModalOverlay> = ({ close }) => {
    return (
        <div className={styles.overlay} onClick={close}>
        </div>
    )
}

type TModalOverlay = {
    close: () => void;
};

export default ModalOverlay;
