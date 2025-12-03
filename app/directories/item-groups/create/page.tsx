'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useCreateItemGroup } from '@/features/manage-item-groups/model/useCreateItemGroup'
import { useItemGroups } from '@/features/manage-item-groups/model/useItemGroups'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'

export default function ItemGroupCreatePage() {
    const router = useRouter()
    const { t } = useTranslation()
    const createMutation = useCreateItemGroup()
    const { data: itemGroups = [], isLoading } = useItemGroups()
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        parentId: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.code || !formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                ...formData,
                parentId: formData.parentId || undefined,
            })
            toast.success(t('common.success'))
            router.push('/directories/item-groups')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('itemGroup.title'), href: '/directories/item-groups' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                        <div>
                            <GovLabel required>{t('itemGroup.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                required
                                placeholder={t('itemGroup.code')}
                            />
                        </div>

                        <div>
                            <GovLabel required>{t('itemGroup.name')}</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder={t('itemGroup.name')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('itemGroup.parentGroup')}</GovLabel>
                            <Select
                                value={formData.parentId}
                                onValueChange={(value) => setFormData({ ...formData, parentId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('common.select')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {itemGroups.map((group: any) => (
                                        <SelectItem key={group.id} value={group.id!}>
                                            {group.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <GovButton type="submit" disabled={createMutation.isPending}>
                                {createMutation.isPending ? t('common.loading') : t('common.create')}
                            </GovButton>
                            <GovButton 
                                type="button" 
                                variant="secondary"
                                onClick={() => router.back()}
                            >
                                {t('common.cancel')}
                            </GovButton>
                        </div>
            </form>
        </div>
    )
}
