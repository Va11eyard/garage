/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventorySurplusLineCreateRequest } from './InventorySurplusLineCreateRequest';
export type InventorySurplusUpdateRequest = {
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    warehouseId?: string;
    comment?: string;
    lines?: Array<InventorySurplusLineCreateRequest>;
};

