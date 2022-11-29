import React from 'react';
import PropTypes from 'prop-types';
import "./burger-ingredients.css";
import { CurrencyIcon, Tab, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredient({ ingredient, count }) {
    return (
        <li className="ingredient">
            <img className="ingredient-pic" src={ingredient.image} alt={ingredient.name} />
            <p className="text text_type_digits-default ingredient-price pb-1 pt-1">{ingredient.price}&nbsp;<CurrencyIcon type="primary" /></p>
            <h3 className="text text_type_main-default">{ingredient.name}</h3>
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        </li>
    )
}

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('Булки');
    return (
        <div className="mb-10 mt-10">
            <h1 className="title text text_type_main-large mb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className="ingredients-box custom-scroll mt-10">
                <div className="ingredients-item" id="Булки">
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <ol className="ingredients-list pl-4 pr-4 pb-10 pt-6">
                        {props.products.filter(item => item.type == "bun").map(item =>
                            <BurgerIngredient ingredient={item} count={1} key={item._id} />
                        )}
                    </ol>
                </div>
                <div className="ingredients-item" id="Соусы">
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <ol className="ingredients-list pl-4 pr-4 pb-10 pt-6">
                        {props.products.filter(item => item.type == "sauce").map(item =>
                            <BurgerIngredient ingredient={item} count={0} key={item._id} />
                        )}
                    </ol>
                </div>
                <div className="ingredients-item" id="Начинки">
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <ol className="ingredients-list pl-4 pr-4 pb-10 pt-6">
                        {props.products.filter(item => item.type == "main").map(item =>
                            <BurgerIngredient ingredient={item} count={0} key={item._id} />
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
}

const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
});

BurgerIngredients.propTypes = {
    products: PropTypes.arrayOf(ingredientPropTypes)
};

export default BurgerIngredients; 