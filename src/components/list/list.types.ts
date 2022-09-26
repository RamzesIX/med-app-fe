import { ReactNode } from 'react'

export interface IAppListData {
    id: string
}

export interface IAppListProps<TData extends IAppListData> {
    data: TData[]
    loadMore(): void
    itemContent(index: number, data: TData): ReactNode
}
