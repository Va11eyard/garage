/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReturnLineCreateRequest } from './ReturnLineCreateRequest';
export type ReturnCreateRequest = {
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    warehouseId?: string;
    employeeId?: string;
    employeeFullName?: string;
    reason?: string;
    lines?: Array<ReturnLineCreateRequest>;
};

