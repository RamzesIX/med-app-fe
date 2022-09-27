import { ReactElement } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { MUIComponents } from './list-mui'
import { IAppListData, IAppListProps } from './list.types'

export function AppList<TData extends IAppListData>({ data, loadMore, itemContent, loading = false }: IAppListProps<TData>): ReactElement {
    const { Footer, ...otherComponents } = MUIComponents

    const components = loading ? { Footer, ...otherComponents } : otherComponents

    return <Virtuoso useWindowScroll data={data} endReached={loadMore} overscan={200} components={components} itemContent={itemContent} />
}
