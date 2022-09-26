export interface ISymptom {
    id: string
    name: string
    description: string
}

export type SymptomUpdatePayload = ISymptom
export type SymptomCreatePayload = Omit<ISymptom, 'id'>

export type SymptomCreateResponse = Pick<ISymptom, 'id'>
