// Função para buscar as tarefas do servidor
const fetchTasks = async () => {
  // Faz uma requisição ao servidor para obter a lista de tarefas
  const response = await fetch('http://localhost:3000/api/tasks');
  const tasks = await response.json(); // Converte a resposta em JSON
  displayTasks(tasks); // Exibe as tarefas na página
};

// Função para exibir as tarefas na página
const displayTasks = (tasks) => {
  const taskList = document.getElementById('task-list'); // Obtém o elemento da lista de tarefas
  taskList.innerHTML = ''; // Limpa a lista antes de exibir as novas tarefas

  // Itera sobre a lista de tarefas e cria os elementos HTML para cada uma
  tasks.forEach(task => {
    const li = document.createElement('li'); // Cria um elemento de lista (<li>)
    li.innerText = task.text; // Define o texto da tarefa

    // Cria botão de excluir
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Excluir'; // Define o texto do botão
    deleteButton.onclick = () => deleteTask(task.id); // Associa a função de exclusão ao botão

    // Cria botão de editar
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar'; // Define o texto do botão
    editButton.onclick = () => editTask(task); // Associa a função de edição ao botão

    // Adiciona os botões ao elemento da tarefa
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    taskList.appendChild(li); // Adiciona a tarefa à lista
  });
};

// Função para adicionar uma nova tarefa
const addTask = async () => {
  const taskInput = document.getElementById('task-input'); // Obtém o campo de entrada
  const taskText = taskInput.value.trim(); // Remove espaços em branco no início e no final

  if (taskText === '') {
    alert('Por favor, insira uma tarefa!'); // Valida se o campo não está vazio
    return;
  }

  // Cria o objeto da nova tarefa
  const newTask = { text: taskText, id: Date.now().toString() };

  // Faz uma requisição POST ao servidor para adicionar a tarefa
  const response = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Define o formato do corpo da requisição
    },
    body: JSON.stringify(newTask) // Converte a tarefa para JSON
  });

  if (response.ok) {
    taskInput.value = ''; // Limpa o campo de entrada
    fetchTasks(); // Recarrega a lista de tarefas
  } else {
    alert('Erro ao adicionar tarefa'); // Exibe erro caso a adição falhe
  }
};

// Função para excluir uma tarefa
const deleteTask = async (id) => {
  // Faz uma requisição DELETE ao servidor com o ID da tarefa
  const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    alert('Tarefa excluída com sucesso!'); // Exibe mensagem de sucesso
    fetchTasks(); // Recarrega a lista de tarefas após a exclusão
  } else {
    alert('Erro ao excluir tarefa'); // Exibe erro caso a exclusão falhe
  }
};

// Função para editar uma tarefa
const editTask = async (task) => {
  // Abre um prompt para o usuário editar o texto da tarefa
  const newText = prompt('Edite a tarefa:', task.text);
  
  if (newText === null || newText.trim() === '') {
    alert('Edição cancelada ou texto inválido!'); // Verifica se o texto é válido
    return;
  }

  // Cria o objeto atualizado da tarefa
  const updatedTask = { ...task, text: newText.trim() };

  // Faz uma requisição PUT ao servidor para atualizar a tarefa
  const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' // Define o formato do corpo da requisição
    },
    body: JSON.stringify(updatedTask) // Converte a tarefa atualizada para JSON
  });

  if (response.ok) {
    alert('Tarefa editada com sucesso!'); // Exibe mensagem de sucesso
    fetchTasks(); // Recarrega a lista de tarefas após a edição
  } else {
    alert('Erro ao editar tarefa'); // Exibe erro caso a edição falhe
  }
};

// Inicia a aplicação carregando a lista de tarefas do servidor
fetchTasks();
