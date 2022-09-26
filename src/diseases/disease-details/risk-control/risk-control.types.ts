import { Control } from 'react-hook-form'
import { IAutocompleteOption, IDiseaseForm } from '../disease-details.types'
import { IRisk, RiskCreatePayload } from '../../../risks/risks.types'

export interface IRiskControlProps {
    loading: boolean
    options: IRisk[]
    control: Control<IDiseaseForm>
    onSubmit(payload: RiskCreatePayload): void
}

export type RiskOption = IRisk & IAutocompleteOption
