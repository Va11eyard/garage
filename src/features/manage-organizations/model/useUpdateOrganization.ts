'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type OrganizationUpdateRequest, type OrganizationDto } from '@/shared/api/generated/__swagger_client'
import { OrganizationService } from './service'

const service = new OrganizationService()

export function useUpdateOrganization() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<OrganizationDto, Error, { id: string; data: OrganizationUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: OrganizationUpdateRequest }) => service.update(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['organizations'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['organizations'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['organization'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['organization'], exact: false })
            router.refresh()
        },
    })
}
