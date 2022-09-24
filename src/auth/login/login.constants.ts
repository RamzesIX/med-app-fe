import { ILoginForm, LoginFormField } from './login.types'

export const defaultLoginValues: ILoginForm = {
    [LoginFormField.Email]: '',
    [LoginFormField.Password]: '',
}
