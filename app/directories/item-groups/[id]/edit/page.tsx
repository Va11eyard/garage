'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect } from '@/gov-design/components/Form'
import { useItemGroup } from '@/features/manage-item-groups/model/useItemGroup'
import { useUpdateItemGroup } from '@/features/manage-item-groups/model/useUpdateItemGroup'
import { useItemGroups } from '@/features/manage-item-groups/model/useItemGroups'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'

export default function ItemGroupEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: itemGroup, isLoading } = useItemGroup(id)
    const { data: allGroups } = useItemGroups()
    const updateMutation = useUpdateItemGroup()
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        parentId: '',
    })

    useEffect(() => {
        if (itemGroup) {
            setFormData({
                code: itemGroup.code || '',
                name: itemGroup.name || '',
                parentId: itemGroup.parentId || '',
            })
        }
    }, [itemGroup])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.code || !formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    ...formData,
                    parentId: formData.parentId || undefined,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/item-groups')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <Spinner />
    if (!itemGroup) return <div>{t('common.notFound')}</div>

    const availableParents = allGroups?.filter((g: any) => g.id !== id) || []

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
                            <GovSelect
                                value={formData.parentId}
                                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                            >
                                <option value="">{t('common.select')}</option>
                                {availableParents.map((group: any) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </GovSelect>
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
