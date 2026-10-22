// Import readline/promises
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Mengimpor function di file-file yang terpisah
import menuUtama from "./functionMenuUtama.mjs";
import pilihMenu from "./functionPilihMenu.mjs";
import keranjangMenu from "./functionKeranjangMenu.mjs";
import riwayatPemesanan from "./functionRiwayatPemesanan.mjs";

// Mendeklarasikan variabel rl untuk membuat interface readline
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

// Mendeklarasikan array kosong arrayRiwayatPemesanan
const arrayRiwayatPemesanan = [];

// Kumpulan property yang disimpan dalam parameter app
const app = {
    rl,
    daftarMenu,
    arrayRiwayatPemesanan,
    menuUtama,
    pilihMenu,
    keranjangMenu,
    riwayatPemesanan
};

// Memanggil function menuUtama dengan parameter app
menuUtama(app);