import { PrismaClient } from '../generated/prisma/client'
import path from 'path';

// ▼ PrismaClient を読み込む前に絶対パス変換を行う
if (process.env.DATABASE_URL?.startsWith('file:./')) {
    const relative = process.env.DATABASE_URL.replace('file:./', '');

    // dev.db がルート直下ではなく、prisma/ 配下にある前提で補正
    const absolute = path.join(process.cwd(), 'prisma', relative);

    process.env.DATABASE_URL = `file:${absolute}`;
    console.log('DATABASE_URL fixed →', process.env.DATABASE_URL);
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma