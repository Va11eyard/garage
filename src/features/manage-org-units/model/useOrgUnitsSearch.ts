import { useQuery } from '@tanstack/react-query'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useOrgUnitsSearch(params: {
    code?: string
    name?: string
    orgId?: string
    type?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['org-units', 'search', params],
        queryFn: () => service.search(params),
    })
}
