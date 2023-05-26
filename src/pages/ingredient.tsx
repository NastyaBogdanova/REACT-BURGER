import styles from "../components/ingredient-details/ingredient-details.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

export const IngredientPage = () => {
    return (
        <div className={styles.background}>
            <div className="mt-25">
                <h1 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h1>
                <IngredientDetails />
            </div>
        </div>
    )
}