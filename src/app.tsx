import './styles/global.scss'
import { AppMain } from './layout/main/main'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { LoginPage } from './auth/login/login'
import { GuardedRoute } from './auth/guarded-route/guarded-route'
import { RisksList } from './risks/risks-list/risks-list'
import { SymptomsList } from './symptoms/symptoms-list/symptoms-list'
import { DiseasesList } from './diseases/diseases-list/diseases-list'
import { DiseaseDetails } from './diseases/disease-details/disease-details'
import { DiseaseRoutingAction } from './diseases/diseases.types'
import { useEffect } from 'react'
import { AuthService } from './auth/auth.service'
import { filter, skip } from 'rxjs'

export function App() {
    const navigate = useNavigate()
    const location = useLocation()

    const isLoginPageActive = location.pathname === '/login'

    // Navigates a user to Login page after sign out
    useEffect(() => {
        const sub = AuthService.isAuthenticated$
            .pipe(
                skip(1),
                filter((authenticated) => !authenticated && !isLoginPageActive)
            )
            .subscribe(() => {
                navigate('/login')
            })

        return () => sub.unsubscribe()
    }, [isLoginPageActive, navigate])

    return (
        <Routes>
            <Route path="/" element={<GuardedRoute />}>
                <Route path="/" element={<AppMain />}>
                    <Route path="/" element={<Navigate replace to="/diseases" />} />
                    <Route path="/diseases" element={<DiseasesList />} />
                    <Route path={`/diseases/${DiseaseRoutingAction.Create}`} element={<DiseaseDetails />} />
                    <Route path={`/diseases/${DiseaseRoutingAction.Update}/:id`} element={<DiseaseDetails />} />
                    <Route path="/symptoms" element={<SymptomsList />} />
                    <Route path="/risks" element={<RisksList />} />
                </Route>
            </Route>

            <Route path="login" element={<LoginPage />} />
        </Routes>
    )
}
