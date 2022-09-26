import * as yup from 'yup'
import { validationMessage } from '../../core/validation'
import { SymptomDialogFormField } from './symptom-dialog.types'

export const symptomDialogValidation = yup.object({
    [SymptomDialogFormField.Name]: yup.string().required(validationMessage.isRequired),
    [SymptomDialogFormField.Description]: yup.string().required(validationMessage.isRequired),
})
