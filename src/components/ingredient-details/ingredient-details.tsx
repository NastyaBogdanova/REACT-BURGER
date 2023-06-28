import styles from "./ingredient-details.module.css";
import { useParams } from 'react-router-dom';
import { useSelector } from "../../services/types/hooks";
import { Oval } from 'react-loader-spinner';

const IngredientDetails = () => {
    const { ingredients, request, failed } = useSelector(store => store.ingredients);
    const { id } = useParams<string>();

    const ingredient = ingredients.find((item) => item._id === id);

    if (!ingredient && request) {
        return (
            <div className={`${styles.loading} mt-10`}>
                <h1 className="text text_type_main-medium mb-15">Идёт загрузка ингредиента...</h1>
                <Oval
                    height={50}
                    width={50}
                    color="#4c4cff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#801ab3"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
            </div>
        )
    } else if (!ingredient && failed) {
        return <h1 className="text text_type_main-large m-25">Произошла ошибка при загрузке ингредиента!</h1>
    } else if (!ingredient) {
        return <h1 className="text text_type_main-large m-25">Что-то пошло не так!</h1>
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

