import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs'
import { IAuthService } from './auth.service'

class AuthMockServiceImpl implements IAuthService {
    private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    public isAuthenticated$: Observable<boolean> = this.authSubject.asObservable().pipe(distinctUntilChanged())

    public async signIn(login: string, password: string): Promise<void> {
        console.log(`AuthMockService.signIn, Login: ${login}, Password: ${password}`)
        await new Promise<void>((res) => {
            setTimeout(() => {
                res()
            }, 2000)
        })
        this.authSubject.next(true)
    }

    public signOut(): void {
        console.log(`AuthMockService.signOut`)
        this.authSubject.next(false)
    }
}

export const AuthMockService = new AuthMockServiceImpl()
