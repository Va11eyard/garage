'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdatePerson(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: any) => Service.updatePerson(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['persons'] })
            queryClient.invalidateQueries({ queryKey: ['persons', id] })
        },
    })
}
