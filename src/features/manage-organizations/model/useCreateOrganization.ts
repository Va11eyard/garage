'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type OrganizationCreateRequest, type OrganizationDto } from '@/shared/api/generated/__swagger_client'

export function useCreateOrganization() {
    const queryClient = useQueryClient()

    return useMutation<OrganizationDto, Error, OrganizationCreateRequest>({
        mutationFn: (data: OrganizationCreateRequest) => Service.create6(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organizations'] })
        },
    })
}
