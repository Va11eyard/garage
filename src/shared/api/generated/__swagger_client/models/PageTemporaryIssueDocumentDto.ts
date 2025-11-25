/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pageablenull } from './Pageablenull';
import type { Sortnull } from './Sortnull';
import type { TemporaryIssueDocumentDto } from './TemporaryIssueDocumentDto';
export type PageTemporaryIssueDocumentDto = {
    totalElements?: number;
    totalPages?: number;
    pageable?: Pageablenull;
    size?: number;
    content?: Array<TemporaryIssueDocumentDto>;
    number?: number;
    sort?: Sortnull;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    empty?: boolean;
};

