import { usePagination } from '../../core/hooks/pagination/pagination.hook'

import { IPaginationHook } from '../../core/hooks/pagination/pagination.hook.types'
import { ISymptom } from '../symptoms.types'
import { SymptomsService } from '../symptoms.service'

export interface ISymptomsHook extends Pick<IPaginationHook<ISymptom>, 'loadNext'> {
    symptoms: ISymptom[]
    loading: boolean
}

const loadSymptoms = SymptomsService.getSymptoms.bind(SymptomsService)

export const useSymptoms = (): ISymptomsHook => {
    const { loading, data, loadNext } = usePagination<ISymptom>(loadSymptoms)

    return {
        symptoms: data,
        loading,
        loadNext,
    }
}
