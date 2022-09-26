import { IRisk } from '../risks.types'
import { usePagination } from '../../core/hooks/pagination/pagination.hook'
import { RisksMockService } from '../risks-mock.service'
import { IPaginationHook } from '../../core/hooks/pagination/pagination.hook.types'

export interface IRisksHook extends Omit<IPaginationHook<IRisk>, 'data'> {
    risks: IRisk[]
    loading: boolean
}

const loadRisks = RisksMockService.getRisks.bind(RisksMockService)

export const useRisks = (): IRisksHook => {
    const { loading, data, canLoadMore, loadNext } = usePagination<IRisk>(loadRisks)

    return {
        risks: data,
        loading,
        canLoadMore,
        loadNext,
    }
}
