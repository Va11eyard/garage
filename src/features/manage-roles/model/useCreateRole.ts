'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type RoleDto } from '@/shared/api/generated/__swagger_client'

export function useCreateRole() {
    const queryClient = useQueryClient()

    return useMutation<RoleDto, Error, string>({
        mutationFn: (code: string) => Service.create19(code),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] })
        },
    })
}
