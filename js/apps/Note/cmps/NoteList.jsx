
import { DynamicNotePreview } from "./DynamicNotePreview.jsx";

export class NoteList extends React.Component {

    render() {
        const { removeNote, notes, updateNote, onTogglePinned, onChangeInfo, onChangeBgColor, onChangeChecked, addByType, removeTodo, removeTxt, onCreateComposeFromNote } = this.props
        if (!notes) return "Loading...";
        return (
            <main className="main-container notes-container flex column align-center">
                <div className="notes-container flex wrap justify-center">
                    {notes.map((note) => (
                        <DynamicNotePreview note={note} key={note.id} updateNote={updateNote} removeNote={removeNote} onTogglePinned={onTogglePinned} onChangeInfo={onChangeInfo} onChangeBgColor={onChangeBgColor} onChangeChecked={onChangeChecked} addByType={addByType} removeTodo={removeTodo} removeTxt={removeTxt} onCreateComposeFromNote={onCreateComposeFromNote} />
                    ))}
                </div>
            </main>
        )
    }

}