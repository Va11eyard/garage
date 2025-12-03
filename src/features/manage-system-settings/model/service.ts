import {
    Service,
    type SystemSettingDto,
    type SystemSettingUpsertRequest,
} from '@/shared/api/generated/__swagger_client'

export class SystemSettingService {
    async list(): Promise<SystemSettingDto[]> {
        return Service.adminListSystemSettings()
    }

    async get(id: string): Promise<SystemSettingDto> {
        return Service.adminGetSystemSettingById(id)
    }

    async getByKey(key: string): Promise<SystemSettingDto> {
        return Service.adminGetSystemSettingByKey(key)
    }

    async upsert(data: SystemSettingUpsertRequest): Promise<SystemSettingDto> {
        return Service.adminUpsertSystemSetting(data)
    }

    async delete(id: string): Promise<void> {
        return Service.adminDeleteSystemSetting(id)
    }
}
