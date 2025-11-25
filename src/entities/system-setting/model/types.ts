export interface SystemSetting {
    id: string
    key: string
    value: string
    description?: string | null
    category?: string | null
    dataType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON'
    isPublic: boolean
    updatedAt: string
}
