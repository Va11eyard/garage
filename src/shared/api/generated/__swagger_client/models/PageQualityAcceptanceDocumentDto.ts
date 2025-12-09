/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pageablenull } from './Pageablenull';
import type { QualityAcceptanceDocumentDto } from './QualityAcceptanceDocumentDto';
import type { Sortnull } from './Sortnull';
export type PageQualityAcceptanceDocumentDto = {
    totalElements?: number;
    totalPages?: number;
    pageable?: Pageablenull;
    size?: number;
    content?: Array<QualityAcceptanceDocumentDto>;
    number?: number;
    sort?: Sortnull;
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

