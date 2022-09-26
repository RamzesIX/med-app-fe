import './styles/global.scss'
import { AppMain } from './layout/main/main'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './auth/login/login'
// import { GuardedRoute } from './auth/guarded-route/guarded-route'
import { RisksList } from './risks/risks-list/risks-list'
import { SymptomsList } from './symptoms/symptoms-list/symptoms-list'
import { DiseasesList } from './diseases/diseases-list/diseases-list'
import { DiseaseDetails } from './diseases/disease-details/disease-details'
import { DiseaseRoutingAction } from './diseases/diseases.types'

export function App() {
    return (
        <Routes>
            <Route path="/" element={<AppMain />}>
                <Route path="/" element={<Navigate replace to="/diseases" />} />
                <Route path="/diseases" element={<DiseasesList />} />
                <Route path={`/diseases/${DiseaseRoutingAction.Create}`} element={<DiseaseDetails />} />
                <Route path={`/diseases/${DiseaseRoutingAction.Update}/:id`} element={<DiseaseDetails />} />
                <Route path="/symptoms" element={<SymptomsList />} />
                <Route path="/risks" element={<RisksList />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
        </Routes>
    )
}
