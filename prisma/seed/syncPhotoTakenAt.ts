import {prisma} from "../../src/lib/prisma";

async function syncPhotoTakenAt() {
    const coordinates = await prisma.coordinate.findMany({
        select: {id: true, createdAt: true},
    });

    for (const coord of coordinates) {
        await prisma.coordinate.update({
            where: {id: coord.id},
            data: {photoTakenAt: coord.createdAt},
        });
    }

    console.log("✅ Semua photoTakenAt telah disamakan dengan createdAt");
}

syncPhotoTakenAt().catch((e) => {
    console.error("❌ Gagal update:", e);
});