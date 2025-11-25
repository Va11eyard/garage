'use client'

import { useWriteOff } from '@/features/manage-write-offs/model/useWriteOff'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function WriteOffViewPage({ params }: { params: { id: string } }) {
    const { t } = useTranslation()
    const { data: doc, isLoading } = useWriteOff(params.id)
    const router = useRouter()

    if (isLoading) return <div className="gov-page-content">{t('common.loading')}</div>
    if (!doc) return <div className="gov-page-content">{t('common.notFound')}</div>

    return (
        <div className="gov-page-content space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="gov-title">{t('writeOffs.title')} #{doc.documentNumber}</h1>
                <div className="flex gap-2">
                    {doc.status === 'DRAFT' && (
                        <Button asChild className="gov-button-primary">
                            <Link href={`/inventory/writeoff/${params.id}/edit`}>{t('common.edit')}</Link>
                        </Button>
                    )}
                    <Button onClick={() => router.back()} className="gov-button-secondary">
                        {t('common.back')}
                    </Button>
                </div>
            </div>

            <div className="gov-card space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-[var(--gov-gray)]">{t('documents.documentNumber')}</p>
                        <p className="font-semibold">{doc.documentNumber}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[var(--gov-gray)]">{t('documents.documentDate')}</p>
                        <p className="font-semibold">{new Date(doc.documentDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[var(--gov-gray)]">Статус</p>
                        <span className={`gov-badge gov-badge-${doc.status?.toLowerCase()}`}>
                            {doc.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
