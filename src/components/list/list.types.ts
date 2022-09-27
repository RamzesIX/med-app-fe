import { ReactNode } from 'react'

export interface IAppListData {
    id: string
}

export interface IAppListProps<TData extends IAppListData> {
    data: TData[]
    loading?: boolean
    loadMore(): void
    itemContent(index: number, data: TData): ReactNode
}
