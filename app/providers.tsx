'use client'

import { QueryClient, QueryClientProvider, MutationCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { useState } from 'react'
import { Toaster } from '@/shared//ui/sonner'
import 'reflect-metadata'
import { container } from 'tsyringe'
import "@/shared//api/config"

import { OrganizationService } from '@/features/manage-organizations/model/service'
import { WarehouseService } from '@/features/manage-warehouses/model/service'
import { OrgUnitService} from "@/features/manage-org-units/model/service";
import { WarehouseCellService } from "@/features/manage-warehouse-cells/model/service";
import { WarehouseZoneService } from "@/features/manage-warehouse-zones/model/service";
import { AuthLoginService } from "@/features/auth/login/model/service";
import { AuthLogoutService } from "@/features/auth/logout/model/service";

container.register('OrganizationService', { useClass: OrganizationService })
container.register('OrgUnitService', { useClass: OrgUnitService })
container.register('WarehouseService', { useClass: WarehouseService })
container.register('WarehouseCellService', { useClass: WarehouseCellService })
container.register('WarehouseZoneService', { useClass: WarehouseZoneService })
container.register('AuthLoginService', { useClass: AuthLoginService })
container.register('AuthLogoutService', { useClass: AuthLogoutService })

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => {
        const client = new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 0, 
                    refetchOnWindowFocus: true,
                    refetchOnMount: true,
                    retry: 1,
                },
            },
        })
        
        // Configure mutation cache AFTER queryClient is created
        client.getMutationCache().config.onSuccess = async () => {
            await client.invalidateQueries({
                refetchType: 'active'
            })
        }
        
        return client
    })
    
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
            {/*{process.env.NODE_ENV === 'development' && (*/}
            {/*    <ReactQueryDevtools initialIsOpen={false} />*/}
            {/*)}*/}
        </QueryClientProvider>
    )
}
