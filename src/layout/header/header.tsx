import { FC, useState } from 'react'
import { AuthService } from '../../auth/auth.service'
import * as styles from './header.module.scss'

export const AppHeader: FC = () => {
    const [username, setUserName] = useState('John Doe')

    const signOut: VoidFunction = () => {
        AuthService.signOut()
        console.debug('Sign Out')
        setUserName('')
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>Medical Admin Portal</h1>
            <span>{username}</span>
            <a href="#" onClick={signOut}>
                Sign out
            </a>
        </header>
    )
}
