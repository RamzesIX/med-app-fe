import { IErrorHandler } from '../services/error-handler'
import { IHttpClient } from '../services/http-client'
import { IAuthService } from './auth.service'
import { AxiosError } from 'axios'
import { ServerError } from '../core/errors'
import { IServerErrorResponse } from '../core/types'

// Split into two classes: AuthResponseInterceptor and HttpResponseInterceptor
export class AuthResponseInterceptor {
    constructor(
        private readonly authService: IAuthService,
        private readonly httpClient: IHttpClient,
        private readonly errorHandler: IErrorHandler
    ) {}

    public initializeInterceptor(): void {
        this.httpClient.interceptors.response.use(
            (response) => response,
            async (error: AxiosError<IServerErrorResponse>) => {
                const serverError = this.convertAxiosError(error)
                if (serverError.statusCode === 403) {
                    this.errorHandler.handleError(error.message)
                    // TODO navigate user back?
                    throw serverError
                }
                if (serverError.statusCode !== 401) {
                    throw serverError
                }
                // TODO implement request retry
                this.authService.signOut()
            }
        )
    }

    private convertAxiosError(error: AxiosError<IServerErrorResponse>): ServerError {
        const message = error.response?.data.message
        const statusCode = error.response?.data.statusCode ?? error?.response?.status
        return new ServerError(message, statusCode)
    }
}
