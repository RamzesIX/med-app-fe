import { FC } from 'react'
import { IRiskDialogForm, IRiskDialogProps, RiskDialogFormField } from './risk-dialog.types'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Button, TextField } from '@mui/material'
import * as styles from './risk-dialog.module.scss'
import { riskDialogValidation } from './risk-dialog.validation'
import { RiskCreatePayload } from '../risks.types'

export const RiskDialog: FC<IRiskDialogProps> = ({ data, onSubmit, onClose }) => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<IRiskDialogForm>({
        defaultValues: data,
        mode: 'onBlur',
        resolver: yupResolver(riskDialogValidation),
    })

    const saveOrUpdateRisk = async (payload: RiskCreatePayload): Promise<void> => {
        await onSubmit(payload)
    }

    return (
        <div className={styles.riskDialog}>
            <form className={styles.form}>
                <h1 className={styles.title}>Edit Risk</h1>
                <Controller
                    name={RiskDialogFormField.Name}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField error={!!error} helperText={error?.message} {...field} variant="outlined" label="Name" />
                    )}
                />
                <Controller
                    name={RiskDialogFormField.Description}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                            variant="outlined"
                            label="Description"
                            multiline
                            rows={3}
                        />
                    )}
                />
                <div className={styles.actions}>
                    <Button variant="outlined" disabled={isSubmitting} type="button" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="outlined" disabled={isSubmitting} type="button" onClick={handleSubmit(saveOrUpdateRisk)}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}
