export interface IGlobalConstants {
    apiUrl: string
    paginationLimit: number
    circularProgressSize: number
    toastDuration: number
}

export const globalConstants: IGlobalConstants = {
    apiUrl: process.env.APP_API ?? 'http://localhost:4000',
    paginationLimit: 20,
    circularProgressSize: 25,
    toastDuration: 4000,
}
