import React from 'react';
import "./app-header.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className="header p-4">
            <div className="content">
                <nav className="nav">
                    <a className="text text_type_main-default link text_color_primary pl-5 pr-5 pb-4 pt-4" href="">
                        <BurgerIcon type="primary" />
                        Конструктор
                    </a>
                    <a className="text text_type_main-default link text_color_inactive pl-5 pr-5 pb-4 pt-4" href="">
                        <ListIcon type="secondary" />
                        Лента заказов
                    </a>
                </nav>
                <div className="logo">
                    <Logo />
                </div>
                <a className="text text_type_main-default link text_color_inactive pl-5 pr-5 pb-4 pt-4" href="">
                    <ProfileIcon type="secondary" />
                    Личный кабинет
                </a>
            </div>
        </header>
    );
}

export default AppHeader; 