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
        return Service.searchProvisionNormsPage(params.organizationId, params.employeeCategory, params.season, params.search, params.page, params.size)
    }

    async get(id: string): Promise<ProvisionNormDto> {
        return Service.getProvisionNormById(id)
    }

    async getVersion(normId: string, versionId: string): Promise<any> {
        return Service.getProvisionNormById(versionId)
    }

    async create(data: ProvisionNormCreateRequest): Promise<ProvisionNormDto> {
        return Service.createProvisionNorm(data)
    }

    async update(id: string, data: ProvisionNormUpdateRequest): Promise<ProvisionNormDto> {
        return Service.updateProvisionNorm(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.deleteProvisionNorm(id)
    }
}

export const NormService = ProvisionNormService
