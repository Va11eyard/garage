/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pageablenull } from './Pageablenull';
import type { PersonDto } from './PersonDto';
import type { Sortnull } from './Sortnull';
export type PagePersonDto = {
    totalElements?: number;
    totalPages?: number;
    pageable?: Pageablenull;
    size?: number;
    content?: Array<PersonDto>;
    number?: number;
    sort?: Sortnull;
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

