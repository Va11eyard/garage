import {
    Service,
    type OrgUnitDto,
    type OrgUnitCreateRequest,
    type OrgUnitUpdateRequest,
} from '@/shared/api/generated/__swagger_client'

export class OrgUnitService {
    async listByOrganization(orgId: string): Promise<OrgUnitDto[]> {
        return Service.listOrgUnitsByOrganization(orgId)
    }

    async search(params: {
        code?: string
        name?: string
        orgId?: string
        type?: string
        page?: number
        size?: number
    }) {
        if (params.orgId) {
            return Service.listOrgUnitsByOrganization(params.orgId)
        }
        return []
    }

    async get(id: string): Promise<OrgUnitDto> {
        return Service.getOrgUnitById(id)
    }

    async create(data: OrgUnitCreateRequest): Promise<OrgUnitDto> {
        return Service.createOrgUnit(data)
    }

    async update(id: string, data: OrgUnitUpdateRequest): Promise<OrgUnitDto> {
        return Service.updateOrgUnit(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.deleteOrgUnit(id)
    }
}
