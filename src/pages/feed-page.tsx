import React, { useEffect } from 'react';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "../services/types/hooks";
import styles from "./feed-page.module.css";
import { Feed } from '../components/feed/feed';
import { FeedDetails } from "../components/feed/feed-details";
import Modal from "../components/modal/modal";
import { wsConnectionStart, wsConnectionClosed } from "../services/actions/webSocket";

export const FeedPage = () => {

    const { total, totalToday, orders } = useSelector(store => store.ws);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleCloseModal = (): void => {
        navigate("/feed");
    }

    useEffect(() => {
        dispatch(wsConnectionStart('/all'));
        return () => {
            dispatch(wsConnectionClosed());
        }
    }, []);

    return (
        <div className={styles.app}>
            <div className={`${styles.main} p-4`}>
                <div className="mb-10 mt-5">
                    <h1 className="title text text_type_main-large mb-5">Лента заказов</h1>
                    <Feed orders={orders} />
                </div>
                <div className={`${styles.container} mb-10 mt-20`}>
                    <div className={`${styles.status}`}>
                        <div>
                            <h2 className="text text_type_main-medium">Готовы:</h2>
                            <ul className={`${styles.list} ${styles.columns}`}>
                                {orders.slice(0, 10).filter((order) => order.status === 'done').map((order, index) => {
                                    return (<li className={`${styles.blue} text text_type_digits-default mb-2`} key={index}>{order.number}</li>)
                                })}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text text_type_main-medium">В работе:</h2>
                            <ul className={`${styles.list} ${styles.columns}`}>
                                {orders.slice(0, 10).filter((order) => order.status === 'pending').map((order, index) => {
                                    return (<li className="text text_type_digits-default mb-2" key={index}>{order.number}</li>)
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-15">
                        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                        <span className={`${styles.shadow} text text_type_digits-large`}>{total}</span>
                    </div>
                    <div className="mt-15">
                        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                        <span className={`${styles.shadow} text text_type_digits-large`}>{totalToday}</span>
                    </div>
                </div>
            </div>
            {location.state?.backgroundLocation &&
                <Modal onClose={handleCloseModal} title="">
                    <FeedDetails />
                </Modal>
            }
        </div>
    )
}