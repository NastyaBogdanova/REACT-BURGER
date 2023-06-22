import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "../services/types/hooks";
import styles from "./profile.module.css";
import { logOutUser } from '../services/actions/user';
import { FeedDetails } from "../components/feed/feed-details";
import Modal from "../components/modal/modal";
import { wsConnectionProfileStart, wsConnectionProfileClosed } from "../services/actions/webSocketProfile";
import { getCookie } from '../utils/cookie';

export const ProfilePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { logOutFailed } = useSelector(store => store.user);
    const { ordersProfile } = useSelector(store => store.wsProfile);

    const logOut = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        dispatch(logOutUser());
    };

    const handleCloseModal = (): void => {
        navigate("/profile/orders");
    }

    useEffect(() => {
        dispatch(wsConnectionProfileStart(`?token=${getCookie('token')}`));
        return () => {
            dispatch(wsConnectionProfileClosed());
        }
    }, []);

    return (
        <div className={styles.background}>
            <div className={`${styles.main} p-4`}>
                <div className={styles.box}>
                    <div className={styles.leftbox}>
                        <nav className={styles.nav}>
                            <NavLink to='/profile' end className={({ isActive }) => (isActive ? `${styles.button} text_color_primary text text_type_main-large` : `${styles.button} text text_type_main-large text_color_inactive`)}>Профиль</NavLink>
                            <NavLink to='/profile/orders' className={({ isActive }) => (isActive ? `${styles.button} text_color_primary text text_type_main-large` : `${styles.button} text text_type_main-large text_color_inactive`)}>История заказов</NavLink>
                            <a className={`${styles.button} text text_type_main-large text_color_inactive`} onClick={logOut}>Выход</a>
                        </nav>
                        {logOutFailed &&
                            <span className={`${styles.error} text text_type_main-small mt-2`}>При выходе произошла ошибка, попробуйте ещё раз.</span>
                        }
                        <span className="text text_type_main-small text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</span>
                    </div>
                    <Outlet />
                </div>
            </div>
            {location.state?.backgroundLocation &&
                <Modal onClose={handleCloseModal} title="">
                    <FeedDetails orders={ordersProfile} />
                </Modal>
            }
        </div>
    )
}