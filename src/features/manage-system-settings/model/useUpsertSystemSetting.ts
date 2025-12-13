'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SystemSettingService } from './service'

const service = new SystemSettingService()

export function useUpsertSystemSetting() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: service.upsert.bind(service),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['system-settings'], exact: false })
            router.refresh()
        },
    })
}
