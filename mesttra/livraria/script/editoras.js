const urlApi = 'http://localhost:3000/editoras';
const resultDiv = document.getElementById('result');

async function cadastraEditoras(event) {
    event.preventDefault();

    try {
        const nomeEditora = document.getElementById('nome-editora').value;
        const cnpj = document.getElementById('cnpj').value;
        const razaoSocial = document.getElementById('razao-social').value;
        const enderecoCompleto = document.getElementById('endereco-completo').value;
        const telefoneComercial = document.getElementById('telefone-comercial').value;
        const emailComercial = document.getElementById('email-comercial').value;
        const site = document.getElementById('site').value;
        const responsavel = document.getElementById('responsavel').value;
        const telefoneContato = document.getElementById('telefone-contato').value;
        const dataCadastro = document.getElementById('data-cadastro').value;
        const ativo = document.getElementById('ativo').checked;
        const inativa = document.getElementById('inativa').checked;

        const editoras = {
            nomeEditora,
            cnpj,
            razaoSocial,
            enderecoCompleto,
            telefoneComercial,
            emailComercial,
            site,
            responsavel,
            telefoneContato,
            dataCadastro,
            ativo,
            inativa
        };

        const request = new Request(urlApi, {
            method: 'POST',
            body: JSON.stringify(editoras),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(`Erro ao cadastrar: ${response.statusText}`);
        }

        const data = await response.json();

        alert('Cadastrado com sucesso!');
    } catch (error) {
        console.error(error);
        alert(`Erro: ${error.message}`);
    }
}

async function getEditoras() {
    try {
        const response = await fetch(urlApi);

        if (!response.ok) {
            throw new Error(`Erro ao buscar editoras: ${response.statusText}`);
        }

        const result = await response.json();

        result.forEach(element => {
            resultDiv.insertAdjacentHTML('beforeend',
                `
                    <tr>
                        <td>${element.nomeEditora}</td>
                        <td>${element.cnpj}</td>
                        <td>${element.razaoSocial}</td>
                        <td>${element.enderecoCompleto}</td>
                        <td>${element.telefoneComercial}</td>
                        <td>${element.emailComercial}</td>
                        <td>${element.site}</td>
                        <td>${element.responsavel}</td>
                        <td>${element.telefoneContato}</td>
                        <td>${element.dataCadastro}</td>
                        <td>${element.ativo ? 'Sim' : 'Não'}</td>
                        <td>${element.inativa ? 'Sim' : 'Não'}</td>
                    </tr>
                `
            );
        });
    } catch (error) {
        console.error(error);
        alert(`Erro: ${error.message}`);
    }
}

getEditoras();
