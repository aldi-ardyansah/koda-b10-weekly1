import { tanya } from "../utils/input.mjs";
import formatRupiah from "../utils/formatRupiah.mjs";

import {
    tambahMenu
} from "../services/keranjangService.mjs";

export default async function pilihMenu(app) {
    while (true) {
        console.log("==========");
        console.log("PILIH MENU");
        console.log("==========");

        for (const menu of app.daftarMenu) {
            console.log(
                `${menu.idMenu}. ${menu.namaMenu} - ${formatRupiah(menu.hargaMenu)}`
            );
        }

        console.log("0. Menu Utama");
        console.log("----------");

        const answer = await tanya(app, "Pilih opsi: ");

        if (answer === "0") {
            console.log("");
            return;
        }

        const idMenu = Number(answer);

        if (
            answer === "" ||
            !Number.isSafeInteger(idMenu) ||
            idMenu < 1
        ) {
            console.log("");
            console.log("Silakan masukkan ID menu yang valid...");
            console.log("");
            continue;
        }

        const menu = app.daftarMenu.find(
            item => item.idMenu === idMenu
        );

        if (!menu) {
            console.log("");
            console.log("Menu tidak ditemukan!");
            console.log("");
            continue;
        }

        console.log("");
        console.log("0. Kembali");
        console.log("");

        const answerJumlahMenu = await tanya(
            app,
            `Masukkan jumlah ${menu.namaMenu}: `
        );

        if (answerJumlahMenu === "0") {
            console.log("");
            continue;
        }

        const jumlah = Number(answerJumlahMenu);

        if (answerJumlahMenu === "") {
            console.log("");
            console.log(
                "Jumlah harus berupa bilangan bulat lebih dari 0!"
            );
            console.log("");
            continue;
        }

        const kuantitasSebelumnya = menu.kuantitasMenu;

        try {
            tambahMenu(menu, jumlah);
        } catch (error) {
            console.log("");
            console.log(error.message);
            console.log("");
            continue;
        }

        try {
            await app.simpanKeranjang(app);
        } catch (error) {
            menu.kuantitasMenu = kuantitasSebelumnya;
            throw error;
        }

        console.log("");
        console.log(
            `Menu ${menu.namaMenu} sebanyak ${jumlah} pcs ` +
            "ditambahkan ke keranjang menu!"
        );
        console.log("");
    }
}