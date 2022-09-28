import { HttpClient, IHttpClient } from '../services/http-client'
import { ErrorHandler, IErrorHandler } from '../services/error-handler'
import { AuthEvent, IAuthEvent, ISignInPayload, ISignInResponse } from './auth.types'
import { IResponse } from '../core/types'
import { AuthStorageService, IAuthStorageService } from './auth-storage.service'
import { BehaviorSubject, distinctUntilChanged, Observable, Subject } from 'rxjs'
import { AuthRequestInterceptor } from './auth-request-interceptor'
import { AuthResponseInterceptor } from './auth-response-interceptor'

export interface IAuthService {
    signIn(login: string, password: string): Promise<void>
    signOut(): void
    isAuthenticated(): boolean
    getAccessToken(): string | null
    isAuthenticated$: Observable<boolean>
    authEvents$: Observable<IAuthEvent>
}

class AuthServiceImpl implements IAuthService {
    private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated())
    public isAuthenticated$: Observable<boolean> = this.authSubject.asObservable().pipe(distinctUntilChanged())

    private authEventsSubject: Subject<IAuthEvent> = new Subject<IAuthEvent>()
    public authEvents$: Observable<IAuthEvent> = this.authEventsSubject.asObservable()

    constructor(
        private readonly httpClient: IHttpClient,
        private readonly errorHandler: IErrorHandler,
        private readonly authStorage: IAuthStorageService
    ) {
        this.initializeRequestInterceptor()
        this.initializeResponseInterceptor()
    }

    public async signIn(login: string, password: string): Promise<void> {
        const endpoint = '/auth/login'
        const body: ISignInPayload = { login, password }
        const { data } = await this.httpClient.post<ISignInPayload, IResponse<ISignInResponse>>(endpoint, body)
        this.saveTokens(data)
        this.authSubject.next(true)
        this.authEventsSubject.next({ event: AuthEvent.SignIn, payload: { userId: data.userId } })
    }

    public signOut(): void {
        this.clearTokens()
        this.authSubject.next(false)
        this.authEventsSubject.next({ event: AuthEvent.SignOut })
    }

    public isAuthenticated(): boolean {
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

    public getAccessToken(): string | null {
        return this.authStorage.getAccessToken()
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

    private initializeRequestInterceptor(): void {
        const requestInterceptor = new AuthRequestInterceptor(this, this.httpClient)
        requestInterceptor.initializeInterceptor()
    }

    private initializeResponseInterceptor(): void {
        const responseInterceptor = new AuthResponseInterceptor(this, this.httpClient, this.errorHandler)
        responseInterceptor.initializeInterceptor()
    }
}

export const AuthService = new AuthServiceImpl(HttpClient, ErrorHandler, AuthStorageService)
