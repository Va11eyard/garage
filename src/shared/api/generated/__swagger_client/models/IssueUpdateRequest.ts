/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IssueLineCreateRequest } from './IssueLineCreateRequest';
export type IssueUpdateRequest = {
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    warehouseId?: string;
    employeeId?: string;
    employeeFullName?: string;
    employeePosition?: string;
    employeeCategory?: string;
    comment?: string;
    lines?: Array<IssueLineCreateRequest>;
};

