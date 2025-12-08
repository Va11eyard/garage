'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type OrgUnitCreateRequest, type OrgUnitDto } from '@/shared/api/generated/__swagger_client'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useCreateOrgUnit() {
    const queryClient = useQueryClient()

    return useMutation<OrgUnitDto, Error, OrgUnitCreateRequest>({
        mutationFn: (data: OrgUnitCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['org-units'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['orgUnits'], exact: false })
        },
    })
}
