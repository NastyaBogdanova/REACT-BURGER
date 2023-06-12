import React, { useEffect } from 'react';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "../../services/types/hooks";
import styles from "./profile-right.module.css";
import { Feed } from "../feed/feed";


export const ProfileOrders = () => {
    const { orders } = useSelector(store => store.ws);
    return (
        <div className={`${styles.container} mt-10`}>
            <Feed orders={orders} />
        </div>
    )
}