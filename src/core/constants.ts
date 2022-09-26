export interface IGlobalConstants {
    apiUrl: string
    paginationLimit: number
}

export const globalConstants: IGlobalConstants = {
    apiUrl: process.env.APP_API ?? 'http://localhost:4000',
    paginationLimit: 20,
}
