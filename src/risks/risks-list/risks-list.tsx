import { useRisks } from './risks-list.hook'
import { RiskCard } from '../risk-card/risk-card'

import * as styles from './risks-list.module.scss'
import { AppList } from '../../components/list/list'
import { IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export const RisksList = () => {
    const { risks, loadNext } = useRisks()

    return (
        <div className={styles.risksList}>
            <div className={styles.header}>
                <h1>Risks</h1>
                <IconButton area-label="Add new risk." onClick={() => console.log('Risk Dialog')}>
                    <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
            </div>
            <AppList
                data={risks}
                loadMore={loadNext}
                itemContent={(_, { id, name, description }) => (
                    <RiskCard id={id} name={name} description={description} className={styles.card} />
                )}
            />
        </div>
    )
}
