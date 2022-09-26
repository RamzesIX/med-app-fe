import { FC } from 'react'
import * as styles from './symptom-card.module.scss'
import { cls } from '../../core/utils'
import { ISymptom } from '../symptoms.types'

export interface ISymptomCardProps extends ISymptom {
    className?: string
}

export const SymptomCard: FC<ISymptomCardProps> = ({ id, name, description, className }) => {
    return (
        <div key={id} className={cls(styles.symptomCard, className)}>
            <span className={cls(styles.title, 'app-text-truncated')} title={name}>
                {name}
            </span>
            <p className={cls(styles.description, 'app-text-truncated')} title={description}>
                {description}
            </p>
        </div>
    )
}
