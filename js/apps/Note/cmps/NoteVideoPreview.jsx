export class NoteVideoPreview extends React.Component {

    render() {
        const { note, onChangeInfo, removeTxt} = this.props
        return (
            <div className="flex column align-center space-between">
                {note.info.url && <iframe src={note.info.url}></iframe>}
                {("txt" in note.info) && 
                <div className="flex space-between">
                <input type="text" onChange={({ target }) => { onChangeInfo(target, 'txt', note) }} placeholder="Click to edit..." className="note-input" value={note.info.txt} />
                <button onClick={()=>{removeTxt(note)}} className="remove-btn">x</button>
                </div>}
            </div>
        );
    }
}
