const urlApi = 'http://localhost:3000/alunos';
const resultDiv = document.getElementById('result');


async function cadastraAlunos(event) {
  // Removo o comportamento de carregar a pagina
  event.preventDefault();

  // Buscar o que usuario digitou no formulario
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const email = document.getElementById('email').value;
  const tel = document.getElementById('tel').value;
  const date = document.getElementById('date').value;

  const aluno = {
    nome,
    cpf,
    email,
    tel,
    date
  }

  const request = new Request(urlApi, {
    method: 'POST',
    body: JSON.stringify(aluno),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })

  const response = await fetch(request)
  const data = await response;

  alert('Cadastrado com sucesso !')
}



async function getAlunos() {
  const response = await fetch(urlApi);
  const result = await response.json();

  result.forEach(element => {
    resultDiv.insertAdjacentHTML('beforeend',
          `
              <tr>
                  <td>${element.nome}</td>
                  <td>${element.cpf}</td>
                  <td>${element.email}</td>
              </tr>
          `
      )
  });
};

getAlunos()
