import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={`${styles.header} p-4`}>
            <div className={styles.content}>
                <nav className={styles.nav}>
                    <a className={`${styles.link} text text_type_main-default text_color_primary pl-5 pr-5 pb-4 pt-4`} href="">
                        <BurgerIcon type="primary" />
                        Конструктор
                    </a>
                    <a className={`${styles.link} text text_type_main-default text_color_primary pl-5 pr-5 pb-4 pt-4`} href="">
                        <ListIcon type="secondary" />
                        Лента заказов
                    </a>
                </nav>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <a className={`${styles.link} text text_type_main-default text_color_primary pl-5 pr-5 pb-4 pt-4`} href="">
                    <ProfileIcon type="secondary" />
                    Личный кабинет
                </a>
            </div>
        </header>
    );
}

export default AppHeader; 