import { useQuery } from '@tanstack/react-query'
import { PersonService } from './service'

const service = new PersonService()

export function usePersons() {
    return useQuery({
        queryKey: ['persons'],
        queryFn: () => service.list(),
    })
}
