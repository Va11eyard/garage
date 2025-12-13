import { OpenAPI } from "@/shared//api/generated/__swagger_client";
import axios from 'axios';

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || 'http://10.1.10.83:8087'

axios.interceptors.request.use((config) => {
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    config.headers['Pragma'] = 'no-cache';
    config.headers['Expires'] = '0';
    return config;
});

export const API_CONFIG = {
    baseURL: OpenAPI.BASE,
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
    pageSize: Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 20,
} as const

export function setAuthToken(token: string) {
    OpenAPI.TOKEN = token;
}

export function clearAuthToken() {
    OpenAPI.TOKEN = undefined;
}

if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token')
    if (token) {
        setAuthToken(token)
    }
}

export const ENDPOINTS = {
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        refresh: '/auth/refresh',
        me: '/auth/me',
    },
    admin: {
        users: '/admin/users',
        roles: '/admin/roles',
        permissions: '/admin/permissions',
        auditLog: '/admin/audit-log',
    },
    directories: {
        organizations: '/directories/organizations',
        warehouses: '/directories/warehouses',
        items: '/directories/items',
        norms: '/directories/norms',
    },
    staff: {
        personnel: '/staff/personnel',
        hiring: '/staff/hiring',
        transfers: '/staff/transfers',
        dismissals: '/staff/dismissals',
        biometrics: '/staff/biometrics',
    },
    inventory: {
        stock: '/inventory/stock',
        batches: '/inventory/batches',
        barcodes: '/inventory/barcodes',
        acceptance: '/inventory/acceptance',
        issue: '/inventory/issue',
        return: '/inventory/return',
        writeoff: '/inventory/writeoff',
        movements: '/inventory/movements',
        inventoryCheck: '/inventory/inventory-check',
        planning: '/inventory/planning',
    },
    equipment: {
        scanners: '/equipment/scanners',
        biometric: '/equipment/biometric',
        printers: '/equipment/printers',
        logs: '/equipment/logs',
    },
    integration: {
        sync: '/integration/sync',
        consolidation: '/integration/consolidation',
        externalSystems: '/integration/external-systems',
    },
    reports: {
        staff: '/reports/staff',
        inventory: '/reports/inventory',
        planning: '/reports/planning',
        analytics: '/reports/analytics',
    },
    nsi: {
        organizations: '/nsi/organizations',
        orgUnits: '/nsi/org-units',
        warehouses: '/nsi/warehouses',
        warehouseZones: '/nsi/warehouse-zones',
        warehouseCells: '/nsi/warehouse-cells',
    },
} as const;
