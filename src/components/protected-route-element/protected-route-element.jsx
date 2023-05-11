import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../services/actions/user';

export function ProtectedRouteElement({ element, onlyForUnauth }) {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getUser())
    }, []);

    const { loggedIn } = useSelector(store => store.user);

    if (onlyForUnauth && !loggedIn) {
        return element;
    }
    if (onlyForUnauth && loggedIn) {
        return <Navigate to="/" />;
    }
    if (!loggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return element;
} 