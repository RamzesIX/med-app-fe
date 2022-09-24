import { HttpClient, IHttpClient } from '../services/http-client'
import { ErrorHandler, IErrorHandler } from '../services/error-handler'
import { ISignInPayload, ISignInResponse } from './auth.types'
import { IResponse } from '../core/types'
import { AuthStorageService, IAuthStorageService } from './auth-storage.service'
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs'

export interface IAuthService {
    signIn(login: string, password: string): Promise<void>
    signOut(): void
    isAuthenticated$: Observable<boolean>
}

class AuthServiceImpl implements IAuthService {
    private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated())
    public isAuthenticated$: Observable<boolean> = this.authSubject.asObservable().pipe(distinctUntilChanged())

    constructor(
        private readonly httpClient: IHttpClient,
        private readonly errorHandler: IErrorHandler,
        private readonly authStorage: IAuthStorageService
    ) {}

    public async signIn(login: string, password: string): Promise<void> {
        try {
            const endpoint = '/auth/signIn'
            const body: ISignInPayload = { login, password }
            const { data } = await this.httpClient.post<ISignInPayload, IResponse<ISignInResponse>>(endpoint, body)
            this.saveTokens(data)
            this.authSubject.next(true)
        } catch (e) {
            this.errorHandler.handleError(e)
        }
    }

    // TODO redirect to Login page
    public signOut(): void {
        this.clearTokens()
        this.authSubject.next(false)
    }

    private isAuthenticated(): boolean {
        const accessToken = this.authStorage.getAccessToken()
        if (!accessToken) {
            return false
        }
        if (!this.isTokenExpired(this.authStorage.getAccessTokenExpirationTime())) {
            return true
        }
        return true
        // TODO uncomment once refresh token flow is supported
        // return !this.isTokenExpired(this.authStorage.getAccessTokenExpirationTime())
    }

    private isTokenExpired(expiresIn: number | null): boolean {
        if (!expiresIn) {
            return false
        }
        return expiresIn < Date.now() / 1000
    }

    private saveTokens({ accessToken, accessTokenExpirationTime, refreshToken, refreshTokenExpirationTime }: ISignInResponse): void {
        this.authStorage.setAccessToken(accessToken, accessTokenExpirationTime)
        this.authStorage.setRefreshToken(refreshToken, refreshTokenExpirationTime)
    }

    private clearTokens(): void {
        this.authStorage.clearAll()
    }
}

export const AuthService = new AuthServiceImpl(HttpClient, ErrorHandler, AuthStorageService)
