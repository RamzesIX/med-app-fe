import { IPaginationParams, IPaginationResponse } from '../core/types'
import { IRisk } from './risks.types'
import { HttpClient, IHttpClient } from '../services/http-client'

export interface IRisksService {
    getRisks(params: IPaginationParams): Promise<IPaginationResponse<IRisk>>
}

class RisksServiceImpl implements IRisksService {
    constructor(private readonly httpClient: IHttpClient) {}

    public async getRisks(params: IPaginationParams): Promise<IPaginationResponse<IRisk>> {
        const { data } = await this.httpClient.get<IPaginationResponse<IRisk>>('/risks', { params })
        return data
    }
}

export const RisksService = new RisksServiceImpl(HttpClient)
