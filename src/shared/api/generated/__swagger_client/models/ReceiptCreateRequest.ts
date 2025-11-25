/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReceiptLineRequest } from './ReceiptLineRequest';
export type ReceiptCreateRequest = {
    docNumber: string;
    docDate: string;
    organizationId: string;
    warehouseId: string;
    supplierName?: string;
    comment?: string;
    lines: Array<ReceiptLineRequest>;
};

