import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import styles from "./form.module.css";
import AppHeader from "../components/app-header/app-header";
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../services/actions/password';
import { RootState } from "../utils/types";

export const ForgotPasswordPage = () => {

    const { forgotPasswordFailed, forgotPasswordSuccess } = useSelector((store: RootState) => store.password);

    const [mail, setMail] = React.useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        //@ts-ignore
        dispatch(forgotPassword(mail));
    };

    if (forgotPasswordSuccess) {
        navigate('/reset-password', { state: { fromForgotPassword: true } });
    }

    return (
        <div className={styles.background}>
            <AppHeader />
            <div className={styles.main}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <form className={styles.form} onSubmit={submit}>
                    <EmailInput
                        onChange={e => setMail(e.target.value)}
                        value={mail}
                        name={'email'}
                        required
                    />
                    {forgotPasswordFailed &&
                        <span className={`${styles.error} text text_type_main-small mt-2`}>Произошла ошибка, попробуйте ещё раз.</span>
                    }
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
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