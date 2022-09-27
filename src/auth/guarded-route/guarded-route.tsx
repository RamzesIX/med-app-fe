import { ReactElement } from 'react'
import { useAuth } from '../auth.hook'
import { Navigate, Outlet } from 'react-router-dom'

export interface IGuardedRouteProps {
    children: ReactElement
}

export const GuardedRoute = (): ReactElement => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        console.debug('User is not authenticated.')
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
