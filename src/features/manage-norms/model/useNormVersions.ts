'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ProvisionNormDto } from '@/shared/api/generated/__swagger_client'

export function useNormVersions(normId: string) {
    return useQuery<ProvisionNormDto[], Error>({
        queryKey: ['norm-versions', normId],
        queryFn: async () => {
            // Since there's no dedicated versions endpoint, return empty array
            // This can be updated when the API supports versioning
            return []
        },
        enabled: !!normId,
    })
}
