import styles from "../components/ingredient-details/ingredient-details.module.css";
import AppHeader from "../components/app-header/app-header";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

export function IngredientPage() {

    return (
        <div className={styles.background}>
            <AppHeader />
            <div className="mt-25">
                <h1 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h1>
                <IngredientDetails />
            </div>

        </div>
    )
}