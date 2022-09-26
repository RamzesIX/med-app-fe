import { FC, SyntheticEvent } from 'react'
import { IRisk } from '../../risks/risks.types'
import { ISymptom } from '../../symptoms/symptoms.types'
import { DiseaseCardAccordion } from './diseases-card.types'
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, List, ListItem, ListItemText } from '@mui/material'
import { globalConstants } from '../../core/constants'

export interface IDiseasesCardAccordionProps {
    id: DiseaseCardAccordion
    label: string
    expanded: boolean
    data: Array<IRisk | ISymptom>
    loading: boolean
    onAccordionStateChange(id: DiseaseCardAccordion): void
}

export const DiseasesCardAccordion: FC<IDiseasesCardAccordionProps> = ({ id, label, data, onAccordionStateChange, loading, expanded }) => {
    const handleAccordionChange = (_: SyntheticEvent, isExpanded: boolean) => {
        onAccordionStateChange(isExpanded ? id : DiseaseCardAccordion.None)
    }

    return (
        <Accordion expanded={expanded} onChange={handleAccordionChange}>
            <AccordionSummary
                aria-controls={`${id} Content`}
                id={id}
                classes={{
                    content: 'disease-card-accordion-summary',
                }}
            >
                <strong>{label}</strong>
                {loading && <CircularProgress size={globalConstants.circularProgressSize} />}
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {data.map(({ id, name, description }) => (
                        <ListItem key={id}>
                            <ListItemText primary={name} secondary={description} />
                        </ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    )
}
