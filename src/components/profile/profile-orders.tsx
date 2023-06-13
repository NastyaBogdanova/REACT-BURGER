import React, { useEffect } from 'react';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "../../services/types/hooks";
import styles from "./profile-right.module.css";
import { Feed } from "../feed/feed";
import { wsConnectionStart, wsConnectionClosed } from "../../services/actions/webSocket";
import { getCookie } from 'typescript-cookie';

export const ProfileOrders = () => {

    let accessToken = getCookie('token');

    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(wsConnectionStart(`?token=${accessToken}`));
        }
        return () => {
            dispatch(wsConnectionClosed());
        }
    }, []);

    return (
        <div className={`${styles.container} mt-10`}>
            <Feed />
        </div>
    )
}