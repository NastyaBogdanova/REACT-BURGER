import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from './services/types/hooks';
import { ProfilePage } from './pages/profile';
import { HomePage } from './pages/home';
import { RegisterPage } from './pages/register';
import { LoginPage } from './pages/login';
import { ForgotPasswordPage } from './pages/forgot-password';
import { ResetPasswordPage } from './pages/reset-password';
import { NotFound } from './pages/not-found';
import { ProfileOrders } from './components/profile/profile-orders';
import { IngredientPage } from './pages/ingredient';
import { ProtectedRouteElement } from './components/protected-route-element/protected-route-element';
import { FeedPage } from './pages/feed-page';
import { FeedDetailsPage } from './pages/feed-details-page';
import { ProfileInfo } from "./components/profile/profile-info";
import { OrderDetailsPage } from "./pages/order-details-page";
import { getIngridients } from './services/actions/ingredients';
import { getUser } from './services/actions/user';
import AppHeader from './components/app-header/app-header';

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngridients());
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
                {location.state == null &&
                    <Route path="/profile/orders/:id" element={<ProtectedRouteElement onlyForUnauth={false} element={<OrderDetailsPage />} />} />
                }
                <Route path="/profile" element={<ProtectedRouteElement onlyForUnauth={false} element={<ProfilePage />} />} >
                    <Route path="/profile" element={<ProtectedRouteElement onlyForUnauth={false} element={<ProfileInfo />} />} />
                    <Route path="/profile/orders" element={<ProtectedRouteElement onlyForUnauth={false} element={<ProfileOrders />} />} />
                    <Route path="/profile/orders/:id" element={<ProtectedRouteElement onlyForUnauth={false} element={location.state?.backgroundLocation && <ProfileOrders />} />} />
                </Route>
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/feed/:id" element={location.state?.backgroundLocation ? <FeedPage /> : <FeedDetailsPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App;
