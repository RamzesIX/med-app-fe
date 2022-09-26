import './styles/global.scss'
import { AppMain } from './layout/main/main'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './auth/login/login'
// import { GuardedRoute } from './auth/guarded-route/guarded-route'
import { RisksList } from './risks/risks-list/risks-list'
import { SymptomsList } from './symptoms/symptoms-list/symptoms-list'

export function App() {
    return (
        <Routes>
            <Route path="/" element={<AppMain />}>
                <Route path="/" element={<Navigate replace to="/symptoms" />} />
                <Route path="/symptoms" element={<SymptomsList />}></Route>
                <Route path="/risks" element={<RisksList />}></Route>
            </Route>
            <Route path="login" element={<LoginPage />} />
        </Routes>
    )
}
