import { readFile, writeFile } from "node:fs/promises";

const fileRiwayat = new URL(
    "../../db/riwayatPemesanan.json",
    import.meta.url
);

export async function bacaRiwayat(app) {
    let daftarRiwayat;

    try {
        const data = await readFile(fileRiwayat, "utf8");

        daftarRiwayat = JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            daftarRiwayat = [];
            await writeFile(fileRiwayat, "[]", "utf8");
        } else {
            throw error;
        }
    }

    if (!Array.isArray(daftarRiwayat)) {
        throw new Error(
            "Format riwayat harus berupa array."
        );
    }

    app.arrayRiwayatPemesanan.splice(
        0,
        app.arrayRiwayatPemesanan.length,
        ...daftarRiwayat
    );
}

export async function simpanRiwayat(app) {
    await writeFile(
        fileRiwayat,
        JSON.stringify(
            app.arrayRiwayatPemesanan,
            null,
            4
        ),
        "utf8"
    );
}