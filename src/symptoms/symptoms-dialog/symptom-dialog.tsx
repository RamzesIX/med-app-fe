import { FC } from 'react'
import { ISymptomDialogForm, ISymptomDialogProps, SymptomDialogFormField } from './symptom-dialog.types'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { SymptomCreatePayload } from '../symptoms.types'
import { Button, TextField } from '@mui/material'
import * as styles from './symptom-dialog.module.scss'
import { symptomDialogValidation } from './symptom-dialog.validation'

export const SymptomDialog: FC<ISymptomDialogProps> = ({ data, onSubmit, onClose }) => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ISymptomDialogForm>({
        defaultValues: data,
        mode: 'onBlur',
        resolver: yupResolver(symptomDialogValidation),
    })

    const saveOrUpdateSymptom = async (payload: SymptomCreatePayload): Promise<void> => {
        await onSubmit(payload)
    }

    return (
        <div className={styles.symptomDialog}>
            <form className={styles.form}>
                <h1 className={styles.title}>Edit Symptom</h1>
                <Controller
                    name={SymptomDialogFormField.Name}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField error={!!error} helperText={error?.message} {...field} variant="outlined" label="Name" />
                    )}
                />
                <Controller
                    name={SymptomDialogFormField.Description}
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
                    <Button variant="outlined" disabled={isSubmitting} type="button" onClick={handleSubmit(saveOrUpdateSymptom)}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}
