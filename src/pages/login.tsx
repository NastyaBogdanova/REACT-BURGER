import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "../services/types/hooks";
import styles from "./form.module.css";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../services/actions/user';

export const LoginPage = () => {

    const { loginFailed } = useSelector(store => store.user);

    const [mail, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const dispatch = useDispatch();

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(loginUser(mail, password));
    };

    return (
        <div className={styles.background}>
            <div className={styles.main}>
                <h2 className="text text_type_main-medium mb-6">Вход</h2>
                <form className={styles.form} onSubmit={submit}>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setMail(e.target.value)}
                        value={mail}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        extraClass="mb-6"
                        data-testid="email"
                    />
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        data-testid="password"
                    />
                    {loginFailed &&
                        <span className={`${styles.error} text text_type_main-small mt-2`}>Произошла ошибка, попробуйте ещё раз.</span>
                    }
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                        Войти
                    </Button>
                </form>
                <span className="text text_type_main-small text_color_inactive mt-20">
                    Вы — новый пользователь?&nbsp;<Link to={`/register`} className={styles.link}>Зарегистрироваться</Link>
                </span>
                <span className="text text_type_main-small text_color_inactive mt-2">
                    Забыли пароль?&nbsp;<Link to={`/forgot-password`} className={styles.link}>Восстановить пароль</Link>
                </span>
            </div>
        </div>
    )
}