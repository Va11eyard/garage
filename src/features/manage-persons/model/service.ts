import {
    Service,
    type PersonDto,
    type PersonCreateRequest,
    type PersonUpdateRequest,
    type PagePersonDto,
} from '@/shared/api/generated/__swagger_client'

export class PersonService {
    async list(): Promise<PersonDto[]> {
        return Service.list6()
    }

    async search(params: {
        lastName?: string
        firstName?: string
        middleName?: string
        page?: number
        size?: number
    }): Promise<PagePersonDto> {
        return Service.search9(params.lastName, params.firstName, params.middleName, params.page, params.size as any)
    }

    async get(id: string): Promise<PersonDto> {
        return Service.get12(id)
    }

    async create(data: PersonCreateRequest): Promise<PersonDto> {
        return Service.create13(data)
    }

    async update(id: string, data: PersonUpdateRequest): Promise<PersonDto> {
        return Service.update12(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete12(id)
    }
}
