'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type OrgUnitCreateRequest, type OrgUnitDto } from '@/shared/api/generated/__swagger_client'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useCreateOrgUnit() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<OrgUnitDto, Error, OrgUnitCreateRequest>({
        mutationFn: (data: OrgUnitCreateRequest) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['org-units'], type: 'active' })
            await queryClient.refetchQueries({ queryKey: ['orgUnits'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['org-units'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['orgUnits'], exact: false })
            router.refresh()
        },
    })
}
