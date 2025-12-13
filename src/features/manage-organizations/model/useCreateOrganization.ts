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
        onSuccess: () => {
            // Invalidate React Query cache
            queryClient.invalidateQueries({ queryKey: ['organizations'], exact: false })
            // Force Next.js to refresh the router cache
            router.refresh()
        },
    })
}
