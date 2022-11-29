import React from 'react';
import PropTypes from 'prop-types';
import "./burger-constructor.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function MainIngredient({ elem }) {
    return (
        <li className="burger-center-item" >
            <span className="burger-center-icon">
                <DragIcon type="primary" />
            </span>
            <ConstructorElement
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image}
            />
        </li>
    )
}

function BurgerConstructor(props) {
    function getRandomArrayElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    const randomBun = getRandomArrayElement(props.products.filter(item => item.type == "bun"));
    return (
        <div className="burger-container mb-10 mt-25">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
                {/* структура этого элемента получилась странная(top, center, bottom), но пока не понимаю, как сделать лучше */}
                <div className="burger-top mr-4">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={randomBun.name}
                        price={randomBun.price}
                        thumbnail={randomBun.image}
                    />
                </div>
                <div className="custom-scroll">
                    <ol className="burger-center pr-1">
                        {props.products.filter(item => item.type == "main").map(item =>
                            <MainIngredient elem={item} key={item._id} />
                        )}
                    </ol>
                </div>
                <div className="burger-bottom mr-4">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={randomBun.name}
                        price={randomBun.price}
                        thumbnail={randomBun.image}
                    />
                </div>
            </div>
            <div className="burger-order mt-10 mr-5">
                <p className="text text_type_digits-medium total-price">30&nbsp;<CurrencyIcon type="primary" /></p>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2 text_type_main-default">
                    Оформить заказ
                </Button>
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

BurgerConstructor.propTypes = {
    products: PropTypes.arrayOf(ingredientPropTypes)
};

export default BurgerConstructor; 