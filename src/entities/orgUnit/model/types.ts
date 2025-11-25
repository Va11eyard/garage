export interface OrgUnit {
    id: string;
    organizationId: string;
    parentId?: string | null;
    code: string;
    name: string;
    type?: string;
    active: boolean;
}