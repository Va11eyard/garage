/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type IntegrationEndpoint = {
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleted?: boolean;
    deletedAt?: string;
    deletedBy?: string;
    id?: string;
    code?: string;
    name?: string;
    externalSystem?: IntegrationEndpoint.externalSystem;
    baseUrl?: string;
    status?: IntegrationEndpoint.status;
    lastSuccessAt?: string;
    lastErrorAt?: string;
    lastErrorMessage?: string;
};
export namespace IntegrationEndpoint {
    export enum externalSystem {
        HR_SYSTEM = 'HR_SYSTEM',
        ERP = 'ERP',
        ACCOUNTING = 'ACCOUNTING',
        SECURITY_SYSTEM = 'SECURITY_SYSTEM',
    }
    export enum status {
        NOT_CONFIGURED = 'NOT_CONFIGURED',
        INACTIVE = 'INACTIVE',
        ACTIVE = 'ACTIVE',
        ERROR = 'ERROR',
    }
}

