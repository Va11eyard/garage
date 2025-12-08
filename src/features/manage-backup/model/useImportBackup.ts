'use client'

import { useMutation } from '@tanstack/react-query'
import { StubService } from '@/shared/api/generated/__swagger_client'

export function useImportBackup() {
    return useMutation({
        mutationFn: (file: Blob) => StubService.adminRequestBackupImport({ file }),
    })
}
