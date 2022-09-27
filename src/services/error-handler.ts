import { ServerError } from '../core/errors'
import { IToastService, ToastService } from './toast.service'

export interface IErrorHandler {
    handleError(error: unknown): void
}

class ErrorHandlerImpl implements IErrorHandler {
    constructor(private readonly toastService: IToastService) {}

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
        this.toastService.showError(errorMessage)
    }
}

export const ErrorHandler = new ErrorHandlerImpl(ToastService)
