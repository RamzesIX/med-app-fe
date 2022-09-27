import { FC } from 'react'
import * as styles from './list.module.scss'
import { CircularProgress } from '@mui/material'

export const AppListFooter: FC<{ loading: boolean }> = ({ loading }) => {
    return loading ? (
        <div className={styles.listFooter}>
            <CircularProgress />
        </div>
    ) : null
}
