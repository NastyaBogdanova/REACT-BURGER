import React, { useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styles from "./profile.module.css";
import AppHeader from "../components/app-header/app-header";
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logOutUser, editUser } from '../services/actions/user';

export function ProfilePage() {
    const dispatch = useDispatch();

    const { logOutFailed, user, editUserFailed, editUserSuccess } = useSelector(store => store.user);

    const [name, setName] = React.useState(user.name);
    const [mail, setMail] = React.useState(user.email);
    const [password, setPassword] = React.useState('');

    const [isInputChanged, setisInputChanged] = React.useState(false);

    const cancelEdit = () => {
        if (user) {
            setName(user.name);
            setMail(user.email);
            setPassword('');
            setisInputChanged(false);
        }
    }
    const logOut = async (e) => {
        e.preventDefault();
        await dispatch(logOutUser());
    };

    const onNameChange = (e) => {
        setName(e.target.value);
        setisInputChanged(true);
    };
    const onMailChange = (e) => {
        setMail(e.target.value);
        setisInputChanged(true);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        setisInputChanged(true);
    };
    const submit = async (e) => {
        e.preventDefault();
        await dispatch(editUser(mail, name, password));
        setisInputChanged(false);
    };

    return (
        <div className={styles.background}>
            <AppHeader />
            <div className={`${styles.main} p-4`}>
                <div className={styles.box}>
                    <div className={styles.leftbox}>
                        <nav className={styles.nav}>
                            <NavLink to='/profile' className={({ isActive }) => (isActive ? `${styles.button} text_color_primary text text_type_main-large` : `${styles.button} text text_type_main-large text_color_inactive`)}>Профиль</NavLink>
                            <NavLink to='/profile/orders' className={({ isActive }) => (isActive ? `${styles.button} text_color_primary text text_type_main-large` : `${styles.button} text text_type_main-large text_color_inactive`)}>История заказов</NavLink>
                            <a className={`${styles.button} text text_type_main-large text_color_inactive`} onClick={logOut}>Выход</a>
                        </nav>
                        {logOutFailed &&
                            <span className={`${styles.error} text text_type_main-small mt-2`}>При выходе произошла ошибка, попробуйте ещё раз.</span>
                        }
                        <span className="text text_type_main-small text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</span>
                    </div>
                    <form className={styles.info} onSubmit={submit}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onNameChange}
                            icon={'EditIcon'}
                            value={name}
                            name={'name'}
                            size={'default'}
                            extraClass="mb-6"
                        />
                        <EmailInput
                            onChange={onMailChange}
                            value={mail}
                            name={'email'}
                            placeholder="Логин"
                            isIcon={true}
                            extraClass="mb-6"
                            icon={'EditIcon'}
                        />
                        <PasswordInput
                            onChange={onPasswordChange}
                            value={password}
                            name={'password'}
                            icon="EditIcon"
                        />
                        {editUserFailed &&
                            <span className={`${styles.error} text text_type_main-small mt-2`}>Произошла ошибка при сохранении данных, попробуйте ещё раз.</span>
                        }
                        {editUserSuccess &&
                            <span className={`${styles.success} text text_type_main-small mt-2`}>Ваши данные успешно изменены.</span>
                        }
                        {isInputChanged &&
                            <div className={styles.buttons}>
                                <Button htmlType="button" type="secondary" size="medium" onClick={cancelEdit}>
                                    Отмена
                                </Button>
                                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                                    Сохранить
                                </Button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}