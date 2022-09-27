export class ServerError extends Error {
    public statusCode: number

    constructor(message?: string, statusCode = 500) {
        super(message ?? 'Unexpected server error.')
        this.statusCode = statusCode
    }
}
