import React from 'react';
import { useSelector, useDispatch } from "../../services/types/hooks";
import styles from "./profile-right.module.css";
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { editUser } from '../../services/actions/user';
import { RootState } from "../../services/types/index";

export const ProfileInfo = () => {

    const dispatch = useDispatch();

    const { user, editUserFailed, editUserSuccess } = useSelector((store: RootState) => store.user);

    const [name, setName] = React.useState(user.name);
    const [mail, setMail] = React.useState(user.email);
    const [password, setPassword] = React.useState('');

    const [isInputChanged, setisInputChanged] = React.useState(false);

    const cancelEdit = (): void => {
        if (user) {
            setName(user.name);
            setMail(user.email);
            setPassword('');
            setisInputChanged(false);
        }
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
        setisInputChanged(true);
    };
    const onMailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setMail(e.target.value);
        setisInputChanged(true);
    };
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        setisInputChanged(true);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(editUser(mail, name, password));
        setisInputChanged(false);
    };

    return (
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
    )
}