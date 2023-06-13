import styles from "./feed.module.css";
import { TOrders, TOrder } from '../../utils/types';
import { FeedItem } from './feed-item';

export const Feed = ({ orders }: TOrders) => {
    return (
        <div className={`${styles.box} custom-scroll`}>
            {orders.map((item: TOrder, index: number) =>
                <FeedItem orderItem={item} key={index} />
            )}
        </div>
    )
}