'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type OrgUnitCreateRequest, type OrgUnitDto } from '@/shared/api/generated/__swagger_client'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useCreateOrgUnit() {
    const queryClient = useQueryClient()

    return useMutation<OrgUnitDto, Error, OrgUnitCreateRequest>({
        mutationFn: (data: OrgUnitCreateRequest) => service.create(data),
        onSuccess: () => {
            // Remove all cached org-units queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['org-units'] })
            queryClient.removeQueries({ queryKey: ['orgUnits'] })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['org-units'], exact: false })
        },
    })
}
