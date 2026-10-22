 // Mengekspor function keranjangMenu
export default keranjangMenu;

// Async function keranjangMenu
async function keranjangMenu(app) {
    const daftarMenuDipesan = app.daftarMenu.filter(
        menu => menu.kuantitasMenu > 0
    );

    if (daftarMenuDipesan.length === 0) {
        await app.rl.question(
            "Keranjang menu kosong... Tekan ENTER untuk ke menu utama..."
        );

        console.log("");
        return app.menuUtama(app);
    }

    console.log("==============");
    console.log("KERANJANG MENU");
    console.log("==============");

    let totalPembayaran = 0;

    for (const menu of daftarMenuDipesan) {
        const subtotal = menu.hargaMenu * menu.kuantitasMenu;
        totalPembayaran += subtotal;

        console.log(`${menu.namaMenu}`);
        console.log(`Harga     : Rp${menu.hargaMenu}`);
        console.log(`Kuantitas : ${menu.kuantitasMenu}`);
        console.log(`Subtotal  : Rp${subtotal}`);
        console.log("--------------");
    }

    console.log(`Total Pembayaran: Rp${totalPembayaran}`);
    console.log("==============");
    console.log("");

    const answer = (
        await app.rl.question("Lanjutkan pembayaran (y/n): ")
    ).trim().toLowerCase();

    if (answer === "y") {
        const detailPesanan = daftarMenuDipesan.map(menu => ({
            namaMenu: menu.namaMenu,
            hargaMenu: menu.hargaMenu,
            kuantitasMenu: menu.kuantitasMenu,
            subtotal: menu.hargaMenu * menu.kuantitasMenu
        }));

        app.arrayRiwayatPemesanan.push({
            detailPesanan,
            totalPembayaran
        });

        for (const menu of app.daftarMenu) {
            menu.kuantitasMenu = 0;
        }

        console.log("");

        await app.rl.question(
            "Pesanan berhasil dikonfirmasi! Tekan ENTER untuk ke menu utama..."
        );

        console.log("");
        return app.menuUtama(app);
    }

    if (answer === "n") {
        console.log("");
        return app.menuUtama(app);
    }

    console.log("");
    console.log("Pilihan tidak valid!");
    console.log("");

    return keranjangMenu(app);
}