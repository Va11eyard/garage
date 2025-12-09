/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuditLogDto } from './AuditLogDto';
import type { Pageablenull } from './Pageablenull';
import type { Sortnull } from './Sortnull';
export type PageAuditLogDto = {
    totalElements?: number;
    totalPages?: number;
    pageable?: Pageablenull;
    size?: number;
    content?: Array<AuditLogDto>;
    number?: number;
    sort?: Sortnull;
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

