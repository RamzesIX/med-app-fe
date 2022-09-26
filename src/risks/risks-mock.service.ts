import { IRisk, RiskCreatePayload, RiskCreateResponse, RiskUpdatePayload } from './risks.types'
import { IPaginationParams, IPaginationResponse } from '../core/types'
import { IRisksService } from './risks.service.types'
import { delay } from '../core/utils'

const risks: IRisk[] = new Array(100)
    .fill(null)
    .map((_, index) => ({ id: String(index + 1), name: `Risk Name ${index + 1}`, description: `Description ${index + 1}` }))

export class RisksMockServiceImpl implements IRisksService {
    public async getRisks({ offset, limit }: IPaginationParams): Promise<IPaginationResponse<IRisk>> {
        console.debug('RisksMockServiceImpl.getRisks', offset, limit)
        await delay(2000)
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

    public async createRisk(payload: RiskCreatePayload): Promise<RiskCreateResponse> {
        console.debug('RisksMockServiceImpl.createRisk', payload)
        await delay(2000)
        const id = String(Date.now().toString())
        risks.push({ id, ...payload })
        return { id }
    }

    public async updateRisk(payload: RiskUpdatePayload): Promise<void> {
        console.debug('RisksMockServiceImpl.updateRisk', payload)
        await delay(2000)
        const index = risks.findIndex(({ id }) => payload.id === id)
        if (!index) {
            throw new Error(`Risk with id:${payload.id} is not found.`)
        }
        risks[index] = payload
    }
}
