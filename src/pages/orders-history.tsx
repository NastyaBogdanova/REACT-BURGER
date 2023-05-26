import React, { useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styles from "./profile.module.css";
import AppHeader from "../components/app-header/app-header";

export const OrdersHistoryPage = () => {
    return (
        <div className={styles.background}>
            <AppHeader />
            <div className={`${styles.main} p-4`}>
            </div>
        </div>
    )
}