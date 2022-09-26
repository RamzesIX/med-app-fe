import { FC } from 'react'
import { AppHeader } from '../header/header'
import * as styles from './main.module.scss'
import { Outlet } from 'react-router-dom'

export const AppMain: FC = () => {
    return (
        <div className={styles.main}>
            <AppHeader />
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}
