import { IPaginationParams, IPaginationResponse } from '../core/types'
import { IRisk } from './risks.types'

export interface IRisksService {
    getRisks(params: IPaginationParams): Promise<IPaginationResponse<IRisk>>
    // TODO remove it once Dropdown component is implemented.
    getAllRisks(): Promise<IRisk[]>
}
