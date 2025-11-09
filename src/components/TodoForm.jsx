import { useState } from "react";

function TodoForm({ onAdd }) {
  const [value, setValue] = useState("");
  
  const submit = (e) => {
    e.preventDefault();
    onAdd?.(value)
    setValue('')
  }

  return (
    <form onSubmit={submit} className="todo-form">
      <input
        placeholder="Введите задачу"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      
      <button type="submit">Добавить</button>
    </form>
  );
}

export default TodoForm;
