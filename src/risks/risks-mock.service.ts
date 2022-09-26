import { IRisk } from './risks.types'
import { IPaginationParams, IPaginationResponse } from '../core/types'
import { IRisksService } from './risks.service.types'

const risks: IRisk[] = new Array(100)
    .fill(null)
    .map((_, index) => ({ id: String(index + 1), name: `Risk Name ${index + 1}`, description: `Description ${index + 1}` }))

export class RisksMockServiceImpl implements IRisksService {
    public async getRisks({ offset, limit }: IPaginationParams): Promise<IPaginationResponse<IRisk>> {
        console.debug('RisksMockServiceImpl.getRisks', offset, limit)
        const total = risks.length
        if (offset >= total) {
            return { data: [], meta: { limit, total, offset } }
        }
        const data = risks.slice(offset, offset + limit)
        console.debug('RisksMockServiceImpl.getRisks Data', data)
        return { data: risks.slice(offset, offset + limit), meta: { total, limit, offset: offset + limit } }
    }

    public async getAllRisks(): Promise<IRisk[]> {
        return risks
    }
}
