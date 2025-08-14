import { MongoClient } from 'mongodb';
import { UserService } from './user';
import { createTenantIndexes } from '../helper';

const MONGO_URI = process.env.MONGO_URI!;
const client = new MongoClient(MONGO_URI);

export async function createTenantDatabase(orgId: string, adminUser: Record<string, any>) {
    if (!client.topology || !client.topology.isConnected()) await client.connect();
    const dbName = `workvio_${orgId}`;
    console.log("----------At db create", dbName)
    const db = client.db(dbName);
    // Insert admin user into the new tenant DB

    const pass = await UserService.hashPassword(adminUser.password)
    await db.collection('User').insertOne({ ...adminUser, password: pass, role: "ADMIN" });
    console.log("--------before create indexes")
    await createTenantIndexes(dbName);
    console.log("--------after create indexes")

    // Optionally, seed other collections or create indexes here
    console.log("----------At db return", db)
    return db.s.namespace.db;
}
