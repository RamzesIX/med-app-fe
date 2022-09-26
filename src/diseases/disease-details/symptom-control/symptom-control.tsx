import { FC, SyntheticEvent } from 'react'
import { ISymptomControlProps } from './symptom-control.types'
import { Controller } from 'react-hook-form'
import { DiseaseFormField, IAutocompleteOption } from '../disease-details.types'
import { Autocomplete, Dialog, TextField } from '@mui/material'
import { ISymptom, SymptomCreatePayload } from '../../../symptoms/symptoms.types'
import {
    buildAutocompleteFilter,
    getAutocompleteOptionLabel,
    isAutocompleteStringValue,
    retrieveAutocompleteStringValue,
} from '../disease-details.utils'
import { useDialog } from '../../../core/hooks/dialog/dialog.hook'
import { ISymptomDialogProps } from '../../../symptoms/symptoms-dialog/symptom-dialog.types'
import { SymptomDialog } from '../../../symptoms/symptoms-dialog/symptom-dialog'
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller'

const filter = buildAutocompleteFilter<ISymptom>((option: IAutocompleteOption) => ({ ...option, description: '' }))

export const SymptomControl: FC<ISymptomControlProps> = ({ onSubmit, control, options, loading }) => {
    const { open, data, openDialog, closeDialog } = useDialog<ISymptomDialogProps['data']>()

    const addNewSymptom = (payload: SymptomCreatePayload): void => {
        onSubmit(payload)
        closeDialog()
    }

    const handleSymptomChange =
        (onControlChange: ControllerRenderProps['onChange']) => (_: SyntheticEvent, values?: Array<ISymptom | string>) => {
            if (!values || !values.some(isAutocompleteStringValue)) {
                onControlChange(values)
                return
            }
            for (const value of values) {
                openDialog({ name: retrieveAutocompleteStringValue(value), description: '' })
            }
        }

    return (
        <div>
            <Controller
                name={DiseaseFormField.Symptoms}
                control={control}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
                    return (
                        <Autocomplete
                            value={value}
                            onBlur={onBlur}
                            id={DiseaseFormField.Symptoms}
                            multiple
                            onChange={handleSymptomChange(onChange)}
                            isOptionEqualToValue={(option: ISymptom, value: ISymptom) => option.id === value.id}
                            options={options}
                            freeSolo
                            filterOptions={filter}
                            getOptionLabel={getAutocompleteOptionLabel}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={!!error}
                                    helperText={error?.message}
                                    disabled={loading}
                                    variant="outlined"
                                    label="Symptoms"
                                    placeholder="Osteoporosis"
                                />
                            )}
                        />
                    )
                }}
            />
            <Dialog open={open}>{data && <SymptomDialog data={data} onClose={closeDialog} onSubmit={addNewSymptom} />}</Dialog>
        </div>
    )
}
