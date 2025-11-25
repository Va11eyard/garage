import { useQuery } from '@tanstack/react-query'
import { DashboardService } from './service'

const service = new DashboardService()

export function useDashboard() {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: () => service.getDashboard(),
        refetchInterval: 60000, // Refresh every minute
    })
}
