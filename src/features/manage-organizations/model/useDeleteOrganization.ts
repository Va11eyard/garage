'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteOrganization() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => Service.delete5(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organizations'] })
        },
    })
}
