import {
    Service,
    type PurchasePlanDto,
    type PurchasePlanGenerateRequest,
} from '@/shared/api/generated/__swagger_client'

export class PurchasePlanService {
    async generate(data: PurchasePlanGenerateRequest): Promise<PurchasePlanDto> {
        return Service.generate(data)
    }

    async changeStatus(
        id: string,
        status: 'DRAFT' | 'APPROVED' | 'SENT' | 'CLOSED'
    ): Promise<PurchasePlanDto> {
        return Service.changeStatus(id, status)
    }
}
