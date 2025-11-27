'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type OrganizationCreateRequest, type OrganizationDto } from '@/shared/api/generated/__swagger_client'
import { OrganizationService } from './service'

const service = new OrganizationService()

export function useCreateOrganization() {
    const queryClient = useQueryClient()

    return useMutation<OrganizationDto, Error, OrganizationCreateRequest>({
        mutationFn: (data: OrganizationCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organizations'] })
        },
    })
}
