export function ToolsList({ isColorsWindowOpen, onOpenColorWindow, onChangeBgColor, note, removeNote, addByType,onCreateComposeFromNote }) {
    return (
        <section className="tools-conatiner flex align-center space-between" >
            <img onClick={onOpenColorWindow} title="Change note's bg color" src="imgs/icons8-fill-color-24.png" alt="bgcolor-img" />
            <div className={isColorsWindowOpen ? 'colors-container flex wrap' : 'hidden'}>
                <button onClick={() => { onChangeBgColor('#fff187', note) }}></button>
                <button onClick={() => { onChangeBgColor('#f7d198', note) }}></button>
                <button onClick={() => { onChangeBgColor('#f5d4d4', note) }}></button>
                <button onClick={() => { onChangeBgColor('#b29dda', note) }}></button>
                <button onClick={() => { onChangeBgColor('#d4e8f5', note) }}></button>
                <button onClick={() => { onChangeBgColor('#bdeca7', note) }}></button>
            </div>
            {note.type !== 'NoteText' && <img className="icon-img" title={note.type==='NoteTodos'? 'Add Todo':'Add text (if not added yet)'} onClick={() => { addByType(note) }} src="imgs/icons8-plus-math-24.png" alt="delete-img" />}
            <img className="icon-img" title="Delete note" onClick={() => { removeNote(note.id) }} src="imgs/icons8-trash-24.png" alt="delete-img" />
            {note.info.txt && <img className="" onClick={()=>onCreateComposeFromNote(note.info.title,note.info.txt)} src="imgs/icons8-email-24 (1).png" title="Create note as email" alt="note-to-email-img" />}
        </section>
    );
}
