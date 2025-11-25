import { Card, CardContent, CardHeader, CardTitle } from '@/shared//ui/card'
import { Organization } from '../model/types'

interface OrganizationCardProps {
    organization: Organization
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{organization.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="space-y-2">
                    <div>
                        <dt className="text-sm font-medium text-gov-text-secondary">Код</dt>
                        <dd className="text-sm">{organization.code}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gov-text-secondary">Краткое название</dt>
                        <dd className="text-sm">{organization.shortName}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gov-text-secondary">Статус</dt>
                        <dd className="text-sm">
              <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs ${
                      organization.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                  }`}
              >
                {organization.active ? 'Активна' : 'Неактивна'}
              </span>
                        </dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    )
}
