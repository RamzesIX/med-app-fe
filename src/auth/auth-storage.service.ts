export interface IAuthStorageService {
    setAccessToken(token: string, expiresIn: number): void
    setRefreshToken(token: string, expiresIn: number): void
    getAccessToken(): string | null
    getAccessTokenExpirationTime(): number | null
    getRefreshToken(): string | null
    getRefreshTokenExpirationTime(): number | null
    clearAll(): void
}

class AuthStorageServiceImpl implements IAuthStorageService {
    private readonly authStorageKey = 'auth'
    private readonly accessTokenStorageKey = 'accessToken'
    private readonly accessTokenExpirationTimeStorageKey = 'accessTokenExpirationTime'
    private readonly refreshTokenStorageKey = 'refreshToken'
    private readonly refreshTokenExpirationTimeStorageKey = 'refreshTokenExpirationTime'

    public setAccessToken(token: string, expiresIn: number): void {
        localStorage.setItem(`${this.authStorageKey}/${this.accessTokenStorageKey}`, token)
        localStorage.setItem(`${this.authStorageKey}/${this.accessTokenExpirationTimeStorageKey}`, String(expiresIn))
    }

    public setRefreshToken(token: string, expiresIn: number): void {
        localStorage.setItem(`${this.authStorageKey}/${this.refreshTokenStorageKey}`, token)
        localStorage.setItem(`${this.authStorageKey}/${this.refreshTokenExpirationTimeStorageKey}`, String(expiresIn))
    }

    public getAccessToken(): string | null {
        return localStorage.getItem(`${this.authStorageKey}/${this.accessTokenStorageKey}`)
    }

    public getAccessTokenExpirationTime(): number | null {
        const expiresIn = localStorage.getItem(`${this.authStorageKey}/${this.accessTokenExpirationTimeStorageKey}`)
        return expiresIn ? Number(expiresIn) : null
    }

    public getRefreshToken(): string | null {
        return localStorage.getItem(`${this.authStorageKey}/${this.refreshTokenStorageKey}`)
    }

    public getRefreshTokenExpirationTime(): number | null {
        const expiresIn = localStorage.getItem(`${this.authStorageKey}/${this.refreshTokenExpirationTimeStorageKey}`)
        return expiresIn ? Number(expiresIn) : null
    }

    public clearAll() {
        localStorage.removeItem(`${this.authStorageKey}/${this.accessTokenStorageKey}`)
        localStorage.removeItem(`${this.authStorageKey}/${this.accessTokenExpirationTimeStorageKey}`)
        localStorage.removeItem(`${this.authStorageKey}/${this.refreshTokenStorageKey}`)
        localStorage.removeItem(`${this.authStorageKey}/${this.refreshTokenExpirationTimeStorageKey}`)
    }
}

export const AuthStorageService = new AuthStorageServiceImpl()
