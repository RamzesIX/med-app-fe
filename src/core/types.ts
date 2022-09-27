export interface IResponse<TData, TStatus = IResponseStatus> {
    data: TData
    status: TStatus
}

export interface IResponseStatus {
    code: string
    message: string
}

export interface IPaginationParams {
    offset: number
    limit: number
}

export interface IPaginationMeta {
    offset: number
    limit: number
    total: number
}

export interface IPaginationResponse<TData> {
    data: TData[]
    meta: IPaginationMeta
}

export interface IServerErrorResponse {
    statusCode: number
    message: string
    error: string
}
