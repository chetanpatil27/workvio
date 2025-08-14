import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';
import { ITenantCtx } from './interface';

const prismaClients: Record<string, PrismaClient> = {};

export function getTenantPrisma(tenantCtx: ITenantCtx): PrismaClient {
    const dbName = `workvio_${tenantCtx.orgId}`;
    // console.log(`Prisma client created for DB: ${dbName}`);

    if (!prismaClients[dbName]) {
        const db = `mongodb+srv://chetanpatil0927:Admin%40%24123@pulseengine-dev.nqtu3ys.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=pulseengine-dev`
        prismaClients[dbName] = new PrismaClient({
            datasources: { db: { url: db } }
        });
    }
    return prismaClients[dbName];
}


export async function createTenantIndexes(dbName: string) {
    // console.log(`Creating indexes for tenant DB: ${dbName}`);
    const uri = 'mongodb+srv://chetanpatil0927:Admin%40%24123@pulseengine-dev.nqtu3ys.mongodb.net/?retryWrites=true&w=majority&appName=pulseengine-dev';
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    await db.collection('User').createIndex({ email: 1 }, { unique: true });
    await db.collection('User').createIndex({ role: 1 });
    await db.collection('User').createIndex({ designation: 1 });
    await db.collection('User').createIndex({ employeeId: 1 });
    await db.collection('User').createIndex({ active: 1 });
    await db.collection('User').createIndex({ joiningDate: 1 });

    await client.close();
}
