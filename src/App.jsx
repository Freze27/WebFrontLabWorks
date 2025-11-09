import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const LS_KEY = "react-todos";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addTodo = (title) => {
    if (!title.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: title.trim(), completed: false },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id))
  }
  
  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }
  
  const remaining = todos.filter((todo) => !todo.completed).length

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <h1>ToDo</h1>

      <TodoForm onAdd={addTodo} />
      
 
      <TodoList items={todos} onToggle={toggleTodo} onRemove={removeTodo} />

      <footer className="footer">
        <span>{remaining} осталось</span>
        <button onClick={clearCompleted} className="danger">Удалить выполненные</button>
      </footer>
    </div>
  );
}

export default App;
