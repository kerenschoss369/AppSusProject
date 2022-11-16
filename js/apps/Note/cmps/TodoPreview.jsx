export function TodoPreview({ todo, onChangeChecked, note, onChangeInfo,removeTodo }) {
    return (
        <div className="todo-container flex align-center">
            <input type="checkbox" checked={todo.doneAt ? 'checked' : ''} onChange={() => { onChangeChecked(note, todo.id) }} />
            <input className={todo.doneAt ? 'done-todo note-input' : 'note-input'} type="text" placeholder="Click to edit..." onChange={({ target }) => { onChangeInfo(target, '', note, todo.id) }} value={todo.txt} />
            <button className="remove-btn" onClick={()=>{removeTodo(note.id,todo.id)}} >x</button>
        </div>
    );
}
