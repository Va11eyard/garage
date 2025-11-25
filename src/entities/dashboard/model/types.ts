export interface ConsolidatedDashboard {
    totalEmployees: number
    activeEmployees: number
    totalItems: number
    totalWarehouses: number
    pendingIssues: number
    pendingReturns: number
    lowStockItems: number
    recentActivities: DashboardActivity[]
}

export interface DashboardActivity {
    id: string
    type: string
    description: string
    timestamp: string
    userId?: string
}
