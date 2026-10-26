import {
    ambilKeranjang,
    hitungSubtotal,
    hitungTotal,
    kosongkanKeranjang
} from "./keranjangService.mjs";

export function buatPesanan(daftarMenu) {
    const daftarMenuDipesan = ambilKeranjang(daftarMenu);

    if (daftarMenuDipesan.length === 0) {
        throw new Error("Keranjang menu kosong!");
    }

    const detailPesanan = daftarMenuDipesan.map(menu => ({
        namaMenu: menu.namaMenu,
        hargaMenu: menu.hargaMenu,
        kuantitasMenu: menu.kuantitasMenu,
        subtotal: hitungSubtotal(menu)
    }));

    const totalPembayaran = hitungTotal(
        daftarMenuDipesan
    );

    return {
        detailPesanan,
        totalPembayaran
    };
}

export async function konfirmasiPesanan(app) {
    const pesanan = buatPesanan(app.daftarMenu);

    const kuantitasSebelumnya = app.daftarMenu.map(
        menu => menu.kuantitasMenu
    );

    // Simpan riwayat pesanan.
    app.arrayRiwayatPemesanan.push(pesanan);

    try {
        await app.simpanRiwayat(app);
    } catch (error) {
        app.arrayRiwayatPemesanan.pop();
        throw error;
    }

    // Kosongkan keranjang setelah riwayat tersimpan.
    kosongkanKeranjang(app.daftarMenu);

    try {
        await app.simpanKeranjang(app);
    } catch (error) {
        // Pulihkan keranjang di memori apabila gagal disimpan.
        app.daftarMenu.forEach((menu, index) => {
            menu.kuantitasMenu = kuantitasSebelumnya[index];
        });

        // Riwayat sudah tersimpan, sehingga kegagalan
        // perlu ditangani sebelum pengguna mencoba lagi.
        throw new Error(
            "Riwayat pesanan sudah tersimpan, tetapi keranjang " +
            "gagal diperbarui. Periksa data sebelum mengulangi pembayaran.",
            { cause: error }
        );
    }

    return pesanan;
}