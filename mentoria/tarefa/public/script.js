// Função para buscar as tarefas do servidor
const fetchTasks = async () => {
  const response = await fetch('http://localhost:3000/tasks');
  const tasks = await response.json();
  displayTasks(tasks);
};

// Função para exibir as tarefas na página
const displayTasks = (tasks) => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Limpa a lista antes de exibir as tarefas

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerText = task.text;
    
    // Criar botão de excluir
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Excluir';
    deleteButton.onclick = () => deleteTask(task.id);

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
};

// Função para adicionar uma nova tarefa
const addTask = async () => {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Por favor, insira uma tarefa!');
    return;
  }

  const newTask = { text: taskText, id: Date.now().toString() };

  const response = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  });

  if (response.ok) {
    taskInput.value = ''; // Limpar o campo de input
    fetchTasks(); // Recarregar a lista de tarefas
  } else {
    alert('Erro ao adicionar tarefa');
  }
};

// Função para excluir uma tarefa
const deleteTask = async (id) => {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    alert('Tarefa excluída com sucesso!');
    fetchTasks(); // Recarregar as tarefas após exclusão
  } else {
    alert('Erro ao excluir tarefa');
  }
};

// Iniciar a aplicação carregando as tarefas
fetchTasks();
