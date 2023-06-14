import styles from "./ingredient-details.module.css";
import { useParams } from 'react-router-dom';
import { useSelector } from "../../services/types/hooks";

const IngredientDetails = () => {
    const { ingredients, request, failed } = useSelector(store => store.ingredients);
    const { id } = useParams<string>();

    const ingredient = ingredients.find((item) => item._id === id);

    if (!ingredient && request) {
        return <h1 className="text text_type_main-large m-25">Идёт загрузка ингридиента...</h1>
    } else if (!ingredient && failed) {
        return <h1 className="text text_type_main-large m-25">Произошла ошибка при загрузке ингридиента!</h1>
    } else if (!ingredient) {
        return <h1 className="text text_type_main-large m-25">Что-то пошло не так</h1>
    }

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

