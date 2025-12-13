'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useDeleteOrgUnit() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['org-units'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['org-units'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['orgUnits'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['orgUnits'], exact: false })
            router.refresh()
        },
    })
}
