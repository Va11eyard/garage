import { useQuery } from '@tanstack/react-query'
import { EmployeeProvisionService } from './service'

const service = new EmployeeProvisionService()

export function useEmployeeProvisionCard(employeeId: string | undefined) {
    return useQuery({
        queryKey: ['employee-provision-card', employeeId],
        queryFn: () => service.getProvisionCard(employeeId!),
        enabled: !!employeeId,
    })
}
