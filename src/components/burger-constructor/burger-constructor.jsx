import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import update from 'immutability-helper';
import styles from "./burger-constructor.module.css";
import { addIngredient, addBun, updateIngredients, deleteIngredient } from '../../services/actions/constructor';
import { useDrop } from 'react-dnd';
import { DraggableElement } from './draggable-element/draggable-element';
import OrderBox from './order-box/order-box';
import EmptyElement from './empty-element/empty-element';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = () => {

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

    const deleteElement = (id) => {
        dispatch(deleteIngredient(id));

    }

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
            <OrderBox />
        </div>
    );
}

export default BurgerConstructor; 