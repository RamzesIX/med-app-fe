import { IUser } from './users.types'
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs'
import { AuthService, IAuthService } from '../auth/auth.service'
import { AuthEvent } from '../auth/auth.types'
import { ErrorHandler } from '../services/error-handler'
import { HttpClient, IHttpClient } from '../services/http-client'

export interface IUsersService {
    getCurrentUser(): IUser | null
    currentUser$: Observable<IUser | null>
}

class UsersServiceImpl implements IUsersService {
    private readonly userStorageKey = 'user'
    private readonly currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null)
    public readonly currentUser$: Observable<IUser | null> = this.currentUserSubject.asObservable()

    constructor(private readonly httpClient: IHttpClient, authService: IAuthService) {
        // No need to unsubscribe until the service is Singleton
        authService.authEvents$
            .pipe(
                filter(({ event }) => event === AuthEvent.SignIn || event === AuthEvent.SignOut),
                switchMap(async ({ event, payload }) => {
                    if (event === AuthEvent.SignIn && payload) {
                        return this.loadCurrentUser(payload.userId)
                    }
                    this.removeUserFromStorage()
                    return null
                })
            )
            .subscribe((user) => {
                console.log('currentUserSubject', user)
                this.currentUserSubject.next(user)
            })

        void this.init()
    }

    public getCurrentUser(): IUser | null {
        return this.currentUserSubject.value
    }

    private async init(): Promise<void> {
        try {
            let currentUser = this.getUserFromStorage()
            console.log('currentUserSubject', currentUser)
            if (currentUser) {
                currentUser = await this.loadCurrentUser(currentUser.id)
                this.currentUserSubject.next(currentUser)
            }
        } catch (e) {
            ErrorHandler.handleError(e)
        }
    }

    private async loadCurrentUser(userId: string): Promise<IUser | null> {
        try {
            const { data } = await this.httpClient.get<IUser>(`/users/${userId}`)
            this.saveUserToStorage(data)
            return data
        } catch (e) {
            ErrorHandler.handleError(e)
            return null
        }
    }

    private saveUserToStorage(user: IUser): void {
        localStorage.setItem(this.userStorageKey, JSON.stringify(user))
    }

    private getUserFromStorage(): IUser | null {
        const data = localStorage.getItem(this.userStorageKey)
        return data ? JSON.parse(data) : null
    }

    private removeUserFromStorage(): void {
        localStorage.removeItem(this.userStorageKey)
    }
}

export const UsersService = new UsersServiceImpl(HttpClient, AuthService)
