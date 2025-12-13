'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type OrgUnitUpdateRequest, type OrgUnitDto } from '@/shared/api/generated/__swagger_client'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useUpdateOrgUnit() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<OrgUnitDto, Error, { id: string; data: OrgUnitUpdateRequest }>({
        mutationFn: ({ id, data }: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['org-units'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['orgUnits'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['orgUnit'], exact: false })
            router.refresh()
        },
    })
}
