/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Organization } from './Organization';
import type { OrgUnit } from './OrgUnit';
export type Warehouse = {
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleted?: boolean;
    deletedAt?: string;
    deletedBy?: string;
    id?: string;
    organization?: Organization;
    orgUnit?: OrgUnit;
    code?: string;
    name?: string;
    address?: string;
    description?: string;
    active?: boolean;
};

