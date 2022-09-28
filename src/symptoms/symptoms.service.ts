import { IPaginationParams, IPaginationResponse } from '../core/types'
import { ISymptom, SymptomCreatePayload, SymptomCreateResponse, SymptomUpdatePayload } from './symptoms.types'
import { HttpClient, IHttpClient } from '../services/http-client'
import { ISymptomsService } from './symptoms.service.types'

class SymptomServiceImpl implements ISymptomsService {
    constructor(private readonly httpClient: IHttpClient) {}

    public async getSymptoms(params: IPaginationParams): Promise<IPaginationResponse<ISymptom>> {
        const { data } = await this.httpClient.get<IPaginationResponse<ISymptom>>('/symptoms', { params })
        return data
    }

    // TODO do not request all the data at once
    public async getAllSymptoms(): Promise<ISymptom[]> {
        const { data } = await this.getSymptoms({ offset: 0, limit: 1000 })
        return data
    }

    public async createSymptom(payload: SymptomCreatePayload): Promise<SymptomCreateResponse> {
        const { data } = await this.httpClient.post<SymptomCreateResponse>('/symptoms', payload)
        return data
    }

    public async updateSymptom(payload: SymptomUpdatePayload): Promise<void> {
        await this.httpClient.put<never, SymptomUpdatePayload>(`/symptoms/${payload.id}`, payload)
    }
}

export const SymptomsService = new SymptomServiceImpl(HttpClient)
