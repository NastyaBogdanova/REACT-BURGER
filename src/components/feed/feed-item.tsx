import { useSelector } from "../../services/types/hooks";
import styles from "./feed.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';
import { TOrder, TIngredient } from '../../utils/types';
import { prettierDate, totalPrice, translateStatusText } from '../../utils/functions';
import { FeedImg } from './feed-img';

export const FeedItem = (orderItem: { orderItem: TOrder }) => {

    const order = orderItem.orderItem;

    const location = useLocation();

    const feedLocation = "/feed";

    const { ingredients } = useSelector(store => store.ingredients);

    const orderIngredients: TIngredient[] = [];

    if (ingredients) {
        order.ingredients.map(orderIngredient => {
            let elem = ingredients.find(ingredient => ingredient?._id === orderIngredient);
            if (elem) {
                orderIngredients.push(elem);
            }
        })
    }

    return (
        <Link to={location.pathname === feedLocation ? `/feed/${order._id}` : `/profile/orders/${order._id}`} state={{ backgroundLocation: location }} className={`${styles.item} p-6 mb-4 mr-2`}>
            <div className={styles.info}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">{prettierDate(order.createdAt)}</p>
            </div>
            <h3 className="text text_type_main-medium mt-6">{order.name}</h3>
            <div className="text text_type_main-small mt-1">{translateStatusText(order.status)}</div>
            <div className={`${styles.info} mt-6`}>
                <div className={styles.ingredients}>
                    {order.ingredients.length <= 6 ?
                        order.ingredients.map((item, i) =>
                            <FeedImg index={order.ingredients.length - i} item={item} key={i} />
                        )
                        :
                        <>
                            {order.ingredients.slice(0, 5).map((item, i) =>
                                <FeedImg index={6 - i} item={item} key={i} />)}
                            <FeedImg index={0} item={order.ingredients[5]} quantity={order.ingredients.length - 5} />
                        </>
                    }
                </div>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">{totalPrice(orderIngredients)}&nbsp;</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}