import { IRisk } from '../../risks/risks.types'
import { ISymptom } from '../../symptoms/symptoms.types'

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

export interface IAutocompleteOption {
    id: string
    name: string
    newValue?: string
}
