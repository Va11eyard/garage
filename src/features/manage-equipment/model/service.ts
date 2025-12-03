import {
    Service,
    type Device,
} from '@/shared/api/generated/__swagger_client'

export class EquipmentService {
    async list(): Promise<Device[]> {
        return Service.listDevices()
    }

    async register(params: {
        code: string
        name: string
        type: string
        warehouseId?: string
    }): Promise<Device> {
        return Service.registerDevice(params.code, params.name, params.type, params.warehouseId)
    }

    async heartbeat(code: string, data?: string): Promise<any> {
        return Service.sendDeviceHeartbeat(code, data)
    }

    async reportError(code: string, error: string): Promise<any> {
        return Service.reportDeviceError(code, error)
    }
}
