const urlApi = 'http://localhost:3000/alunos';
const resultDiv = document.getElementById('result');

// Função para validar o CPF (simples, apenas valida formato)
function validarCPF(cpf) {
  const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regexCPF.test(cpf);
}

// Função para validar o email
function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

// Função para cadastrar alunos
async function cadastraAlunos(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const email = document.getElementById('email').value.trim();
  const tel = document.getElementById('tel').value.trim();
  const date = document.getElementById('date').value;

  // Validações
  if (!nome) return alert('O campo Nome é obrigatório.');
  if (!validarCPF(cpf)) return alert('CPF inválido. Use o formato XXX.XXX.XXX-XX.');
  if (!validarEmail(email)) return alert('Email inválido.');
  if (!tel) return alert('O campo Telefone é obrigatório.');
  if (!date) return alert('A Data de Cadastro é obrigatória.');

  const aluno = { nome, cpf, email, tel, date };

  try {
    const request = new Request(urlApi, {
      method: 'POST',
      body: JSON.stringify(aluno),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    const response = await fetch(request);

    if (!response.ok) throw new Error('Erro ao cadastrar aluno.');

    // Atualiza a tabela dinamicamente
    resultDiv.insertAdjacentHTML(
      'beforeend',
      `
      <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.cpf}</td>
        <td>${aluno.email}</td>
      </tr>
      `
    );

    alert('Aluno cadastrado com sucesso!');
    document.querySelector('form').reset(); // Limpa o formulário
  } catch (error) {
    console.error(error);
    alert('Erro ao cadastrar aluno. Tente novamente mais tarde.');
  }
}

// Função para buscar e exibir alunos
async function getAlunos() {
  try {
    const response = await fetch(urlApi);

    if (!response.ok) throw new Error('Erro ao carregar a lista de alunos.');

    const result = await response.json();

    resultDiv.innerHTML = ''; // Limpa a tabela antes de carregar novos dados

    result.forEach((element) => {
      resultDiv.insertAdjacentHTML(
        'beforeend',
        `
        <tr>
          <td>${element.nome}</td>
          <td>${element.cpf}</td>
          <td>${element.email}</td>
        </tr>
        `
      );
    });
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar alunos. Tente novamente mais tarde.');
  }
}

// Inicializa a listagem de alunos ao carregar a página
getAlunos();
