import {PrismaClient} from "@generated/prisma";


export const prisma = new PrismaClient();

export async function resetId() {
    await prisma.$executeRawUnsafe(`
        SELECT setval(
                       pg_get_serial_sequence('"coordinate"', 'id'),
                       (SELECT MAX(id) FROM "coordinate")
               );
    `);

    await prisma.$executeRawUnsafe(`
        SELECT setval(
                       pg_get_serial_sequence('"group"', 'id'),
                       (SELECT MAX(id) FROM "group")
               );
    `);
}
