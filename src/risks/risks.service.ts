import { IPaginationParams, IPaginationResponse } from '../core/types'
import { IRisk, RiskCreatePayload, RiskCreateResponse, RiskUpdatePayload } from './risks.types'
import { HttpClient, IHttpClient } from '../services/http-client'
import { IRisksService } from './risks.service.types'

class RisksServiceImpl implements IRisksService {
    constructor(private readonly httpClient: IHttpClient) {}

    public async getRisks(params: IPaginationParams): Promise<IPaginationResponse<IRisk>> {
        const { data } = await this.httpClient.get<IPaginationResponse<IRisk>>('/risks', { params })
        return data
    }

    public async getAllRisks(): Promise<IRisk[]> {
        // TODO do not request all the data at once
        const { data } = await this.getRisks({ offset: 0, limit: 1000 })
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

export const RisksService = new RisksServiceImpl(HttpClient)
