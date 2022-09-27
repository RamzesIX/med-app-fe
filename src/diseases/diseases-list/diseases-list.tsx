import { FC } from 'react'
import { useDiseasesList } from './diseases-list.hook'
import { AppList } from '../../components/list/list'
import { DiseasesCard } from '../diseases-card/diseases-card'
import { IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import * as styles from './diseases-list.module.scss'

export const DiseasesList: FC = () => {
    const { data, loadNext, navigateToDiseaseDetails, deleteDisease, loading } = useDiseasesList()

    return (
        <div className={styles.diseasesList}>
            <div className={styles.header}>
                <h1>Diseases</h1>
                <IconButton area-label="Add new disease." onClick={() => navigateToDiseaseDetails(null)}>
                    <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
            </div>
            <AppList
                loading={loading}
                data={data}
                loadMore={loadNext}
                itemContent={(_, { id, name, description }) => (
                    <DiseasesCard
                        id={id}
                        name={name}
                        description={description}
                        onDelete={deleteDisease}
                        onEdit={navigateToDiseaseDetails}
                    />
                )}
            />
        </div>
    )
}
