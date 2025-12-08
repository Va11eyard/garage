/**
 * Centralized query keys for React Query
 * Use these constants to ensure consistency across the application
 */

export const QUERY_KEYS = {
    // Directories
    ORGANIZATIONS: 'organizations',
    WAREHOUSES: 'warehouses',
    WAREHOUSE_ZONES: 'warehouse-zones',
    WAREHOUSE_CELLS: 'warehouse-cells',
    ITEMS: 'items',
    ITEM_GROUPS: 'item-groups',
    UNITS: 'units',
    QUALITY_CATEGORIES: 'quality-categories',
    EMPLOYEE_CATEGORIES: 'employee-categories',
    ORG_UNITS: 'org-units',
    PERSONS: 'persons',
    NORMS: 'norms',
    ITEM_SUPPLY_NORMS: 'item-supply-norms',
    
    // Staff
    EMPLOYEES: 'employees',
    STAFF: 'staff',
    ASSIGNMENTS: 'assignments',
    EMPLOYEE_ASSIGNMENTS: 'employee-assignments',
    
    // Documents
    RECEIPTS: 'receipts',
    ISSUES: 'issues',
    RETURNS: 'returns',
    WRITE_OFFS: 'write-offs',
    MOVEMENTS: 'movements',
    TEMPORARY_ISSUES: 'temporary-issues',
    QUALITY_ACCEPTANCE: 'quality-acceptance',
    INVENTORY_SURPLUS: 'inventory-surplus',
    INVENTORY_CHECK: 'inventory-check',
    
    // Stock
    STOCK: 'stock',
    STOCK_BALANCES: 'stock-balances',
    
    // Admin
    USERS: 'users',
    ROLES: 'roles',
    AUDIT_LOGS: 'audit-logs',
    SYSTEM_SETTINGS: 'system-settings',
    SYSTEM_JOBS: 'system-jobs',
    EQUIPMENT: 'equipment',
    INTEGRATION_ENDPOINTS: 'integration-endpoints',
    CATEGORY_CHANGES: 'category-changes',
    
    // Reports
    PROVISION_ANALYSIS: 'provision-analysis',
    WEAR_REPORT: 'wear-report',
    
    // Dashboard
    CONSOLIDATION_DASHBOARD: 'consolidation-dashboard',
    ADMIN_SEARCH: 'admin-search',
} as const

export type QueryKey = typeof QUERY_KEYS[keyof typeof QUERY_KEYS]
