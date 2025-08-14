import { jwtVerify } from "jose";

export async function verifyToken(token: string | undefined) {
    if (!token) return null;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'changeme-secret');
        const { payload } = await jwtVerify(token, secret);
        return payload as { userId?: string; orgId?: string };
    } catch {
        return null;
    }
}

// import * as jwt from 'jsonwebtoken';

// export async function verifyToken(token: string | undefined): Promise<{ userId?: string; orgId?: string; } | null> {
//     if (!token) return null;
//     try {
//         const secret = process.env.JWT_SECRET || 'changeme-secret';
//         // jwt.verify throws if invalid
//         console.log("---------verifyToken token", token)
//                 console.log("verifyToken , secret0----------------", secret)
//         return jwt.verify(token, secret) as { userId: string; orgId: string };
//     } catch (err) {
//         return null;
//     }
// }