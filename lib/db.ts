import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Função para criar o cliente com o adaptador
/**
 * Cria uma instancia do Prisma conectada ao Postgres via adapter `pg`.
 */
const createPrismaClient = () => {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

// Usa a instância existente ou cria uma nova
/**
 * Reutiliza instancia em desenvolvimento para evitar varias conexoes abertas.
 */
export const db = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
