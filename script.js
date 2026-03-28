// O link que você gerou no GAS
const API_URL = "https://script.google.com/macros/s/AKfycby3NxWcJZBdiej2WkZSEh2_gLTbaSN6xSM4zoqKFYRklxO5cuiq6JQ-QkNlNBws3sdb/exec";

async function loadLibrary() {
    const grid = document.getElementById('books-grid');
    const loading = document.getElementById('loading-message');

    try {
        const response = await fetch(API_URL);
        const books = await response.json();

        loading.style.display = 'none'; // Esconde o aviso de carregando [cite: 65]

        // Organiza os livros em grupos de 3 [cite: 9]
        for (let i = 0; i < books.length; i += 3) {
            const groupData = books.slice(i, i + 3);
            const groupDiv = document.createElement('div');
            groupDiv.className = 'book-group';

            groupData.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.className = 'book-item';
                bookDiv.innerHTML = `
                    <img src="${book.Capa}" class="book-cover">
                    <div class="btn-reveal">Conheça o ebook</div>
                `;
                
                // Ao clicar, envia os dados para a página de detalhes [cite: 47]
                bookDiv.onclick = () => {
                    const params = new URLSearchParams(book).toString();
                    window.location.href = `detalhes.html?${params}`;
                };

                groupDiv.appendChild(bookDiv);
            });

            grid.appendChild(groupDiv);
        }
    } catch (e) {
        loading.innerText = "Erro ao carregar livros.";
    }
}

loadLibrary();