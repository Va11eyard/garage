import {
    Service,
    type ConsolidatedDashboardDto,
} from '@/shared/api/generated/__swagger_client'

export class DashboardService {
    async getDashboard(): Promise<ConsolidatedDashboardDto> {
        return Service.dashboard()
    }
}
