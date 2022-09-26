import { AppList } from '../../components/list/list'
import { useSymptoms } from './symptoms-list.hook'
import { SymptomCard } from '../symptom-card/symptom-card'

export const SymptomsList = () => {
    const { symptoms, loadNext } = useSymptoms()

    return (
        <AppList
            data={symptoms}
            loadMore={loadNext}
            itemContent={(_, { id, name, description }) => <SymptomCard id={id} name={name} description={description} />}
        />
    )
}
