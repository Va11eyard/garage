import { Service, type EmployeeDto, type EmployeeTransferRequest } from '@/shared/api/generated/__swagger_client'

export class TransferStaffService {
    async transfer(employeeId: string, newOrgUnitId: string): Promise<EmployeeDto> {
        const request: EmployeeTransferRequest = {
            orgUnitId: newOrgUnitId,
            eventDate: new Date().toISOString()
        }
        return Service.transferEmployee(employeeId, request)
    }
}
