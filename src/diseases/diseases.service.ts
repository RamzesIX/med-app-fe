import { IPaginationParams, IPaginationResponse } from '../core/types'
import { DiseaseCreatePayload, DiseaseUpdatePayload, IDisease, IDiseaseCreateResponse, IDiseaseDetails } from './diseases.types'
import { ISymptom } from '../symptoms/symptoms.types'
import { IRisk } from '../risks/risks.types'
import { HttpClient, IHttpClient } from '../services/http-client'
import { isClientMode } from '../core/utils'
import { IDiseasesService } from './diseases.service.types'
import { DiseaseMockServiceImpl } from './diseases-mock.service'

class DiseaseServiceImpl implements IDiseasesService {
    constructor(private readonly httpClient: IHttpClient) {}

    public async getDiseases(params: IPaginationParams): Promise<IPaginationResponse<IDisease>> {
        const { data } = await this.httpClient.get<IPaginationResponse<IDisease>>('/diseases', { params })
        return data
    }

    public async getDisease(diseaseId: string): Promise<IDiseaseDetails> {
        const { data } = await this.httpClient.get<IDiseaseDetails>(`/diseases/${diseaseId}`)
        return data
    }

    public async getDiseaseSymptoms(diseaseId: string): Promise<ISymptom[]> {
        const { data } = await this.httpClient.get(`/diseases/${diseaseId}/symptoms`)
        return data
    }

    public async getDiseaseRisks(diseaseId: string): Promise<IRisk[]> {
        const { data } = await this.httpClient.get(`/diseases/${diseaseId}/risks`)
        return data
    }

    public createDisease(payload: DiseaseCreatePayload): Promise<IDiseaseCreateResponse> {
        return this.httpClient.post<DiseaseCreatePayload, IDiseaseCreateResponse>('/diseases', payload)
    }

    public async updateDisease(payload: DiseaseUpdatePayload): Promise<void> {
        await this.httpClient.put<DiseaseCreatePayload>(`/diseases/${payload.id}`, payload)
    }

    public async deleteDisease(diseaseId: string): Promise<void> {
        await this.httpClient.delete<DiseaseCreatePayload>(`/diseases/${diseaseId}`)
    }
}

export const DiseasesService = isClientMode() ? new DiseaseMockServiceImpl() : new DiseaseServiceImpl(HttpClient)
