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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['org-units'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['orgUnits'], exact: false })
            router.refresh()
        },
    })
}
