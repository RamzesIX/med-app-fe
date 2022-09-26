import { IPaginationParams, IPaginationResponse } from '../core/types'
import { DiseaseCreatePayload, DiseaseUpdatePayload, IDisease, IDiseaseCreateResponse, IDiseaseDetails } from './diseases.types'
import { ISymptom } from '../symptoms/symptoms.types'
import { IRisk } from '../risks/risks.types'

export interface IDiseasesService {
    getDiseases(params: IPaginationParams): Promise<IPaginationResponse<IDisease>>
    getDisease(diseaseId: string): Promise<IDiseaseDetails>
    getDiseaseSymptoms(diseaseId: string): Promise<ISymptom[]>
    getDiseaseRisks(diseaseId: string): Promise<IRisk[]>
    createDisease(payload: DiseaseCreatePayload): Promise<IDiseaseCreateResponse>
    updateDisease(payload: DiseaseUpdatePayload): Promise<void>
    deleteDisease(diseaseId: string): Promise<void>
}
