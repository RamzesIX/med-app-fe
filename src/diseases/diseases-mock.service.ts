import { IPaginationParams, IPaginationResponse } from '../core/types'
import { DiseaseCreatePayload, DiseaseUpdatePayload, IDisease, IDiseaseCreateResponse, IDiseaseDetails } from './diseases.types'
import { ISymptom } from '../symptoms/symptoms.types'
import { IRisk } from '../risks/risks.types'
import { IDiseasesService } from './diseases.service'
import { delay } from '../core/utils'

function generateNestedData(id: string, label: string): Array<IRisk | ISymptom> {
    return new Array(10).fill(null).map((_, index) => ({
        id: String(index + 1),
        name: `Disease ${id}, ${label} ${id}`,
        description: `Disease ${id}, ${label} description ${index + 1}`,
    }))
}

let diseases: IDiseaseDetails[] = new Array(100).fill(null).map((_, index) => ({
    id: String(index + 1),
    name: `Disease ${index + 1}`,
    description: `Disease description ${index + 1}`,
    symptoms: generateNestedData(String(index + 1), 'Symptom'),
    risks: generateNestedData(String(index + 1), 'Risk'),
}))

class DiseaseMockServiceImpl implements IDiseasesService {
    public async getDiseases({ offset, limit }: IPaginationParams): Promise<IPaginationResponse<IDisease>> {
        console.debug('DiseaseMockServiceImpl.getDiseases', offset, limit)
        const total = diseases.length
        if (offset >= total) {
            return { data: [], meta: { limit, total, offset } }
        }
        const data = diseases.slice(offset, offset + limit).map(({ id, name, description }) => ({
            id,
            name,
            description,
        }))
        await delay(2000)
        console.debug('DiseaseMockServiceImpl.getDiseases Data', data)
        return { data, meta: { total, limit, offset: offset + limit } }
    }

    public async getDisease(diseaseId: string): Promise<IDiseaseDetails> {
        const disease = diseases.find(({ id }) => id === diseaseId)
        if (!disease) {
            throw new Error(`Disease with id ${diseaseId} is not found.`)
        }
        return disease
    }

    public async getDiseaseSymptoms(diseaseId: string): Promise<ISymptom[]> {
        console.debug('DiseaseMockServiceImpl.getDiseaseSymptoms', diseaseId)

        const disease = diseases.find(({ id }) => id === diseaseId)
        if (!disease) {
            throw new Error(`Disease with id ${diseaseId} is not found.`)
        }
        await delay(2000)
        console.debug('DiseaseMockServiceImpl.getDiseaseSymptoms Data', disease.symptoms)
        return disease.symptoms
    }

    public async getDiseaseRisks(diseaseId: string): Promise<IRisk[]> {
        console.debug('DiseaseMockServiceImpl.getDiseaseRisks', diseaseId)

        const disease = diseases.find(({ id }) => id === diseaseId)
        if (!disease) {
            throw new Error(`Disease with id ${diseaseId} is not found.`)
        }
        await delay(2000)
        console.debug('DiseaseMockServiceImpl.getDiseaseRisks Data', disease.risks)
        return disease.risks
    }

    public async createDisease(payload: DiseaseCreatePayload): Promise<IDiseaseCreateResponse> {
        console.debug('DiseaseMockServiceImpl.createDisease', payload)
        await delay(2000)
        const id = Date.now().toString()
        diseases.push({ ...payload, id })
        return { id }
    }

    public async updateDisease(payload: DiseaseUpdatePayload): Promise<void> {
        console.debug('DiseaseMockServiceImpl.updateDisease', payload)

        await delay(2000)

        const diseaseIndex = diseases.findIndex(({ id }) => id === payload.id)
        if (diseaseIndex !== -1) {
            diseases[diseaseIndex] = payload
        }
    }

    public async deleteDisease(diseaseId: string): Promise<void> {
        console.debug('DiseaseMockServiceImpl.deleteDisease', diseaseId)
        await delay(2000)

        diseases = diseases.filter(({ id }) => id !== diseaseId)
    }
}

export const DiseasesMockService = new DiseaseMockServiceImpl()
