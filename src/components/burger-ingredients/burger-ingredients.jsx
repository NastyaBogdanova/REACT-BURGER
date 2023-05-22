import React, { useEffect } from 'react';
import styles from "./burger-ingredients.module.css";
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('Булки');

    const [bunRef, inViewBuns] = useInView({ threshold: 0 });
    const [mainRef, inViewMains] = useInView({ threshold: 0 });
    const [sauceRef, inViewSauces] = useInView({ threshold: 0 });

    const { ingredients } = useSelector(store => store.ingredients);

    useEffect(() => {
        if (inViewBuns) {
            setCurrent('Булки')
        } else if (inViewSauces) {
            setCurrent('Соусы')
        } else if (inViewMains) {
            setCurrent('Начинки')
        }
    }, [inViewBuns, inViewSauces, inViewMains])

    return (
        <div className="mb-10 mt-10">
            <h1 className="title text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={styles.tabs}>
                <Tab value="Булки" active={current === 'Булки'}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.box} custom-scroll mt-10`}>
                <div id="Булки" ref={bunRef}>
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {ingredients.filter(item => item.type == "bun").map(item =>
                            <BurgerIngredient ingredient={item} key={item._id} />
                        )}
                    </ol>
                </div>
                <div id="Соусы" ref={sauceRef}>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {ingredients.filter(item => item.type == "sauce").map(item =>
                            <BurgerIngredient ingredient={item} key={item._id} />
                        )}
                    </ol>
                </div>
                <div id="Начинки" ref={mainRef}>
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {ingredients.filter(item => item.type == "main").map(item =>
                            <BurgerIngredient ingredient={item} key={item._id} />
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default BurgerIngredients; 