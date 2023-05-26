import { Link } from 'react-router-dom';
import styles from "./form.module.css";
import AppHeader from "../components/app-header/app-header";

export const NotFound = () => {
    return (
        <div className={styles.background}>
            <AppHeader />
            <div className={styles.main}>
                <h2 className="text text_type_main-large mb-6">Упс! Ошибка 404</h2>
                <p className="text text_type_main-small">Такой страницы не существует :(</p>
                <span className="text text_type_main-small text_color_inactive mt-20">
                    Проверьте адрес страницы или попробйте перейти&nbsp;<Link to={`/`} className={styles.link}>на главную</Link>
                </span>
            </div>
        </div>
    )
}