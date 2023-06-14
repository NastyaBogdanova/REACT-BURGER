import { useCallback } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks';
import styles from "./burger-constructor.module.css";
import { addIngredient, addBun } from '../../services/actions/constructor';
import { useDrop } from 'react-dnd';
import { DraggableElement } from './draggable-element/draggable-element';
import OrderBox from './order-box/order-box';
import EmptyElement from './empty-element/empty-element';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from "../../utils/types";

const BurgerConstructor = () => {

    const dispatch = useDispatch();

    const { bun, stuffings } = useSelector(store => store.constructor);

    const handleDrop = useCallback((item: TIngredient): void => {
        if (item.type === "bun") {
            dispatch(addBun(item));
        } else {
            dispatch(addIngredient(item));
        }

    }, [dispatch]);

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: TIngredient) {
            handleDrop(item);
        }
    });

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
                                <DraggableElement key={item.id} elem={item} index={index} />
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