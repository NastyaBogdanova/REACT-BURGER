import { useSelector } from "../../services/types/hooks";
import styles from "./feed.module.css";

type TFeedImg = {
    index: number,
    item: string,
    quantity?: number;
}

export const FeedImg = ({ index, item, quantity }: TFeedImg) => {

    const { ingredients } = useSelector(store => store.ingredients);

    const ingredient = ingredients.find(ingredient => ingredient?._id === item);

    if (!ingredient) {
        return <></>;
    }

    return (
        <>
            {
                quantity ?
                    <div className={styles.lastimg}>
                        <img className={styles.circle} style={{ zIndex: `${index}` }} src={ingredient.image} alt="" />
                        <div className={styles.transparent}>
                            <span className="text text_type_main-default">+{quantity}</span>
                        </div>
                    </div>
                    :
                    <img className={styles.circle} style={{ zIndex: `${index}` }} src={ingredient.image} alt="" />
            }
        </>

    )
}