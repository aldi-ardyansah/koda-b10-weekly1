// Mengekspor function riwayatPemesanan
export default riwayatPemesanan;

// Async function riwayatPemesanan
async function riwayatPemesanan(app) {
    if (app.arrayRiwayatPemesanan.length === 0) {
        await app.rl.question(
            "Riwayat pemesanan kosong... Tekan ENTER untuk ke menu utama..."
        );

        console.log("");
        return app.menuUtama(app);
    }

    console.log("=================");
    console.log("RIWAYAT PEMESANAN");
    console.log("=================");

    for (let i = 0; i < app.arrayRiwayatPemesanan.length; i++) {
        const riwayat = app.arrayRiwayatPemesanan[i];

        console.log(`Pesanan ke-${i + 1}`);
        console.log("-----------------");

        for (const menu of riwayat.detailPesanan) {
            console.log(
                `${menu.namaMenu} x${menu.kuantitasMenu} = Rp${menu.subtotal}`
            );
        }

        console.log(`Total pembayaran: Rp${riwayat.totalPembayaran}`);
        console.log("=================");
    }

    console.log("");

    await app.rl.question("Tekan ENTER untuk ke menu utama...");

    console.log("");
    return app.menuUtama(app);
}