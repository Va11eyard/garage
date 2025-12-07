'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useItemGroup } from '@/features/manage-item-groups/model/useItemGroup'
import { useUpdateItemGroup } from '@/features/manage-item-groups/model/useUpdateItemGroup'
import { useItemGroups } from '@/features/manage-item-groups/model/useItemGroups'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ItemGroupEditForm({ id }: { id: string }) {
    const router = useRouter()
    const { t } = useTranslation()
    const { data: itemGroup, isLoading } = useItemGroup(id)
    const { data: itemGroupsData } = useItemGroups()
    const updateMutation = useUpdateItemGroup()
    
    const itemGroups = itemGroupsData || []
    
    const [formData, setFormData] = useState({
        name: '',
        parentId: '',
        active: true,
    })

    useEffect(() => {
        if (itemGroup) {
            setFormData({
                name: itemGroup.name || '',
                parentId: itemGroup.parentId || '__NONE__',
                active: itemGroup.active ?? true,
            })
        }
    }, [itemGroup])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    name: formData.name,
                    parentId: formData.parentId === '__NONE__' ? undefined : formData.parentId,
                    active: formData.active,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/item-groups')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />
    if (!itemGroup) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('itemGroup.title'), href: '/directories/item-groups' },
                { label: itemGroup.name || '', href: `/directories/item-groups/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('itemGroup.editGroup')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
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
                                key={formData.parentId}
                                value={formData.parentId}
                                onValueChange={(value) => setFormData({ ...formData, parentId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('itemGroup.noParent')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="__NONE__">{t('itemGroup.noParent')}</SelectItem>
                                    {itemGroups.filter((g: any) => g.id !== id).map((group: any) => (
                                        <SelectItem key={group.id} value={group.id!}>
                                            {group.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="active"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <GovLabel htmlFor="active" className="mb-0">{t('common.active')}</GovLabel>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <GovButton type="submit" disabled={updateMutation.isPending}>
                                {updateMutation.isPending ? t('common.loading') : t('common.save')}
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
                </GovCardContent>
            </GovCard>
        </div>
    )
}
