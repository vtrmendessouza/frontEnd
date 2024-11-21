const urlApi = 'http://localhost:3000/professores';
const resultDiv = document.getElementById('result');

async function cadastraProfessores(event) {
    event.preventDefault();

    try {
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const dataNascimento = document.getElementById('data-nascimento').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const area = document.getElementById('area').value;
        const titulacao = document.getElementById('titulacao').value;
        const dataAdmissao = document.getElementById('data-admissao').value;
        const registro = document.getElementById('registro').value;
        const ativo = document.getElementById('ativo').checked;
        const inativo = document.getElementById('inativo').checked;

        if (!nome || !cpf || !email || !area) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        const professores = {
            nome,
            cpf,
            dataNascimento,
            email,
            telefone,
            area,
            titulacao,
            dataAdmissao,
            registro,
            ativo,
            inativo,
        };

        const request = new Request(urlApi, {
            method: 'POST',
            body: JSON.stringify(professores),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`Erro ao cadastrar: ${response.statusText}`);
        }

        const data = await response.json();
        alert('Professor cadastrado com sucesso!');
    } catch (error) {
        console.error(error);
        alert(`Erro ao cadastrar: ${error.message}`);
    }
}

async function getProfessores() {
    try {
        const response = await fetch(urlApi);
        if (!response.ok) {
            throw new Error(`Erro ao buscar professores: ${response.statusText}`);
        }

        const result = await response.json();

        result.forEach(element => {
            resultDiv.insertAdjacentHTML('beforeend',
                `
                    <tr>
                        <td>${element.nome}</td>
                        <td>${element.cpf}</td>
                        <td>${element.dataNascimento}</td>
                        <td>${element.email}</td>
                        <td>${element.telefone}</td>
                        <td>${element.area}</td>
                        <td>${element.titulacao}</td>
                        <td>${element.dataAdmissao}</td>
                        <td>${element.registro}</td>
                        <td>${element.ativo ? 'Sim' : 'Não'}</td>
                        <td>${element.inativo ? 'Sim' : 'Não'}</td>
                    </tr>
                `
            );
        });
    } catch (error) {
        console.error(error);
        alert(`Erro ao buscar professores: ${error.message}`);
    }
}

getProfessores();
