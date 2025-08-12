import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI!;
const client = new MongoClient(MONGO_URI);

export async function createTenantDatabase(orgId: string, adminUser: Record<string, any>) {
    if (!client.topology || !client.topology.isConnected()) await client.connect();
    const db = client.db(`workvio_${orgId}`);
    // Insert admin user into the new tenant DB
    await db.collection('users').insertOne(adminUser);
    // Optionally, seed other collections or create indexes here
    return db;
}
