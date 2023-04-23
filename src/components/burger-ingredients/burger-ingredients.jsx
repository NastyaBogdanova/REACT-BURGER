import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from "./burger-ingredients.module.css";
import ingredientPropTypes from "../../utils/types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import withToggleModal from "../hocs/withToggleModal";
import { CurrencyIcon, Tab, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredientToModal, deleteIngredientFromModlal } from '../../services/actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";


const BurgerIngredient = ({ ingredient }) => {
    const [isModalOpen, setModalOpen] = React.useState(false);

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient
    });

    const dispatch = useDispatch();

    const handleOpenModal = useCallback(() => {
        dispatch(addIngredientToModal(ingredient));
        setModalOpen(true);
    }, [dispatch, ingredient]);

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
        dispatch(deleteIngredientFromModlal());
        //console.log(isModalOpen);
    }, [dispatch]);

    const ingredients = useSelector(store => {
        const { constructor } = store;
        if (constructor.bun || constructor.stuffings) {
            return constructor.stuffings ? [constructor.bun, constructor.bun, ...constructor.stuffings] : [constructor.bun, constructor.bun];
        } else {
            return [];
        }
    });

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
            {isModalOpen &&
                <Modal onClose={handleCloseModal} title="Детали ингредиента">
                    <IngredientDetails />
                </Modal>
            }
        </li>
    )
}

//const WithToggleModalBurgerIngredient = withToggleModal(BurgerIngredient);

const BurgerIngredients = ({ ingredients }) => {
    const [current, setCurrent] = React.useState('Булки');

    return (
        <div className="mb-10 mt-10">
            <h1 className="title text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={styles.tabs}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.box} custom-scroll mt-10`}>
                <div id="Булки">
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {ingredients.filter(item => item.type == "bun").map(item =>
                            <BurgerIngredient ingredient={item} key={item._id} />
                        )}
                    </ol>
                </div>
                <div id="Соусы">
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {ingredients.filter(item => item.type == "sauce").map(item =>
                            <BurgerIngredient ingredient={item} key={item._id} />
                        )}
                    </ol>
                </div>
                <div id="Начинки">
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {ingredients.filter(item => item.type == "main").map(item =>
                            <BurgerIngredient ingredient={item} key={item._id} />
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes)
};
BurgerIngredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    //count: PropTypes.number,
    //onClick: PropTypes.func.isRequired,
    //isModalOpen: PropTypes.bool.isRequired,
};

export default BurgerIngredients; 