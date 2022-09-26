import * as yup from 'yup'
import { validationMessage } from '../../core/validation'
import { DiseaseFormField } from './disease-details.types'

export const diseaseDetailsValidation = yup.object({
    [DiseaseFormField.Name]: yup.string().required(validationMessage.isRequired),
    [DiseaseFormField.Description]: yup.string().required(validationMessage.isRequired),
})
