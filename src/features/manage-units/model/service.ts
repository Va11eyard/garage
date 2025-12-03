import {
    Service,
    type UnitOfMeasureDto,
    type UnitOfMeasureCreateRequest,
    type UnitOfMeasureUpdateRequest,
    type PageUnitOfMeasureDto,
} from '@/shared/api/generated/__swagger_client'

export class UnitOfMeasureService {
    async list(): Promise<UnitOfMeasureDto[]> {
        return Service.listUnitsOfMeasure()
    }

    async search(params: {
        code?: string
        name?: string
        page?: number
        size?: number
    }): Promise<PageUnitOfMeasureDto> {
        return Service.searchUnitsOfMeasure(params.code, params.name, params.page, params.size)
    }

    async get(id: string): Promise<UnitOfMeasureDto> {
        return Service.getUnitOfMeasureById(id)
    }

    async create(data: UnitOfMeasureCreateRequest): Promise<UnitOfMeasureDto> {
        return Service.createUnitOfMeasure(data)
    }

    async update(id: string, data: UnitOfMeasureUpdateRequest): Promise<UnitOfMeasureDto> {
        return Service.updateUnitOfMeasure(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteUnitOfMeasure(id)
    }
}
