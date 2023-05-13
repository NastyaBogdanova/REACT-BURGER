import PropTypes from 'prop-types'
import styles from "../burger-constructor.module.css";
import burgerImagePath from '../../../images/burger.svg';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const EmptyElement = ({ text, type }) => {
    return (
        <div className={styles.item} >
            <ConstructorElement
                type={type}
                text={text}
                isLocked={true}
                price="0"
                thumbnail={burgerImagePath}
            />
        </div>
    )
}

EmptyElement.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string
};

export default EmptyElement;