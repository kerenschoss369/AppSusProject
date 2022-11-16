import utilService from "../../../services/utilService.js";
import storageService from "../../../services/storageService.js";

const STORAGE_KEY = 'emails';

var gEmails = null;
const gDefaultEmails = [{
        id: 'example1',
        sender: {
            name: 'You',
            address: 'me@appsus.com'
        },
        reciver: {
            name: 'Shai Sharkanski',
            address: 'shaishar9@gmail.com'
        },
        others: {
            cc: '',
            bcc: '',
        },
        subject: 'Until When???',
        body: "I think I'm losing my mind.",
        isRead: false,
        sendAt: 1610463465376,
        isStarred: false,
        isDraft: true,
    },
    {
        id: 'example2',
        sender: {
            name: 'Shai Sharkanski',
            address: 'shaishar9@gmail.com'
        },
        reciver: {
            name: 'You',
            address: 'me@appsus.com'
        },
        others: {
            cc: '',
            bcc: '',
        },
        subject: 'Sprint 3 is heree‏',
        body: 'https://gofile.io/d/asCQ4G GOOD LUCK!!! <3',
        isRead: true,
        sendAt: 1610463222376,
        isStarred: true,
        isDraft: true,
    },
    {
        id: 'example3',
        sender: {
            name: 'Kinder Sharkanski',
            address: 'kinder@dogidog.com'
        },
        reciver: {
            name: 'You',
            address: 'me@appsus.com'
        },
        others: {
            cc: '',
            bcc: '',
        },
        subject: 'Whoof',
        body: "Whoof Whoof Whoof Whoof Whoof Whoof!",
        isRead: false,
        sendAt: 1610463465555,
        isStarred: false,
        isDraft: false,

    },
    {
        id: 'example4',
        sender: {
            name: 'Keren Schoss',
            address: 'kerenschoss369@gmail.com'
        },
        reciver: {
            name: 'You',
            address: 'me@appsus.com'
        },
        others: {
            cc: '',
            bcc: '',
        },
        subject: 'Nice Day',
        body: "Work Hard",
        isRead: false,
        sendAt: 1610463465376,
        isStarred: true,
        isDraft: false,

    },
    {
        id: 'example5',
        sender: {
            name: 'Shai Sharkanski',
            address: 'shaishar9@gmail.com'
        },
        reciver: {
            name: 'You',
            address: 'me@appsus.com'
        },
        others: {
            cc: '',
            bcc: '',
        },
        subject: 'Hey‏',
        body: 'How R U?',
        isRead: false,
        sendAt: 1610463222376,
        isStarred: false,
        isDraft: false,

    },
    {
        id: 'example6',
        sender: {
            name: 'Kinder Sharkanski',
            address: 'kinder@dogidog.com'
        },
        reciver: {
            name: 'You',
            address: 'me@appsus.com'
        },
        others: {
            cc: '',
            bcc: '',
        },
        subject: 'Whoof :)',
        body: "Whoof Whoof Whoof!",
        isRead: true,
        sendAt: 1610463465555,
        isStarred: true,
        isDraft: false,

    },
    {
        id: 'example7',
        sender: {
            name: 'Keren Schoss',
            address: 'kerenschoss369@gmail.com'
        },
        reciver: {
            name: 'You',
            address: 'me@appsus.com'
        },
        others: {
            cc: '',
            bcc: '',
        },
        subject: 'Ex1',
        body: "GL TO ME :)))",
        isRead: false,
        sendAt: 1610463222399,
        isStarred: false,
        isDraft: false,

    },
    {
        id: 'example8',
        sender: {
            name: 'Shai Sharkanski',
            address: 'shaishar9@gmail.com'
        },
        reciver: {
            name: 'You',
            address: 'me@appsus.com'
        },
        others: {
            cc: '',
            bcc: '',
        },
        subject: 'ILU‏',
        body: 'way to much',
        isRead: true,
        sendAt: 1610423222376,
        isStarred: false,
        isDraft: false,

    },
    {
        id: 'example9',
        sender: {
            name: 'Kinder Sharkanski',
            address: 'kinder@dogidog.com'
        },
        reciver: {
            name: 'You',
            address: 'me@appsus.com'
        },
        others: {
            cc: '',
            bcc: '',
        },
        subject: 'Whoof',
        body: "Whoof Whoof ?",
        isRead: false,
        sendAt: 1610463775555,
        isStarred: false,
        isDraft: false,

    }
]
_createEmails();


export default {
    query,
    getById,
    removeEmail,
    updateEmail,
    addEmail,
    calcPresentReaden,
};

function query(filterBy) {
    var emails = gEmails;
    if (filterBy) {
        var { name, filter } = filterBy;
        var value = true;

        if (name) name = name.toUpperCase();
        else name = '';

        if (filter === 'star') {
            filter = 'isStarred';
        }

        if (filter === 'draft') {
            filter = 'isDraft';
        }

        if (filter === 'inbox') {
            filter = 'isDraft';
            value = false;
        }

        if (filter === 'sent') {
            filter = 'sender';
            value = { name: 'You', address: 'me@appsus.com' }
        }

        emails = gEmails.filter((email) => (JSON.stringify(email[filter]) === JSON.stringify(value)) &&
            ((email.sender.name.toUpperCase().includes(name)) ||
                (email.sender.address.toUpperCase().includes(name)) ||
                (email.reciver.name.toUpperCase().includes(name)) ||
                (email.reciver.address.toUpperCase().includes(name)) ||
                (email.subject && email.subject.toUpperCase().includes(name)) ||
                (email.body && email.body.toUpperCase().includes(name))))

        return Promise.resolve(emails);
    }

    return Promise.resolve(emails);
}

function getById(emailId) {
    const email = gEmails.find((email) => email.id === emailId);
    return Promise.resolve(email);
}

function calcPresentReaden() {
    const countReaden = _readEmailsCount();
    const countEmails = gEmails.length;
    return ((countReaden / countEmails) * 100);
}

function removeEmail(emailId) {
    var emails = gEmails.filter((email) => email.id !== emailId);
    gEmails = emails;
    storageService.store(STORAGE_KEY, gEmails);
}

function updateEmail(updatedEmail) {
    var emailIdx = gEmails.findIndex((email) => email.id === updatedEmail.id);
    gEmails[emailIdx] = updatedEmail;
    storageService.store(STORAGE_KEY, gEmails);
}

function _createEmail(subject, body, sendAt) {
    var newEmail = {
        id: utilService.makeId(10),
        sender: {
            name: 'You',
            address: 'me@appsus.com'
        },
        subject,
        body,
        isRead: false,
        sendAt
    }
    addEmail(newEmail)
}

function addEmail(email) {
    gEmails.unshift(email);
    storageService.store(STORAGE_KEY, gEmails);
}

function _createEmails() {
    gEmails = storageService.load(STORAGE_KEY, gDefaultEmails);
    storageService.store(STORAGE_KEY, gEmails);
}

function _readEmailsCount() {
    var count = 0;
    gEmails.forEach((email) => {
        if (email.isRead) count++;
    });
    return count;
}