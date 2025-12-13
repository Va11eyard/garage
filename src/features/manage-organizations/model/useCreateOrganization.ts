'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type OrganizationCreateRequest, type OrganizationDto } from '@/shared/api/generated/__swagger_client'
import { OrganizationService } from './service'

const service = new OrganizationService()

export function useCreateOrganization() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<OrganizationDto, Error, OrganizationCreateRequest>({
        mutationFn: (data: OrganizationCreateRequest) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['organizations'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['organizations'], exact: false })
            router.refresh()
        },
    })
}
