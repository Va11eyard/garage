import {
    Service,
    type SystemSettingDto,
    type SystemSettingUpsertRequest,
} from '@/shared/api/generated/__swagger_client'

export class SystemSettingService {
    async list(): Promise<SystemSettingDto[]> {
        return Service.list8()
    }

    async upsert(data: SystemSettingUpsertRequest): Promise<SystemSettingDto> {
        return Service.upsert(data)
    }
}
