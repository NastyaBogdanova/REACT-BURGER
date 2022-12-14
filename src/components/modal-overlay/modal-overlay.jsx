import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ close }) => {
    return (
        <div className={styles.overlay} onClick={close}>
        </div>
    )
}

ModalOverlay.propTypes = {
    close: PropTypes.func.isRequired
};

export default ModalOverlay;
