import {
    Service,
    type EmployeeProvisionCardDto,
    type EmployeeProvisionReportDto,
} from '@/shared/api/generated/__swagger_client'

export class EmployeeProvisionService {
    async getProvisionCard(employeeId: string): Promise<EmployeeProvisionCardDto> {
        return Service.getProvisionCard(employeeId)
    }

    async analyzeEmployee(employeeId: string): Promise<EmployeeProvisionReportDto> {
        return Service.analyzeEmployee(employeeId)
    }
}
