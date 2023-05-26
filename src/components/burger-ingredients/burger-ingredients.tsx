import React, { useEffect, useRef } from 'react';
import styles from "./burger-ingredients.module.css";
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { RootState, TIngredient } from "../../utils/types";

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('Булки');

    const [bunRef, inViewBuns] = useInView({ threshold: 0 });
    const [mainRef, inViewMains] = useInView({ threshold: 0 });
    const [sauceRef, inViewSauces] = useInView({ threshold: 0 });

    const bunsRef = useRef<HTMLHeadingElement>(null);
    const mainsRef = useRef<HTMLHeadingElement>(null);
    const saucesRef = useRef<HTMLHeadingElement>(null);

    const { ingredients } = useSelector((store: RootState) => store.ingredients);

    useEffect((): void => {
        if (inViewBuns) {
            setCurrent('Булки')
        } else if (inViewSauces) {
            setCurrent('Соусы')
        } else if (inViewMains) {
            setCurrent('Начинки')
        }
    }, [inViewBuns, inViewSauces, inViewMains]);

    const goTo = (ref: React.RefObject<HTMLHeadingElement>): void => {
        ref.current?.scrollIntoView();
    }

    return (
        <div className="mb-10 mt-10">
            <h1 className="title text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={styles.tabs}>
                <Tab value="Булки" active={current === 'Булки'} onClick={() => goTo(bunsRef)}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={() => goTo(saucesRef)}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={() => goTo(mainsRef)}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.box} custom-scroll mt-10`}>
                <div id="Булки" ref={bunRef}>
                    <h2 className="text text_type_main-medium" ref={bunsRef}>Булки</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {ingredients.filter((item: TIngredient) => item.type == "bun").map((item: TIngredient) =>
                            <BurgerIngredient ingredient={item} key={item._id} />
                        )}
                    </ol>
                </div>
                <div id="Соусы" ref={sauceRef}>
                    <h2 className="text text_type_main-medium" ref={saucesRef}>Соусы</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {ingredients.filter((item: TIngredient) => item.type == "sauce").map((item: TIngredient) =>
                            <BurgerIngredient ingredient={item} key={item._id} />
                        )}
                    </ol>
                </div>
                <div id="Начинки" ref={mainRef}>
                    <h2 className="text text_type_main-medium" ref={mainsRef}>Начинки</h2>
                    <ol className={`${styles.list} pl-4 pr-4 pb-10 pt-6`}>
                        {ingredients.filter((item: TIngredient) => item.type == "main").map((item: TIngredient) =>
                            <BurgerIngredient ingredient={item} key={item._id} />
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default BurgerIngredients; 