'use client'

import { useMutation } from '@tanstack/react-query'
import { OpenAPI } from '@/shared/api/generated/__swagger_client'

export function useExportBackup() {
    return useMutation({
        mutationFn: async () => {
            // Get token from OpenAPI config or localStorage
            const token = OpenAPI.TOKEN || localStorage.getItem('auth_token')
            
            if (!token) {
                throw new Error('No authentication token found')
            }

            // Make direct fetch call to handle file download
            const response = await fetch(`${OpenAPI.BASE}/api/admin/system/backup/export`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(errorText || 'Failed to export backup')
            }

            // Get the blob from response
            const blob = await response.blob()
            
            // Create download link
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `backup-${new Date().toISOString().split('T')[0]}.json`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            
            return 'success'
        },
    })
}
