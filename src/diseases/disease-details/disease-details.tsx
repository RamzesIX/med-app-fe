import { FC } from 'react'
import { DiseaseFormField, IDiseaseForm } from './disease-details.types'
import { useDiseaseDetails } from './disease-details.hook'
import { Controller } from 'react-hook-form'
import { Button, TextField } from '@mui/material'

import * as styles from './disease-details.module.scss'
import { useParams } from 'react-router-dom'
import { SymptomControl } from './symptom-control/symptom-control'
import { RiskControl } from './risk-control/risk-control'

export const DiseaseDetails: FC = () => {
    const { id } = useParams()
    const { createDisease, updateDisease, goBack, form, loading, options, addSymptom, addRisk } = useDiseaseDetails(id ?? null)

    const { symptoms, risks } = options

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = form

    const createOrUpdateDisease = async (data: IDiseaseForm): Promise<void> => {
        if (id) {
            await updateDisease({ id, ...data })
        } else {
            await createDisease(data)
        }
    }

    const actionLabel = id ? 'Update Disease' : 'Create Disease'

    return (
        <div className={styles.diseaseDetails}>
            <form className={styles.form} onSubmit={handleSubmit(createOrUpdateDisease)}>
                <h1>{actionLabel}</h1>
                <Controller
                    name={DiseaseFormField.Name}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            disabled={loading}
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                            variant="outlined"
                            label="Name"
                        />
                    )}
                />
                <Controller
                    name={DiseaseFormField.Description}
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
                            disabled={loading}
                        />
                    )}
                />

                <SymptomControl options={symptoms} control={control} onSubmit={addSymptom} loading={loading} />
                <RiskControl options={risks} control={control} onSubmit={addRisk} loading={loading} />

                <div className={styles.actions}>
                    <Button variant="outlined" disabled={isSubmitting || loading} type="button" onClick={goBack}>
                        Cancel
                    </Button>
                    <Button variant="outlined" disabled={isSubmitting || loading} type="submit">
                        {actionLabel}
                    </Button>
                </div>
            </form>
        </div>
    )
}
