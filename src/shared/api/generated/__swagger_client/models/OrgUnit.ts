/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Organization } from './Organization';
export type OrgUnit = {
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleted?: boolean;
    deletedAt?: string;
    deletedBy?: string;
    id?: string;
    organization?: Organization;
    parent?: OrgUnit;
    code?: string;
    name?: string;
    unitType?: string;
    active?: boolean;
};

