import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SystemSettingService } from './service'

const service = new SystemSettingService()

export function useUpsertSystemSetting() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: service.upsert.bind(service),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['system-settings'], exact: false })
        },
    })
}
