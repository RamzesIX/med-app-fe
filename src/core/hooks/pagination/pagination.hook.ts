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

    const requestData = useCallback<(offset: number) => Promise<void>>(
        async (offset) => {
            try {
                setState((prevState) => ({ ...prevState, loading: true }))
                stateRef.current.loading = true

                const { data, meta } = await loadData({ offset, limit: metaRef.current.limit })

                stateRef.current = { data, loading: false }
                metaRef.current = meta
                setState((prevState) => ({ data: [...prevState.data, ...data], loading: false }))
            } catch (e) {
                ErrorHandler.handleError(e)
                stateRef.current.loading = false
                setState((prevState) => ({ ...prevState, loading: false }))
            }
        },
        [loadData]
    )

    useEffect(() => {
        void requestData(0)
    }, [])

    const canLoadMore = useCallback(() => {
        const { offset, total } = metaRef.current

        return !stateRef.current.loading && offset < total
    }, [])

    const loadNext = useCallback<VoidFunction>(() => {
        if (canLoadMore()) {
            void requestData(metaRef.current.offset)
        }
    }, [canLoadMore, requestData])

    return {
        ...state,
        loadNext,
        canLoadMore,
    }
}
