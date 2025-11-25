export interface IntegrationEndpoint {
    id: string
    code: string
    name: string
    system: 'HR_SYSTEM' | 'ERP' | 'ACCOUNTING' | 'SECURITY_SYSTEM'
    baseUrl?: string | null
    active: boolean
    lastTestDate?: string | null
    lastTestStatus?: 'SUCCESS' | 'FAILURE' | null
    createdAt: string
    updatedAt: string
}

export interface IntegrationMessage {
    id: string
    endpointCode: string
    messageType: string
    direction: 'INBOUND' | 'OUTBOUND'
    payload: string
    status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED'
    sentAt?: string | null
    deliveredAt?: string | null
    errorMessage?: string | null
}
