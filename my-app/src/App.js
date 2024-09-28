import React, { useState } from 'react';
import './App.css';

// Importações do react-icons
import { MdCheck, MdUndo, MdEdit, MdDelete } from 'react-icons/md';

const maxTarefas = 10;

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [prazo, setPrazo] = useState('');
  const [prioridade, setPrioridade] = useState('Baixa');

  const adicionarTarefa = () => {
    if (tarefas.length < maxTarefas && descricao && responsavel && prazo) {
      const novaTarefa = {
        descricao,
        responsavel,
        prazo,
        prioridade,
        completa: false
      };
      setTarefas([...tarefas, novaTarefa]);
      limparFormulario();
    } else {
      alert('Preencha todos os campos ou o número máximo de tarefas foi atingido');
    }
  };

  const alternarStatus = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].completa = !novasTarefas[index].completa;
    setTarefas(novasTarefas);
  };

  const removerTarefa = (index) => {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
  };

  const editarTarefa = (index) => {
    const tarefa = tarefas[index];
    setDescricao(tarefa.descricao);
    setResponsavel(tarefa.responsavel);
    setPrazo(tarefa.prazo);
    setPrioridade(tarefa.prioridade);
    removerTarefa(index);
  };

  const limparFormulario = () => {
    setDescricao('');
    setResponsavel('');
    setPrazo('');
    setPrioridade('Baixa');
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <div id="formulario">
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <input
          type="text"
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
          placeholder="Responsável"
        />
        <input
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
        />
        <select
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
        <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
      </div>
      <p id="contador">Tarefas: {tarefas.length} / {maxTarefas}</p>
      <ul id="listaDeTarefas">
        {tarefas.map((tarefa, index) => (
          <li key={index} className={`tarefa prioridade-${tarefa.prioridade}`}>
            <div>
              <span className={tarefa.completa ? 'completa' : ''}>
                {tarefa.descricao} (Responsável: {tarefa.responsavel}, Prazo: {tarefa.prazo}, Prioridade: {tarefa.prioridade})
              </span>
            </div>
            <div className="botoes">
              <button onClick={() => alternarStatus(index)} title={`Marcar como ${tarefa.completa ? 'Pendente' : 'Completa'}`}>
                {tarefa.completa ? <MdUndo /> : <MdCheck />}
              </button>
              <button onClick={() => editarTarefa(index)} title="Editar Tarefa">
                <MdEdit />
              </button>
              <button onClick={() => removerTarefa(index)} title="Excluir Tarefa">
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
