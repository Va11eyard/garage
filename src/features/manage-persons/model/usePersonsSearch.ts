import { useQuery } from '@tanstack/react-query'
import { PersonService } from './service'

const service = new PersonService()

export function usePersonsSearch(params: {
    lastName?: string
    firstName?: string
    middleName?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['persons', 'search', params],
        queryFn: () => service.search(params),
    })
}
