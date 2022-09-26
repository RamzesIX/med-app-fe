import { useCallback, useState } from 'react'

export interface IDialogHook<TData> extends IDialogHookState<TData> {
    openDialog(data: TData): void
    closeDialog(): void
}

interface IDialogHookState<TData> {
    data: TData | null
    open: boolean
}

export function useDialog<TData>(): IDialogHook<TData> {
    const [state, setState] = useState<IDialogHookState<TData>>({ data: null, open: false })

    const openDialog = useCallback<(data: TData) => void>((data) => {
        setState({ data, open: true })
    }, [])

    const closeDialog = useCallback<VoidFunction>(() => {
        setState({ data: null, open: false })
    }, [])

    return {
        ...state,
        openDialog,
        closeDialog,
    }
}
