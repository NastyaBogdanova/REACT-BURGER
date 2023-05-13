import ingredientPropTypes from "../../../utils/types";
import styles from "../burger-ingredients.module.css";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredientToModal, deleteIngredientFromModlal } from '../../../services/actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { useNavigate } from 'react-router-dom';

const BurgerIngredient = ({ ingredient }) => {

    const ingredients = useSelector(store => {
        const { constructor } = store;
        if (constructor.bun || constructor.stuffings) {
            return constructor.stuffings ? [constructor.bun, constructor.bun, ...constructor.stuffings] : [constructor.bun, constructor.bun];
        } else {
            return [];
        }
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient
    });

    const handleOpenModal = () => {
        navigate(`/ingredients/${ingredient._id}`, { state: { fromHomePage: true } });
        dispatch(addIngredientToModal(ingredient));
    }

    const counter = () => {
        return ingredients.filter(item => item?._id === ingredient._id).length;
    }

    const count = counter();

    return (
        <li className={styles.item} onClick={handleOpenModal} ref={dragRef}>
            <img className={styles.pic} src={ingredient.image} alt={ingredient.name} />
            <p className={`${styles.price} text text_type_digits-default pb-1 pt-1`}>{ingredient.price}&nbsp;<CurrencyIcon type="primary" /></p>
            <h3 className="text text_type_main-default">{ingredient.name}</h3>
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        </li>

    )
}

BurgerIngredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired
};

export default BurgerIngredient; 