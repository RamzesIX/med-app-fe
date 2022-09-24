import { ServerError } from '../core/errors'

export interface IErrorHandler {
    handleError(error: unknown): void
}

class ErrorHandlerImpl implements IErrorHandler {
    // TODO Show Toast
    public handleError(error: unknown) {
        let errorMessage = 'Unknown Error.'
        if (typeof error === 'string') {
            errorMessage = error
        } else if (error instanceof Error) {
            errorMessage = error.message

            if (error instanceof ServerError) {
                // TODO handle error
            }
        }
        console.error(errorMessage)
    }
}

export const ErrorHandler = new ErrorHandlerImpl()
