import {
    Service,
    type UserDto,
    type CreateUserRequest,
    type UpdateUserRequest,
    type PageUserDto,
} from '@/shared/api/generated/__swagger_client'

export class UserService {
    async list(): Promise<UserDto[]> {
        return Service.list8()
    }

    async search(
        username?: string,
        roles?: string[],
        page?: number,
        size?: number
    ): Promise<PageUserDto> {
        return Service.search17(username, roles, page, size)
    }

    async get(id: string): Promise<UserDto> {
        return Service.get23(id)
    }

    async create(data: CreateUserRequest): Promise<UserDto> {
        return Service.create26(data)
    }

    async update(id: string, data: UpdateUserRequest): Promise<UserDto> {
        return Service.update23(id, data)
    }

    async restore(id: string): Promise<UserDto> {
        return Service.restore(id)
    }

    async delete(id: string): Promise<void> {
        return Service.delete23(id)
    }
}