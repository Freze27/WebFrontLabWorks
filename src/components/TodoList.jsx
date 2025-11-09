import TodoItem from "./TodoItem";

function TodoList({ items, onToggle, onRemove }) {
  return (
    <ul className="list">
      {items.map((todo) => (
        <TodoItem
          onToggle={() => onToggle(todo.id)}
          onRemove={() => onRemove(todo.id)}
          key={todo.id}
          item={todo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
