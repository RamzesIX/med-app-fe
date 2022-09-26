import { IRisk } from '../risks/risks.types'
import { ISymptom } from '../symptoms/symptoms.types'

export interface IDisease {
    id: string
    name: string
    description: string
}

export interface IDiseaseDetails extends IDisease {
    risks: IRisk[]
    symptoms: ISymptom[]
}

export type DiseaseUpdatePayload = IDiseaseDetails

export type DiseaseCreatePayload = Omit<DiseaseUpdatePayload, 'id'>

export interface IDiseaseCreateResponse {
    id: string
}

export enum DiseaseRoutingAction {
    Create = 'create',
    Update = 'update',
}
