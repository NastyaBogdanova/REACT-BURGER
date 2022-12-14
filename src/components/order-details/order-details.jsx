import styles from "./order-details.module.css";
import doneImagePath from '../../images/done.svg';

const OrderDetails = () => {
    return (
        <div className={styles.container}>
            <span className="text text_type_digits-large mb-8">000000</span>
            <h3 className="text text_type_main-medium mb-15">идентификатор заказа</h3>
            <div className={`${styles.pic} mb-15`}>
                <img src={doneImagePath} alt="" />
            </div>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;