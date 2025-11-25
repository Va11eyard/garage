'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { useUnit } from '@/features/manage-units/model/useUnit'
import { useUpdateUnit } from '@/features/manage-units/model/useUpdateUnit'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'

export default function UnitEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: unit, isLoading } = useUnit(id)
    const updateMutation = useUpdateUnit()
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        shortName: '',
    })

    useEffect(() => {
        if (unit) {
            setFormData({
                code: unit.code || '',
                name: unit.name || '',
                shortName: unit.shortName || '',
            })
        }
    }, [unit])

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
                    shortName: formData.shortName || undefined,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/units')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <Spinner />
    if (!unit) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('unitOfMeasure.title'), href: '/directories/units' },
                { label: unit.name || '', href: `/directories/units/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('unitOfMeasure.editUnit')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('unitOfMeasure.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                required
                                placeholder={t('unitOfMeasure.code')}
                            />
                        </div>

                        <div>
                            <GovLabel required>{t('unitOfMeasure.name')}</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder={t('unitOfMeasure.name')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('unitOfMeasure.shortName')}</GovLabel>
                            <GovInput
                                value={formData.shortName}
                                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                                placeholder={t('unitOfMeasure.shortName')}
                            />
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
