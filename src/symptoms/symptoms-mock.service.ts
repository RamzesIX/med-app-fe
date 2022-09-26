import { ISymptom, SymptomCreatePayload, SymptomCreateResponse, SymptomUpdatePayload } from './symptoms.types'
import { IPaginationParams, IPaginationResponse } from '../core/types'
import { ISymptomsService } from './symptoms.service.types'
import { delay } from '../core/utils'

const symptoms: ISymptom[] = new Array(100)
    .fill(null)
    .map((_, index) => ({ id: String(index + 1), name: `Symptom Name ${index + 1}`, description: `Description ${index + 1}` }))

export class SymptomMockServiceImpl implements ISymptomsService {
    public async getSymptoms({ offset, limit }: IPaginationParams): Promise<IPaginationResponse<ISymptom>> {
        console.debug('SymptomMockServiceImpl', offset, limit)
        await delay(2000)
        const total = symptoms.length
        if (offset >= total) {
            return { data: [], meta: { limit, total, offset } }
        }
        const data = symptoms.slice(offset, offset + limit)
        console.debug('SymptomMockServiceImpl.data', data)
        return { data, meta: { total, limit, offset: offset + limit } }
    }

    public async getAllSymptoms(): Promise<ISymptom[]> {
        return symptoms
    }

    public async createSymptom(payload: SymptomCreatePayload): Promise<SymptomCreateResponse> {
        console.debug('SymptomMockServiceImpl.createSymptom', payload)
        await delay(2000)
        const id = String(Date.now().toString())
        symptoms.push({ id, ...payload })
        return { id }
    }

    public async updateSymptom(payload: SymptomUpdatePayload): Promise<void> {
        console.debug('SymptomMockServiceImpl.updateSymptom', payload)
        await delay(2000)
        const index = symptoms.findIndex(({ id }) => payload.id === id)
        if (!index) {
            throw new Error(`Symptom with id:${payload.id} is not found.`)
        }
        symptoms[index] = payload
    }
}
