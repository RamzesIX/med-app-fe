import { FC, SyntheticEvent } from 'react'
import { ISymptomControlProps, SymptomOption } from './symptom-control.types'
import { Controller } from 'react-hook-form'
import { DiseaseFormField } from '../disease-details.types'
import { Autocomplete, createFilterOptions, Dialog, TextField } from '@mui/material'
import { ISymptom, SymptomCreatePayload } from '../../../symptoms/symptoms.types'
import {
    getAutocompleteOptionLabel,
    isAutocompleteInputValue,
    isAutocompleteNewOption,
    isAutocompleteStringValue,
} from '../disease-details.utils'
import { useDialog } from '../../../core/hooks/dialog/dialog.hook'
import { ISymptomDialogProps } from '../../../symptoms/symptoms-dialog/symptom-dialog.types'
import { SymptomDialog } from '../../../symptoms/symptoms-dialog/symptom-dialog'
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller'
import { FilterOptionsState } from '@mui/base/AutocompleteUnstyled/useAutocomplete'

const filter = createFilterOptions<SymptomOption>()

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
                let name = ''
                if (typeof value === 'string') {
                    name = value
                } else if (isAutocompleteInputValue(value)) {
                    name = value.inputValue
                } else if (isAutocompleteNewOption(value)) {
                    name = value.newValue
                }
                openDialog({ name, description: '' })
            }
        }

    const filterOptions = (options: SymptomOption[], params: FilterOptionsState<SymptomOption>) => {
        const filtered = filter(options, params)

        const { inputValue } = params
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue.toLowerCase() === option.name.toLowerCase())
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                newValue: inputValue,
                id: Date.now().toString(),
                description: '',
                name: `Add "${inputValue}"`,
            })
        }

        return filtered
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
                            filterOptions={filterOptions}
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
