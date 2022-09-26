import { IPaginationParams, IPaginationResponse } from '../core/types'
import { IDisease } from './diseases.types'
import { ISymptom } from '../symptoms/symptoms.types'
import { IRisk } from '../risks/risks.types'
import { HttpClient, IHttpClient } from '../services/http-client'

export interface IDiseasesService {
    getDiseases(params: IPaginationParams): Promise<IPaginationResponse<IDisease>>
    getDiseaseSymptoms(diseaseId: string): Promise<ISymptom[]>
    getDiseaseRisks(diseaseId: string): Promise<IRisk[]>
}

class DiseaseServiceImpl implements IDiseasesService {
    constructor(private readonly httpClient: IHttpClient) {}

    public async getDiseases(params: IPaginationParams): Promise<IPaginationResponse<IDisease>> {
        const { data } = await this.httpClient.get<IPaginationResponse<IDisease>>('/diseases', { params })
        return data
    }

    public async getDiseaseSymptoms(diseaseId: string): Promise<ISymptom[]> {
        const params = { diseaseId }

        const { data } = await this.httpClient(`/diseases/${diseaseId}`, { params })
        return data
    }

    public async getDiseaseRisks(diseaseId: string): Promise<IRisk[]> {
        const params = { diseaseId }

        const { data } = await this.httpClient(`/diseases/${diseaseId}`, { params })
        return data
    }
}

export const DiseasesService = new DiseaseServiceImpl(HttpClient)
