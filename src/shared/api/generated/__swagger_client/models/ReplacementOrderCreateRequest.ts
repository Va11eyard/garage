/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReplacementOrderLineCreateRequest } from './ReplacementOrderLineCreateRequest';
export type ReplacementOrderCreateRequest = {
    docNumber: string;
    docDate: string;
    organizationId: string;
    warehouseId: string;
    employeeId: string;
    reason?: string;
    lines: Array<ReplacementOrderLineCreateRequest>;
};

