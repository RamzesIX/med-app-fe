import { DiseaseRoutingAction, IDisease } from '../diseases.types'
import { IPaginationHook } from '../../core/hooks/pagination/pagination.hook.types'
import { usePagination } from '../../core/hooks/pagination/pagination.hook'
import { DiseasesService } from '../diseases.service'
import { useNavigate } from 'react-router-dom'
import { ErrorHandler } from '../../services/error-handler'
import { ToastService } from '../../services/toast.service'

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

            let name = ''
            // TODO pass IDisease object into the function so no need to search for the name
            setData(
                data.filter((item) => {
                    if (item.id === id) {
                        name = item.name
                        return false
                    }
                    return true
                })
            )

            ToastService.showSuccess(`Disease ${name} has been deleted.`)
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
