import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

interface ProvisionAnalysisParams {
    employeeId: string
    employeeCategory?: string
    season?: 'ALL' | 'SUMMER' | 'WINTER' | 'DEMISEASON'
}

export function useProvisionAnalysis(params: ProvisionAnalysisParams) {
    return useQuery({
        queryKey: ['provision-analysis', params],
        queryFn: () => Service.analyzeEmployeeProvision(
            params.employeeId,
            params.employeeCategory,
            params.season
        ),
        enabled: !!params.employeeId,
    })
}
