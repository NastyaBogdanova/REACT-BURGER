import styles from "./feed-page.module.css";
import { FeedDetails } from '../components/feed/feed-details';
import { wsConnectionProfileStart, wsConnectionProfileClosed } from "../services/actions/webSocketProfile";
import { useSelector, useDispatch } from "../services/types/hooks";
import { useEffect } from 'react';
import { getCookie } from 'typescript-cookie';

export const OrderDetailsPage = () => {

    const { ordersProfile } = useSelector(store => store.wsProfile);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionProfileStart(`?token=${getCookie('token')}`));
        return () => {
            dispatch(wsConnectionProfileClosed());
        }
    }, []);

    return (
        <div className={styles.background}>
            <div className={`${styles.container}`}>
                <FeedDetails orders={ordersProfile} />
            </div>
        </div>
    )
}