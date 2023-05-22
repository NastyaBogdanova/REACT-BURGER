import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../services/actions/user';
import PropTypes from 'prop-types';

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
        if (location.state?.from) {
            return <Navigate to={location.state.from} />;
        } else {
            return <Navigate to="/" />;
        }
    }
    if (!loggedIn) {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    return element;
}

ProtectedRouteElement.propTypes = {
    element: PropTypes.element.isRequired,
    onlyForUnauth: PropTypes.bool
};