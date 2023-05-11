import styles from "./app-header.module.css";
import { NavLink } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={`${styles.header} p-4`}>
            <div className={styles.content}>
                <nav className={styles.nav}>
                    <NavLink to={`/`} className={({ isActive }) => (isActive ? `${styles.link} text text_type_main-default text_color_primary pr-5 pb-4 pt-4` : `${styles.link} text text_type_main-default text_color_inactive pr-5 pb-4 pt-4`)}>
                        <BurgerIcon type="secondary" />
                        Конструктор
                    </NavLink>
                    <NavLink to='/profile/orders' className={({ isActive }) => (isActive ? `${styles.link} text text_type_main-default text_color_primary pl-5 pr-5 pb-4 pt-4` : `${styles.link} text text_type_main-default text_color_inactive pl-5 pr-5 pb-4 pt-4`)}>
                        <ListIcon type="secondary" />
                        Лента заказов
                    </NavLink>
                </nav>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <NavLink to={`/profile`} className={({ isActive }) => (isActive ? `${styles.link} text text_type_main-default text_color_primary pl-5 pb-4 pt-4` : `${styles.link} text text_type_main-default text_color_inactive pl-5 pb-4 pt-4`)}>
                    <ProfileIcon type="secondary" />
                    Личный кабинет
                </NavLink>
            </div>
        </header>
    );
}

export default AppHeader; 