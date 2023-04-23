import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import styles from "./burger-constructor.module.css";
import ingredientPropTypes from "../../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import withToggleModal from "../hocs/withToggleModal";
import burgerImagePath from '../../images/burger.svg';
import { addIngredient, addBun, updateIngredients, deleteIngredient, resetIngredients } from '../../services/actions/constructor';
import { sendOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import { DraggableElement } from './draggableElement/draggable-element';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

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

const BurgerConstructor = () => {

    const [isModalOpen, setModalOpen] = React.useState(false);

    const dispatch = useDispatch();

    const { bun, stuffings } = useSelector(store => store.constructor);

    const handleDrop = useCallback((item) => {
        if (item.type === "bun") {
            dispatch(addBun(item));
        } else {
            dispatch(addIngredient(item));
        }

    }, [dispatch]);

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            handleDrop(item);
        }
    });

    const moveElement = useCallback((dragIndex, hoverIndex) => {
        const updatedElements = update(stuffings, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, stuffings[dragIndex]],
            ],
        })
        dispatch(updateIngredients(updatedElements));
    }, [stuffings, dispatch])

    const totalPrice = useMemo(() => {
        if (stuffings || bun) {
            return (stuffings ? stuffings.reduce((sum, item) => sum + item.price, 0) : 0) + (bun ? bun.price * 2 : 0);
        } else {
            return 0;
        }
    }, [bun, stuffings]);

    const deleteElement = (id) => {
        dispatch(deleteIngredient(id));

    }

    const orderModalOpen = () => {
        setModalOpen(true);
    };

    const orderModalClose = () => {
        setModalOpen(false);
        dispatch(resetIngredients());

    };

    const submit = () => {
        const ingredientsId = [bun, ...stuffings, bun].map(item => item._id);
        console.log(ingredientsId);
        dispatch(sendOrder(ingredientsId, orderModalOpen));
    }

    const { failed } = useSelector(store => store.order);

    return (
        <div className={`${styles.container} mb-10 mt-25`}>
            <div className={styles.basket} ref={dropTarget}>
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
                        <EmptyElement type="top" text="Добавьте булку" />
                    }
                </div>
                <div className={`${styles.customScroll} custom-scroll`}>
                    {stuffings !== undefined && stuffings.length !== 0 ?
                        <>
                            {stuffings.map((item, index) =>
                                <DraggableElement key={item.id} elem={item} index={index} moveElement={moveElement} deleteElement={deleteElement} />
                            )}
                        </>
                        :
                        <div className={`${styles.item}`}>
                            <EmptyElement text="Добавьте ингредиент" />
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
                        <EmptyElement type="bottom" text="Добавьте булку" />
                    }
                </div>

            </div>
            <div >
                <div className={`${styles.order} mt-10 mr-5`}>
                    <p className={`${styles.total} text text_type_digits-medium`}>{totalPrice}&nbsp;<CurrencyIcon type="primary" /></p>
                    <Button htmlType="button" type="primary" size="small" extraClass="ml-2 text_type_main-default" onClick={submit} disabled={!stuffings || !stuffings.length || !bun}>
                        Оформить заказ
                    </Button>
                    {isModalOpen &&
                        <Modal onClose={orderModalClose} title=" ">
                            <OrderDetails />
                        </Modal>
                    }
                </div>
                {failed &&
                    <span className={`${styles.error} text text_type_main-small`}>Произошла ошибка при формировании заказа!</span>
                }
            </div>
        </div>
    );
}

//const WithToggleModalBurgerConstructor = withToggleModal(BurgerConstructor);

/*BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes),
    onClick: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
};
Ingredient.propTypes = {
    ingredient: ingredientPropTypes,
    type: PropTypes.string.isRequired,
};*/

export default BurgerConstructor; 