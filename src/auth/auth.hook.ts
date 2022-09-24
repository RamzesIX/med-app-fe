import { AuthService, IAuthService } from './auth.service'
import { useEffect, useState } from 'react'
import { AuthMockService } from './auth-mock.service'

export interface IAuthHook extends Pick<IAuthService, 'signIn' | 'signOut'> {
    isAuthenticated: boolean
}

const authService = process.env.NODE_ENV === 'development' ? AuthMockService : AuthService

export const useAuth = (): IAuthHook => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated())

    useEffect(() => {
        const sub = authService.isAuthenticated$.subscribe((isAuth) => setIsAuthenticated(isAuth))

        return () => sub.unsubscribe()
    }, [])

    return {
        signIn: authService.signIn.bind(authService),
        signOut: authService.signOut.bind(authService),
        isAuthenticated,
    }
}
