import { useSelector } from "../../services/types/hooks";
import styles from "./profile-right.module.css";
import { Feed } from "../feed/feed";

export const ProfileOrders = () => {

    const { ordersProfile } = useSelector(store => store.wsProfile);

    return (
        <div className={`${styles.container} mt-10`}>
            <Feed orders={ordersProfile} />
        </div>
    )
}