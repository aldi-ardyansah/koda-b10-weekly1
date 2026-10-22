import { readFile, writeFile } from "node:fs/promises";

// Mengekspor function pilihMenu
export default pilihMenu;

// Lokasi file JSON keranjang
const fileKeranjang = new URL(
    "./dataKeranjangMenu.json",
    import.meta.url
);

// Membaca data keranjang dari file JSON
export async function bacaKeranjang(app) {
    const dataKeranjang = await readFile(fileKeranjang, "utf8");
    const daftarMenuDipesan = JSON.parse(dataKeranjang);

    // Mengatur semua kuantitas menu menjadi 0
    for (const menu of app.daftarMenu) {
        menu.kuantitasMenu = 0;
    }

    // Memulihkan kuantitas menu yang tersimpan
    for (const menuDipesan of daftarMenuDipesan) {
        const menu = app.daftarMenu.find(
            item => item.idMenu === menuDipesan.idMenu
        );

        if (menu) {
            menu.kuantitasMenu = menuDipesan.kuantitasMenu;
        }
    }
}

// Menyimpan data keranjang ke file JSON
export async function simpanKeranjang(app) {
    const daftarMenuDipesan = app.daftarMenu.filter(
        menu => menu.kuantitasMenu > 0
    );

    await writeFile(
        fileKeranjang,
        JSON.stringify(daftarMenuDipesan, null, 4),
        "utf8"
    );
}

// Async function pilihMenu
async function pilihMenu(app) {
    const batasMaksimum = 100;

    // Membaca keranjang sebelum menu ditampilkan

    while (true) {
        console.log("==========");
        console.log("PILIH MENU");
        console.log("==========");

        for (const menu of app.daftarMenu) {
            console.log(
                `${menu.idMenu}. ${menu.namaMenu} - Rp${menu.hargaMenu}`
            );
        }

        console.log("0. Menu Utama");
        console.log("----------");

        const answer = (await app.rl.question("Pilih opsi: ")).trim();

        if (answer === "0") {
            console.log("");
            return app.menuUtama(app);
        }

        const idMenu = Number(answer);

        if (!Number.isSafeInteger(idMenu) || idMenu < 1) {
            console.log("Silakan masukkan ID menu yang valid...");
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

        const answerJumlahMenu = (
            await app.rl.question(`Masukkan jumlah ${menu.namaMenu}: `)
        ).trim();

        if (answerJumlahMenu === "0") {
            console.log("");
            continue;
        }

        const jumlah = Number(answerJumlahMenu);

        if (!Number.isSafeInteger(jumlah) || jumlah <= 0) {
            console.log("");
            console.log("Jumlah harus berupa bilangan bulat lebih dari 0!");
            console.log("");
            continue;
        }

        if (
            !Number.isSafeInteger(menu.kuantitasMenu) ||
            menu.kuantitasMenu < 0
        ) {
            console.log("");
            console.log("Data jumlah menu tidak valid!");
            console.log("");
            continue;
        }

        const totalKuantitas = menu.kuantitasMenu + jumlah;

        if (
            !Number.isSafeInteger(totalKuantitas) ||
            totalKuantitas > batasMaksimum
        ) {
            console.log("");
            console.log(`Jumlah pesanan maksimal ${batasMaksimum} pcs!`);
            console.log(`Jumlah saat ini: ${menu.kuantitasMenu} pcs.`);
            console.log(
                `Maksimal tambahan: ${batasMaksimum - menu.kuantitasMenu} pcs.`
            );
            console.log("");
            continue;
        }

        menu.kuantitasMenu = totalKuantitas;

        // Menyimpan perubahan keranjang ke file JSON
        await simpanKeranjang(app);

        console.log("");
        console.log(
            `Menu ${menu.namaMenu} sebanyak ${jumlah} pcs ditambahkan ke keranjang menu!`
        );
        console.log("");
    }
}