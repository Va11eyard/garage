'use client'

import { useQuery } from '@tanstack/react-query'
import { NormService } from './service'

const service = new NormService()

export function useNormVersion(normId: string, versionId: string) {
    return useQuery({
        queryKey: ['norms', normId, 'versions', versionId],
        queryFn: () => service.getVersion(normId, versionId),
        enabled: !!normId && !!versionId,
    })
}
