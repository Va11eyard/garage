/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmployeeReturnLineRequest } from './EmployeeReturnLineRequest';
export type EmployeeReturnDocumentCreateRequest = {
    organizationId: string;
    warehouseId: string;
    docNumber?: string;
    docDate: string;
    comment?: string;
    lines: Array<EmployeeReturnLineRequest>;
};

