import { IDisease } from '../diseases.types'
import { IPaginationHook } from '../../core/hooks/pagination/pagination.hook.types'
import { usePagination } from '../../core/hooks/pagination/pagination.hook'
import { DiseasesMockService } from '../diseases-mock.service'

export interface IDiseasesListHook extends IPaginationHook<IDisease> {
    openCreateDiseaseDialog(): void
    openUpdateDiseaseDialog(id: string): void
    deleteDisease(id: string): void
}

const loadData = DiseasesMockService.getDiseases.bind(DiseasesMockService)

export function useDiseasesList(): IDiseasesListHook {
    const paginationState = usePagination<IDisease>(loadData)

    const openCreateDiseaseDialog: VoidFunction = () => {
        console.debug('openCreateDiseaseDialog')
    }

    const openUpdateDiseaseDialog = (id: string) => {
        console.debug('openUpdateDiseaseDialog', id)
    }

    const deleteDisease = (id: string): void => {
        console.debug('deleteDisease', id)
    }

    return {
        ...paginationState,
        openCreateDiseaseDialog,
        openUpdateDiseaseDialog,
        deleteDisease,
    }
}
