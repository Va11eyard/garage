import {
    Service,
    type ProvisionNormDto,
    type ProvisionNormCreateRequest,
    type ProvisionNormUpdateRequest,
    type PageProvisionNormDto,
} from '@/shared/api/generated/__swagger_client'

export class ProvisionNormService {
    async search(params: {
        organizationId?: string
        employeeCategory?: string
        season?: 'ALL' | 'SUMMER' | 'WINTER' | 'DEMISEASON'
        search?: string
        page?: number
        size?: number
    }): Promise<PageProvisionNormDto> {
        return Service.search8(params.organizationId, params.employeeCategory, params.season, params.search, params.page, params.size)
    }

    async get(id: string): Promise<ProvisionNormDto> {
        return Service.get11(id)
    }

    async create(data: ProvisionNormCreateRequest): Promise<ProvisionNormDto> {
        return Service.create12(data)
    }

    async update(id: string, data: ProvisionNormUpdateRequest): Promise<ProvisionNormDto> {
        return Service.update11(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete11(id)
    }
}
