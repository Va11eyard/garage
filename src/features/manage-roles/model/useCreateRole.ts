'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type RoleDto } from '@/shared/api/generated/__swagger_client'
import { RoleService } from './service'
const service = new RoleService()
export function useCreateRole() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<RoleDto, Error, string>({
        mutationFn: (code: string) => service.create(code),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'], exact: false })
            router.refresh()
        },
    })
}
