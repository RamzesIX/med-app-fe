import { FC, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, LinearProgress, TextField } from '@mui/material'
import { ILoginForm, LoginFormField } from './login.types'
import { ErrorHandler } from '../../services/error-handler'
import { loginValidation } from './login.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { defaultLoginValues } from './login.constants'
import { useAuth } from '../auth.hook'

import * as styles from './login.module.scss'
import { useNavigate } from 'react-router-dom'

export const LoginPage: FC = () => {
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const { control, handleSubmit } = useForm<ILoginForm>({
        defaultValues: defaultLoginValues,
        mode: 'onBlur',
        resolver: yupResolver(loginValidation),
    })

    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit = async ({ email, password }: ILoginForm): Promise<void> => {
        try {
            setLoading(true)
            await signIn(email, password)
            navigate('/')
        } catch (e) {
            ErrorHandler.handleError(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className={styles.loginPage}>
            <form className={styles.loginPageForm} onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign In</h1>
                <Controller
                    name={LoginFormField.Email}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField error={!!error} helperText={error?.message} {...field} variant="outlined" type="email" label="Email" />
                    )}
                />
                <Controller
                    name={LoginFormField.Password}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                            variant="outlined"
                            type="password"
                            label="Password"
                        />
                    )}
                />
                <Button variant="outlined" disabled={loading} type="submit">
                    Sign In
                </Button>

                {loading && <LinearProgress className={styles.progressBar} />}
            </form>
        </main>
    )
}
