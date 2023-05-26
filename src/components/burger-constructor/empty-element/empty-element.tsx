import styles from "../burger-constructor.module.css";
import burgerImagePath from '../../../images/burger.svg';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const EmptyElement = ({ text, type }: TEmptyElement) => {
    return (
        <div className={styles.item} >
            <ConstructorElement
                type={type}
                text={text}
                isLocked={true}
                price={0}
                thumbnail={burgerImagePath}
            />
        </div>
    )
}

type TEmptyElement = {
    text: string;
    type?: "bottom" | "top";
};

export default EmptyElement;