'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useDeleteOrgUnit() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            // Remove all cached org-units queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['org-units'] })
            queryClient.removeQueries({ queryKey: ['orgUnits'] })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['org-units'], exact: false })
        },
    })
}
