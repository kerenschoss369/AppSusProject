import { ToolsList } from "./ToolsList.jsx";
import { NoteTxtPreview } from "./NoteTxtPreview.jsx";
import { NoteImgPreview } from "./NoteImgPreview.jsx";
import { NoteTodosPreview } from "./NoteTodosPreview.jsx";
import { NoteVideoPreview } from "./NoteVideoPreview.jsx";

export class DynamicNotePreview extends React.Component {

    state = {
        isColorsWindowOpen: false,
    }

    onChangeBgColor = (bgColor, note) => {
        this.setState({ isColorsWindowOpen: false });
        this.props.onChangeBgColor(bgColor, note);
    }

    onOpenColorWindow = () => {
        this.setState((prevState) => ({ isColorsWindowOpen: !prevState.isColorsWindowOpen }));
    }

    get componentByType() {
        const { note, onChangeInfo, onChangeChecked, updateNote, removeTodo, removeTxt } = this.props
        switch (note.type) {
            case 'NoteText':
                return (<NoteTxtPreview note={note} onChangeInfo={onChangeInfo} />)
            case 'NoteImg':
                return (<NoteImgPreview note={note} onChangeInfo={onChangeInfo} removeTxt={removeTxt} />)
            case 'NoteTodos':
                return (<NoteTodosPreview note={note} onChangeInfo={onChangeInfo} onChangeChecked={onChangeChecked} updateNote={updateNote} removeTodo={removeTodo} />)
            case 'NoteVideo':
                return (<NoteVideoPreview note={note} onChangeInfo={onChangeInfo} removeTxt={removeTxt} />)
        }

    }

    render() {
        const { note, removeNote, onTogglePinned, addByType, onCreateComposeFromNote, onChangeInfo } = this.props
        const { isColorsWindowOpen } = this.state
        if (!note) return '';
        return (
            <div className="note-container flex column space-between" style={{ backgroundColor: note.style.backgroundColor }}>
                <div className="flex column">
                    <div className="pin-container">
                        <img className="icon-img" onClick={() => { onTogglePinned(note) }} src={note.isPinned ? 'imgs/icons8-pin-24.png' : 'imgs/icons8-pin-24 (1).png'} alt="note-pinned" />
                    </div>
                    <div className="note-title-container">
                        <input className="note-input" type="text" onChange={({ target }) => { onChangeInfo(target, 'title', note) }} value={note.info.title ? note.info.title : ''} placeholder="New Note" />
                    </div>
                    {this.componentByType}
                </div>
                <div className="icons-container flex space-between">
                    <section className="img-by-type">
                        {note.type === "NoteText" && <img src="imgs/icons8-text-24.png" alt="type-img" className="grey-icon" />}
                        {note.type === "NoteImg" && <img src="imgs/icons8-image-24.png" alt="type-img" className="grey-icon" />}
                        {note.type === "NoteTodos" && <img src="imgs/icons8-list-24.png" alt="type-img" className="grey-icon" />}
                        {note.type === "NoteVideo" && <img src="imgs/icons8-video-24.png" alt="type-img" className="grey-icon" />}
                    </section>
                    <ToolsList isColorsWindowOpen={isColorsWindowOpen} onOpenColorWindow={this.onOpenColorWindow} onChangeBgColor={this.onChangeBgColor} note={note} removeNote={removeNote} addByType={addByType} onCreateComposeFromNote={onCreateComposeFromNote} />
                </div>
            </div >
        );
    }
}


