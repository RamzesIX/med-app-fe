import { ReactNode } from 'react'
import { useAuth } from '../auth.hook'
import { Navigate } from 'react-router-dom'

export interface IGuardedRouteProps {
    children: ReactNode
}

export const GuardedRoute = ({ children }: IGuardedRouteProps): ReactNode => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        console.debug('User is not authenticated.')
        return <Navigate to="/login" replace />
    }

    return children
}
