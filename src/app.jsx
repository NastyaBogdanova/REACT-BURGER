import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfilePage } from './pages/profile';
import { HomePage } from './pages/home';
import { RegisterPage } from './pages/register';
import { LoginPage } from './pages/login';
import { ForgotPasswordPage } from './pages/forgot-password';
import { ResetPasswordPage } from './pages/reset-password';
import { NotFound } from './pages/not-found';
import { OrdersHistoryPage } from './pages/orders-history';
import { ProtectedRouteElement } from './components/protected-route-element/protected-route-element';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<ProtectedRouteElement onlyForUnauth={true} element={<RegisterPage />} />} />
                <Route path="/login" element={<ProtectedRouteElement onlyForUnauth={true} element={<LoginPage />} />} />
                <Route path="/forgot-password" element={<ProtectedRouteElement onlyForUnauth={true} element={<ForgotPasswordPage />} />} />
                <Route path="/reset-password" element={<ProtectedRouteElement onlyForUnauth={true} element={<ResetPasswordPage />} />} />
                <Route path="/not-found404" element={<NotFound />} />
                <Route path="/profile" element={<ProtectedRouteElement onlyForUnauth={false} element={<ProfilePage />} />} />
                <Route path="/profile/orders" element={<ProtectedRouteElement onlyForUnauth={false} element={<OrdersHistoryPage />} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
