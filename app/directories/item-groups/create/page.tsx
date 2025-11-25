'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect } from '@/gov-design/components/Form'
import { useCreateItemGroup } from '@/features/manage-item-groups/model/useCreateItemGroup'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Service } from '@/shared/api/generated/__swagger_client'
import { Spinner } from '@/shared/ui/spinner'

export default function ItemGroupCreatePage() {
    const router = useRouter()
    const { t } = useTranslation()
    const createMutation = useCreateItemGroup()
    const [isLoading, setIsLoading] = useState(false)
    const [itemGroups, setItemGroups] = useState<any[]>([])
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        parentId: '',
    })

    // Load item groups for parent selection
    useState(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const data = await Service.listAll()
                setItemGroups(data)
            } catch (error) {
                toast.error(t('common.error'))
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
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
                            <GovSelect
                                value={formData.parentId}
                                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                            >
                                <option value="">{t('common.select')}</option>
                                {itemGroups.map((group) => (
                                    <option key={group.id} value={group.id!}>
                                        {group.name}
                                    </option>
                                ))}
                            </GovSelect>
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
