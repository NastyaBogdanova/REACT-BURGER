import styles from "../burger-ingredients.module.css";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../services/types/hooks';
import { useDrag } from "react-dnd";
import { useLocation, Link } from 'react-router-dom';
import { RootState } from "../../../services/types/index";
import { TIngredient } from "../../../utils/types";

const BurgerIngredient = ({ ingredient }: TBurgerIngredient) => {

    const location = useLocation();

    const { bun, stuffings } = useSelector((store: RootState) => store.constructor);

    const ingredients = () => {
        if (bun || stuffings) {
            return stuffings ? [bun, bun, ...stuffings] : [bun, bun];
        } else {
            return [];
        }
    };

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient
    });

    const counter = (): number => {
        return ingredients().filter(item => item?._id === ingredient._id).length;
    }

    const count: number = counter();

    return (
        <Link to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }} className={styles.item} ref={dragRef}>
            <img className={styles.pic} src={ingredient.image} alt={ingredient.name} />
            <p className={`${styles.price} text text_type_digits-default pb-1 pt-1`}>{ingredient.price}&nbsp;<CurrencyIcon type="primary" /></p>
            <h3 className="text text_type_main-default">{ingredient.name}</h3>
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        </Link>
    )
}

type TBurgerIngredient = {
    ingredient: TIngredient;
};

export default BurgerIngredient; 