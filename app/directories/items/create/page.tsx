'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovTextarea } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useCreateItem } from '@/features/manage-items/model/useCreateItem'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { ItemGroupService } from '@/features/manage-item-groups/model/service'
import { UnitOfMeasureService } from '@/features/manage-units/model/service'

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
        groupId: '',
        baseUnitId: '',
        barcode: '',
        weightKg: undefined as number | undefined,
        volumeM3: undefined as number | undefined,
    })

    useState(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const itemGroupService = new ItemGroupService()
                const unitService = new UnitOfMeasureService()
                const [groupsData, unitsData] = await Promise.all([
                    itemGroupService.listAll(),
                    unitService.list()
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

        if (!formData.code || !formData.name || !formData.baseUnitId) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                code: formData.code,
                name: formData.name,
                baseUnitId: formData.baseUnitId,
                groupId: formData.groupId || undefined,
                barcode: formData.barcode || undefined,
                weightKg: formData.weightKg,
                volumeM3: formData.volumeM3,
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
                    <Select
                        value={formData.groupId}
                        onValueChange={(value) => setFormData({ ...formData, groupId: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            {itemGroups.map((group) => (
                                <SelectItem key={group.id} value={group.id!}>
                                    {group.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel required>{t('items.unitOfMeasure')}</GovLabel>
                    <Select
                        value={formData.baseUnitId}
                        onValueChange={(value) => setFormData({ ...formData, baseUnitId: value })}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            {units.map((unit) => (
                                <SelectItem key={unit.id} value={unit.id!}>
                                    {unit.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel>{t('items.barcode')}</GovLabel>
                    <GovInput
                        value={formData.barcode}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                        placeholder={t('items.barcode')}
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
