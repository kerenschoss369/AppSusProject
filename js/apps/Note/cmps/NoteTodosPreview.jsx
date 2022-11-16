import { TodoPreview } from "./TodoPreview.jsx";

export class NoteTodosPreview extends React.Component {
    render() {
        const { note, onChangeInfo, onChangeChecked, removeTodo } = this.props
        return (
            <div className="todos-container flex column align-start space-between">
                {note.info.todos && note.info.todos.map((todo) => (
                    <TodoPreview todo={todo} key={todo.id} note={note} onChangeChecked={onChangeChecked} onChangeInfo={onChangeInfo} removeTodo={removeTodo} />
                ))}
            </div>
        );
    }
}
