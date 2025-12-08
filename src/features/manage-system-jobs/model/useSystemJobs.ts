'use client'

import { useQuery } from '@tanstack/react-query'
import { StubService } from '@/shared/api/generated/__swagger_client'

export function useSystemJobs() {
    return useQuery({
        queryKey: ['system-jobs'],
        queryFn: () => StubService.adminListSystemJobs(),
    })
}
