// Mengimpor modul built-in readline pada Node.js
const readline = require("node:readline");

// Membuat interface readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Membuat array daftarMenu yang berisi objek-objek dengan properti idMenu, namaMenu, hargaMenu dan kuantitasMenu
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

// Membuat array kosong riwayatPesanan
const riwayatPesanan = [];

// Membuat function menuUtama
function menuUtama() {
    console.log("=======================");
    console.log("ORDER ONLINE MIE GACOAN");
    console.log("=======================");
    console.log("1. Pilih Menu");
    console.log("2. Riwayat Pemesanan");
    console.log("0. Keluar");
    console.log("=======================");

    // Membuat opsi
    // Jika pilih 1 jalankan function pilihMenu
    // Jika pilih 2 jalankan function riwayatPemesanan
    // Jika pilih 0 jalankan function menampilkan console log lalu keluar program
    // Jika pilih selain 1, 2 dan 0 maka menampilkan console log lalu ke menuUtama
    rl.question("Pilih opsi: ", (pilihan) => {
        if (pilihan === "1") {
            console.log("");
            pilihMenu();
        }
        else if (pilihan === "2") {
            console.log("");
            riwayatPemesanan();
        }
        else if (pilihan === "0") {
            console.log("");
            console.log("Terima kasih telah menggunakan aplikasi Order Mie Gacoan!");
            console.log("");
            rl.close();
        }
        else {
            console.log("");
            rl.question("Pilihan tidak valid. Tekan Enter untuk kembali ke menu utama...", () => {
                console.log("");
                menuUtama();
            });
        }
    });
};

// Membuat function pilihMenu
function pilihMenu() {
    console.log("===========");
    console.log("DAFTAR MENU");
    console.log("===========");

    // Menampilkan daftar menu dalam array daftarMenu dengan perulangan
    for (let i = 0; i < daftarMenu.length; i++) {
        const menu = daftarMenu[i];
        console.log(`${menu.idMenu}. ${menu.namaMenu} - Rp${menu.hargaMenu}`);
    }

    console.log("===========");
    console.log("13. Checkout Menu");
    console.log("0. Kembali");
    console.log("===========");

    // Membuat opsi
    // Jika pilih 1-12 maka pilih menu lalu menambah kuantitasMenu
    // Jika pilih 13 jalankan function checkoutMenu
    // Jika pilih 0 jalankan function menuUtama
    // Jika pilih selain 1, 2 dan 0 maka akan menampilkan console log lalu ke pilihMenu
    rl.question("Pilih menu: ", (pilihan) => {
        const idMenu = Number(pilihan);

        if (pilihan === "0") {
            console.log("");
            menuUtama();
        }
        else if (pilihan === "13") {
            console.log("");
            checkoutMenu();
        }
        else if (Number.isInteger(idMenu) && idMenu >= 1 && idMenu <= daftarMenu.length) {
            const menu = daftarMenu[idMenu - 1];

            console.log("");

            rl.question(`Masukan jumlah ${menu.namaMenu}: `, (jumlah) => {
                const kuantitasMenu = Number(jumlah);

                if (Number.isInteger(kuantitasMenu) && kuantitasMenu > 0) {
                    menu.kuantitasMenu += kuantitasMenu;
                    console.log("");
                    console.log(`${menu.namaMenu} sebanyak ${menu.kuantitasMenu} ditambahkan ke keranjang.`);
                }
                else {
                    console.log("");
                    console.log("Jumlah harus berupa bilangan bulat lebih dari 0.");
                }

                console.log("");
                pilihMenu();
            });
        }
        else {
            console.log("");
            rl.question("Pilihan tidak valid. Tekan Enter untuk kembali ke pilih menu...", () => {
                console.log("");
                pilihMenu();
            });
        }
    });
};

// Membuat function checkoutMenu
function checkoutMenu() {
    console.log("=============");
    console.log("CHECKOUT MENU");
    console.log("=============");

    // Mendeklarasikan variabel totalPembayaran = 0
    // Mendeklarasikan variabel adaPesanan = false
    let totalPembayaran = 0;
    let adaPesanan = false;

    // Mencetak pesanan (Harga, Kuantitas dan Subtotal) menggunakan perulangan
    for (let i = 0; i < daftarMenu.length; i++) {
        const menu = daftarMenu[i];

        if (menu.kuantitasMenu > 0) {
            const subtotal = menu.hargaMenu * menu.kuantitasMenu;

            totalPembayaran += subtotal;
            adaPesanan = true;

            console.log(menu.namaMenu);
            console.log(`Harga     : Rp${menu.hargaMenu}`);
            console.log(`Kuantitas : ${menu.kuantitasMenu}`);
            console.log(`Subtotal  : Rp${subtotal}`);
            console.log("-------------");
        }
    }

    // Jika variabel adaPesanan false maka akan console log dan jalankan fungsi pilihMenu
    if (!adaPesanan) {
        console.log("Belum ada pesanan.");
        pilihMenu();
        return;
    }

    // Cetak variabel totalPembayaran
    console.log(`Total Pembayaran: Rp${totalPembayaran}`);
    console.log("=============");
    console.log("");

    // Proses pembayaran dengan memilih y/n
    // Jika y maka akan menyimpan detailPesanan ke dalam array untuk diakses function riwayatPemesanan
    // Jika n maka akan kembali ke pilihMenu
    // Jika bukan y atau n maka akan console log
    rl.question("Lanjutkan pembayaran? (y/n) ", (pilihan) => {
        pilihan = pilihan.trim().toLocaleLowerCase();
        
        if (pilihan === "y") {
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

            riwayatPesanan.push({
                detailPesanan,
                totalPembayaran
            });
            
            console.log("");
            console.log("Pesanan berhasil dibuat!");

            for (let i = 0; i < daftarMenu.length; i++) {
                daftarMenu[i].kuantitasMenu = 0;
            }

            console.log("");
            menuUtama();
        }
        else if (pilihan === "n") {
            console.log("");
            pilihMenu();
        }
        else {
            console.log("Pilihan tidak valid.");
            console.log("");
            checkoutMenu();
        }
    });
};

// Membuat function riwayatPemesanan
function riwayatPemesanan() {
    console.log("=================");
    console.log("RIWAYAT PEMESANAN");
    console.log("=================");

    // Jika array riwayatPesanan kosong maka akan console log
    // Jika array riwayatPesanan tidak kosong maka akan cetak riwayatPesanan
    if (riwayatPesanan.length === 0) {
        console.log("Belum ada riwayat pemesanan.");
        console.log("");
    }
    else {
        for (let i = 0; i < riwayatPesanan.length; i++) {
            const pesanan = riwayatPesanan[i];

            console.log(`Pesanan ke-${i + 1}`);
            console.log("-----------------");

            for (j = 0; j < pesanan.detailPesanan; j++) {
                const menu = pesanan.detailPesanan[j];
                console.log(`${menu.namaMenu} x${menu.kuantitasMenu} = Rp${menu.subtotal}`);
            }

            console.log(`Total: ${pesanan.totalPembayaran}`);
            console.log("=================");
        }
    }

    // Tekan enter untuk kembali ke menu utama
    rl.question("Tekan enter untuk kembali ke menu utama...", () => {
        console.log("");
        menuUtama();
    });
};

// Memanggil fungsi menuUtama
menuUtama();