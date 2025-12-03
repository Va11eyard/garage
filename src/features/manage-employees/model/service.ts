import {
    Service,
    type EmployeeDto,
    type EmployeeStatusEventDto,
    type PageEmployeeDto,
    type EmployeeHireRequest,
    type EmployeeDismissRequest,
} from '@/shared/api/generated/__swagger_client'

export class EmployeeService {
    async search(params: {
        organizationId?: string
        orgUnitId?: string
        personnelNumber?: string
        page?: number
        size?: number
    }): Promise<PageEmployeeDto> {
        return Service.searchEmployeesPage(
            params.organizationId,
            params.orgUnitId,
            params.personnelNumber,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<EmployeeDto> {
        return Service.getEmployeeById(id)
    }

    async hire(data: EmployeeHireRequest): Promise<EmployeeDto> {
        return Service.hireEmployee(data)
    }

    async dismiss(id: string, data: EmployeeDismissRequest): Promise<EmployeeDto> {
        return Service.dismissEmployee(id, data)
    }

    async getHistory(employeeId: string): Promise<EmployeeStatusEventDto[]> {
        return Service.getEmployeeHistory(employeeId)
    }

    async getAssignments(params: {
        employeeId: string
        itemId?: string
        page?: number
        size?: number
    }): Promise<any> {
        return Service.getEmployeeItemAssignmentsByEmployee(params.employeeId)
    }

    async getWearReport(params: {
        employeeId?: string
        itemId?: string
        page?: number
        size?: number
    }): Promise<any> {
        return Service.getEmployeeItemAssignmentsByEmployee(params.employeeId as any)
    }

    async remove(id: string): Promise<void> {
        return Service.deleteEmployee(id)
    }
}
