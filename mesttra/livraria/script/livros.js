const urlApi = 'http://localhost:3000/livros';
const resultDiv = document.getElementById('result');

async function cadastraLivros(event) {
    event.preventDefault();

    try {
        const titulo = document.getElementById('titulo').value;
        const subtitulo = document.getElementById('subtitulo').value;
        const autor = document.getElementById('autor').value;
        const editora = document.getElementById('editora').value;
        const categoria = document.getElementById('categoria').value;
        const ano = document.getElementById('ano').value;
        const edicao = document.getElementById('edicao').value;
        const paginas = document.getElementById('paginas').value;
        const sinopse = document.getElementById('sinopse').value;
        const capa = document.getElementById('capa').value;
        const preco = document.getElementById('preco').value;
        const estoque = document.getElementById('estoque').value;
        const disponivel = document.getElementById('disponivel').checked;
        const indisponivel = document.getElementById('indisponivel').checked;
        const dataCadastro = document.getElementById('data-cadastro').value;

        if (!titulo || !autor || !preco || !estoque) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        const livros = {
            titulo,
            subtitulo,
            autor,
            editora,
            categoria,
            ano,
            edicao,
            paginas,
            sinopse,
            capa,
            preco,
            estoque,
            disponivel,
            indisponivel,
            dataCadastro
        };

        const request = new Request(urlApi, {
            method: 'POST',
            body: JSON.stringify(livros),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(`Erro ao cadastrar: ${response.statusText}`);
        }

        const data = await response.json();

        alert('Livro cadastrado com sucesso!');
    } catch (error) {
        console.error(error);
        alert(`Erro: ${error.message}`);
    }
}

async function getLivros() {
    try {
        const response = await fetch(urlApi);

        if (!response.ok) {
            throw new Error(`Erro ao buscar livros: ${response.statusText}`);
        }

        const result = await response.json();

        result.forEach(element => {
            resultDiv.insertAdjacentHTML('beforeend',
                `
                    <tr>
                        <td>${element.titulo}</td>
                        <td>${element.subtitulo}</td>
                        <td>${element.autor}</td>
                        <td>${element.editora}</td>
                        <td>${element.categoria}</td>
                        <td>${element.ano}</td>
                        <td>${element.edicao}</td>
                        <td>${element.paginas}</td>
                        <td>${element.sinopse}</td>
                        <td>${element.capa}</td>
                        <td>${element.preco}</td>
                        <td>${element.estoque}</td>
                        <td>${element.disponivel ? 'Sim' : 'Não'}</td>
                        <td>${element.indisponivel ? 'Sim' : 'Não'}</td>
                        <td>${element.dataCadastro}</td>
                    </tr>
                `
            );
        });
    } catch (error) {
        console.error(error);
        alert(`Erro: ${error.message}`);
    }
}

getLivros();
