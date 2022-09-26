import { DiseaseCreatePayload, DiseaseUpdatePayload } from '../diseases.types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, UseFormReturn } from 'react-hook-form'
import { IDiseaseForm } from './disease-details.types'
import { defaultDiseaseFormValues } from './disease-details.constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { diseaseDetailsValidation } from './disease-details.validation'
import { ErrorHandler } from '../../services/error-handler'
import { DiseasesMockService } from '../diseases-mock.service'

interface IDiseaseDetailsHookState {
    loading: boolean
    form: UseFormReturn<IDiseaseForm>
}

export interface IDiseaseDetailsHook extends IDiseaseDetailsHookState {
    createDisease(payload: DiseaseCreatePayload): void
    updateDisease(payload: DiseaseUpdatePayload): void
    goBack(): void
}

export function useDiseaseDetails(id: string | null): IDiseaseDetailsHook {
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const form = useForm<IDiseaseForm>({
        defaultValues: defaultDiseaseFormValues,
        mode: 'onBlur',
        resolver: yupResolver(diseaseDetailsValidation),
    })

    const { reset } = form

    useEffect(() => {
        async function init(diseaseId: string): Promise<void> {
            try {
                setLoading(true)
                const { name, description } = await DiseasesMockService.getDisease(diseaseId)
                reset({ name, description })
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

    const goBack = (): void => {
        navigate('/diseases')
    }

    const createDisease = async (payload: DiseaseCreatePayload): Promise<void> => {
        try {
            await DiseasesMockService.createDisease(payload)
            navigate('/diseases')
        } catch (e) {
            ErrorHandler.handleError(e)
        }
    }

    const updateDisease = async (payload: DiseaseUpdatePayload): Promise<void> => {
        try {
            await DiseasesMockService.updateDisease(payload)
            navigate('/diseases')
        } catch (e) {
            ErrorHandler.handleError(e)
        }
    }

    return {
        loading,
        form,
        createDisease,
        updateDisease,
        goBack,
    }
}
