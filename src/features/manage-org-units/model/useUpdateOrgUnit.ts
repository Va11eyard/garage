'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type OrgUnitUpdateRequest, type OrgUnitDto } from '@/shared/api/generated/__swagger_client'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useUpdateOrgUnit() {
    const queryClient = useQueryClient()

    return useMutation<OrgUnitDto, Error, { id: string; data: OrgUnitUpdateRequest }>({
        mutationFn: ({ id, data }) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['org-units'] })
            queryClient.invalidateQueries({ queryKey: ['orgUnit'] })
        },
    })
}
