import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "../../services/types/hooks";
import { getUser } from '../../services/actions/user';
import { RootState } from "../../services/types/index";

export const ProtectedRouteElement = ({ element, onlyForUnauth }: TProtectedRouteElement) => {

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getUser());
    }, []);

    const { loggedIn } = useSelector((store: RootState) => store.user);

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

type TProtectedRouteElement = {
    element: JSX.Element;
    onlyForUnauth: boolean;
};