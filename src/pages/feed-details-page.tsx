import styles from "./feed-page.module.css";
import { FeedDetails } from '../components/feed/feed-details';
import { wsConnectionStart, wsConnectionClosed } from "../services/actions/webSocket";
import { useSelector, useDispatch } from "../services/types/hooks";
import { useEffect } from 'react';
import { getCookie } from 'typescript-cookie';

export const FeedDetailsPage = () => {

    const { loggedIn } = useSelector(store => store.user);

    const dispatch = useDispatch();

    const init = () => {
        if (!loggedIn) {
            dispatch(wsConnectionStart('/all'));
        } else {
            dispatch(wsConnectionStart(`?token=${getCookie('token')}`));
        }
    };

    useEffect(() => {
        init();
        return () => {
            dispatch(wsConnectionClosed());
        }
    }, []);

    return (
        <div className={styles.background}>
            <div className={`${styles.container}`}>
                <FeedDetails />
            </div>
        </div>
    )
}