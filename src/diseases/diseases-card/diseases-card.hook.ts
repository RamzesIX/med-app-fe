import { useRef, useState } from 'react'
import { DiseasesService } from '../diseases.service'
import { ErrorHandler } from '../../services/error-handler'
import { IDiseasesCardHook, IDiseasesCardHookMeta, IDiseasesCardHookState } from './diseases-card.types'
import { defaultDiseasesCardState } from './diseases-card.constants'

export function useDiseasesCard(diseaseId: string, onDelete: (id: string) => Promise<void>): IDiseasesCardHook {
    const metaRef = useRef<IDiseasesCardHookMeta>({ symptomsLoaded: false, risksLoaded: false })
    const [state, setState] = useState<IDiseasesCardHookState>(defaultDiseasesCardState)

    const loadRisks: VoidFunction = () => {
        if (metaRef.current.risksLoaded) {
            return
        }
        async function load(): Promise<void> {
            try {
                setState((prevState) => ({ ...prevState, risksLoading: true }))
                const risks = await DiseasesService.getDiseaseRisks(diseaseId)
                metaRef.current.risksLoaded = true
                setState((prevState) => ({ ...prevState, risks, risksLoading: false }))
            } catch (e) {
                ErrorHandler.handleError(e)
                setState((prevState) => ({ ...prevState, risksLoading: false }))
            }
        }

        void load()
    }

    const loadSymptoms: VoidFunction = () => {
        if (metaRef.current.symptomsLoaded) {
            return
        }
        async function load(): Promise<void> {
            try {
                setState((prevState) => ({ ...prevState, symptomsLoading: true }))
                const symptoms = await DiseasesService.getDiseaseSymptoms(diseaseId)
                metaRef.current.symptomsLoaded = true
                setState((prevState) => ({ ...prevState, symptoms, symptomsLoading: false }))
            } catch (e) {
                ErrorHandler.handleError(e)
                setState((prevState) => ({ ...prevState, symptomsLoading: false }))
            }
        }

        void load()
    }

    const deleteDisease = async (): Promise<void> => {
        try {
            setState((prevState) => ({ ...prevState, actionLoading: true }))
            await onDelete(diseaseId)
            setState((prevState) => ({ ...prevState, actionLoading: false }))
        } catch (e) {
            setState((prevState) => ({ ...prevState, actionLoading: false }))
            ErrorHandler.handleError(e)
        }
    }

    return {
        ...state,
        loadRisks,
        loadSymptoms,
        deleteDisease,
    }
}
