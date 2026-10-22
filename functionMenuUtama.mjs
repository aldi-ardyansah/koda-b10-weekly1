// Mengekspor function menuUtama
export default menuUtama;

// Async function menuUtama
async function menuUtama(app) {
    console.log("=========================");
    console.log("APLIKASI ORDER MIE GACOAN");
    console.log("=========================");
    console.log("1. Pilih Menu");
    console.log("2. Keranjang Menu");
    console.log("3. Riwayat Pemesanan");
    console.log("0. Keluar");
    console.log("-------------------------");

    const answer = (await app.rl.question("Pilih opsi: ")).trim();

    if (answer === "1") {
        console.log("");
        return app.pilihMenu(app);
    } else if (answer === "2") {
        console.log("");
        return app.keranjangMenu(app);
    } else if (answer === "3") {
        console.log("");
        return app.riwayatPemesanan(app);
    } else if (answer === "0") {
        console.log("");
        console.log("Terima kasih telah menggunakan aplikasi Order Mie Gacoan!");
        console.log("");
        app.rl.close();
    } else {
        console.log("");
        console.log("Silakan masukkan opsi yang valid...");
        console.log("");
        return menuUtama(app);
    }
}