import { useQuery } from '@tanstack/react-query'
import { PersonService } from './service'

const service = new PersonService()

export function usePersons(params?: {
    lastName?: string
    firstName?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['persons', params],
        queryFn: () => params ? service.search(params) : service.list(),
    })
}
