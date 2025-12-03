import {
    Service,
    type PageEmployeeWearReportRowDto,
} from '@/shared/api/generated/__swagger_client'

export class ReportService {
    async searchWearReport(params: {
        organizationId: string
        orgUnitId?: string
        itemId?: string
        from?: string
        to?: string
        page?: number
        size?: number
    }): Promise<PageEmployeeWearReportRowDto> {
        return Service.searchEmployeeWearReportPage(
            params.organizationId,
            params.orgUnitId,
            params.itemId,
            params.from,
            params.to,
            params.page,
            params.size
        )
    }
}
