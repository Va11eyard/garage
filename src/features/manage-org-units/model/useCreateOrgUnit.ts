'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type OrgUnitCreateRequest, type OrgUnitDto } from '@/shared/api/generated/__swagger_client'

export function useCreateOrgUnit() {
    const queryClient = useQueryClient()

    return useMutation<OrgUnitDto, Error, OrgUnitCreateRequest>({
        mutationFn: (data: OrgUnitCreateRequest) => Service.create7(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['org-units'] })
        },
    })
}
