const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000; // Definindo a porta 3000

// Para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Para obter tarefas do arquivo JSON
app.get('/api/tasks', (req, res) => {
  fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao ler o arquivo de tarefas' });
    }
    res.json(JSON.parse(data));
  });
});

// Para adicionar uma nova tarefa
app.post('/api/tasks', express.json(), (req, res) => {
  const newTask = req.body;

  fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao ler o arquivo de tarefas' });
    }

    const tasks = JSON.parse(data);
    tasks.push(newTask);

    fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao salvar a tarefa' });
      }
      res.status(201).json(newTask);
    });
  });
});

// Para remover uma tarefa
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao ler o arquivo de tarefas' });
    }

    let tasks = JSON.parse(data);
    tasks = tasks.filter(task => task.id !== taskId);

    fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao remover a tarefa' });
      }
      res.status(200).json({ message: 'Tarefa removida com sucesso' });
    });
  });
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
