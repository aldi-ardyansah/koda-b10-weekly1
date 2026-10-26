// Import readline/promises
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFile } from "node:fs/promises";

// Mengimpor function-function
import menuUtama from "./src/helpers/menuUtama.mjs";
import pilihMenu, { bacaKeranjang, simpanKeranjang } from "./src/helpers/pilihMenu.mjs";
import keranjangMenu from "./src/helpers/keranjangMenu.mjs";
import riwayatPemesanan, { bacaRiwayat, simpanRiwayat } from "./src/helpers/riwayatPemesanan.mjs";

// Mendeklarasikan variabel rl untuk membuat interface readline
const rl = readline.createInterface({ input, output });

// Membaca JSON dataDaftarMenu yang berisi objek-objek menu dengan properti idMenu, namaMenu, hargaMenu dan kuantitasMenu
const dataMenu = await readFile(
    new URL("./db/daftarMenu.json", import.meta.url),
    "utf8"
);

const daftarMenu = JSON.parse(dataMenu);

for (const menu of daftarMenu) {
    menu.kuantitasMenu = 0;
}

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
    riwayatPemesanan,
    simpanKeranjang,
    simpanRiwayat
};

// Memanggil functions dengan parameter app
await bacaKeranjang(app);
await bacaRiwayat(app);
await menuUtama(app);