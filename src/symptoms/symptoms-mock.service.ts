import { IPaginationParams, IPaginationResponse } from '../core/types'
import { ISymptom } from './symptoms.types'
import { ISymptomsService } from './symptoms.service'

const symptoms: ISymptom[] = new Array(100)
    .fill(null)
    .map((_, index) => ({ id: String(index + 1), name: `Symptom Name ${index + 1}`, description: `Description ${index + 1}` }))

class SymptomMockServiceImpl implements ISymptomsService {
    public async getSymptoms({ offset, limit }: IPaginationParams): Promise<IPaginationResponse<ISymptom>> {
        console.debug('SymptomMockServiceImpl', offset, limit)
        const total = symptoms.length
        if (offset >= total) {
            return { data: [], meta: { limit, total, offset } }
        }
        const data = symptoms.slice(offset, offset + limit)
        console.debug('SymptomMockServiceImpl.data', data)
        return { data, meta: { total, limit, offset: offset + limit } }
    }
}

export const SymptomsMockService = new SymptomMockServiceImpl()
