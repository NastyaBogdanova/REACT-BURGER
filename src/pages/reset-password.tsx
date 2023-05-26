import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import styles from "./form.module.css";
import AppHeader from "../components/app-header/app-header";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../services/actions/password';
import { RootState } from "../utils/types";

export const ResetPasswordPage = () => {

    const { resetPasswordFailed, resetPasswordSuccess } = useSelector((store: RootState) => store.password);

    const [password, setPassword] = React.useState("");
    const [code, setCode] = React.useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.state?.fromForgotPassword) {
            navigate('/forgot-password');
        }
    }, []);

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        //@ts-ignore
        dispatch(resetPassword(password, code));
    };

    if (resetPasswordSuccess) {
        navigate('/login');
        setPassword("");
        setCode("");
    }

    return (
        <div className={styles.background}>
            <AppHeader />
            <div className={styles.main}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <form className={styles.form} onSubmit={submit}>
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder={'Введите новый пароль'}
                        name={'password'}
                        extraClass="mb-6"
                        required
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setCode(e.target.value)}
                        value={code}
                        name={'code'}
                        error={false}
                        errorText={'Ошибка'}
                        required
                    />
                    {resetPasswordFailed &&
                        <span className={`${styles.error} text text_type_main-small mt-2`}>Произошла ошибка, попробуйте ещё раз.</span>
                    }
                    {resetPasswordSuccess &&
                        <span className={`${styles.success} text text_type_main-small mt-2`}>Пароль успешно изменён.</span>
                    }
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
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