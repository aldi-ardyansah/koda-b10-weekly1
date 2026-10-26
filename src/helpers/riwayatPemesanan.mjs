// Mengimpor module File System (fs/promises)
import { readFile, writeFile } from "node:fs/promises";

// Mengekspor function riwayatPemesanan
export default riwayatPemesanan;

// Lokasi file JSON riwayat pemesanan
const fileRiwayat = new URL(
    "../../db/riwayatPemesanan.json",
    import.meta.url
);

// Membaca riwayat dari file JSON
export async function bacaRiwayat(app) {
    try {
        const dataRiwayat = await readFile(fileRiwayat, "utf8");
        const daftarRiwayat = JSON.parse(dataRiwayat);

        if (!Array.isArray(daftarRiwayat)) {
            throw new Error("Format file riwayat harus berupa array.");
        }

        app.arrayRiwayatPemesanan.splice(
            0,
            app.arrayRiwayatPemesanan.length,
            ...daftarRiwayat
        );
    } catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(fileRiwayat, "[]", "utf8");
            return;
        }

        throw error;
    }
}

// Menyimpan riwayat ke file JSON
export async function simpanRiwayat(app) {
    await writeFile(
        fileRiwayat,
        JSON.stringify(app.arrayRiwayatPemesanan, null, 4),
        "utf8"
    );
}

// Menampilkan riwayat pemesanan
async function riwayatPemesanan(app) {
    if (app.arrayRiwayatPemesanan.length === 0) {
        await app.rl.question(
            "Riwayat pemesanan kosong... Tekan ENTER untuk ke menu utama..."
        );

        console.log("");
        return app.menuUtama(app);
    }

    console.log("=================");
    console.log("RIWAYAT PEMESANAN");
    console.log("=================");

    for (let i = 0; i < app.arrayRiwayatPemesanan.length; i++) {
        const riwayat = app.arrayRiwayatPemesanan[i];

        console.log(`Pesanan ke-${i + 1}`);
        console.log("-----------------");

        for (const menu of riwayat.detailPesanan) {
            console.log(
                `${menu.namaMenu} x${menu.kuantitasMenu} = Rp${menu.subtotal}`
            );
        }

        console.log(`Total pembayaran: Rp${riwayat.totalPembayaran}`);
        console.log("=================");
    }

    console.log("");

    await app.rl.question("Tekan ENTER untuk ke menu utama...");

    console.log("");
    return app.menuUtama(app);
}