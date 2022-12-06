import React from 'react';
import PropTypes from 'prop-types';
import PortalReactDOM from 'react-dom';
import styles from "./burger-constructor.module.css";
import ingredientPropTypes from "../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import withToggleModal from "../hocs/withToggleModal";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({ ingredient, type, onClick, isModalOpen }) => {
    return (
        <>
            <div className={styles.item} onClick={onClick} >
                {type == "top" &&
                    <ConstructorElement
                        type={type}
                        isLocked={true}
                        text={ingredient.name + " (верх)"}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />
                }
                {type == "bottom" &&
                    <ConstructorElement
                        type={type}
                        isLocked={true}
                        text={ingredient.name + " (низ)"}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />
                }
                {type == "main" &&
                    <>
                        <span className={styles.dropIcon}>
                            <DragIcon type="primary" />
                        </span>
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                        >
                        </ConstructorElement>
                    </>
                }
            </div>
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

const WithToggleModalIngredient = withToggleModal(Ingredient);

const BurgerConstructor = ({ products, onClick, isModalOpen }) => {
    function getRandomArrayElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    const randomBun = getRandomArrayElement(products.filter(item => item.type == "bun"));

    return (
        <div className={`${styles.container} mb-10 mt-25`}>
            <div className={styles.basket}>
                <div className="top mr-4 pl-7">
                    <WithToggleModalIngredient ingredient={randomBun} type="top" />
                </div>
                <div className={`${styles.customScroll} custom-scroll`}>
                    <div className="pr-1">
                        {products.filter(item => item.type == "main").map(item =>
                            <WithToggleModalIngredient ingredient={item} type="main" key={item._id} />
                        )}
                    </div>
                </div>
                <div className="bottom mr-4 pl-7">
                    <WithToggleModalIngredient ingredient={randomBun} type="bottom" />
                </div>
            </div>
            <div className={`${styles.order} mt-10 mr-5`}>
                <p className={`${styles.total} text text_type_digits-medium`}>30&nbsp;<CurrencyIcon type="primary" /></p>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2 text_type_main-default" onClick={onClick} >
                    Оформить заказ
                </Button>
                {isModalOpen &&
                    PortalReactDOM.createPortal(
                        <Modal onClose={onClick} title=" ">
                            <OrderDetails />
                        </Modal>,
                        document.getElementById("modals")
                    )
                }
            </div>
        </div>
    );
}

const WithToggleModalBurgerConstructor = withToggleModal(BurgerConstructor);

BurgerConstructor.propTypes = {
    products: PropTypes.arrayOf(ingredientPropTypes),
    onClick: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
};
Ingredient.propTypes = {
    ingredient: ingredientPropTypes,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
};

export default WithToggleModalBurgerConstructor; 