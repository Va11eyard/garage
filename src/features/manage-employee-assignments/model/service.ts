import {
    Service,
    type EmployeeItemAssignmentDto,
    type PageEmployeeItemAssignmentDto,
} from '@/shared/api/generated/__swagger_client'

export class EmployeeAssignmentService {
    async search(params: {
        organizationId: string
        orgUnitId?: string
        itemId?: string
        active?: boolean
        page?: number
        size?: number
    }): Promise<PageEmployeeItemAssignmentDto> {
        return Service.searchEmployeeItemAssignmentsPage(
            params.organizationId,
            params.orgUnitId,
            params.itemId,
            params.active,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<EmployeeItemAssignmentDto> {
        return Service.getEmployeeItemAssignmentById(id)
    }
}
