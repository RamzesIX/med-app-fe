export interface IGlobalConstants {
    apiUrl: string
}

export const globalConstants: IGlobalConstants = {
    apiUrl: process.env.APP_API ?? 'http://localhost:4000',
}
