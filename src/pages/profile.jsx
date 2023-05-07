import React from 'react';
import styles from "./profile.module.css";
import AppHeader from "../components/app-header/app-header";
import { Input, PasswordInput, EmailInput, EditIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfilePage() {
    const [name, setName] = React.useState('Марк');
    const [mail, setMail] = React.useState('bob@example.com');
    const [password, setPassword] = React.useState('password')
    return (
        <div className={styles.background}>
            <AppHeader />
            <div className={`${styles.main} p-4`}>
                <div className={styles.box}>
                    <nav className={styles.nav}>
                        <a className={`${styles.button} text text_type_main-large`}>Профиль</a>
                        <a className={`${styles.button} text text_type_main-large text_color_inactive`}>История заказов</a>
                        <a className={`${styles.button} text text_type_main-large text_color_inactive`}>Выход</a>
                        <span className="text text_type_main-small text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</span>
                    </nav>
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