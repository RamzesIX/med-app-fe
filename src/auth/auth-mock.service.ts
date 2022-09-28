import { BehaviorSubject, distinctUntilChanged, Observable, Subject } from 'rxjs'
import { IAuthService } from './auth.service'
import { AuthEvent, IAuthEvent } from './auth.types'

class AuthMockServiceImpl implements IAuthService {
    private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    public isAuthenticated$: Observable<boolean> = this.authSubject.asObservable().pipe(distinctUntilChanged())
    private authEventsSubject: Subject<IAuthEvent> = new Subject<IAuthEvent>()
    public authEvents$: Observable<IAuthEvent> = this.authEventsSubject.asObservable()

    public async signIn(login: string, password: string): Promise<void> {
        console.debug(`AuthMockService.signIn, Login: ${login}, Password: ${password}`)
        await new Promise<void>((res) => {
            setTimeout(() => {
                res()
            }, 2000)
        })

        this.authSubject.next(true)
        this.authEventsSubject.next({ event: AuthEvent.SignOut })
    }

    public signOut(): void {
        console.debug(`AuthMockService.signOut`)
        this.authSubject.next(false)
        this.authEventsSubject.next({ event: AuthEvent.SignOut })
    }

    public isAuthenticated(): boolean {
        return this.authSubject.value
    }

    public getAccessToken(): string | null {
        return this.authSubject.value ? 'token' : null
    }
}

export const AuthMockService = new AuthMockServiceImpl()
