const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let tarefas = [];
let id = 1;

app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ erro: "Título é obrigatório" });

  const novaTarefa = { id: id++, titulo, concluida: false };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", (req, res) => {
  const tarefa = tarefas.find((t) => t.id == req.params.id);
  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });

  tarefa.concluida = !tarefa.concluida;
  res.json(tarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  tarefas = tarefas.filter((t) => t.id != req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
