export const BATAS_MAKSIMUM = 100;

export function ambilKeranjang(daftarMenu) {
    return daftarMenu.filter(
        menu => menu.kuantitasMenu > 0
    );
}

export function tambahMenu(menu, jumlah) {
    if (
        !Number.isSafeInteger(jumlah) ||
        jumlah <= 0
    ) {
        throw new Error(
            "Jumlah harus berupa bilangan bulat lebih dari 0!"
        );
    }

    if (
        !Number.isSafeInteger(menu.kuantitasMenu) ||
        menu.kuantitasMenu < 0 ||
        menu.kuantitasMenu > BATAS_MAKSIMUM
    ) {
        throw new Error(
            "Data jumlah menu tidak valid!"
        );
    }

    const totalKuantitas = menu.kuantitasMenu + jumlah;

    if (
        !Number.isSafeInteger(totalKuantitas) ||
        totalKuantitas > BATAS_MAKSIMUM
    ) {
        throw new Error(
            `Jumlah pesanan maksimal ${BATAS_MAKSIMUM} pcs! ` +
            `Jumlah saat ini: ${menu.kuantitasMenu} pcs. ` +
            `Maksimal tambahan: ${BATAS_MAKSIMUM - menu.kuantitasMenu} pcs.`
        );
    }

    menu.kuantitasMenu = totalKuantitas;

    return menu;
}

export function hitungSubtotal(menu) {
    return menu.hargaMenu * menu.kuantitasMenu;
}

export function hitungTotal(daftarMenuDipesan) {
    return daftarMenuDipesan.reduce(
        (total, menu) => total + hitungSubtotal(menu),
        0
    );
}

export function kosongkanKeranjang(daftarMenu) {
    for (const menu of daftarMenu) {
        menu.kuantitasMenu = 0;
    }
}