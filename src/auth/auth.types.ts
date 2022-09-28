export interface ISignInResponse {
    userId: string
    accessToken: string
    accessTokenExpirationTime: number
    refreshToken: string
    refreshTokenExpirationTime: number
}

export interface ISignInPayload {
    login: string
    password: string
}

export enum AuthEvent {
    SignIn,
    SignOut,
}

export interface IAuthSignInEventPayload {
    userId: string
}

export interface IAuthEvent {
    event: AuthEvent
    payload?: IAuthSignInEventPayload
}

export class AuthStorageMissingDataError extends Error {
    constructor(key: string) {
        super(`AuthStorage data is missing, key: ${key}`)
    }
}
