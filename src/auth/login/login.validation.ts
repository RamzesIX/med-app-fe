import * as yup from 'yup'
import { validationMessage } from '../../core/validation'

export const loginValidation = yup.object({
    email: yup.string().required(validationMessage.isRequired).email(validationMessage.invalidEmail),
    password: yup.string().required(validationMessage.isRequired),
})
