import { IPaginationParams, IPaginationResponse } from '../core/types'
import { IRisk, RiskCreatePayload, RiskCreateResponse, RiskUpdatePayload } from './risks.types'

export interface IRisksService {
    getRisks(params: IPaginationParams): Promise<IPaginationResponse<IRisk>>
    // TODO remove it once Dropdown component is implemented.
    getAllRisks(): Promise<IRisk[]>
    createRisk(payload: RiskCreatePayload): Promise<RiskCreateResponse>
    updateRisk(payload: RiskUpdatePayload): Promise<void>
}
