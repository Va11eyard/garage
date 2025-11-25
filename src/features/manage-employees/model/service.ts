import {
    Service,
    type EmployeeDto,
    type EmployeeStatusEventDto,
    type PageEmployeeDto,
    type PageEmployeeItemAssignmentDto,
    type PageEmployeeWearReportRowDto,
} from '@/shared/api/generated/__swagger_client'

export class EmployeeService {
    async search(params: {
        lastName?: string
        firstName?: string
        middleName?: string
        orgUnitId?: string
        categoryId?: string
        active?: boolean
        page?: number
        size?: number
    }): Promise<PageEmployeeDto> {
        return Service.search10(
            params.lastName,
            params.firstName,
            params.middleName,
            params.orgUnitId,
            params.categoryId,
            params.active,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<EmployeeDto> {
        return Service.get25(id)
    }

    async getHistory(employeeId: string): Promise<EmployeeStatusEventDto[]> {
        return Service.history(employeeId)
    }

    async getAssignments(params: {
        employeeId?: string
        itemId?: string
        page?: number
        size?: number
    }): Promise<PageEmployeeItemAssignmentDto> {
        return Service.searchByEmployee(params.employeeId, params.itemId, params.page, params.size)
    }

    async getWearReport(params: {
        employeeId?: string
        itemId?: string
        page?: number
        size?: number
    }): Promise<PageEmployeeWearReportRowDto> {
        return Service.getByEmployee(params.employeeId, params.itemId, params.page, params.size)
    }

    async remove(id: string): Promise<void> {
        return Service.delete24(id)
    }
}
