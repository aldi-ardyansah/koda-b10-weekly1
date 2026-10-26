export async function tanya(app, pertanyaan) {
    const jawaban = await app.rl.question(pertanyaan);

    return jawaban.trim();
}

export async function tungguEnter(app, pesan) {
    await app.rl.question(pesan);
}