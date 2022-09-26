export interface IDiseaseDetailsProps {
    id: string | null
}

export enum DiseaseFormField {
    Name = 'name',
    Description = 'description',
    Risks = 'risks',
    Symptoms = 'symptoms',
}

export interface IDiseaseForm {
    [DiseaseFormField.Name]: string
    [DiseaseFormField.Description]: string
}
