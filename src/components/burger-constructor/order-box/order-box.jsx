import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "../burger-constructor.module.css";
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import { resetIngredients } from '../../../services/actions/constructor';
import { sendOrder } from '../../../services/actions/order';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderBox = () => {

    const [isModalOpen, setModalOpen] = React.useState(false);

    const { bun, stuffings } = useSelector(store => store.constructor);

    const { failed } = useSelector(store => store.order);

    const dispatch = useDispatch();

    const totalPrice = useMemo(() => {
        if (stuffings || bun) {
            return (stuffings ? stuffings.reduce((sum, item) => sum + item.price, 0) : 0) + (bun ? bun.price * 2 : 0);
        } else {
            return 0;
        }
    }, [bun, stuffings]);

    const orderModalOpen = () => {
        setModalOpen(true);
    };

    const orderModalClose = () => {
        setModalOpen(false);
        dispatch(resetIngredients());

    };

    const submit = () => {
        const ingredientsId = [bun, ...stuffings, bun].map(item => item._id);
        dispatch(sendOrder(ingredientsId, orderModalOpen));
    }

    return (
        <>
            <div className={`${styles.order} mt-10 mr-5`}>
                <p className={`${styles.total} text text_type_digits-medium`}>{totalPrice}&nbsp;<CurrencyIcon type="primary" /></p>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2 text_type_main-default" onClick={submit} disabled={!stuffings || !stuffings.length || !bun}>
                    Оформить заказ
                </Button>
                {isModalOpen &&
                    <Modal onClose={orderModalClose} title=" ">
                        <OrderDetails />
                    </Modal>
                }
            </div>
            {failed &&
                <span className={`${styles.error} text text_type_main-small`}>Произошла ошибка при формировании заказа!</span>
            }
        </>
    );
}

export default OrderBox; 