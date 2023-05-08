import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styles from "./profile.module.css";
import AppHeader from "../components/app-header/app-header";
import { Input, PasswordInput, EmailInput, EditIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { logOutUser } from '../services/actions/user';

export function ProfilePage() {
    const { logOutFailed, loggedIn, user } = useSelector(store => store.user);

    const [name, setName] = React.useState(user.name);
    const [mail, setMail] = React.useState(user.email);
    const [password, setPassword] = React.useState('password');

    const dispatch = useDispatch();

    const onClick = async (e) => {
        e.preventDefault();
        await dispatch(logOutUser());
    };

    if (!loggedIn) {
        return (
            <Navigate
                to={'/login'}
            />
        );
    }

    return (
        <div className={styles.background}>
            <AppHeader />
            <div className={`${styles.main} p-4`}>
                <div className={styles.box}>
                    <div className={styles.leftbox}>
                        <nav className={styles.nav}>
                            <a className={`${styles.button} text text_type_main-large`}>Профиль</a>
                            <a className={`${styles.button} text text_type_main-large text_color_inactive`}>История заказов</a>
                            <a className={`${styles.button} text text_type_main-large text_color_inactive`} onClick={onClick}>Выход</a>
                        </nav>
                        {logOutFailed &&
                            <span className={`${styles.error} text text_type_main-small mt-2`}>При выходе произошла ошибка, попробуйте ещё раз.</span>
                        }
                        <span className="text text_type_main-small text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</span>
                    </div>
                    <div className={styles.info}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => setName(e.target.value)}
                            icon={'EditIcon'}
                            value={name}
                            name={'name'}
                            size={'default'}
                            extraClass="mb-6"
                        />
                        <EmailInput
                            onChange={e => setMail(e.target.value)}
                            value={mail}
                            name={'email'}
                            placeholder="Логин"
                            isIcon={true}
                            extraClass="mb-6"
                        />
                        <PasswordInput
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            name={'password'}
                            icon="EditIcon"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}