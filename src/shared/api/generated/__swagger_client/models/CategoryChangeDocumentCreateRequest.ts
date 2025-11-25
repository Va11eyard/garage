/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryChangeLineRequest } from './CategoryChangeLineRequest';
export type CategoryChangeDocumentCreateRequest = {
    organizationId: string;
    warehouseId: string;
    docNumber?: string;
    docDate: string;
    comment?: string;
    lines: Array<CategoryChangeLineRequest>;
};

