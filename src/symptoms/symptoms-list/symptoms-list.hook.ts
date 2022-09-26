import { usePagination } from '../../core/hooks/pagination/pagination.hook'

import { IPaginationHook } from '../../core/hooks/pagination/pagination.hook.types'
import { SymptomsMockService } from '../symptoms-mock.service'
import { ISymptom } from '../symptoms.types'

export interface ISymptomsHook extends Omit<IPaginationHook<ISymptom>, 'data'> {
    symptoms: ISymptom[]
    loading: boolean
}

const loadSymptoms = SymptomsMockService.getSymptoms.bind(SymptomsMockService)

export const useSymptoms = (): ISymptomsHook => {
    const { loading, data, canLoadMore, loadNext } = usePagination<ISymptom>(loadSymptoms)

    return {
        symptoms: data,
        loading,
        canLoadMore,
        loadNext,
    }
}
