import { z } from 'zod';

export const organizationSchema = z.object({
    code: z.string().min(1, 'Код обязателен'),
    name: z.string().min(1, 'Наименование обязательно'),
    shortName: z.string().min(1, 'Краткое наименование обязательно'),
    active: z.boolean().default(true),
})

export type OrganizationFormData = z.infer<typeof organizationSchema>