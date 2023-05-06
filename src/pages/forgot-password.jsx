import React from 'react';
import { Link } from 'react-router-dom'
import styles from "./form.module.css";
import AppHeader from "../components/app-header/app-header";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPasswordPage() {
    const [mail, setMail] = React.useState("");

    return (
        <div className={styles.background}>
            <AppHeader />
            <div className={styles.main}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <form className={styles.form}>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setMail(e.target.value)}
                        value={mail}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        extraClass="mb-6"
                    />
                    <Button htmlType="button" type="primary" size="medium">
                        Восстановить
                    </Button>
                </form>
                <span className="text text_type_main-small text_color_inactive mt-20">
                    Вспомнили пароль?&nbsp;<Link to={`/login`} className={styles.link}>Войти</Link>
                </span>
            </div>
        </div>
    )
}