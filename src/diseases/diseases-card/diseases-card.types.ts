import { IRisk } from '../../risks/risks.types'
import { ISymptom } from '../../symptoms/symptoms.types'

export interface IDiseasesCardHook extends IDiseasesCardHookState {
    loadRisks(): void
    loadSymptoms(): void
}

export interface IDiseasesCardHookState {
    risks: IRisk[]
    symptoms: ISymptom[]
    risksLoading: boolean
    symptomsLoading: boolean
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
