import {
    Service,
    type PersonDto,
    type PersonCreateRequest,
    type PersonUpdateRequest,
    type PagePersonDto,
} from '@/shared/api/generated/__swagger_client'

export class PersonService {
    async list(): Promise<PersonDto[]> {
        return Service.listPersons()
    }

    async search(params: {
        lastName?: string
        firstName?: string
        middleName?: string
        page?: number
        size?: number
    }): Promise<PagePersonDto> {
        return Service.searchPersonsPage(params.lastName, params.firstName, params.page, params.size)
    }

    async get(id: string): Promise<PersonDto> {
        return Service.getPersonById(id)
    }

    async create(data: PersonCreateRequest): Promise<PersonDto> {
        return Service.createPerson(data)
    }

    async update(id: string, data: PersonUpdateRequest): Promise<PersonDto> {
        return Service.updatePerson(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.deletePerson(id)
    }
}
