import { readFile, writeFile } from "node:fs/promises";

const fileKeranjang = new URL(
    "../../db/keranjangMenu.json",
    import.meta.url
);

export async function bacaKeranjang(app) {
    let daftarMenuDipesan;

    try {
        const data = await readFile(fileKeranjang, "utf8");

        daftarMenuDipesan = JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            daftarMenuDipesan = [];
            await writeFile(fileKeranjang, "[]", "utf8");
        } else {
            throw error;
        }
    }

    if (!Array.isArray(daftarMenuDipesan)) {
        throw new Error(
            "Format keranjang harus berupa array."
        );
    }

    for (const menu of app.daftarMenu) {
        menu.kuantitasMenu = 0;
    }

    for (const menuDipesan of daftarMenuDipesan) {
        const menu = app.daftarMenu.find(
            item => item.idMenu === menuDipesan.idMenu
        );

        if (!menu) {
            continue;
        }

        const jumlah = menuDipesan.kuantitasMenu;

        if (
            !Number.isSafeInteger(jumlah) ||
            jumlah < 0 ||
            jumlah > 100
        ) {
            throw new Error(
                `Kuantitas tersimpan untuk ${menu.namaMenu} tidak valid.`
            );
        }

        menu.kuantitasMenu = jumlah;
    }
}

export async function simpanKeranjang(app) {
    const daftarMenuDipesan = app.daftarMenu.filter(
        menu => menu.kuantitasMenu > 0
    );

    await writeFile(
        fileKeranjang,
        JSON.stringify(daftarMenuDipesan, null, 4),
        "utf8"
    );
}