import { PrismaClient } from '@prisma/client';

const prismaClients: Record<string, PrismaClient> = {};

export function getTenantPrisma(orgId: string): PrismaClient {
    const dbName = `workvio_${orgId}`;
    console.log(`Prisma client created for DB: ${dbName}`);

    if (!prismaClients[dbName]) {
        const db = `mongodb+srv://chetanpatil0927:Admin%40%24123@pulseengine-dev.nqtu3ys.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=pulseengine-dev`
        prismaClients[dbName] = new PrismaClient({
            datasources: { db: { url: db } }
        });
    }
    return prismaClients[dbName];
}