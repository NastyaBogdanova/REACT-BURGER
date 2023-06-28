import styles from "./order-details.module.css";
import doneImagePath from '../../images/done.svg';
import { useSelector } from '../../services/types/hooks';
import { Oval } from 'react-loader-spinner';

const OrderDetails = () => {
    const { order } = useSelector(store => store.order);

    if (!order) {
        return (
            <div className={`${styles.loading} mt-10`}>
                <h1 className="text text_type_main-medium mb-15">Идёт загрузка заказа...</h1>
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
    }

    return (
        <div className={styles.container}>
            {order &&
                <>
                    <span className={`${styles.shadow} text text_type_digits-large mb-8`}>{order.order.number}</span>
                    <h3 className="text text_type_main-medium mb-15">идентификатор заказа</h3>
                    <div className={`${styles.pic} mb-15`}>
                        <img src={doneImagePath} alt="" />
                    </div>
                    <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
                </>
            }
        </div >
    )
}

export default OrderDetails;