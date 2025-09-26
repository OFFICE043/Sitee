document.addEventListener('DOMContentLoaded', () => {
    const addAnimeForm = document.getElementById('add-anime-form');
    const animeListBody = document.getElementById('anime-list');

    async function fetchAndDisplayAnimes() {
        const response = await fetch('/api/animes');
        const animes = await response.json();

        animeListBody.innerHTML = '';
        animes.forEach(anime => {
            const row = `
                <tr class="border-b border-gray-700">
                    <td class="p-3">${anime.title}</td>
                    <td class="p-3">${anime.year || '-'}</td>
                </tr>
            `;
            animeListBody.innerHTML += row;
        });
    }

    addAnimeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newAnime = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            imageUrl: document.getElementById('imageUrl').value,
            year: document.getElementById('year').value,
            score: document.getElementById('score').value
        };
        await fetch('/api/animes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAnime)
        });
        addAnimeForm.reset();
        fetchAndDisplayAnimes();
    });

    fetchAndDisplayAnimes();
});
