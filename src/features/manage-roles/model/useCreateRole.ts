'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type RoleDto } from '@/shared/api/generated/__swagger_client'
import { RoleService } from './service'
const service = new RoleService()
export function useCreateRole() {
    const queryClient = useQueryClient()

    return useMutation<RoleDto, Error, string>({
        mutationFn: (code: string) => service.create(code),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] })
        },
    })
}
