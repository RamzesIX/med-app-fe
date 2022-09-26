import { IRisk } from '../../risks/risks.types'
import { ISymptom } from '../../symptoms/symptoms.types'

export interface IDiseaseDetailsProps {
    id: string | null
}

export enum DiseaseFormField {
    Name = 'name',
    Description = 'description',
    Risks = 'risks',
    Symptoms = 'symptoms',
}

export interface IDiseaseForm {
    [DiseaseFormField.Name]: string
    [DiseaseFormField.Description]: string
    [DiseaseFormField.Symptoms]: ISymptom[]
    [DiseaseFormField.Risks]: IRisk[]
}

export interface IAutocompleteNewOption {
    newValue: string
}
