'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type OrgUnitUpdateRequest, type OrgUnitDto } from '@/shared/api/generated/__swagger_client'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useUpdateOrgUnit() {
    const queryClient = useQueryClient()

    return useMutation<OrgUnitDto, Error, { id: string; data: OrgUnitUpdateRequest }>({
        mutationFn: ({ id, data }: any) => service.update(id, data),
        onSuccess: () => {
            // Remove all cached org-units queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['org-units'] })
            queryClient.removeQueries({ queryKey: ['orgUnits'] })
            
            // Invalidate individual org-unit queries
            queryClient.invalidateQueries({ queryKey: ['orgUnit'], exact: false })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['org-units'], exact: false })
        },
    })
}
