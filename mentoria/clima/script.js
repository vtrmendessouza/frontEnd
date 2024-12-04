// Chave da API da OpenWeatherMap
const apiKey = "6305530a0d4b02f97d4aab1cbd9c60f6";

// Função para buscar previsão do tempo por nome da cidade
async function buscarPrevisao(cidade) {
    // URL da API com o nome da cidade e sua chave
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        // Fazendo requisição para a API
        const response = await fetch(url);

        // Verifica se houve erro na requisição
        if (!response.ok) {
            throw new Error("Cidade não encontrada");
        }

        // Converte a resposta para JSON e retorna
        return await response.json();
    } catch (error) {
        // Lança uma mensagem de erro se algo falhar
        throw error.message;
    }
}

// Função para buscar previsão do tempo por coordenadas geográficas
async function buscarPorCoordenadas(lat, lon) {
    // URL da API com latitude e longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        // Fazendo requisição para a API
        const response = await fetch(url);

        // Verifica se houve erro na requisição
        if (!response.ok) {
            throw new Error("Erro ao obter previsão para sua localização");
        }

        // Converte a resposta para JSON e retorna
        return await response.json();
    } catch (error) {
        // Lança uma mensagem de erro se algo falhar
        throw error.message;
    }
}

// Função para exibir os dados da previsão do tempo
function exibirPrevisao(dados) {
    const resultado = document.getElementById("resultado");
    const { main, weather, wind, sys, name } = dados;

    // Exibe os resultados formatados na tela
    resultado.style.display = "block";
    resultado.innerHTML = `
        <h2>Previsão para ${name}, ${sys.country}</h2>
        <p class="temperatura">${main.temp}°C</p>
        <p>Condição: ${weather[0].description}</p>
        <img class="icone" src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" />
        <p>Umidade: ${main.humidity}%</p>
        <p>Vento: ${wind.speed} km/h</p>
    `;
}

// Evento de clique no botão "Buscar"
document.getElementById("buscar").addEventListener("click", async () => {
    const cidade = document.getElementById("cidade").value.trim();
    const mensagem = document.getElementById("mensagem");

    // Verifica se o campo está vazio
    if (!cidade) {
        mensagem.textContent = "Por favor, digite o nome de uma cidade.";
        return;
    }

    mensagem.textContent = "Buscando previsão...";

    try {
        // Chama a função de busca e exibe os resultados
        const dados = await buscarPrevisao(cidade);
        exibirPrevisao(dados);
        mensagem.textContent = "";
    } catch (error) {
        // Exibe mensagem de erro caso falhe
        mensagem.textContent = "Erro: " + error;
    }
});

// Evento para permitir busca ao pressionar a tecla "Enter"
document.getElementById("cidade").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("buscar").click();
    }
});

// Evento de clique no botão "Usar Minha Localização"
document.getElementById("localizacao").addEventListener("click", () => {
    const mensagem = document.getElementById("mensagem");

    // Verifica se a geolocalização está disponível no navegador
    if (!navigator.geolocation) {
        mensagem.textContent = "Geolocalização não suportada no seu navegador.";
        return;
    }

    mensagem.textContent = "Obtendo localização...";

    // Obtém a posição atual do usuário
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                // Chama a função de busca por coordenadas e exibe os resultados
                const dados = await buscarPorCoordenadas(latitude, longitude);
                exibirPrevisao(dados);
                mensagem.textContent = "";
            } catch (error) {
                mensagem.textContent = "Erro: " + error;
            }
        },
        (error) => {
            // Exibe mensagem caso a localização falhe
            mensagem.textContent = "Erro ao obter localização.";
        }
    );
});
