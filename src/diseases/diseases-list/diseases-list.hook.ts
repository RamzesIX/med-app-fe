import { DiseaseRoutingAction, IDisease } from '../diseases.types'
import { IPaginationHook } from '../../core/hooks/pagination/pagination.hook.types'
import { usePagination } from '../../core/hooks/pagination/pagination.hook'
import { DiseasesService } from '../diseases.service'
import { useNavigate } from 'react-router-dom'
import { ErrorHandler } from '../../services/error-handler'

export interface IDiseasesListHook extends IPaginationHook<IDisease> {
    navigateToDiseaseDetails(id: string | null): void
    deleteDisease(id: string): Promise<void>
}

const loadData = DiseasesService.getDiseases.bind(DiseasesService)

export function useDiseasesList(): IDiseasesListHook {
    const navigate = useNavigate()
    const paginationState = usePagination<IDisease>(loadData)

    const { setData, getData } = paginationState

    const navigateToDiseaseDetails = (id: string | null) => {
        const path = id ? `/diseases/${DiseaseRoutingAction.Update}/${id}` : `/diseases/${DiseaseRoutingAction.Create}`
        navigate(path)
    }

    const deleteDisease = async (id: string): Promise<void> => {
        try {
            await DiseasesService.deleteDisease(id)
            const data = getData()
            setData(data.filter((item) => item.id !== id))
        } catch (e) {
            ErrorHandler.handleError(e)
        }
    }

    return {
        ...paginationState,
        navigateToDiseaseDetails,
        deleteDisease,
    }
}
