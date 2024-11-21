const urlApi = 'http://localhost:3000/autores';
const resultDiv = document.getElementById('result');

async function cadastraAutores(event) {
    event.preventDefault();

    try {
        const nomeCompleto = document.getElementById('nome-completo').value;
        const nomeArtistico = document.getElementById('nome-artistico').value;
        const nacionalidade = document.getElementById('nacionalidade').value;
        const dataNascimento = document.getElementById('data-nascimento').value;
        const biografia = document.getElementById('biografia').value;
        const emailContato = document.getElementById('email-contato').value;
        const areaEscrita = document.getElementById('area-escrita').value;
        const ativo = document.getElementById('ativo').checked;
        const inativo = document.getElementById('inativo').checked;

        const autores = {
            nomeCompleto,
            nomeArtistico,
            nacionalidade,
            dataNascimento,
            biografia,
            emailContato,
            areaEscrita,
            ativo,
            inativo
        };

        const request = new Request(urlApi, {
            method: 'POST',
            body: JSON.stringify(autores),
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

async function getAutores() {
    try {
        const response = await fetch(urlApi);

        if (!response.ok) {
            throw new Error(`Erro ao buscar autores: ${response.statusText}`);
        }

        const result = await response.json();

        result.forEach(element => {
            resultDiv.insertAdjacentHTML('beforeend',
                `
                    <tr>
                        <td>${element.nomeCompleto}</td>
                        <td>${element.nomeArtistico}</td>
                        <td>${element.nacionalidade}</td>
                        <td>${element.dataNascimento}</td>
                        <td>${element.biografia}</td>
                        <td>${element.emailContato}</td>
                        <td>${element.areaEscrita}</td>
                        <td>${element.ativo ? 'Sim' : 'Não'}</td>
                        <td>${element.inativo ? 'Sim' : 'Não'}</td>
                    </tr>
                `
            );
        });
    } catch (error) {
        console.error(error);
        alert(`Erro: ${error.message}`);
    }
}

getAutores();
