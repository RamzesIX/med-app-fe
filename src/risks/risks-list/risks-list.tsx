import { useRisks } from './risks-list.hook'
import { RiskCard } from '../risk-card/risk-card'

import * as styles from './risks-list.module.scss'
import { AppList } from '../../components/list/list'

export const RisksList = () => {
    const { risks, loadNext } = useRisks()

    return (
        <AppList
            data={risks}
            loadMore={loadNext}
            itemContent={(_, { id, name, description }) => (
                <RiskCard id={id} name={name} description={description} className={styles.card} />
            )}
        />
    )
}
