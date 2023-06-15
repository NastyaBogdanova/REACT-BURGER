import styles from "./feed-page.module.css";
import { FeedDetails } from '../components/feed/feed-details';
import { wsConnectionStart, wsConnectionClosed } from "../services/actions/webSocketFeed";
import { useSelector, useDispatch } from "../services/types/hooks";
import { useEffect } from 'react';

export const FeedDetailsPage = () => {

    const { orders } = useSelector(store => store.ws);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart('/all'));
        return () => {
            dispatch(wsConnectionClosed());
        }
    }, []);

    return (
        <div className={styles.background}>
            <div className={`${styles.container}`}>
                <FeedDetails orders={orders} />
            </div>
        </div>
    )
}