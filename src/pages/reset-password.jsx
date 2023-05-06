import React from 'react';
import { Link } from 'react-router-dom'
import styles from "./form.module.css";
import AppHeader from "../components/app-header/app-header";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPasswordPage() {
    const [password, setPassword] = React.useState("");
    const [code, setCode] = React.useState("");

    return (
        <div className={styles.background}>
            <AppHeader />
            <div className={styles.main}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <form className={styles.form}>
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder={'Введите новый пароль'}
                        name={'password'}
                        extraClass="mb-6"
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setCode(e.target.value)}
                        value={code}
                        name={'code'}
                        error={false}
                        errorText={'Ошибка'}
                        extraClass="mb-6"
                    />
                    <Button htmlType="button" type="primary" size="medium">
                        Сохранить
                    </Button>
                </form>
                <span className="text text_type_main-small text_color_inactive mt-20">
                    Вспомнили пароль?&nbsp;<Link to={`/login`} className={styles.link}>Войти</Link>
                </span>
            </div>
        </div>
    )
}