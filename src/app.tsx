import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProfilePage } from './pages/profile';
import { HomePage } from './pages/home';
import { RegisterPage } from './pages/register';
import { LoginPage } from './pages/login';
import { ForgotPasswordPage } from './pages/forgot-password';
import { ResetPasswordPage } from './pages/reset-password';
import { NotFound } from './pages/not-found';
import { OrdersHistoryPage } from './pages/orders-history';
import { IngredientPage } from './pages/ingredient';
import { ProtectedRouteElement } from './components/protected-route-element/protected-route-element';
import { getIngridients } from './services/actions/ingredients';
import { getUser } from './services/actions/user';
import AppHeader from './components/app-header/app-header';

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        //@ts-ignore
        dispatch(getIngridients());
        //@ts-ignore
        dispatch(getUser());
    }, []);

    const location = useLocation();

    return (
        <Routes>
            <Route path="/" element={<AppHeader />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/ingredients/:id" element={location.state?.backgroundLocation ? <HomePage /> : <IngredientPage />} />
                <Route path="/register" element={<ProtectedRouteElement onlyForUnauth={true} element={<RegisterPage />} />} />
                <Route path="/login" element={<ProtectedRouteElement onlyForUnauth={true} element={<LoginPage />} />} />
                <Route path="/forgot-password" element={<ProtectedRouteElement onlyForUnauth={true} element={<ForgotPasswordPage />} />} />
                <Route path="/reset-password" element={<ProtectedRouteElement onlyForUnauth={true} element={<ResetPasswordPage />} />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/profile" element={<ProtectedRouteElement onlyForUnauth={false} element={<ProfilePage />} />} />
                <Route path="/profile/orders" element={<ProtectedRouteElement onlyForUnauth={false} element={<OrdersHistoryPage />} />} />
            </Route>
        </Routes>
    )
}

export default App;
