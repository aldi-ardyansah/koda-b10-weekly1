import { readFile } from "node:fs/promises";

const fileMenu = new URL(
    "../../db/daftarMenu.json",
    import.meta.url
);

export async function bacaDaftarMenu() {
    const data = await readFile(fileMenu, "utf8");
    const daftarMenu = JSON.parse(data);

    if (!Array.isArray(daftarMenu)) {
        throw new Error(
            "Format daftar menu harus berupa array."
        );
    }

    return daftarMenu.map(menu => ({
        ...menu,
        kuantitasMenu: 0
    }));
}