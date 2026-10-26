import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import menuUtama from "./src/cli/menuUtama.mjs";
import pilihMenu from "./src/cli/pilihMenu.mjs";
import keranjangMenu from "./src/cli/keranjangMenu.mjs";
import riwayatPemesanan from "./src/cli/riwayatPemesanan.mjs";

import { bacaDaftarMenu } from "./src/repositories/menuRepository.mjs";
import { bacaKeranjang, simpanKeranjang } from "./src/repositories/keranjangRepository.mjs";
import { bacaRiwayat, simpanRiwayat } from "./src/repositories/riwayatRepository.mjs";

const rl = readline.createInterface({ input, output });

async function main() {
    try {
        const daftarMenu = await bacaDaftarMenu();

        const app = {
            rl,
            daftarMenu,
            arrayRiwayatPemesanan: [],
            menuUtama,
            pilihMenu,
            keranjangMenu,
            riwayatPemesanan,
            simpanKeranjang,
            simpanRiwayat
        };

        await bacaKeranjang(app);
        await bacaRiwayat(app);

        await menuUtama(app);
    } catch (error) {
        console.error("");
        console.error("Terjadi kesalahan:", error.message);
        process.exitCode = 1;
    } finally {
        rl.close();
    }
}

await main();