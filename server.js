import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

    let tarefas = [
    { id: 1, titulo: 'Estudar JavaScript', concluida: false },
    { id: 2, titulo: 'Configurar rotas no Postman', concluida: true }
];

let proximoId = 3;

app.get('/tarefas', (req, res) => {
    res.send(tarefas);
});

app.get('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        res.send(tarefa);
    } else {
        res.status(404).send({ error: 'Tarefa não encontrada' });
    }
});


app.post('/tarefas', (req, res) => {
    const titulo = req.body.titulo;

    if (!titulo) {
        return res.status(400).send({ error: "O campo 'titulo' é obrigatório" });
    }

    const novaTarefa = {
        id: proximoId,
        titulo: titulo,
        concluida: false
    };

    tarefas.push(novaTarefa);
    proximoId++;

    res.status(201).send(novaTarefa);
});


app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = tarefas.findIndex(t => t.id === id);

    if (indice !== -1) {
        tarefas.splice(indice, 1);
        res.send({ mensagem: 'Tarefa removida com sucesso' });
    } else {
        res.status(404).send({ error: 'Tarefa não encontrada' });
    }
});

app.listen(port, () => {
    console.log(`Servidor de tarefas rodando na porta ${port}`);
});