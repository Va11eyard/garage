/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntegrationEndpoint } from './IntegrationEndpoint';
export type IntegrationMessage = {
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleted?: boolean;
    deletedAt?: string;
    deletedBy?: string;
    id?: string;
    endpoint?: IntegrationEndpoint;
    direction?: IntegrationMessage.direction;
    status?: IntegrationMessage.status;
    messageType?: string;
    createdTime?: string;
    sentTime?: string;
    payload?: string;
    errorMessage?: string;
};
export namespace IntegrationMessage {
    export enum direction {
        OUTBOUND = 'OUTBOUND',
        INBOUND = 'INBOUND',
    }
    export enum status {
        PENDING = 'PENDING',
        SENT = 'SENT',
        FAILED = 'FAILED',
        RECEIVED = 'RECEIVED',
        PROCESSED = 'PROCESSED',
    }
}

