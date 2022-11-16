export class NoteTxtPreview extends React.Component {
    render() {
        const { note, onChangeInfo} = this.props
        return (
            <div className="flex column align-center space-between">
                {note.info.txt && <textarea  onChange={({ target }) => { onChangeInfo(target, 'txt', note) }} placeholder="Click to edit..." className="txt-area note-input" value={note.info.txt} />}
            </div>
        );
    }
}