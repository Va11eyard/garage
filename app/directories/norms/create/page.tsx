'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovTextarea } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Checkbox } from '@/shared/ui/checkbox'
import { useCreateProvisionNorm } from '@/features/manage-norms/model/useCreateProvisionNorm'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'
import { EmployeeCategoryService } from '@/features/manage-employee-categories/model/service'
import { OrganizationService } from '@/features/manage-organizations/model/service'

export default function NormCreatePage() {
    const router = useRouter()
    const { t } = useTranslation()
    const createMutation = useCreateProvisionNorm()
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const [organizations, setOrganizations] = useState<any[]>([])
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
        employeeCategory: '',
        gender: '',
        season: 'ALL' as 'ALL' | 'SUMMER' | 'WINTER' | 'DEMISEASON',
        priority: '',
        organizationId: '',
        active: true,
    })

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const categoryService = new EmployeeCategoryService()
                const orgService = new OrganizationService()
                const [categoriesData, orgsData] = await Promise.all([
                    categoryService.list(),
                    orgService.list()
                ])
                setCategories(categoriesData)
                setOrganizations(orgsData)
            } catch (error) {
                toast.error('Error loading data')
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.code || !formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                code: formData.code,
                name: formData.name,
                description: formData.description || undefined,
                employeeCategory: formData.employeeCategory || undefined,
                gender: formData.gender || undefined,
                season: formData.season as any,
                priority: formData.priority ? Number(formData.priority) : undefined,
                organizationId: formData.organizationId || undefined,
                active: formData.active,
                lines: [],
            })
            toast.success(t('common.success'))
            router.push('/directories/norms')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('norm.title'), href: '/directories/norms' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('common.code')}</GovLabel>
                    <GovInput
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        placeholder={t('common.code')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('common.name')}</GovLabel>
                    <GovInput
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('common.name')}
                    />
                </div>

                <div>
                    <GovLabel>{t('organization.title')}</GovLabel>
                    <Select
                        value={formData.organizationId}
                        onValueChange={(value) => setFormData({ ...formData, organizationId: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            {organizations.map((org: any) => (
                                <SelectItem key={org.id} value={org.id!}>
                                    {org.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel>{t('norm.category')}</GovLabel>
                    <Select
                        value={formData.employeeCategory}
                        onValueChange={(value) => setFormData({ ...formData, employeeCategory: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat: any) => (
                                <SelectItem key={cat.id} value={cat.id!}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel>{t('persons.gender')}</GovLabel>
                    <Select
                        value={formData.gender}
                        onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="MALE">{t('persons.male')}</SelectItem>
                            <SelectItem value="FEMALE">{t('persons.female')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel required>{t('norm.season')}</GovLabel>
                    <Select
                        value={formData.season}
                        onValueChange={(value) => setFormData({ ...formData, season: value as any })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">{t('norm.allSeasons')}</SelectItem>
                            <SelectItem value="SUMMER">{t('norm.summer')}</SelectItem>
                            <SelectItem value="WINTER">{t('norm.winter')}</SelectItem>
                            <SelectItem value="DEMISEASON">{t('norm.demiseason')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel>{t('norm.priority')}</GovLabel>
                    <GovInput
                        type="number"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        placeholder={t('norm.priority')}
                    />
                </div>

                <div>
                    <GovLabel>{t('common.description')}</GovLabel>
                    <GovTextarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder={t('common.description')}
                        rows={3}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) => setFormData({ ...formData, active: checked as boolean })}
                    />
                    <label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {t('common.active')}
                    </label>
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
