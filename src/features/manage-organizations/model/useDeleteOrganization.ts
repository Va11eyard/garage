'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { OrganizationService } from './service'

const service = new OrganizationService()

export function useDeleteOrganization() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organizations'] })
        },
    })
}
