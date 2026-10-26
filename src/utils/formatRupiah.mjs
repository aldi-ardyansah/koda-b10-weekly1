export default function formatRupiah(nominal) {
    return `Rp${nominal.toLocaleString("id-ID")}`;
}
