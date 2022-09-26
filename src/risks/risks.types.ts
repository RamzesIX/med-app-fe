export interface IRisk {
    id: string
    name: string
    description: string
}

export type RiskUpdatePayload = IRisk
export type RiskCreatePayload = Omit<IRisk, 'id'>
export type RiskCreateResponse = Pick<IRisk, 'id'>
