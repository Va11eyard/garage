import {
    Service,
    type IntegrationEndpoint,
    type IntegrationMessage,
} from '@/shared/api/generated/__swagger_client'

export class IntegrationEndpointService {
    async list(): Promise<IntegrationEndpoint[]> {
        return Service.listIntegrationEndpoints()
    }

    async create(params: {
        code: string
        name: string
        system: 'HR_SYSTEM' | 'ERP' | 'ACCOUNTING' | 'SECURITY_SYSTEM'
        baseUrl?: string
    }): Promise<IntegrationEndpoint> {
        return Service.createIntegrationEndpoint(params.code, params.name, params.system, params.baseUrl)
    }

    async test(code: string): Promise<IntegrationEndpoint> {
        return Service.testIntegrationEndpointConnection(code)
    }

    async send(code: string, messageType: string, payload?: string): Promise<IntegrationMessage> {
        return Service.sendTestIntegrationMessage(code, messageType, payload)
    }
}
