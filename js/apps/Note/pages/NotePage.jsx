import { NoteAdd } from "../cmps/NoteAdd.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import noteService from "../services/noteService.js";
import { NoteFilter } from "../cmps/NoteFilter.jsx";

export class NotePage extends React.Component {

    state = {
        placeholder: 'Enter text here...',
        text: '',
        type: 'NoteText',
        notes: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadNotes();
        var data = this.props.location.search;
        if (data) this.onAddEmailNote(data);
    }

    loadNotes() {
        noteService.query(this.state.filterBy).then((notes) => {
            this.setState({ notes });
        });
    }

    onClickType = (type) => {
        const placeholder = this.getPlaceholder(type);
        this.setState(prevState => ({ ...prevState, type, placeholder }))
    }

    getPlaceholder(type) {
        switch (type) {
            case 'NoteText':
                return 'Enter text here...';
            case 'NoteImg':
                return 'Enter image URL here...';
            case 'NoteVideo':
                return 'Enter video URL here...';
            case 'NoteTodos':
                return 'Enter list (comma seperated) here...'
        }
    }

    onAddEmailNote = (data) => {
        var preTitle = data.substring(data.indexOf('=') + 1, data.indexOf('&'));
        data = data.substring(data.indexOf('&') + 1, data.length);
        var preTxt = data.substring(data.indexOf('=') + 1, data.length);
        var title = this.organizeQueryString(preTitle);
        var txt = this.organizeQueryString(preTxt);
        noteService.addNote('NoteText', txt, title);
        this.loadNotes();
        this.props.history.push(`/note`)
    }

    organizeQueryString = (str) => {
        str = str.split('%20');
        var txt = ''
        str.forEach(word => {
            txt += word + ' ';
        });
        return txt;
    }

    onAddNote = (ev) => {
        ev.preventDefault();
        noteService.addNote(this.state.type, this.state.text)
        this.setState({ text: '' })
        this.loadNotes();
    }

    onChangeText = ({ target }) => {
        this.setState(prevState => ({ ...prevState, text: target.value }))
    }

    onTogglePinned = (note) => {
        note.isPinned = !note.isPinned;
        this.updateNote(note, true);
    }

    onChangeInfo = (target, type, note, todoId = null) => {
        if (todoId) {
            var todoIdx = note.info.todos.findIndex((todo) => todo.id === todoId)
            note.info.todos[todoIdx].txt = target.value;
        }
        else note.info[type] = target.value;
        this.updateNote(note);
    }


    onChangeBgColor = (bgColor, note) => {
        note.style.backgroundColor = bgColor;
        this.updateNote(note);
    }

    onChangeChecked = (note, todoId) => {
        var todoIdx = note.info.todos.findIndex((todo) => todo.id === todoId)
        if (note.info.todos[todoIdx].doneAt) note.info.todos[todoIdx].doneAt = null;
        else note.info.todos[todoIdx].doneAt = Date.now();
        this.updateNote(note);
    }

    onFilterNotes = (filterBy) => {
        this.setState((prevState) => ({ ...prevState, filterBy }),
            () => {
                this.loadNotes();
            }
        );
    };

    addByType = (note) => {
        switch (note.type) {
            case 'NoteImg':
            case 'NoteVideo':
                this.addTextToNote(note); break;
            case 'NoteTodos':
                noteService.addTodo(note.id);
        }
        this.loadNotes();
    }

    addTextToNote = (note) => {
        if (!('txt' in note.info) || (!note.info.txt)) {
            note.info['txt'] = '';
        }
        else return;
        this.updateNote(note);
    }

    removeTodo = (noteId, TodoId) => {
        noteService.removeTodo(noteId, TodoId);
        this.loadNotes();

    }

    removeTxt = (note) => {
        delete note.info.txt;
        this.updateNote(note);
    }

    removeNote = (noteId) => {
        noteService.removeNote(noteId);
        this.loadNotes();
    }

    updateNote = (note, isPinned = false) => {
        noteService.updateNote(note);
        if (isPinned) noteService.locateNote(note.id);
        this.loadNotes();
    }

    onCreateComposeFromNote = (title, txt) => {
        if (!title) title = '';
        this.props.history.push(`/emails/compose?subject=${title}&body=${txt}`)
    }

    render() {
        return (
            <main className="flex column align-center">
                <NoteAdd onChangeText={this.onChangeText} onAddNote={this.onAddNote} onClickType={this.onClickType} type={this.state.type} placeholder={this.state.placeholder} text={this.state.text} />
                <NoteFilter onFilterNotes={this.onFilterNotes} />
                <NoteList notes={this.state.notes} removeNote={this.removeNote} loadNotes={this.loadNotes} updateNote={this.updateNote} onTogglePinned={this.onTogglePinned} onChangeInfo={this.onChangeInfo} onChangeBgColor={this.onChangeBgColor} onChangeChecked={this.onChangeChecked} addByType={this.addByType} removeTodo={this.removeTodo} removeTxt={this.removeTxt} onCreateComposeFromNote={this.onCreateComposeFromNote} />
            </main>
        )
    }
}