/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmployeeDto } from './EmployeeDto';
import type { Pageablenull } from './Pageablenull';
import type { Sortnull } from './Sortnull';
export type PageEmployeeDto = {
    totalElements?: number;
    totalPages?: number;
    pageable?: Pageablenull;
    size?: number;
    content?: Array<EmployeeDto>;
    number?: number;
    sort?: Sortnull;
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

