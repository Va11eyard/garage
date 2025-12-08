'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { ArrowLeft } from 'lucide-react'
import { useSystemSettings } from '@/features/manage-system-settings/model/useSystemSettings'

export default function SystemSettingViewPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const { data: settings, isLoading } = useSystemSettings()
    const setting = settings?.find((s: any) => s.id === id)

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        )
    }

    if (!setting) {
        return (
            <div className="container mx-auto p-6">
                <div className="text-center">
                    <p className="text-gray-500">Не найдено</p>
                    <Button onClick={() => router.back()} className="mt-4">
                        Назад
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold">Просмотр настройки</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{setting.key}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">
                            Ключ
                        </label>
                        <p className="mt-1">{setting.key}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-500">
                            Значение
                        </label>
                        <p className="mt-1">{setting.value}</p>
                    </div>

                    {setting.description && (
                        <div>
                            <label className="text-sm font-medium text-gray-500">
                                Описание
                            </label>
                            <p className="mt-1">{setting.description}</p>
                        </div>
                    )}

                    {setting.groupCode && (
                        <div>
                            <label className="text-sm font-medium text-gray-500">
                                Код группы
                            </label>
                            <p className="mt-1">{setting.groupCode}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="mt-6 flex gap-2">
                <Button onClick={() => router.back()}>
                    Назад
                </Button>
            </div>
        </div>
    )
}
