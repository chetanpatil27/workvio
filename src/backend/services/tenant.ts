import { MongoClient } from 'mongodb';
import { UserService } from './user';

const MONGO_URI = process.env.MONGO_URI!;
const client = new MongoClient(MONGO_URI);

export async function createTenantDatabase(orgId: string, adminUser: Record<string, any>) {
    if (!client.topology || !client.topology.isConnected()) await client.connect();
    console.log("----------At db create")
    const db = client.db(`workvio_${orgId}`);
    // Insert admin user into the new tenant DB

    const pass = await UserService.hashPassword(adminUser.password)
    await db.collection('User').insertOne({ ...adminUser, password: pass, role: "ADMIN" });
    // Optionally, seed other collections or create indexes here
    console.log("----------At db return", db)
    return db.s.namespace.db;
}
