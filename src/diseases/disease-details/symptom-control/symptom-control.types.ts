import { ISymptom, SymptomCreatePayload } from '../../../symptoms/symptoms.types'
import { Control } from 'react-hook-form'
import { IAutocompleteNewOption, IDiseaseForm } from '../disease-details.types'

export interface ISymptomControlProps {
    loading: boolean
    options: ISymptom[]
    control: Control<IDiseaseForm>
    onSubmit(payload: SymptomCreatePayload): void
}

export type SymptomOption = ISymptom & Partial<IAutocompleteNewOption>
