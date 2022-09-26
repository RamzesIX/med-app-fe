export interface IPaginationHookState<TData> {
    loading: boolean
    data: TData[]
}

export interface IPaginationHook<TData> extends IPaginationHookState<TData> {
    loadNext(): void
    canLoadMore(): boolean
}
