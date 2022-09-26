import { ReactElement } from 'react'
import { useAuth } from '../auth.hook'
import { Navigate } from 'react-router-dom'

export interface IGuardedRouteProps {
    children: ReactElement
}

export const GuardedRoute = ({ children }: IGuardedRouteProps): ReactElement => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        console.debug('User is not authenticated.')
        return <Navigate to="/login" replace />
    }

    return children
}
