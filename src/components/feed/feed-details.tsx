import { useSelector } from "../../services/types/hooks";
import { useParams } from 'react-router-dom';
import styles from "./feed.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type { TOrder, TIngredient, TOrders } from '../../utils/types';
import { prettierDate, totalPrice, translateStatusText } from '../../utils/functions';

export const FeedDetails = ({ orders }: TOrders) => {

    const { ingredients } = useSelector(store => store.ingredients);

    const { id } = useParams<string>();

    const order = orders.find((item: TOrder) => item._id === id);

    const orderIngredients: TIngredient[] = [];

    if (!order) {
        return <h1 className="text text_type_main-medium mt-10">Идёт загрузка заказа...</h1>
    }

    if (ingredients) {
        order.ingredients.map(orderIngredient => {
            let elem: TIngredient | undefined = ingredients.find(ingredient => ingredient?._id === orderIngredient);
            if (elem) {
                orderIngredients.push(elem);
            }
        })
    }

    const orderIngredientsSet: TIngredient[] = Array.from(new Set(orderIngredients));

    const ingredientQuantity = (ingredient: TIngredient) => {
        if (order) {
            return order.ingredients.filter(item => item == ingredient._id).length;
        }
    }

    return (
        <>
            <p className={`text text_type_digits-default`}>#{order.number}</p>
            <h1 className="text text_type_main-medium mt-5">{order.name}</h1>
            <div className="text text_type_main-small mt-2">{translateStatusText(order.status)}</div>
            <p className="text text_type_main-medium mt-15">Состав:</p>
            <ul className={`${styles.stuffings} ${styles.list} custom-scroll`}>
                {orderIngredientsSet.map((ingredient) =>
                    <li className={`${styles.ingredient} pr-6 mb-4`} key={ingredient._id}>
                        <div className={styles.info}>
                            <img className={styles.circle} src={ingredient.image} alt="" />
                            <h2 className="text text_type_main-small ml-4">{ingredient.name}</h2>
                        </div>
                        <div className={styles.price}>
                            <span className="text text_type_digits-default">{ingredientQuantity(ingredient)} &times;</span>
                            <div className={styles.price}>
                                <p className="text text_type_digits-default">&nbsp;{ingredient.price}&nbsp;</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </li>
                )}
            </ul>
            <div className={`${styles.info} mt-10`}>
                <p className="text text_type_main-default text_color_inactive">{prettierDate(order.createdAt)}</p>
                <div className={`${styles.price} pr-6`}>
                    <p className="text text_type_digits-default">{totalPrice(orderIngredients)}&nbsp;</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </>
    )
}