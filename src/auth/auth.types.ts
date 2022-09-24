export interface ISignInResponse {
    accessToken: string
    accessTokenExpirationTime: number
    refreshToken: string
    refreshTokenExpirationTime: number
}

export interface ISignInPayload {
    login: string
    password: string
}

export class AuthStorageMissingDataError extends Error {
    constructor(key: string) {
        super(`AuthStorage data is missing, key: ${key}`)
    }
}
