import { FC } from 'react'
import { AppHeader } from '../header/header'
import * as styles from './main.module.scss'

export const AppMain: FC = () => {
    return (
        <div className={styles.main}>
            <AppHeader />
            <div className={styles.content}>
                <div>Content</div>
            </div>
        </div>
    )
}
