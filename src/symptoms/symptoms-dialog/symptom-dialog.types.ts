import { ISymptom, SymptomCreatePayload } from '../symptoms.types'

export interface ISymptomDialogProps {
    data: Omit<ISymptom, 'id'>
    onClose(): void
    onSubmit(payload: SymptomCreatePayload): void | Promise<void>
}

export enum SymptomDialogFormField {
    Name = 'name',
    Description = 'description',
}

export interface ISymptomDialogForm {
    [SymptomDialogFormField.Name]: string
    [SymptomDialogFormField.Description]: string
}
