import { IAutocompleteNewOption } from './disease-details.types'

export function isAutocompleteInputValue(value: unknown): value is { inputValue: string } {
    return value !== null && typeof value === 'object' && 'inputValue' in value
}

export function isAutocompleteNewOption(value: unknown): value is IAutocompleteNewOption {
    return value !== null && typeof value === 'object' && 'newValue' in value
}

export function isAutocompleteStringValue(value: unknown): value is { inputValue: string } {
    return typeof value === 'string' || isAutocompleteInputValue(value) || isAutocompleteNewOption(value)
}

export function getAutocompleteOptionLabel(option: string | { name: string }): string {
    return typeof option === 'string' ? option : option.name
}
