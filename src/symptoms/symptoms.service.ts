import { IPaginationParams, IPaginationResponse } from '../core/types'
import { ISymptom } from './symptoms.types'
import { HttpClient, IHttpClient } from '../services/http-client'

export interface ISymptomsService {
    getSymptoms(params: IPaginationParams): Promise<IPaginationResponse<ISymptom>>
}

class SymptomServiceImpl implements ISymptomsService {
    constructor(private readonly httpClient: IHttpClient) {}

    public async getSymptoms(params: IPaginationParams): Promise<IPaginationResponse<ISymptom>> {
        const { data } = await this.httpClient.get<IPaginationResponse<ISymptom>>('/symptoms', { params })
        return data
    }
}

export const SymptomsService = new SymptomServiceImpl(HttpClient)
