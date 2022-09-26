import { IDiseasesCardHookState } from './diseases-card.types'

export const defaultDiseasesCardState: IDiseasesCardHookState = {
    risks: [],
    symptoms: [],
    risksLoading: false,
    symptomsLoading: false,
    actionLoading: false,
}
