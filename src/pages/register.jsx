import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styles from "./form.module.css";
import AppHeader from "../components/app-header/app-header";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../services/actions/user';

export function RegisterPage() {
    const { registerFailed } = useSelector(store => store.user);

    const [name, setName] = React.useState("");
    const [mail, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const dispatch = useDispatch();

    const submit = async (e) => {
        e.preventDefault();
        await dispatch(registerUser(name, mail, password));
    };

    return (
        <div className={styles.background}>
            <AppHeader />
            <div className={styles.main}>
                <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
                <form className={styles.form} onSubmit={submit}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        extraClass="mb-6"
                        required
                    />
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setMail(e.target.value)}
                        value={mail}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        extraClass="mb-6"
                        required
                    />
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        required
                    />
                    {registerFailed &&
                        <span className={`${styles.error} text text_type_main-small mt-2`}>Произошла ошибка, попробуйте ещё раз.</span>
                    }
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                        Зарегистрироваться
                    </Button>
                </form>
                <span className="text text_type_main-small text_color_inactive mt-20">
                    Уже зарегистрированы?&nbsp;<Link to={`/login`} className={styles.link}>Войти</Link>
                </span>
            </div>
        </div>
    )
}

