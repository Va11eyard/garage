/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IssueDocumentDto } from './IssueDocumentDto';
import type { Pageablenull } from './Pageablenull';
import type { Sortnull } from './Sortnull';
export type PageIssueDocumentDto = {
    totalElements?: number;
    totalPages?: number;
    pageable?: Pageablenull;
    size?: number;
    content?: Array<IssueDocumentDto>;
    number?: number;
    sort?: Sortnull;
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

