function TodoItem({ item, onToggle, onRemove }) {
  return (
    <li className="item">
      <label className="checkbox">
        <input type="checkbox" checked={item.completed} onChange={onToggle} />
        <span className={item.completed ? "title done" : "title"}>
          {item.title}
        </span>
      </label>
      <button className="icon-btn" onClick={onRemove} aria-label="Удалить">
        ✕
      </button>
    </li>
  );
}

export default TodoItem;
