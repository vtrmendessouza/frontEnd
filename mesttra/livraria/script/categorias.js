const urlApi = 'http://localhost:3000/categorias';
const resultDiv = document.getElementById('result');

async function cadastraCategorias(event) {
    event.preventDefault();

    try {
        const nomeCategoria = document.getElementById('nome-categoria').value;
        const codigoCategoria = document.getElementById('codigo-categoria').value;
        const descricaoCategoria = document.getElementById('descricao-categoria').value;
        const categoriaPai = document.getElementById('categoria-pai').value;
        const statusAtivo = document.getElementById('status-ativo').checked;
        const statusInativo = document.getElementById('status-inativo').checked;

        const categorias = {
            nomeCategoria,
            codigoCategoria,
            descricaoCategoria,
            categoriaPai,
            statusAtivo,
            statusInativo
        };

        const request = new Request(urlApi, {
            method: 'POST',
            body: JSON.stringify(categorias),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(`Erro ao cadastrar: ${response.statusText}`);
        }

        alert('Cadastrado com sucesso!');
    } catch (error) {
        console.error(error);
        alert(`Erro: ${error.message}`);
    }
}

async function getCategorias() {
    try {
        const response = await fetch(urlApi);

        if (!response.ok) {
            throw new Error(`Erro ao buscar categorias: ${response.statusText}`);
        }

        const result = await response.json();

        result.forEach(element => {
            resultDiv.insertAdjacentHTML('beforeend',
                `
                    <tr>
                        <td>${element.nomeCategoria}</td>
                        <td>${element.codigoCategoria}</td>
                        <td>${element.descricaoCategoria}</td>
                        <td>${element.categoriaPai}</td>
                        <td>${element.statusAtivo ? 'Sim' : 'Não'}</td>
                        <td>${element.statusInativo ? 'Sim' : 'Não'}</td>
                    </tr>
                `
            );
        });
    } catch (error) {
        console.error(error);
        alert(`Erro: ${error.message}`);
    }
}

getCategorias();
