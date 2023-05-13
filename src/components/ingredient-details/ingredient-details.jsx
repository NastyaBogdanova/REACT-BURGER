import styles from "./ingredient-details.module.css";
import { useSelector } from 'react-redux';

const IngredientDetails = () => {

    const { ingredient } = useSelector(store => store.modal);

    return (
        <div className={styles.container}>
            <img className={styles.pic} src={ingredient.image} alt={ingredient.name} />
            <h2 className="text text_type_main-medium mb-8">{ingredient.name}</h2>
            <ol className={styles.info}>
                <li className={styles.item}>
                    <h3 className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</h3>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span>
                </li>
                <li className={styles.item}>
                    <h3 className="text text_type_main-default text_color_inactive mb-2">Белки, г</h3>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
                </li>
                <li className={styles.item}>
                    <h3 className="text text_type_main-default text_color_inactive mb-2">Жиры, г</h3>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span>
                </li>
                <li className={styles.item}>
                    <h3 className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</h3>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
                </li>
            </ol>
        </div>
    )
}

export default IngredientDetails;

