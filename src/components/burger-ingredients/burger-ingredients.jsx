import React from 'react';
import PropTypes from 'prop-types';
import PortalReactDOM from 'react-dom';
import styles from "./burger-ingredients.module.css";
import ingredientPropTypes from "../utils/types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import withToggleModal from "../hocs/withToggleModal";
import { CurrencyIcon, Tab, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredient = ({ ingredient, count, onClick, isModalOpen }) => {
    return (
        <>
            <li className={styles.item} onClick={onClick}>
                <img className={styles.pic} src={ingredient.image} alt={ingredient.name} />
                <p className={`${styles.price} text text_type_digits-default pb-1 pt-1`}>{ingredient.price}&nbsp;<CurrencyIcon type="primary" /></p>
                <h3 className="text text_type_main-default">{ingredient.name}</h3>
                {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            </li>
            {isModalOpen &&
                PortalReactDOM.createPortal(
                    <Modal onClose={onClick} title="Детали ингредиента">
                        <IngredientDetails content={ingredient} />
                    </Modal>,
                    document.getElementById("modals")
                )
            }
        </>
    )
}

const WithToggleModalBurgerIngredient = withToggleModal(BurgerIngredient);

const BurgerIngredients = ({ products }) => {
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
                        {products.filter(item => item.type == "bun").map(item =>
                            <WithToggleModalBurgerIngredient ingredient={item} count={1} key={item._id} />
                        )}
                    </ol>
                </div>
                <div id="Соусы">
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {products.filter(item => item.type == "sauce").map(item =>
                            <WithToggleModalBurgerIngredient ingredient={item} count={0} key={item._id} />
                        )}
                    </ol>
                </div>
                <div id="Начинки">
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {products.filter(item => item.type == "main").map(item =>
                            <WithToggleModalBurgerIngredient ingredient={item} count={0} key={item._id} />
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    products: PropTypes.arrayOf(ingredientPropTypes)
};
BurgerIngredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    count: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
};

export default BurgerIngredients; 