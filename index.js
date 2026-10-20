// Import readline/promises
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

// Membuat array daftarMenu yang berisi objek-objek menu dengan properti idMenu, namaMenu, hargaMenu dan kuantitasMenu
const daftarMenu = [
    { idMenu: 1, namaMenu: "Mie Gacoan", hargaMenu: 13000, kuantitasMenu: 0 },
    { idMenu: 2, namaMenu: "Mie Hompimpa", hargaMenu: 13000, kuantitasMenu: 0 },
    { idMenu: 3, namaMenu: "Mie Suit", hargaMenu: 13000, kuantitasMenu: 0 },
    { idMenu: 4, namaMenu: "Siomay Ayam", hargaMenu: 12000, kuantitasMenu: 0 },
    { idMenu: 5, namaMenu: "Udang Keju", hargaMenu: 12000, kuantitasMenu: 0 },
    { idMenu: 6, namaMenu: "Udang Rambutan", hargaMenu: 12000, kuantitasMenu: 0 },
    { idMenu: 7, namaMenu: "Pangsit Goreng", hargaMenu: 12000, kuantitasMenu: 0 },
    { idMenu: 8, namaMenu: "Lumpia Udang", hargaMenu: 12000, kuantitasMenu: 0 },
    { idMenu: 9, namaMenu: "Es Gobak Sodor", hargaMenu: 12000, kuantitasMenu: 0 },
    { idMenu: 10, namaMenu: "Es Genderuwo", hargaMenu: 12000, kuantitasMenu: 0 },
    { idMenu: 11, namaMenu: "Es Sluku Bathok", hargaMenu: 12000, kuantitasMenu: 0 },
    { idMenu: 12, namaMenu: "Es Petak Umpet", hargaMenu: 12000, kuantitasMenu: 0 }
];

const arrayRiwayatPemesanan = [];

let adaPesanan = false;

// Function menuUtama
async function menuUtama() {
    console.log("=========================");
    console.log("APLIKASI ORDER MIE GACOAN");
    console.log("=========================");
    console.log("1. Pilih Menu");
    console.log("2. Keranjang Menu");
    console.log("3. Riwayat Pemesanan");
    console.log("0. Keluar");
    console.log("-------------------------");
    const answer = (await rl.question('Pilih opsi: ')).trim();

    if (answer === "1") {
        console.log("");
        return pilihMenu();
    }
    else if (answer === "2") {
        console.log("");
        return keranjangMenu();
    }
    else if (answer === "3") {
        console.log("");
        return riwayatPemesanan();
    }
    else if (answer === "0") {
        console.log("");
        console.log("Terima kasih telah menggunakan aplikasi Order Mie Gacoan!");
        console.log("");
        rl.close();
    }
    else {
        console.log("");
        console.log("Silakan masukan opsi yang valid...");
        console.log("");
        return menuUtama();
    }
}

// Function pilihMenu
async function pilihMenu() {
    console.log("==========");
    console.log("PILIH MENU");
    console.log("==========");

    for (let i = 0; i < daftarMenu.length; i++) {
        const menu = daftarMenu[i];
        console.log(`${menu.idMenu}. ${menu.namaMenu} - Rp${menu.hargaMenu}`);
    }

    console.log("0. Menu Utama");
    console.log("----------");
    const answer = (await rl.question('Pilih opsi: ')).trim();

    if (answer === "0") {
        console.log("");
        return menuUtama();
    }
    else if (answer >= 1 && answer <= daftarMenu.length) {
        console.log("");

        const idMenu = Number(answer);
        const menu = daftarMenu[idMenu - 1];

        console.log("0. Kembali");
        console.log("");
        const answerJumlahMenu = await rl.question(`Masukan jumlah ${menu.namaMenu}: `);
        if (answerJumlahMenu >= 1) {
            menu.kuantitasMenu += Number(answerJumlahMenu);
            adaPesanan = true;
            console.log("");
            console.log(`Menu ${menu.namaMenu} sebanyak ${menu.kuantitasMenu} pcs ditambahkan ke keranjang menu!`);
            console.log("");
            return pilihMenu();
        }
        else if (answerJumlahMenu.trim() === "0") {
            return pilihMenu();
        }
        else {
            console.log("");
            console.log("Jumlah harus berupa bilangan bulat lebih dari 0!");
            console.log("");
            return pilihMenu();
        }
    }
    else {
        console.log("");
        console.log("Silakan masukan opsi yang valid...");
        console.log("");
        return pilihMenu();
    }
}

// Function keranjangMenu
async function keranjangMenu() {
    if (!adaPesanan) {
        await rl.question("Keranjang menu kosong... Tekan ENTER untuk ke menu utama...");
        console.log("");
        return menuUtama();
    }
    else {
        console.log("==============");
        console.log("KERANJANG MENU");
        console.log("==============");

        let totalPembayaran = 0;

        for (let i = 0; i < daftarMenu.length; i++) {
            const menu = daftarMenu[i];

            if (menu.kuantitasMenu > 0) {
                const subtotal = menu.hargaMenu * menu.kuantitasMenu;

                totalPembayaran += subtotal;

                console.log(`${menu.namaMenu}`);
                console.log(`Harga     : Rp${menu.hargaMenu}`);
                console.log(`Kuantitas : ${menu.kuantitasMenu}`);
                console.log(`Subtotal  : Rp${subtotal}`);
                console.log("--------------");
            }
        }

        console.log(`Total Pembayaran: Rp${totalPembayaran}`);
        console.log("==============");
        console.log("");

        const answer = (
            await rl.question("Lanjutkan pembayaran (y/n): ")
        ).trim().toLowerCase();

        if (answer === "y") {
            const detailPesanan = [];

            for (let i = 0; i < daftarMenu.length; i++) {
                const menu = daftarMenu[i];

                if (menu.kuantitasMenu > 0) {
                    detailPesanan.push({
                        namaMenu: menu.namaMenu,
                        hargaMenu: menu.hargaMenu,
                        kuantitasMenu: menu.kuantitasMenu,
                        subtotal: menu.hargaMenu * menu.kuantitasMenu
                    });
                }
            }

            arrayRiwayatPemesanan.push({
                detailPesanan,
                totalPembayaran
            });

            console.log("");

            adaPesanan = false;

            for (let i = 0; i < daftarMenu.length; i++) {
                daftarMenu[i].kuantitasMenu = 0;
            }

            await rl.question("Pembayaran berhasil! Tekan ENTER untuk ke menu utama...");

            console.log("");

            return menuUtama();
        }
        else if (answer === "n") {
            console.log("");
            return menuUtama();
        }
        else {
            console.log("");
            console.log("Pilihan tidak valid!");
            console.log("");
            return keranjangMenu();
        }
    }
}

// Function riwayatPemesanan
async function riwayatPemesanan() {
    if (arrayRiwayatPemesanan.length === 0) {
        await rl.question("Riwayat pemesanan kosong... Tekan ENTER untuk ke menu utama...");
        console.log("");
        return menuUtama();
    }
    else {
        console.log("=================");
        console.log("RIWAYAT PEMESANAN");
        console.log("=================");

        for (let i = 0; i < arrayRiwayatPemesanan.length; i++) {
            const riwayat = arrayRiwayatPemesanan[i];
            console.log(`Pesanan ke-${i + 1}`);
            console.log("-----------------");

            for (let j = 0; j < riwayat.detailPesanan.length; j++) {
                const menu = riwayat.detailPesanan[j];
                console.log(`${menu.namaMenu} x${menu.kuantitasMenu} = Rp${menu.subtotal}`);
            }

            console.log(`Total pembayaran: Rp${riwayat.totalPembayaran}`);
            console.log("=================");
        }

        console.log("");

        await rl.question("Tekan ENTER untuk ke menu utama...");
        console.log("");
        return menuUtama();
    }
}

menuUtama();