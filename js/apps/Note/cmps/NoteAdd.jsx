export class NoteAdd extends React.Component {
    render() {
        const { type, placeholder, onClickType, onChangeText, onAddNote,text } = this.props
        return (
            <div className="flex justify-center add-note-container">
                <form className="flex justify-center space-between" onSubmit={onAddNote} >
                    <input onClick={this.toggleModal} onChange={onChangeText} placeholder={placeholder} value={text}></input>
                </form>
                <div className="flex">
                    <button><img onClick={() => onClickType('NoteText')} src="imgs/icons8-text-24.png" alt="text-icon" className={type === 'NoteText' ? '' : 'grey-icon'} /></button>
                    <button><img onClick={() => onClickType('NoteImg')} src="imgs/icons8-image-24.png" alt="image-icon" className={type === 'NoteImg' ? '' : 'grey-icon'} /></button>
                    <button><img onClick={() => onClickType('NoteVideo')} src="imgs/icons8-video-24.png" alt="video-icon" className={type === 'NoteVideo' ? '' : 'grey-icon'} /></button>
                    <button><img onClick={() => onClickType('NoteTodos')} src="imgs/icons8-list-24.png" alt="list-icon" className={type === 'NoteTodos' ? '' : 'grey-icon'} /></button>
                </div>
            </div>
        )
    }
}
