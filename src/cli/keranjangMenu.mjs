import {
    tanya,
    tungguEnter
} from "../utils/input.mjs";

import formatRupiah from "../utils/formatRupiah.mjs";

import {
    ambilKeranjang,
    hitungSubtotal,
    hitungTotal
} from "../services/keranjangService.mjs";

import {
    konfirmasiPesanan
} from "../services/pemesananService.mjs";

export default async function keranjangMenu(app) {
    while (true) {
        const daftarMenuDipesan = ambilKeranjang(
            app.daftarMenu
        );

        if (daftarMenuDipesan.length === 0) {
            await tungguEnter(
                app,
                "Keranjang menu kosong... Tekan ENTER untuk ke menu utama..."
            );

            console.log("");
            return;
        }

        console.log("==============");
        console.log("KERANJANG MENU");
        console.log("==============");

        for (const menu of daftarMenuDipesan) {
            const subtotal = hitungSubtotal(menu);

            console.log(menu.namaMenu);
            console.log(
                `Harga     : ${formatRupiah(menu.hargaMenu)}`
            );
            console.log(
                `Kuantitas : ${menu.kuantitasMenu}`
            );
            console.log(
                `Subtotal  : ${formatRupiah(subtotal)}`
            );
            console.log("--------------");
        }

        const totalPembayaran = hitungTotal(
            daftarMenuDipesan
        );

        console.log(
            `Total Pembayaran: ${formatRupiah(totalPembayaran)}`
        );
        console.log("==============");
        console.log("");

        const answer = (
            await tanya(app, "Lanjutkan pembayaran (y/n): ")
        ).toLowerCase();

        if (answer === "y") {
            await konfirmasiPesanan(app);

            console.log("");

            await tungguEnter(
                app,
                "Pesanan berhasil dikonfirmasi! Tekan ENTER untuk ke menu utama..."
            );

            console.log("");
            return;
        }

        if (answer === "n") {
            console.log("");
            return;
        }

        console.log("");
        console.log("Pilihan tidak valid!");
        console.log("");
    }
}