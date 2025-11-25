'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteOrgUnit() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => Service.delete6(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['org-units'] })
        },
    })
}
