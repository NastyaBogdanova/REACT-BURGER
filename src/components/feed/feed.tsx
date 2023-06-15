import styles from "./feed.module.css";
import { TOrders } from '../../utils/types';
import { FeedItem } from './feed-item';

export const Feed = ({ orders }: TOrders) => {
    return (
        <div className={`${styles.box} custom-scroll`}>
            {orders.map((item, index) =>
                <FeedItem orderItem={item} key={item._id} />
            )}
        </div>
    )
}