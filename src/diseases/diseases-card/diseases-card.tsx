import { FC, useState } from 'react'
import { IDisease } from '../diseases.types'
import { useDiseasesCard } from './diseases-card.hook'
import { DiseaseCardAccordion } from './diseases-card.types'
import { cls } from '../../core/utils'

import * as styles from './diseases-card.module.scss'
import { DiseasesCardAccordion } from './diseases-card-accordion'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export interface IDiseasesCardProps extends IDisease {
    className?: string
    onDelete(id: string): void
    onEdit(id: string): void
}

export const DiseasesCard: FC<IDiseasesCardProps> = ({ id, name, description, className, onDelete, onEdit }) => {
    const { symptomsLoading, risksLoading, loadRisks, loadSymptoms, risks, symptoms } = useDiseasesCard(id)

    const [accordionExpanded, setAccordionExpanded] = useState<DiseaseCardAccordion>(DiseaseCardAccordion.None)

    const handleAccordionChange = (accordion: DiseaseCardAccordion) => {
        if (accordion === DiseaseCardAccordion.Symptoms) {
            loadSymptoms()
        }
        if (accordion === DiseaseCardAccordion.Risks) {
            loadRisks()
        }
        setAccordionExpanded(accordion)
    }

    return (
        <div key={id} className={cls(styles.diseaseCard, className)}>
            <div className={styles.primaryContent}>
                <strong title={name} className={cls(styles.title, 'app-text-truncated')}>
                    {name}
                </strong>
                <p title={description} className={styles.description}>
                    {description}
                </p>
                <div className={styles.actions}>
                    <IconButton aria-label="Edit Disease" onClick={() => onEdit(id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete Disease" onClick={() => onDelete(id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>

            <DiseasesCardAccordion
                data={symptoms}
                id={DiseaseCardAccordion.Symptoms}
                label="Symptoms"
                expanded={accordionExpanded === DiseaseCardAccordion.Symptoms}
                loading={symptomsLoading}
                onAccordionStateChange={handleAccordionChange}
            />
            <DiseasesCardAccordion
                data={risks}
                id={DiseaseCardAccordion.Risks}
                label="Risks"
                expanded={accordionExpanded === DiseaseCardAccordion.Risks}
                loading={risksLoading}
                onAccordionStateChange={handleAccordionChange}
            />
        </div>
    )
}
