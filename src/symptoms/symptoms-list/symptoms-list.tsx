import { AppList } from '../../components/list/list'
import { useSymptoms } from './symptoms-list.hook'
import { SymptomCard } from '../symptom-card/symptom-card'
import * as styles from './symptoms-list.module.scss'
import { IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export const SymptomsList = () => {
    const { symptoms, loadNext } = useSymptoms()

    return (
        <div className={styles.symptomsList}>
            <div className={styles.header}>
                <h1>Symptoms</h1>
                <IconButton area-label="Add new risk." onClick={() => console.log('Risk Dialog')}>
                    <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
            </div>
            <AppList
                data={symptoms}
                loadMore={loadNext}
                itemContent={(_, { id, name, description }) => <SymptomCard id={id} name={name} description={description} />}
            />
        </div>
    )
}
