document.addEventListener('DOMContentLoaded', () => {
    // --- Негізгі элементтер ---
    const animeGrid = document.getElementById('anime-grid');
    const loading = document.getElementById('loading');
    const searchInput = document.getElementById('search-input');
    const mainTitle = document.getElementById('main-title');
    
    // --- Аутентификация терезесінің элементтері ---
    const loginButton = document.getElementById('login-button');
    const authModal = document.getElementById('auth-modal');
    
    // --- Аниме туралы толық ақпарат терезесі ---
    const detailsModal = document.getElementById('details-modal');
    const detailsModalContent = document.getElementById('details-modal-content');

    let player; // Плеерді сақтайтын жаһандық айнымалы

    // --- API-дан анимелерді жүктеу (өзгеріссіз) ---
    async function fetchAnime(url) {
        // ... (бұл функцияның іші өзгеріссіз қалды)
        // ...
    }
    fetchAnime('https://api.jikan.moe/v4/top/anime');

    // --- "Ko'rish" батырмасын басқанда толық ақпаратты көрсету ---
    animeGrid.addEventListener('click', (e) => {
        const targetButton = e.target.closest('.ko-rish-btn');
        if (targetButton) {
            const animeId = targetButton.dataset.id;
            openDetailsModal(animeId);
        }
    });

    async function openDetailsModal(animeId) {
        detailsModal.classList.remove('hidden');
        detailsModal.classList.add('flex');
        detailsModalContent.innerHTML = '<p class="text-center p-10">Ma\'lumotlar yuklanmoqda...</p>';

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`);
            const { data: anime } = await response.json();

            detailsModalContent.innerHTML = `
                <button id="close-details-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl z-50">&times;</button>
                <div class="w-full">
                    <div class="video-container p-1 bg-black">
                        <video id="player" playsinline controls>
                            <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div class="p-6">
                        <h2 class="text-3xl font-bold text-white">${anime.title_english || anime.title}</h2>
                        <div class="flex items-center gap-4 text-gray-400 text-sm mt-2">
                            <span>★ ${anime.score}</span>
                            <span>${anime.year}</span>
                            <span>${anime.status}</span>
                        </div>
                        <p class="mt-4 text-gray-300 leading-relaxed max-h-24 overflow-y-auto">${anime.synopsis}</p>
                    </div>
                </div>
            `;
            
            // 2. ЖАҢА: Plyr плеерін іске қосу
            player = new Plyr('#player', {
                // (болашақта қосымша баптаулар осында жазылады)
            });

            document.getElementById('close-details-modal').addEventListener('click', () => {
                if (player) {
                    player.destroy(); // Терезені жапқанда плеерді өшіру
                }
                detailsModal.classList.add('hidden');
                detailsModal.classList.remove('flex');
            });

        } catch (error) {
            detailsModalContent.innerHTML = '<p class="text-center p-10 text-red-400">Xatolik yuz berdi.</p>';
        }
    }
    
    // --- Аутентификация терезесінің логикасы (өзгеріссіз) ---
    // ... (бұл бөлімнің коды бұрынғыдай, өзгеріссіз)
});
