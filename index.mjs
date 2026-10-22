// Import readline/promises
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFile } from "node:fs/promises";

// Mengimpor function di file-file yang terpisah
import menuUtama from "./functionMenuUtama.mjs";
import pilihMenu, {
    bacaKeranjang,
    simpanKeranjang
} from "./functionPilihMenu.mjs";
import keranjangMenu from "./functionKeranjangMenu.mjs";
import riwayatPemesanan from "./functionRiwayatPemesanan.mjs";

// Mendeklarasikan variabel rl untuk membuat interface readline
const rl = readline.createInterface({ input, output });

// Membaca JSON dataDaftarMenu yang berisi objek-objek menu dengan properti idMenu, namaMenu, hargaMenu dan kuantitasMenu
const dataMenu = await readFile(
    new URL("./dataDaftarMenu.json", import.meta.url),
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
    simpanKeranjang
};

// Memanggil functions dengan parameter app
await bacaKeranjang(app);
await menuUtama(app);