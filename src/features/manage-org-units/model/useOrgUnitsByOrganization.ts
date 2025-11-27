import { useQuery } from '@tanstack/react-query'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useOrgUnitsByOrganization(orgId: string | undefined) {
    return useQuery({
        queryKey: ['org-units', 'by-organization', orgId],
        queryFn: () => service.listByOrganization1(orgId!),
        enabled: !!orgId,
    })
}
