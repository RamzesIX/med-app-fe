import { IAutocompleteOption } from './disease-details.types'
import { FilterOptionsState } from '@mui/base/AutocompleteUnstyled/useAutocomplete'
import { createFilterOptions } from '@mui/material'

export function isAutocompleteInputValue(value: unknown): value is { inputValue: string } {
    return value !== null && typeof value === 'object' && 'inputValue' in value
}

export function isAutocompleteNewOption(value: unknown): value is Required<IAutocompleteOption> {
    return value !== null && typeof value === 'object' && 'newValue' in value
}

export function isAutocompleteStringValue(value: unknown): value is { inputValue: string } {
    return typeof value === 'string' || isAutocompleteInputValue(value) || isAutocompleteNewOption(value)
}

export function getAutocompleteOptionLabel(option: string | { name: string }): string {
    return typeof option === 'string' ? option : option.name
}

export function retrieveAutocompleteStringValue<T>(value: string | T): string {
    let name = ''
    if (typeof value === 'string') {
        name = value
    } else if (isAutocompleteInputValue(value)) {
        name = value.inputValue
    } else if (isAutocompleteNewOption(value)) {
        name = value.newValue
    }
    return name
}

export function buildAutocompleteFilter<Option extends IAutocompleteOption>(
    optionBuilder: (option: IAutocompleteOption) => Option
): (options: Option[], params: FilterOptionsState<Option>) => Option[] {
    const autocompleteFilter = createFilterOptions<Option>()

    return (options, params) => {
        const filtered = autocompleteFilter(options, params)

        const { inputValue } = params
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue.toLowerCase() === option.name.toLowerCase())
        if (inputValue !== '' && !isExisting) {
            filtered.push(
                optionBuilder({
                    newValue: inputValue,
                    id: Date.now().toString(),
                    name: `Add "${inputValue}"`,
                })
            )
        }

        return filtered
    }
}
