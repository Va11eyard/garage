/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmployeeReturnDocumentDto } from './EmployeeReturnDocumentDto';
import type { Pageablenull } from './Pageablenull';
import type { Sortnull } from './Sortnull';
export type PageEmployeeReturnDocumentDto = {
    totalElements?: number;
    totalPages?: number;
    pageable?: Pageablenull;
    size?: number;
    content?: Array<EmployeeReturnDocumentDto>;
    number?: number;
    sort?: Sortnull;
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

