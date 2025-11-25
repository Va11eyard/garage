'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type OrganizationUpdateRequest, type OrganizationDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateOrganization() {
    const queryClient = useQueryClient()

    return useMutation<OrganizationDto, Error, { id: string; data: OrganizationUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: OrganizationUpdateRequest }) => Service.update5(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organizations'] })
            queryClient.invalidateQueries({ queryKey: ['organization'] })
        },
    })
}
