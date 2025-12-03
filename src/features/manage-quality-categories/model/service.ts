import {
    Service,
    type QualityCategoryDto,
    type QualityCategoryCreateRequest,
    type QualityCategoryUpdateRequest,
    type PageQualityCategoryDto,
} from '@/shared/api/generated/__swagger_client'

export class QualityCategoryService {
    async list(): Promise<QualityCategoryDto[]> {
        return Service.listQualityCategories()
    }

    async search(params: {
        q?: string
        page?: number
        size?: number
    }): Promise<PageQualityCategoryDto> {
        return Service.searchQualityCategories(params.q, params.page, params.size)
    }

    async get(id: string): Promise<QualityCategoryDto> {
        return Service.getQualityCategoryById(id)
    }

    async create(data: QualityCategoryCreateRequest): Promise<QualityCategoryDto> {
        return Service.createQualityCategory(data)
    }

    async update(id: string, data: QualityCategoryUpdateRequest): Promise<QualityCategoryDto> {
        return Service.updateQualityCategory(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.deleteQualityCategory(id)
    }
}
