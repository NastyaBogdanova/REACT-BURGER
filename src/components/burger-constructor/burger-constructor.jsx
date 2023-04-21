import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from "./burger-constructor.module.css";
import ingredientPropTypes from "../../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import withToggleModal from "../hocs/withToggleModal";
import burgerImagePath from '../../images/burger.svg';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const EmptyIngredient = ({ text, type }) => {
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

const BurgerConstructor = ({ onClick, isModalOpen }) => {

    //const dispatch = useDispatch();

    const { bun, main } = useSelector(store => store.constructor);

    //берём массив из контекста
    //если в контекте уже есть тип бан то больше не добавлять
    //бан топ == бан баттон

    return (
        <div className={`${styles.container} mb-10 mt-25`}>
            <div className={styles.basket}>
                <div className={`${styles.item}`}>
                    {bun ?
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name + " (верх)"}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                        :
                        <EmptyIngredient type="top" text="Добавьте булку" />
                    }
                </div>
                <div className={`${styles.customScroll} custom-scroll`}>
                    {main !== undefined ?
                        <>
                            {main.filter(item => item.type == "main").map(item =>
                                <div className={`${styles.item}`}>
                                    <span className={styles.dropIcon}>
                                        <DragIcon type="primary" />
                                    </span>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                        key={item._id}
                                    />
                                </div>
                            )}
                        </>
                        :
                        <div className={`${styles.item}`}>
                            <EmptyIngredient text="Добавьте ингредиент" />
                        </div>
                    }
                </div>
                <div className={`${styles.item}`}>
                    {bun ?
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name + " (низ)"}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                        :
                        <EmptyIngredient type="bottom" text="Добавьте булку" />
                    }
                </div>

            </div>
            <div className={`${styles.order} mt-10 mr-5`}>
                <p className={`${styles.total} text text_type_digits-medium`}>30&nbsp;<CurrencyIcon type="primary" /></p>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2 text_type_main-default" onClick={onClick} >
                    Оформить заказ
                </Button>
                {isModalOpen &&
                    <Modal onClose={onClick} title=" ">
                        <OrderDetails />
                    </Modal>
                }
            </div>
        </div>
    );
}

const WithToggleModalBurgerConstructor = withToggleModal(BurgerConstructor);

/*BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes),
    onClick: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
};
Ingredient.propTypes = {
    ingredient: ingredientPropTypes,
    type: PropTypes.string.isRequired,
};*/

export default WithToggleModalBurgerConstructor; 