import { useEffect, useState } from 'react'
import './Global.css'

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");

  const carregarTarefas = async () => {
    const res = await fetch("http://localhost:3000/tarefas");
    const data = await res.json();
    setTarefas(data);
  };

  const adicionarTarefa = async () => {
    if (!titulo.trim()) return;
    await fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });
    setTitulo("");
    carregarTarefas();
  };

  const alternarConclusao = async (id) => {
    await fetch(`http://localhost:3000/tarefas/${id}`, { method: "PUT" });
    carregarTarefas();
  };

  const deletarTarefa = async (id) => {
    await fetch(`http://localhost:3000/tarefas/${id}`, { method: "DELETE" });
    carregarTarefas();
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (

      <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto", }}>
      <h1>Lista de Tarefas 📝</h1>
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={adicionarTarefa} style={{ backgroundColor:"green", color: "white", marginLeft: 10 }}>Adicionar</button>
      <ul>
        {tarefas.map((t) => (
          <li key={t.id} style={{ marginTop: "0.5rem" }}>
            <span
              onClick={() => alternarConclusao(t.id)}
              style={{
                textDecoration: t.concluida ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.titulo}
            </span>
            <button onClick={() => deletarTarefa(t.id)} style={{ marginLeft: "1rem", backgroundColor:"red", color: "white" }}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
