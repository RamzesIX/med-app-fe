import { globalConstants } from '../core/constants'
import toast from 'react-hot-toast'

export interface IToastService {
    showSuccess(message: string): void
    showError(error: string): void
}

class ToastServiceImpl implements IToastService {
    private readonly defaultConfig = { duration: globalConstants.toastDuration }

    public showSuccess(message: string): void {
        toast.success(message, this.defaultConfig)
    }

    public showError(error: string): void {
        toast.error(error, this.defaultConfig)
    }
}

export const ToastService = new ToastServiceImpl()
