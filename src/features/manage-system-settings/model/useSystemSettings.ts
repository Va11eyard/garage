import { useQuery } from '@tanstack/react-query'
import { SystemSettingService } from './service'

const service = new SystemSettingService()

export function useSystemSettings() {
    return useQuery({
        queryKey: ['system-settings'],
        queryFn: () => service.list(),
    })
}
