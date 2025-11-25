/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventoryLineCreateRequest } from './InventoryLineCreateRequest';
export type InventoryDocumentUpdateRequest = {
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    warehouseId?: string;
    responsibleEmployeeId?: string;
    comment?: string;
    lines?: Array<InventoryLineCreateRequest>;
};

