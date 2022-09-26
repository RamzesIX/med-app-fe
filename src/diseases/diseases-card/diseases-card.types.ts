import { IRisk } from '../../risks/risks.types'
import { ISymptom } from '../../symptoms/symptoms.types'
import { IDisease } from '../diseases.types'

export interface IDiseasesCardProps extends IDisease {
    className?: string
    onDelete(id: string): Promise<void>
    onEdit(id: string): void
}

export interface IDiseasesCardHook extends IDiseasesCardHookState {
    loadRisks(): void
    loadSymptoms(): void
    deleteDisease(): Promise<void>
}

export interface IDiseasesCardHookState {
    risks: IRisk[]
    symptoms: ISymptom[]
    risksLoading: boolean
    symptomsLoading: boolean
    actionLoading: boolean
}

export interface IDiseasesCardHookMeta {
    risksLoaded: boolean
    symptomsLoaded: boolean
}

export enum DiseaseCardAccordion {
    Risks = 'DiseasesCardRisks',
    Symptoms = 'DiseasesCardSymptoms',
    None = 'DiseasesCardNone',
}
