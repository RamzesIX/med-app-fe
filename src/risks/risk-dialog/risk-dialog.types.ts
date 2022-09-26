import { IRisk, RiskCreatePayload } from '../risks.types'

export interface IRiskDialogProps {
    data: Omit<IRisk, 'id'>
    onClose(): void
    onSubmit(payload: RiskCreatePayload): void | Promise<void>
}

export enum RiskDialogFormField {
    Name = 'name',
    Description = 'description',
}

export interface IRiskDialogForm {
    [RiskDialogFormField.Name]: string
    [RiskDialogFormField.Description]: string
}
