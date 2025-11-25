import { useQuery } from '@tanstack/react-query'
import { EmployeeProvisionService } from './service'

const service = new EmployeeProvisionService()

export function useEmployeeProvisionAnalysis(employeeId: string | undefined) {
    return useQuery({
        queryKey: ['employee-provision-analysis', employeeId],
        queryFn: () => service.analyzeEmployee(employeeId!),
        enabled: !!employeeId,
    })
}
