import { DiseaseCreatePayload, DiseaseUpdatePayload } from '../diseases.types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, UseFormReturn } from 'react-hook-form'
import { DiseaseFormField, IDiseaseForm } from './disease-details.types'
import { defaultDiseaseFormValues } from './disease-details.constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { diseaseDetailsValidation } from './disease-details.validation'
import { ErrorHandler } from '../../services/error-handler'
import { DiseasesService } from '../diseases.service'
import { IRisk } from '../../risks/risks.types'
import { ISymptom, SymptomCreatePayload } from '../../symptoms/symptoms.types'
import { RisksService } from '../../risks/risks.service'
import { SymptomsService } from '../../symptoms/symptoms.service'

interface IDiseaseDetailsHookOptionsState {
    risks: IRisk[]
    symptoms: ISymptom[]
}

interface IDiseaseDetailsHookState {
    loading: boolean
    form: UseFormReturn<IDiseaseForm>
    options: IDiseaseDetailsHookOptionsState
}

export interface IDiseaseDetailsHook extends IDiseaseDetailsHookState {
    createDisease(payload: DiseaseCreatePayload): void
    updateDisease(payload: DiseaseUpdatePayload): void
    goBack(): void
    addSymptom(payload: SymptomCreatePayload): void
}

export function useDiseaseDetails(id: string | null): IDiseaseDetailsHook {
    const [loading, setLoading] = useState<boolean>(false)
    const [options, setOptions] = useState<IDiseaseDetailsHookOptionsState>({ risks: [], symptoms: [] })

    const navigate = useNavigate()

    const form = useForm<IDiseaseForm>({
        defaultValues: defaultDiseaseFormValues,
        mode: 'onBlur',
        resolver: yupResolver(diseaseDetailsValidation),
    })

    const { reset, setValue, getValues } = form

    useEffect(() => {
        async function init(diseaseId: string): Promise<void> {
            try {
                setLoading(true)
                const { name, description, risks, symptoms } = await DiseasesService.getDisease(diseaseId)
                reset({ name, description, risks, symptoms })
            } catch (e) {
                ErrorHandler.handleError(e)
            } finally {
                setLoading(false)
            }
        }

        // Requesting the disease by ID and resetting the form state
        if (id) {
            void init(id)
        }
    }, [id, reset])

    // Initializing dropdown options. Ideally, we should load a chunk of options using Infinite Scrolling.
    useEffect(() => {
        async function init(): Promise<void> {
            try {
                const [risks, symptoms] = await Promise.all([RisksService.getAllRisks(), SymptomsService.getAllSymptoms()])
                setOptions({ risks, symptoms })
            } catch (e) {
                ErrorHandler.handleError(e)
            }
        }

        void init()
    }, [])

    const goBack = (): void => {
        navigate('/diseases')
    }

    const createDisease = async (payload: DiseaseCreatePayload): Promise<void> => {
        try {
            await DiseasesService.createDisease(payload)
            navigate('/diseases')
        } catch (e) {
            ErrorHandler.handleError(e)
        }
    }

    const updateDisease = async (payload: DiseaseUpdatePayload): Promise<void> => {
        try {
            await DiseasesService.updateDisease(payload)
            navigate('/diseases')
        } catch (e) {
            ErrorHandler.handleError(e)
        }
    }

    const addSymptom = (payload: SymptomCreatePayload): void => {
        const symptoms = getValues(DiseaseFormField.Symptoms)
        symptoms.push({ id: Date.now().toString(), ...payload })
        setValue(DiseaseFormField.Symptoms, symptoms, { shouldValidate: true, shouldDirty: true })
    }

    return {
        options,
        loading,
        form,
        createDisease,
        updateDisease,
        goBack,
        addSymptom,
    }
}
