import { IPaginationMeta, IPaginationParams, IPaginationResponse } from '../../types'
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { IPaginationHook, IPaginationHookState } from './pagination.hook.types'
import { globalConstants } from '../../constants'
import { ErrorHandler } from '../../../services/error-handler'

const defaultState = { data: [], loading: false }

export function usePagination<TData>(
    loadData: (params: IPaginationParams) => Promise<IPaginationResponse<TData>>,
    defaultLimit: number = globalConstants.paginationLimit
): IPaginationHook<TData> {
    // refs are used to access the state inside any callback and prevent additional state changes.
    const stateRef: MutableRefObject<IPaginationHookState<TData>> = useRef<IPaginationHookState<TData>>(defaultState)
    const metaRef: MutableRefObject<IPaginationMeta> = useRef<IPaginationMeta>({ offset: 0, limit: defaultLimit, total: 0 })
    const [state, setState] = useState<IPaginationHookState<TData>>(defaultState)

    const requestData = useCallback<(offset: number, prevData: TData[]) => Promise<void>>(
        async (offset, prevData) => {
            try {
                setState((prevState) => ({ ...prevState, loading: true }))
                stateRef.current.loading = true

                const { data, meta } = await loadData({ offset, limit: metaRef.current.limit })

                const newState = { data: [...prevData, ...data], loading: false }
                stateRef.current = newState
                metaRef.current = meta
                setState(newState)
            } catch (e) {
                ErrorHandler.handleError(e)
                stateRef.current.loading = false
                setState((prevState) => ({ ...prevState, loading: false }))
            }
        },
        [loadData]
    )

    useEffect(() => {
        void requestData(0, [])
    }, [requestData])

    const canLoadMore = useCallback(() => {
        const { offset, total } = metaRef.current

        return !stateRef.current.loading && offset < total
    }, [])

    const loadNext = useCallback<VoidFunction>(() => {
        if (canLoadMore()) {
            void requestData(metaRef.current.offset, stateRef.current.data)
        }
    }, [canLoadMore, requestData])

    const reset = useCallback<VoidFunction>(() => {
        void requestData(0, [])
    }, [requestData])

    const setData = useCallback<(data: TData[]) => void>((data) => {
        const newState = { data, loading: false }
        setState(newState)
        stateRef.current = newState
    }, [])

    const getData = useCallback<() => TData[]>(() => {
        return stateRef.current.data
    }, [])

    return {
        ...state,
        loadNext,
        canLoadMore,
        reset,
        setData,
        getData,
    }
}
