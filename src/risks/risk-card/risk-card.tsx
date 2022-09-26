import { FC } from 'react'
import { IRisk } from '../risks.types'
import * as styles from './risk-card.module.scss'
import { cls } from '../../core/utils'

export interface IRiscCardProps extends IRisk {
    className?: string
}

export const RiskCard: FC<IRiscCardProps> = ({ id, name, description, className }) => {
    return (
        <div key={id} className={cls(styles.riskCard, className)}>
            <span className={cls(styles.title, 'app-text-truncated')} title={name}>
                {name}
            </span>
            <p className={cls(styles.description, 'app-text-truncated')} title={description}>
                {description}
            </p>
        </div>
    )
}
