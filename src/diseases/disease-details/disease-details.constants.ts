import { DiseaseFormField, IDiseaseForm } from './disease-details.types'

export const defaultDiseaseFormValues: IDiseaseForm = {
    [DiseaseFormField.Name]: '',
    [DiseaseFormField.Description]: '',
}
