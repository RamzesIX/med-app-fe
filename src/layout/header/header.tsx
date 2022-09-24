import { FC, useState } from 'react'
import { AuthService } from '../../auth/auth.service'
import * as styles from './header.module.scss'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const AppHeader: FC = () => {
    const [username, setUserName] = useState('John Doe')
    const navigate = useNavigate()

    const signOut: VoidFunction = () => {
        AuthService.signOut()
        console.debug('Sign Out')
        setUserName('')
        navigate('/login')
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.headerTitle}>Medical Admin Portal</h1>
                <span>{username}</span>
                <Button type="button" onClick={signOut}>
                    Sign out
                </Button>
            </div>
        </header>
    )
}
