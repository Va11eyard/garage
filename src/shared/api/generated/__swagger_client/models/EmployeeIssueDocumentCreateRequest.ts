/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmployeeIssueLineRequest } from './EmployeeIssueLineRequest';
export type EmployeeIssueDocumentCreateRequest = {
    organizationId: string;
    warehouseId: string;
    docNumber?: string;
    docDate: string;
    comment?: string;
    lines: Array<EmployeeIssueLineRequest>;
};

