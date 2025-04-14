import { useState } from "react";
import "./App.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input.trim()]);
      setInput("");
    }
  };

  return (
    <div className="centered-content">
      <h2>To-Do List</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTask}>Adicionar</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

function ClickCounter() {
  const [count, setCount] = useState(0);
  return (
    <div className="centered-content">
      <h2>Contador de Cliques</h2>
      <p>Você clicou {count} vezes.</p>
      <button onClick={() => setCount(count + 1)}>Clique aqui</button>
    </div>
  );
}

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const status = winner
    ? `Vencedor: ${winner}`
    : `Próximo jogador: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  return (
    <div className="centered-content">
      <h2>Jogo da Velha</h2>
      <p>{status}</p>
      <div className="grid-ttt">
        {squares.map((square, i) => (
          <button key={i} onClick={() => handleClick(i)} className="ttt-button">
            {square}
          </button>
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => setInput((prev) => prev + value);
  const clear = () => setInput("");
  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Erro");
    }
  };

  return (
    <div className="centered-content">
      <h2>Calculadora</h2>
      <input value={input} readOnly className="calc-input" />
      <div className="calc-grid">
        {["7", "8", "9", "/", "4", "5", "6", "-", "1", "2", "3", "*", "0", ".", "=", "+"].map((btn) => (
          <button
            key={btn}
            onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
          >
            {btn}
          </button>
        ))}
        <button className="clear" onClick={clear}>
          Limpar
        </button>
      </div>
    </div>
  );
}

// Buscador de CEP
function CepSearch() {
  const [cep, setCep] = useState('');
  const [data, setData] = useState(null);

  const searchCep = async () => {
    if (!cep.match(/^\d{8}$/)) {
      alert('Digite um CEP com 8 dígitos');
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      alert('Erro ao buscar o CEP');
    }
  };

  return (
    <div>
      <h2>Buscador de CEP</h2>
      <input
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP (somente números)"
      />
      <button onClick={searchCep}>Buscar</button>
      {data && (
        <div style={{ marginTop: 10 }}>
          {data.erro ? (
            <p>CEP não encontrado</p>
          ) : (
            <ul>
              <li><strong>Rua:</strong> {data.logradouro}</li>
              <li><strong>Bairro:</strong> {data.bairro}</li>
              <li><strong>Cidade:</strong> {data.localidade}</li>
              <li><strong>Estado:</strong> {data.uf}</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
function App() {
  const [active, setActive] = useState(null);

  const renderContent = () => {
    switch (active) {
      case "todo":
        return <ToDoList />;
      case "counter":
        return <ClickCounter />;
      case "tictactoe":
        return <TicTacToe />;
      case "calculator":
        return <Calculator />;
      case "cep":
        return <CepSearch />;
      default:
        return <p className="centered-content">Selecione uma funcionalidade acima.</p>;
    }
  };

  return (
    <div className="app">
      <h1>Funcionalidades</h1>
      <nav>
        <button onClick={() => setActive("todo")}>To-Do List</button>
        <button onClick={() => setActive("counter")}>Contador de Cliques</button>
        <button onClick={() => setActive("tictactoe")}>Jogo da Velha</button>
        <button onClick={() => setActive("calculator")}>Calculadora</button>
        <button onClick={() => setActive("cep")}>Buscador de CEP</button>
      </nav>
      <div className="card centered-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
