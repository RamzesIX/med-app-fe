import { FC, SyntheticEvent } from 'react'
import { IRiskControlProps, RiskOption } from './risk-control.types'
import { Controller } from 'react-hook-form'
import { DiseaseFormField, IAutocompleteOption } from '../disease-details.types'
import { Autocomplete, Dialog, TextField } from '@mui/material'
import {
    buildAutocompleteFilter,
    getAutocompleteOptionLabel,
    isAutocompleteStringValue,
    retrieveAutocompleteStringValue,
} from '../disease-details.utils'
import { useDialog } from '../../../core/hooks/dialog/dialog.hook'
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller'
import { IRisk, RiskCreatePayload } from '../../../risks/risks.types'
import { IRiskDialogProps } from '../../../risks/risk-dialog/risk-dialog.types'
import { RiskDialog } from '../../../risks/risk-dialog/risk-dialog'

const filter = buildAutocompleteFilter<IRisk>((option: IAutocompleteOption) => ({ ...option, description: '' }))

export const RiskControl: FC<IRiskControlProps> = ({ onSubmit, control, options, loading }) => {
    const { open, data, openDialog, closeDialog } = useDialog<IRiskDialogProps['data']>()

    const addNewRisk = (payload: RiskCreatePayload): void => {
        onSubmit(payload)
        closeDialog()
    }

    const handleRiskChange =
        (onControlChange: ControllerRenderProps['onChange']) => (_: SyntheticEvent, values?: Array<IRisk | string>) => {
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
                name={DiseaseFormField.Risks}
                control={control}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
                    return (
                        <Autocomplete
                            value={value}
                            onBlur={onBlur}
                            id={DiseaseFormField.Risks}
                            multiple
                            onChange={handleRiskChange(onChange)}
                            isOptionEqualToValue={(option: RiskOption, value: RiskOption) => option.id === value.id}
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
                                    label="Risks"
                                    placeholder="Lack of exercise"
                                />
                            )}
                        />
                    )
                }}
            />
            <Dialog open={open}>{data && <RiskDialog data={data} onClose={closeDialog} onSubmit={addNewRisk} />}</Dialog>
        </div>
    )
}
