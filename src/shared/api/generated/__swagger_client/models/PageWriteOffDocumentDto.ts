/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pageablenull } from './Pageablenull';
import type { Sortnull } from './Sortnull';
import type { WriteOffDocumentDto } from './WriteOffDocumentDto';
export type PageWriteOffDocumentDto = {
    totalElements?: number;
    totalPages?: number;
    pageable?: Pageablenull;
    size?: number;
    content?: Array<WriteOffDocumentDto>;
    number?: number;
    sort?: Sortnull;
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

