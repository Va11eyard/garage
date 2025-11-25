/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TemporaryIssueLineCreateRequest } from './TemporaryIssueLineCreateRequest';
export type TemporaryIssueCreateRequest = {
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    warehouseId?: string;
    employeeId?: string;
    reason?: string;
    plannedReturnDate?: string;
    lines?: Array<TemporaryIssueLineCreateRequest>;
};

