import { useQuery } from '@tanstack/react-query'
import { PersonService } from './service'
import type { PagePersonDto, PersonDto } from '@/shared/api/generated/__swagger_client'

const service = new PersonService()

export function usePersons(params?: {
    lastName?: string
    firstName?: string
    page?: number
    size?: number
}) {
    return useQuery<PagePersonDto | PersonDto[], Error>({
        queryKey: ['persons', params],
        queryFn: () => params ? service.search(params) : service.list(),
    })
}
