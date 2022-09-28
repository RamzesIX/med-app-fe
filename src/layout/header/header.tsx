import { FC } from 'react'
import { AuthService } from '../../auth/auth.service'
import * as styles from './header.module.scss'
import { Button } from '@mui/material'
import HealingIcon from '@mui/icons-material/Healing'
import { AppNavbar } from '../navbar/navbar'
import { useUsers } from '../../users/users.hook'

export const AppHeader: FC = () => {
    const { currentUser } = useUsers()

    const signOut: VoidFunction = () => {
        AuthService.signOut()
        console.debug('Sign Out')
    }

    const username = currentUser?.name ?? ''

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <HealingIcon fontSize="large" />
                    <h1 className={styles.headerTitle}>Admin Portal</h1>
                </div>
                <AppNavbar />

                <span title={username} className="app-text-truncated">
                    {username}
                </span>
                <Button type="button" onClick={signOut}>
                    Sign out
                </Button>
            </div>
        </header>
    )
}
