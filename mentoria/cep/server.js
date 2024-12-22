const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

// Habilita o CORS para permitir requisições de qualquer origem
app.use(cors());

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

// Rota para salvar os dados
app.post("/salvar", (req, res) => {
    const dados = req.body;

    // Verifica se os dados têm as informações obrigatórias
    if (!dados.nome || !dados.sexo || !dados.cep || !dados.rua || !dados.bairro || !dados.cidade || !dados.estado || !dados.pais) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    // Lê o arquivo existente e adiciona os novos dados
    fs.readFile("data.json", "utf8", (err, data) => {
        let jsonData = [];
        
        // Se não houver erro ao ler o arquivo, e o arquivo não estiver vazio, parse o conteúdo
        if (!err && data) {
            try {
                jsonData = JSON.parse(data);
            } catch (parseError) {
                console.error("Erro ao parsear o arquivo JSON:", parseError);
                return res.status(500).send("Erro ao processar os dados.");
            }
        }

        // Adiciona os dados do cadastro ao array
        jsonData.push(dados);

        // Escreve os dados atualizados no arquivo
        fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Erro ao salvar os dados:", err);
                return res.status(500).send("Erro ao salvar os dados.");
            }
            res.send("Dados salvos com sucesso!");
        });
    });
});

// Rota para apagar dados
app.delete("/apagar", (req, res) => {
    const { nome, cep } = req.body;

    if (!nome && !cep) {
        return res.status(400).send("Informe o nome ou o CEP para apagar.");
    }

    // Lê o arquivo existente
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            console.error("Erro ao ler os dados:", err);
            return res.status(500).send("Erro ao ler os dados.");
        }

        let jsonData = [];
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error("Erro ao parsear o arquivo JSON:", parseError);
            return res.status(500).send("Erro ao processar os dados.");
        }

        // Filtra os dados para remover o cadastro com base no nome ou cep
        const filteredData = jsonData.filter(item => 
            (nome && item.nome !== nome) || (cep && item.cep !== cep)
        );

        // Se o tamanho do array for o mesmo, significa que não houve remoção
        if (filteredData.length === jsonData.length) {
            return res.status(404).send("Cadastro não encontrado.");
        }

        // Escreve os dados atualizados no arquivo
        fs.writeFile("data.json", JSON.stringify(filteredData, null, 2), (err) => {
            if (err) {
                console.error("Erro ao salvar os dados:", err);
                return res.status(500).send("Erro ao salvar os dados.");
            }
            res.send("Cadastro apagado com sucesso!");
        });
    });
});

// Rota para alterar dados
app.put("/alterar", (req, res) => {
    const { nome, cep, novosDados } = req.body;

    if (!nome && !cep) {
        return res.status(400).send("Informe o nome ou o CEP para alterar.");
    }

    if (!novosDados || typeof novosDados !== "object") {
        return res.status(400).send("Informe os novos dados para alteração.");
    }

    // Lê o arquivo existente
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            console.error("Erro ao ler os dados:", err);
            return res.status(500).send("Erro ao ler os dados.");
        }

        let jsonData = [];
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error("Erro ao parsear o arquivo JSON:", parseError);
            return res.status(500).send("Erro ao processar os dados.");
        }

        // Encontra o item a ser alterado
        let itemIndex = jsonData.findIndex(item => 
            (nome && item.nome === nome) || (cep && item.cep === cep)
        );

        // Se não encontrar o item, retorna erro
        if (itemIndex === -1) {
            return res.status(404).send("Cadastro não encontrado.");
        }

        // Substitui os dados antigos pelos novos
        jsonData[itemIndex] = { ...jsonData[itemIndex], ...novosDados };

        // Escreve os dados atualizados no arquivo
        fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Erro ao salvar os dados:", err);
                return res.status(500).send("Erro ao salvar os dados.");
            }
            res.send("Cadastro alterado com sucesso!");
        });
    });
});

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
