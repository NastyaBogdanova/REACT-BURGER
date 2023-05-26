import styles from "./app-header.module.css";
import { NavLink, useMatch } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { RootState } from "../../utils/types";

const AppHeader = () => {
    const isMain = useMatch("/");
    const isOrders = useMatch("/profile/orders");
    const isProfile = useMatch("/profile");

    const userName = useSelector((store: RootState) => store.user.user?.name);

    return (
        <header className={`${styles.header} p-4`}>
            <div className={styles.content}>
                <nav className={styles.nav}>
                    <NavLink to={`/`} className={({ isActive }) => (isActive ? `${styles.link} text text_type_main-default text_color_primary pr-5 pb-4 pt-4` : `${styles.link} text text_type_main-default text_color_inactive pr-5 pb-4 pt-4`)}>
                        <BurgerIcon type={isMain ? "primary" : "secondary"} />
                        Конструктор
                    </NavLink>
                    <NavLink to={'/profile/orders'} className={({ isActive }) => (isActive ? `${styles.link} text text_type_main-default text_color_primary pl-5 pr-5 pb-4 pt-4` : `${styles.link} text text_type_main-default text_color_inactive pl-5 pr-5 pb-4 pt-4`)}>
                        <ListIcon type={isOrders ? "primary" : "secondary"} />
                        Лента заказов
                    </NavLink>
                </nav>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <NavLink to={`/profile`} end className={({ isActive }) => (isActive ? `${styles.link} text text_type_main-default text_color_primary pl-5 pb-4 pt-4` : `${styles.link} text text_type_main-default text_color_inactive pl-5 pb-4 pt-4`)}>
                    <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                    {userName ? userName : "Личный кабинет"}
                </NavLink>
            </div>
        </header >
    );
}

export default AppHeader; 