import styles from "./ingredient-details.module.css";
import ingredientPropTypes from "../utils/types";

const IngredientDetails = ({ content }) => {
    return (
        <div className={styles.container}>
            <img className={styles.pic} src={content.image} alt={content.name} />
            <h2 className="text text_type_main-medium mb-8">{content.name}</h2>
            <ol className={styles.info}>
                <li className={styles.item}>
                    <h3 className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</h3>
                    <span className="text text_type_digits-default text_color_inactive">{content.calories}</span>
                </li>
                <li className={styles.item}>
                    <h3 className="text text_type_main-default text_color_inactive mb-2">Белки, г</h3>
                    <span className="text text_type_digits-default text_color_inactive">{content.proteins}</span>
                </li>
                <li className={styles.item}>
                    <h3 className="text text_type_main-default text_color_inactive mb-2">Жиры, г</h3>
                    <span className="text text_type_digits-default text_color_inactive">{content.fat}</span>
                </li>
                <li className={styles.item}>
                    <h3 className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</h3>
                    <span className="text text_type_digits-default text_color_inactive">{content.carbohydrates}</span>
                </li>
            </ol>
        </div>
    )
}

IngredientDetails.propTypes = {
    content: ingredientPropTypes.isRequired,
};

export default IngredientDetails;

