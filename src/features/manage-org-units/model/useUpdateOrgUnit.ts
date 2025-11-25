'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type OrgUnitUpdateRequest, type OrgUnitDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateOrgUnit() {
    const queryClient = useQueryClient()

    return useMutation<OrgUnitDto, Error, { id: string; data: OrgUnitUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: OrgUnitUpdateRequest }) => Service.update4(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['org-units'] })
            queryClient.invalidateQueries({ queryKey: ['orgUnit'] })
        },
    })
}
