# Order Mie Gacoan

Aplikasi pemesanan menu Mie Gacoan berbasis Command Line Interface (CLI) yang dibuat menggunakan JavaScript dan Node.js.

Proyek ini merupakan latihan untuk menerapkan konsep JavaScript, pemrograman asinkron, modularisasi kode, pengolahan file JSON, serta pengelolaan data pesanan.

## Fitur

- **Pilih Menu** — Menampilkan daftar menu beserta harga dan menerima jumlah pesanan.
- **Keranjang Menu** — Menampilkan daftar pesanan, kuantitas, subtotal, dan total pembayaran.
- **Penyimpanan Keranjang Menu** — Menyimpan dan membaca keranjang menu melalui file `dataKeranjangMenu.json`.
- **Riwayat Pemesanan** — Menampilkan detail pesanan yang telah dikonfirmasi.
- **Penyimpanan Riwayat Pemesanan** — Menyimpan dan membaca riwayat pemesanan melalui file `dataRiwayatPemesanan.json`.

## Teknologi

- JavaScript (ES Modules)
- Node.js
- `node:readline/promises` untuk menerima input pengguna melalui terminal.
- `node:fs/promises` untuk membaca dan menulis file JSON.