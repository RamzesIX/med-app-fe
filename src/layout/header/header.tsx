import { FC, useState } from 'react'
import { AuthService } from '../../auth/auth.service'
import * as styles from './header.module.scss'
import { Link } from '@mui/material'

export const AppHeader: FC = () => {
    const [username, setUserName] = useState('John Doe')

    const signOut: VoidFunction = () => {
        AuthService.signOut()
        console.debug('Sign Out')
        setUserName('')
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.headerTitle}>Medical Admin Portal</h1>
                <span>{username}</span>
                <Link href="#" onClick={signOut}>
                    Sign out
                </Link>
            </div>
        </header>
    )
}
