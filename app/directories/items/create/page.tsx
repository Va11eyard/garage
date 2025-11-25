'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect, GovTextarea } from '@/gov-design/components/Form'
import { useCreateItem } from '@/features/manage-items/model/useCreateItem'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { Service } from '@/shared/api/generated/__swagger_client'

export default function ItemCreatePage() {
    const router = useRouter()
    const { t } = useTranslation()
    const createMutation = useCreateItem()
    const [isLoading, setIsLoading] = useState(false)
    const [itemGroups, setItemGroups] = useState<any[]>([])
    const [units, setUnits] = useState<any[]>([])
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
        itemGroupId: '',
        unitOfMeasureId: '',
    })

    // Load item groups and units
    useState(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const [groupsData, unitsData] = await Promise.all([
                    Service.listAll(),
                    Service.list()
                ])
                setItemGroups(groupsData)
                setUnits(unitsData)
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
        
        if (!formData.code || !formData.name || !formData.unitOfMeasureId) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                ...formData,
                itemGroupId: formData.itemGroupId || undefined,
                description: formData.description || undefined,
            })
            toast.success(t('common.success'))
            router.push('/directories/items')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('items.title'), href: '/directories/items' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                        <div>
                            <GovLabel required>{t('items.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                required
                                placeholder={t('items.code')}
                            />
                        </div>

                        <div>
                            <GovLabel required>{t('items.name')}</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder={t('items.name')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('items.itemGroup')}</GovLabel>
                            <GovSelect
                                value={formData.itemGroupId}
                                onChange={(e) => setFormData({ ...formData, itemGroupId: e.target.value })}
                            >
                                <option value="">{t('common.select')}</option>
                                {itemGroups.map((group) => (
                                    <option key={group.id} value={group.id!}>
                                        {group.name}
                                    </option>
                                ))}
                            </GovSelect>
                        </div>

                        <div>
                            <GovLabel required>{t('items.unitOfMeasure')}</GovLabel>
                            <GovSelect
                                value={formData.unitOfMeasureId}
                                onChange={(e) => setFormData({ ...formData, unitOfMeasureId: e.target.value })}
                                required
                            >
                                <option value="">{t('common.select')}</option>
                                {units.map((unit) => (
                                    <option key={unit.id} value={unit.id!}>
                                        {unit.name}
                                    </option>
                                ))}
                            </GovSelect>
                        </div>

                        <div>
                            <GovLabel>{t('items.description')}</GovLabel>
                            <GovTextarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder={t('items.description')}
                                rows={3}
                            />
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
