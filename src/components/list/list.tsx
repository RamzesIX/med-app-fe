import { ReactElement } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { MUIComponents } from './list-mui'
import { IAppListData, IAppListProps } from './list.types'

export function AppList<TData extends IAppListData>({ data, loadMore, itemContent }: IAppListProps<TData>): ReactElement {
    return (
        <Virtuoso useWindowScroll data={data} endReached={loadMore} overscan={200} components={MUIComponents} itemContent={itemContent} />
    )
}
