import './styles/global.scss'
import { AppMain } from './layout/main/main'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './auth/login/login'
import { GuardedRoute } from './auth/guarded-route/guarded-route'

export function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <GuardedRoute>
                        <AppMain />
                    </GuardedRoute>
                }
            />
            <Route path="login" element={<LoginPage />} />
        </Routes>
    )
}
