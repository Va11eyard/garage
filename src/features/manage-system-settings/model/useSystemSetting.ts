import { useQuery } from '@tanstack/react-query'
import { SystemSettingService } from './service'

const service = new SystemSettingService()

export function useSystemSetting(id: string) {
    return useQuery({
        queryKey: ['system-settings', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
