import { tungguEnter } from "../utils/input.mjs";
import formatRupiah from "../utils/formatRupiah.mjs";

export default async function riwayatPemesanan(app) {
    if (app.arrayRiwayatPemesanan.length === 0) {
        await tungguEnter(
            app,
            "Riwayat pemesanan kosong... Tekan ENTER untuk ke menu utama..."
        );

        console.log("");
        return;
    }

    console.log("=================");
    console.log("RIWAYAT PEMESANAN");
    console.log("=================");

    for (
        let i = 0;
        i < app.arrayRiwayatPemesanan.length;
        i++
    ) {
        const riwayat = app.arrayRiwayatPemesanan[i];

        console.log(`Pesanan ke-${i + 1}`);
        console.log("-----------------");

        for (const menu of riwayat.detailPesanan) {
            console.log(
                `${menu.namaMenu} x${menu.kuantitasMenu} = ` +
                formatRupiah(menu.subtotal)
            );
        }

        console.log(
            `Total pembayaran: ${formatRupiah(riwayat.totalPembayaran)}`
        );

        console.log("=================");
    }

    console.log("");

    await tungguEnter(
        app,
        "Tekan ENTER untuk ke menu utama..."
    );

    console.log("");
}