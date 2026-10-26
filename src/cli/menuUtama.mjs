import { tanya } from "../utils/input.mjs";

export default async function menuUtama(app) {
    while (true) {
        console.log("=========================");
        console.log("APLIKASI ORDER MIE GACOAN");
        console.log("=========================");
        console.log("1. Pilih Menu");
        console.log("2. Keranjang Menu");
        console.log("3. Riwayat Pemesanan");
        console.log("0. Keluar");
        console.log("-------------------------");

        const answer = await tanya(app, "Pilih opsi: ");

        console.log("");

        if (answer === "1") {
            await app.pilihMenu(app);
        } else if (answer === "2") {
            await app.keranjangMenu(app);
        } else if (answer === "3") {
            await app.riwayatPemesanan(app);
        } else if (answer === "0") {
            console.log(
                "Terima kasih telah menggunakan aplikasi Order Mie Gacoan!"
            );
            console.log("");

            return;
        } else {
            console.log("Silakan masukkan opsi yang valid...");
            console.log("");
        }
    }
}