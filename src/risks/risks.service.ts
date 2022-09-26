import { IPaginationParams, IPaginationResponse } from '../core/types'
import { IRisk, RiskCreatePayload, RiskCreateResponse, RiskUpdatePayload } from './risks.types'
import { HttpClient, IHttpClient } from '../services/http-client'
import { isClientMode } from '../core/utils'
import { IRisksService } from './risks.service.types'
import { RisksMockServiceImpl } from './risks-mock.service'

class RisksServiceImpl implements IRisksService {
    constructor(private readonly httpClient: IHttpClient) {}

    public async getRisks(params: IPaginationParams): Promise<IPaginationResponse<IRisk>> {
        const { data } = await this.httpClient.get<IPaginationResponse<IRisk>>('/risks', { params })
        return data
    }

    public async getAllRisks(): Promise<IRisk[]> {
        const { data } = await this.httpClient.get<IRisk[]>('/risks')
        return data
    }

    public async createRisk(payload: RiskCreatePayload): Promise<RiskCreateResponse> {
        const { data } = await this.httpClient.post<RiskCreateResponse>('/risks', payload)
        return data
    }

    public async updateRisk(payload: RiskUpdatePayload): Promise<void> {
        await this.httpClient.put(`/risks/${payload.id}`)
    }
}

export const RisksService = isClientMode() ? new RisksMockServiceImpl() : new RisksServiceImpl(HttpClient)
