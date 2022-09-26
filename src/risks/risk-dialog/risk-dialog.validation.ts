import * as yup from 'yup'
import { validationMessage } from '../../core/validation'
import { RiskDialogFormField } from './risk-dialog.types'

export const riskDialogValidation = yup.object({
    [RiskDialogFormField.Name]: yup.string().required(validationMessage.isRequired),
    [RiskDialogFormField.Description]: yup.string().required(validationMessage.isRequired),
})
