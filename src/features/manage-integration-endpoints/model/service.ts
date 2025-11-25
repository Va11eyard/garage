import {
    Service,
    type IntegrationEndpoint,
    type IntegrationMessage,
} from '@/shared/api/generated/__swagger_client'

export class IntegrationEndpointService {
    async list(): Promise<IntegrationEndpoint[]> {
        return Service.listEndpoints()
    }

    async create(params: {
        code: string
        name: string
        system: 'HR_SYSTEM' | 'ERP' | 'ACCOUNTING' | 'SECURITY_SYSTEM'
        baseUrl?: string
    }): Promise<IntegrationEndpoint> {
        return Service.createEndpoint(params.code, params.name, params.system, params.baseUrl)
    }

    async test(code: string): Promise<IntegrationEndpoint> {
        return Service.test(code)
    }

    async send(code: string, messageType: string, payload?: string): Promise<IntegrationMessage> {
        return Service.send(code, messageType, payload)
    }
}
