import { IPaginationParams, IPaginationResponse } from '../core/types'
import { ISymptom, SymptomCreatePayload, SymptomCreateResponse, SymptomUpdatePayload } from './symptoms.types'

export interface ISymptomsService {
    getSymptoms(params: IPaginationParams): Promise<IPaginationResponse<ISymptom>>
    // TODO remove it once Dropdown component is implemented.
    getAllSymptoms(): Promise<ISymptom[]>
    createSymptom(payload: SymptomCreatePayload): Promise<SymptomCreateResponse>
    updateSymptom(payload: SymptomUpdatePayload): Promise<void>
}
