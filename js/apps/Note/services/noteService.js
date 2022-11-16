import utilService from "../../../services/utilService.js";
import storageService from "../../../services/storageService.js";


const STORAGE_KEY = 'notes';

var gNotes = null;
const gDefaultNotes = [{
        id: 'example1',
        type: 'NoteText',
        isPinned: true,
        info: {
            title: "Motivation",
            txt: 'Be yourself; everyone else is already taken.'
        },
        style: {
            backgroundColor: '#d4e8f5'
        }
    }, {
        id: 'example2',
        type: 'NoteImg',
        isPinned: true,
        info: {
            title: "My cute dog",
            url: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg?resize=750px:*',
        },
        style: {
            backgroundColor: '#b29dda'
        }
    },
    {
        id: 'example3',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: "To Do",
            todos: [
                { txt: 'Make a pizza', doneAt: 187111111, id: 'todo1' },
                { txt: 'Go to the gym', doneAt: null, id: 'todo2' },
                { txt: 'Read a book', doneAt: null, id: 'todo3' },
                { txt: 'Call my mom', doneAt: null, id: 'todo4' },
            ]
        },
        style: {
            backgroundColor: '#bdeca7'
        }
    },
    {
        id: 'example4',
        type: 'NoteVideo',
        isPinned: false,
        info: {
            title: "Homework",
            url: 'https://player.vimeo.com/video/8858913?title=0&byline=0&portrait=0',
            txt: 'Learn Coding '
        },
        style: {
            backgroundColor: '#fff187'
        }
    },
    {
        id: 'example5',
        type: 'NoteVideo',
        isPinned: false,
        info: {
            title: "P-A-R-T-Y",
            url: 'https://player.vimeo.com/video/421990765?title=0&byline=0&portrait=0',
            txt: 'Music for tonight!'
        },
        style: {
            backgroundColor: '#f5d4d4'
        }
    },
    {
        id: 'example6',
        type: 'NoteImg',
        isPinned: false,
        info: {
            title: "UNTIL WHEN???",
            url: 'https://thumbs.gfycat.com/BlissfulUnimportantBronco-max-1mb.gif',
            txt: 'finish this DAMN project'
        },
        style: {
            backgroundColor: '#b29dda'
        }
    },
];
_createNotes();

export default {
    query,
    getById,
    removeNote,
    updateNote,
    locateNote,
    addNote,
    addTodo,
    removeTodo,
};

function query(filterBy) {
    var notes = gNotes;
    if (filterBy) {
        var { name } = filterBy;
        name = name.toUpperCase();
        notes = gNotes.filter((note) =>
            (note.info.txt && note.info.txt.toUpperCase().includes(name)) ||
            (note.info.todos && _isNameExistInTodos(name, note.info.todos))
        );
    }
    return Promise.resolve(notes);
}

function _isNameExistInTodos(name, todos) {
    var found;
    found = todos.find((todo) => todo.txt.toUpperCase().includes(name))
    if (found) return true;
    else return false;
}

function getById(noteId) {
    const note = gNotes.find((note) => note.id === noteId);
    return Promise.resolve(note);
}

function removeNote(noteId) {
    var notes = gNotes.filter((note) => note.id !== noteId);
    gNotes = notes;
    storageService.store(STORAGE_KEY, gNotes);
}

function updateNote(updatedNote) {
    var noteIdx = gNotes.findIndex((note) => note.id === updatedNote.id);
    gNotes[noteIdx] = updatedNote;
    storageService.store(STORAGE_KEY, gNotes);
}

function locateNote(noteId) {
    const note = gNotes.find((note) => note.id === noteId);
    removeNote(noteId);
    // locate pinned notes to the top
    if (note.isPinned) {
        gNotes.unshift(note);
    } else { //locate the others on the first place of the non pinned
        var noteIdx = gNotes.findIndex((note) => !note.isPinned);
        if (noteIdx === gNotes.length - 1) noteIdx++;
        gNotes.splice(noteIdx, 0, note);
    }
    storageService.store(STORAGE_KEY, gNotes);
}

function createInfoByType(type, txt, title) {
    var info = {};

    if (type === 'NoteText') {
        info = {
            txt,
        }
    } else if (type === 'NoteImg' || type === 'NoteVideo') {
        info = {
            url: txt,
        }
    } else if (type === 'NoteTodos') {
        const todostxt = txt.split(',');
        var todos = [];
        for (let i = 0; i < todostxt.length; i++) {
            todos.push({ txt: todostxt[i], doneAt: null, id: utilService.makeId(4) })
        }
        info = {
            todos: todos,
        }
    }
    if (title) info.title = title;
    return info;
}


function addNote(type, txt, title = null) {
    var newNote = _createNote(type, txt, title);
    var noteIdx = gNotes.findIndex((note) => !note.isPinned);
    if (noteIdx === gNotes.length - 1) noteIdx++;
    gNotes.splice(noteIdx, 0, newNote);
    storageService.store(STORAGE_KEY, gNotes);
}

function addTodo(noteId) {
    const noteIdx = gNotes.findIndex((note) => note.id === noteId);
    const newTodo = {
        txt: '',
        doneAt: null,
        id: utilService.makeId(4)
    }
    gNotes[noteIdx].info.todos.push(newTodo);
    storageService.store(STORAGE_KEY, gNotes);
}

function removeTodo(noteId, todoId) {
    const noteIdx = gNotes.findIndex((note) => note.id === noteId);
    var filterdNotes = gNotes[noteIdx].info.todos.filter((todo) => (todo.id !== todoId))
    gNotes[noteIdx].info.todos = filterdNotes;
    storageService.store(STORAGE_KEY, gNotes);
}

function _createNote(type, txt, title) {
    var info = createInfoByType(type, txt, title);
    var newNote = {
        id: utilService.makeId(10),
        type,
        isPinned: false,
        info,
        style: {
            backgroundColor: '#fff187'
        }
    }
    return newNote;
}

function _createNotes() {
    gNotes = storageService.load(STORAGE_KEY, gDefaultNotes);
    storageService.store(STORAGE_KEY, gNotes);
}