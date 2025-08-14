export interface ITenantCtx {
    userId?: string;
    orgId: string;
}
export interface IPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}