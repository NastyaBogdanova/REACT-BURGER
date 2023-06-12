import styles from "./feed-page.module.css";
import { FeedDetails } from '../components/feed/feed-details';

export const FeedDetailsPage = () => {
    return (
        <div className={styles.background}>
            <div className={`${styles.container}`}>
                <FeedDetails />
            </div>
        </div>
    )
}