import { useRisks } from './risks-list.hook'
import { RiskCard } from '../risk-card/risk-card'

import * as styles from './risks-list.module.scss'
import { AppList } from '../../components/list/list'

export const RisksList = () => {
    const { risks, loadNext, loading } = useRisks()

    return (
        <div className={styles.risksList}>
            <div className={styles.header}>
                <h1>Risks</h1>
                {/*<IconButton area-label="Add new risk." onClick={() => console.log('Risk Dialog')}>*/}
                {/*    <AddCircleOutlineIcon fontSize="large" />*/}
                {/*</IconButton>*/}
            </div>
            <AppList
                loading={loading}
                data={risks}
                loadMore={loadNext}
                itemContent={(_, { id, name, description }) => <RiskCard id={id} name={name} description={description} />}
            />
        </div>
    )
}
