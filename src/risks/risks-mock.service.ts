import { IPaginationParams, IPaginationResponse } from '../core/types'
import { IRisk } from './risks.types'
import { IRisksService } from './risks.service'

const risks: IRisk[] = new Array(100)
    .fill(null)
    .map((_, index) => ({ id: String(index + 1), name: `Risk Name ${index + 1}`, description: `Description ${index + 1}` }))

class RisksMockServiceImpl implements IRisksService {
    public async getRisks({ offset, limit }: IPaginationParams): Promise<IPaginationResponse<IRisk>> {
        console.debug('RisksMockServiceImpl', offset, limit)
        const total = risks.length
        if (offset >= total) {
            return { data: [], meta: { limit, total, offset } }
        }
        console.debug('data', risks.slice(offset, offset + limit))
        return { data: risks.slice(offset, offset + limit), meta: { total, limit, offset: offset + limit } }
    }
}

export const RisksMockService = new RisksMockServiceImpl()
