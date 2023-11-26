const apiUrl = "https://botafogo-atletas.mange.li";

function fetchPlayerDetails(endpoint) {
    return fetch(`${apiUrl}/${endpoint}`)
        .then(response => response.json())
        .catch(error => {
            console.error("Erro ao obter dados:", error);
            return null;
        });
}

function displayPlayerDetails(players) {
    const playerContainer = document.createElement("div");
    playerContainer.className = "player-container";

    players.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";
        card.innerHTML = `
            <img src="${player.imagem}" alt="${player.nome}">
            <h2>${player.nome}</h2>

        `;

        
        card.addEventListener("click", () => redirectToDetailsPage(player.id));

        playerContainer.appendChild(card);
    });

    
    document.getElementById("playerDetails").innerHTML = '';
    document.getElementById("playerDetails").appendChild(playerContainer);
}

function redirectToDetailsPage(playerId) {
    
    window.location.href = `detalhes.html?id=${playerId}`;
}

function filtrarAtletas(filtro) {
    let endpoint;

    switch (filtro) {
        case 'masculino':
            endpoint = 'masculino';
            break;
        case 'feminino':
            endpoint = 'feminino';
            break;
        default:
            endpoint = 'all';
            break;
    }

    fetchPlayerDetails(endpoint)
        .then(playerDetails => {
            if (playerDetails) {
                displayPlayerDetails(playerDetails);
            }
        });
}

function loadDefaultCategory() {
const defaultCategory = 'all';
filtrarAtletas(defaultCategory);
}

// Carrega automaticamente os detalhes da categoria "all" ao carregar a página
window.onload = loadDefaultCategory;
