export enum LoginFormField {
    Email = 'email',
    Password = 'password',
}

export interface ILoginForm {
    [LoginFormField.Email]: string
    [LoginFormField.Password]: string
}
