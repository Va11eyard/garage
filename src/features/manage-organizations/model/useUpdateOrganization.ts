'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type OrganizationUpdateRequest, type OrganizationDto } from '@/shared/api/generated/__swagger_client'
import { OrganizationService } from './service'

const service = new OrganizationService()

export function useUpdateOrganization() {
    const queryClient = useQueryClient()

    return useMutation<OrganizationDto, Error, { id: string; data: OrganizationUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: OrganizationUpdateRequest }) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organizations'] })
            queryClient.invalidateQueries({ queryKey: ['organization'] })
        },
    })
}
